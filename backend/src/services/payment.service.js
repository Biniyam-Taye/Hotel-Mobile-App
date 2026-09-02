const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const Payment = require('../models/payment.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const Booking = require('../models/booking.model');
const FoodOrder = require('../models/foodOrder.model');
const ServiceBooking = require('../models/serviceBooking.model');
const User = require('../models/user.model');
const { sendNotification } = require('./engagement.service');

/**
 * Create a Stripe Checkout Session for seamless redirect payment
 */
const createCheckoutSession = async (userId, data) => {
  const currency = (data.currency || 'usd').toLowerCase();
  const amount = Number(data.amount);
  
  if (isNaN(amount) || amount <= 0) {
    throw new ApiError(400, 'Invalid payment amount');
  }

  const amountInCents = Math.round(amount * 100);

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const defaultSuccessUrl = `${frontendUrl}/booking-success?session_id={CHECKOUT_SESSION_ID}`;
  const defaultCancelUrl = data.cancelUrl || `${frontendUrl}/`;

  // Create Stripe Checkout Session
  const sessionConfig = {
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: data.title || 'Hotel Service Booking',
            description: data.description || `Reservation payment for ${data.relatedType || 'Booking'}`,
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: data.successUrl || defaultSuccessUrl,
    cancel_url: defaultCancelUrl,
    metadata: {
      userId: userId ? userId.toString() : '',
      relatedType: data.relatedType || 'Booking',
      relatedId: data.relatedId ? data.relatedId.toString() : '',
      customerEmail: data.customerEmail || '',
      customerName: data.customerName || '',
      amount: amount.toString(),
    },
  };

  if (data.customerEmail) {
    sessionConfig.customer_email = data.customerEmail;
  }

  const session = await stripe.checkout.sessions.create(sessionConfig);

  let payment;
  if (data.paymentId) {
    payment = await Payment.findByIdAndUpdate(
      data.paymentId,
      {
        stripeCheckoutSessionId: session.id,
        user: userId || undefined,
      },
      { new: true }
    );
  }

  if (!payment) {
    // Save pending payment record in DB
    payment = await Payment.create({
      user: userId || null,
      relatedType: data.relatedType || 'Booking',
      relatedId: data.relatedId || null,
      amount,
      currency,
      stripeCheckoutSessionId: session.id,
      status: 'pending',
      customerEmail: data.customerEmail || '',
      customerName: data.customerName || '',
      description: data.title || 'Stripe Checkout Session',
    });
  }

  return {
    url: session.url,
    sessionId: session.id,
    paymentId: payment._id,
  };
};


/**
 * Direct Payment Intent creation (for custom card forms)
 */
const createPaymentIntent = async (userId, data) => {
  const amountInCents = Math.round(data.amount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: (data.currency || 'usd').toLowerCase(),
    metadata: {
      userId: userId ? userId.toString() : '',
      relatedType: data.relatedType || 'Booking',
      relatedId: data.relatedId ? data.relatedId.toString() : '',
    },
  });

  const payment = await Payment.create({
    user: userId || null,
    relatedType: data.relatedType || 'Booking',
    relatedId: data.relatedId || null,
    amount: data.amount,
    currency: (data.currency || 'usd').toLowerCase(),
    stripePaymentIntentId: paymentIntent.id,
    status: 'pending',
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentId: payment._id,
  };
};

/**
 * Secure Webhook Listener for Stripe Events
 */
const handleWebhook = async (rawBody, signature) => {
  let event;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (webhookSecret && signature) {
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      throw new ApiError(400, `Webhook Error: ${err.message}`);
    }
  } else {
    // If webhook secret isn't provided in test mode, parse body as raw JSON
    try {
      event = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
    } catch (err) {
      throw new ApiError(400, 'Invalid JSON body for webhook');
    }
  }

  // Handle Checkout Session Completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const sessionEmail = session.customer_details?.email || session.metadata?.customerEmail || '';
    const sessionUserId = session.metadata?.userId || null;

    // Find and update payment record by checkout session ID
    let payment = await Payment.findOne({ stripeCheckoutSessionId: session.id });

    if (!payment && session.metadata?.relatedId) {
      payment = await Payment.findOne({ relatedId: session.metadata.relatedId });
    }

    // Try to resolve user by email if userId wasn't stored
    let resolvedUserId = sessionUserId;
    if (!resolvedUserId && sessionEmail) {
      const userByEmail = await User.findOne({ email: sessionEmail.toLowerCase() }).select('_id').lean();
      if (userByEmail) resolvedUserId = userByEmail._id;
    }

    if (payment) {
      payment.status = 'succeeded';
      payment.stripePaymentIntentId = session.payment_intent || payment.stripePaymentIntentId;
      payment.paymentMethod = session.payment_method_types?.[0] || 'card';
      if (session.amount_total) payment.amount = session.amount_total / 100;
      // Link user if we resolved one and it wasn't stored
      if (resolvedUserId && !payment.user) payment.user = resolvedUserId;
      if (sessionEmail && !payment.customerEmail) payment.customerEmail = sessionEmail;
      await payment.save();
    } else {
      // Create new succeeded payment record if not found
      payment = await Payment.create({
        user: resolvedUserId || null,
        relatedType: session.metadata?.relatedType || 'Booking',
        relatedId: session.metadata?.relatedId || null,
        amount: session.amount_total ? session.amount_total / 100 : Number(session.metadata?.amount || 0),
        currency: session.currency || 'usd',
        stripeCheckoutSessionId: session.id,
        stripePaymentIntentId: session.payment_intent || '',
        status: 'succeeded',
        customerEmail: sessionEmail,
        customerName: session.customer_details?.name || session.metadata?.customerName || '',
      });
    }

    // Also mark any other pending payments with same session ID as succeeded
    await Payment.updateMany(
      { stripeCheckoutSessionId: session.id, status: 'pending', _id: { $ne: payment._id } },
      { $set: { status: 'succeeded', user: resolvedUserId || undefined } }
    );

    // Update related entity status to confirmed/paid
    if (payment.relatedId) {
      if (payment.relatedType === 'Booking') {
        await Booking.findByIdAndUpdate(payment.relatedId, { status: 'confirmed', paymentStatus: 'paid' });
      } else if (payment.relatedType === 'FoodOrder') {
        await FoodOrder.findByIdAndUpdate(payment.relatedId, { status: 'preparing', paymentStatus: 'paid' });
      } else if (payment.relatedType === 'ServiceBooking') {
        await ServiceBooking.findByIdAndUpdate(payment.relatedId, { status: 'confirmed', paymentStatus: 'paid' });
      }
    }

    // Send Notification
    const notifyUser = payment.user || resolvedUserId;
    if (notifyUser) {
      sendNotification({
        userId: notifyUser,
        title: 'Payment Successful',
        message: `Your payment of $${payment.amount} was successfully processed via Stripe.`,
        type: 'payment',
        relatedId: payment._id,
      }).catch(err => console.error('Notification failed:', err));
    }
  }

  // Handle Payment Intent Succeeded (Fallback)
  else if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;

    const payment = await Payment.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: 'succeeded', paymentMethod: paymentIntent.payment_method_types?.[0] || 'card' },
      { new: true }
    );

    if (payment && payment.relatedId) {
      if (payment.relatedType === 'Booking') {
        await Booking.findByIdAndUpdate(payment.relatedId, { status: 'confirmed', paymentStatus: 'paid' });
      } else if (payment.relatedType === 'FoodOrder') {
        await FoodOrder.findByIdAndUpdate(payment.relatedId, { status: 'preparing', paymentStatus: 'paid' });
      } else if (payment.relatedType === 'ServiceBooking') {
        await ServiceBooking.findByIdAndUpdate(payment.relatedId, { status: 'confirmed', paymentStatus: 'paid' });
      }
    }
  }
  // Handle Payment Failures
  else if (event.type === 'payment_intent.payment_failed' || event.type === 'checkout.session.expired') {
    const obj = event.data.object;
    await Payment.findOneAndUpdate(
      { $or: [{ stripeCheckoutSessionId: obj.id }, { stripePaymentIntentId: obj.id }] },
      { status: 'failed' }
    );
  }

  return { received: true };
};

