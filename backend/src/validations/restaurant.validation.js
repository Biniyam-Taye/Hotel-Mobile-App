const { z } = require('zod');

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const parseTags = z.preprocess((val) => {
  if (typeof val === 'string') {
    return val.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return val;
}, z.array(z.string()).optional());

const parseFeatures = z.preprocess((val) => {
  if (typeof val === 'string') {
    return val.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return val;
}, z.array(z.string()).optional());

const mongoIdParam = z.object({
  params: z.object({
    id: mongoId,
  }),
});

// --- Category Validations ---
const createCategory = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(200).optional(),
    isActive: z.coerce.boolean().optional(),
  }),
});

const updateCategory = z.object({
  params: z.object({
    id: mongoId,
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(200).optional(),
    isActive: z.coerce.boolean().optional(),
  }),
});

// --- Food Item Validations ---
const createFoodItem = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500),
    price: z.coerce.number().min(0),
    category: mongoId.optional(),
    categoryName: z.string().min(2).max(100).optional(),
    isAvailable: z.coerce.boolean().optional(),
    preparationTime: z.coerce.number().int().positive().optional(),
    isPopular: z.coerce.boolean().optional(),
    section: z.enum(['restaurant_bar', 'room_service']).optional(),
    tags: parseTags,
    features: parseFeatures,
  }).refine((data) => data.category || data.categoryName, {
    message: 'Either category ID or categoryName is required',
  }),
});

const updateFoodItem = z.object({
  params: z.object({
    id: mongoId,
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    price: z.coerce.number().min(0).optional(),
    category: mongoId.optional(),
    categoryName: z.string().min(2).max(100).optional(),
    isAvailable: z.coerce.boolean().optional(),
    preparationTime: z.coerce.number().int().positive().optional(),
    isPopular: z.coerce.boolean().optional(),
    section: z.enum(['restaurant_bar', 'room_service']).optional(),
    tags: parseTags,
    features: parseFeatures,
  }),
});

// --- Food Order Validations ---
const createOrder = z.object({
  body: z.object({
    room: z.string().optional(),
    items: z.array(
      z.object({
        foodItem: z.string().min(1, 'Food Item ID is required'),
        quantity: z.number().int().positive(),
      })
    ).min(1, 'Order must contain at least one item'),
    specialInstructions: z.string().max(300).optional(),
  }),
});

const updateOrderStatus = z.object({
  params: z.object({
    id: mongoId,
  }),
  body: z.object({
    status: z.enum(['pending', 'preparing', 'ready', 'delivered', 'cancelled']),
  }),
});

module.exports = {
  mongoIdParam,
  createCategory,
  updateCategory,
  createFoodItem,
  updateFoodItem,
  createOrder,
  updateOrderStatus,
};
