const Favorite = require('../models/favorite.model');
const Review = require('../models/review.model');
const Notification = require('../models/notification.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');

// --- Favorites Services ---
const toggleFavorite = async (userId, itemType, itemId) => {
  const existing = await Favorite.findOne({ user: userId, itemType, itemId });
  if (existing) {
    await Favorite.findByIdAndDelete(existing._id);
    return { favorited: false };
  } else {
    await Favorite.create({ user: userId, itemType, itemId });
    return { favorited: true };
  }
};

const getFavorites = async (userId, query) => {
  const q = { ...query, user: userId };
  const result = await queryBuilder(Favorite, q);
  await Favorite.populate(result.data, { path: 'itemId' });
  return result;
};

// --- Reviews Services ---
const addReview = async (userId, data) => {
  // Try to create, will fail if duplicate exists
  try {
    return await Review.create({ ...data, user: userId });
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(400, 'You have already reviewed this item');
    }
    throw error;
  }
};

const getReviews = async (query) => {
  const result = await queryBuilder(Review, query);
  await Review.populate(result.data, { path: 'user', select: 'firstName lastName profilePicture' });
  return result;
};

const updateReview = async (id, userId, data) => {
  const review = await Review.findById(id);
  if (!review) throw new ApiError(404, 'Review not found');
  if (review.user.toString() !== userId) throw new ApiError(403, 'Not authorized');

  Object.assign(review, data);
  await review.save();
  return review;
};

const deleteReview = async (id, userId, role) => {
  const review = await Review.findById(id);
  if (!review) throw new ApiError(404, 'Review not found');
  if (role !== 'admin' && review.user.toString() !== userId) {
    throw new ApiError(403, 'Not authorized');
  }
  await Review.findByIdAndDelete(id);
};

// --- Notifications Services ---
const sendNotification = async (data) => {
  return await Notification.create({
    user: data.userId,
    title: data.title,
    message: data.message,
    type: data.type,
    relatedId: data.relatedId,
  });
};

const getMyNotifications = async (userId, query) => {
  const q = { ...query, user: userId };
  return await queryBuilder(Notification, q);
};

const markAsRead = async (notificationId, userId) => {
  const notif = await Notification.findOneAndUpdate(
    { _id: notificationId, user: userId },
    { isRead: true },
    { new: true }
  );
  if (!notif) throw new ApiError(404, 'Notification not found');
  return notif;
};

module.exports = {
  toggleFavorite, getFavorites,
  addReview, getReviews, updateReview, deleteReview,
  sendNotification, getMyNotifications, markAsRead,
};
