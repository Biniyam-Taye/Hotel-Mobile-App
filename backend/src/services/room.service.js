const Room = require('../models/room.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');

const createRoom = async (roomData) => {
  const roomNumber = String(roomData.roomNumber).trim();
  roomData.roomNumber = roomNumber;

  const existing = await Room.findOne({ roomNumber });
  if (existing) {
    throw new ApiError(409, `Room number "${roomNumber}" already exists. Please use a different number.`);
  }

  try {
    return await Room.create(roomData);
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
  if (updateData.roomNumber) {
    const existing = await Room.findOne({
      roomNumber: updateData.roomNumber,
      _id: { $ne: roomId },
    });
    if (existing) {
      throw new ApiError(409, `Room number "${updateData.roomNumber}" already exists. Please use a different number.`);
    }
  }

  try {
    const room = await Room.findByIdAndUpdate(roomId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      throw new ApiError(404, 'Room not found');
    }

    return room;
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, `Room number "${updateData.roomNumber}" already exists. Please use a different number.`);
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
