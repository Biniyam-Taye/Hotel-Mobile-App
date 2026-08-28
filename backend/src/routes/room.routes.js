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

const router = express.Router();

const roomUpload = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'detailImages', maxCount: 3 },
]);

router
  .route('/')
  .get(getRooms)
  .post(roomUpload, validate(roomValidation.createRoom), createRoom);

router
  .route('/:id')
  .get(getRoom)
  .put(roomUpload, validate(roomValidation.updateRoom), updateRoom)
  .delete(deleteRoom);

module.exports = router;

