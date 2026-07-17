import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../rooms/providers/booking_provider.dart';
import '../../../restaurant/providers/restaurant_provider.dart';
import '../../../services/providers/service_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';

class OrdersScreen extends ConsumerWidget {
  const OrdersScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final bookingsAsync = ref.watch(myBookingsProvider);
    final foodOrdersAsync = ref.watch(myFoodOrdersProvider);
    final serviceBookingsAsync = ref.watch(myServiceBookingsProvider);

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(
        title: 'My Orders',
      ),
      body: bookingsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, stack) => Center(child: Text('Error: $error')),
        data: (bookings) {
          return foodOrdersAsync.when(
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (error, stack) => Center(child: Text('Error: $error')),
            data: (foodOrders) {
              return serviceBookingsAsync.when(
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (error, stack) => Center(child: Text('Error: $error')),
                data: (serviceBookings) {
                  final List<Map<String, dynamic>> allOrders = [];
                  final dateFormat = DateFormat('MMM dd, yyyy');

                  // Add Room Bookings
                  for (var booking in bookings) {
                    String title = 'Room Booking';
                    String imageUrl = 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800';
                    if (booking.room != null) {
                      title = booking.room!.title;
                      if (booking.room!.images.isNotEmpty) {
                        imageUrl = booking.room!.images.first;
                      }
                    }
                    allOrders.add({
                      'id': booking.id,
                      'type': 'Room',
                      'title': title,
                      'status': booking.status,
                      'date': '${dateFormat.format(booking.checkInDate)} - ${dateFormat.format(booking.checkOutDate)}',
                      'price': booking.totalAmount,
                      'imageUrl': imageUrl,
                      'createdAt': booking.createdAt,
                    });
                  }

                  // Add Food Orders
                  for (var order in foodOrders) {
                    String title = 'Food Order';
                    String imageUrl = 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80&w=800';
                    if (order.items.isNotEmpty && order.items.first.foodItem != null) {
                      title = order.items.map((i) => i.foodItem!.name).join(', ');
                      imageUrl = order.items.first.foodItem!.image;
                    }
                    allOrders.add({
                      'id': order.id,
                      'type': 'Food',
                      'title': title,
                      'status': order.status,
                      'date': dateFormat.format(order.createdAt),
                      'price': order.totalAmount,
                      'imageUrl': imageUrl,
                      'createdAt': order.createdAt,
                    });
                  }

                  // Add Service Bookings
                  for (var sb in serviceBookings) {
                    String title = 'Service Booking';
                    String imageUrl = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800';
                    if (sb.service != null) {
                      title = sb.service!.name;
                      if (sb.service!.image.isNotEmpty) {
                        imageUrl = sb.service!.image;
                      }
                    }
                    allOrders.add({
                      'id': sb.id,
                      'type': 'Service',
                      'title': title,
                      'status': sb.status,
                      'date': dateFormat.format(sb.bookingDate),
                      'price': sb.totalAmount,
                      'imageUrl': imageUrl,
                      'createdAt': sb.createdAt,
                    });
                  }

                  // Sort descending by createdAt
                  allOrders.sort((a, b) => b['createdAt'].compareTo(a['createdAt']));

                  if (allOrders.isEmpty) {
                    return Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.receipt_long_rounded, size: 72, color: AppColors.grey300),
                          const SizedBox(height: AppSpacing.lg),
                          Text(
                            'No orders yet',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
                          ),
                          const SizedBox(height: AppSpacing.sm),
                          Text(
                            'Your bookings and orders will appear here.',
                            style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.grey400),
                          ),
                        ],
                      ),
                    );
                  }

                  return RefreshIndicator(
                    onRefresh: () async {
                      ref.invalidate(myBookingsProvider);
                      ref.invalidate(myFoodOrdersProvider);
                      ref.invalidate(myServiceBookingsProvider);
                    },
                    child: ListView.separated(
                      padding: const EdgeInsets.all(AppSpacing.lg),
                      itemCount: allOrders.length,
                      separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.lg),
                      itemBuilder: (context, index) {
                        return _OrderCard(order: allOrders[index])
                            .animate(delay: (index * 50).ms)
                            .fade(duration: 300.ms)
                            .slideY(begin: 0.1, curve: Curves.easeOutQuart);
                      },
                    ),
                  );
                },
              );
            },
          );
        },
      ),
    );
  }
}

class _OrderCard extends StatelessWidget {
  final Map<String, dynamic> order;

  const _OrderCard({required this.order});

  Color _getStatusColor(String status) {
    switch (status.toLowerCase()) {
      case 'pending':
        return AppColors.warning;
      case 'confirmed':
        return AppColors.success;
      case 'completed':
        return AppColors.grey400;
      case 'cancelled':
        return AppColors.error;
      case 'upcoming':
        return AppColors.primary;
      case 'active':
        return AppColors.success;
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
