import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/network/api_client.dart';
import '../domain/room_model.dart';

final roomsRepositoryProvider = Provider<RoomsRepository>((ref) {
  return RoomsRepository(ref.watch(apiClientProvider));
});

class RoomsRepository {
  final Dio _dio;

  RoomsRepository(this._dio);

  Future<Map<String, dynamic>> getRooms({
    int page = 1,
    int limit = 10,
    String? search,
    double? minPrice,
    double? maxPrice,
    String? roomType,
  }) async {
    try {
      final Map<String, dynamic> queryParameters = {
        'page': page,
        'limit': limit,
      };

      if (search != null && search.isNotEmpty) {
        queryParameters['title[regex]'] = search;
        queryParameters['title[options]'] = 'i';
      }
      
      if (minPrice != null) {
        queryParameters['pricePerNight[gte]'] = minPrice;
      }
      if (maxPrice != null) {
        queryParameters['pricePerNight[lte]'] = maxPrice;
      }
      if (roomType != null && roomType.isNotEmpty && roomType != 'all') {
        queryParameters['roomType'] = roomType;
      }

      final response = await _dio.get(
        '/rooms',
        queryParameters: queryParameters,
      );

      final List<dynamic> data = response.data['data'];
      final rooms = data.map((json) => Room.fromJson(json)).toList();
      
      return {
        'rooms': rooms,
        'pagination': response.data['pagination'] ?? {},
      };
    } on DioException catch (e) {
      throw Exception(e.response?.data['message'] ?? 'Failed to load rooms');
    } catch (e) {
      throw Exception('An unexpected error occurred');
    }
  }

  Future<Room> getRoomById(String id) async {
    try {
      final response = await _dio.get('/rooms/$id');
      return Room.fromJson(response.data['data']);
    } on DioException catch (e) {
      throw Exception(e.response?.data['message'] ?? 'Failed to load room details');
    } catch (e) {
      throw Exception('An unexpected error occurred');
    }
  }
}
