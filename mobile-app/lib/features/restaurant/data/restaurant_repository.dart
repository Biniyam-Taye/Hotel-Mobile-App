import 'package:dio/dio.dart';
import '../domain/food_category_model.dart';
import '../domain/food_item_model.dart';
import '../domain/food_order_model.dart';

class RestaurantRepository {
  final Dio _dio;

  RestaurantRepository({required Dio dio}) : _dio = dio;

  Future<List<FoodCategory>> getCategories() async {
    try {
      final response = await _dio.get('/restaurant/categories');
      final data = response.data['data']['docs'] as List? ?? response.data['data'] as List;
      return data.map((json) => FoodCategory.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load food categories: $e');
    }
  }

  Future<List<FoodItem>> getFoodItems({String? categoryId, String? search}) async {
    try {
      final queryParams = <String, dynamic>{};
      if (categoryId != null && categoryId.isNotEmpty && categoryId != 'All') {
        queryParams['category'] = categoryId;
      }
      if (search != null && search.isNotEmpty) {
        queryParams['search'] = search;
      }
      
      final response = await _dio.get('/restaurant/items', queryParameters: queryParams);
      final data = response.data['data']['docs'] as List? ?? response.data['data'] as List;
      return data.map((json) => FoodItem.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load food items: $e');
    }
  }

  Future<FoodItem> getFoodItemById(String id) async {
    try {
      final response = await _dio.get('/restaurant/items/$id');
      return FoodItem.fromJson(response.data['data']['food'] ?? response.data['data']);
    } catch (e) {
      throw Exception('Failed to load food item: $e');
    }
  }

  Future<FoodOrder> createOrder(Map<String, dynamic> orderData) async {
    try {
      final response = await _dio.post('/restaurant/orders', data: orderData);
      return FoodOrder.fromJson(response.data['data']['order'] ?? response.data['data']);
    } catch (e) {
      throw Exception('Failed to create order: $e');
    }
  }

  Future<List<FoodOrder>> getMyOrders() async {
    try {
      final response = await _dio.get('/restaurant/orders');
      final data = response.data['data']['docs'] as List? ?? response.data['data'] as List;
      return data.map((json) => FoodOrder.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load orders: $e');
    }
  }
}
