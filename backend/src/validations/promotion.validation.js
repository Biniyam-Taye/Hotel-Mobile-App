const { z } = require('zod');

// --- Offer Validations ---
const createOffer = z.object({
  body: z.object({
    title: z.string().min(2).max(100),
    description: z.string().max(500),
    discountPercentage: z.coerce.number().min(1).max(100).optional(),
    validFrom: z.string().datetime(),
    validUntil: z.string().datetime(),
    isActive: z.coerce.boolean().optional(),
  }),
});

const updateOffer = z.object({
  body: z.object({
    title: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    discountPercentage: z.coerce.number().min(1).max(100).optional(),
    validFrom: z.string().datetime().optional(),
    validUntil: z.string().datetime().optional(),
    isActive: z.coerce.boolean().optional(),
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
  createOffer,
  updateOffer,
  createCoupon,
  updateCoupon,
  validateCoupon,
};
