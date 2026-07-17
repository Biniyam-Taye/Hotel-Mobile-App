class Offer {
  final String id;
  final String title;
  final String description;
  final String image;
  final double? discountPercentage;
  final DateTime validFrom;
  final DateTime validUntil;
  final bool isActive;

  Offer({
    required this.id,
    required this.title,
    required this.description,
    required this.image,
    this.discountPercentage,
    required this.validFrom,
    required this.validUntil,
    required this.isActive,
  });

  factory Offer.fromJson(Map<String, dynamic> json) {
    return Offer(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      image: json['image'] ?? 'https://images.unsplash.com/photo-1542314831-c6a4d27ce66b?auto=format&fit=crop&q=80&w=800',
      discountPercentage: json['discountPercentage'] != null ? (json['discountPercentage'] as num).toDouble() : null,
      validFrom: json['validFrom'] != null ? DateTime.parse(json['validFrom']) : DateTime.now(),
      validUntil: json['validUntil'] != null ? DateTime.parse(json['validUntil']) : DateTime.now(),
      isActive: json['isActive'] ?? true,
    );
  }
}
