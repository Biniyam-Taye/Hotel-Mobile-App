import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  
  // Wrap app in ProviderScope for Riverpod
  runApp(
    const ProviderScope(
      child: LuxestayApp(),
    ),
  );
}
