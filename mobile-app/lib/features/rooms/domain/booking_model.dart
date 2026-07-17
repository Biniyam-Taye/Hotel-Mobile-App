import 'room_model.dart';
import '../../auth/domain/user_model.dart';

class Booking {
  final String id;
  final User? user; // Can be a string ID or full User object depending on backend populate
  final Room? room; // Can be a string ID or full Room object
  final String? roomId;
  final String? userId;
  final DateTime checkInDate;
  final DateTime checkOutDate;
  final int guestsAdults;
  final int guestsChildren;
  final double totalAmount;
  final String status;
  final String specialRequests;
  final DateTime createdAt;

  Booking({
    required this.id,
    this.user,
    this.room,
    this.roomId,
    this.userId,
    required this.checkInDate,
    required this.checkOutDate,
    required this.guestsAdults,
    required this.guestsChildren,
    required this.totalAmount,
    required this.status,
    this.specialRequests = '',
    required this.createdAt,
  });

  factory Booking.fromJson(Map<String, dynamic> json) {
    // Handle populated vs unpopulated refs
    final roomData = json['room'];
    final userData = json['user'];

    return Booking(
      id: json['_id'] ?? json['id'] ?? '',
      user: userData is Map<String, dynamic> ? User.fromJson(userData) : null,
      userId: userData is String ? userData : (userData is Map ? userData['_id'] : null),
      room: roomData is Map<String, dynamic> ? Room.fromJson(roomData) : null,
      roomId: roomData is String ? roomData : (roomData is Map ? roomData['_id'] : null),
      checkInDate: DateTime.parse(json['checkInDate']),
      checkOutDate: DateTime.parse(json['checkOutDate']),
      guestsAdults: json['guests']?['adults'] ?? 1,
      guestsChildren: json['guests']?['children'] ?? 0,
      totalAmount: (json['totalAmount'] ?? 0).toDouble(),
      status: json['status'] ?? 'pending',
      specialRequests: json['specialRequests'] ?? '',
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'user': user?.toJson() ?? userId,
      'room': room?.toJson() ?? roomId,
      'checkInDate': checkInDate.toIso8601String(),
      'checkOutDate': checkOutDate.toIso8601String(),
      'guests': {
        'adults': guestsAdults,
        'children': guestsChildren,
      },
      'totalAmount': totalAmount,
      'status': status,
      'specialRequests': specialRequests,
    };
  }
}
