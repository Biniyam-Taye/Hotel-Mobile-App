import mongoose from 'mongoose';
import { BOOKING_STATUS, PAYMENT_METHODS } from '../utils/constants.js';

const bookingSchema = new mongoose.Schema(
  {
    bookingRef: { type: String, required: true, unique: true },
    guestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hotel',
      required: true,
      index: true,
    },
    roomTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RoomType',
      required: true,
    },
    physicalRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PhysicalRoom',
    },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, required: true, min: 1 },
    nights: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    subtotal: { type: Number, required: true },
    platformCommission: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(BOOKING_STATUS),
      default: BOOKING_STATUS.PENDING,
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: PAYMENT_METHODS,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['unpaid', 'paid', 'refunded', 'failed'],
      default: 'unpaid',
    },
    stripePaymentIntentId: String,
    stripeSessionId: String,
    specialRequests: String,
    couponCode: String,
  },
  { timestamps: true }
);

bookingSchema.index({ hotelId: 1, checkIn: 1, checkOut: 1 });
bookingSchema.index({ roomTypeId: 1, checkIn: 1, checkOut: 1, status: 1 });

export default mongoose.model('Booking', bookingSchema);
