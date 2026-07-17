const mongoose = require('mongoose');

const serviceBookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    service: {
      type: mongoose.Schema.ObjectId,
      ref: 'Service',
      required: true,
    },
    room: {
      type: mongoose.Schema.ObjectId,
      ref: 'Room', // Optional, if they book from a specific room
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    specialRequests: {
      type: String,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
  }
);

// Add Indexes for performance optimization
serviceBookingSchema.index({ user: 1 });
serviceBookingSchema.index({ service: 1, status: 1 });
serviceBookingSchema.index({ bookingDate: 1 });

module.exports = mongoose.model('ServiceBooking', serviceBookingSchema);
