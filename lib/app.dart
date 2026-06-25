import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_theme.dart';
import 'package:luxestay/src/core/router/app_router.dart';

class LuxestayApp extends StatelessWidget {
  const LuxestayApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'LuxeStay',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: ThemeMode.system, // Uses system theme (light/dark)
      routerConfig: appRouter,
    );
  }
}
