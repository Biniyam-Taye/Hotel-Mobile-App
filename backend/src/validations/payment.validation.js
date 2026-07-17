const { z } = require('zod');

const createPaymentIntent = z.object({
  body: z.object({
    relatedType: z.enum(['Booking', 'FoodOrder', 'ServiceBooking']),
    relatedId: z.string().min(1, 'Related ID is required'),
    amount: z.number().positive(),
    currency: z.string().optional().default('usd'),
  }),
});

module.exports = {
  createPaymentIntent,
};
