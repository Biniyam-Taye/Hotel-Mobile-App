export const mockMenuItems = [
  {
    id: 'm1',
    name: 'Grilled Salmon',
    category: 'Dinner',
    price: 35,
    description: 'Fresh Atlantic salmon with asparagus and hollandaise sauce.',
    image: 'https://images.unsplash.com/photo-1481070555726-e2fe83477d4a?auto=format&fit=crop&w=800&q=80',
    status: 'Available',
  },
  {
    id: 'm2',
    name: 'Avocado Toast',
    category: 'Breakfast',
    price: 18,
    description: 'Sourdough toast with smashed avocado, poached eggs, and chili flakes.',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    status: 'Available',
  },
  {
    id: 'm3',
    name: 'Signature Cocktail',
    category: 'Drinks',
    price: 15,
    description: 'Our house special mix of premium gin, elderflower, and fresh berries.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    status: 'Available',
  }
];

export const mockServices = [
  {
    id: 's1',
    title: 'Airport Transfer',
    description: 'Private chauffeur service to and from the airport. Available 24/7.',
    price: 'From $50',
    status: 'Active',
    icon: 'Car',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's2',
    title: 'Room Service',
    description: 'In-room dining available 24 hours a day with our full restaurant menu.',
    price: 'Menu Pricing + 10%',
    status: 'Active',
    icon: 'ConciergeBell',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 's3',
    title: 'Laundry & Dry Cleaning',
    description: 'Same-day laundry and dry cleaning services for all guests.',
    price: 'Per Item Pricing',
    status: 'Active',
    icon: 'Shirt',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80'
  }
];

export const mockFacilities = [
  {
    id: 'f1',
    title: 'Infinity Pool',
    description: 'Our rooftop infinity pool offers stunning views of the city skyline.',
    hours: '06:00 AM - 10:00 PM',
    status: 'Active',
    icon: 'Waves',
    image: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'f2',
    title: 'Luxury Spa',
    description: 'Rejuvenate your body and mind with our award-winning spa treatments.',
    hours: '09:00 AM - 08:00 PM',
    status: 'Active',
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'f3',
    title: 'Fitness Center',
    description: 'Fully equipped modern gym with personal trainers available.',
    hours: '24 Hours',
    status: 'Active',
    icon: 'Dumbbell',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  }
];

export const mockEventCategories = [
  { id: 'ec1', name: 'Conference Hall', description: 'Large space equipped for professional conferences, summits, and large presentations.' },
  { id: 'ec2', name: 'Banquet Hall', description: 'Grand venue ideal for weddings, galas, dinners, and social celebrations.' },
  { id: 'ec3', name: 'Boardroom & Meeting Room', description: 'Cozy, high-tech rooms perfect for corporate meetings, discussions, and seminars.' },
  { id: 'ec4', name: 'Exhibition Center', description: 'Open, wide space suitable for trade shows, art exhibitions, and fairs.' }
];

export const eventAmenitiesList = [
  { id: 'ea1', name: 'Projector & Screen', icon: 'Tv' },
  { id: 'ea2', name: 'PA Sound System', icon: 'Volume2' },
  { id: 'ea3', name: 'Catering Service', icon: 'Utensils' },
  { id: 'ea4', name: 'Video Conferencing', icon: 'Video' },
  { id: 'ea5', name: 'High-speed Wi-Fi', icon: 'Wifi' },
  { id: 'ea6', name: 'Stage & Podium', icon: 'Mic' },
  { id: 'ea7', name: 'Climate Control', icon: 'Wind' },
  { id: 'ea8', name: 'Cocktail Bar Set', icon: 'GlassWater' }
];

export const mockEventSpaces = [
  {
    id: 'es1',
    spaceNumber: 'GB-100',
    name: 'Grand Ballroom',
    categoryId: 'ec2',
    price: 1500,
    discountedPrice: null,
    maxGuests: 500,
    floor: 1,
    status: 'Available',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Published',
    spaceSize: 450,
    description: 'Our premier luxury venue with high ceilings, grand chandeliers, and built-in professional AV stage. Perfect for large weddings and corporate galas.',
    amenities: ['ea2', 'ea3', 'ea5', 'ea6', 'ea7', 'ea8'],
    specialRates: [
      { id: 'sr1', date: '2026-12-31', price: 2500, label: "New Year's Eve Gala Surcharge" },
      { id: 'sr2', date: '2026-09-19', price: 1800, label: "Peak Wedding Season Saturday" }
    ]
  },
  {
    id: 'es2',
    spaceNumber: 'BR-301',
    name: 'Summit Boardroom',
    categoryId: 'ec3',
    price: 350,
    discountedPrice: 300,
    maxGuests: 25,
    floor: 3,
    status: 'Available',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Published',
    spaceSize: 65,
    description: 'Fully-equipped corporate boardroom featuring advanced video conferencing capabilities, whiteboard, and comfortable leather seating.',
    amenities: ['ea1', 'ea4', 'ea5', 'ea7'],
    specialRates: []
  },
  {
    id: 'es3',
    spaceNumber: 'EH-202',
    name: 'Grand Pavilion & Garden',
    categoryId: 'ec2',
    price: 1000,
    discountedPrice: null,
    maxGuests: 300,
    floor: 1,
    status: 'Occupied',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Published',
    spaceSize: 320,
    description: 'Beautiful indoor-outdoor pavilion flowing into private landscaped gardens. Perfect for cocktail receptions and spring celebrations.',
    amenities: ['ea2', 'ea3', 'ea5', 'ea8'],
    specialRates: [
      { id: 'sr3', date: '2026-02-14', price: 1500, label: "Valentine's Day Premium" }
    ]
  }
];

