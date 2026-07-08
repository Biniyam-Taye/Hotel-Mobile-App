import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';

/// Debug-only developer launcher screen to easily switch between interfaces.
class DevLauncherScreen extends StatelessWidget {
  const DevLauncherScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: isDark
                ? [AppColors.darkBackground, const Color(0xFF1A2A1A)]
                : [AppColors.backgroundSecondary, const Color(0xFFF0F5D3)],
          ),
        ),
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 800),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // Logo & Title
                Container(
                  padding: const EdgeInsets.all(20),
                  decoration: BoxDecoration(
                    color: AppColors.accent,
                    borderRadius: BorderRadius.circular(24),
                    boxShadow: [
                      BoxShadow(
                        color: AppColors.accent.withValues(alpha: 0.3),
                        blurRadius: 30,
                        offset: const Offset(0, 10),
                      ),
                    ],
                  ),
                  child: const Icon(Icons.apartment_rounded, size: 64, color: AppColors.textPrimary),
                ),
                const SizedBox(height: 32),
                Text(
                  'LuxeStay Workspace',
                  style: TextStyle(
                    fontSize: 32,
                    fontWeight: FontWeight.bold,
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    letterSpacing: -0.5,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  'Developer Navigation Hub (Debug Only)',
                  style: TextStyle(
                    fontSize: 16,
                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 64),

                // Launcher Cards
                Row(
                  children: [
                    Expanded(
                      child: _LauncherCard(
                        title: 'Customer App',
                        description: 'Mobile-first hotel booking experience for guests.',
                        icon: Icons.smartphone_rounded,
                        color: Colors.blue,
                        onTap: () => context.go('/splash'),
                      ),
                    ),
                    const SizedBox(width: 24),
                    Expanded(
                      child: _LauncherCard(
                        title: 'Receptionist UI',
                        description: 'Tablet-optimized front desk management.',
                        icon: Icons.desktop_mac_rounded,
                        color: Colors.purple,
                        onTap: () => context.go('/receptionist'),
                      ),
                    ),
                    const SizedBox(width: 24),
                    Expanded(
                      child: _LauncherCard(
                        title: 'Admin Dashboard',
                        description: 'Desktop-optimized full system management.',
                        icon: Icons.admin_panel_settings_rounded,
                        color: AppColors.accent,
                        onTap: () => context.go('/admin'),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _LauncherCard extends StatelessWidget {
  final String title;
  final String description;
  final IconData icon;
  final Color color;
  final VoidCallback onTap;

  const _LauncherCard({
    required this.title,
    required this.description,
    required this.icon,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Material(
      color: Colors.transparent,
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(24),
        child: Ink(
          padding: const EdgeInsets.all(32),
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkCard.withValues(alpha: 0.8) : AppColors.card.withValues(alpha: 0.8),
            borderRadius: BorderRadius.circular(24),
            border: Border.all(
              color: isDark ? AppColors.darkBorder : AppColors.border,
            ),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.05),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: color.withValues(alpha: 0.1),
                  borderRadius: BorderRadius.circular(16),
                ),
                child: Icon(icon, size: 32, color: color == AppColors.accent ? AppColors.textPrimary : color),
              ),
              const SizedBox(height: 24),
              Text(
                title,
                style: TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                description,
                style: TextStyle(
                  fontSize: 14,
                  height: 1.5,
                  color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: 24),
              Row(
                children: [
                  Text(
                    'Launch',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: color == AppColors.accent ? AppColors.textPrimary : color,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Icon(
                    Icons.arrow_forward_rounded,
                    size: 16,
                    color: color == AppColors.accent ? AppColors.textPrimary : color,
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
