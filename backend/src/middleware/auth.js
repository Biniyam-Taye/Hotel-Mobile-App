import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/helpers.js';
import User from '../models/User.js';
import { ROLES } from '../utils/constants.js';

/**
 * Sign a JWT access token.
 */
export const signAccessToken = (userId, role) => {
  return jwt.sign({ sub: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

/**
 * Sign a JWT refresh token.
 */
export const signRefreshToken = (userId) => {
  return jwt.sign({ sub: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });
};

/**
 * Verify Bearer token and attach user to req.user.
 */
export const authenticate = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication required');
    }

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.sub).select('+password');
    if (!user || !user.isActive) {
      throw new ApiError(401, 'User not found or deactivated');
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return next(new ApiError(401, 'Invalid or expired token'));
    }
    next(err);
  }
};

/**
 * Optional auth — attaches user if token present, continues otherwise.
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) return next();

    const token = header.split(' ')[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.sub);
    if (user?.isActive) req.user = user;
    next();
  } catch {
    next();
  }
};

/**
 * Restrict route to specific roles.
 */
export const requireRoles = (...roles) => (req, res, next) => {
  if (!req.user) return next(new ApiError(401, 'Authentication required'));
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Forbidden: insufficient permissions'));
  }
  next();
};

/** Block guest users from admin routes */
export const blockGuests = (req, res, next) => {
  if (req.user?.role === ROLES.GUEST) {
    return next(new ApiError(403, 'Admin access required'));
  }
  next();
};

/**
 * Hotel admins/receptionists can only access their assigned hotels.
 * Super admins bypass this check.
 */
export const requireHotelAccess = (paramKey = 'hotelId') => (req, res, next) => {
  if (req.user.role === ROLES.SUPER_ADMIN) return next();

  const hotelId =
    req.params[paramKey] ||
    req.body?.hotelId ||
    req.query?.hotelId;

  if (!hotelId) {
    return next(new ApiError(400, 'hotelId is required'));
  }

  const assigned = req.user.assignedHotels?.map((id) => id.toString()) ?? [];
  if (!assigned.includes(hotelId.toString())) {
    return next(new ApiError(403, 'Forbidden: you do not have access to this hotel'));
  }
  next();
};

/**
 * Resolve the hotel scope for dashboard queries.
 * Returns null for super_admin (platform-wide), or a single hotelId for staff.
 */
export const resolveHotelScope = (user, queryHotelId) => {
  if (user.role === ROLES.SUPER_ADMIN) {
    return queryHotelId || null;
  }
  if (user.role === ROLES.HOTEL_ADMIN || user.role === ROLES.RECEPTIONIST) {
    const assigned = user.assignedHotels?.map((id) => id.toString()) ?? [];
    if (queryHotelId && !assigned.includes(queryHotelId.toString())) {
      throw new ApiError(403, 'Forbidden: hotel scope violation');
    }
    return queryHotelId || assigned[0] || null;
  }
  throw new ApiError(403, 'Admin access required');
};
