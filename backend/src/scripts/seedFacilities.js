require('dotenv').config();
const Facility = require('../models/facility.model');
const connectDB = require('../config/db');

const defaultFacilities = [
  {
    name: 'Infinity Pool',
    description: 'Our rooftop infinity pool offers stunning views of the city skyline.',
    operatingHours: '06:00 AM - 10:00 PM',
    status: 'Active',
    badge: 'REJUVENATE',
    icon: 'Waves',
    section: 'facilities_wellness',
    image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Luxury Spa',
    description: 'Rejuvenate your body and mind with our award-winning spa treatments.',
    operatingHours: '09:00 AM - 08:00 PM',
    status: 'Active',
    badge: 'REJUVENATE',
    icon: 'Sparkles',
    section: 'facilities_wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Fitness Center',
    description: 'Fully equipped modern gym with personal trainers available.',
    operatingHours: '24 Hours',
    status: 'Active',
    badge: 'REJUVENATE',
    icon: 'Dumbbell',
    section: 'facilities_wellness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  },
];

const seedFacilitiesIfEmpty = async () => {
  const count = await Facility.countDocuments({ section: 'facilities_wellness' });
  if (count > 0) {
    console.log(`Facilities already present (${count}). Skipping seed.`);
    return;
  }

  await Facility.insertMany(defaultFacilities);
  console.log(`Seeded ${defaultFacilities.length} facilities`);
};

const runSeed = async () => {
  try {
    await connectDB();
    await Facility.deleteMany({ section: 'facilities_wellness' });
    await Facility.insertMany(defaultFacilities);
    console.log(`Seeded ${defaultFacilities.length} facilities`);
    process.exit(0);
  } catch (error) {
    console.error('Facilities seed failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  runSeed();
}

module.exports = { defaultFacilities, seedFacilitiesIfEmpty };
