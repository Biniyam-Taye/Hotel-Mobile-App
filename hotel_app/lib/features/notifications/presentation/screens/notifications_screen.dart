import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';

class NotificationsScreen extends StatelessWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final List<Map<String, dynamic>> notifications = [
      {
        'title': 'Your food is on the way! 🍔',
        'body': 'Your order ORD-002 will arrive at your room in 5 minutes.',
        'time': '10 mins ago',
        'isUnread': true,
        'icon': Icons.delivery_dining_rounded,
        'color': AppColors.primary,
      },
      {
        'title': 'Check-in is approaching',
        'body': 'Get ready for your stay! Online check-in is now available for your upcoming booking.',
        'time': '2 hours ago',
        'isUnread': true,
        'icon': Icons.how_to_reg_rounded,
        'color': AppColors.success,
      },
      {
        'title': 'Spa Appointment Confirmed',
        'body': 'Your Spa & Wellness appointment is confirmed for Oct 17 at 10:00 AM.',
        'time': '1 day ago',
        'isUnread': false,
        'icon': Icons.spa_rounded,
        'color': AppColors.grey400,
      },
      {
        'title': 'Exclusive Offer just for you!',
        'body': 'Enjoy 20% off all Villas using the code SUMMER20.',
        'time': '3 days ago',
        'isUnread': false,
        'icon': Icons.local_offer_rounded,
        'color': AppColors.warning,
      },
    ];

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(
        title: 'Notifications',
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(AppSpacing.lg),
        itemCount: notifications.length,
        separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.md),
        itemBuilder: (context, index) {
          final notif = notifications[index];
          return _NotificationCard(notif: notif).animate(delay: (index * 50).ms).fade(duration: 300.ms).slideY(begin: 0.1, curve: Curves.easeOutQuart);
        },
      ),
    );
  }
}

class _NotificationCard extends StatelessWidget {
  final Map<String, dynamic> notif;

  const _NotificationCard({required this.notif});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: notif['isUnread'] ? AppColors.primaryContainer.withValues(alpha: 0.3) : Theme.of(context).cardTheme.color,
        borderRadius: AppBorders.medium,
        border: Border.all(
          color: notif['isUnread'] ? AppColors.primary.withValues(alpha: 0.2) : Theme.of(context).dividerColor.withValues(alpha: 0.1),
        ),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: notif['color'].withValues(alpha: 0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(
              notif['icon'],
              color: notif['color'],
              size: 24,
            ),
          ),
          const SizedBox(width: AppSpacing.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  notif['title'],
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: notif['isUnread'] ? FontWeight.w800 : FontWeight.w700,
                      ),
                ),
                const SizedBox(height: 4),
                Text(
                  notif['body'],
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7),
                        height: 1.4,
                      ),
                ),
                const SizedBox(height: 8),
                Text(
                  notif['time'],
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: AppColors.grey400,
                        fontWeight: FontWeight.w600,
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
