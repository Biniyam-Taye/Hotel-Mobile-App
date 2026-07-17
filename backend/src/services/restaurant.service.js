const FoodCategory = require('../models/foodCategory.model');
const FoodItem = require('../models/foodItem.model');
const FoodOrder = require('../models/foodOrder.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const { sendNotification } = require('./engagement.service');

// --- Category Services ---
const createCategory = async (data) => await FoodCategory.create(data);
const getCategories = async (query) => await queryBuilder(FoodCategory, query, ['name']);
const getCategoryById = async (id) => await FoodCategory.findById(id);
const updateCategory = async (id, data) => await FoodCategory.findByIdAndUpdate(id, data, { new: true });
const deleteCategory = async (id) => await FoodCategory.findByIdAndDelete(id);

// --- Food Item Services ---
const createFoodItem = async (data) => await FoodItem.create(data);
const getFoodItems = async (query) => {
  const result = await queryBuilder(FoodItem, query, ['name', 'tags', 'description']);
  // Populate category in results
  await FoodItem.populate(result.data, { path: 'category', select: 'name' });
  return result;
};
const getFoodItemById = async (id) => await FoodItem.findById(id).populate('category', 'name');
const updateFoodItem = async (id, data) => await FoodItem.findByIdAndUpdate(id, data, { new: true });
const deleteFoodItem = async (id) => await FoodItem.findByIdAndDelete(id);

// --- Order Services ---
const createOrder = async (userId, data) => {
  let totalAmount = 0;
  
  // Verify and calculate price for each item
  for (let item of data.items) {
    const food = await FoodItem.findById(item.foodItem);
    if (!food) throw new ApiError(404, `Food item ${item.foodItem} not found`);
    if (!food.isAvailable) throw new ApiError(400, `${food.name} is currently not available`);
    
    item.priceAtOrder = food.price;
    totalAmount += food.price * item.quantity;
  }

  const newOrder = {
    ...data,
    user: userId,
    totalAmount,
  };

  const order = await FoodOrder.create(newOrder);

  sendNotification({
    userId,
    title: 'Food Order Placed',
    message: `Your food order has been successfully placed.`,
    type: 'order',
    relatedId: order._id,
  }).catch(err => console.error('Notification failed:', err));

  return order;
};

const getOrders = async (query, userId, role) => {
  // If customer, only show their orders. If admin, show all (filtered by query)
  const q = { ...query };
  if (role !== 'admin') q.user = userId;
  
  const result = await queryBuilder(FoodOrder, q, ['status']);
  await FoodOrder.populate(result.data, [
    { path: 'user', select: 'firstName lastName email' },
    { path: 'room', select: 'title' },
    { path: 'items.foodItem', select: 'name image price' }
  ]);
  return result;
};

const getOrderById = async (id, userId, role) => {
  const order = await FoodOrder.findById(id)
    .populate('user', 'firstName lastName email')
    .populate('room', 'title')
    .populate('items.foodItem', 'name image');

  if (!order) throw new ApiError(404, 'Order not found');
  if (role !== 'admin' && order.user._id.toString() !== userId) {
    throw new ApiError(403, 'Not authorized to view this order');
  }
  return order;
};

const updateOrderStatus = async (id, status) => {
  const order = await FoodOrder.findByIdAndUpdate(id, { status }, { new: true });
  if (!order) throw new ApiError(404, 'Order not found');
  return order;
};

module.exports = {
  createCategory, getCategories, getCategoryById, updateCategory, deleteCategory,
  createFoodItem, getFoodItems, getFoodItemById, updateFoodItem, deleteFoodItem,
  createOrder, getOrders, getOrderById, updateOrderStatus,
};
