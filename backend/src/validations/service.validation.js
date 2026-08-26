const { z } = require('zod');

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const serviceCategory = z.enum([
  'spa', 'gym', 'pool', 'laundry', 'airport_transfer', 'concierge', 'room_service', 'other',
]);

const serviceSection = z.enum(['hotel_service', 'wellness', 'general']);

const mongoIdParam = z.object({
  params: z.object({
    id: mongoId,
  }),
});

const createService = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    title: z.string().min(2).max(100).optional(),
    description: z.string().max(500),
    price: z.coerce.number().min(0).optional(),
    pricingNote: z.string().max(100).optional(),
    category: serviceCategory.optional(),
    section: serviceSection.optional(),
    badge: z.string().max(50).optional(),
    icon: z.string().max(50).optional(),
    isAvailable: z.coerce.boolean().optional(),
    status: z.enum(['Active', 'Inactive']).optional(),
    duration: z.coerce.number().int().positive().optional(),
  }).refine((data) => data.name || data.title, {
    message: 'Either name or title is required',
  }),
});

const updateService = z.object({
  params: z.object({
    id: mongoId,
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    title: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    price: z.coerce.number().min(0).optional(),
    pricingNote: z.string().max(100).optional(),
    category: serviceCategory.optional(),
    section: serviceSection.optional(),
    badge: z.string().max(50).optional(),
    icon: z.string().max(50).optional(),
    isAvailable: z.coerce.boolean().optional(),
    status: z.enum(['Active', 'Inactive']).optional(),
    duration: z.coerce.number().int().positive().optional(),
  }),
});

const createServiceBooking = z.object({
  body: z.object({
    service: z.string().min(1, 'Service ID is required'),
    room: z.string().optional(),
    bookingDate: z.string().datetime(),
    specialRequests: z.string().max(300).optional(),
  }),
});

const updateServiceBookingStatus = z.object({
  params: z.object({
    id: mongoId,
  }),
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  }),
});

module.exports = {
  mongoIdParam,
  createService,
  updateService,
  createServiceBooking,
  updateServiceBookingStatus,
};
