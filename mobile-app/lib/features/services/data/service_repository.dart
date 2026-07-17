import 'package:dio/dio.dart';
import '../domain/service_model.dart';
import '../domain/service_booking_model.dart';

class ServiceRepository {
  final Dio _dio;

  ServiceRepository({required Dio dio}) : _dio = dio;

  Future<List<HotelService>> getServices({String? category}) async {
    try {
      final queryParams = <String, dynamic>{};
      if (category != null && category.isNotEmpty) {
        queryParams['category'] = category;
      }
      
      final response = await _dio.get('/services', queryParameters: queryParams);
      final data = response.data['data']['docs'] as List? ?? response.data['data'] as List;
      return data.map((json) => HotelService.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load services: $e');
    }
  }

  Future<HotelService> getServiceById(String id) async {
    try {
      final response = await _dio.get('/services/$id');
      return HotelService.fromJson(response.data['data']['service'] ?? response.data['data']);
    } catch (e) {
      throw Exception('Failed to load service: $e');
    }
  }

  Future<ServiceBooking> createBooking(Map<String, dynamic> bookingData) async {
    try {
      final response = await _dio.post('/services/bookings', data: bookingData);
      return ServiceBooking.fromJson(response.data['data']['booking'] ?? response.data['data']);
    } catch (e) {
      throw Exception('Failed to book service: $e');
    }
  }

  Future<List<ServiceBooking>> getMyBookings() async {
    try {
      final response = await _dio.get('/services/bookings');
      final data = response.data['data']['docs'] as List? ?? response.data['data'] as List;
      return data.map((json) => ServiceBooking.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load service bookings: $e');
    }
  }
}
