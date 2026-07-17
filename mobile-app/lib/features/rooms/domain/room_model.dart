class Room {
  final String id;
  final String title;
  final String description;
  final double pricePerNight;
  final int capacityAdults;
  final int capacityChildren;
  final List<String> amenities;
  final List<String> images;
  final String roomType;
  final bool isAvailable;

  Room({
    required this.id,
    required this.title,
    required this.description,
    required this.pricePerNight,
    required this.capacityAdults,
    required this.capacityChildren,
    required this.amenities,
    required this.images,
    required this.roomType,
    required this.isAvailable,
  });

  factory Room.fromJson(Map<String, dynamic> json) {
    return Room(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      pricePerNight: (json['pricePerNight'] ?? 0).toDouble(),
      capacityAdults: json['capacity']?['adults'] ?? 2,
      capacityChildren: json['capacity']?['children'] ?? 0,
      amenities: List<String>.from(json['amenities'] ?? []),
      images: List<String>.from(json['images'] ?? []),
      roomType: json['roomType'] ?? 'standard',
      isAvailable: json['isAvailable'] ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'title': title,
      'description': description,
      'pricePerNight': pricePerNight,
      'capacity': {
        'adults': capacityAdults,
        'children': capacityChildren,
      },
      'amenities': amenities,
      'images': images,
      'roomType': roomType,
      'isAvailable': isAvailable,
    };
  }
}
