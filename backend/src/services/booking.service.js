const Booking = require('../models/booking.model');
const Room = require('../models/room.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const { sendNotification } = require('./engagement.service');

const createBooking = async (userId, bookingData) => {
  // Check if room exists
  const room = await Room.findById(bookingData.room);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }

  // Calculate total amount based on dates (Simple calculation)
  const checkIn = new Date(bookingData.checkInDate);
  const checkOut = new Date(bookingData.checkOutDate);
  
  if (checkIn >= checkOut) {
    throw new ApiError(400, 'Check-out date must be after check-in date');
  }

  const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  const totalAmount = nights * room.pricePerNight;

  // Check for overlapping dates
  const overlappingBookings = await Booking.find({
    room: bookingData.room,
    status: { $in: ['pending', 'confirmed'] },
    $or: [
      { checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }
    ]
  });

  if (overlappingBookings.length > 0) {
    throw new ApiError(400, 'Room is already booked for the selected dates');
  }

  const newBooking = {
    ...bookingData,
    user: userId,
    totalAmount,
  };

  const booking = await Booking.create(newBooking);

  // Send Notification asynchronously
  sendNotification({
    userId,
    title: 'Booking Created',
    message: `Your booking for ${room.title} has been received.`,
    type: 'booking',
    relatedId: booking._id,
  }).catch(err => console.error('Notification failed:', err));

  return booking;
};

const getBookingsByUser = async (userId, query = {}) => {
  const q = { ...query, user: userId };
  const result = await queryBuilder(Booking, q, ['status']);
  await Booking.populate(result.data, { path: 'room', select: 'title images pricePerNight' });
  return result;
};

const getAllBookings = async (query = {}) => {
  const result = await queryBuilder(Booking, query, ['status']);
  await Booking.populate(result.data, [
    { path: 'user', select: 'firstName lastName email' },
    { path: 'room', select: 'title' }
  ]);
  return result;
};

const getBookingById = async (bookingId) => {
  const booking = await Booking.findById(bookingId)
    .populate('user', 'firstName lastName email')
    .populate('room', 'title images pricePerNight');
    
  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  return booking;
};

const updateBookingStatus = async (bookingId, status) => {
  const booking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true, runValidators: true }
  );

  if (!booking) {
    throw new ApiError(404, 'Booking not found');
  }
  return booking;
};

module.exports = {
  createBooking,
  getBookingsByUser,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
};
