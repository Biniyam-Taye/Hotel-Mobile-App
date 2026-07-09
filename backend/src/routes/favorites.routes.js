import { Router } from 'express';
import { getFavorites, toggleFavorite, createReview, getHotelReviews } from '../controllers/favoriteController.js';
import { authenticate, optionalAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', authenticate, getFavorites);
router.post('/reviews', authenticate, createReview);
router.get('/reviews/:hotelId', optionalAuth, getHotelReviews);
router.post('/:hotelId', authenticate, toggleFavorite);

export default router;
