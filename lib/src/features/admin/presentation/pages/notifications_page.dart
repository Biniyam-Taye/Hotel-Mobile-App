import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:intl/intl.dart';

class NotificationsPage extends StatelessWidget {
  const NotificationsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final dateFormat = DateFormat('MMM dd, hh:mm a');

    return Column(
      children: [
        const AdminAppBar(title: 'Notifications'),
        Expanded(
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Notification List
              Expanded(
                flex: 2,
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(24),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Recent Notifications',
                            style: TextStyle(
                              fontSize: 18,
                              fontWeight: FontWeight.w600,
                              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                            ),
                          ),
                          TextButton(
                            onPressed: () {},
                            child: const Text('Mark all as read'),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      ListView.separated(
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        itemCount: AdminMockData.adminNotifications.length,
                        separatorBuilder: (context, index) => Divider(
                          color: isDark ? AppColors.darkDivider : AppColors.divider,
                        ),
                        itemBuilder: (context, index) {
                          final notif = AdminMockData.adminNotifications[index];
                          return ListTile(
                            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                            leading: Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: _getTypeColor(notif['type']).withValues(alpha: 0.1),
                                shape: BoxShape.circle,
                              ),
                              child: Icon(
                                _getTypeIcon(notif['type']),
                                color: _getTypeColor(notif['type']),
                                size: 20,
                              ),
                            ),
                            title: Text(
                              notif['title'],
                              style: TextStyle(
                                fontWeight: notif['isRead'] ? FontWeight.normal : FontWeight.bold,
                                color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                              ),
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const SizedBox(height: 4),
                                Text(
                                  notif['message'],
                                  style: TextStyle(
                                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                                  ),
                                ),
                                const SizedBox(height: 8),
                                Text(
                                  dateFormat.format(notif['timestamp']),
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                                  ),
                                ),
                              ],
                            ),
                            trailing: notif['isRead']
                                ? null
                                : Container(
                                    width: 10,
                                    height: 10,
                                    decoration: const BoxDecoration(
                                      color: AppColors.accent,
                                      shape: BoxShape.circle,
                                    ),
                                  ),
                          );
                        },
                      ),
                    ],
                  ),
                ),
              ),
              
              // Compose Form
              Container(
                width: 350,
                decoration: BoxDecoration(
                  border: Border(
                    left: BorderSide(color: isDark ? AppColors.darkBorder : AppColors.border),
                  ),
                ),
                padding: const EdgeInsets.all(24),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Send Notification',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 24),
                    const Text('To:'),
                    const SizedBox(height: 8),
                    DropdownButtonFormField<String>(
                      decoration: const InputDecoration(filled: true),
                      value: 'all_users',
                      items: const [
                        DropdownMenuItem(value: 'all_users', child: Text('All Users')),
                        DropdownMenuItem(value: 'all_staff', child: Text('All Staff')),
                        DropdownMenuItem(value: 'active_guests', child: Text('Active Guests')),
                      ],
                      onChanged: (v) {},
                    ),
                    const SizedBox(height: 16),
                    const Text('Title:'),
                    const SizedBox(height: 8),
                    const TextField(
                      decoration: InputDecoration(filled: true, hintText: 'Enter title'),
                    ),
                    const SizedBox(height: 16),
                    const Text('Message:'),
                    const SizedBox(height: 8),
                    const TextField(
                      maxLines: 4,
                      decoration: InputDecoration(filled: true, hintText: 'Enter message'),
                    ),
                    const SizedBox(height: 24),
                    ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(minimumSize: const Size(double.infinity, 48)),
                      child: const Text('Send Notification'),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Color _getTypeColor(String type) {
    switch (type) {
      case 'alert': return AppColors.error;
      case 'booking': return AppColors.info;
      case 'payment': return AppColors.success;
      case 'review': return Colors.amber;
      default: return AppColors.textSecondary;
    }
  }

  IconData _getTypeIcon(String type) {
    switch (type) {
      case 'alert': return Icons.warning_rounded;
      case 'booking': return Icons.book_online_rounded;
      case 'payment': return Icons.payment_rounded;
      case 'review': return Icons.star_rounded;
      default: return Icons.info_rounded;
    }
  }
}
