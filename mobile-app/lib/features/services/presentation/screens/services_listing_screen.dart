import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../home/presentation/widgets/service_card.dart';
import '../../providers/service_provider.dart';

class ServicesListingScreen extends ConsumerWidget {
  const ServicesListingScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final servicesAsync = ref.watch(hotelServicesProvider());

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Hospitality Services'),
      body: servicesAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 48, color: AppColors.error),
              const SizedBox(height: AppSpacing.md),
              Text(
                'Failed to load services',
                style: Theme.of(context).textTheme.titleMedium,
              ),
              const SizedBox(height: AppSpacing.sm),
              TextButton(
                onPressed: () => ref.invalidate(hotelServicesProvider),
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
        data: (services) {
          if (services.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.spa_outlined, size: 64, color: AppColors.grey400),
                  const SizedBox(height: AppSpacing.md),
                  Text(
                    'No services available',
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                          color: AppColors.grey400,
                        ),
                  ),
                ],
              ),
            );
          }
          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(hotelServicesProvider),
            child: GridView.builder(
              padding: const EdgeInsets.all(AppSpacing.lg),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                crossAxisCount: 2,
                crossAxisSpacing: AppSpacing.md,
                mainAxisSpacing: AppSpacing.md,
                childAspectRatio: 0.8,
              ),
              itemCount: services.length,
              itemBuilder: (context, index) {
                final service = services[index];
                return ServiceCard(
                  id: service.id,
                  title: service.name,
                  subtitle: '\$${service.price.toInt()}',
                  imageUrl: service.image.isNotEmpty
                      ? service.image
                      : 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
                  onTap: () {
                    context.push('/services/${service.id}');
                  },
                )
                    .animate(delay: (index * 50).ms)
                    .fade(duration: 300.ms)
                    .slideY(begin: 0.1, curve: Curves.easeOutQuart);
              },
            ),
          );
        },
      ),
    );
  }
}
