const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const User = require('../models/user.model');
const Booking = require('../models/booking.model');
const FoodOrder = require('../models/foodOrder.model');
const ServiceBooking = require('../models/serviceBooking.model');
const Payment = require('../models/payment.model');
const Room = require('../models/room.model');

// @desc    Get dashboard statistics
// @route   GET /api/v1/dashboard/stats
// @access  Private/Admin
const getDashboardStats = asyncHandler(async (req, res) => {
  // 1. Customer Stats
  const totalCustomers = await User.countDocuments({ role: 'customer' });
  const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const newCustomersThisMonth = await User.countDocuments({ role: 'customer', createdAt: { $gte: startOfMonth } });

  // 2. Booking Stats
  const totalBookings = await Booking.countDocuments();
  const activeBookings = await Booking.countDocuments({ status: { $in: ['pending', 'confirmed'] } });
  
  // Occupancy Rate (Active Bookings / Total Rooms)
  const totalRooms = await Room.countDocuments();
  const occupancyRate = totalRooms === 0 ? 0 : Math.round((activeBookings / totalRooms) * 100);

  // 3. Revenue Stats (from Payments that succeeded)
  const revenueResult = await Payment.aggregate([
    { $match: { status: 'succeeded' } },
    { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
  ]);
  const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

  // 4. Restaurant & Service Sales
  const foodOrdersCount = await FoodOrder.countDocuments();
  const serviceBookingsCount = await ServiceBooking.countDocuments();

  res.status(200).json(new ApiResponse(200, {
    customers: {
      total: totalCustomers,
      newThisMonth: newCustomersThisMonth,
    },
    bookings: {
      total: totalBookings,
      active: activeBookings,
      occupancyRate: `${occupancyRate}%`,
    },
    revenue: {
      total: totalRevenue,
    },
    sales: {
      foodOrders: foodOrdersCount,
      serviceBookings: serviceBookingsCount,
    }
  }));
});

// @desc    Get recent activities
// @route   GET /api/v1/dashboard/recent
// @access  Private/Admin
const getRecentActivities = asyncHandler(async (req, res) => {
  // Fetch latest 5 from each main collection
  const recentBookings = await Booking.find().sort('-createdAt').limit(5).populate('user', 'firstName lastName');
  const recentOrders = await FoodOrder.find().sort('-createdAt').limit(5).populate('user', 'firstName lastName');
  const recentPayments = await Payment.find().sort('-createdAt').limit(5).populate('user', 'firstName lastName');

  res.status(200).json(new ApiResponse(200, {
    recentBookings,
    recentOrders,
    recentPayments
  }));
});

module.exports = {
  getDashboardStats,
  getRecentActivities,
};
