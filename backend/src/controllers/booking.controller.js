const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const bookingService = require('../services/booking.service');
const ApiError = require('../utils/apiError');

// @desc    Create a booking
// @route   POST /api/v1/bookings
// @access  Private (Customer)
const createBooking = asyncHandler(async (req, res, next) => {
  const booking = await bookingService.createBooking(req.user.id, req.body);
  res.status(201).json(new ApiResponse(201, { booking }, 'Booking created successfully'));
});

// @desc    Get logged in user bookings
// @route   GET /api/v1/bookings/my
// @access  Private
const getMyBookings = asyncHandler(async (req, res, next) => {
  const result = await bookingService.getBookingsByUser(req.user.id, req.query);
  res.status(200).json(new ApiResponse(200, result));
});

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private/Admin
const getAllBookings = asyncHandler(async (req, res, next) => {
  const result = await bookingService.getAllBookings(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

// @desc    Get single booking
// @route   GET /api/v1/bookings/:id
// @access  Private
const getBooking = asyncHandler(async (req, res, next) => {
  const booking = await bookingService.getBookingById(req.params.id);
  
  // Make sure user owns the booking or is an admin
  if (booking.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ApiError(403, 'Not authorized to access this booking'));
  }
  
  res.status(200).json(new ApiResponse(200, { booking }));
});

// @desc    Update booking status
// @route   PUT /api/v1/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = asyncHandler(async (req, res, next) => {
  const booking = await bookingService.updateBookingStatus(req.params.id, req.body.status);
  res.status(200).json(new ApiResponse(200, { booking }, 'Booking status updated'));
});

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBooking,
  updateBookingStatus,
};
