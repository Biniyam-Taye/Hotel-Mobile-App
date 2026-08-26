const EventCategory = require('../models/eventCategory.model');
const EventSpace = require('../models/eventSpace.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');
const { deleteImage } = require('../utils/cloudinary');

const resolveCategoryId = async (categoryId, categoryName) => {
  if (categoryId) return categoryId;

  if (categoryName) {
    const category = await EventCategory.findOne({
      name: { $regex: new RegExp(`^${categoryName.trim()}$`, 'i') },
    });
    if (!category) throw new ApiError(404, `Event category "${categoryName}" not found`);
    return category._id;
  }

  throw new ApiError(400, 'Category ID is required');
};

const buildSpaceFilter = async (query) => {
  const filterQuery = { ...query };

  if (filterQuery.categoryId) {
    filterQuery.category = filterQuery.categoryId;
    delete filterQuery.categoryId;
  }

  if (filterQuery.categoryName) {
    const category = await EventCategory.findOne({
      name: { $regex: new RegExp(`^${filterQuery.categoryName.trim()}$`, 'i') },
    });
    filterQuery.category = category ? category._id.toString() : null;
    delete filterQuery.categoryName;
  }

  return filterQuery;
};

const normalizeSpaceInput = (data) => {
  const payload = { ...data };

  if (payload.categoryId && !payload.category) {
    payload.category = payload.categoryId;
  }
  delete payload.categoryId;

  if (payload.discountedPrice === '' || payload.discountedPrice === 'null') {
    payload.discountedPrice = null;
  }

  return payload;
};

// --- Category Services ---
const getCategories = async (query) => queryBuilder(EventCategory, query, ['name']);

const getCategoryById = async (id) => {
  const category = await EventCategory.findById(id);
  if (!category) throw new ApiError(404, 'Event category not found');
  return category;
};

// --- Event Space Services ---
const createEventSpace = async (data) => {
  const payload = normalizeSpaceInput(data);
  payload.category = await resolveCategoryId(payload.category, payload.categoryName);
  delete payload.categoryName;

  const space = await EventSpace.create(payload);
  return EventSpace.findById(space._id).populate('category', 'name');
};

const getEventSpaces = async (query) => {
  const filterQuery = await buildSpaceFilter(query);

  if (filterQuery.category === null) {
    return { data: [], total: 0, page: 1, pages: 0 };
  }

  const result = await queryBuilder(EventSpace, filterQuery, ['name', 'spaceNumber', 'description']);
  await EventSpace.populate(result.data, { path: 'category', select: 'name' });
  return result;
};

const getPublicEventSpaces = async () => {
  return EventSpace.find({
    section: 'events_conference',
    publishStatus: 'Published',
    status: { $ne: 'Maintenance' },
  })
    .populate('category', 'name')
    .select('-imagePublicId')
    .sort('-isFeatured -createdAt');
};

const getEventSpaceById = async (id) => {
  const space = await EventSpace.findById(id).populate('category', 'name');
  if (!space) throw new ApiError(404, 'Event space not found');
  return space;
};

const updateEventSpace = async (id, data) => {
  const space = await EventSpace.findById(id);
  if (!space) throw new ApiError(404, 'Event space not found');

  const payload = normalizeSpaceInput(data);

  if (payload.category || payload.categoryName) {
    payload.category = await resolveCategoryId(payload.category, payload.categoryName);
    delete payload.categoryName;
  }

  if (payload.imagePublicId && space.imagePublicId && payload.imagePublicId !== space.imagePublicId) {
    await deleteImage(space.imagePublicId);
  }

  Object.assign(space, payload);
  await space.save();
  return EventSpace.findById(space._id).populate('category', 'name');
};

const deleteEventSpace = async (id) => {
  const space = await EventSpace.findById(id);
  if (!space) throw new ApiError(404, 'Event space not found');

  if (space.imagePublicId) {
    await deleteImage(space.imagePublicId);
  }

  await space.deleteOne();
  return space;
};

module.exports = {
  getCategories,
  getCategoryById,
  createEventSpace,
  getEventSpaces,
  getPublicEventSpaces,
  getEventSpaceById,
  updateEventSpace,
  deleteEventSpace,
};
