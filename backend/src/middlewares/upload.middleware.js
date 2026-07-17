const multer = require('multer');
const ApiError = require('../utils/apiError');

// Use memory storage so we can pass the buffer to Cloudinary directly
const storage = multer.memoryStorage();

// File filter: only allow images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Only image files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

module.exports = upload;
