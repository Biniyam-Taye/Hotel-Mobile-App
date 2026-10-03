const express = require('express');
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  getBooking,
  updateBookingStatus,
} = require('../controllers/booking.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const bookingValidation = require('../validations/booking.validation');

const router = express.Router();

// All routes here require authentication
router.use(protect);

router
  .route('/')
  .post(validate(bookingValidation.createBooking), createBooking)
  .get(authorize('admin', 'manager'), getAllBookings);

router.get('/my', getMyBookings);

router
  .route('/:id')
  .get(getBooking);

router
  .route('/:id/status')
  .put(authorize('admin', 'manager'), validate(bookingValidation.updateBookingStatus), updateBookingStatus);

module.exports = router;
