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

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(validate(roomCategoryValidation.createCategory), createCategory);

router
  .route('/:id')
  .get(getCategory)
  .put(validate(roomCategoryValidation.updateCategory), updateCategory)
  .delete(deleteCategory);

router.patch('/:id/toggle-status', toggleCategoryStatus);

module.exports = router;
