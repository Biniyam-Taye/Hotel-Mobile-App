/// API configuration — override at build time with --dart-define.
class Env {
  static const apiBaseUrl = String.fromEnvironment(
    'API_BASE_URL',
    defaultValue: 'http://10.0.2.2:3000/api/v1',
  );

  /// Set to true once backend is running to use live API instead of mock data.
  static const useLiveApi = bool.fromEnvironment(
    'USE_LIVE_API',
    defaultValue: false,
  );
}
