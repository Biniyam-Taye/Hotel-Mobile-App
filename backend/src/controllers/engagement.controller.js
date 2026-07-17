const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const engService = require('../services/engagement.service');

// --- Favorites ---
const toggleFavorite = asyncHandler(async (req, res) => {
  const { itemType, itemId } = req.body;
  const result = await engService.toggleFavorite(req.user.id, itemType, itemId);
  res.status(200).json(new ApiResponse(200, result, 'Favorite updated'));
});

const getFavorites = asyncHandler(async (req, res) => {
  const result = await engService.getFavorites(req.user.id, req.query);
  res.status(200).json(new ApiResponse(200, result));
});

// --- Reviews ---
const addReview = asyncHandler(async (req, res) => {
  const review = await engService.addReview(req.user.id, req.body);
  res.status(201).json(new ApiResponse(201, { review }, 'Review added'));
});

const getReviews = asyncHandler(async (req, res) => {
  const result = await engService.getReviews(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const updateReview = asyncHandler(async (req, res) => {
  const review = await engService.updateReview(req.params.id, req.user.id, req.body);
  res.status(200).json(new ApiResponse(200, { review }, 'Review updated'));
});

const deleteReview = asyncHandler(async (req, res) => {
  await engService.deleteReview(req.params.id, req.user.id, req.user.role);
  res.status(200).json(new ApiResponse(200, null, 'Review deleted'));
});

// --- Notifications ---
const sendNotification = asyncHandler(async (req, res) => {
  const notification = await engService.sendNotification(req.body);
  res.status(201).json(new ApiResponse(201, { notification }, 'Notification sent'));
});

const getMyNotifications = asyncHandler(async (req, res) => {
  const result = await engService.getMyNotifications(req.user.id, req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const markNotificationAsRead = asyncHandler(async (req, res) => {
  const notification = await engService.markAsRead(req.params.id, req.user.id);
  res.status(200).json(new ApiResponse(200, { notification }, 'Notification marked as read'));
});

module.exports = {
  toggleFavorite, getFavorites,
  addReview, getReviews, updateReview, deleteReview,
  sendNotification, getMyNotifications, markNotificationAsRead,
};
