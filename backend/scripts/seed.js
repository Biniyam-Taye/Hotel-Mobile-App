/**
 * Seed script — populates MongoDB with demo users, hotels, rooms, and bookings.
 * Run: npm run seed
 */
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDB } from '../src/config/db.js';
import User from '../src/models/User.js';
import Hotel from '../src/models/Hotel.js';
import RoomType from '../src/models/RoomType.js';
import PhysicalRoom from '../src/models/PhysicalRoom.js';
import City from '../src/models/City.js';
import Offer from '../src/models/Offer.js';
import Booking from '../src/models/Booking.js';
import { ROLES, HOTEL_STATUS, BOOKING_STATUS } from '../src/utils/constants.js';
import { generateBookingRef, countNights } from '../src/utils/helpers.js';

dotenv.config();

async function seed() {
  await connectDB();
  console.log('Clearing existing data...');
  await Promise.all([
    User.deleteMany({}),
    Hotel.deleteMany({}),
    RoomType.deleteMany({}),
    PhysicalRoom.deleteMany({}),
    City.deleteMany({}),
    Offer.deleteMany({}),
    Booking.deleteMany({}),
  ]);

  // ─── Users ────────────────────────────────────────────────────────
  const superAdmin = await User.create({
    email: 'admin@luxestay.com',
    password: 'Admin123!',
    fullName: 'Super Admin',
    role: ROLES.SUPER_ADMIN,
    phone: '+251 911 000 001',
  });

  const hotelAdmin = await User.create({
    email: 'manager@luxestay.com',
    password: 'Admin123!',
    fullName: 'Hotel Manager',
    role: ROLES.HOTEL_ADMIN,
    phone: '+251 911 000 002',
  });

  const receptionist = await User.create({
    email: 'reception@luxestay.com',
    password: 'Admin123!',
    fullName: 'Helen Tadesse',
    role: ROLES.RECEPTIONIST,
    phone: '+251 911 123 456',
  });

  const guest = await User.create({
    email: 'guest@luxestay.com',
    password: 'Guest123!',
    fullName: 'Biniyam',
    role: ROLES.GUEST,
    phone: '+251 912 345 678',
    location: 'Addis Ababa, Ethiopia',
    loyaltyTier: 'gold',
    rewardPoints: 12450,
    walletBalance: 2580,
    preferences: ['Beach', 'Spa', 'Fine Dining'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  });

  // ─── Cities ───────────────────────────────────────────────────────
  await City.insertMany([
    { name: 'Dubai', country: 'UAE', imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=400&fit=crop', hotelCount: 2 },
    { name: 'Addis Ababa', country: 'Ethiopia', imageUrl: 'https://images.unsplash.com/photo-1523805000451-335022a51857?w=400&h=400&fit=crop', hotelCount: 1 },
    { name: 'Paris', country: 'France', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=400&fit=crop', hotelCount: 1 },
  ]);

  // ─── Hotels ───────────────────────────────────────────────────────
  const ritzCarlton = await Hotel.create({
    name: 'The Ritz-Carlton',
    slug: 'ritz-carlton-dubai',
    description: 'Experience unparalleled luxury at The Ritz-Carlton Dubai.',
    location: 'JBR Walk, Dubai Marina',
    city: 'Dubai',
    country: 'UAE',
    latitude: 25.0783,
    longitude: 55.1345,
    category: 'Hotels',
    rating: 4.9,
    reviewCount: 2847,
    priceFrom: 450,
    discountLabel: '22% OFF',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Beach Access'],
    images: [{
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      publicId: 'seed/ritz-1',
      isPrimary: true,
    }],
    status: HOTEL_STATUS.ACTIVE,
    ownerId: hotelAdmin._id,
    contact: { phone: '+971 4 399 4000', email: 'reservations@ritzcarlton.ae' },
    cancellationPolicy: 'Free cancellation up to 48 hours before check-in.',
    rules: ['No smoking', 'No pets', 'Check-in after 3:00 PM'],
    languages: ['English', 'Arabic'],
  });

  const grandPalace = await Hotel.create({
    name: 'LuxeStay Grand Palace',
    slug: 'luxestay-grand-palace',
    description: 'Premium hospitality in the heart of Addis Ababa.',
    location: 'Bole, Addis Ababa',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    category: 'Hotels',
    rating: 4.8,
    reviewCount: 892,
    priceFrom: 120,
    amenities: ['Free WiFi', 'Pool', 'Restaurant', 'Parking', 'Spa'],
    images: [{
      url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
      publicId: 'seed/grand-1',
      isPrimary: true,
    }],
    status: HOTEL_STATUS.ACTIVE,
    ownerId: hotelAdmin._id,
  });

  // Assign staff to Grand Palace
  hotelAdmin.assignedHotels = [grandPalace._id];
  receptionist.assignedHotels = [grandPalace._id];
  await hotelAdmin.save();
  await receptionist.save();

  // ─── Room Types ───────────────────────────────────────────────────
  const deluxeRoom = await RoomType.create({
    hotelId: ritzCarlton._id,
    name: 'Deluxe Sea View Room',
    type: 'Deluxe',
    description: 'Spacious room with panoramic Gulf views.',
    pricePerNight: 450,
    originalPrice: 580,
    capacity: 2,
    bedType: 'King',
    bedCount: 1,
    roomSize: 45,
    view: 'Sea View',
    amenities: ['Mini Bar', 'Balcony', 'Smart TV'],
    breakfastIncluded: true,
    totalInventory: 5,
    images: [{
      url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      publicId: 'seed/deluxe-1',
    }],
  });

  const standardRoom = await RoomType.create({
    hotelId: grandPalace._id,
    name: 'Standard Room',
    type: 'Standard',
    description: 'Comfortable standard room with city views.',
    pricePerNight: 120,
    capacity: 2,
    bedType: 'Queen',
    bedCount: 1,
    roomSize: 30,
    view: 'City View',
    amenities: ['WiFi', 'TV', 'Safe'],
    totalInventory: 10,
    images: [{
      url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
      publicId: 'seed/standard-1',
    }],
  });

  // ─── Physical Rooms (receptionist/admin) ──────────────────────────
  const physicalRooms = [];
  for (let i = 1; i <= 8; i++) {
    physicalRooms.push({
      hotelId: grandPalace._id,
      roomTypeId: standardRoom._id,
      roomNumber: `10${i}`,
      floor: 1,
      status: i <= 5 ? 'occupied' : 'available',
      currentGuestName: i <= 5 ? `Guest ${i}` : undefined,
    });
  }
  await PhysicalRoom.insertMany(physicalRooms);

  // ─── Sample Booking ───────────────────────────────────────────────
  const checkIn = new Date();
  checkIn.setDate(checkIn.getDate() + 7);
  const checkOut = new Date(checkIn);
  checkOut.setDate(checkOut.getDate() + 3);
  const nights = countNights(checkIn, checkOut);

  await Booking.create({
    bookingRef: generateBookingRef(),
    guestId: guest._id,
    hotelId: ritzCarlton._id,
    roomTypeId: deluxeRoom._id,
    checkIn,
    checkOut,
    guests: 2,
    nights,
    pricePerNight: 450,
    subtotal: 450 * nights,
    platformCommission: (450 * nights * 15) / 100,
    totalPrice: 450 * nights,
    status: BOOKING_STATUS.CONFIRMED,
    paymentMethod: 'visa',
    paymentStatus: 'paid',
  });

  // ─── Offers ───────────────────────────────────────────────────────
  await Offer.create({
    title: 'Summer Escape',
    subtitle: 'Up to 30% off',
    description: 'Book your dream vacation with exclusive summer rates.',
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    imagePublicId: 'seed/offer-1',
    couponCode: 'SUMMER30',
    discountPercent: 30,
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
  });

  console.log('\n✅ Seed completed!\n');
  console.log('Test accounts (password in parentheses):');
  console.log(`  Super Admin:   ${superAdmin.email} (Admin123!)`);
  console.log(`  Hotel Admin:   ${hotelAdmin.email} (Admin123!)`);
  console.log(`  Receptionist:  ${receptionist.email} (Admin123!)`);
  console.log(`  Guest:         ${guest.email} (Guest123!)`);
  console.log(`\nHotels: ${ritzCarlton.name}, ${grandPalace.name}`);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
