const { z } = require('zod');

// --- Category Validations ---
const createCategory = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(200).optional(),
    isActive: z.coerce.boolean().optional(),
  }),
});

const updateCategory = z.object({
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
    price: z.coerce.number().positive(),
    category: z.string().min(1, "Category ID is required"),
    isAvailable: z.coerce.boolean().optional(),
    preparationTime: z.coerce.number().int().positive().optional(),
    // For tags, form-data sends it either as comma separated string or multiple fields. 
    // Zod's z.preprocess or a custom refine is usually needed, but for simplicity we'll allow any and parse in controller if needed, or assume it's sent correctly.
    // Let's use preprocess to handle comma-separated strings
    tags: z.preprocess((val) => {
      if (typeof val === 'string') return val.split(',').map(s => s.trim());
      return val;
    }, z.array(z.string()).optional()),
  }),
});

const updateFoodItem = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    price: z.coerce.number().positive().optional(),
    category: z.string().optional(),
    isAvailable: z.coerce.boolean().optional(),
    preparationTime: z.coerce.number().int().positive().optional(),
    tags: z.preprocess((val) => {
      if (typeof val === 'string') return val.split(',').map(s => s.trim());
      return val;
    }, z.array(z.string()).optional()),
  }),
});

// --- Food Order Validations ---
const createOrder = z.object({
  body: z.object({
    room: z.string().optional(),
    items: z.array(
      z.object({
        foodItem: z.string().min(1, "Food Item ID is required"),
        quantity: z.number().int().positive(),
      })
    ).min(1, "Order must contain at least one item"),
    specialInstructions: z.string().max(300).optional(),
  }),
});

const updateOrderStatus = z.object({
  body: z.object({
    status: z.enum(['pending', 'preparing', 'ready', 'delivered', 'cancelled']),
  }),
});

module.exports = {
  createCategory,
  updateCategory,
  createFoodItem,
  updateFoodItem,
  createOrder,
  updateOrderStatus,
};