/**
 * Get payment history for owner/admin or user
 */
const getPaymentHistory = async (query, userId, role) => {
  const q = { ...query };
  if (role !== 'admin') q.user = userId;

  const result = await queryBuilder(Payment, q, ['status', 'relatedType']);
  if (result.data) {
    await Payment.populate(result.data, { path: 'user', select: 'firstName lastName email' });
  }
  return result;
};

/**
 * Calculate total revenue strictly from succeeded payments for owner dashboard
 */
const getPaidRevenueStats = async () => {
  const result = await Payment.aggregate([
    { $match: { status: 'succeeded' } },
    { $group: { _id: null, totalRevenue: { $sum: '$amount' }, paidCount: { $sum: 1 } } }
  ]);

  return {
    totalRevenue: result.length > 0 ? result[0].totalRevenue : 0,
    paidCount: result.length > 0 ? result[0].paidCount : 0,
  };
};

/**
 * Get all payments for a specific logged-in user.
 * Searches by userId (linked on checkout) AND by customerEmail (guest fallback).
 * This ensures payments made before the user linked their account still appear.
 */
const getMyOrders = async (userId) => {
  // Fetch the user's email for the email fallback
  const userDoc = await User.findById(userId).select('email').lean();
  const userEmail = userDoc?.email || null;

  // Build query: match by userId OR by customerEmail if it matches the logged-in user
  const query = userEmail
    ? { $or: [{ user: userId }, { customerEmail: userEmail }] }
    : { user: userId };

  const orders = await Payment.find(query)
    .sort({ createdAt: -1 })
    .select('amount currency status paymentMethod relatedType description customerName customerEmail stripeCheckoutSessionId createdAt user');

  // Deduplicate (in case a payment matches both conditions)
  const seen = new Set();
  return orders.filter(o => {
    const id = o._id.toString();
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
};

/**
 * Delete a pending order payment record
 */
const deleteOrder = async (orderId, userId, role) => {
  const payment = await Payment.findById(orderId);
  if (!payment) {
    throw new ApiError(404, 'Order not found');
  }

  // Authorization check: user must own the order or be an admin/manager
  const userDoc = await User.findById(userId).select('email').lean();
  const userEmail = userDoc?.email || null;

  const isOwner = (payment.user && payment.user.toString() === userId) ||
                  (userEmail && payment.customerEmail && payment.customerEmail.toLowerCase() === userEmail.toLowerCase());

  if (!isOwner && role !== 'admin' && role !== 'manager') {
    throw new ApiError(403, 'Not authorized to delete this order');
  }

  await Payment.findByIdAndDelete(orderId);
  return true;
};

module.exports = {
  createCheckoutSession,
  createPaymentIntent,
  handleWebhook,
  getPaymentHistory,
  getMyOrders,
  getPaidRevenueStats,
  deleteOrder,
};


