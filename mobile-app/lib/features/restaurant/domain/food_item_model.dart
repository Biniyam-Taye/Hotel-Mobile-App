import 'food_category_model.dart';

class FoodItem {
  final String id;
  final String name;
  final String description;
  final double price;
  final String? categoryId;
  final FoodCategory? category;
  final String image;
  final bool isAvailable;
  final int preparationTime;
  final List<String> tags;

  FoodItem({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    this.categoryId,
    this.category,
    required this.image,
    required this.isAvailable,
    required this.preparationTime,
    required this.tags,
  });

  factory FoodItem.fromJson(Map<String, dynamic> json) {
    return FoodItem(
      id: json['_id'] ?? json['id'] ?? '',
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      price: (json['price'] ?? 0).toDouble(),
      categoryId: json['category'] is String ? json['category'] : (json['category']?['_id']),
      category: json['category'] is Map<String, dynamic> ? FoodCategory.fromJson(json['category']) : null,
      image: json['image'] ?? 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=800',
      isAvailable: json['isAvailable'] ?? true,
      preparationTime: json['preparationTime'] ?? 20,
      tags: List<String>.from(json['tags'] ?? []),
    );
  }
}
