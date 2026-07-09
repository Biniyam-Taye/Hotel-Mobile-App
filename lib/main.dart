import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app.dart';
import 'package:luxestay/src/providers/auth_provider.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  runApp(
    const ProviderScope(
      child: LuxestayApp(),
    ),
  );
}

/// Call from splash screen to restore JWT session on app start.
Future<void> restoreAuthSession(WidgetRef ref) async {
  await ref.read(authProvider.notifier).restoreSession();
}
