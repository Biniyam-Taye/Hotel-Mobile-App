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

const router = express.Router();

router
  .route('/')
  .get(getRooms)
  .post(validate(roomValidation.createRoom), createRoom);

router
  .route('/:id')
  .get(getRoom)
  .put(validate(roomValidation.updateRoom), updateRoom)
  .delete(deleteRoom);

module.exports = router;
