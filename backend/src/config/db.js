import mongoose from 'mongoose';

let memoryServer = null;

/**
 * Connect to MongoDB. Uses in-memory DB when USE_MEMORY_DB=true (no install needed).
 */
export async function connectDB() {
  mongoose.set('strictQuery', true);

  let uri = process.env.MONGODB_URI;

  if (process.env.USE_MEMORY_DB === 'true') {
    const { MongoMemoryServer } = await import('mongodb-memory-server');
    memoryServer = await MongoMemoryServer.create();
    uri = memoryServer.getUri('luxestay');
    console.log('Using in-memory MongoDB (dev mode — data resets on restart)');
  }

  if (!uri) throw new Error('MONGODB_URI is not defined in environment');

  try {
    await mongoose.connect(uri);
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (err) {
    if (process.env.NODE_ENV === 'development' && process.env.USE_MEMORY_DB !== 'true') {
      console.warn('Local MongoDB unavailable — falling back to in-memory database');
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      uri = memoryServer.getUri('luxestay');
      await mongoose.connect(uri);
      console.log('In-memory MongoDB connected');
      return;
    }
    throw err;
  }
}

export async function disconnectDB() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
    memoryServer = null;
  }
}
