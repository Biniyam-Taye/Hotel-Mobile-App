import 'food_item_model.dart';

class OrderItem {
  final String foodItemId;
  final FoodItem? foodItem;
  final int quantity;
  final double priceAtOrder;

  OrderItem({
    required this.foodItemId,
    this.foodItem,
    required this.quantity,
    required this.priceAtOrder,
  });

  factory OrderItem.fromJson(Map<String, dynamic> json) {
    return OrderItem(
      foodItemId: json['foodItem'] is String ? json['foodItem'] : (json['foodItem']?['_id'] ?? ''),
      foodItem: json['foodItem'] is Map<String, dynamic> ? FoodItem.fromJson(json['foodItem']) : null,
      quantity: json['quantity'] ?? 1,
      priceAtOrder: (json['priceAtOrder'] ?? 0).toDouble(),
    );
  }
}

class FoodOrder {
  final String id;
  final String userId;
  final String? roomId;
  final List<OrderItem> items;
  final double totalAmount;
  final String status;
  final String? specialInstructions;
  final DateTime? deliveryTime;
  final DateTime createdAt;

  FoodOrder({
    required this.id,
    required this.userId,
    this.roomId,
    required this.items,
    required this.totalAmount,
    required this.status,
    this.specialInstructions,
    this.deliveryTime,
    required this.createdAt,
  });

  factory FoodOrder.fromJson(Map<String, dynamic> json) {
    return FoodOrder(
      id: json['_id'] ?? json['id'] ?? '',
      userId: json['user'] is String ? json['user'] : (json['user']?['_id'] ?? ''),
      roomId: json['room'] is String ? json['room'] : (json['room']?['_id']),
      items: (json['items'] as List?)?.map((item) => OrderItem.fromJson(item)).toList() ?? [],
      totalAmount: (json['totalAmount'] ?? 0).toDouble(),
      status: json['status'] ?? 'pending',
      specialInstructions: json['specialInstructions'],
      deliveryTime: json['deliveryTime'] != null ? DateTime.parse(json['deliveryTime']) : null,
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : DateTime.now(),
    );
  }
}
