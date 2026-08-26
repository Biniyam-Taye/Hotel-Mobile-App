const { z } = require('zod');

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const parseJsonArray = z.preprocess((val) => {
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      return val.split(',').map((s) => s.trim()).filter(Boolean);
    }
  }
  return val;
}, z.array(z.string()).optional());

const parseSpecialRates = z.preprocess((val) => {
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      return [];
    }
  }
  return val;
}, z.array(
  z.object({
    date: z.string().min(1),
    price: z.coerce.number().min(0),
    label: z.string().optional(),
    _id: z.string().optional(),
  })
).optional());

const mongoIdParam = z.object({
  params: z.object({ id: mongoId }),
});

const spaceStatus = z.enum(['Available', 'Occupied', 'Maintenance']);
const publishStatus = z.enum(['Published', 'Draft']);

const createEventSpace = z.object({
  body: z.object({
    spaceNumber: z.string().min(2).max(20),
    name: z.string().min(2).max(100),
    category: mongoId.optional(),
    categoryId: mongoId.optional(),
    price: z.coerce.number().min(0),
    discountedPrice: z.coerce.number().min(0).nullable().optional(),
    maxGuests: z.coerce.number().int().min(1),
    floor: z.coerce.number().int().min(1).optional(),
    spaceSize: z.coerce.number().min(1).optional(),
    status: spaceStatus.optional(),
    publishStatus: publishStatus.optional(),
    isFeatured: z.coerce.boolean().optional(),
    badge: z.string().max(50).optional(),
    description: z.string().max(1000).optional(),
    amenities: parseJsonArray,
    specialRates: parseSpecialRates,
    section: z.enum(['events_conference', 'general']).optional(),
  }).refine((data) => data.category || data.categoryId, {
    message: 'Category is required',
  }),
});

const updateEventSpace = z.object({
  params: z.object({ id: mongoId }),
  body: z.object({
    spaceNumber: z.string().min(2).max(20).optional(),
    name: z.string().min(2).max(100).optional(),
    category: mongoId.optional(),
    categoryId: mongoId.optional(),
    price: z.coerce.number().min(0).optional(),
    discountedPrice: z.coerce.number().min(0).nullable().optional(),
    maxGuests: z.coerce.number().int().min(1).optional(),
    floor: z.coerce.number().int().min(1).optional(),
    spaceSize: z.coerce.number().min(1).optional(),
    status: spaceStatus.optional(),
    publishStatus: publishStatus.optional(),
    isFeatured: z.coerce.boolean().optional(),
    badge: z.string().max(50).optional(),
    description: z.string().max(1000).optional(),
    amenities: parseJsonArray,
    specialRates: parseSpecialRates,
    section: z.enum(['events_conference', 'general']).optional(),
  }),
});

module.exports = {
  mongoIdParam,
  createEventSpace,
  updateEventSpace,
};
