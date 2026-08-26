require('dotenv').config();
const FoodCategory = require('../models/foodCategory.model');
const FoodItem = require('../models/foodItem.model');
const connectDB = require('../config/db');

const defaultCategories = [
  { name: 'Breakfast', description: 'Morning dishes and light bites' },
  { name: 'Lunch', description: 'Midday meals and combos' },
  { name: 'Dinner', description: 'Evening fine dining selections' },
  { name: 'Drinks', description: 'Cocktails, wines, and beverages' },
];

const sampleMenuItems = [
  {
    categoryName: 'Dinner',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with asparagus and hollandaise sauce.',
    price: 35,
    image: 'https://images.unsplash.com/photo-1481070555726-e2fe83477d4a?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    features: ['Gluten Free', 'Chef Special'],
  },
  {
    categoryName: 'Breakfast',
    name: 'Avocado Toast',
    description: 'Sourdough toast with smashed avocado, poached eggs, and chili flakes.',
    price: 18,
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    features: ['Vegetarian'],
  },
  {
    categoryName: 'Drinks',
    name: 'Signature Cocktail',
    description: 'House special mix of premium gin, elderflower, and fresh berries.',
    price: 15,
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    isAvailable: true,
    isPopular: true,
    features: ['Bar Favorite'],
  },
];

const seedRestaurantIfEmpty = async () => {
  const categoryCount = await FoodCategory.countDocuments();
  if (categoryCount > 0) {
    console.log(`Food categories already present (${categoryCount}). Skipping restaurant seed.`);
    return;
  }

  const categories = await FoodCategory.insertMany(defaultCategories);
  const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c._id]));

  const items = sampleMenuItems.map((item) => ({
    name: item.name,
    description: item.description,
    price: item.price,
    image: item.image,
    isAvailable: item.isAvailable,
    isPopular: item.isPopular || false,
    features: item.features || [],
    section: 'restaurant_bar',
    category: categoryMap[item.categoryName],
  }));

  await FoodItem.insertMany(items);
  console.log(`Seeded ${categories.length} food categories and ${items.length} menu items`);
};

const runSeed = async () => {
  try {
    await connectDB();
    await FoodItem.deleteMany({});
    await FoodCategory.deleteMany({});

    const categories = await FoodCategory.insertMany(defaultCategories);
    const categoryMap = Object.fromEntries(categories.map((c) => [c.name, c._id]));

    const items = sampleMenuItems.map((item) => ({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
      isAvailable: item.isAvailable,
      isPopular: item.isPopular || false,
      features: item.features || [],
      section: 'restaurant_bar',
      category: categoryMap[item.categoryName],
    }));

    await FoodItem.insertMany(items);
    console.log(`Seeded ${categories.length} food categories and ${items.length} menu items`);
    process.exit(0);
  } catch (error) {
    console.error('Restaurant seed failed:', error.message);
    process.exit(1);
  }
};

if (require.main === module) {
  runSeed();
}

module.exports = { defaultCategories, sampleMenuItems, seedRestaurantIfEmpty };
