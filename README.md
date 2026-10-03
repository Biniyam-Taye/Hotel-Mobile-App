# 🏨 Hotel Management System

A full-stack, multi-platform hotel management ecosystem — built with **Flutter**, **React**, and **Node.js**.

![Flutter](https://img.shields.io/badge/Flutter-3.x-02569B?style=for-the-badge&logo=flutter&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Modules](#-modules)
  - [Backend API](#1-backend-api)
  - [Mobile App (Flutter)](#2-mobile-app-flutter)
  - [Frontend Web](#3-frontend-web)
  - [Admin Dashboard](#4-admin-dashboard)
  - [Manager Dashboard](#5-manager-dashboard)
- [Tech Stack](#-tech-stack)
- [API Reference](#-api-reference)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Contributors](#-contributors)

---

## 🌟 Overview

The **Hotel Management System** is a comprehensive, production-ready platform designed to manage all aspects of a modern hotel — from guest-facing booking and dining experiences to staff management, revenue analytics, and real-time payment processing.

The system consists of **5 interconnected applications** sharing a single RESTful backend:

| App | Platform | Audience |
|-----|----------|----------|
| Mobile App | Flutter (iOS & Android) | Hotel Guests |
| Frontend Web | React + Vite | Hotel Guests (Web) |
| Admin Dashboard | React + Vite | Hotel Administrators |
| Manager Dashboard | React + Vite | Hotel Managers |
| Backend API | Node.js + Express | All Clients |

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTS                            │
│                                                         │
│  📱 Mobile App   🌐 Frontend Web   🖥 Admin Dashboard   │
│  (Flutter)       (React/Vite)      (React/Vite)         │
│                                    🖥 Manager Dashboard  │
│                                    (React/Vite)         │
└────────────────────────┬────────────────────────────────┘
                         │  REST API (JSON)
                         ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND  —  Node.js / Express              │
│                                                         │
│  Auth · Rooms · Bookings · Restaurant · Services        │
│  Events · Payments · Promotions · Reports · Messages    │
└────────────┬────────────────────────┬───────────────────┘
             │                        │
             ▼                        ▼
     ┌───────────────┐      ┌──────────────────┐
     │  MongoDB Atlas │      │  Stripe Payments │
     └───────────────┘      └──────────────────┘
```

---

## 📁 Project Structure

```
hotel-management-system/
├── backend/                  # Node.js + Express REST API
│   └── src/
│       ├── controllers/      # Request handlers
│       ├── models/           # Mongoose schemas (20 models)
│       ├── routes/           # API route definitions (14 route files)
│       ├── services/         # Business logic layer
│       ├── middlewares/      # Auth, error handling, file upload
│       ├── validations/      # Input validation schemas
│       ├── utils/            # Helpers & utilities
│       ├── scripts/          # DB seed scripts
│       └── config/           # DB connection, environment config
│
├── mobile-app/               # Flutter mobile application
│   └── lib/
│       ├── features/         # Feature-first architecture (14 features)
│       └── core/             # Shared widgets, theme, services
│
├── frontend-web/             # React guest-facing website
│   └── src/
│       ├── pages/            # 27 page components
│       ├── components/       # Reusable UI components
│       ├── services/         # API service layer
│       └── context/          # React context (Auth, etc.)
│
├── admin-dashboard/          # React admin panel
│   └── src/
│       └── components/       # Dashboard, Calendar, Reports, etc.
│
└── Manager/                  # React manager panel
    └── src/
        └── components/       # Manager-specific views & reports
```

---

## 📦 Modules

### 1. Backend API

> **Node.js · Express · MongoDB · Stripe**

The core API server powering all client apps. Runs on port `5000`.

#### 📌 Models (Database Schemas)

| Model | Description |
|-------|-------------|
| `User` | Guests, admins, and staff accounts with JWT auth |
| `Room` | Hotel rooms with categories, pricing, and availability |
| `RoomCategory` | Room type definitions (Standard, Deluxe, Suite, etc.) |
| `Booking` | Room reservations linked to users and payments |
| `FoodItem` | Restaurant menu items with categories and pricing |
| `FoodCategory` | Restaurant food categories |
| `FoodOrder` | In-room dining and restaurant orders |
| `Service` | Hotel services (airport transfer, laundry, spa, etc.) |
| `ServiceBooking` | Customer service bookings |
| `Facility` | Hotel facilities (pool, gym, spa, etc.) |
| `EventSpace` | Conference and event venue management |
| `EventCategory` | Event type classifications |
| `Offer` | Promotions, seasonal deals, and discount offers |
| `Coupon` | Discount coupon codes |
| `Payment` | Stripe payment records and webhooks |
| `Review` | Guest reviews and ratings |
| `Message` | In-app messaging between guests and staff |
| `Notification` | Push notification records |
| `Report` | Downloadable management reports |
| `Favorite` | Guest-saved favourite rooms and services |

#### 📌 API Routes

| Prefix | Module |
|--------|--------|
| `/api/v1/users` | Auth, registration, profile management |
| `/api/v1/rooms` | Room listings, availability, search |
| `/api/v1/room-categories` | Room category CRUD |
| `/api/v1/bookings` | Room booking management |
| `/api/v1/restaurant` | Menu, food items, categories, orders |
| `/api/v1/services` | Hotel services & service bookings |
| `/api/v1/facilities` | Facilities management |
| `/api/v1/events` | Event spaces & event bookings |
| `/api/v1/promotions` | Offers, deals, and coupon codes |
| `/api/v1/engagement` | Reviews, ratings, favourites |
| `/api/v1/payments` | Stripe payment processing & webhooks |
| `/api/v1/dashboard` | Admin revenue & stats endpoints |
| `/api/v1/messages` | Guest–staff messaging |
| `/api/v1/reports` | Report generation & downloads |
| `/api/v1/health` | API health check |

---

### 2. Mobile App (Flutter)

> **Flutter · Dart 3 · Riverpod · GoRouter · Dio · Stripe**

A full-featured cross-platform mobile application for hotel guests on iOS and Android.

#### 📌 Features

| Feature | Description |
|---------|-------------|
| **Authentication** | Sign up, login, JWT token management with secure storage |
| **Home** | Personalised landing with featured offers and services |
| **Rooms** | Browse, filter, and book hotel rooms |
| **Restaurant** | View menus, place food orders, track order status |
| **Services** | Book hotel services (airport transfer, spa, laundry, etc.) |
| **Orders** | View and manage all active and past orders |
| **Payment** | Secure Stripe payment integration |
| **Offers** | View promotions, seasonal deals, and discount coupons |
| **Favourites** | Save and manage favourite rooms and services |
| **Notifications** | Real-time push notifications |
| **Profile** | Account management and personal settings |
| **Showcase** | Hotel gallery and experience showcase |
| **Engagement** | Submit reviews and ratings |
| **Navigation** | Voice-enabled navigation (VoiceNavigator) |

#### 📌 Tech Highlights

- **State Management**: `flutter_riverpod` + `riverpod_generator`
- **Navigation**: `go_router`
- **HTTP Client**: `dio`
- **Fonts**: `google_fonts`
- **Security**: `flutter_secure_storage` for JWT tokens
- **Animations**: `flutter_animate`

---

### 3. Frontend Web

> **React 18 · Vite · Vanilla CSS**

A polished, animated guest-facing hotel website with full booking capabilities.

#### 📌 Pages

| Page | Description |
|------|-------------|
| `Home` | Hero landing with animations and featured content |
| `RoomsPage` | Room listings with advanced filtering |
| `RestaurantPage` | Full dining menu with ordering system |
| `HotelServicesPage` | Browse and book hotel services |
| `HospitalityPage` | Luxury experience showcase |
| `EventsConferencesPage` | Event space bookings and packages |
| `FacilitiesWellnessPage` | Pool, gym, spa and wellness centre |
| `OffersPage` | Active promotions and deals |
| `MyOrdersPage` | Guest order tracking dashboard |
| `BookingSuccessPage` | Post-booking confirmation |
| `LoginPage` / `SignUpPage` | Guest authentication |
| `ContactPage` | Contact form and hotel information |
| `FAQPage` | Frequently asked questions |
| `ExperiencePage` | Curated experiences |
| `SpaPage`, `FitnessPage`, `PoolPage` | Individual wellness pages |
| `AboutPage`, `TermsPage`, `PrivacyPage` | Hotel info & legal |

---

### 4. Admin Dashboard

> **React 18 · Vite · Recharts · Lucide Icons**

A comprehensive administration panel with real-time revenue analytics and full hotel management tools.

#### 📌 Sections

| Section | Description |
|---------|-------------|
| **Overview** | Live revenue cards: Total Revenue, Paid Revenue, Monthly Chart |
| **Activity** | Customer payments and transaction table (live from DB) |
| **Calendar** | Booking calendar with visual scheduling |
| **Messages** | Guest–staff communication centre |
| **Documents** | Report management and downloads |
| **Team** | Staff and team management |
| **Settings** | System configuration |

#### 📌 Key Features

- Real-time revenue stats from MongoDB via `/api/v1/payments/revenue-stats`
- Interactive bar charts (Recharts) for monthly revenue trends
- Live Stripe payment status tracking (Succeeded / Pending)
- Animated card UI with professional Lucide React icons

---

### 5. Manager Dashboard

> **React 18 · Vite · Comprehensive Reporting**

A dedicated panel for hotel managers with operational oversight, reporting, and staff coordination tools.

#### 📌 Features

- Comprehensive booking and revenue reports
- Document generation and PDF export
- Manager-specific operational views
- Real-time stats integrated with the backend

---

## 🛠 Tech Stack

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Primary database (20 models) |
| JWT | Authentication & authorisation |
| Stripe | Payment processing & webhooks |
| Multer | File/image uploads |
| Helmet + CORS | Security headers |
| Morgan | HTTP request logging |

### Frontend (Web, Admin, Manager)

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Recharts | Data visualisation charts |
| Lucide React | Icon library |
| Vanilla CSS | Styling (no framework) |

### Mobile

| Technology | Purpose |
|------------|---------|
| Flutter / Dart 3 | Cross-platform mobile framework |
| Riverpod | State management |
| GoRouter | Declarative navigation |
| Dio | HTTP networking |
| flutter_secure_storage | Secure JWT token storage |
| flutter_animate | Smooth UI animations |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- **Flutter SDK** 3.x + Dart 3.x
- **MongoDB** Atlas cluster
- **Stripe** account (for payments)

### 1. Clone the Repository

```bash
git clone https://github.com/Biniyam-Taye/Hotel-Mobile-App.git
cd Hotel-Mobile-App
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env    # Add your environment variables
npm run dev             # Starts on http://localhost:5000
```

### 3. Frontend Web Setup

```bash
cd frontend-web
npm install
npm run dev             # Starts on http://localhost:5173
```

### 4. Admin Dashboard Setup

```bash
cd admin-dashboard
npm install
npm run dev             # Starts on http://localhost:5175
```

### 5. Manager Dashboard Setup

```bash
cd Manager
npm install
npm run dev             # Starts on http://localhost:5174
```

### 6. Mobile App Setup

```bash
cd mobile-app
flutter pub get
flutter run             # Run on connected device or emulator
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/hotel-db

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# File Uploads
UPLOAD_DIR=uploads/
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

---

## 📡 API Health Check

```bash
curl http://localhost:5000/api/v1/health
# { "status": "ok", "message": "API is running smoothly" }
```

---

## 🌿 Git Workflow

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code |
| `staging` | Integration branch — merged to main via PR |
| `feature/*` | Individual feature development branches |

---

## 👥 Contributors

| Avatar | Name | Role |
|--------|------|------|
| [![Biniyam](https://github.com/Biniyam-Taye.png?size=50)](https://github.com/Biniyam-Taye) | **Biniyam Taye** | Project Lead · Backend · Admin Dashboard |
| [![Mekdelawit](https://github.com/mekdelawitketa.png?size=50)](https://github.com/mekdelawitketa) | **Mekdelawit Keta** | Frontend Web · UI/UX |

---

## 📄 License

This project is private and not licensed for public redistribution.

---

<p align="center">Built with ❤️ for a premium hotel experience</p>
