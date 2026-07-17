const express = require('express');
const { register, login, getMe, updateDetails } = require('../controllers/user.controller');
const validate = require('../middlewares/validate.middleware');
const { protect } = require('../middlewares/auth.middleware');
const userValidation = require('../validations/user.validation');

const router = express.Router();

router.post('/register', validate(userValidation.register), register);
router.post('/login', validate(userValidation.login), login);

router.get('/me', protect, getMe);
router.put('/updatedetails', protect, validate(userValidation.updateProfile), updateDetails);

module.exports = router;
