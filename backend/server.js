require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/db');
const { seedRoomsIfEmpty } = require('./src/scripts/seedRooms');
const { seedCategoriesIfEmpty } = require('./src/scripts/seedCategories');
const { seedRestaurantIfEmpty } = require('./src/scripts/seedRestaurant');
const { seedHotelServicesIfEmpty } = require('./src/scripts/seedHotelServices');
const { seedFacilitiesIfEmpty } = require('./src/scripts/seedFacilities');
const { seedEventsIfEmpty } = require('./src/scripts/seedEvents');
const { seedOffersIfEmpty } = require('./src/scripts/seedOffers');
const { seedAdminIfEmpty } = require('./src/scripts/seedAdmin');

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await seedCategoriesIfEmpty();
    await seedRoomsIfEmpty();
    await seedRestaurantIfEmpty();
    await seedHotelServicesIfEmpty();
    await seedFacilitiesIfEmpty();
    await seedEventsIfEmpty();
    await seedOffersIfEmpty();
    await seedAdminIfEmpty();

    const server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    process.on('unhandledRejection', (err) => {
      console.log('UNHANDLED REJECTION! Shutting down...');
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
