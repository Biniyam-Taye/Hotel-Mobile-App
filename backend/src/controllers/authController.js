import validator from 'validator';
import User from '../models/User.js';
import { ApiError, catchAsync, sendSuccess } from '../utils/helpers.js';
import {
  signAccessToken,
  signRefreshToken,
} from '../middleware/auth.js';
import jwt from 'jsonwebtoken';
import { ROLES } from '../utils/constants.js';

export const register = catchAsync(async (req, res) => {
  const { email, password, fullName, phone, role } = req.body;

  if (!email || !password || !fullName) {
    throw new ApiError(400, 'email, password, and fullName are required');
  }
  if (!validator.isEmail(email)) {
    throw new ApiError(400, 'Invalid email address');
  }
  if (password.length < 6) {
    throw new ApiError(400, 'Password must be at least 6 characters');
  }

  // Only allow guest self-registration; admins created by super_admin
  const userRole = role && Object.values(ROLES).includes(role) ? role : ROLES.GUEST;
  if (userRole !== ROLES.GUEST && !req.user) {
    throw new ApiError(403, 'Only guest accounts can self-register');
  }
  if (userRole !== ROLES.GUEST && req.user?.role !== ROLES.SUPER_ADMIN) {
    throw new ApiError(403, 'Only super admins can create staff accounts');
  }

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new ApiError(409, 'Email already registered');

  const user = await User.create({
    email: email.toLowerCase(),
    password,
    fullName,
    phone,
    role: userRole,
    assignedHotels: req.body.assignedHotels ?? [],
  });

  const accessToken = signAccessToken(user._id, user.role);
  const refreshToken = signRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  sendSuccess(
    res,
    {
      user: user.toPublicJSON(),
      accessToken,
      refreshToken,
    },
    201
  );
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, 'email and password are required');
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password +refreshToken');
  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, 'Invalid email or password');
  }
  if (!user.isActive) {
    throw new ApiError(403, 'Account is deactivated');
  }

  const accessToken = signAccessToken(user._id, user.role);
  const refreshToken = signRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  sendSuccess(res, {
    user: user.toPublicJSON(),
    accessToken,
    refreshToken,
  });
});

export const refresh = catchAsync(async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) throw new ApiError(400, 'refreshToken is required');

  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(payload.sub).select('+refreshToken');
  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const accessToken = signAccessToken(user._id, user.role);
  const newRefreshToken = signRefreshToken(user._id);
  user.refreshToken = newRefreshToken;
  await user.save({ validateBeforeSave: false });

  sendSuccess(res, { accessToken, refreshToken: newRefreshToken });
});

export const logout = catchAsync(async (req, res) => {
  req.user.refreshToken = undefined;
  await req.user.save({ validateBeforeSave: false });
  sendSuccess(res, { message: 'Logged out successfully' });
});

export const getMe = catchAsync(async (req, res) => {
  sendSuccess(res, req.user.toPublicJSON());
});

export const updateProfile = catchAsync(async (req, res) => {
  const allowed = ['fullName', 'phone', 'location', 'preferences', 'avatarUrl', 'avatarPublicId'];
  allowed.forEach((key) => {
    if (req.body[key] !== undefined) req.user[key] = req.body[key];
  });
  await req.user.save();
  sendSuccess(res, req.user.toPublicJSON());
});

export const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, 'currentPassword and newPassword are required');
  }

  const user = await User.findById(req.user._id).select('+password');
  if (!(await user.comparePassword(currentPassword))) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();
  sendSuccess(res, { message: 'Password updated successfully' });
});
