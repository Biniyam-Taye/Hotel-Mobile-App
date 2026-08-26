const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error.middleware');

const app = express();

// Global Middlewares
app.use(helmet());
app.use(cors());
// Stripe Webhook must be parsed as raw body before express.json()
app.post(
  '/api/v1/payments/webhook',
  express.raw({ type: 'application/json' }),
  require('./controllers/payment.controller').handleWebhook
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health Check Route
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API is running smoothly' });
});

// API Routes
const userRoutes = require('./routes/user.routes');
const roomRoutes = require('./routes/room.routes');
const roomCategoryRoutes = require('./routes/roomCategory.routes');
const bookingRoutes = require('./routes/booking.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const serviceRoutes = require('./routes/service.routes');
const facilityRoutes = require('./routes/facility.routes');
const eventRoutes = require('./routes/event.routes');
const promotionRoutes = require('./routes/promotion.routes');
const engagementRoutes = require('./routes/engagement.routes');
const paymentRoutes = require('./routes/payment.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/rooms', roomRoutes);
app.use('/api/v1/room-categories', roomCategoryRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/restaurant', restaurantRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/facilities', facilityRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/promotions', promotionRoutes);
app.use('/api/v1/engagement', engagementRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);

// Handle unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
