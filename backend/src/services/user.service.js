const User = require('../models/user.model');
const ApiError = require('../utils/apiError');

const registerUser = async (userData) => {
  const { email } = userData;
  
  // Check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User already exists with this email');
  }

  // Create user
  const user = await User.create(userData);
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

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
};
