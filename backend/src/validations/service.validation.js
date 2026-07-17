const { z } = require('zod');

// --- Service Validations ---
const createService = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    description: z.string().max(500),
    price: z.coerce.number().positive(),
    category: z.enum(['spa', 'gym', 'pool', 'laundry', 'airport_transfer', 'other']).optional(),
    isAvailable: z.coerce.boolean().optional(),
    duration: z.coerce.number().int().positive().optional(),
  }),
});

const updateService = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    price: z.coerce.number().positive().optional(),
    category: z.enum(['spa', 'gym', 'pool', 'laundry', 'airport_transfer', 'other']).optional(),
    isAvailable: z.coerce.boolean().optional(),
    duration: z.coerce.number().int().positive().optional(),
  }),
});

// --- Service Booking Validations ---
const createServiceBooking = z.object({
  body: z.object({
    service: z.string().min(1, "Service ID is required"),
    room: z.string().optional(),
    bookingDate: z.string().datetime(), // ISO 8601 format
    specialRequests: z.string().max(300).optional(),
  }),
});

const updateServiceBookingStatus = z.object({
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  }),
});

module.exports = {
  createService,
  updateService,
  createServiceBooking,
  updateServiceBookingStatus,
};
