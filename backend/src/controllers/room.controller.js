const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const roomService = require('../services/room.service');
const { uploadSingle, uploadMultiple } = require('../utils/cloudinary');

const applyRoomUploads = async (files) => {
  const result = {};

  if (files?.image?.[0]) {
    const main = await uploadSingle(files.image[0].buffer, 'rooms');
    result.mainImage = main.url;
  }

  if (files?.detailImages?.length) {
    const uploaded = await uploadMultiple(
      files.detailImages.map((file) => file.buffer),
      'rooms/details'
    );
    result.newDetailImages = uploaded.map((item) => item.url);
  }

  return result;
};

// @desc    Create a room
// @route   POST /api/v1/rooms
// @access  Private/Admin
const createRoom = asyncHandler(async (req, res, next) => {
  const imageData = await applyRoomUploads(req.files);
  const room = await roomService.createRoom({ ...req.body, ...imageData });
  res.status(201).json(new ApiResponse(201, { room }, 'Room created successfully'));
});

// @desc    Get all rooms
// @route   GET /api/v1/rooms
// @access  Public
const getRooms = asyncHandler(async (req, res, next) => {
  const result = await roomService.getAllRooms(req.query);
  res.status(200).json(new ApiResponse(200, result));
});

// @desc    Get single room
// @route   GET /api/v1/rooms/:id
// @access  Public
const getRoom = asyncHandler(async (req, res, next) => {
  const room = await roomService.getRoomById(req.params.id);
  res.status(200).json(new ApiResponse(200, { room }));
});

// @desc    Update room
// @route   PUT /api/v1/rooms/:id
// @access  Private/Admin
const updateRoom = asyncHandler(async (req, res, next) => {
  const imageData = await applyRoomUploads(req.files);
  const room = await roomService.updateRoomById(req.params.id, { ...req.body, ...imageData });
  res.status(200).json(new ApiResponse(200, { room }, 'Room updated successfully'));
});

// @desc    Delete room
// @route   DELETE /api/v1/rooms/:id
// @access  Private/Admin
const deleteRoom = asyncHandler(async (req, res, next) => {
  await roomService.deleteRoomById(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Room deleted successfully'));
});

module.exports = {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
};

