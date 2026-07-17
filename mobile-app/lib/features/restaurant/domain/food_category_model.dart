class FoodCategory {
  final String id;
  final String name;
  final String? description;
  final String image;
  final bool isActive;

  FoodCategory({
    required this.id,
    required this.name,
    this.description,
    required this.image,
    required this.isActive,
  });

  factory FoodCategory.fromJson(Map<String, dynamic> json) {
    return FoodCategory(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'],
      image: json['image'] ?? 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=800',
      isActive: json['isActive'] ?? true,
    );
  }
}
