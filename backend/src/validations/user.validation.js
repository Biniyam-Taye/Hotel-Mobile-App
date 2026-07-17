const { z } = require('zod');

const register = z.object({
  body: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().max(20).optional(),
    role: z.enum(['customer', 'admin']).optional(), // Usually wouldn't allow passing role in production registration, but keeping it flexible here
  }),
});

const login = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1, "Password is required"),
  }),
});

const updateProfile = z.object({
  body: z.object({
    firstName: z.string().min(2).max(50).optional(),
    lastName: z.string().min(2).max(50).optional(),
    phone: z.string().max(20).optional(),
  }),
});

module.exports = {
  register,
  login,
  updateProfile,
};
