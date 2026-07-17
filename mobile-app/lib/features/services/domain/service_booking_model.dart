import 'service_model.dart';
import '../../rooms/domain/room_model.dart';

class ServiceBooking {
  final String id;
  final String userId;
  final HotelService? service;
  final String? serviceId;
  final Room? room;
  final String? roomId;
  final DateTime bookingDate;
  final double totalAmount;
  final String status;
  final String specialRequests;
  final DateTime createdAt;

  ServiceBooking({
    required this.id,
    required this.userId,
    this.service,
    this.serviceId,
    this.room,
    this.roomId,
    required this.bookingDate,
    required this.totalAmount,
    required this.status,
    this.specialRequests = '',
    required this.createdAt,
  });

  factory ServiceBooking.fromJson(Map<String, dynamic> json) {
    final serviceData = json['service'];
    final roomData = json['room'];

    return ServiceBooking(
      id: json['_id'] ?? json['id'] ?? '',
      userId: json['user'] is String ? json['user'] : (json['user']?['_id'] ?? ''),
      service: serviceData is Map<String, dynamic> ? HotelService.fromJson(serviceData) : null,
      serviceId: serviceData is String ? serviceData : (serviceData is Map ? serviceData['_id'] : null),
      room: roomData is Map<String, dynamic> ? Room.fromJson(roomData) : null,
      roomId: roomData is String ? roomData : (roomData is Map ? roomData['_id'] : null),
      bookingDate: DateTime.parse(json['bookingDate']),
      totalAmount: (json['totalAmount'] ?? 0).toDouble(),
      status: json['status'] ?? 'pending',
      specialRequests: json['specialRequests'] ?? '',
      createdAt: json['createdAt'] != null ? DateTime.parse(json['createdAt']) : DateTime.now(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      '_id': id,
      'user': userId,
      'service': service?.toJson() ?? serviceId,
      'room': room?.toJson() ?? roomId,
      'bookingDate': bookingDate.toIso8601String(),
      'totalAmount': totalAmount,
      'status': status,
      'specialRequests': specialRequests,
    };
  }
}
