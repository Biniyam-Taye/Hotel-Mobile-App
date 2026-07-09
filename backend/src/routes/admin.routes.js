import { Router } from 'express';
import {
  getRooms,
  createRoomType,
  updateRoomType,
  createPhysicalRoom,
  getStaff,
  getCustomers,
  updateUserRole,
} from '../controllers/adminController.js';
import { authenticate, requireRoles, blockGuests } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.use(authenticate, blockGuests);

router.get('/rooms', requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN, ROLES.RECEPTIONIST), getRooms);
router.post('/room-types', requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN), createRoomType);
router.patch('/room-types/:id', requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN), updateRoomType);
router.post('/physical-rooms', requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN), createPhysicalRoom);
router.get('/staff', requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN), getStaff);
router.get('/customers', requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN), getCustomers);
router.patch('/users/:id', requireRoles(ROLES.SUPER_ADMIN), updateUserRole);

export default router;
