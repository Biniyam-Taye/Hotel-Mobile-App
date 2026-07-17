const express = require('express');
const ctrl = require('../controllers/service.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const schema = require('../validations/service.validation');

const router = express.Router();

// --- Services (Public & Admin) ---
router.route('/')
  .get(ctrl.getServices)
  .post(protect, authorize('admin'), upload.single('image'), validate(schema.createService), ctrl.createService);

router.route('/:id')
  .get(ctrl.getService)
  .put(protect, authorize('admin'), upload.single('image'), validate(schema.updateService), ctrl.updateService)
  .delete(protect, authorize('admin'), ctrl.deleteService);

// --- Service Bookings (Private) ---
// Note: Mount this before the ID routes to avoid conflict or use a different prefix.
// Wait, to avoid conflict with `/:id`, we should use `/bookings` as a prefix, but we can't easily do it within the same router without careful ordering, so let's create a separate router or use nested paths.
// Let's use `/bookings` prefix for bookings.

const bookingRouter = express.Router({ mergeParams: true });
router.use('/bookings', bookingRouter);

bookingRouter.route('/')
  .get(protect, ctrl.getBookings)
  .post(protect, validate(schema.createServiceBooking), ctrl.createBooking);

bookingRouter.route('/:id')
  .get(protect, ctrl.getBooking);

bookingRouter.route('/:id/status')
  .put(protect, authorize('admin'), validate(schema.updateServiceBookingStatus), ctrl.updateBookingStatus);

module.exports = router;
