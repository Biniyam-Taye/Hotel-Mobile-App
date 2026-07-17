import 'package:dio/dio.dart';
import '../domain/payment_model.dart';

class PaymentRepository {
  final Dio _dio;

  PaymentRepository({required Dio dio}) : _dio = dio;

  Future<PaymentIntentResponse> createPaymentIntent({
    required String relatedType,
    required String relatedId,
    required double amount,
    String currency = 'usd',
  }) async {
    try {
      final response = await _dio.post('/payment/create-intent', data: {
        'relatedType': relatedType,
        'relatedId': relatedId,
        'amount': amount,
        'currency': currency,
      });

      return PaymentIntentResponse.fromJson(response.data['data']);
    } catch (e) {
      throw Exception('Failed to create payment intent: $e');
    }
  }
}
