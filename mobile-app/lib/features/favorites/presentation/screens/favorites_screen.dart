import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../engagement/providers/engagement_provider.dart';
import '../../../rooms/presentation/widgets/room_list_card.dart';

class FavoritesScreen extends ConsumerWidget {
  const FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final favoritesAsync = ref.watch(myFavoritesProvider);

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Favorites'),
      body: favoritesAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 48, color: AppColors.error),
              const SizedBox(height: AppSpacing.md),
              Text('Failed to load favorites', style: Theme.of(context).textTheme.titleMedium),
              TextButton(
                onPressed: () => ref.invalidate(myFavoritesProvider),
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
        data: (favorites) {
          // Filter only Room favorites
          final roomFavorites = favorites.where((f) => f.itemType == 'Room').toList();

          if (roomFavorites.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.favorite_border_rounded, size: 72, color: AppColors.grey300),
                  const SizedBox(height: AppSpacing.lg),
                  Text(
                    'No favorites yet',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Rooms you heart will appear here.',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.grey400),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(myFavoritesProvider),
            child: ListView.separated(
              padding: const EdgeInsets.all(AppSpacing.lg),
              itemCount: roomFavorites.length,
              separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.lg),
              itemBuilder: (context, index) {
                final fav = roomFavorites[index];
                final roomData = fav.item ?? {};

                // Build a map compatible with RoomListCard from the populated item data
                final roomImages = (roomData['images'] as List?)
                    ?.map((e) => e.toString())
                    .toList() ?? [];
                final roomMap = {
                  'id': fav.itemId,
                  'title': roomData['title'] ?? roomData['name'] ?? 'Room',
                  'price': (roomData['pricePerNight'] ?? roomData['price'] ?? 0).toDouble(),
                  'imageUrls': roomImages,
                  'location': roomData['location'] ?? 'Hotel',
                  'type': roomData['roomType'] ?? roomData['type'] ?? 'Standard',
                  'rating': (roomData['rating'] ?? 4.5).toDouble(),
                  'reviews': roomData['ratingsCount'] ?? 0,
                  'isFavorite': true,
                };

                return RoomListCard(
                  room: roomMap,
                  onTap: () => context.push('/rooms/${fav.itemId}'),
                  onFavoriteTap: () async {
                    await ref.read(myFavoritesProvider.notifier).toggleFavorite(fav.itemId, 'Room');
                  },
                ).animate(delay: (index * 50).ms).fade(duration: 300.ms).slideY(begin: 0.1, curve: Curves.easeOutQuart);
              },
            ),
          );
        },
      ),
    );
  }
}
