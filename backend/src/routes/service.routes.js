const express = require('express');
const ctrl = require('../controllers/service.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const schema = require('../validations/service.validation');

const router = express.Router();

router.get('/public/hotel', ctrl.getPublicHotelServices);

router.route('/')
  .get(ctrl.getServices)
  .post(protect, authorize('admin'), upload.single('image'), validate(schema.createService), ctrl.createService);

router.route('/:id')
  .get(validate(schema.mongoIdParam), ctrl.getService)
  .put(protect, authorize('admin'), upload.single('image'), validate(schema.updateService), ctrl.updateService)
  .delete(protect, authorize('admin'), validate(schema.mongoIdParam), ctrl.deleteService);

const bookingRouter = express.Router({ mergeParams: true });
router.use('/bookings', bookingRouter);

bookingRouter.route('/')
  .get(protect, ctrl.getBookings)
  .post(protect, validate(schema.createServiceBooking), ctrl.createBooking);

bookingRouter.route('/:id')
  .get(protect, validate(schema.mongoIdParam), ctrl.getBooking);

bookingRouter.route('/:id/status')
  .put(protect, authorize('admin'), validate(schema.updateServiceBookingStatus), ctrl.updateBookingStatus);

module.exports = router;
