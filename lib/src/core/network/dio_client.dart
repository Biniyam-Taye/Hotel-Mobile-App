import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:luxestay/src/core/config/env.dart';
import 'package:luxestay/src/core/network/api_exception.dart';
import 'package:luxestay/src/core/network/token_storage.dart';

final tokenStorageProvider = Provider<TokenStorage>((ref) => TokenStorage());

final dioProvider = Provider<Dio>((ref) {
  final storage = ref.watch(tokenStorageProvider);
  final dio = Dio(
    BaseOptions(
      baseUrl: Env.apiBaseUrl,
      connectTimeout: const Duration(seconds: 15),
      receiveTimeout: const Duration(seconds: 15),
      headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    ),
  );

  dio.interceptors.add(
    InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await storage.getAccessToken();
        if (token != null && token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        handler.next(options);
      },
      onError: (error, handler) async {
        final response = error.response;
        if (response != null) {
          final data = response.data;
          final message = data is Map && data['error'] != null
              ? data['error'].toString()
              : 'Request failed (${response.statusCode})';
          handler.reject(
            DioException(
              requestOptions: error.requestOptions,
              response: response,
              error: ApiException(message, statusCode: response.statusCode),
            ),
          );
          return;
        }
        handler.next(error);
      },
    ),
  );

  return dio;
});
