import { catchAsync, sendSuccess } from '../utils/helpers.js';
import { getDashboardStats, getReceptionistToday } from '../services/dashboardService.js';
import { resolveHotelScope } from '../middleware/auth.js';
import { ApiError } from '../utils/helpers.js';
import { ROLES } from '../utils/constants.js';

export const getStats = catchAsync(async (req, res) => {
  const hotelId = resolveHotelScope(req.user, req.query.hotelId);
  const stats = await getDashboardStats(hotelId);
  sendSuccess(res, stats);
});

export const getReceptionistDashboard = catchAsync(async (req, res) => {
  if (req.user.role !== ROLES.RECEPTIONIST && req.user.role !== ROLES.HOTEL_ADMIN && req.user.role !== ROLES.SUPER_ADMIN) {
    throw new ApiError(403, 'Receptionist access required');
  }

  const hotelId = resolveHotelScope(req.user, req.query.hotelId);
  if (!hotelId) throw new ApiError(400, 'hotelId is required for receptionist dashboard');

  const data = await getReceptionistToday(hotelId);
  sendSuccess(res, data);
});
