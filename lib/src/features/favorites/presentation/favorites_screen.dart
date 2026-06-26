import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/widgets/cards/hotel_card.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    // Filter mock hotels to only show favorites
    final favoriteHotels = MockData.hotels.where((h) => h.isFavorite).toList();

    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ─── HEADER ──────────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.all(AppDimensions.paddingScreen),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Favorites',
                        style: AppTypography.pageTitle(
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                      const SizedBox(height: AppDimensions.sm),
                      Text(
                        '${favoriteHotels.length} saved properties',
                        style: AppTypography.body(
                          color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                  Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: isDark ? AppColors.darkBorder : AppColors.border,
                      ),
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.add_rounded),
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      onPressed: () {}, // Add new collection
                    ),
                  ),
                ],
              ),
            ),
            
            // ─── LIST ───────────────────────────────────────────────
            Expanded(
              child: favoriteHotels.isEmpty
                  ? Center(
                      child: Text(
                        'No favorites yet.\nStart exploring!',
                        style: AppTypography.body(
                          color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    )
                  : ListView.separated(
                      physics: const BouncingScrollPhysics(),
                      padding: const EdgeInsets.fromLTRB(
                        AppDimensions.paddingScreen,
                        0,
                        AppDimensions.paddingScreen,
                        100, // Bottom nav padding
                      ),
                      itemCount: favoriteHotels.length,
                      separatorBuilder: (context, index) => const SizedBox(height: AppDimensions.xl),
                      itemBuilder: (context, index) {
                        return HotelCard(
                          hotel: favoriteHotels[index],
                          onTap: () {},
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
