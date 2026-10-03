const express = require('express');
const { register, login, getMe, updateDetails, getManagers, approveManager, suspendManager, removeManager } = require('../controllers/user.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const userValidation = require('../validations/user.validation');

const router = express.Router();

router.post('/register', validate(userValidation.register), register);
router.post('/login', validate(userValidation.login), login);

router.get('/me', protect, getMe);
router.put('/updatedetails', protect, validate(userValidation.updateProfile), updateDetails);

// Admin-only: Manager management
router.get('/managers', protect, authorize('admin'), getManagers);
router.put('/managers/:id/approve', protect, authorize('admin'), approveManager);
router.put('/managers/:id/suspend', protect, authorize('admin'), suspendManager);
router.delete('/managers/:id', protect, authorize('admin'), removeManager);

module.exports = router;
