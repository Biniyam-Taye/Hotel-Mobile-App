import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:luxestay/src/core/network/api_exception.dart';
import 'package:luxestay/src/core/network/dio_client.dart';
import 'package:luxestay/src/core/network/token_storage.dart';
import 'package:luxestay/src/data/models/models.dart';

class AuthSession {
  const AuthSession({required this.user, required this.accessToken});

  final ApiUser user;
  final String accessToken;
}

class ApiUser {
  const ApiUser({
    required this.id,
    required this.email,
    required this.role,
    required this.fullName,
    this.phone,
    this.avatarUrl,
    this.location,
    this.loyaltyTier = 'silver',
    this.rewardPoints = 0,
    this.walletBalance = 0,
    this.preferences = const [],
    this.assignedHotels = const [],
  });

  final String id;
  final String email;
  final String role;
  final String fullName;
  final String? phone;
  final String? avatarUrl;
  final String? location;
  final String loyaltyTier;
  final int rewardPoints;
  final double walletBalance;
  final List<String> preferences;
  final List<String> assignedHotels;

  factory ApiUser.fromJson(Map<String, dynamic> json) {
    return ApiUser(
      id: json['id'] as String,
      email: json['email'] as String,
      role: json['role'] as String,
      fullName: json['fullName'] as String,
      phone: json['phone'] as String?,
      avatarUrl: json['avatarUrl'] as String?,
      location: json['location'] as String?,
      loyaltyTier: json['loyaltyTier'] as String? ?? 'silver',
      rewardPoints: (json['rewardPoints'] as num?)?.toInt() ?? 0,
      walletBalance: (json['walletBalance'] as num?)?.toDouble() ?? 0,
      preferences: (json['preferences'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          const [],
      assignedHotels: (json['assignedHotels'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          const [],
    );
  }

  UserProfile toUserProfile() {
    return UserProfile(
      id: id,
      name: fullName,
      email: email,
      phone: phone,
      avatar: avatarUrl,
      location: location,
      loyaltyTier: _parseTier(loyaltyTier),
      rewardPoints: rewardPoints,
      walletBalance: walletBalance,
      preferences: preferences,
    );
  }

  LoyaltyTier _parseTier(String tier) {
    switch (tier) {
      case 'gold':
        return LoyaltyTier.gold;
      case 'platinum':
        return LoyaltyTier.platinum;
      case 'diamond':
        return LoyaltyTier.diamond;
      default:
        return LoyaltyTier.silver;
    }
  }
}

class AuthRepository {
  AuthRepository(this._dio, this._storage);

  final Dio _dio;
  final TokenStorage _storage;

  Future<AuthSession> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await _dio.post('/auth/login', data: {
        'email': email,
        'password': password,
      });

      final data = response.data['data'] as Map<String, dynamic>;
      final accessToken = data['accessToken'] as String;
      final refreshToken = data['refreshToken'] as String;
      final user = ApiUser.fromJson(data['user'] as Map<String, dynamic>);

      await _storage.saveTokens(
        accessToken: accessToken,
        refreshToken: refreshToken,
      );

      return AuthSession(user: user, accessToken: accessToken);
    } on DioException catch (e) {
      throw e.error is ApiException
          ? e.error as ApiException
          : ApiException(e.message ?? 'Login failed');
    }
  }

  Future<AuthSession> register({
    required String email,
    required String password,
    required String fullName,
    String? phone,
  }) async {
    try {
      final response = await _dio.post('/auth/register', data: {
        'email': email,
        'password': password,
        'fullName': fullName,
        if (phone != null) 'phone': phone,
      });

      final data = response.data['data'] as Map<String, dynamic>;
      final accessToken = data['accessToken'] as String;
      final refreshToken = data['refreshToken'] as String;
      final user = ApiUser.fromJson(data['user'] as Map<String, dynamic>);

      await _storage.saveTokens(
        accessToken: accessToken,
        refreshToken: refreshToken,
      );

      return AuthSession(user: user, accessToken: accessToken);
    } on DioException catch (e) {
      throw e.error is ApiException
          ? e.error as ApiException
          : ApiException(e.message ?? 'Registration failed');
    }
  }

  Future<ApiUser?> restoreSession() async {
    final token = await _storage.getAccessToken();
    if (token == null) return null;

    try {
      final response = await _dio.get('/auth/me');
      return ApiUser.fromJson(response.data['data'] as Map<String, dynamic>);
    } catch (_) {
      await _storage.clear();
      return null;
    }
  }

  Future<void> logout() async {
    try {
      await _dio.post('/auth/logout');
    } catch (_) {
      // Ignore network errors on logout
    }
    await _storage.clear();
  }
}

final authRepositoryProvider = Provider<AuthRepository>((ref) {
  return AuthRepository(
    ref.watch(dioProvider),
    ref.watch(tokenStorageProvider),
  );
});
