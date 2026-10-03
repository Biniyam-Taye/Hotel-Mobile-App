const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const userService = require('../services/user.service');
const ApiError = require('../utils/apiError');

// Helper to send token response
const sendTokenResponse = (user, statusCode, res, message) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json(
    new ApiResponse(statusCode, {
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        approvalStatus: user.approvalStatus,
        profilePicture: user.profilePicture,
      },
      token,
    }, message)
  );
};

// @desc    Register user
// @route   POST /api/v1/users/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
  const user = await userService.registerUser(req.body);
  sendTokenResponse(user, 201, res, 'Registration successful');
});

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.loginUser(email, password);
  sendTokenResponse(user, 200, res, 'Login successful');
});

// @desc    Get current logged in user
// @route   GET /api/v1/users/me
// @access  Private
const getMe = asyncHandler(async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);
  res.status(200).json(new ApiResponse(200, { user }));
});

// @desc    Update user details
// @route   PUT /api/v1/users/updatedetails
// @access  Private
const updateDetails = asyncHandler(async (req, res, next) => {
  const user = await userService.updateUserById(req.user.id, req.body);
  res.status(200).json(new ApiResponse(200, { user }, 'Profile updated successfully'));
});

// @desc    Get all managers (for admin Team page)
// @route   GET /api/v1/users/managers
// @access  Private/Admin
const getManagers = asyncHandler(async (req, res, next) => {
  const managers = await userService.listManagers();
  res.status(200).json(new ApiResponse(200, { managers }));
});

// @desc    Approve a manager account
// @route   PUT /api/v1/users/managers/:id/approve
// @access  Private/Admin
const approveManager = asyncHandler(async (req, res, next) => {
  const manager = await userService.approveManager(req.params.id);
  res.status(200).json(new ApiResponse(200, { manager }, 'Manager approved successfully'));
});

// @desc    Suspend a manager account
// @route   PUT /api/v1/users/managers/:id/suspend
// @access  Private/Admin
const suspendManager = asyncHandler(async (req, res, next) => {
  const manager = await userService.suspendManager(req.params.id);
  res.status(200).json(new ApiResponse(200, { manager }, 'Manager suspended'));
});

// @desc    Remove (delete) a manager account
// @route   DELETE /api/v1/users/managers/:id
// @access  Private/Admin
const removeManager = asyncHandler(async (req, res, next) => {
  await userService.removeManager(req.params.id);
  res.status(200).json(new ApiResponse(200, null, 'Manager removed successfully'));
});

module.exports = {
  register,
  login,
  getMe,
  updateDetails,
  getManagers,
  approveManager,
  suspendManager,
  removeManager,
};
