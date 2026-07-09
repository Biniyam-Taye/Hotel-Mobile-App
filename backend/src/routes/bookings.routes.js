import { Router } from 'express';
import {
  createBookingHandler,
  getMyBookings,
  getBookingById,
  cancelBooking,
  getAdminBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import {
  authenticate,
  requireRoles,
  blockGuests,
} from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post('/', authenticate, requireRoles(ROLES.GUEST), createBookingHandler);
router.get('/me', authenticate, requireRoles(ROLES.GUEST), getMyBookings);

router.get(
  '/admin/list',
  authenticate,
  blockGuests,
  requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN, ROLES.RECEPTIONIST),
  getAdminBookings
);

router.get('/:id', authenticate, getBookingById);
router.patch('/:id/cancel', authenticate, cancelBooking);

router.patch(
  '/:id/status',
  authenticate,
  blockGuests,
  requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN, ROLES.RECEPTIONIST),
  updateBookingStatus
);

export default router;
