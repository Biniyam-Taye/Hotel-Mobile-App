const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('./src/app');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  
  // Set fake env vars for tests
  process.env.JWT_SECRET = 'test_secret_key';
  process.env.JWT_EXPIRES_IN = '1d';
  process.env.NODE_ENV = 'test';
  
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Hotel Management API Integration Tests', () => {
  let adminToken;
  let customerToken;
  let roomId;
  let categoryId;
  let foodItemId;
  let serviceId;

  // --- Auth & Users ---
  it('Should register an admin user', async () => {
    const res = await request(app)
      .post('/api/v1/users/register')
      .send({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@test.com',
        password: 'password123',
        role: 'admin'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    adminToken = res.body.data.token;
  });

  it('Should register a customer user', async () => {
    const res = await request(app)
      .post('/api/v1/users/register')
      .send({
        firstName: 'Customer',
        lastName: 'User',
        email: 'customer@test.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    customerToken = res.body.data.token;
  });

  // --- Rooms ---
  it('Should create a room as admin', async () => {
    const res = await request(app)
      .post('/api/v1/rooms')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        roomNumber: '999',
        name: 'Luxury Suite',
        categoryId: 'c1',
        categoryName: 'Standard Room',
        description: 'A very nice luxury suite with ocean view.',
        price: 500,
        maxGuests: 2,
        amenities: ['WiFi', 'Pool', 'Ocean View'],
      });
      
    expect(res.statusCode).toBe(201);
    roomId = res.body.data.room._id;
  });

  it('Should fetch all rooms', async () => {
    const res = await request(app).get('/api/v1/rooms');
    expect(res.statusCode).toBe(200);
    expect(res.body.data.data.length).toBe(1);
  });

  // --- Bookings ---
  it('Should create a booking as customer', async () => {
    // Mock the email/notification system since we don't have SMTP setup
    const checkIn = new Date();
    checkIn.setDate(checkIn.getDate() + 1);
    const checkOut = new Date();
    checkOut.setDate(checkOut.getDate() + 3);

    const res = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        room: roomId,
        checkInDate: checkIn.toISOString(),
        checkOutDate: checkOut.toISOString(),
        guests: { adults: 2 }
      });
      
    expect(res.statusCode).toBe(201);
    expect(res.body.data.booking.totalAmount).toBe(1000); // 2 nights * 500
  });

  // --- Restaurant ---
  it('Should create a food category as admin', async () => {
    const res = await request(app)
      .post('/api/v1/restaurant/categories')
      .set('Authorization', `Bearer ${adminToken}`)
      .field('name', 'Main Course')
      .field('description', 'Delicious main courses')
      .field('isActive', 'true');
      
    expect(res.statusCode).toBe(201);
    categoryId = res.body.data.category._id;
  });

  it('Should create a food item as admin', async () => {
    const res = await request(app)
      .post('/api/v1/restaurant/items')
      .set('Authorization', `Bearer ${adminToken}`)
      .field('name', 'Steak')
      .field('description', 'Grilled ribeye steak')
      .field('price', 45)
      .field('category', categoryId)
      .field('preparationTime', 30);
      
    expect(res.statusCode).toBe(201);
    foodItemId = res.body.data.food._id;
  });

  it('Should place a food order as customer', async () => {
    const res = await request(app)
      .post('/api/v1/restaurant/orders')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        room: roomId,
        items: [
          { foodItem: foodItemId, quantity: 2 }
        ],
        specialInstructions: 'Medium rare'
      });
      
    expect(res.statusCode).toBe(201);
    expect(res.body.data.order.totalAmount).toBe(90); // 45 * 2
  });

  // --- Services ---
  it('Should create a hotel service as admin', async () => {
    const res = await request(app)
      .post('/api/v1/services')
      .set('Authorization', `Bearer ${adminToken}`)
      .field('name', 'Full Body Massage')
      .field('description', 'Relaxing 60 min massage')
      .field('price', 120)
      .field('category', 'spa')
      .field('duration', 60);
      
    expect(res.statusCode).toBe(201);
    serviceId = res.body.data.service._id;
  });

  it('Should book a service as customer', async () => {
    const bookingDate = new Date();
    bookingDate.setDate(bookingDate.getDate() + 2);
    
    const res = await request(app)
      .post('/api/v1/services/bookings')
      .set('Authorization', `Bearer ${customerToken}`)
      .send({
        service: serviceId,
        room: roomId,
        bookingDate: bookingDate.toISOString()
      });
      
    expect(res.statusCode).toBe(201);
  });

  // --- Dashboard ---
  it('Should fetch dashboard stats as admin', async () => {
    const res = await request(app)
      .get('/api/v1/dashboard/stats')
      .set('Authorization', `Bearer ${adminToken}`);
      
    expect(res.statusCode).toBe(200);
    expect(res.body.data.customers.total).toBe(1); // 1 customer
    expect(res.body.data.bookings.total).toBe(1);
    expect(res.body.data.sales.foodOrders).toBe(1);
    expect(res.body.data.sales.serviceBookings).toBe(1);
  });
});
