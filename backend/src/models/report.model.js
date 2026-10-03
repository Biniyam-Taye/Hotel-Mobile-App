const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    // Manager who sent the report
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    reportType: {
      type: String,
      trim: true,
      default: 'General Report',
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    // Array of uploaded file references
    attachments: [
      {
        originalName: String,
        fileUrl: String,      // Cloudinary or disk URL
        publicId: String,     // Cloudinary public_id (for deletion)
        mimeType: String,
        size: Number,         // bytes
        fileType: String,     // pdf | doc | sheet | video | archive | image
      },
    ],
    isRead: {
      type: Boolean,
      default: false,
    },
    isStarred: {
      type: Boolean,
      default: false,
    },
    isTrashed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

reportSchema.index({ sender: 1, createdAt: -1 });
reportSchema.index({ isTrashed: 1, createdAt: -1 });

module.exports = mongoose.model('Report', reportSchema);
