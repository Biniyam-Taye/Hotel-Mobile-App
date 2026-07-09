import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:luxestay/src/core/network/api_exception.dart';
import 'package:luxestay/src/data/repositories/auth_repository.dart';

class AuthState {
  const AuthState({this.user, this.isLoading = false, this.error});

  final ApiUser? user;
  final bool isLoading;
  final String? error;

  bool get isAuthenticated => user != null;

  AuthState copyWith({ApiUser? user, bool? isLoading, String? error}) {
    return AuthState(
      user: user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class AuthNotifier extends Notifier<AuthState> {
  @override
  AuthState build() => const AuthState();

  AuthRepository get _repo => ref.read(authRepositoryProvider);

  Future<void> restoreSession() async {
    state = state.copyWith(isLoading: true, error: null);
    final user = await _repo.restoreSession();
    state = AuthState(user: user, isLoading: false);
  }

  Future<ApiUser> login(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    try {
      final session = await _repo.login(email: email, password: password);
      state = AuthState(user: session.user, isLoading: false);
      return session.user;
    } on ApiException catch (e) {
      state = state.copyWith(isLoading: false, error: e.message);
      rethrow;
    }
  }

  Future<void> logout() async {
    await _repo.logout();
    state = const AuthState();
  }
}

final authProvider = NotifierProvider<AuthNotifier, AuthState>(AuthNotifier.new);

final currentUserRoleProvider = Provider<String?>((ref) {
  return ref.watch(authProvider).user?.role;
});
