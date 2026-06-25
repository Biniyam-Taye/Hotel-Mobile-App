import 'package:luxestay/src/data/models/models.dart';

/// Rich, realistic mock data for the hotel booking app.
/// Uses high-quality Unsplash images for hotel photography.
class MockData {
  MockData._();

  // ─── CURRENT USER ──────────────────────────────────────────────────
  static const UserProfile currentUser = UserProfile(
    id: 'u1',
    name: 'Biniyam',
    email: 'biniyam@email.com',
    phone: '+251 912 345 678',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    location: 'Addis Ababa, Ethiopia',
    loyaltyTier: LoyaltyTier.gold,
    rewardPoints: 12450,
    walletBalance: 2580.00,
    preferences: ['Beach', 'Spa', 'Fine Dining', 'Mountain Views'],
  );

  // ─── CITIES ────────────────────────────────────────────────────────
  static const List<City> cities = [
    City(id: 'c1', name: 'Dubai', country: 'UAE', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=400&fit=crop', hotelCount: 342),
    City(id: 'c2', name: 'Paris', country: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=400&fit=crop', hotelCount: 287),
    City(id: 'c3', name: 'Bali', country: 'Indonesia', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=400&fit=crop', hotelCount: 195),
    City(id: 'c4', name: 'London', country: 'UK', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=400&fit=crop', hotelCount: 412),
    City(id: 'c5', name: 'Tokyo', country: 'Japan', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=400&fit=crop', hotelCount: 523),
    City(id: 'c6', name: 'Maldives', country: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400&h=400&fit=crop', hotelCount: 89),
    City(id: 'c7', name: 'New York', country: 'USA', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=400&fit=crop', hotelCount: 678),
    City(id: 'c8', name: 'Santorini', country: 'Greece', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=400&fit=crop', hotelCount: 134),
  ];

  // ─── CATEGORIES ────────────────────────────────────────────────────
  static const List<String> categories = [
    'All',
    'Hotels',
    'Resorts',
    'Apartments',
    'Luxury Villas',
    'Cabins',
    'Eco Lodge',
    'Camping',
    'Business Hotels',
    'Beach Hotels',
    'Mountain Hotels',
    'Family Hotels',
    'Pet Friendly',
    'Spa Resorts',
  ];

  // ─── CATEGORY ICONS ────────────────────────────────────────────────
  static const Map<String, int> categoryIcons = {
    'All': 0xe3dc,        // grid_view
    'Hotels': 0xe588,      // hotel
    'Resorts': 0xea40,     // beach_access
    'Apartments': 0xe0e2,  // apartment
    'Luxury Villas': 0xe76a, // villa
    'Cabins': 0xea44,      // cabin
    'Eco Lodge': 0xea35,   // eco
    'Camping': 0xf09e,     // camping (approximate)
    'Business Hotels': 0xe0af, // business
    'Beach Hotels': 0xeb3e, // pool
    'Mountain Hotels': 0xe52f, // landscape
    'Family Hotels': 0xe853, // family_restroom
    'Pet Friendly': 0xf108,  // pets
    'Spa Resorts': 0xe532, // spa
  };

  // ─── HOTELS ────────────────────────────────────────────────────────
  static final List<Hotel> hotels = [
    Hotel(
      id: 'h1',
      name: 'The Ritz-Carlton',
      description: 'Experience unparalleled luxury at The Ritz-Carlton, where timeless elegance meets modern sophistication. Nestled in the heart of Dubai, this iconic five-star hotel offers breathtaking views of the Arabian Gulf, world-class dining, and an award-winning spa. Every detail is meticulously crafted to create an unforgettable stay.',
      location: 'JBR Walk, Dubai Marina',
      city: 'Dubai',
      country: 'UAE',
      latitude: 25.0783,
      longitude: 55.1345,
      distance: 2.3,
      rating: 4.9,
      reviewCount: 2847,
      pricePerNight: 450,
      originalPrice: 580,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
      ],
      amenities: ['Free WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Parking', 'Beach Access', 'Room Service', 'Concierge', 'Bar'],
      category: 'Hotels',
      discount: '22% OFF',
      isFavorite: true,
      cancellationPolicy: 'Free cancellation up to 48 hours before check-in. After that, the first night is non-refundable.',
      rules: ['No smoking', 'No pets allowed', 'Check-in after 3:00 PM', 'Check-out before 12:00 PM', 'Quiet hours from 10 PM to 7 AM'],
      languages: ['English', 'Arabic', 'French', 'Hindi'],
      contact: {'phone': '+971 4 399 4000', 'email': 'reservations@ritzcarlton.ae'},
      awards: ['Forbes Five-Star Award 2025', 'AAA Five Diamond Award', 'TripAdvisor Traveller\'s Choice'],
      rooms: [
        Room(
          id: 'r1',
          name: 'Deluxe Sea View Room',
          type: 'Deluxe',
          description: 'Spacious room with panoramic views of the Arabian Gulf, featuring premium bedding and a marble bathroom.',
          pricePerNight: 450,
          originalPrice: 580,
          capacity: 2,
          bedType: 'King',
          bedCount: 1,
          roomSize: 45,
          view: 'Sea View',
          images: [
            'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop',
          ],
          amenities: ['Mini Bar', 'Safe', 'Balcony', 'Smart TV', 'Nespresso Machine', 'Rain Shower'],
          breakfastIncluded: true,
        ),
        Room(
          id: 'r2',
          name: 'Premium Suite',
          type: 'Suite',
          description: 'Luxurious suite with separate living area, walk-in closet, and a private terrace overlooking the marina.',
          pricePerNight: 850,
          originalPrice: 1100,
          capacity: 3,
          bedType: 'King',
          bedCount: 1,
          roomSize: 78,
          view: 'Marina View',
          images: [
            'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=800&h=600&fit=crop',
          ],
          amenities: ['Mini Bar', 'Safe', 'Private Terrace', 'Smart TV', 'Jacuzzi', 'Butler Service', 'Living Room'],
          breakfastIncluded: true,
        ),
        Room(
          id: 'r3',
          name: 'Royal Penthouse',
          type: 'Penthouse',
          description: 'The ultimate in luxury living. This penthouse features a private pool, personal chef service, and 360° panoramic views.',
          pricePerNight: 2200,
          capacity: 4,
          bedType: 'King',
          bedCount: 2,
          roomSize: 180,
          view: 'Panoramic',
          images: [
            'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
            'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
          ],
          amenities: ['Private Pool', 'Personal Chef', 'Private Elevator', 'Home Theater', 'Wine Cellar', 'Sauna'],
          breakfastIncluded: true,
        ),
      ],
      reviews: _generateReviews('h1'),
      nearbyPlaces: const [
        NearbyPlace(name: 'Dubai Marina Mall', type: 'Shopping', distance: 0.5),
        NearbyPlace(name: 'The Walk at JBR', type: 'Attraction', distance: 0.2),
        NearbyPlace(name: 'Ain Dubai', type: 'Attraction', distance: 1.2),
        NearbyPlace(name: 'Palm Jumeirah', type: 'Attraction', distance: 3.5),
        NearbyPlace(name: 'Dubai International Airport', type: 'Airport', distance: 35.0),
      ],
    ),
    Hotel(
      id: 'h2',
      name: 'Aman Tokyo',
      description: 'A serene urban sanctuary, Aman Tokyo marries traditional Japanese minimalism with the energy of one of the world\'s most dynamic cities. Floor-to-ceiling windows frame stunning city views while natural materials create a sense of calm retreat.',
      location: 'Otemachi, Chiyoda',
      city: 'Tokyo',
      country: 'Japan',
      latitude: 35.6892,
      longitude: 139.7634,
      distance: 5.1,
      rating: 4.8,
      reviewCount: 1923,
      pricePerNight: 680,
      originalPrice: 850,
      images: [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      ],
      amenities: ['Free WiFi', 'Spa', 'Gym', 'Restaurant', 'Pool', 'Concierge', 'Library', 'Yoga Studio'],
      category: 'Hotels',
      discount: '20% OFF',
      cancellationPolicy: 'Free cancellation up to 72 hours before check-in.',
      rules: ['No smoking', 'Check-in after 3:00 PM', 'Check-out before 12:00 PM'],
      languages: ['Japanese', 'English', 'French'],
      rooms: [
        Room(
          id: 'r4',
          name: 'Deluxe Room',
          type: 'Deluxe',
          description: 'Minimalist elegance with tatami elements, deep soaking tub, and city views.',
          pricePerNight: 680,
          originalPrice: 850,
          capacity: 2,
          bedType: 'King',
          roomSize: 56,
          view: 'City View',
          images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop'],
          amenities: ['Soaking Tub', 'Tea Set', 'Yukata', 'Smart TV'],
          breakfastIncluded: true,
        ),
      ],
      reviews: _generateReviews('h2'),
    ),
    Hotel(
      id: 'h3',
      name: 'Four Seasons Bali',
      description: 'Set amidst Bali\'s most sacred river valley, this resort features private villas with plunge pools, surrounded by ancient temples and rice terraces. An oasis of tranquility where Balinese hospitality meets world-class luxury.',
      location: 'Sayan, Ubud',
      city: 'Bali',
      country: 'Indonesia',
      latitude: -8.5069,
      longitude: 115.4435,
      distance: 8.2,
      rating: 4.9,
      reviewCount: 3154,
      pricePerNight: 520,
      images: [
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&h=600&fit=crop',
      ],
      amenities: ['Free WiFi', 'Private Pool', 'Spa', 'Yoga', 'Restaurant', 'Cooking Class', 'Cycling', 'Rice Terrace Walk'],
      category: 'Resorts',
      isFavorite: true,
      rooms: [
        Room(
          id: 'r5',
          name: 'Valley Villa',
          type: 'Villa',
          description: 'Private villa with plunge pool, outdoor shower, and views over the Ayung River valley.',
          pricePerNight: 520,
          capacity: 2,
          bedType: 'King',
          roomSize: 90,
          view: 'Valley View',
          images: ['https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop'],
          amenities: ['Private Pool', 'Outdoor Shower', 'Day Bed', 'Garden'],
          breakfastIncluded: true,
        ),
      ],
      reviews: _generateReviews('h3'),
    ),
    Hotel(
      id: 'h4',
      name: 'Le Bristol Paris',
      description: 'An 18th-century jewel on the Faubourg Saint-Honoré, Le Bristol Paris embodies the art of French luxury. With Michelin-starred dining, a rooftop pool overlooking the Paris skyline, and impeccable service that has defined hospitality for over a century.',
      location: 'Faubourg Saint-Honoré',
      city: 'Paris',
      country: 'France',
      distance: 3.4,
      rating: 4.7,
      reviewCount: 2103,
      pricePerNight: 890,
      originalPrice: 1050,
      images: [
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop',
      ],
      amenities: ['Free WiFi', 'Rooftop Pool', 'Spa', 'Michelin Restaurant', 'Bar', 'Concierge', 'Valet Parking'],
      category: 'Hotels',
      discount: '15% OFF',
      rooms: [
        Room(
          id: 'r6',
          name: 'Superior Room',
          type: 'Superior',
          description: 'Classic Parisian elegance with Louis XV furniture and marble bath.',
          pricePerNight: 890,
          originalPrice: 1050,
          capacity: 2,
          bedType: 'King',
          roomSize: 40,
          view: 'Garden View',
          images: ['https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop'],
          amenities: ['Marble Bath', 'Nespresso', 'Safe', 'Smart TV'],
          breakfastIncluded: false,
        ),
      ],
      reviews: _generateReviews('h4'),
    ),
    Hotel(
      id: 'h5',
      name: 'Soneva Fushi',
      description: 'A barefoot luxury resort in the Maldives, Soneva Fushi is a castaway paradise where shoes are optional and stars are your ceiling. Private overwater villas, a glass-floored observatory, and six gourmet restaurants make this an unforgettable escape.',
      location: 'Baa Atoll',
      city: 'Maldives',
      country: 'Maldives',
      distance: 12.0,
      rating: 4.9,
      reviewCount: 1876,
      pricePerNight: 1200,
      originalPrice: 1500,
      images: [
        'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&h=600&fit=crop',
      ],
      amenities: ['Free WiFi', 'Private Beach', 'Overwater Villa', 'Spa', 'Diving', 'Snorkeling', 'Cinema', 'Observatory'],
      category: 'Luxury Villas',
      discount: '20% OFF',
      isFavorite: true,
      rooms: [
        Room(
          id: 'r7',
          name: 'Overwater Villa',
          type: 'Villa',
          description: 'Stunning overwater villa with glass floor panels, private infinity pool, and direct ocean access.',
          pricePerNight: 1200,
          originalPrice: 1500,
          capacity: 2,
          bedType: 'King',
          roomSize: 120,
          view: 'Ocean View',
          images: ['https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=800&h=600&fit=crop'],
          amenities: ['Private Pool', 'Glass Floor', 'Outdoor Bathtub', 'Water Slide'],
          breakfastIncluded: true,
        ),
      ],
      reviews: _generateReviews('h5'),
    ),
    Hotel(
      id: 'h6',
      name: 'Claridge\'s London',
      description: 'The epitome of British grandeur, Claridge\'s has been the London home of the world\'s elite for over 150 years. Art Deco magnificence meets cutting-edge contemporary design in Mayfair\'s most prestigious address.',
      location: 'Mayfair, Brook Street',
      city: 'London',
      country: 'UK',
      distance: 1.8,
      rating: 4.8,
      reviewCount: 3421,
      pricePerNight: 750,
      images: [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
      ],
      amenities: ['Free WiFi', 'Spa', 'Restaurant', 'Bar', 'Afternoon Tea', 'Concierge', 'Gym'],
      category: 'Hotels',
      rooms: [
        Room(
          id: 'r8',
          name: 'Art Deco Room',
          type: 'Superior',
          description: 'Elegant room featuring original Art Deco details with modern amenities.',
          pricePerNight: 750,
          capacity: 2,
          bedType: 'King',
          roomSize: 38,
          view: 'Street View',
          images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=600&fit=crop'],
          amenities: ['Marble Bath', 'Mini Bar', 'Smart TV'],
          breakfastIncluded: false,
        ),
      ],
      reviews: _generateReviews('h6'),
    ),
    Hotel(
      id: 'h7',
      name: 'Andronis Luxury Suites',
      description: 'Perched on the edge of the Santorini caldera, Andronis offers cave suites with private plunge pools and the most spectacular sunset views in the Mediterranean. White-washed luxury meets Cycladic authenticity.',
      location: 'Oia, Caldera',
      city: 'Santorini',
      country: 'Greece',
      distance: 0.5,
      rating: 4.9,
      reviewCount: 1543,
      pricePerNight: 650,
      originalPrice: 800,
      images: [
        'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1602343168051-00fa1a70c6a8?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop',
      ],
      amenities: ['Free WiFi', 'Private Pool', 'Spa', 'Restaurant', 'Sunset Terrace', 'Wine Tasting'],
      category: 'Luxury Villas',
      discount: '19% OFF',
      rooms: [
        Room(
          id: 'r9',
          name: 'Cave Suite',
          type: 'Suite',
          description: 'Traditional cave suite carved into the caldera with private plunge pool.',
          pricePerNight: 650,
          originalPrice: 800,
          capacity: 2,
          bedType: 'King',
          roomSize: 55,
          view: 'Caldera & Sunset View',
          images: ['https://images.unsplash.com/photo-1602343168051-00fa1a70c6a8?w=800&h=600&fit=crop'],
          amenities: ['Private Pool', 'Terrace', 'Jacuzzi'],
          breakfastIncluded: true,
        ),
      ],
      reviews: _generateReviews('h7'),
    ),
    Hotel(
      id: 'h8',
      name: 'The Plaza Hotel',
      description: 'An iconic landmark on Fifth Avenue overlooking Central Park. The Plaza combines Beaux-Arts architecture with the finest modern luxury. From Champagne at the Palm Court to cocktails at the Rose Club — this is New York at its most glamorous.',
      location: 'Fifth Avenue at Central Park',
      city: 'New York',
      country: 'USA',
      distance: 0.3,
      rating: 4.7,
      reviewCount: 4521,
      pricePerNight: 950,
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop',
      ],
      amenities: ['Free WiFi', 'Spa', 'Gym', 'Restaurant', 'Bar', 'Concierge', 'Ballroom', 'Butler Service'],
      category: 'Hotels',
      rooms: [
        Room(
          id: 'r10',
          name: 'Park View Room',
          type: 'Superior',
          description: 'Luxurious room overlooking Central Park with classic décor.',
          pricePerNight: 950,
          capacity: 2,
          bedType: 'King',
          roomSize: 42,
          view: 'Central Park View',
          images: ['https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop'],
          amenities: ['Park View', 'Marble Bath', 'Butler Service'],
          breakfastIncluded: false,
        ),
      ],
      reviews: _generateReviews('h8'),
    ),
  ];

  // ─── OFFERS ────────────────────────────────────────────────────────
  static final List<Offer> offers = [
    Offer(
      id: 'o1',
      title: 'Summer Escape',
      subtitle: 'Up to 40% off luxury stays',
      description: 'Book your summer getaway and save up to 40% on selected 5-star hotels worldwide.',
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=400&fit=crop',
      couponCode: 'SUMMER40',
      discountPercent: 40,
      validUntil: DateTime(2026, 9, 30),
    ),
    Offer(
      id: 'o2',
      title: 'First Booking Bonus',
      subtitle: '\$50 off your first reservation',
      description: 'New to LuxeStay? Get \$50 off your first booking at any participating hotel.',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=400&fit=crop',
      couponCode: 'WELCOME50',
      discountPercent: 15,
      validUntil: DateTime(2026, 12, 31),
    ),
    Offer(
      id: 'o3',
      title: 'Weekend Retreat',
      subtitle: '3 nights for the price of 2',
      description: 'Stay 3 nights and only pay for 2. Valid on weekend bookings at selected resorts.',
      image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&h=400&fit=crop',
      couponCode: 'WEEKEND3X2',
      discountPercent: 33,
      validUntil: DateTime(2026, 8, 31),
    ),
  ];

  // ─── BOOKINGS ──────────────────────────────────────────────────────
  static final List<Booking> bookings = [
    Booking(
      id: 'BK-2026-001',
      hotel: hotels[0],
      room: hotels[0].rooms[0],
      checkIn: DateTime(2026, 7, 15),
      checkOut: DateTime(2026, 7, 20),
      guests: 2,
      totalPrice: 2250,
      status: BookingStatus.upcoming,
      paymentMethod: PaymentMethod.visa,
      createdAt: DateTime(2026, 6, 10),
    ),
    Booking(
      id: 'BK-2026-002',
      hotel: hotels[2],
      room: hotels[2].rooms[0],
      checkIn: DateTime(2026, 5, 1),
      checkOut: DateTime(2026, 5, 5),
      guests: 2,
      totalPrice: 2080,
      status: BookingStatus.completed,
      paymentMethod: PaymentMethod.googlePay,
      createdAt: DateTime(2026, 4, 15),
    ),
    Booking(
      id: 'BK-2026-003',
      hotel: hotels[4],
      room: hotels[4].rooms[0],
      checkIn: DateTime(2026, 8, 10),
      checkOut: DateTime(2026, 8, 17),
      guests: 2,
      totalPrice: 8400,
      status: BookingStatus.upcoming,
      paymentMethod: PaymentMethod.applePay,
      createdAt: DateTime(2026, 6, 20),
      specialRequests: 'Anniversary celebration, please arrange flowers and champagne.',
    ),
  ];

  // ─── NOTIFICATIONS ─────────────────────────────────────────────────
  static final List<NotificationItem> notifications = [
    NotificationItem(
      id: 'n1',
      title: 'Booking Confirmed!',
      message: 'Your stay at The Ritz-Carlton Dubai has been confirmed for Jul 15-20.',
      type: 'booking',
      timestamp: DateTime.now().subtract(const Duration(hours: 2)),
    ),
    NotificationItem(
      id: 'n2',
      title: 'Flash Sale! 🔥',
      message: 'Exclusive 40% off luxury resorts this weekend only. Don\'t miss out!',
      type: 'offer',
      timestamp: DateTime.now().subtract(const Duration(hours: 5)),
    ),
    NotificationItem(
      id: 'n3',
      title: 'Rate Your Stay',
      message: 'How was your experience at Four Seasons Bali? Leave a review.',
      type: 'review',
      timestamp: DateTime.now().subtract(const Duration(days: 1)),
      isRead: true,
    ),
    NotificationItem(
      id: 'n4',
      title: 'Points Earned! 🎉',
      message: 'You earned 520 reward points from your recent stay. Gold status unlocked!',
      type: 'loyalty',
      timestamp: DateTime.now().subtract(const Duration(days: 2)),
      isRead: true,
    ),
    NotificationItem(
      id: 'n5',
      title: 'New Message',
      message: 'The Ritz-Carlton concierge has sent you a message about your upcoming stay.',
      type: 'message',
      timestamp: DateTime.now().subtract(const Duration(days: 3)),
    ),
  ];

  // ─── WALLET TRANSACTIONS ───────────────────────────────────────────
  static final List<WalletTransaction> transactions = [
    WalletTransaction(
      id: 't1',
      title: 'Cashback Reward',
      description: 'Booking at Four Seasons Bali',
      amount: 104.00,
      isCredit: true,
      date: DateTime.now().subtract(const Duration(days: 30)),
      type: 'cashback',
    ),
    WalletTransaction(
      id: 't2',
      title: 'Referral Bonus',
      description: 'Friend joined via your link',
      amount: 25.00,
      isCredit: true,
      date: DateTime.now().subtract(const Duration(days: 15)),
      type: 'referral',
    ),
    WalletTransaction(
      id: 't3',
      title: 'Room Upgrade',
      description: 'Upgrade at Aman Tokyo',
      amount: 150.00,
      isCredit: false,
      date: DateTime.now().subtract(const Duration(days: 10)),
      type: 'purchase',
    ),
  ];

  // ─── REVIEW GENERATOR ──────────────────────────────────────────────
  static List<Review> _generateReviews(String hotelId) {
    return [
      Review(
        id: '${hotelId}_rev1',
        userName: 'Sarah Mitchell',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 5.0,
        comment: 'Absolutely stunning hotel! The service was impeccable and the views were breathtaking. Every detail was perfect, from the room amenities to the spa experience. Will definitely be coming back.',
        date: DateTime.now().subtract(const Duration(days: 5)),
        isVerified: true,
        helpfulCount: 24,
      ),
      Review(
        id: '${hotelId}_rev2',
        userName: 'James Chen',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        rating: 4.5,
        comment: 'Wonderful experience overall. The spa was world-class and the restaurant exceeded expectations. The room was spacious and beautifully appointed. Slight delay at check-in but staff handled it gracefully.',
        date: DateTime.now().subtract(const Duration(days: 12)),
        isVerified: true,
        helpfulCount: 18,
      ),
      Review(
        id: '${hotelId}_rev3',
        userName: 'Emma Laurent',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 5.0,
        comment: 'Pure luxury from start to finish. The concierge arranged the most incredible excursion and the rooftop dining was magical. This place understands what five-star means.',
        date: DateTime.now().subtract(const Duration(days: 20)),
        isVerified: true,
        helpfulCount: 31,
        photos: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop',
        ],
      ),
    ];
  }

  // ─── AI CONCIERGE MESSAGES ─────────────────────────────────────────
  static final List<ChatMessage> aiMessages = [
    ChatMessage(
      id: 'ai1',
      content: 'Welcome to LuxeStay AI Concierge! 👋 I\'m here to help you find the perfect stay, plan your trip, or answer any questions. What can I help you with today?',
      isUser: false,
      timestamp: DateTime.now().subtract(const Duration(minutes: 5)),
    ),
  ];

  // ─── AMENITY ICONS MAP ─────────────────────────────────────────────
  static const Map<String, int> amenityIcons = {
    'Free WiFi': 0xe63e,       // wifi
    'Pool': 0xeb3e,            // pool
    'Spa': 0xe532,             // spa
    'Gym': 0xeb43,             // fitness_center
    'Restaurant': 0xe56c,     // restaurant
    'Parking': 0xe54f,         // local_parking
    'Beach Access': 0xea40,    // beach_access
    'Room Service': 0xeb49,    // room_service
    'Concierge': 0xee17,       // support_agent
    'Bar': 0xea60,             // local_bar
    'Mini Bar': 0xea60,
    'Safe': 0xe897,            // lock
    'Balcony': 0xe84f,         // balcony
    'Smart TV': 0xe333,        // tv
    'Private Pool': 0xeb3e,
    'Outdoor Shower': 0xf06d,  // shower
    'Day Bed': 0xe53a,         // bed
    'Garden': 0xea35,          // eco
    'Terrace': 0xe84f,
    'Jacuzzi': 0xea40,
    'Butler Service': 0xee17,
    'Living Room': 0xea44,
    'Nespresso Machine': 0xefef, // coffee
    'Rain Shower': 0xf06d,
    'Nespresso': 0xefef,
    'Marble Bath': 0xea40,
    'Wine Cellar': 0xea60,
    'Private Elevator': 0xf1a0,
    'Home Theater': 0xe02c,    // theaters
    'Sauna': 0xe532,
    'Personal Chef': 0xe56c,
    'Private Beach': 0xea40,
    'Overwater Villa': 0xe76a,
    'Diving': 0xf069,
    'Snorkeling': 0xf069,
    'Cinema': 0xe02c,
    'Observatory': 0xea39,
    'Rooftop Pool': 0xeb3e,
    'Michelin Restaurant': 0xe56c,
    'Valet Parking': 0xe54f,
    'Afternoon Tea': 0xefef,
    'Ballroom': 0xea08,
    'Sunset Terrace': 0xea3c,
    'Wine Tasting': 0xea60,
    'Yoga': 0xe532,
    'Library': 0xe02f,
    'Yoga Studio': 0xe532,
    'Cooking Class': 0xe56c,
    'Cycling': 0xeb29,
    'Rice Terrace Walk': 0xe536,
    'Soaking Tub': 0xea40,
    'Tea Set': 0xefef,
    'Yukata': 0xea3a,
    'Glass Floor': 0xea39,
    'Outdoor Bathtub': 0xea40,
    'Water Slide': 0xeb3e,
    'Park View': 0xea3c,
    'Conference Hall': 0xe7f5,
    'Breakfast Included': 0xea60,
    'Free Cancellation': 0xe5cd,
  };

  // ─── SEARCH SUGGESTIONS ───────────────────────────────────────────
  static const List<String> searchSuggestions = [
    'Beachfront resorts in Maldives',
    'Luxury hotels in Dubai',
    'Boutique hotels Paris',
    'Family friendly Bali',
    'Overwater villas',
    'Mountain lodge Switzerland',
    'City center Tokyo',
    'Romantic getaway Santorini',
  ];

  static const List<String> recentSearches = [
    'Ritz-Carlton Dubai',
    'Beach resorts Maldives',
    'Tokyo luxury hotels',
  ];

  static const List<String> trendingDestinations = [
    'Maldives',
    'Santorini',
    'Bali',
    'Dubai',
    'Paris',
    'Tokyo',
  ];
}
