const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const restService = require('../services/restaurant.service');
const { uploadSingle } = require('../utils/cloudinary');

// --- Category Controllers ---
const createCategory = asyncHandler(async (req, res) => {
  let image;
  if (req.file) {
    const result = await uploadSingle(req.file.buffer, 'restaurant/categories');
    image = result.url;
  }
  const category = await restService.createCategory({ ...req.body, image });
  res.status(201).json(new ApiResponse(201, { category }, 'Category created'));
});

const getCategories = asyncHandler(async (req, res) => {
  const result = await restService.getCategories(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const updateCategory = asyncHandler(async (req, res) => {
  let data = { ...req.body };
  if (req.file) {
    const result = await uploadSingle(req.file.buffer, 'restaurant/categories');
    data.image = result.url;
  }
  const category = await restService.updateCategory(req.params.id, data);
  res.status(200).json(new ApiResponse(200, { category }, 'Category updated'));
});

const deleteCategory = asyncHandler(async (req, res) => {
  await restService.deleteCategory(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Category deleted'));
});

// --- Food Item Controllers ---
const createFoodItem = asyncHandler(async (req, res) => {
  let image;
  if (req.file) {
    const result = await uploadSingle(req.file.buffer, 'restaurant/food');
    image = result.url;
  }
  const food = await restService.createFoodItem({ ...req.body, image });
  res.status(201).json(new ApiResponse(201, { food }, 'Food item created'));
});

const getFoodItems = asyncHandler(async (req, res) => {
  const result = await restService.getFoodItems(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const getFoodItem = asyncHandler(async (req, res) => {
  const food = await restService.getFoodItemById(req.params.id);
  res.status(200).json(new ApiResponse(200, { food }));
});

const updateFoodItem = asyncHandler(async (req, res) => {
  let data = { ...req.body };
  if (req.file) {
    const result = await uploadSingle(req.file.buffer, 'restaurant/food');
    data.image = result.url;
  }
  const food = await restService.updateFoodItem(req.params.id, data);
  res.status(200).json(new ApiResponse(200, { food }, 'Food item updated'));
});

const deleteFoodItem = asyncHandler(async (req, res) => {
  await restService.deleteFoodItem(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Food item deleted'));
});

// --- Food Order Controllers ---
const createOrder = asyncHandler(async (req, res) => {
  const order = await restService.createOrder(req.user.id, req.body);
  res.status(201).json(new ApiResponse(201, { order }, 'Order placed successfully'));
});

const getOrders = asyncHandler(async (req, res) => {
  const result = await restService.getOrders(req.query, req.user.id, req.user.role);
  res.status(200).json(new ApiResponse(200, result));
});

const getOrder = asyncHandler(async (req, res) => {
  const order = await restService.getOrderById(req.params.id, req.user.id, req.user.role);
  res.status(200).json(new ApiResponse(200, { order }));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await restService.updateOrderStatus(req.params.id, req.body.status);
  res.status(200).json(new ApiResponse(200, { order }, 'Order status updated'));
});

module.exports = {
  createCategory, getCategories, updateCategory, deleteCategory,
  createFoodItem, getFoodItems, getFoodItem, updateFoodItem, deleteFoodItem,
  createOrder, getOrders, getOrder, updateOrderStatus,
};
