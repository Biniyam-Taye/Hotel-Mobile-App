import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:go_router/go_router.dart';

/// Placeholder shell for the Receptionist Dashboard
class ReceptionistShell extends StatelessWidget {
  const ReceptionistShell({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Receptionist Dashboard (Placeholder)'),
        backgroundColor: isDark ? AppColors.darkCard : AppColors.card,
        actions: [
          IconButton(
            icon: const Icon(Icons.exit_to_app_rounded),
            onPressed: () => context.go('/dev-launcher'),
            tooltip: 'Return to Launcher',
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.support_agent_rounded,
              size: 80,
              color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
            ),
            const SizedBox(height: 24),
            Text(
              'Receptionist Interface',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
                color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'This is a placeholder for the Receptionist UI.\nYou can build this out later.',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 16,
                color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                height: 1.5,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
