import { Readable } from 'stream';
import cloudinary from '../config/cloudinary.js';
import { ApiError } from '../utils/helpers.js';

/**
 * Upload a buffer to Cloudinary.
 */
export function uploadBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'luxestay',
        resource_type: 'image',
        ...options,
      },
      (error, result) => {
        if (error) reject(new ApiError(500, 'Cloudinary upload failed', error.message));
        else resolve(result);
      }
    );
    Readable.from(buffer).pipe(uploadStream);
  });
}

/**
 * Delete an image from Cloudinary by public_id.
 */
export async function deleteImage(publicId) {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
}

/**
 * Build folder path based on entity type and user role.
 */
export function buildUploadFolder(entityType, userId, entityId) {
  const base = `luxestay/${entityType}`;
  if (entityId) return `${base}/${entityId}`;
  return `${base}/${userId}`;
}
