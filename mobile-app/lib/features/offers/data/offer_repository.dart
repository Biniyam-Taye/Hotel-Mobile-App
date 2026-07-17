import 'package:dio/dio.dart';
import '../domain/offer_model.dart';

class OfferRepository {
  final Dio _dio;

  OfferRepository({required Dio dio}) : _dio = dio;

  Future<List<Offer>> getOffers() async {
    try {
      final response = await _dio.get('/promotions/offers');
      final data = response.data['data']['docs'] as List? ??
          response.data['data'] as List? ??
          [];
      return data.map((json) => Offer.fromJson(json)).toList();
    } catch (e) {
      throw Exception('Failed to load offers: $e');
    }
  }
}
