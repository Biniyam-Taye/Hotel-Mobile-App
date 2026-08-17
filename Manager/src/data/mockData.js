// Mock Data for Hotel Management

export const amenitiesList = [
  { id: 'a1', name: 'Free Wi-Fi', icon: 'Wifi' },
  { id: 'a2', name: 'Air Conditioning', icon: 'Wind' },
  { id: 'a3', name: 'Flat-screen TV', icon: 'Tv' },
  { id: 'a4', name: 'Mini Bar', icon: 'Coffee' },
  { id: 'a5', name: 'Room Service', icon: 'ConciergeBell' },
  { id: 'a6', name: 'Balcony', icon: 'Sun' },
  { id: 'a7', name: 'Ocean View', icon: 'Waves' },
  { id: 'a8', name: 'Bathtub', icon: 'Bath' },
  { id: 'a9', name: 'Coffee Maker', icon: 'Coffee' },
  { id: 'a10', name: 'Safe', icon: 'Shield' },
  { id: 'a11', name: 'Hair Dryer', icon: 'Wind' },
  { id: 'a12', name: 'Ironing Facilities', icon: 'PenTool' },
];

export const mockCategories = [
  {
    id: 'c1',
    name: 'Standard Room',
    description: 'Comfortable and cozy room perfect for solo travelers or couples.',
    basePrice: 120,
    maxGuests: 2,
    bedConfiguration: '1 Queen Bed',
    roomSize: '25 sqm',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
    amenities: ['a1', 'a2', 'a3', 'a11'],
    status: 'Active',
    roomsCount: 45
  },
  {
    id: 'c2',
    name: 'Deluxe Ocean View',
    description: 'Spacious room with stunning views of the ocean and premium amenities.',
    basePrice: 250,
    maxGuests: 3,
    bedConfiguration: '1 King Bed or 2 Twin Beds',
    roomSize: '35 sqm',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    amenities: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a9', 'a10', 'a11'],
    status: 'Active',
    roomsCount: 20
  },
  {
    id: 'c3',
    name: 'Executive Suite',
    description: 'Luxurious suite featuring a separate living area, perfect for business or leisure.',
    basePrice: 450,
    maxGuests: 4,
    bedConfiguration: '1 King Bed, 1 Sofa Bed',
    roomSize: '55 sqm',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    amenities: ['a1', 'a2', 'a3', 'a4', 'a5', 'a8', 'a9', 'a10', 'a11', 'a12'],
    status: 'Active',
    roomsCount: 10
  },
  {
    id: 'c4',
    name: 'Family Connecting Room',
    description: 'Two interconnected rooms providing space and privacy for the whole family.',
    basePrice: 380,
    maxGuests: 5,
    bedConfiguration: '1 King Bed, 2 Twin Beds',
    roomSize: '60 sqm',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    amenities: ['a1', 'a2', 'a3', 'a4', 'a5', 'a8', 'a11'],
    status: 'Active',
    roomsCount: 5
  },
  {
    id: 'c5',
    name: 'Presidential Suite',
    description: 'The ultimate luxury experience with panoramic views, private dining, and butler service.',
    basePrice: 1200,
    maxGuests: 4,
    bedConfiguration: '1 King Bed',
    roomSize: '120 sqm',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    amenities: ['a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'a7', 'a8', 'a9', 'a10', 'a11', 'a12'],
    status: 'Draft',
    roomsCount: 1
  }
];

export const mockRooms = [
  {
    id: 'r1',
    roomNumber: '101',
    name: 'Standard 101',
    categoryId: 'c1',
    price: 120,
    discountedPrice: null,
    maxGuests: 2,
    floor: 1,
    status: 'Available',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Published'
  },
  {
    id: 'r2',
    roomNumber: '102',
    name: 'Standard 102',
    categoryId: 'c1',
    price: 120,
    discountedPrice: 105,
    maxGuests: 2,
    floor: 1,
    status: 'Occupied',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Published'
  },
  {
    id: 'r3',
    roomNumber: '201',
    name: 'Ocean View 201',
    categoryId: 'c2',
    price: 250,
    discountedPrice: null,
    maxGuests: 3,
    floor: 2,
    status: 'Available',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Published'
  },
  {
    id: 'r4',
    roomNumber: '305',
    name: 'Executive Suite 305',
    categoryId: 'c3',
    price: 450,
    discountedPrice: 400,
    maxGuests: 4,
    floor: 3,
    status: 'Maintenance',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Published'
  },
  {
    id: 'r5',
    roomNumber: '401',
    name: 'Family Connected 401',
    categoryId: 'c4',
    price: 380,
    discountedPrice: null,
    maxGuests: 5,
    floor: 4,
    status: 'Available',
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Published'
  },
  {
    id: 'r6',
    roomNumber: '501',
    name: 'Penthouse Presidential',
    categoryId: 'c5',
    price: 1200,
    discountedPrice: null,
    maxGuests: 4,
    floor: 5,
    status: 'Available',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    publishStatus: 'Draft'
  }
];
