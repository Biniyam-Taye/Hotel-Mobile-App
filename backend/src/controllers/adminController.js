import RoomType from '../models/RoomType.js';
import PhysicalRoom from '../models/PhysicalRoom.js';
import User from '../models/User.js';
import { ApiError, catchAsync, sendSuccess } from '../utils/helpers.js';
import { ROLES } from '../utils/constants.js';

export const getRooms = catchAsync(async (req, res) => {
  let filter = {};
  if (req.query.hotelId) filter.hotelId = req.query.hotelId;
  if (req.user.role === ROLES.HOTEL_ADMIN) {
    filter.hotelId = { $in: req.user.assignedHotels };
  }

  const rooms = await PhysicalRoom.find(filter)
    .populate('roomTypeId', 'name type')
    .populate('hotelId', 'name');

  sendSuccess(
    res,
    rooms.map((r) => ({
      id: r._id.toString(),
      number: r.roomNumber,
      hotel: r.hotelId?.name ?? '',
      type: r.roomTypeId?.type ?? '',
      floor: r.floor,
      price: 0,
      status: r.status.charAt(0).toUpperCase() + r.status.slice(1),
      guest: r.currentGuestName ?? '',
    }))
  );
});

export const createRoomType = catchAsync(async (req, res) => {
  const roomType = await RoomType.create(req.body);
  sendSuccess(res, roomType.toRoomJSON(), 201);
});

export const updateRoomType = catchAsync(async (req, res) => {
  const roomType = await RoomType.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!roomType) throw new ApiError(404, 'Room type not found');
  sendSuccess(res, roomType.toRoomJSON());
});

export const createPhysicalRoom = catchAsync(async (req, res) => {
  const room = await PhysicalRoom.create(req.body);
  sendSuccess(res, room, 201);
});

export const getStaff = catchAsync(async (req, res) => {
  let filter = { role: { $in: [ROLES.HOTEL_ADMIN, ROLES.RECEPTIONIST] } };
  if (req.query.hotelId) {
    filter.assignedHotels = req.query.hotelId;
  }

  const staff = await User.find(filter).select('-password -refreshToken');
  sendSuccess(
    res,
    staff.map((s) => ({
      id: s._id.toString(),
      name: s.fullName,
      email: s.email,
      role: s.role,
      phone: s.phone,
      status: s.isActive ? 'Active' : 'Inactive',
    }))
  );
});

export const getCustomers = catchAsync(async (req, res) => {
  const customers = await User.find({ role: ROLES.GUEST }).select('-password -refreshToken');
  sendSuccess(
    res,
    customers.map((c) => ({
      id: c._id.toString(),
      name: c.fullName,
      email: c.email,
      phone: c.phone,
      tier: c.loyaltyTier,
      status: c.isActive ? 'Active' : 'Inactive',
      joined: c.createdAt,
    }))
  );
});

export const updateUserRole = catchAsync(async (req, res) => {
  const { role, assignedHotels, isActive } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, 'User not found');

  if (role) user.role = role;
  if (assignedHotels) user.assignedHotels = assignedHotels;
  if (isActive !== undefined) user.isActive = isActive;
  await user.save();

  sendSuccess(res, user.toPublicJSON());
});
