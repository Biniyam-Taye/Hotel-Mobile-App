class DummyServicesData {
  static final List<Map<String, dynamic>> services = [
    {
      'id': 'service_1',
      'title': 'Spa & Wellness',
      'subtitle': 'Relax your body and mind',
      'description':
          'Enjoy a complete relaxation experience with our signature spa treatments, including aromatherapy, hot stone massage, and deep tissue therapy. Our certified therapists tailor each session to your specific needs.',
      'price': 120.0,
      'duration': '60 min',
      'imageUrl':
          'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
      'category': 'Wellness',
    },
    {
      'id': 'service_2',
      'title': 'Airport Transfer',
      'subtitle': 'Premium private pickup',
      'description':
          'Travel in comfort with our luxury airport transfer service. Our professional driver will meet you at arrivals and handle all your luggage for a seamless start or end to your stay.',
      'price': 85.0,
      'duration': 'Varies',
      'imageUrl':
          'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800',
      'category': 'Transport',
    },
    {
      'id': 'service_3',
      'title': 'Gym & Fitness',
      'subtitle': 'Stay fit during your stay',
      'description':
          'Access our state-of-the-art fitness center featuring the latest cardio and weight training equipment. Personal trainers are available upon request to guide your workout session.',
      'price': 25.0,
      'duration': 'Full Day',
      'imageUrl':
          'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
      'category': 'Fitness',
    },
    {
      'id': 'service_4',
      'title': 'Swimming Pool',
      'subtitle': 'Infinity pool with ocean view',
      'description':
          'Take a dip in our stunning infinity pool overlooking the ocean. Towels, sunbeds, and complimentary refreshments are provided for a premium poolside experience.',
      'price': 20.0,
      'duration': 'Full Day',
      'imageUrl':
          'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800',
      'category': 'Leisure',
    },
    {
      'id': 'service_5',
      'title': 'Massage Therapy',
      'subtitle': 'Deep tissue & aromatherapy',
      'description':
          'Choose from Swedish, deep tissue, or aromatic massage. Our expert therapists use premium oils and techniques to melt away tension and rejuvenate your body.',
      'price': 90.0,
      'duration': '45 min',
      'imageUrl':
          'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800',
      'category': 'Wellness',
    },
    {
      'id': 'service_6',
      'title': 'Laundry Service',
      'subtitle': 'Same day wash & press',
      'description':
          'Premium laundry and dry-cleaning services. Leave your garments in the provided bag before 9 AM and they will be returned fresh and perfectly pressed by evening.',
      'price': 30.0,
      'duration': 'Same Day',
      'imageUrl':
          'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800',
      'category': 'Convenience',
    },
  ];

  static Map<String, dynamic>? getServiceById(String id) {
    try {
      return services.firstWhere((service) => service['id'] == id);
    } catch (_) {
      return null;
    }
  }
}
