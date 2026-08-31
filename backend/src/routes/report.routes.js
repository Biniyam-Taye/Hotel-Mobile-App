const express = require('express');
const {
  createReport, getAllReports, getMyReports,
  downloadFile, previewFile,
  markAsRead, toggleStar, trashReport, deleteReport,
} = require('../controllers/report.controller');
const { protect, authorize } = require('../middlewares/auth.middleware');
const { uploadDocuments } = require('../middlewares/upload.middleware');

const router = express.Router();

// Direct File Stream & Download Routes (accessible to authenticated users)
router.get('/download/:filename', protect, downloadFile);
router.get('/preview/:filename', protect, previewFile);

router.use(protect);

// Manager sends a report with file attachments (up to 10 files)
router.post('/', uploadDocuments.array('files', 10), createReport);

// Manager views their own sent reports
router.get('/my', getMyReports);

// Owner views all received reports
router.get('/', authorize('admin'), getAllReports);

// Owner actions on a report
router.put('/:id/read',  authorize('admin'), markAsRead);
router.put('/:id/star',  authorize('admin'), toggleStar);
router.put('/:id/trash', authorize('admin'), trashReport);
router.delete('/:id',    authorize('admin'), deleteReport);

module.exports = router;
