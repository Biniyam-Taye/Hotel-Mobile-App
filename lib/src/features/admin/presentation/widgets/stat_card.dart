import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';

/// Reusable KPI stat card for the admin dashboard.
/// Displays a metric with icon, title, value, and trend indicator.
class StatCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String value;
  final double? trendPercentage;
  final Color? iconColor;
  final Color? iconBgColor;

  const StatCard({
    super.key,
    required this.icon,
    required this.title,
    required this.value,
    this.trendPercentage,
    this.iconColor,
    this.iconBgColor,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isPositive = (trendPercentage ?? 0) >= 0;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.border,
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Expanded(
                child: Text(
                  title,
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w600,
                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                  ),
                ),
              ),
              Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(
                  color: (iconBgColor ?? AppColors.accent).withValues(alpha: isDark ? 0.15 : 0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(
                  icon,
                  size: 20,
                  color: iconColor ?? AppColors.accent,
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            value,
            style: TextStyle(
              fontSize: 32,
              fontWeight: FontWeight.w800,
              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
              letterSpacing: -1,
            ),
          ),
          const SizedBox(height: 12),
          if (trendPercentage != null)
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(4),
                  decoration: BoxDecoration(
                    color: (isPositive ? AppColors.success : AppColors.error).withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    isPositive ? Icons.arrow_upward_rounded : Icons.arrow_downward_rounded,
                    size: 12,
                    color: isPositive ? AppColors.success : AppColors.error,
                  ),
                ),
                const SizedBox(width: 8),
                Text(
                  '${trendPercentage!.abs().toStringAsFixed(1)}%',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.bold,
                    color: isPositive ? AppColors.success : AppColors.error,
                  ),
                ),
                const SizedBox(width: 6),
                Text(
                  'vs last month',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                  ),
                ),
              ],
            ),
        ],
      ),
    );
  }
}
