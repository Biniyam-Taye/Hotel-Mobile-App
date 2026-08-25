const { z } = require('zod');

const optionalNumber = z.preprocess(
  (val) => (val === '' || val === undefined ? undefined : val === null ? null : Number(val)),
  z.number().nonnegative().nullable().optional()
);

const categoryBody = z.object({
  name: z.string().min(2).max(100),
  description: z.string().min(5).max(500),
  basePrice: z.coerce.number().nonnegative(),
  maxGuests: z.coerce.number().int().positive().optional(),
  bedConfiguration: z.string().optional(),
  roomSize: z.string().optional(),
  image: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  status: z.enum(['Active', 'Inactive', 'Draft']).optional(),
});

const createCategory = z.object({
  body: categoryBody,
});

const updateCategory = z.object({
  body: categoryBody.partial(),
});

module.exports = {
  createCategory,
  updateCategory,
};
