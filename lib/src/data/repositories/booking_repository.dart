import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:luxestay/src/core/network/api_exception.dart';
import 'package:luxestay/src/core/network/dio_client.dart';
import 'package:luxestay/src/data/models/models.dart';

class BookingRepository {
  BookingRepository(this._dio);

  final Dio _dio;

  Future<Map<String, dynamic>> createBooking({
    required String hotelId,
    required String roomTypeId,
    required DateTime checkIn,
    required DateTime checkOut,
    required int guests,
    required String paymentMethod,
    String? specialRequests,
    String? couponCode,
  }) async {
    try {
      final response = await _dio.post('/bookings', data: {
        'hotelId': hotelId,
        'roomTypeId': roomTypeId,
        'checkIn': checkIn.toIso8601String().split('T').first,
        'checkOut': checkOut.toIso8601String().split('T').first,
        'guests': guests,
        'paymentMethod': paymentMethod,
        if (specialRequests != null) 'specialRequests': specialRequests,
        if (couponCode != null) 'couponCode': couponCode,
      });
      return response.data['data'] as Map<String, dynamic>;
    } on DioException catch (e) {
      throw e.error is ApiException
          ? e.error as ApiException
          : ApiException(e.message ?? 'Failed to create booking');
    }
  }

  Future<List<Map<String, dynamic>>> getMyBookings() async {
    try {
      final response = await _dio.get('/bookings/me');
      return (response.data['data'] as List<dynamic>)
          .map((e) => e as Map<String, dynamic>)
          .toList();
    } on DioException catch (e) {
      throw e.error is ApiException
          ? e.error as ApiException
          : ApiException(e.message ?? 'Failed to load bookings');
    }
  }

  Future<String> createStripeCheckout({
    required String bookingId,
    String? successUrl,
    String? cancelUrl,
  }) async {
    try {
      final response = await _dio.post('/payments/checkout-session', data: {
        'bookingId': bookingId,
        if (successUrl != null) 'successUrl': successUrl,
        if (cancelUrl != null) 'cancelUrl': cancelUrl,
      });
      return response.data['data']['url'] as String;
    } on DioException catch (e) {
      throw e.error is ApiException
          ? e.error as ApiException
          : ApiException(e.message ?? 'Failed to create payment session');
    }
  }

  BookingStatus parseStatus(String status) {
    switch (status) {
      case 'active':
        return BookingStatus.active;
      case 'completed':
        return BookingStatus.completed;
      case 'cancelled':
        return BookingStatus.cancelled;
      case 'refunded':
        return BookingStatus.refunded;
      default:
        return BookingStatus.upcoming;
    }
  }
}

final bookingRepositoryProvider = Provider<BookingRepository>((ref) {
  return BookingRepository(ref.watch(dioProvider));
});
