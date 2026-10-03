const { z } = require('zod');

const createPaymentIntent = z.object({
  body: z.object({
    relatedType: z.enum(['Booking', 'FoodOrder', 'ServiceBooking', 'Event', 'Facility', 'Offer']).optional(),
    relatedId: z.string().optional(),
    amount: z.number().positive('Amount must be positive'),
    currency: z.string().optional().default('usd'),
  }),
});

const createCheckoutSession = z.object({
  body: z.object({
    title: z.string().min(1, 'Title or item description is required'),
    amount: z.number().positive('Amount must be positive'),
    currency: z.string().optional().default('usd'),
    relatedType: z.enum(['Booking', 'FoodOrder', 'ServiceBooking', 'Event', 'Facility', 'Offer']).optional().default('Booking'),
    relatedId: z.string().optional(),
    paymentId: z.string().optional(),
    customerEmail: z.string().email().optional().or(z.literal('')),
    customerName: z.string().optional(),
    successUrl: z.string().optional(),
    cancelUrl: z.string().optional(),
  }),
});


module.exports = {
  createPaymentIntent,
  createCheckoutSession,
};

