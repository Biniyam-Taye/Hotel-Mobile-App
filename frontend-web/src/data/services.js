// src/data/services.js
export const services = [
  // ===== DINING (4 items) =====
  {
    id: 1,
    provider: 'Bekele Mola Hotels',
    title: 'Afternoon Tea & Pastries',
    description: 'Elegant afternoon tea service with a selection of premium teas, fresh pastries, finger sandwiches, and scones.',
    
    price: 650,
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop',
    amenities: ['Premium Teas', 'Fresh Pastries', 'Finger Sandwiches', 'Garden Seating'],
    popular: true,
    dateAdded: '2026-08-15'
  },
  {
    id: 2,
    provider: 'Bekele Mola Hotels',
    title: 'Cultural City Tour',
    description: 'Guided half-day tour exploring local landmarks, markets, and hidden gems with an experienced local guide.',
    
    price: 2000,
    category: 'Tour',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop',
    amenities: ['Local Guide', 'Transport Included', 'Market Visit', 'Photo Stops'],
    popular: false,
    dateAdded: '2026-08-10'
  },
  {
    id: 3,
    provider: 'Villa Alpha Spa',
    title: 'Signature Spa Package',
    description: 'Full body massage with essential oils, followed by a rejuvenating facial and herbal tea ritual.',
    
    price: 1500,
    category: 'Spa',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop',
    amenities: ['Massage Therapy', 'Facial Treatment', 'Herbal Tea', 'Sauna Access'],
    popular: true,
    dateAdded: '2026-08-18'
  },
  {
    id: 4,
    provider: 'Villa Alpha Fitness',
    title: 'Personal Training Session',
    description: 'One-on-one session with a certified personal trainer tailored to your fitness goals.',
    
    price: 800,
    category: 'Fitness',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop',
    amenities: ['Certified Trainer', 'Customized Workout', 'Nutrition Advice', 'Progress Tracking'],
    popular: false,
    dateAdded: '2026-08-12'
  },
  {
    id: 5,
    provider: 'Villa Alpha Bar',
    title: 'Sunset Cocktail Experience',
    description: 'Enjoy handcrafted cocktails with panoramic sunset views from our rooftop bar.',

    price: 400,
    category: 'Bar',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&auto=format&fit=crop',
    amenities: ['Premium Cocktails', 'Sunset Views', 'Live Music', 'Tapas Selection'],
    popular: true,
    dateAdded: '2026-08-14'
  },
  {
    id: 6,
    provider: 'Villa Alpha Dining',
    title: 'Breakfast Buffet Experience',
    description: 'Start your day with our extensive breakfast buffet featuring local and international delicacies.',
    
    price: 350,
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&auto=format&fit=crop',
    amenities: ['International Cuisine', 'Local Dishes', 'Fresh Juices', 'Pastry Selection'],
    popular: false,
    dateAdded: '2026-08-08'
  },
  {
    id: 11,
    provider: 'Bekele Mola Hotels',
    title: 'Gourmet Dinner Experience',
    description: 'A 5‑course gourmet dinner with wine pairing, featuring seasonal ingredients and signature dishes.',
    
    price: 2500,
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop',
    amenities: ['Wine Pairing', 'Seasonal Menu', 'Chef’s Table', 'Private Dining'],
    popular: true,
    dateAdded: '2026-08-21'
  },
  {
    id: 12,
    provider: 'Villa Alpha Dining',
    title: 'Seafood Night Buffet',
    description: 'A lavish seafood buffet with fresh catch, grilled specialties, and unlimited seafood platters.',
    
    price: 1800,
    category: 'Dining',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&auto=format&fit=crop',
    amenities: ['Fresh Seafood', 'Grilled Specialties', 'Unlimited Platters', 'Dessert Selection'],
    popular: false,
    dateAdded: '2026-08-19'
  },

  // ===== WELLNESS =====
  {
    id: 7,
    provider: 'Villa Alpha Pool',
    title: 'Swimming Pool Access',
    description: 'Outdoor pool with sun loungers, poolside bar, and complimentary towels. Open 7:00 AM – 9:00 PM daily.',
    
    price: 400,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600&auto=format&fit=crop',
    amenities: ['Sun Loungers', 'Poolside Bar', 'Complimentary Towels', 'Heated Pool'],
    popular: true,
    dateAdded: '2026-08-20'
  },

  // ===== SERVICES =====
  {
    id: 8,
    provider: 'Villa Alpha Services',
    title: '24/7 Room Service',
    description: 'In‑dining with a wide selection of local and international dishes, available around the clock.',
    
    price: 456,
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop',
    amenities: ['24/7 Availability', 'Extensive Menu', 'In‑Room Dining', 'Special Diets'],
    popular: false,
    dateAdded: '2026-08-19'
  },
  {
    id: 9,
    provider: 'Villa Alpha Services',
    title: 'Laundry & Dry Cleaning',
    description: 'Professional laundry, dry cleaning, and pressing services with same‑day express delivery.',
    
    price: 480,
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1545173166-9f3a3a2f79a0?w=600&auto=format&fit=crop',
    amenities: ['Same‑Day Service', 'Stain Removal', 'Pressing', 'Eco‑Friendly'],
    popular: false,
    dateAdded: '2026-08-17'
  },
  {
    id: 10,
    provider: 'Villa Alpha Services',
    title: 'Airport Transport',
    description: 'Complimentary shuttle service to and from Adama International Airport, available 24 hours.',
    
    price: 456,
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1545459727-91a11aa93888?w=600&auto=format&fit=crop',
    amenities: ['24/7 Service', 'Complimentary', 'Meet & Greet', 'Luggage Assistance'],
    popular: true,
    dateAdded: '2026-08-16'
  },

  // ===== EVENTS & CONFERENCE (3 VENUES) =====
  // NOTE: Location is REMOVED, Status is ADDED
  {
    id: 13,
    provider: 'Villa Alpha Events',
    title: 'Grand Ballroom',
    description: 'A majestic ballroom with crystal chandeliers, perfect for weddings, galas, and large-scale events.',
    
    price: 1500,
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop',
    amenities: ['Space Code: GB-100', 'Up to 500 guests', '450 m²', 'Fl. 1', 'Banquet Hall'],
    popular: true,
    dateAdded: '2026-08-22',
    status: 'Available'   // <-- ADDED
  },
  {
    id: 14,
    provider: 'Villa Alpha Events',
    title: 'Summit Boardroom',
    description: 'A modern boardroom with panoramic city views, ideal for executive meetings and corporate presentations.',
    
    price: 300,
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=600&auto=format&fit=crop',
    amenities: ['Space Code: BR-301', 'Up to 25 guests', '65 m²', 'Fl. 3', 'Boardroom & Meeting Room'],
    popular: false,
    dateAdded: '2026-08-21',
    status: 'Occupied'   // <-- ADDED
  },
  {
    id: 15,
    provider: 'Villa Alpha Events',
    title: 'Grand Pavilion & Garden',
    description: 'A stunning outdoor pavilion surrounded by lush gardens, perfect for outdoor ceremonies, receptions, and garden parties.',

    price: 1000,
    category: 'Events',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop',
    amenities: ['Space Code: EH-202', 'Up to 300 guests', '320 m²', 'Fl. 1', 'Banquet Hall & Garden'],
    popular: true,
    dateAdded: '2026-08-20',
    status: 'Maintenance' // <-- ADDED
  }
];