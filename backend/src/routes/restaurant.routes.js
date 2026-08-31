const express = require('express');
const ctrl = require('../controllers/restaurant.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');
const schema = require('../validations/restaurant.validation');

const router = express.Router();

// Public menu for Restaurant & Bar / hospitality frontend
router.get('/menu', ctrl.getPublicMenu);

// --- Categories ---
router.route('/categories')
  .get(ctrl.getCategories)
  .post(protect, authorize('admin', 'manager'), upload.single('image'), validate(schema.createCategory), ctrl.createCategory);

router.route('/categories/:id')
  .get(validate(schema.mongoIdParam), ctrl.getCategory)
  .put(protect, authorize('admin', 'manager'), upload.single('image'), validate(schema.updateCategory), ctrl.updateCategory)
  .delete(protect, authorize('admin', 'manager'), validate(schema.mongoIdParam), ctrl.deleteCategory);

// --- Food Items ---
router.route('/items')
  .get(ctrl.getFoodItems)
  .post(protect, authorize('admin', 'manager'), upload.single('image'), validate(schema.createFoodItem), ctrl.createFoodItem);

router.route('/items/:id')
  .get(validate(schema.mongoIdParam), ctrl.getFoodItem)
  .put(protect, authorize('admin', 'manager'), upload.single('image'), validate(schema.updateFoodItem), ctrl.updateFoodItem)
  .delete(protect, authorize('admin', 'manager'), validate(schema.mongoIdParam), ctrl.deleteFoodItem);

// --- Orders ---
router.route('/orders')
  .get(protect, ctrl.getOrders)
  .post(protect, validate(schema.createOrder), ctrl.createOrder);

router.route('/orders/:id')
  .get(protect, validate(schema.mongoIdParam), ctrl.getOrder);

router.route('/orders/:id/status')
  .put(protect, authorize('admin', 'manager'), validate(schema.updateOrderStatus), ctrl.updateOrderStatus);

module.exports = router;
