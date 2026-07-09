import { Router } from 'express';
import {
  createCheckoutSession,
  verifyPayment,
  refundBooking,
  createPaymentIntent,
} from '../controllers/paymentController.js';
import { authenticate, requireRoles, blockGuests } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post('/checkout-session', authenticate, requireRoles(ROLES.GUEST), createCheckoutSession);
router.post('/payment-intent', authenticate, requireRoles(ROLES.GUEST), createPaymentIntent);
router.get('/verify', authenticate, verifyPayment);

router.post(
  '/refund/:bookingId',
  authenticate,
  blockGuests,
  requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN),
  refundBooking
);

export default router;
