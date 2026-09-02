const express = require('express');
const ctrl = require('../controllers/payment.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, optionalAuth } = require('../middlewares/auth.middleware');
const schema = require('../validations/payment.validation');

const router = express.Router();

// Stripe Webhook is mounted in app.js before express.json()

// Public / Optional Auth Checkout creation
router.post(
  '/create-checkout-session',
  optionalAuth,
  validate(schema.createCheckoutSession),
  ctrl.createCheckoutSession
);

// Get Paid Revenue Statistics (For Owner / Admin Dashboard)
router.get('/revenue-stats', ctrl.getPaidRevenueStats);

// Protected routes
router.use(protect);

// Get logged-in user's own orders
router.get('/my-orders', ctrl.getMyOrders);

// Delete order
router.delete('/:id', ctrl.deleteOrder);

router.post('/create-intent', validate(schema.createPaymentIntent), ctrl.createPaymentIntent);
router.get('/history', ctrl.getPaymentHistory);


module.exports = router;


