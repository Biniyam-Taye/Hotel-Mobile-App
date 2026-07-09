import mongoose from 'mongoose';

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      'MONGODB_URI is not set. Use MongoDB Atlas (free) or install MongoDB locally.\n' +
        'See backend/README.md for setup instructions.'
    );
  }

  mongoose.set('strictQuery', true);

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error('\n❌ Could not connect to MongoDB.');
    console.error('   → Use MongoDB Atlas: https://www.mongodb.com/atlas');
    console.error('   → Copy your connection string to MONGODB_URI in backend/.env\n');
    throw err;
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
