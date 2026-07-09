import stripe from '../config/stripe.js';
import Booking from '../models/Booking.js';
import { ApiError, catchAsync, sendSuccess } from '../utils/helpers.js';
import { BOOKING_STATUS } from '../utils/constants.js';

/**
 * Create a Stripe Checkout Session for a booking.
 */
export const createCheckoutSession = catchAsync(async (req, res) => {
  const { bookingId } = req.body;
  if (!bookingId) throw new ApiError(400, 'bookingId is required');

  const booking = await Booking.findById(bookingId).populate('hotelId', 'name');
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (booking.guestId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Forbidden');
  }
  if (booking.paymentStatus === 'paid') {
    throw new ApiError(400, 'Booking is already paid');
  }

  const currency = (process.env.STRIPE_CURRENCY || 'usd').toLowerCase();
  const amountCents = Math.round(booking.totalPrice * 100);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: req.user.email,
    line_items: [
      {
        price_data: {
          currency,
          product_data: {
            name: `LuxeStay — ${booking.hotelId?.name ?? 'Hotel Booking'}`,
            description: `Booking ${booking.bookingRef} · ${booking.nights} night(s)`,
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    metadata: {
      bookingId: booking._id.toString(),
      guestId: req.user._id.toString(),
      bookingRef: booking.bookingRef,
    },
    success_url: `${req.body.successUrl || 'http://localhost:3000/payment/success'}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: req.body.cancelUrl || 'http://localhost:3000/payment/cancel',
  });

  booking.stripeSessionId = session.id;
  await booking.save();

  sendSuccess(res, {
    sessionId: session.id,
    url: session.url,
  });
});

/**
 * Stripe webhook — must receive raw body (configured in app.js).
 */
export const stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const bookingId = session.metadata?.bookingId;
        if (bookingId) {
          await Booking.findByIdAndUpdate(bookingId, {
            paymentStatus: 'paid',
            status: BOOKING_STATUS.CONFIRMED,
            stripePaymentIntentId: session.payment_intent,
          });
        }
        break;
      }
      case 'charge.refunded': {
        const paymentIntentId = event.data.object.payment_intent;
        await Booking.findOneAndUpdate(
          { stripePaymentIntentId: paymentIntentId },
          { paymentStatus: 'refunded', status: BOOKING_STATUS.REFUNDED }
        );
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.error('Webhook handler error:', err);
    return res.status(500).json({ error: 'Webhook handler failed' });
  }

  res.json({ received: true });
};

/**
 * Verify payment status after redirect from Stripe Checkout.
 */
export const verifyPayment = catchAsync(async (req, res) => {
  const { sessionId } = req.query;
  if (!sessionId) throw new ApiError(400, 'sessionId is required');

  const session = await stripe.checkout.sessions.retrieve(sessionId);
  const booking = await Booking.findById(session.metadata?.bookingId);

  if (!booking) throw new ApiError(404, 'Booking not found');

  if (session.payment_status === 'paid' && booking.paymentStatus !== 'paid') {
    booking.paymentStatus = 'paid';
    booking.status = BOOKING_STATUS.CONFIRMED;
    booking.stripePaymentIntentId = session.payment_intent;
    await booking.save();
  }

  sendSuccess(res, {
    paymentStatus: booking.paymentStatus,
    bookingId: booking._id.toString(),
    bookingRef: booking.bookingRef,
  });
});

/**
 * Create a refund for a booking (admin or super_admin).
 */
export const refundBooking = catchAsync(async (req, res) => {
  const booking = await Booking.findById(req.params.bookingId);
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (!booking.stripePaymentIntentId) {
    throw new ApiError(400, 'No Stripe payment found for this booking');
  }

  await stripe.refunds.create({
    payment_intent: booking.stripePaymentIntentId,
  });

  booking.paymentStatus = 'refunded';
  booking.status = BOOKING_STATUS.REFUNDED;
  await booking.save();

  sendSuccess(res, { message: 'Refund initiated', bookingId: booking._id.toString() });
});

/**
 * Create a Stripe PaymentIntent (for custom Flutter payment sheet).
 */
export const createPaymentIntent = catchAsync(async (req, res) => {
  const { bookingId } = req.body;
  const booking = await Booking.findById(bookingId);
  if (!booking) throw new ApiError(404, 'Booking not found');
  if (booking.guestId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Forbidden');
  }

  const currency = (process.env.STRIPE_CURRENCY || 'usd').toLowerCase();

  const intent = await stripe.paymentIntents.create({
    amount: Math.round(booking.totalPrice * 100),
    currency,
    metadata: {
      bookingId: booking._id.toString(),
      bookingRef: booking.bookingRef,
    },
  });

  booking.stripePaymentIntentId = intent.id;
  await booking.save();

  sendSuccess(res, {
    clientSecret: intent.client_secret,
    paymentIntentId: intent.id,
  });
});
