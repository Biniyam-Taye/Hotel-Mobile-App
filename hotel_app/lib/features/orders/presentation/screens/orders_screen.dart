import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../data/dummy_orders_data.dart';

class OrdersScreen extends StatelessWidget {
  const OrdersScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(
        title: 'My Orders',
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(AppSpacing.lg),
        itemCount: DummyOrdersData.orders.length,
        separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.lg),
        itemBuilder: (context, index) {
          final order = DummyOrdersData.orders[index];
          return _OrderCard(order: order).animate(delay: (index * 50).ms).fade(duration: 300.ms).slideY(begin: 0.1, curve: Curves.easeOutQuart);
        },
      ),
    );
  }
}

class _OrderCard extends StatelessWidget {
  final Map<String, dynamic> order;

  const _OrderCard({required this.order});

  Color _getStatusColor(String status) {
    switch (status) {
      case 'Upcoming':
        return AppColors.primary;
      case 'Active':
        return AppColors.success;
      case 'Completed':
        return AppColors.grey400;
      case 'Cancelled':
        return AppColors.error;
      default:
        return AppColors.grey400;
    }
  }

  IconData _getTypeIcon(String type) {
    switch (type) {
      case 'Room':
        return Icons.hotel_rounded;
      case 'Food':
        return Icons.restaurant_rounded;
      case 'Service':
        return Icons.spa_rounded;
      default:
        return Icons.receipt_long_rounded;
    }
  }

  @override
  Widget build(BuildContext context) {
    final statusColor = _getStatusColor(order['status']);

    return Container(
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: AppBorders.medium,
        border: Border.all(
          color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  Icon(_getTypeIcon(order['type']), size: 18, color: AppColors.grey400),
                  const SizedBox(width: AppSpacing.sm),
                  Text(
                    order['type'],
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                          fontWeight: FontWeight.w700,
                          color: AppColors.grey400,
                        ),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: statusColor.withValues(alpha: 0.1),
                  borderRadius: AppBorders.circular,
                ),
                child: Text(
                  order['status'],
                  style: Theme.of(context).textTheme.labelSmall?.copyWith(
                        color: statusColor,
                        fontWeight: FontWeight.w800,
                      ),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.md),
          
          // Content
          Row(
            children: [
              Container(
                width: 70,
                height: 70,
                decoration: BoxDecoration(
                  borderRadius: AppBorders.medium,
                  image: DecorationImage(
                    image: NetworkImage(order['imageUrl']),
                    fit: BoxFit.cover,
                  ),
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      order['title'],
                      style: Theme.of(context).textTheme.titleMedium?.copyWith(
                            fontWeight: FontWeight.w800,
                          ),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Text(
                      order['date'],
                      style: Theme.of(context).textTheme.bodySmall?.copyWith(
                            color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
                          ),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Order ID: ${order['id']}',
                      style: Theme.of(context).textTheme.labelSmall?.copyWith(
                            color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.4),
                          ),
                    ),
                  ],
                ),
              ),
              Text(
                '\$${order['price'].toInt()}',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      color: AppColors.primary,
                      fontWeight: FontWeight.w800,
                    ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
