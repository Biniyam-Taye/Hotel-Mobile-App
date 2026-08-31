const User = require('../models/user.model');
const ApiError = require('../utils/apiError');

const registerUser = async (userData) => {
  const { email, role } = userData;
  
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists with this email');
  }

  // Managers require admin approval — set approvalStatus to pending
  const approvalStatus = role === 'manager' ? 'pending' : 'approved';

  // Create user
  const user = await User.create({ ...userData, approvalStatus });
  return user;
};

const loginUser = async (email, password) => {
  // Check for user
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  
  if (!isMatch) {
    throw new ApiError(401, 'Invalid credentials');
  }

  // Block managers who are pending approval
  if (user.role === 'manager' && user.approvalStatus === 'pending') {
    throw new ApiError(403, 'PENDING_APPROVAL');
  }

  // Block suspended managers
  if (user.role === 'manager' && user.approvalStatus === 'suspended') {
    throw new ApiError(403, 'ACCOUNT_SUSPENDED');
  }

  return user;
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const updateUserById = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
  
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  
  return user;
};

// List all managers (for admin Team page)
const listManagers = async () => {
  return await User.find({ role: 'manager' })
    .select('-password')
    .sort({ createdAt: -1 });
};

// Approve a manager account
const approveManager = async (managerId) => {
  const user = await User.findOneAndUpdate(
    { _id: managerId, role: 'manager' },
    { approvalStatus: 'approved' },
    { new: true }
  );
  if (!user) throw new ApiError(404, 'Manager not found');
  return user;
};

// Suspend a manager account
const suspendManager = async (managerId) => {
  const user = await User.findOneAndUpdate(
    { _id: managerId, role: 'manager' },
    { approvalStatus: 'suspended' },
    { new: true }
  );
  if (!user) throw new ApiError(404, 'Manager not found');
  return user;
};

// Remove (delete) a manager account
const removeManager = async (managerId) => {
  const user = await User.findOneAndDelete({ _id: managerId, role: 'manager' });
  if (!user) throw new ApiError(404, 'Manager not found');
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  listManagers,
  approveManager,
  suspendManager,
  removeManager,
};
