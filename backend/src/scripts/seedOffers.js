require('dotenv').config();
const Offer = require('../models/offer.model');
const connectDB = require('../config/db');

const defaultOffers = [
  {
    title: 'Early Bird Special',
    subtitle: 'Sun, sea, and savings on your perfect coastal getaway',
    description:
      'Plan ahead and save big! Enjoy 25% off on all room types when you book at least 30 days before your stay. Whether you are planning a family vacation or a solo recharge, this package layers premium perks onto an already exceptional stay.',
    discountTag: '25% OFF',
    typeTag: 'Seasonal',
    isPopular: true,
    validUntil: new Date('2026-12-31'),
    packagePricing: 'ETB 240',
    stayLength: '3+ nights',
    guests: 'Up to 4',
    status: 'Active',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
    detailImages: [
      {
        url: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=800&q=80',
      },
      {
        url: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80',
      },
    ],
    highlights: [
      {
        title: '4th Night Free',
        description: 'Stay 3 nights, get the 4th complimentary at select beachfront hotels.',
      },
      {
        title: 'Daily Breakfast',
        description: 'Full buffet or a la carte breakfast for all registered guests.',
      },
    ],
  },
  {
    title: 'Romantic Getaway',
    subtitle: 'Perfect for Couples',
    description:
      'Includes champagne on arrival, rose petal turndown, couples spa treatment, and a candlelit dinner.',
    discountTag: '15% OFF',
    typeTag: 'Couples',
    isPopular: false,
    validUntil: new Date('2026-02-28'),
    packagePricing: 'ETB 350',
    stayLength: '2+ nights',
    guests: '2 Adults',
    status: 'Active',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1517445963287-20ff67d3077e?auto=format&fit=crop&w=800&q=80',
    highlights: [
      {
        title: 'Welcome Champagne',
        description: 'A chilled bottle of premium champagne waiting in your room.',
      },
      {
        title: 'Couples Massage',
        description: '60-minute relaxing massage for two at our luxury spa.',
      },
    ],
  },
  {
    title: 'Family Fun Package',
    subtitle: 'Great for Families',
    description:
      'Includes connecting rooms, complimentary kids meals, free airport transfers, and a family excursion.',
    discountTag: '20% OFF',
    typeTag: '+ POPULAR',
    isPopular: true,
    validUntil: new Date('2026-08-31'),
    packagePricing: 'ETB 450',
    stayLength: '4+ nights',
    guests: 'Up to 5',
    status: 'Active',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
    highlights: [
      {
        title: 'Kids Eat Free',
        description: 'Children under 12 eat free from the kids menu.',
      },
    ],
  },
  {
    title: 'Business Class',
    subtitle: 'For Corporate Travelers',
    description:
      'Includes executive room, airport transfers, meeting room access, and complimentary business services.',
    discountTag: '10% OFF',
    typeTag: 'Corporate',
    isPopular: false,
    validUntil: new Date('2026-12-31'),
    packagePricing: 'ETB 850',
    stayLength: '1+ nights',
    guests: '1-2 Adults',
    status: 'Active',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    highlights: [
      {
        title: 'Meeting Room Access',
        description: 'Complimentary 2-hour boardroom access during your stay.',
      },
    ],
  },
];

const seedOffersIfEmpty = async () => {
  const count = await Offer.countDocuments();
  if (count > 0) {
    console.log(`Offers already present (${count}). Skipping seed.`);
    return;
  }

  await Offer.insertMany(defaultOffers);
  console.log(`Seeded ${defaultOffers.length} special offers`);
};

const runSeed = async () => {
  try {
    await connectDB();
    await Offer.deleteMany({});
    await Offer.insertMany(defaultOffers);
    console.log(`Seeded ${defaultOffers.length} special offers`);
    process.exit(0);
  } catch (error) {
    console.error('Offers seed failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  runSeed();
}

module.exports = { defaultOffers, seedOffersIfEmpty };
