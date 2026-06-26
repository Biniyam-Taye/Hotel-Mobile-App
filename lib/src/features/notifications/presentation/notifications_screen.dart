import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Notifications',
          style: AppTypography.pageTitle(
            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
          ),
        ),
        backgroundColor: Colors.transparent,
        elevation: 0,
        iconTheme: IconThemeData(
          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
        ),
      ),
      body: ListView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.all(AppDimensions.paddingScreen),
        children: [
          _buildDateHeader('Today', isDark),
          _buildNotificationCard(
            title: 'Booking Confirmed!',
            description: 'Your stay at The Ritz-Carlton has been confirmed for Oct 12.',
            icon: Icons.check_circle_outline_rounded,
            color: AppColors.success,
            time: '2m ago',
            isDark: isDark,
          ),
          const SizedBox(height: AppDimensions.md),
          _buildNotificationCard(
            title: 'Special Offer',
            description: 'Get 20% off your next luxury villa booking in Bali.',
            icon: Icons.local_offer_outlined,
            color: AppColors.accent,
            time: '1h ago',
            isDark: isDark,
          ),
          const SizedBox(height: AppDimensions.xxxl),
          _buildDateHeader('Yesterday', isDark),
          _buildNotificationCard(
            title: 'Review Reminder',
            description: 'How was your stay at Four Seasons? Leave a review now.',
            icon: Icons.star_outline_rounded,
            color: AppColors.warning,
            time: '1d ago',
            isDark: isDark,
          ),
        ],
      ),
    );
  }

  Widget _buildDateHeader(String text, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppDimensions.lg),
      child: Text(
        text,
        style: AppTypography.sectionTitle(
          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
        ),
      ),
    );
  }

  Widget _buildNotificationCard({
    required String title,
    required String description,
    required IconData icon,
    required Color color,
    required String time,
    required bool isDark,
  }) {
    return Container(
      padding: const EdgeInsets.all(AppDimensions.lg),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(AppDimensions.radiusCard),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.border,
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: color, size: 24),
          ),
          const SizedBox(width: AppDimensions.lg),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      title,
                      style: AppTypography.bodySemiBold(
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                    Text(
                      time,
                      style: AppTypography.caption(
                        color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: AppTypography.captionMedium(
                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
