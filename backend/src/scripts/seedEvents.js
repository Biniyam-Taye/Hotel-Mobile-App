require('dotenv').config();
const EventCategory = require('../models/eventCategory.model');
const EventSpace = require('../models/eventSpace.model');
const connectDB = require('../config/db');

const defaultCategories = [
  { name: 'Conference Hall', description: 'Large space equipped for professional conferences, summits, and large presentations.' },
  { name: 'Banquet Hall', description: 'Grand venue ideal for weddings, galas, dinners, and social celebrations.' },
  { name: 'Boardroom & Meeting Room', description: 'Cozy, high-tech rooms perfect for corporate meetings, discussions, and seminars.' },
  { name: 'Exhibition Center', description: 'Open, wide space suitable for trade shows, art exhibitions, and fairs.' },
];

const defaultSpaces = [
  {
    spaceNumber: 'GB-100',
    name: 'Grand Ballroom',
    categoryName: 'Banquet Hall',
    price: 1500,
    discountedPrice: null,
    maxGuests: 500,
    floor: 1,
    status: 'Available',
    isFeatured: true,
    publishStatus: 'Published',
    badge: 'PREMIUM VENUES',
    spaceSize: 450,
    description: 'Our premier luxury venue with high ceilings, grand chandeliers, and built-in professional AV stage.',
    amenities: ['PA Sound System', 'Catering Service', 'High-speed Wi-Fi', 'Stage & Podium', 'Climate Control', 'Cocktail Bar Set'],
    specialRates: [
      { date: '2026-12-31', price: 2500, label: "New Year's Eve Gala Surcharge" },
      { date: '2026-09-19', price: 1800, label: 'Peak Wedding Season Saturday' },
    ],
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
  },
  {
    spaceNumber: 'BR-301',
    name: 'Summit Boardroom',
    categoryName: 'Boardroom & Meeting Room',
    price: 350,
    discountedPrice: 300,
    maxGuests: 25,
    floor: 3,
    status: 'Available',
    isFeatured: false,
    publishStatus: 'Published',
    badge: 'PREMIUM VENUES',
    spaceSize: 65,
    description: 'Fully-equipped corporate boardroom featuring advanced video conferencing capabilities.',
    amenities: ['Projector & Screen', 'Video Conferencing', 'High-speed Wi-Fi', 'Climate Control'],
    specialRates: [],
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
  },
  {
    spaceNumber: 'EH-202',
    name: 'Grand Pavilion & Garden',
    categoryName: 'Banquet Hall',
    price: 1000,
    discountedPrice: null,
    maxGuests: 300,
    floor: 1,
    status: 'Occupied',
    isFeatured: true,
    publishStatus: 'Published',
    badge: 'PREMIUM VENUES',
    spaceSize: 320,
    description: 'Beautiful indoor-outdoor pavilion flowing into private landscaped gardens.',
    amenities: ['PA Sound System', 'Catering Service', 'High-speed Wi-Fi', 'Cocktail Bar Set'],
    specialRates: [
      { date: '2026-02-14', price: 1500, label: "Valentine's Day Premium" },
    ],
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
  },
];

const seedEventsIfEmpty = async () => {
  const spaceCount = await EventSpace.countDocuments({ section: 'events_conference' });
  if (spaceCount > 0) {
    console.log(`Event spaces already present (${spaceCount}). Skipping seed.`);
    return;
  }

  let categories = await EventCategory.find();
  if (categories.length === 0) {
    categories = await EventCategory.insertMany(defaultCategories);
  }

  const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c._id]));

  const spaces = defaultSpaces.map((space) => ({
    spaceNumber: space.spaceNumber,
    name: space.name,
    category: categoryMap[space.categoryName],
    price: space.price,
    discountedPrice: space.discountedPrice,
    maxGuests: space.maxGuests,
    floor: space.floor,
    status: space.status,
    isFeatured: space.isFeatured,
    publishStatus: space.publishStatus,
    badge: space.badge,
    spaceSize: space.spaceSize,
    description: space.description,
    amenities: space.amenities,
    specialRates: space.specialRates,
    image: space.image,
    section: 'events_conference',
  }));

  await EventSpace.insertMany(spaces);
  console.log(`Seeded ${categories.length} event categories and ${spaces.length} event spaces`);
};

const runSeed = async () => {
  try {
    await connectDB();
    await EventSpace.deleteMany({ section: 'events_conference' });
    await EventCategory.deleteMany({});
    const categories = await EventCategory.insertMany(defaultCategories);
    const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c._id]));

    const spaces = defaultSpaces.map((space) => ({
      spaceNumber: space.spaceNumber,
      name: space.name,
      category: categoryMap[space.categoryName],
      price: space.price,
      discountedPrice: space.discountedPrice,
      maxGuests: space.maxGuests,
      floor: space.floor,
      status: space.status,
      isFeatured: space.isFeatured,
      publishStatus: space.publishStatus,
      badge: space.badge,
      spaceSize: space.spaceSize,
      description: space.description,
      amenities: space.amenities,
      specialRates: space.specialRates,
      image: space.image,
      section: 'events_conference',
    }));

    await EventSpace.insertMany(spaces);
    console.log(`Seeded ${categories.length} event categories and ${spaces.length} event spaces`);
    process.exit(0);
  } catch (error) {
    console.error('Events seed failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  runSeed();
}

module.exports = { defaultCategories, defaultSpaces, seedEventsIfEmpty };
