const express = require('express');
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
} = require('../controllers/roomCategory.controller');
const validate = require('../middlewares/validate.middleware');
const roomCategoryValidation = require('../validations/roomCategory.validation');

const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(protect, authorize('admin', 'manager'), validate(roomCategoryValidation.createCategory), createCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(protect, authorize('admin', 'manager'), validate(roomCategoryValidation.updateCategory), updateCategory)
  .delete(protect, authorize('admin', 'manager'), deleteCategory);

router.patch('/:id/toggle-status', protect, authorize('admin', 'manager'), toggleCategoryStatus);

module.exports = router;
