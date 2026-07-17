import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/network/api_client.dart';
import '../domain/booking_model.dart';

final bookingRepositoryProvider = Provider<BookingRepository>((ref) {
  return BookingRepository(ref.watch(apiClientProvider));
});

class BookingRepository {
  final Dio _dio;

  BookingRepository(this._dio);

  Future<Booking> createBooking({
    required String roomId,
    required DateTime checkInDate,
    required DateTime checkOutDate,
    required int adults,
    required int children,
    required double totalAmount,
    String specialRequests = '',
  }) async {
    try {
      final response = await _dio.post(
        '/bookings',
        data: {
          'room': roomId,
          'checkInDate': checkInDate.toIso8601String(),
          'checkOutDate': checkOutDate.toIso8601String(),
          'guests': {
            'adults': adults,
            'children': children,
          },
          'totalAmount': totalAmount,
          'specialRequests': specialRequests,
        },
      );

      return Booking.fromJson(response.data['data']);
    } on DioException catch (e) {
      throw Exception(e.response?.data['message'] ?? 'Failed to create booking');
    } catch (e) {
      throw Exception('An unexpected error occurred');
    }
  }

  Future<List<Booking>> getMyBookings() async {
    try {
      final response = await _dio.get('/bookings/my');
      final List<dynamic> data = response.data['data'];
      return data.map((json) => Booking.fromJson(json)).toList();
    } on DioException catch (e) {
      throw Exception(e.response?.data['message'] ?? 'Failed to load bookings');
    } catch (e) {
      throw Exception('An unexpected error occurred');
    }
  }

  Future<Booking> getBookingById(String id) async {
    try {
      final response = await _dio.get('/bookings/$id');
      return Booking.fromJson(response.data['data']);
    } on DioException catch (e) {
      throw Exception(e.response?.data['message'] ?? 'Failed to load booking details');
    } catch (e) {
      throw Exception('An unexpected error occurred');
    }
  }
}
