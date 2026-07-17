const express = require('express');
const {
  createRoom,
  getRooms,
  getRoom,
  updateRoom,
  deleteRoom,
} = require('../controllers/room.controller');
const validate = require('../middlewares/validate.middleware');
const { protect, authorize } = require('../middlewares/auth.middleware');
const roomValidation = require('../validations/room.validation');

const router = express.Router();

router
  .route('/')
  .get(getRooms)
  .post(protect, authorize('admin'), validate(roomValidation.createRoom), createRoom);

router
  .route('/:id')
  .get(getRoom)
  .put(protect, authorize('admin'), validate(roomValidation.updateRoom), updateRoom)
  .delete(protect, authorize('admin'), deleteRoom);

module.exports = router;
