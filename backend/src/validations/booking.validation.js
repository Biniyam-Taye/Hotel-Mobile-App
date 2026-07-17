const { z } = require('zod');

const createBooking = z.object({
  body: z.object({
    room: z.string().min(1, "Room ID is required"),
    checkInDate: z.string().datetime(), // ISO 8601 format
    checkOutDate: z.string().datetime(),
    guests: z.object({
      adults: z.number().int().positive(),
      children: z.number().int().nonnegative().optional().default(0),
    }),
    specialRequests: z.string().max(500).optional(),
  }),
});

const updateBookingStatus = z.object({
  body: z.object({
    status: z.enum(['pending', 'confirmed', 'cancelled', 'completed']),
  }),
});

module.exports = {
  createBooking,
  updateBookingStatus,
};
