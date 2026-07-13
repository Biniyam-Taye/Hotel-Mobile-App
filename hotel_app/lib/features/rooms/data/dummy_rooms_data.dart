class DummyRoomsData {
  static final List<Map<String, dynamic>> rooms = [
    {
      'id': 'room_1',
      'title': 'Ocean View Suite',
      'location': 'Maldives, Indian Ocean',
      'description':
          'Experience the ultimate luxury in our Ocean View Suite. Wake up to the sound of gentle waves and enjoy panoramic views of the crystal-clear Indian Ocean from your private balcony. Perfect for romantic getaways.',
      'rating': 4.9,
      'reviews': 128,
      'price': 450.0,
      'maxOccupancy': 2,
      'category': 'Suites',
      'imageUrls': [
        'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200',
      ],
      'amenities': [
        {'icon': 'wifi', 'label': 'Free Wi-Fi'},
        {'icon': 'pool', 'label': 'Private Pool'},
        {'icon': 'ac_unit', 'label': 'Air Conditioning'},
        {'icon': 'room_service', 'label': '24/7 Room Service'},
        {'icon': 'tv', 'label': 'Smart TV'},
        {'icon': 'spa', 'label': 'Spa Access'},
      ],
      'isFavorite': true,
    },
    {
      'id': 'room_2',
      'title': 'Mountain Retreat Villa',
      'location': 'Swiss Alps, Switzerland',
      'description':
          'Nestled high in the Swiss Alps, this cozy yet expansive villa offers breathtaking views of snow-capped peaks. Enjoy a warm fireplace, a private sauna, and immediate access to world-class ski slopes.',
      'rating': 4.8,
      'reviews': 84,
      'price': 320.0,
      'maxOccupancy': 4,
      'category': 'Villas',
      'imageUrls': [
        'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=1200',
      ],
      'amenities': [
        {'icon': 'wifi', 'label': 'Free Wi-Fi'},
        {'icon': 'fireplace', 'label': 'Fireplace'},
        {'icon': 'hot_tub', 'label': 'Sauna'},
        {'icon': 'kitchen', 'label': 'Full Kitchen'},
        {'icon': 'local_parking', 'label': 'Free Parking'},
      ],
      'isFavorite': false,
    },
    {
      'id': 'room_3',
      'title': 'City Center Penthouse',
      'location': 'New York, USA',
      'description':
          'Stay in the heart of the city that never sleeps. This modern penthouse offers floor-to-ceiling windows with stunning skyline views, a private terrace, and a state-of-the-art entertainment system.',
      'rating': 4.7,
      'reviews': 256,
      'price': 550.0,
      'maxOccupancy': 2,
      'category': 'Penthouses',
      'imageUrls': [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1502672260266-1c1c24240f38?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      ],
      'amenities': [
        {'icon': 'wifi', 'label': 'High-Speed Wi-Fi'},
        {'icon': 'fitness_center', 'label': 'Gym Access'},
        {'icon': 'balcony', 'label': 'Private Terrace'},
        {'icon': 'business_center', 'label': 'Workspace'},
        {'icon': 'wine_bar', 'label': 'Mini Bar'},
      ],
      'isFavorite': false,
    },
    {
      'id': 'room_4',
      'title': 'Tropical Garden Bungalow',
      'location': 'Bali, Indonesia',
      'description':
          'Surround yourself with lush tropical gardens in this traditional yet luxurious Balinese bungalow. Features an outdoor rain shower, a hammock, and easy access to a pristine white-sand beach.',
      'rating': 4.6,
      'reviews': 192,
      'price': 180.0,
      'maxOccupancy': 3,
      'category': 'Bungalows',
      'imageUrls': [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200',
      ],
      'amenities': [
        {'icon': 'wifi', 'label': 'Free Wi-Fi'},
        {'icon': 'nature', 'label': 'Garden View'},
        {'icon': 'shower', 'label': 'Outdoor Shower'},
        {'icon': 'beach_access', 'label': 'Beach Access'},
      ],
      'isFavorite': true,
    },
  ];

  static Map<String, dynamic>? getRoomById(String id) {
    try {
      return rooms.firstWhere((room) => room['id'] == id);
    } catch (e) {
      return null;
    }
  }
}
