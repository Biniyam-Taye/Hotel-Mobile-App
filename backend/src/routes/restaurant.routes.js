const express = require('express');
const ctrl = require('../controllers/restaurant.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const schema = require('../validations/restaurant.validation');

const router = express.Router();

// --- Categories ---
router.route('/categories')
  .get(ctrl.getCategories)
  .post(protect, authorize('admin'), upload.single('image'), validate(schema.createCategory), ctrl.createCategory);

router.route('/categories/:id')
  .put(protect, authorize('admin'), upload.single('image'), validate(schema.updateCategory), ctrl.updateCategory)
  .delete(protect, authorize('admin'), ctrl.deleteCategory);

// --- Food Items ---
router.route('/items')
  .get(ctrl.getFoodItems)
  .post(protect, authorize('admin'), upload.single('image'), validate(schema.createFoodItem), ctrl.createFoodItem);

router.route('/items/:id')
  .get(ctrl.getFoodItem)
  .put(protect, authorize('admin'), upload.single('image'), validate(schema.updateFoodItem), ctrl.updateFoodItem)
  .delete(protect, authorize('admin'), ctrl.deleteFoodItem);

// --- Orders ---
router.route('/orders')
  .get(protect, ctrl.getOrders)
  .post(protect, validate(schema.createOrder), ctrl.createOrder);

router.route('/orders/:id')
  .get(protect, ctrl.getOrder);

router.route('/orders/:id/status')
  .put(protect, authorize('admin'), validate(schema.updateOrderStatus), ctrl.updateOrderStatus);

module.exports = router;
