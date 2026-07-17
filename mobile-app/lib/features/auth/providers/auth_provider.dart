import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'auth_state.dart';
import '../domain/user_model.dart';
import '../data/auth_repository.dart';
import '../data/token_storage.dart';

final authProvider = NotifierProvider<AuthNotifier, AuthState>(() {
  return AuthNotifier();
});

class AuthNotifier extends Notifier<AuthState> {
  @override
  AuthState build() {
    return AuthInitial();
  }

  AuthRepository get _repository => ref.read(authRepositoryProvider);
  TokenStorage get _tokenStorage => ref.read(tokenStorageProvider);

  Future<void> checkAuthStatus() async {
    try {
      final token = await _tokenStorage.getToken();
      if (token == null || token.isEmpty) {
        state = AuthUnauthenticated();
        return;
      }

      // Token exists, try to get profile
      final user = await _repository.getProfile();
      state = AuthAuthenticated(user);
    } catch (e) {
      // If profile fetch fails (e.g., token expired), logout the user locally
      await _tokenStorage.deleteToken();
      state = AuthUnauthenticated();
    }
  }

  Future<void> login(String email, String password) async {
    state = AuthLoading();
    try {
      final data = await _repository.login(email, password);
      final token = data['data']['token'];
      final userData = data['data']['user'];
      
      await _tokenStorage.saveToken(token);
      state = AuthAuthenticated(User.fromJson(userData));
    } catch (e) {
      state = AuthError(e.toString());
      // Revert to unauthenticated after emitting error
      await Future.delayed(const Duration(milliseconds: 100));
      state = AuthUnauthenticated();
    }
  }

  Future<void> register({
    required String firstName,
    required String lastName,
    required String email,
    required String password,
  }) async {
    state = AuthLoading();
    try {
      final data = await _repository.register(
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      );
      final token = data['data']['token'];
      final userData = data['data']['user'];

      await _tokenStorage.saveToken(token);
      state = AuthAuthenticated(User.fromJson(userData));
    } catch (e) {
      state = AuthError(e.toString());
      await Future.delayed(const Duration(milliseconds: 100));
      state = AuthUnauthenticated();
    }
  }

  Future<void> logout() async {
    state = AuthLoading();
    await _tokenStorage.deleteToken();
    state = AuthUnauthenticated();
  }
}
