import { Router } from 'express';
import authRoutes from './auth.routes.js';
import hotelsRoutes from './hotels.routes.js';
import bookingsRoutes from './bookings.routes.js';
import dashboardRoutes from './dashboard.routes.js';
import mediaRoutes from './media.routes.js';
import paymentsRoutes from './payments.routes.js';
import favoritesRoutes from './favorites.routes.js';
import adminRoutes from './admin.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/hotels', hotelsRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/media', mediaRoutes);
router.use('/payments', paymentsRoutes);
router.use('/favorites', favoritesRoutes);
router.use('/admin', adminRoutes);

router.get('/health', (_req, res) => {
  res.json({ success: true, message: 'LuxeStay API is running', version: process.env.API_VERSION || 'v1' });
});

export default router;
