import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';

/// Reusable color-coded status badge for admin tables.
class AdminStatusBadge extends StatelessWidget {
  final String status;

  const AdminStatusBadge({super.key, required this.status});

  @override
  Widget build(BuildContext context) {
    final config = _getConfig(status);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(
        color: config.color.withValues(alpha: 0.1),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: config.color.withValues(alpha: 0.3), width: 1),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: 6,
            height: 6,
            decoration: BoxDecoration(
              color: config.color,
              shape: BoxShape.circle,
            ),
          ),
          const SizedBox(width: 6),
          Text(
            status,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.w600,
              color: config.color,
            ),
          ),
        ],
      ),
    );
  }

  _BadgeConfig _getConfig(String status) {
    switch (status.toLowerCase()) {
      case 'active':
      case 'on duty':
      case 'completed':
      case 'available':
        return _BadgeConfig(AppColors.success);
      case 'upcoming':
      case 'scheduled':
      case 'pending':
        return _BadgeConfig(AppColors.info);
      case 'maintenance':
      case 'on leave':
      case 'off duty':
      case 'inactive':
        return _BadgeConfig(AppColors.warning);
      case 'cancelled':
      case 'refunded':
      case 'expired':
      case 'occupied':
        return _BadgeConfig(AppColors.error);
      default:
        return _BadgeConfig(AppColors.textSecondary);
    }
  }
}

class _BadgeConfig {
  final Color color;
  const _BadgeConfig(this.color);
}
