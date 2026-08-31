const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const Message = require('../models/message.model');
const User = require('../models/user.model');

// @desc    Get contacts list with last message and unread count
// @route   GET /api/v1/messages/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res, next) => {
  const currentUserId = req.user._id;
  const currentUserRole = req.user.role;

  let queryUsers = [];

  if (currentUserRole === 'admin') {
    // Admins talk to managers
    queryUsers = await User.find({ role: 'manager' }).select('firstName lastName email role profilePicture approvalStatus');
  } else if (currentUserRole === 'manager') {
    // Managers talk to admins (owners)
    queryUsers = await User.find({ role: 'admin' }).select('firstName lastName email role profilePicture');
  } else {
    // Customers only talk to admin
    queryUsers = await User.find({ role: 'admin' }).select('firstName lastName email role profilePicture');
  }

  const contacts = await Promise.all(
    queryUsers.map(async (u) => {
      // Find the last message between req.user and u
      const lastMsg = await Message.findOne({
        $or: [
          { sender: currentUserId, recipient: u._id },
          { sender: u._id, recipient: currentUserId },
        ],
      })
        .sort({ createdAt: -1 })
        .limit(1);

      // Count unread messages sent by u to currentUserId
      const unreadCount = await Message.countDocuments({
        sender: u._id,
        recipient: currentUserId,
        isRead: false,
      });

      return {
        _id: u._id,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        role: u.role,
        profilePicture: u.profilePicture,
        approvalStatus: u.approvalStatus || 'approved',
        lastMessage: lastMsg ? lastMsg.text : null,
        lastMessageTime: lastMsg ? lastMsg.createdAt : null,
        unreadCount,
        online: true, // Mock online state for design
      };
    })
  );

  // Sort contacts by last message time (most recent first)
  contacts.sort((a, b) => {
    if (!a.lastMessageTime) return 1;
    if (!b.lastMessageTime) return -1;
    return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
  });

  res.status(200).json(new ApiResponse(200, { contacts }));
});

// @desc    Get messages in conversation with a specific user
// @route   GET /api/v1/messages/:userId
// @access  Private
const getConversation = asyncHandler(async (req, res, next) => {
  const currentUserId = req.user._id;
  const targetUserId = req.params.userId;

  // Retrieve all messages in the conversation
  const messages = await Message.find({
    $or: [
      { sender: currentUserId, recipient: targetUserId },
      { sender: targetUserId, recipient: currentUserId },
    ],
  }).sort({ createdAt: 1 });

  // Mark all unread messages received from the target user as read
  await Message.updateMany(
    { sender: targetUserId, recipient: currentUserId, isRead: false },
    { $set: { isRead: true } }
  );

  res.status(200).json(new ApiResponse(200, { messages }));
});

// @desc    Send a new message
// @route   POST /api/v1/messages
// @access  Private
const sendMessage = asyncHandler(async (req, res, next) => {
  const currentUserId = req.user._id;
  const { recipientId, text } = req.body;

  if (!recipientId || !text || !text.trim()) {
    throw new ApiError(400, 'Recipient ID and message text are required');
  }

  // Confirm recipient exists
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    throw new ApiError(404, 'Recipient not found');
  }

  const message = await Message.create({
    sender: currentUserId,
    recipient: recipientId,
    text: text.trim(),
  });

  res.status(201).json(new ApiResponse(201, { message }, 'Message sent successfully'));
});

module.exports = {
  getContacts,
  getConversation,
  sendMessage,
};
