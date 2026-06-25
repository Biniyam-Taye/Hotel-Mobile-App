import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/widgets/buttons/primary_button.dart';
import 'package:luxestay/src/data/models/models.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';

class RoomSelectionScreen extends StatelessWidget {
  final String hotelId;

  const RoomSelectionScreen({super.key, required this.hotelId});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final hotel = MockData.hotels.firstWhere((h) => h.id == hotelId, orElse: () => MockData.hotels.first);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Select Room'),
      ),
      body: ListView.separated(
        padding: const EdgeInsets.all(AppDimensions.paddingScreen),
        physics: const BouncingScrollPhysics(),
        itemCount: hotel.rooms.length,
        separatorBuilder: (context, index) => const SizedBox(height: AppDimensions.lg),
        itemBuilder: (context, index) {
          final room = hotel.rooms[index];
          return _RoomCard(room: room, hotelId: hotelId);
        },
      ),
    );
  }
}

class _RoomCard extends StatelessWidget {
  final Room room;
  final String hotelId;

  const _RoomCard({required this.room, required this.hotelId});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(AppDimensions.radiusCard),
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Room Image
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(AppDimensions.radiusCard)),
            child: SizedBox(
              height: 200,
              child: CachedNetworkImage(
                imageUrl: room.images.first,
                fit: BoxFit.cover,
              ),
            ),
          ),
          
          Padding(
            padding: const EdgeInsets.all(AppDimensions.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Expanded(
                      child: Text(
                        room.name,
                        style: AppTypography.cardTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                      ),
                    ),
                    if (room.breakfastIncluded)
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.accent.withValues(alpha: 0.2),
                          borderRadius: BorderRadius.circular(AppDimensions.radiusXs),
                        ),
                        child: Text(
                          'Breakfast',
                          style: AppTypography.labelBold(color: AppColors.accent),
                        ),
                      ),
                  ],
                ),
                const SizedBox(height: AppDimensions.sm),
                
                Text(
                  room.description,
                  style: AppTypography.caption(color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: AppDimensions.lg),
                
                // Specs
                Wrap(
                  spacing: 16,
                  runSpacing: 8,
                  children: [
                    _SpecItem(icon: Icons.person_outline, text: '${room.capacity} Guests'),
                    _SpecItem(icon: Icons.bed_outlined, text: '${room.bedCount} ${room.bedType} Bed'),
                    _SpecItem(icon: Icons.aspect_ratio_outlined, text: '${room.roomSize} m²'),
                  ],
                ),
                const SizedBox(height: AppDimensions.lg),
                const Divider(),
                const SizedBox(height: AppDimensions.md),
                
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '\$${room.pricePerNight.toInt()}',
                          style: AppTypography.price(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                        ),
                        Text(
                          ' /night',
                          style: AppTypography.label(color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary),
                        ),
                      ],
                    ),
                    SizedBox(
                      width: 140,
                      child: PrimaryButton(
                        text: 'Book Now',
                        onPressed: () {
                          context.push('/booking/$hotelId/${room.id}');
                        },
                      ),
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

class _SpecItem extends StatelessWidget {
  final IconData icon;
  final String text;

  const _SpecItem({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(icon, size: 16, color: AppColors.textTertiary),
        const SizedBox(width: 4),
        Text(text, style: AppTypography.captionMedium(color: AppColors.textTertiary)),
      ],
    );
  }
}
