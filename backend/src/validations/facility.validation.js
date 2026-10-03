const { z } = require('zod');

const mongoId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

const facilityStatus = z.enum(['Active', 'Closed for Maintenance']);
const facilitySection = z.enum(['facilities_wellness', 'general']);

const mongoIdParam = z.object({
  params: z.object({
    id: mongoId,
  }),
});

const createFacility = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    title: z.string().min(2).max(100).optional(),
    description: z.string().max(500),
    operatingHours: z.string().max(100).optional(),
    hours: z.string().max(100).optional(),
    status: facilityStatus.optional(),
    badge: z.string().max(50).optional(),
    icon: z.string().max(50).optional(),
    section: facilitySection.optional(),
  }).refine((data) => data.name || data.title, {
    message: 'Either name or title is required',
  }).refine((data) => data.operatingHours || data.hours, {
    message: 'Operating hours are required',
  }),
});

const updateFacility = z.object({
  params: z.object({
    id: mongoId,
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    title: z.string().min(2).max(100).optional(),
    description: z.string().max(500).optional(),
    operatingHours: z.string().max(100).optional(),
    hours: z.string().max(100).optional(),
    status: facilityStatus.optional(),
    badge: z.string().max(50).optional(),
    icon: z.string().max(50).optional(),
    section: facilitySection.optional(),
  }),
});

module.exports = {
  mongoIdParam,
  createFacility,
  updateFacility,
};
