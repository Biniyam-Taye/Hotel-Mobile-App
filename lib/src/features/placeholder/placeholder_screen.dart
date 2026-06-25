import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';

class PlaceholderScreen extends StatelessWidget {
  final String title;
  
  const PlaceholderScreen({super.key, required this.title});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Text(
          '$title\nComing in next phase',
          style: AppTypography.sectionTitle(),
          textAlign: TextAlign.center,
        ),
      ),
    );
  }
}
