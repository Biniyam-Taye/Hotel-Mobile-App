const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const eventService = require('../services/event.service');
const { uploadSingle } = require('../utils/cloudinary');

const applyUploadedImage = async (file, folder) => {
  if (!file) return {};
  const result = await uploadSingle(file.buffer, folder);
  return { image: result.url, imagePublicId: result.publicId };
};

const getCategories = asyncHandler(async (req, res) => {
  const result = await eventService.getCategories(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const getCategory = asyncHandler(async (req, res) => {
  const category = await eventService.getCategoryById(req.params.id);
  res.status(200).json(new ApiResponse(200, { category }));
});

const createEventSpace = asyncHandler(async (req, res) => {
  const imageData = await applyUploadedImage(req.file, 'events/spaces');
  const space = await eventService.createEventSpace({
    ...req.body,
    ...imageData,
    section: req.body.section || 'events_conference',
  });
  res.status(201).json(new ApiResponse(201, { space }, 'Event space created'));
});

const getEventSpaces = asyncHandler(async (req, res) => {
  const result = await eventService.getEventSpaces(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

const getPublicEventSpaces = asyncHandler(async (req, res) => {
  const spaces = await eventService.getPublicEventSpaces();
  res.status(200).json(new ApiResponse(200, { spaces }));
});

const getEventSpace = asyncHandler(async (req, res) => {
  const space = await eventService.getEventSpaceById(req.params.id);
  res.status(200).json(new ApiResponse(200, { space }));
});

const updateEventSpace = asyncHandler(async (req, res) => {
  const imageData = await applyUploadedImage(req.file, 'events/spaces');
  const space = await eventService.updateEventSpace(req.params.id, { ...req.body, ...imageData });
  res.status(200).json(new ApiResponse(200, { space }, 'Event space updated'));
});

const deleteEventSpace = asyncHandler(async (req, res) => {
  await eventService.deleteEventSpace(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Event space deleted'));
});

module.exports = {
  getCategories,
  getCategory,
  createEventSpace,
  getEventSpaces,
  getPublicEventSpaces,
  getEventSpace,
  updateEventSpace,
  deleteEventSpace,
};
