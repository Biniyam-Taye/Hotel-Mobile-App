const express = require('express');
const ctrl = require('../controllers/promotion.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const schema = require('../validations/promotion.validation');

const router = express.Router();

// --- Offers ---
const offerRouter = express.Router();
router.use('/offers', offerRouter);

offerRouter.route('/')
  .get(ctrl.getOffers)
  .post(protect, authorize('admin'), upload.single('image'), validate(schema.createOffer), ctrl.createOffer);

offerRouter.route('/:id')
  .get(ctrl.getOffer)
  .put(protect, authorize('admin'), upload.single('image'), validate(schema.updateOffer), ctrl.updateOffer)
  .delete(protect, authorize('admin'), ctrl.deleteOffer);

// --- Coupons ---
const couponRouter = express.Router();
router.use('/coupons', couponRouter);

// Public route to apply a coupon
couponRouter.post('/apply', protect, validate(schema.validateCoupon), ctrl.applyCoupon);

couponRouter.route('/')
  .get(protect, authorize('admin'), ctrl.getCoupons)
  .post(protect, authorize('admin'), validate(schema.createCoupon), ctrl.createCoupon);

couponRouter.route('/:id')
  .get(protect, authorize('admin'), ctrl.getCoupon)
  .put(protect, authorize('admin'), validate(schema.updateCoupon), ctrl.updateCoupon)
  .delete(protect, authorize('admin'), ctrl.deleteCoupon);

module.exports = router;
