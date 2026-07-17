const { z } = require('zod');

// --- Favorite Validations ---
const addFavorite = z.object({
  body: z.object({
    itemType: z.enum(['Room', 'FoodItem', 'Service']),
    itemId: z.string().min(1, 'Item ID is required'),
  }),
});

// --- Review Validations ---
const addReview = z.object({
  body: z.object({
    itemType: z.enum(['Room', 'FoodItem', 'Service']),
    itemId: z.string().min(1, 'Item ID is required'),
    rating: z.number().min(1).max(5),
    comment: z.string().max(500).optional(),
  }),
});

const updateReview = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().max(500).optional(),
  }),
});

// --- Notification Validations (Mostly internal, but here for completeness) ---
const sendNotification = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'),
    title: z.string().min(2),
    message: z.string().min(2),
    type: z.enum(['booking', 'order', 'payment', 'promotion', 'system']).optional(),
    relatedId: z.string().optional(),
  }),
});

module.exports = {
  addFavorite,
  addReview,
  updateReview,
  sendNotification,
};
