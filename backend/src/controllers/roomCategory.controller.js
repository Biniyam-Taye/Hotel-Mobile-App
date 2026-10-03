const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const roomCategoryService = require('../services/roomCategory.service');

const createCategory = asyncHandler(async (req, res) => {
  const category = await roomCategoryService.createCategory(req.body);
  res.status(201).json(new ApiResponse(201, { category }, 'Category created successfully'));
});

const getCategories = asyncHandler(async (req, res) => {
  const result = await roomCategoryService.getAllCategories(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await roomCategoryService.getCategoryById(req.params.id);
  res.status(200).json(new ApiResponse(200, { category }));
});

const updateCategory = asyncHandler(async (req, res) => {
  const category = await roomCategoryService.updateCategoryById(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { category }, 'Category updated successfully'));
});

const toggleCategoryStatus = asyncHandler(async (req, res) => {
  const category = await roomCategoryService.toggleCategoryStatus(req.params.id);
  res.status(200).json(new ApiResponse(200, { category }, 'Category status updated'));
});

const deleteCategory = asyncHandler(async (req, res) => {
  await roomCategoryService.deleteCategoryById(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Category deleted successfully'));
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  toggleCategoryStatus,
  deleteCategory,
};
