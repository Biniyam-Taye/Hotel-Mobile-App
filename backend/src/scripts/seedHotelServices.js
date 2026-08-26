require('dotenv').config();
const Service = require('../models/service.model');
const connectDB = require('../config/db');

const defaultServices = [
  {
    name: 'Airport Transfer',
    description: 'Private chauffeur service to and from the airport. Available 24/7.',
    pricingNote: 'From $50',
    price: 50,
    category: 'airport_transfer',
    section: 'hotel_service',
    badge: '24/7 CONCIERGE',
    icon: 'Car',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Room Service',
    description: 'In-room dining available 24 hours a day with our full restaurant menu.',
    pricingNote: 'Menu Pricing + 10%',
    price: 0,
    category: 'room_service',
    section: 'hotel_service',
    badge: '24/7 CONCIERGE',
    icon: 'ConciergeBell',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Laundry & Dry Cleaning',
    description: 'Same-day laundry and dry cleaning services for all guests.',
    pricingNote: 'Per Item Pricing',
    price: 0,
    category: 'laundry',
    section: 'hotel_service',
    badge: '24/7 CONCIERGE',
    icon: 'Shirt',
    isAvailable: true,
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
  },
];

const seedHotelServicesIfEmpty = async () => {
  const count = await Service.countDocuments({ section: 'hotel_service' });
  if (count > 0) {
    console.log(`Hotel services already present (${count}). Skipping seed.`);
    return;
  }

  await Service.insertMany(defaultServices);
  console.log(`Seeded ${defaultServices.length} hotel services`);
};

const runSeed = async () => {
  try {
    await connectDB();
    await Service.deleteMany({ section: 'hotel_service' });
    await Service.insertMany(defaultServices);
    console.log(`Seeded ${defaultServices.length} hotel services`);
    process.exit(0);
  } catch (error) {
    console.error('Hotel services seed failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  runSeed();
}

module.exports = { defaultServices, seedHotelServicesIfEmpty };
