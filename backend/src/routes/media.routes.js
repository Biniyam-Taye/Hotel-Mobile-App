import { Router } from 'express';
import {
  uploadImage,
  deleteUploadedImage,
  addHotelImage,
  addRoomImage,
  uploadAvatar,
} from '../controllers/mediaController.js';
import { authenticate } from '../middleware/auth.js';
import { uploadSingle } from '../middleware/upload.js';

const router = Router();

router.post('/upload', authenticate, uploadSingle('image'), uploadImage);
router.delete('/upload', authenticate, deleteUploadedImage);
router.post('/avatar', authenticate, uploadSingle('image'), uploadAvatar);
router.post('/hotels/:hotelId/images', authenticate, uploadSingle('image'), addHotelImage);
router.post('/rooms/:roomTypeId/images', authenticate, uploadSingle('image'), addRoomImage);

export default router;
