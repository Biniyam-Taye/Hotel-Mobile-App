const FoodCategory = require('../models/foodCategory.model');
const FoodItem = require('../models/foodItem.model');
const FoodOrder = require('../models/foodOrder.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const { deleteImage } = require('../utils/cloudinary');
const { sendNotification } = require('./engagement.service');

const resolveCategoryId = async (categoryId, categoryName) => {
  if (categoryId) return categoryId;

  if (categoryName) {
    const category = await FoodCategory.findOne({
      name: { $regex: new RegExp(`^${categoryName.trim()}$`, 'i') },
    });
    if (!category) {
      throw new ApiError(404, `Food category "${categoryName}" not found`);
    }
    return category._id;
  }

  throw new ApiError(400, 'Category ID or category name is required');
};

const buildFoodItemFilter = async (query) => {
  const filterQuery = { ...query };

  if (filterQuery.categoryName) {
    const category = await FoodCategory.findOne({
      name: { $regex: new RegExp(`^${filterQuery.categoryName.trim()}$`, 'i') },
    });
    if (!category) {
      return { category: null };
    }
    filterQuery.category = category._id.toString();
    delete filterQuery.categoryName;
  }

  if (filterQuery.section) {
    filterQuery.section = filterQuery.section;
  }

  return filterQuery;
};

// --- Category Services ---
const createCategory = async (data) => FoodCategory.create(data);

const getCategories = async (query) => {
  const filter = { ...query };
  if (filter.isActive !== undefined) {
    filter.isActive = filter.isActive === 'true' || filter.isActive === true;
  }
  return queryBuilder(FoodCategory, filter, ['name', 'description']);
};

const getCategoryById = async (id) => {
  const category = await FoodCategory.findById(id);
  if (!category) throw new ApiError(404, 'Category not found');
  return category;
};

const updateCategory = async (id, data) => {
  const category = await FoodCategory.findById(id);
  if (!category) throw new ApiError(404, 'Category not found');

  if (data.imagePublicId && category.imagePublicId && data.imagePublicId !== category.imagePublicId) {
    await deleteImage(category.imagePublicId);
  }

  Object.assign(category, data);
  await category.save();
  return category;
};

const deleteCategory = async (id) => {
  const category = await FoodCategory.findById(id);
  if (!category) throw new ApiError(404, 'Category not found');

  const linkedItems = await FoodItem.countDocuments({ category: id });
  if (linkedItems > 0) {
    throw new ApiError(400, 'Cannot delete category while menu items are linked to it');
  }

  if (category.imagePublicId) {
    await deleteImage(category.imagePublicId);
  }

  await category.deleteOne();
  return category;
};

// --- Food Item Services ---
const createFoodItem = async (data) => {
  const categoryId = await resolveCategoryId(data.category, data.categoryName);
  const payload = { ...data, category: categoryId };
  delete payload.categoryName;

  const food = await FoodItem.create(payload);
  return FoodItem.findById(food._id).populate('category', 'name isActive');
};

const getFoodItems = async (query) => {
  const filterQuery = await buildFoodItemFilter(query);

  if (filterQuery.category === null) {
    return { data: [], total: 0, page: 1, pages: 0 };
  }

  const result = await queryBuilder(FoodItem, filterQuery, ['name', 'tags', 'description']);
  await FoodItem.populate(result.data, { path: 'category', select: 'name isActive' });
  return result;
};

const getFoodItemById = async (id) => {
  const food = await FoodItem.findById(id).populate('category', 'name isActive');
  if (!food) throw new ApiError(404, 'Food item not found');
  return food;
};

const updateFoodItem = async (id, data) => {
  const food = await FoodItem.findById(id);
  if (!food) throw new ApiError(404, 'Food item not found');

  if (data.category || data.categoryName) {
    data.category = await resolveCategoryId(data.category, data.categoryName);
    delete data.categoryName;
  }

  if (data.imagePublicId && food.imagePublicId && data.imagePublicId !== food.imagePublicId) {
    await deleteImage(food.imagePublicId);
  }

  Object.assign(food, data);
  await food.save();
  return FoodItem.findById(food._id).populate('category', 'name isActive');
};

const deleteFoodItem = async (id) => {
  const food = await FoodItem.findById(id);
  if (!food) throw new ApiError(404, 'Food item not found');

  if (food.imagePublicId) {
    await deleteImage(food.imagePublicId);
  }

  await food.deleteOne();
  return food;
};

const getPublicMenu = async () => {
  const categories = await FoodCategory.find({ isActive: true }).sort('name');

  const menu = await Promise.all(
    categories.map(async (category) => {
      const items = await FoodItem.find({
        category: category._id,
        isAvailable: true,
        section: 'restaurant_bar',
      })
        .select('name description price image isPopular features tags preparationTime createdAt')
        .sort('-isPopular name');

      return {
        _id: category._id,
        name: category.name,
        description: category.description,
        image: category.image,
        items,
      };
    })
  );

  return menu.filter((group) => group.items.length > 0);
};

// --- Order Services ---
const createOrder = async (userId, data) => {
  let totalAmount = 0;

  for (const item of data.items) {
    const food = await FoodItem.findById(item.foodItem);
    if (!food) throw new ApiError(404, `Food item ${item.foodItem} not found`);
    if (!food.isAvailable) throw new ApiError(400, `${food.name} is currently not available`);

    item.priceAtOrder = food.price;
    totalAmount += food.price * item.quantity;
  }

  const order = await FoodOrder.create({
    ...data,
    user: userId,
    totalAmount,
  });

  sendNotification({
    userId,
    title: 'Food Order Placed',
    message: 'Your food order has been successfully placed.',
    type: 'order',
    relatedId: order._id,
  }).catch((err) => console.error('Notification failed:', err));

  return order;
};

const getOrders = async (query, userId, role) => {
  const q = { ...query };
  if (role !== 'admin') q.user = userId;

  const result = await queryBuilder(FoodOrder, q, ['status']);
  await FoodOrder.populate(result.data, [
    { path: 'user', select: 'firstName lastName email' },
    { path: 'room', select: 'title' },
    { path: 'items.foodItem', select: 'name image price' },
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
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  createFoodItem,
  getFoodItems,
  getFoodItemById,
  updateFoodItem,
  deleteFoodItem,
  getPublicMenu,
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};
