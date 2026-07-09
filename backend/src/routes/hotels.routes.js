import { Router } from 'express';
import {
  getHotels,
  getHotelById,
  getCities,
  getCategories,
  getOffers,
  createHotel,
  updateHotel,
  deleteHotel,
  getAdminHotels,
} from '../controllers/hotelController.js';
import { optionalAuth, authenticate, requireRoles, blockGuests, requireHotelAccess } from '../middleware/auth.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

// Public / guest routes
router.get('/', optionalAuth, getHotels);
router.get('/cities', getCities);
router.get('/categories', getCategories);
router.get('/offers', getOffers);

// Admin list (must be before /:id)
router.get(
  '/admin/list',
  authenticate,
  blockGuests,
  requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN),
  getAdminHotels
);

router.get('/:id', optionalAuth, getHotelById);

// Admin mutations
router.post(
  '/',
  authenticate,
  requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN),
  createHotel
);

router.patch(
  '/:id',
  authenticate,
  blockGuests,
  requireRoles(ROLES.SUPER_ADMIN, ROLES.HOTEL_ADMIN),
  requireHotelAccess('id'),
  updateHotel
);

router.delete(
  '/:id',
  authenticate,
  requireRoles(ROLES.SUPER_ADMIN),
  deleteHotel
);

export default router;
