class HotelService {
  final String id;
  final String name;
  final String description;
  final double price;
  final String category;
  final String image;
  final bool isAvailable;
  final int? duration;

  HotelService({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.category,
    required this.image,
    required this.isAvailable,
    this.duration,
  });

  factory HotelService.fromJson(Map<String, dynamic> json) {
    return HotelService(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      price: (json['price'] ?? 0).toDouble(),
      category: json['category'] ?? 'other',
      image: json['image'] ?? '',
      isAvailable: json['isAvailable'] ?? true,
      duration: json['duration'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'name': name,
      'description': description,
      'price': price,
      'category': category,
      'image': image,
      'isAvailable': isAvailable,
      'duration': duration,
    };
  }
}
