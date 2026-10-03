const express = require('express');
const ctrl = require('../controllers/promotion.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const schema = require('../validations/promotion.validation');

const router = express.Router();

const offerUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'detailImages', maxCount: 3 },
]);

// --- Offers ---
const offerRouter = express.Router();
router.use('/offers', offerRouter);

offerRouter.get('/public', ctrl.getPublicOffers);

offerRouter.route('/')
  .get(ctrl.getOffers)
  .post(protect, authorize('admin', 'manager'), offerUpload, validate(schema.createOffer), ctrl.createOffer);

offerRouter.route('/:id')
  .get(validate(schema.mongoIdParam), ctrl.getOffer)
  .put(protect, authorize('admin', 'manager'), offerUpload, validate(schema.updateOffer), ctrl.updateOffer)
  .delete(protect, authorize('admin', 'manager'), validate(schema.mongoIdParam), ctrl.deleteOffer);

// --- Coupons ---
const couponRouter = express.Router();
router.use('/coupons', couponRouter);

couponRouter.post('/apply', protect, validate(schema.validateCoupon), ctrl.applyCoupon);

couponRouter.route('/')
  .get(protect, authorize('admin', 'manager'), ctrl.getCoupons)
  .post(protect, authorize('admin', 'manager'), validate(schema.createCoupon), ctrl.createCoupon);

couponRouter.route('/:id')
  .get(protect, authorize('admin', 'manager'), ctrl.getCoupon)
  .put(protect, authorize('admin', 'manager'), validate(schema.updateCoupon), ctrl.updateCoupon)
  .delete(protect, authorize('admin', 'manager'), ctrl.deleteCoupon);

module.exports = router;
