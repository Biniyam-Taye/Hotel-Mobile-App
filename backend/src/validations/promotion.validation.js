const { z } = require('zod');

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const offerStatus = z.enum(['Active', 'Inactive']);

const highlightSchema = z.object({
  title: z.string().max(120).optional(),
  description: z.string().max(300).optional(),
});

const detailImageSchema = z.object({
  url: z.string().url(),
  publicId: z.string().optional(),
});

const parseJsonField = (value) => {
  if (typeof value !== 'string') return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
};

const offerBodyFields = {
  title: z.string().min(2).max(120).optional(),
  subtitle: z.string().max(200).optional(),
  description: z.string().max(1000).optional(),
  discountTag: z.string().max(30).optional(),
  typeTag: z.string().max(50).optional(),
  isPopular: z.coerce.boolean().optional(),
  validFrom: z.coerce.date().optional(),
  validUntil: z.coerce.date().optional(),
  packagePricing: z.string().max(50).optional(),
  stayLength: z.string().max(50).optional(),
  guests: z.string().max(50).optional(),
  status: offerStatus.optional(),
  discountPercentage: z.coerce.number().min(1).max(100).optional(),
  isActive: z.coerce.boolean().optional(),
  highlights: z.preprocess(parseJsonField, z.array(highlightSchema).optional()),
  detailImages: z.preprocess(parseJsonField, z.array(detailImageSchema).optional()),
};

// --- Offer Validations ---
const createOffer = z.object({
  body: z.object({
    title: z.string().min(2).max(120),
    description: z.string().max(1000),
    validUntil: z.coerce.date(),
    subtitle: z.string().max(200).optional(),
    discountTag: z.string().max(30).optional(),
    typeTag: z.string().max(50).optional(),
    isPopular: z.coerce.boolean().optional(),
    validFrom: z.coerce.date().optional(),
    packagePricing: z.string().max(50).optional(),
    stayLength: z.string().max(50).optional(),
    guests: z.string().max(50).optional(),
    status: offerStatus.optional(),
    discountPercentage: z.coerce.number().min(1).max(100).optional(),
    isActive: z.coerce.boolean().optional(),
    highlights: z.preprocess(parseJsonField, z.array(highlightSchema).optional()),
    detailImages: z.preprocess(parseJsonField, z.array(detailImageSchema).optional()),
  }),
});

const updateOffer = z.object({
  params: z.object({
    id: mongoId,
  }),
  body: z.object(offerBodyFields),
});

const mongoIdParam = z.object({
  params: z.object({
    id: mongoId,
  }),
});

// --- Coupon Validations ---
const createCoupon = z.object({
  body: z.object({
    code: z.string().min(3).max(20),
    discountType: z.enum(['percentage', 'fixed']),
    discountValue: z.number().positive(),
    minimumSpend: z.number().nonnegative().optional(),
    validFrom: z.string().datetime(),
    validUntil: z.string().datetime(),
    isActive: z.boolean().optional(),
    usageLimit: z.number().int().positive().optional(),
  }),
});

const updateCoupon = z.object({
  body: z.object({
    code: z.string().min(3).max(20).optional(),
    discountType: z.enum(['percentage', 'fixed']).optional(),
    discountValue: z.number().positive().optional(),
    minimumSpend: z.number().nonnegative().optional(),
    validFrom: z.string().datetime().optional(),
    validUntil: z.string().datetime().optional(),
    isActive: z.boolean().optional(),
    usageLimit: z.number().int().positive().optional(),
  }),
});

const validateCoupon = z.object({
  body: z.object({
    code: z.string().min(1, 'Coupon code is required'),
    orderAmount: z.number().positive(),
  }),
});

module.exports = {
  mongoIdParam,
  createOffer,
  updateOffer,
  createCoupon,
  updateCoupon,
  validateCoupon,
};
