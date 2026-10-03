require('dotenv').config();
const RoomCategory = require('../models/roomCategory.model');
const connectDB = require('../config/db');

const seedCategories = [
  {
    name: 'Standard Room',
    description: 'Comfortable and cozy room perfect for solo travelers or couples.',
    basePrice: 6840,
    maxGuests: 2,
    bedConfiguration: '1 Queen Bed',
    roomSize: '25 sqm',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Hair Dryer'],
    status: 'Active',
  },
  {
    name: 'Deluxe Ocean View',
    description: 'Spacious room with stunning views of the ocean and premium amenities.',
    basePrice: 14250,
    maxGuests: 3,
    bedConfiguration: '1 King Bed or 2 Twin Beds',
    roomSize: '35 sqm',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Ocean View'],
    status: 'Active',
  },
  {
    name: 'Executive Suite',
    description: 'Luxurious suite featuring a separate living area, perfect for business or leisure.',
    basePrice: 25650,
    maxGuests: 4,
    bedConfiguration: '1 King Bed, 1 Sofa Bed',
    roomSize: '55 sqm',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Mini Bar', 'Bathtub', 'Coffee Maker'],
    status: 'Active',
  },
  {
    name: 'Family Connecting Room',
    description: 'Two interconnected rooms providing space and privacy for the whole family.',
    basePrice: 21660,
    maxGuests: 5,
    bedConfiguration: '1 King Bed, 2 Twin Beds',
    roomSize: '60 sqm',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Flat-screen TV', 'Mini Bar', 'Bathtub'],
    status: 'Active',
  },
  {
    name: 'Presidential Suite',
    description: 'The ultimate luxury experience with panoramic views, private dining, and butler service.',
    basePrice: 68400,
    maxGuests: 4,
    bedConfiguration: '1 King Bed',
    roomSize: '120 sqm',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    amenities: ['Free Wi-Fi', 'Air Conditioning', 'Mini Bar', 'Bathtub', 'Balcony', 'Ocean View'],
    status: 'Draft',
  },
];

const seedCategoriesIfEmpty = async () => {
  const count = await RoomCategory.countDocuments();
  if (count > 0) {
    console.log(`Room categories already present (${count}). Skipping seed.`);
    return;
  }
  await RoomCategory.insertMany(seedCategories);
  console.log(`Seeded ${seedCategories.length} room categories successfully`);
};

const runSeed = async () => {
  try {
    await connectDB();
    await RoomCategory.deleteMany({});
    await RoomCategory.insertMany(seedCategories);
    console.log(`Seeded ${seedCategories.length} room categories successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Category seed failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  runSeed();
}

module.exports = { seedCategories, seedCategoriesIfEmpty };
