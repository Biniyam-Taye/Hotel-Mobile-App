const RoomCategory = require('../models/roomCategory.model');
const Room = require('../models/room.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');

const LEGACY_CATEGORY_IDS = {
  'Standard Room': 'c1',
  'Deluxe Ocean View': 'c2',
  'Executive Suite': 'c3',
  'Family Connecting Room': 'c4',
  'Presidential Suite': 'c5',
};

const getCategoryRoomFilter = (category) => {
  const categoryId = String(category._id);
  const categoryName = category.name;
  const legacyId = LEGACY_CATEGORY_IDS[categoryName];
  const firstWord = categoryName.split(' ')[0];

  const or = [
    { categoryId },
    { categoryName: { $regex: new RegExp(`^${categoryName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i') } },
  ];

  if (legacyId) {
    or.push({ categoryId: legacyId });
  }

  if (firstWord.length >= 3) {
    or.push({ categoryName: { $regex: new RegExp(`^${firstWord}`, 'i') } });
  }

  return { $or: or };
};

const attachRoomsCount = async (categories) => {
  const list = Array.isArray(categories) ? categories : [categories];

  return Promise.all(
    list.map(async (category) => {
      const doc = category.toObject ? category.toObject() : { ...category };
      doc.roomsCount = await Room.countDocuments(getCategoryRoomFilter(doc));
      return doc;
    })
  );
};

const createCategory = async (data) => {
  const existing = await RoomCategory.findOne({ name: data.name.trim() });
  if (existing) {
    throw new ApiError(409, `Category "${data.name}" already exists.`);
  }

  try {
    const category = await RoomCategory.create({
      ...data,
      name: data.name.trim(),
      basePrice: Math.round(data.basePrice),
      maxGuests: data.maxGuests || 2,
      status: data.status || 'Active',
    });
    const [withCount] = await attachRoomsCount(category);
    return withCount;
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, `Category "${data.name}" already exists.`);
    }
    throw error;
  }
};

const getAllCategories = async (query) => {
  const result = await queryBuilder(RoomCategory, query, ['name', 'description']);
  result.data = await attachRoomsCount(result.data);
  return result;
};

const getCategoryById = async (categoryId) => {
  const category = await RoomCategory.findById(categoryId);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }
  const [withCount] = await attachRoomsCount(category);
  return withCount;
};

const updateCategoryById = async (categoryId, updateData) => {
  if (updateData.name) {
    const existing = await RoomCategory.findOne({
      name: updateData.name.trim(),
      _id: { $ne: categoryId },
    });
    if (existing) {
      throw new ApiError(409, `Category "${updateData.name}" already exists.`);
    }
    updateData.name = updateData.name.trim();
  }

  if (updateData.basePrice != null) {
    updateData.basePrice = Math.round(updateData.basePrice);
  }

  try {
    const category = await RoomCategory.findByIdAndUpdate(categoryId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      throw new ApiError(404, 'Category not found');
    }

    const [withCount] = await attachRoomsCount(category);
    return withCount;
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, `Category "${updateData.name}" already exists.`);
    }
    throw error;
  }
};

const toggleCategoryStatus = async (categoryId) => {
  const category = await RoomCategory.findById(categoryId);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  category.status = category.status === 'Active' ? 'Inactive' : 'Active';
  await category.save();

  const [withCount] = await attachRoomsCount(category);
  return withCount;
};

const deleteCategoryById = async (categoryId) => {
  const category = await RoomCategory.findById(categoryId);
  if (!category) {
    throw new ApiError(404, 'Category not found');
  }

  const roomsUsingCategory = await Room.countDocuments(getCategoryRoomFilter(category));
  if (roomsUsingCategory > 0) {
    throw new ApiError(
      409,
      `Cannot delete category. ${roomsUsingCategory} room(s) are still assigned to it.`
    );
  }

  await RoomCategory.findByIdAndDelete(categoryId);
  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  toggleCategoryStatus,
  deleteCategoryById,
};
