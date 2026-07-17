const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const payService = require('../services/payment.service');

const createPaymentIntent = asyncHandler(async (req, res) => {
  const result = await payService.createPaymentIntent(req.user.id, req.body);
  res.status(200).json(new ApiResponse(200, result, 'Payment intent created'));
});

// Stripe webhook handler
// Note: This route must use express.raw({ type: 'application/json' }) parser before arriving here
const handleWebhook = asyncHandler(async (req, res) => {
  const signature = req.headers['stripe-signature'];
  await payService.handleWebhook(req.body, signature);
  // Stripe expects a 200 response to acknowledge receipt
  res.status(200).send('Webhook handled');
});

const getPaymentHistory = asyncHandler(async (req, res) => {
  const result = await payService.getPaymentHistory(req.query, req.user.id, req.user.role);
  res.status(200).json(new ApiResponse(200, result));
});

module.exports = {
  createPaymentIntent,
  handleWebhook,
  getPaymentHistory,
};
