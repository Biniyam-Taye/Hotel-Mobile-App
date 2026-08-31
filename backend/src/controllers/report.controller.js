const path = require('path');
const fs = require('fs');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');
const Report = require('../models/report.model');

// ─── Helpers ──────────────────────────────────────────────────────────────────
const getFileType = (mimetype = '', originalname = '') => {
  if (mimetype === 'application/pdf' || originalname.endsWith('.pdf')) return 'pdf';
  if (mimetype.includes('word') || originalname.endsWith('.docx') || originalname.endsWith('.doc')) return 'doc';
  if (mimetype.includes('excel') || mimetype.includes('spreadsheet') || originalname.endsWith('.xlsx') || originalname.endsWith('.xls') || originalname.endsWith('.csv')) return 'sheet';
  if (mimetype.includes('powerpoint') || mimetype.includes('presentation') || originalname.endsWith('.pptx') || originalname.endsWith('.ppt')) return 'slide';
  if (mimetype.startsWith('video/')) return 'video';
  if (mimetype.startsWith('audio/')) return 'audio';
  if (mimetype.startsWith('image/')) return 'image';
  if (mimetype.includes('zip') || mimetype.includes('rar') || mimetype.includes('7z') || originalname.endsWith('.zip') || originalname.endsWith('.rar') || originalname.endsWith('.7z')) return 'archive';
  return 'doc';
};

// ─── Controllers ──────────────────────────────────────────────────────────────

/**
 * @desc  Manager uploads a report/file(s) to the owner
 * @route POST /api/v1/reports
 * @access Private (manager)
 */
const createReport = asyncHandler(async (req, res) => {
  const { subject, reportType, message } = req.body;

  if (!subject || !subject.trim()) {
    throw new ApiError(400, 'Subject is required');
  }

  // Attachments saved locally via multer diskStorage
  const attachments = [];
  if (req.files && req.files.length > 0) {
    for (const file of req.files) {
      attachments.push({
        originalName: file.originalname,
        fileUrl: `/uploads/reports/${file.filename}`,
        publicId: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        fileType: getFileType(file.mimetype, file.originalname),
      });
    }
  }

  const report = await Report.create({
    sender: req.user._id,
    subject: subject.trim(),
    reportType: reportType || 'General Report',
    message: message || '',
    attachments,
  });

  await report.populate('sender', 'firstName lastName email');

  res.status(201).json(new ApiResponse(201, { report }, 'Report sent successfully'));
});

/**
 * @desc  Owner gets all reports (from managers)
 * @route GET /api/v1/reports
 * @access Private (admin)
 */
const getAllReports = asyncHandler(async (req, res) => {
  const { category, starred, page = 1, limit = 50 } = req.query;

  const filter = { isTrashed: false };
  if (starred === 'true') filter.isStarred = true;

  const reports = await Report.find(filter)
    .populate('sender', 'firstName lastName email role')
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Report.countDocuments(filter);
  const unread = await Report.countDocuments({ isTrashed: false, isRead: false });

  res.status(200).json(new ApiResponse(200, { reports, total, unread }));
});

/**
 * @desc  Manager gets their own sent reports
 * @route GET /api/v1/reports/my
 * @access Private (manager)
 */
const getMyReports = asyncHandler(async (req, res) => {
  const reports = await Report.find({ sender: req.user._id })
    .sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, { reports }));
});

/**
 * @desc  Direct File Download Endpoint (Forces native browser download to local machine)
 * @route GET /api/v1/reports/download/:filename
 * @access Public / Authenticated (takes originalName as query param ?name=...)
 */
const downloadFile = asyncHandler(async (req, res) => {
  const { filename } = req.params;
  const originalName = req.query.name || filename;

  const filePath = path.join(process.cwd(), 'uploads', 'reports', filename);

  if (!fs.existsSync(filePath)) {
    throw new ApiError(404, 'File not found on server');
  }

  // Force download to user's local machine with original filename
  res.download(filePath, originalName, (err) => {
    if (err && !res.headersSent) {
      res.status(500).json(new ApiResponse(500, null, 'Error downloading file'));
    }
  });
});

/**
 * @desc  Direct File Preview Endpoint (Inline viewing for PDFs, images, MP4s, etc.)
 * @route GET /api/v1/reports/preview/:filename
 * @access Public / Authenticated
 */
const previewFile = asyncHandler(async (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(process.cwd(), 'uploads', 'reports', filename);

  if (!fs.existsSync(filePath)) {
    throw new ApiError(404, 'File not found on server');
  }

  res.sendFile(filePath);
});

/**
 * @desc  Mark a report as read
 * @route PUT /api/v1/reports/:id/read
 * @access Private (admin)
 */
const markAsRead = asyncHandler(async (req, res) => {
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { isRead: true },
    { new: true }
  );
  if (!report) throw new ApiError(404, 'Report not found');
  res.status(200).json(new ApiResponse(200, { report }));
});

/**
 * @desc  Toggle star on a report
 * @route PUT /api/v1/reports/:id/star
 * @access Private (admin)
 */
const toggleStar = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) throw new ApiError(404, 'Report not found');
  report.isStarred = !report.isStarred;
  await report.save();
  res.status(200).json(new ApiResponse(200, { report }));
});

/**
 * @desc  Trash a report (soft delete)
 * @route PUT /api/v1/reports/:id/trash
 * @access Private (admin)
 */
const trashReport = asyncHandler(async (req, res) => {
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { isTrashed: true },
    { new: true }
  );
  if (!report) throw new ApiError(404, 'Report not found');
  res.status(200).json(new ApiResponse(200, { report }, 'Moved to trash'));
});

/**
 * @desc  Permanently delete a report and its local files
 * @route DELETE /api/v1/reports/:id
 * @access Private (admin)
 */
const deleteReport = asyncHandler(async (req, res) => {
  const report = await Report.findById(req.params.id);
  if (!report) throw new ApiError(404, 'Report not found');

  // Remove local files from disk
  for (const att of report.attachments) {
    if (att.publicId) {
      const filePath = path.join(process.cwd(), 'uploads', 'reports', att.publicId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
  }

  await report.deleteOne();
  res.status(200).json(new ApiResponse(200, null, 'Report deleted permanently'));
});

module.exports = {
  createReport,
  getAllReports,
  getMyReports,
  downloadFile,
  previewFile,
  markAsRead,
  toggleStar,
  trashReport,
  deleteReport,
};
