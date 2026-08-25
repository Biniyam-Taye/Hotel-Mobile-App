const Room = require('../models/room.model');
const ApiError = require('../utils/apiError');
const queryBuilder = require('../utils/queryBuilder');

const createRoom = async (roomData) => {
  return await Room.create(roomData);
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
  const room = await Room.findByIdAndUpdate(roomId, updateData, {
    new: true,
    runValidators: true,
  });

  if (!room) {
    throw new ApiError(404, 'Room not found');
  }

  return room;
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
