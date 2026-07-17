const express = require('express');
const ctrl = require('../controllers/payment.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const schema = require('../validations/payment.validation');

const router = express.Router();

// Stripe Webhook is mounted in app.js before express.json()

// The rest of the routes are protected
router.use(protect);

router.post('/create-intent', validate(schema.createPaymentIntent), ctrl.createPaymentIntent);
router.get('/history', ctrl.getPaymentHistory);

module.exports = router;
