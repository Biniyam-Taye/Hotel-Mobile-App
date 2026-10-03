const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: false,
    },
    relatedType: {
      type: String,
      enum: ['Booking', 'FoodOrder', 'ServiceBooking', 'Event', 'Facility', 'Offer'],
      default: 'Booking',
    },
    relatedId: {
      type: mongoose.Schema.ObjectId,
      required: false,
      refPath: 'relatedType',
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'usd',
    },
    stripeCheckoutSessionId: {
      type: String,
      sparse: true,
      index: true,
    },
    stripePaymentIntentId: {
      type: String,
      sparse: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String,
      default: 'card',
    },
    customerEmail: {
      type: String,
    },
    customerName: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

paymentSchema.index({ user: 1 });
paymentSchema.index({ relatedType: 1, relatedId: 1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);

