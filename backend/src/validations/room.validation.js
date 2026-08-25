const { z } = require('zod');

const optionalNumber = z.preprocess(
  (val) => (val === '' || val === undefined ? undefined : val === null ? null : Number(val)),
  z.number().nonnegative().nullable().optional()
);

const roomBody = z.object({
  roomNumber: z.string().min(1).max(20),
  name: z.string().min(2).max(100),
  categoryId: z.string().min(1),
  categoryName: z.string().optional(),
  price: z.coerce.number().nonnegative(),
  discountedPrice: optionalNumber,
  maxGuests: z.coerce.number().int().positive().optional(),
  floor: z.coerce.number().int().positive().optional(),
  status: z.enum(['Available', 'Occupied', 'Maintenance']).optional(),
  publishStatus: z.enum(['Published', 'Draft']).optional(),
  isFeatured: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  mainImage: z.string().optional(),
  detailImages: z.array(z.string()).optional(),
  location: z.string().optional(),
  bedType: z.string().optional(),
  roomSize: optionalNumber,
  description: z.string().max(2000).optional(),
  amenities: z.array(z.string()).optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  reviewCount: z.coerce.number().int().nonnegative().optional(),
});

const createRoom = z.object({
  body: roomBody,
});

const updateRoom = z.object({
  body: roomBody.partial(),
});

module.exports = {
  createRoom,
  updateRoom,
};
