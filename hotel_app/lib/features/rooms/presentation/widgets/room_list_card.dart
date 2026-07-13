import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/cards/premium_card.dart';
import '../../../../core/widgets/animations/bouncing_wrapper.dart';
import '../../../../core/widgets/buttons/animated_favorite_button.dart';

class RoomListCard extends StatelessWidget {
  final Map<String, dynamic> room;
  final VoidCallback? onTap;
  final VoidCallback? onFavoriteTap;

  const RoomListCard({
    super.key,
    required this.room,
    this.onTap,
    this.onFavoriteTap,
  });

  @override
  Widget build(BuildContext context) {
    final bool isFavorite = room['isFavorite'] ?? false;
    final List<String> imageUrls = room['imageUrls'] ?? [];
    final String mainImage = imageUrls.isNotEmpty ? imageUrls.first : '';
    final String title = room['title'] ?? 'Room';
    final String location = room['location'] ?? 'Location';
    final double rating = room['rating'] ?? 0.0;
    final int reviews = room['reviews'] ?? 0;
    final double price = room['price'] ?? 0.0;

    return BouncingWrapper(
      child: PremiumCard(
        onTap: onTap,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Image Section
            Stack(
              children: [
                Hero(
                  tag: 'room_image_${room['id']}',
                  child: Container(
                    height: 200,
                    width: double.infinity,
                    decoration: BoxDecoration(
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(AppBorders.radiusMedium),
                        topRight: Radius.circular(AppBorders.radiusMedium),
                      ),
                      image: DecorationImage(
                        image: NetworkImage(mainImage),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
                Positioned(
                  top: AppSpacing.sm,
                  right: AppSpacing.sm,
                  child: AnimatedFavoriteButton(
                    isFavorite: isFavorite,
                    onTap: onFavoriteTap ?? () {},
                    size: 20,
                  ),
                ),
              Positioned(
                bottom: AppSpacing.md,
                left: AppSpacing.md,
                child: Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.sm,
                    vertical: 4,
                  ),
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.surface,
                    borderRadius: AppBorders.circular,
                  ),
                  child: Row(
                    children: [
                      const Icon(
                        Icons.star_rounded,
                        color: AppColors.warning,
                        size: 16,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        rating.toString(),
                        style: Theme.of(context).textTheme.labelLarge?.copyWith(
                              fontWeight: FontWeight.w800,
                            ),
                      ),
                      Text(
                        ' ($reviews)',
                        style: Theme.of(context).textTheme.labelSmall?.copyWith(
                              color: Theme.of(context)
                                  .colorScheme
                                  .onSurface
                                  .withValues(alpha: 0.6),
                            ),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          
          // Details Section
          Padding(
            padding: const EdgeInsets.all(AppSpacing.md),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            title,
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w800,
                                ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                          const SizedBox(height: 4),
                          Row(
                            children: [
                              Icon(
                                Icons.location_on_rounded,
                                color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5),
                                size: 14,
                              ),
                              const SizedBox(width: 4),
                              Expanded(
                                child: Text(
                                  location,
                                  style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                        color: Theme.of(context)
                                            .colorScheme
                                            .onSurface
                                            .withValues(alpha: 0.6),
                                      ),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.end,
                      children: [
                        Text(
                          '\$${price.toInt()}',
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                color: AppColors.primary,
                                fontWeight: FontWeight.w800,
                              ),
                        ),
                        Text(
                          '/night',
                          style: Theme.of(context).textTheme.labelSmall?.copyWith(
                                color: Theme.of(context)
                                    .colorScheme
                                    .onSurface
                                    .withValues(alpha: 0.6),
                              ),
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
