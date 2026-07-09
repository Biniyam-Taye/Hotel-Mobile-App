# LuxeStay Backend API

Node.js + Express + MongoDB + JWT + Cloudinary + Stripe backend for the LuxeStay hotel booking platform.

## Stack

| Technology | Purpose |
|------------|---------|
| **Express** | REST API server |
| **MongoDB + Mongoose** | Database & ODM |
| **JWT** | Authentication (access + refresh tokens) |
| **bcryptjs** | Password hashing |
| **Cloudinary** | Image hosting (hotels, rooms, avatars) |
| **Stripe** | Payment processing (Checkout + webhooks) |
| **Helmet + CORS + Rate Limit** | Security |

## Quick Start

### 1. Prerequisites

- Node.js 18+
- MongoDB running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string
- [Cloudinary](https://cloudinary.com) account (free tier works)
- [Stripe](https://stripe.com) account (test mode)

### 2. Install & Configure

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secrets, Cloudinary, and Stripe keys
```

### 3. Start MongoDB

**Option A — Docker (recommended)**

```bash
docker compose up -d
```

**Option B — MongoDB Atlas (cloud, free tier)**

1. Create a cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Copy the connection string to `MONGODB_URI` in `.env`

**Option C — Local MongoDB on Windows**

1. Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
2. Install as a Windows service
3. Ensure it runs on `mongodb://127.0.0.1:27017`

### 4. Seed Database

```bash
npm run seed
```

### 5. Start Server

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

API base URL: `http://localhost:3000/api/v1`

Health check: `GET /api/v1/health`

## Test Accounts (after seed)

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@luxestay.com | Admin123! |
| Hotel Admin | manager@luxestay.com | Admin123! |
| Receptionist | reception@luxestay.com | Admin123! |
| Guest | guest@luxestay.com | Guest123! |

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register guest account |
| POST | `/auth/login` | Login → returns JWT |
| POST | `/auth/refresh` | Refresh access token |
| GET | `/auth/me` | Current user profile |
| PATCH | `/auth/me` | Update profile |
| POST | `/auth/logout` | Invalidate refresh token |

### Hotels (Guest)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/hotels?q=&city=&category=&minPrice=&maxPrice=&checkIn=&checkOut=&guests=` | Search & filter |
| GET | `/hotels/:id` | Hotel details + rooms + reviews |
| GET | `/hotels/cities` | Featured cities |
| GET | `/hotels/categories` | Categories list |
| GET | `/hotels/offers` | Active promotions |

### Bookings
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| POST | `/bookings` | guest | Create booking (conflict check) |
| GET | `/bookings/me` | guest | My bookings |
| GET | `/bookings/:id` | any auth | Booking detail |
| PATCH | `/bookings/:id/cancel` | guest/admin | Cancel booking |
| GET | `/bookings/admin/list` | admin | All bookings (scoped) |

### Dashboard
| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| GET | `/dashboard/stats?hotelId=` | admin | Revenue, occupancy, charts |
| GET | `/dashboard/receptionist/today?hotelId=` | receptionist | Today's check-ins/outs |

### Media (Cloudinary)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/media/upload` | Generic image upload (multipart `image`) |
| POST | `/media/avatar` | Upload profile picture |
| POST | `/media/hotels/:hotelId/images` | Add hotel image |
| POST | `/media/rooms/:roomTypeId/images` | Add room image |
| DELETE | `/media/upload` | Delete by `publicId` |

### Payments (Stripe)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/payments/checkout-session` | Create Stripe Checkout session |
| POST | `/payments/payment-intent` | Create PaymentIntent (mobile SDK) |
| GET | `/payments/verify?sessionId=` | Verify payment after redirect |
| POST | `/payments/webhook` | Stripe webhook (raw body) |
| POST | `/payments/refund/:bookingId` | Admin refund |

### Favorites & Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/favorites` | My favorite hotels |
| POST | `/favorites/:hotelId` | Toggle favorite |
| POST | `/favorites/reviews` | Submit review |
| GET | `/favorites/reviews/:hotelId` | Hotel reviews |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/rooms` | Physical rooms list |
| POST | `/admin/room-types` | Create room type |
| GET | `/admin/staff` | Staff list |
| GET | `/admin/customers` | Guest list |
| PATCH | `/admin/users/:id` | Update user role (super_admin) |

## Authentication

All protected routes require:

```
Authorization: Bearer <accessToken>
```

Login response:

```json
{
  "success": true,
  "data": {
    "user": { "id": "...", "email": "...", "role": "guest", ... },
    "accessToken": "eyJ...",
    "refreshToken": "eyJ..."
  }
}
```

## RBAC Roles

| Role | Access |
|------|--------|
| `guest` | Browse hotels, book, favorites, reviews |
| `hotel_admin` | Own hotel(s) — rooms, bookings, dashboard |
| `receptionist` | Assigned hotel — check-in, room status |
| `super_admin` | All hotels, users, platform analytics |

Guests are blocked from `/dashboard/*` and `/admin/*` routes.

## Cloudinary Setup

1. Create a Cloudinary account
2. Copy Cloud Name, API Key, API Secret to `.env`
3. Upload from Flutter:

```dart
final formData = FormData.fromMap({
  'image': await MultipartFile.fromFile(filePath),
  'entityType': 'hotels',
  'entityId': hotelId,
});
await dio.post('/media/upload', data: formData);
// Response: { url, publicId }
```

Store `url` in your UI; store `publicId` if you need to delete later.

## Stripe Setup

1. Get test keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Add to `.env`
3. For webhooks locally, use [Stripe CLI](https://stripe.com/docs/stripe-cli):

```bash
stripe listen --forward-to localhost:3000/api/v1/payments/webhook
```

Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`.

### Booking + Payment Flow

1. `POST /bookings` → creates booking with `paymentStatus: unpaid`
2. `POST /payments/checkout-session` → get Stripe Checkout URL
3. User pays on Stripe
4. Webhook updates booking to `paid` + `confirmed`
5. `GET /payments/verify?sessionId=` → confirm on app redirect

## Flutter Integration

Add to `pubspec.yaml`:

```yaml
dependencies:
  dio: ^5.7.0
  flutter_secure_storage: ^9.2.2
```

```dart
final dio = Dio(BaseOptions(baseUrl: 'http://10.0.2.2:3000/api/v1')); // Android emulator
// Use http://localhost:3000 for iOS simulator / web

// Login
final res = await dio.post('/auth/login', data: {
  'email': 'guest@luxestay.com',
  'password': 'Guest123!',
});
final token = res.data['data']['accessToken'];
dio.options.headers['Authorization'] = 'Bearer $token';

// Fetch hotels
final hotels = await dio.get('/hotels', queryParameters: {'city': 'Dubai'});
```

Replace `MockData.hotels` with API calls via Riverpod providers.

## Project Structure

```
backend/
├── src/
│   ├── index.js          # Entry point
│   ├── app.js            # Express app
│   ├── config/           # DB, Cloudinary, Stripe
│   ├── models/           # Mongoose schemas
│   ├── middleware/       # Auth, upload, errors
│   ├── controllers/      # Route handlers
│   ├── services/         # Business logic
│   ├── routes/           # API routes
│   └── utils/            # Helpers
├── scripts/seed.js       # Demo data
├── .env.example
└── package.json
```

## Environment Variables

See `.env.example` for all required variables.

**Important:** Never commit `.env` to git. Use strong random strings for `JWT_SECRET` and `JWT_REFRESH_SECRET` (32+ characters).
