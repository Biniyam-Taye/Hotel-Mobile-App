class NotificationModel {
  final String id;
  final String title;
  final String body;
  final bool isRead;
  final DateTime createdAt;

  NotificationModel({
    required this.id,
    required this.title,
    required this.body,
    required this.isRead,
    required this.createdAt,
  });

  factory NotificationModel.fromJson(Map<String, dynamic> json) {
    return NotificationModel(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      body: json['body'] ?? json['message'] ?? '',
      isRead: json['isRead'] ?? json['read'] ?? false,
      createdAt: json['createdAt'] != null
          ? DateTime.parse(json['createdAt'])
          : DateTime.now(),
    );
  }
}

class FavoriteRoom {
  final String id;
  final String itemId;
  final String itemType;
  final Map<String, dynamic>? item;

  FavoriteRoom({
    required this.id,
    required this.itemId,
    required this.itemType,
    this.item,
  });

  factory FavoriteRoom.fromJson(Map<String, dynamic> json) {
    final itemData = json['itemId'];
    return FavoriteRoom(
      id: json['_id'] ?? json['id'] ?? '',
      itemId: itemData is Map ? (itemData['_id'] ?? '') : (itemData ?? ''),
      itemType: json['itemType'] ?? 'Room',
      item: itemData is Map<String, dynamic> ? itemData : null,
    );
  }
}
