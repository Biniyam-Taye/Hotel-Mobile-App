import Booking from '../models/Booking.js';
import { ApiError, catchAsync, sendSuccess } from '../utils/helpers.js';
import {
  createBooking,
  formatBookingResponse,
} from '../services/bookingService.js';
import { BOOKING_STATUS, ROLES } from '../utils/constants.js';

export const createBookingHandler = catchAsync(async (req, res) => {
  const {
    hotelId,
    roomTypeId,
    checkIn,
    checkOut,
    guests,
    paymentMethod,
    specialRequests,
    couponCode,
  } = req.body;

  if (!hotelId || !roomTypeId || !checkIn || !checkOut || !guests || !paymentMethod) {
    throw new ApiError(400, 'hotelId, roomTypeId, checkIn, checkOut, guests, and paymentMethod are required');
  }

  const { booking } = await createBooking({
    guestId: req.user._id,
    hotelId,
    roomTypeId,
    checkIn,
    checkOut,
    guests: Number(guests),
    paymentMethod,
    specialRequests,
    couponCode,
    status: BOOKING_STATUS.CONFIRMED,
    paymentStatus: paymentMethod === 'stripe' ? 'unpaid' : 'paid',
  });

  const formatted = await formatBookingResponse(booking);
  sendSuccess(res, formatted, 201);
});

export const getMyBookings = catchAsync(async (req, res) => {
  const bookings = await Booking.find({ guestId: req.user._id })
    .sort({ createdAt: -1 });

  const data = await Promise.all(bookings.map((b) => formatBookingResponse(b)));
  sendSuccess(res, data);
});

export const getBookingById = catchAsync(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, 'Booking not found');

  const isGuest = booking.guestId.toString() === req.user._id.toString();
  const isStaff =
    req.user.role !== ROLES.GUEST &&
    req.user.assignedHotels?.some((id) => id.toString() === booking.hotelId.toString());
  const isSuperAdmin = req.user.role === ROLES.SUPER_ADMIN;

  if (!isGuest && !isStaff && !isSuperAdmin) {
    throw new ApiError(403, 'Forbidden');
  }

  sendSuccess(res, await formatBookingResponse(booking));
});

export const cancelBooking = catchAsync(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, 'Booking not found');

  if (booking.guestId.toString() !== req.user._id.toString() && req.user.role === ROLES.GUEST) {
    throw new ApiError(403, 'Forbidden');
  }

  if ([BOOKING_STATUS.CANCELLED, BOOKING_STATUS.COMPLETED, BOOKING_STATUS.REFUNDED].includes(booking.status)) {
    throw new ApiError(400, 'Booking cannot be cancelled');
  }

  booking.status = BOOKING_STATUS.CANCELLED;
  await booking.save();

  sendSuccess(res, await formatBookingResponse(booking));
});

export const getAdminBookings = catchAsync(async (req, res) => {
  let filter = {};
  if (req.user.role === ROLES.HOTEL_ADMIN || req.user.role === ROLES.RECEPTIONIST) {
    filter.hotelId = { $in: req.user.assignedHotels };
  }
  if (req.query.hotelId) filter.hotelId = req.query.hotelId;

  const bookings = await Booking.find(filter)
    .populate('guestId', 'fullName email phone')
    .populate('hotelId', 'name')
    .populate('roomTypeId', 'name type')
    .sort({ createdAt: -1 });

  sendSuccess(
    res,
    bookings.map((b) => ({
      id: b.bookingRef,
      guest: b.guestId?.fullName ?? '',
      hotel: b.hotelId?.name ?? '',
      room: b.roomTypeId?.name ?? '',
      checkIn: b.checkIn,
      checkOut: b.checkOut,
      status: b.status,
      amount: b.totalPrice,
      paymentMethod: b.paymentMethod,
    }))
  );
});

export const updateBookingStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  if (!status) throw new ApiError(400, 'status is required');

  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, 'Booking not found');

  booking.status = status;
  await booking.save();

  sendSuccess(res, await formatBookingResponse(booking));
});
