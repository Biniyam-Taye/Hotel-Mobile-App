require('dotenv').config();
const mongoose = require('mongoose');
const Room = require('../models/room.model');
const connectDB = require('../config/db');

const seedRooms = [
  {
    roomNumber: '501',
    name: 'Presidential Suite',
    categoryId: 'c5',
    categoryName: 'Presidential Suite',
    price: 25650,
    discountedPrice: null,
    maxGuests: 4,
    floor: 5,
    status: 'Available',
    publishStatus: 'Published',
    isFeatured: true,
    isPopular: true,
    mainImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    detailImages: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    ],
    location: 'Adama · Bekele Mola Hotels',
    bedType: 'King Size Bed + Sofa Bed',
    roomSize: 85,
    description: 'Our most luxurious suite with private terrace and butler service.',
    amenities: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Bathtub', 'Private Terrace'],
    rating: 4.8,
    reviewCount: 150,
  },
  {
    roomNumber: '101',
    name: 'Standard Room',
    categoryId: 'c1',
    categoryName: 'Standard Room',
    price: 6840,
    discountedPrice: null,
    maxGuests: 2,
    floor: 1,
    status: 'Available',
    publishStatus: 'Published',
    isFeatured: false,
    isPopular: false,
    mainImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    detailImages: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    ],
    location: 'Adama · Bekele Mola Hotels',
    bedType: 'Double Bed',
    roomSize: 24,
    description: 'Comfortable room with all essential amenities for a pleasant stay.',
    amenities: ['Free Wi-Fi', 'Flat-screen TV', 'Air Conditioning', 'Coffee Maker'],
    rating: 4.3,
    reviewCount: 180,
  },
  {
    roomNumber: '401',
    name: 'Family Suite',
    categoryId: 'c4',
    categoryName: 'Family Connecting Room',
    price: 18240,
    discountedPrice: null,
    maxGuests: 5,
    floor: 4,
    status: 'Available',
    publishStatus: 'Published',
    isFeatured: false,
    isPopular: false,
    mainImage: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    detailImages: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    ],
    location: 'Adama · Bekele Mola Hotels',
    bedType: 'King Size Bed + 2 Twin Beds',
    roomSize: 65,
    description: "Spacious suite designed for families with children's entertainment area.",
    amenities: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Mini Bar', 'Game Console'],
    rating: 4.7,
    reviewCount: 120,
  },
  {
    roomNumber: '305',
    name: 'Honeymoon Suite',
    categoryId: 'c3',
    categoryName: 'Executive Suite',
    price: 21660,
    discountedPrice: null,
    maxGuests: 2,
    floor: 3,
    status: 'Available',
    publishStatus: 'Published',
    isFeatured: true,
    isPopular: true,
    mainImage: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    detailImages: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    ],
    location: 'Adama · Bekele Mola Hotels',
    bedType: 'King Size Bed',
    roomSize: 55,
    description: 'Romantic suite with jacuzzi, rose petals, and sunset views.',
    amenities: ['Free Wi-Fi', 'Smart TV', 'Air Conditioning', 'Coffee Maker', 'Jacuzzi', 'Mini Bar'],
    rating: 4.9,
    reviewCount: 250,
  },
];

const seedRoomsIfEmpty = async () => {
  const count = await Room.countDocuments();
  if (count > 0) {
    console.log(`Rooms already present (${count}). Skipping seed.`);
    return;
  }
  await Room.insertMany(seedRooms);
  console.log(`Seeded ${seedRooms.length} rooms successfully`);
};

const runSeed = async () => {
  try {
    await connectDB();
    await Room.deleteMany({});
    await Room.insertMany(seedRooms);
    console.log(`Seeded ${seedRooms.length} rooms successfully`);
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  runSeed();
}

module.exports = { seedRooms, seedRoomsIfEmpty };
