// backend/src/services/room.service.js
const Room = require('../models/room.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');

const parseJsonField = (value) => {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const normalizeRoomInput = (data) => {
  const payload = { ...data };

  if (typeof payload.amenities === 'string') {
    payload.amenities = parseJsonField(payload.amenities);
  }
  if (typeof payload.detailImages === 'string') {
    payload.detailImages = parseJsonField(payload.detailImages);
  }

  if (Array.isArray(payload.detailImages)) {
    payload.detailImages = payload.detailImages.filter(Boolean);
  }

  // If new detail images were uploaded, append them to the existing ones
  if (Array.isArray(payload.newDetailImages)) {
    const existing = Array.isArray(payload.detailImages) ? payload.detailImages : [];
    payload.detailImages = [...existing, ...payload.newDetailImages];
    delete payload.newDetailImages;
  }

  return payload;
};

const createRoom = async (roomData) => {
  const normalized = normalizeRoomInput(roomData);
  const roomNumber = String(normalized.roomNumber).trim();
  normalized.roomNumber = roomNumber;

  const existing = await Room.findOne({ roomNumber });
  if (existing) {
    throw new ApiError(409, `Room number "${roomNumber}" already exists. Please use a different number.`);
  }

  try {
    return await Room.create(normalized);
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, `Room number "${roomNumber}" already exists. Please use a different number.`);
    }
    throw error;
  }
};

const getAllRooms = async (query) => {
  const queryCopy = { ...query };

  if (queryCopy.published === 'true') {
    queryCopy.publishStatus = 'Published';
    delete queryCopy.published;
  }

  return await queryBuilder(Room, queryCopy, ['roomNumber', 'name', 'categoryName']);
};

const getRoomById = async (roomId) => {
  const room = await Room.findById(roomId);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }
  return room;
};

const updateRoomById = async (roomId, updateData) => {
  const normalized = normalizeRoomInput(updateData);

  if (normalized.roomNumber) {
    const existing = await Room.findOne({
      roomNumber: normalized.roomNumber,
      _id: { $ne: roomId },
    });
    if (existing) {
      throw new ApiError(409, `Room number "${normalized.roomNumber}" already exists. Please use a different number.`);
    }
  }

  try {
    const room = await Room.findByIdAndUpdate(roomId, normalized, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      throw new ApiError(404, 'Room not found');
    }

    return room;
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, `Room number "${normalized.roomNumber}" already exists. Please use a different number.`);
    }
    throw error;
  }
};

const deleteRoomById = async (roomId) => {
  const room = await Room.findByIdAndDelete(roomId);
  if (!room) {
    throw new ApiError(404, 'Room not found');
  }
  return room;
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoomById,
  deleteRoomById,
};
