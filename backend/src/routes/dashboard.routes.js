const express = require('express');
const ctrl = require('../controllers/dashboard.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

router.use(protect);
router.use(authorize('admin', 'manager'));

router.get('/stats', ctrl.getDashboardStats);
router.get('/recent', ctrl.getRecentActivities);

module.exports = router;
