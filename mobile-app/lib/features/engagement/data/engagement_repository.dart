import 'package:dio/dio.dart';
import '../domain/engagement_models.dart';

class EngagementRepository {
  final Dio _dio;

  EngagementRepository({required Dio dio}) : _dio = dio;

  // --- Favorites ---
  Future<List<FavoriteRoom>> getFavorites() async {
    try {
      final response = await _dio.get('/engagement/favorites');
      final data = response.data['data']['docs'] as List? ??
          response.data['data'] as List? ??
          [];
      return data.map((json) => FavoriteRoom.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load favorites: $e');
    }
  }

  Future<void> toggleFavorite(String itemId, String itemType) async {
    try {
      await _dio.post('/engagement/favorites', data: {
        'itemId': itemId,
        'itemType': itemType,
      });
    } catch (e) {
      throw Exception('Failed to toggle favorite: $e');
    }
  }

  // --- Notifications ---
  Future<List<NotificationModel>> getMyNotifications() async {
    try {
      final response = await _dio.get('/engagement/notifications');
      final data = response.data['data']['docs'] as List? ??
          response.data['data'] as List? ??
          [];
      return data.map((json) => NotificationModel.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load notifications: $e');
    }
  }

  Future<void> markNotificationRead(String id) async {
    try {
      await _dio.put('/engagement/notifications/$id/read');
    } catch (e) {
      throw Exception('Failed to mark notification as read: $e');
    }
  }

  // --- Reviews ---
  Future<void> addReview({
    required String itemId,
    required String itemType,
    required int rating,
    required String comment,
  }) async {
    try {
      await _dio.post('/engagement/reviews', data: {
        'itemId': itemId,
        'itemType': itemType,
        'rating': rating,
        'comment': comment,
      });
    } catch (e) {
      throw Exception('Failed to add review: $e');
    }
  }
}
