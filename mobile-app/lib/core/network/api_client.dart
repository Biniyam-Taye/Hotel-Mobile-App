import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../features/auth/data/token_storage.dart';

// Use 10.0.2.2 for Android emulator to access localhost, or localhost for iOS simulator.
// For physical devices, you must use your machine's local IP (e.g., 192.168.1.x)
const String kBaseUrl = 'http://10.0.2.2:5000/api/v1';

final apiClientProvider = Provider<Dio>((ref) {
  final tokenStorage = ref.watch(tokenStorageProvider);
  
  final dio = Dio(BaseOptions(
    baseUrl: kBaseUrl,
    connectTimeout: const Duration(seconds: 10),
    receiveTimeout: const Duration(seconds: 10),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  ));

  dio.interceptors.add(InterceptorsWrapper(
    onRequest: (options, handler) async {
      // Get the token and attach it to requests
      final token = await tokenStorage.getToken();
      if (token != null) {
        options.headers['Authorization'] = 'Bearer $token';
      }
      return handler.next(options);
    },
    onError: (DioException e, handler) {
      // You can add global error handling here (e.g., redirect on 401)
      return handler.next(e);
    },
  ));

  return dio;
});
