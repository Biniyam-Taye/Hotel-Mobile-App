import { Router } from 'express';
import { getStats, getReceptionistDashboard } from '../controllers/dashboardController.js';
import { authenticate, blockGuests, requireRoles } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.get(
  '/stats',
  authenticate,
  blockGuests,
  requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN, ROLES.RECEPTIONIST),
  getStats
);

router.get(
  '/receptionist/today',
  authenticate,
  requireRoles(ROLES.RECEPTIONIST, ROLES.HOTEL_ADMIN, ROLES.SUPER_ADMIN),
  getReceptionistDashboard
);

export default router;
