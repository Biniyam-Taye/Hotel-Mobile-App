class DummyOrdersData {
  static final List<Map<String, dynamic>> orders = [
    {
      'id': 'ORD-001',
      'type': 'Room', // Room, Food, Service
      'title': 'Ocean View Suite',
      'date': 'Oct 15 - Oct 20, 2026',
      'price': 2250.0,
      'status': 'Upcoming', // Upcoming, Active, Completed, Cancelled
      'imageUrl': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=400',
    },
    {
      'id': 'ORD-002',
      'type': 'Food',
      'title': 'Room Service - Dinner',
      'date': 'Oct 16, 2026 at 7:30 PM',
      'price': 62.0,
      'status': 'Completed',
      'imageUrl': 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400',
    },
    {
      'id': 'ORD-003',
      'type': 'Service',
      'title': 'Spa & Wellness',
      'date': 'Oct 17, 2026 at 10:00 AM',
      'price': 120.0,
      'status': 'Active',
      'imageUrl': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=400',
    },
    {
      'id': 'ORD-004',
      'type': 'Room',
      'title': 'Mountain Retreat',
      'date': 'Dec 01 - Dec 05, 2025',
      'price': 1600.0,
      'status': 'Cancelled',
      'imageUrl': 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=400',
    },
  ];
}
