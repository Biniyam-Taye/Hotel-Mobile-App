const { z } = require('zod');

const createRoom = z.object({
  body: z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(10).max(1000),
    pricePerNight: z.number().positive(),
    capacity: z.object({
      adults: z.number().int().positive(),
      children: z.number().int().nonnegative().default(0),
    }),
    amenities: z.array(z.string()).min(1),
    roomType: z.enum(['standard', 'deluxe', 'suite', 'presidential']).optional(),
    isAvailable: z.boolean().optional(),
  }),
});

const updateRoom = z.object({
  body: z.object({
    title: z.string().min(3).max(100).optional(),
    description: z.string().min(10).max(1000).optional(),
    pricePerNight: z.number().positive().optional(),
    capacity: z.object({
      adults: z.number().int().positive().optional(),
      children: z.number().int().nonnegative().optional(),
    }).optional(),
    amenities: z.array(z.string()).optional(),
    roomType: z.enum(['standard', 'deluxe', 'suite', 'presidential']).optional(),
    isAvailable: z.boolean().optional(),
  }),
});

module.exports = {
  createRoom,
  updateRoom,
};
