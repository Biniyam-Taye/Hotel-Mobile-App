import Hotel from '../models/Hotel.js';
import RoomType from '../models/RoomType.js';
import User from '../models/User.js';
import Review from '../models/Review.js';
import { ApiError, catchAsync, sendSuccess } from '../utils/helpers.js';
import { uploadBuffer, deleteImage, buildUploadFolder } from '../services/cloudinaryService.js';

/**
 * Generic image upload — returns Cloudinary url + publicId.
 * Client can then call confirm endpoints to attach to entities.
 */
export const uploadImage = catchAsync(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No image file provided');

  const { entityType = 'misc', entityId } = req.body;
  const folder = buildUploadFolder(entityType, req.user._id, entityId);

  const result = await uploadBuffer(req.file.buffer, {
    folder,
    public_id: `${entityType}_${Date.now()}`,
  });

  sendSuccess(res, {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
  }, 201);
});

export const deleteUploadedImage = catchAsync(async (req, res) => {
  const { publicId } = req.body;
  if (!publicId) throw new ApiError(400, 'publicId is required');

  await deleteImage(publicId);
  sendSuccess(res, { message: 'Image deleted from Cloudinary' });
});

export const addHotelImage = catchAsync(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No image file provided');

  const hotel = await Hotel.findById(req.params.hotelId);
  if (!hotel) throw new ApiError(404, 'Hotel not found');

  const result = await uploadBuffer(req.file.buffer, {
    folder: buildUploadFolder('hotels', req.user._id, hotel._id.toString()),
  });

  hotel.images.push({
    url: result.secure_url,
    publicId: result.public_id,
    sortOrder: hotel.images.length,
    isPrimary: hotel.images.length === 0,
  });
  await hotel.save();

  sendSuccess(res, { url: result.secure_url, publicId: result.public_id }, 201);
});

export const addRoomImage = catchAsync(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No image file provided');

  const roomType = await RoomType.findById(req.params.roomTypeId);
  if (!roomType) throw new ApiError(404, 'Room type not found');

  const result = await uploadBuffer(req.file.buffer, {
    folder: buildUploadFolder('rooms', req.user._id, roomType._id.toString()),
  });

  roomType.images.push({
    url: result.secure_url,
    publicId: result.public_id,
    sortOrder: roomType.images.length,
  });
  await roomType.save();

  sendSuccess(res, { url: result.secure_url, publicId: result.public_id }, 201);
});

export const uploadAvatar = catchAsync(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'No image file provided');

  if (req.user.avatarPublicId) {
    await deleteImage(req.user.avatarPublicId);
  }

  const result = await uploadBuffer(req.file.buffer, {
    folder: buildUploadFolder('avatars', req.user._id),
    transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
  });

  req.user.avatarUrl = result.secure_url;
  req.user.avatarPublicId = result.public_id;
  await req.user.save();

  sendSuccess(res, {
    avatarUrl: result.secure_url,
    publicId: result.public_id,
  });
});

export const updateUserAvatarByUrl = catchAsync(async (req, res) => {
  const { avatarUrl, avatarPublicId } = req.body;
  req.user.avatarUrl = avatarUrl;
  req.user.avatarPublicId = avatarPublicId;
  await req.user.save();
  sendSuccess(res, req.user.toPublicJSON());
});
