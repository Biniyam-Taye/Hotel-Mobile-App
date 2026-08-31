const cloudinary = require('cloudinary').v2;
const ApiError = require('./apiError');

// Configure Cloudinary (called once on startup from config)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a single file buffer to Cloudinary.
 * @param {Buffer} fileBuffer - The file buffer from multer (file.buffer)
 * @param {string} folder - The Cloudinary folder path (e.g. 'rooms', 'food')
 * @returns {Promise<{url: string, publicId: string}>}
 */
const uploadSingle = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        transformation: [{ quality: 'auto', fetch_format: 'auto' }],
      },
      (error, result) => {
        if (error) return reject(new ApiError(500, `Cloudinary upload failed: ${error.message}`));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Upload multiple file buffers to Cloudinary.
 * @param {Array<Buffer>} fileBuffers - Array of file buffers from multer
 * @param {string} folder - The Cloudinary folder path
 * @returns {Promise<Array<{url: string, publicId: string}>>}
 */
const uploadMultiple = async (fileBuffers, folder) => {
  const uploads = fileBuffers.map((buffer) => uploadSingle(buffer, folder));
  return Promise.all(uploads);
};

/**
 * Delete an image from Cloudinary by its public ID.
 * @param {string} publicId - The Cloudinary public ID to delete
 */
const deleteImage = async (publicId) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};

/**
 * Upload any file (PDF, DOCX, ZIP, MP4, etc.) to Cloudinary.
 * Uses resource_type: 'auto' so Cloudinary detects the type.
 * @param {Buffer} fileBuffer - The file buffer from multer
 * @param {string} folder - The Cloudinary folder
 * @param {string} originalName - Original filename (for display)
 * @returns {Promise<{url: string, publicId: string}>}
 */
const uploadRaw = (fileBuffer, folder, originalName) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto',
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error) return reject(new ApiError(500, `Cloudinary upload failed: ${error.message}`));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete any resource (image, raw, video) from Cloudinary.
 * @param {string} publicId
 * @param {'image'|'raw'|'video'|'auto'} resourceType
 */
const deleteRaw = async (publicId, resourceType = 'auto') => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
};

module.exports = { uploadSingle, uploadMultiple, deleteImage, uploadRaw, deleteRaw };

