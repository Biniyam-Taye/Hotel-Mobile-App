const multer = require('multer');
const path = require('path');
const fs = require('fs');
const ApiError = require('../utils/apiError');

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads', 'reports');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Memory storage for images (profile pictures)
const memoryStorage = multer.memoryStorage();

// Disk storage for reports & documents (ensures 100% reliable local serving & downloading)
const reportDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const safeName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_\-]/g, '_');
    cb(null, `${uniqueSuffix}_${safeName}${ext}`);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Only image files are allowed'), false);
  }
};

const documentFilter = (req, file, cb) => {
  // Allow all file types for business reports
  cb(null, true);
};

// Profile picture uploader
const upload = multer({
  storage: memoryStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Reports & Documents uploader (stored on disk for 100% reliable previews and downloads)
const uploadDocuments = multer({
  storage: reportDiskStorage,
  fileFilter: documentFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB per file
});

module.exports = upload;
module.exports.uploadDocuments = uploadDocuments;
