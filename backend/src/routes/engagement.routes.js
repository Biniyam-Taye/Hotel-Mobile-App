const express = require('express');
const ctrl = require('../controllers/engagement.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const schema = require('../validations/engagement.validation');

const router = express.Router();

// --- Favorites ---
const favRouter = express.Router();
router.use('/favorites', favRouter);

favRouter.route('/')
  .get(protect, ctrl.getFavorites)
  .post(protect, validate(schema.addFavorite), ctrl.toggleFavorite);

// --- Reviews ---
const revRouter = express.Router();
router.use('/reviews', revRouter);

revRouter.route('/')
  .get(ctrl.getReviews) // Public
  .post(protect, validate(schema.addReview), ctrl.addReview);

revRouter.route('/:id')
  .put(protect, validate(schema.updateReview), ctrl.updateReview)
  .delete(protect, ctrl.deleteReview); // Admin can delete any, user can delete their own

// --- Notifications ---
const notifRouter = express.Router();
router.use('/notifications', notifRouter);

notifRouter.route('/')
  .get(protect, ctrl.getMyNotifications)
  .post(protect, authorize('admin', 'manager'), validate(schema.sendNotification), ctrl.sendNotification);

notifRouter.route('/:id/read')
  .put(protect, ctrl.markNotificationAsRead);

module.exports = router;
