import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/network/api_client.dart';
import '../../rooms/domain/room_model.dart';

final homeRepositoryProvider = Provider<HomeRepository>((ref) {
  return HomeRepository(ref.watch(apiClientProvider));
});

class HomeRepository {
  final Dio _dio;

  HomeRepository(this._dio);

  Future<List<Room>> getFeaturedRooms() async {
    try {
      final response = await _dio.get('/rooms?limit=3');
      final List<dynamic> data = response.data['data'];
      return data.map((json) => Room.fromJson(json)).toList();
    } catch (e) {
      // Return empty instead of crashing home screen
      return [];
    }
  }

  Future<List<Map<String, dynamic>>> getFeaturedServices() async {
    try {
      final response = await _dio.get('/services?limit=3');
      return List<Map<String, dynamic>>.from(response.data['data']);
    } catch (e) {
      return [];
    }
  }

  Future<List<Map<String, dynamic>>> getOffers() async {
    try {
      final response = await _dio.get('/promotions/offers');
      return List<Map<String, dynamic>>.from(response.data['data']);
    } catch (e) {
      return [];
    }
  }

  Future<List<Map<String, dynamic>>> getReviews() async {
    try {
      final response = await _dio.get('/engagement/reviews');
      return List<Map<String, dynamic>>.from(response.data['data']);
    } catch (e) {
      return [];
    }
  }
}
