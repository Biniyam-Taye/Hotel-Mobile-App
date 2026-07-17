const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder');
const Payment = require('../models/payment.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const Booking = require('../models/booking.model');
const FoodOrder = require('../models/foodOrder.model');
const ServiceBooking = require('../models/serviceBooking.model');
const { sendNotification } = require('./engagement.service');

const createPaymentIntent = async (userId, data) => {
  // Determine amount in cents for Stripe
  const amountInCents = Math.round(data.amount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: data.currency || 'usd',
    metadata: {
      userId: userId.toString(),
      relatedType: data.relatedType,
      relatedId: data.relatedId.toString(),
    },
  });

  // Save pending payment record
  const payment = await Payment.create({
    user: userId,
    relatedType: data.relatedType,
    relatedId: data.relatedId,
    amount: data.amount,
    currency: data.currency || 'usd',
    stripePaymentIntentId: paymentIntent.id,
    status: 'pending',
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentId: payment._id,
  };
};

const handleWebhook = async (rawBody, signature) => {
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    throw new ApiError(400, `Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    
    // Find the payment record
    const payment = await Payment.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: 'succeeded', paymentMethod: paymentIntent.payment_method_types[0] },
      { new: true }
    );
    
    if (payment) {
      // Update the related record's status to confirmed
      if (payment.relatedType === 'Booking') {
        await Booking.findByIdAndUpdate(payment.relatedId, { status: 'confirmed' });
      } else if (payment.relatedType === 'FoodOrder') {
        await FoodOrder.findByIdAndUpdate(payment.relatedId, { status: 'preparing' });
      } else if (payment.relatedType === 'ServiceBooking') {
        await ServiceBooking.findByIdAndUpdate(payment.relatedId, { status: 'confirmed' });
      }

      // Trigger Notification
      sendNotification({
        userId: payment.user,
        title: 'Payment Successful',
        message: `Your payment of ${payment.amount} ${payment.currency.toUpperCase()} was successful.`,
        type: 'payment',
        relatedId: payment._id,
      }).catch(err => console.error('Notification failed:', err));
    }
  } else if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object;
    await Payment.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: 'failed' }
    );
  }

  return { received: true };
};

const getPaymentHistory = async (query, userId, role) => {
  const q = { ...query };
  if (role !== 'admin') q.user = userId;
  
  const result = await queryBuilder(Payment, q, ['status', 'relatedType']);
  await Payment.populate(result.data, { path: 'user', select: 'firstName lastName email' });
  return result;
};

module.exports = {
  createPaymentIntent,
  handleWebhook,
  getPaymentHistory,
};
