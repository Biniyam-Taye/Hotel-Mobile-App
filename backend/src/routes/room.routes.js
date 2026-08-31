const express = require('express');
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/room.controller');
const validate = require('../middlewares/validate.middleware');
const roomValidation = require('../validations/room.validation');
const upload = require('../middlewares/upload.middleware');

const { protect, authorize } = require('../middlewares/auth.middleware');

const router = express.Router();

const roomUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'detailImages', maxCount: 3 },
]);

router
  .route('/')
  .get(getRooms)
  .post(protect, authorize('admin', 'manager'), roomUpload, validate(roomValidation.createRoom), createRoom);

router
  .route('/:id')
  .get(getRoom)
  .put(protect, authorize('admin', 'manager'), roomUpload, validate(roomValidation.updateRoom), updateRoom)
  .delete(protect, authorize('admin', 'manager'), deleteRoom);

module.exports = router;

