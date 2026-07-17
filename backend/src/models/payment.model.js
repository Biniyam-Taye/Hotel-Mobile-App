const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    relatedType: {
      type: String,
      enum: ['Booking', 'FoodOrder', 'ServiceBooking'],
      required: true,
    },
    relatedId: {
      type: mongoose.Schema.ObjectId,
      required: true,
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
    stripePaymentIntentId: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed', 'refunded'],
      default: 'pending',
    },
    paymentMethod: {
      type: String, // e.g. 'card'
    },
  },
  {
    timestamps: true,
  }
);

// Add Indexes for performance optimization
paymentSchema.index({ user: 1 });
paymentSchema.index({ relatedType: 1, relatedId: 1 });
paymentSchema.index({ status: 1 });

module.exports = mongoose.model('Payment', paymentSchema);
