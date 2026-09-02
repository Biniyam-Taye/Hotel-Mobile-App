const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const payService = require('../services/payment.service');

const createCheckoutSession = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const result = await payService.createCheckoutSession(userId, req.body);
  res.status(200).json(new ApiResponse(200, result, 'Stripe Checkout Session created'));
});

const createPaymentIntent = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const result = await payService.createPaymentIntent(userId, req.body);
  res.status(200).json(new ApiResponse(200, result, 'Payment intent created'));
});

// Stripe webhook handler
// Note: This route uses express.raw({ type: 'application/json' }) parser mounted in app.js
const handleWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['stripe-signature'];
  await payService.handleWebhook(req.body, signature);
  res.status(200).json({ received: true });
});

const getPaymentHistory = asyncHandler(async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const role = req.user ? req.user.role : 'customer';
  const result = await payService.getPaymentHistory(req.query, userId, role);
  res.status(200).json(new ApiResponse(200, result));
});

const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orders = await payService.getMyOrders(userId);
  res.status(200).json(new ApiResponse(200, orders, 'Your orders retrieved'));
});

const getPaidRevenueStats = asyncHandler(async (req, res) => {
  const stats = await payService.getPaidRevenueStats();
  res.status(200).json(new ApiResponse(200, stats, 'Revenue stats based on paid transactions'));
});

const deleteOrder = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;
  await payService.deleteOrder(req.params.id, userId, role);
  res.status(200).json(new ApiResponse(200, null, 'Order deleted successfully'));
});

module.exports = {
  createCheckoutSession,
  createPaymentIntent,
  handleWebhook,
  getPaymentHistory,
  getMyOrders,
  getPaidRevenueStats,
  deleteOrder,
};


