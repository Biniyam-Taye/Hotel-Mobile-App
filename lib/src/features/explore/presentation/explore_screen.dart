import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/widgets/inputs/search_field.dart';
import 'package:luxestay/src/core/widgets/cards/category_chip.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';

class ExploreScreen extends StatelessWidget {
  const ExploreScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // ─── HEADER ──────────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.all(AppDimensions.paddingScreen),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Explore',
                    style: AppTypography.pageTitle(
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: AppDimensions.sm),
                  Text(
                    'Discover the world\'s most luxurious destinations',
                    style: AppTypography.body(
                      color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: AppDimensions.xl),
                  SearchField(
                    hint: 'Where do you want to go?',
                    onTap: () {}, // Navigate to full search
                    onFilterTap: () {},
                  ),
                ],
              ),
            ),
            
            // ─── CONTENT ─────────────────────────────────────────────
            Expanded(
              child: ListView(
                physics: const BouncingScrollPhysics(),
                padding: const EdgeInsets.only(bottom: 100),
                children: [
                  // MAP PLACEHOLDER (Luxury minimal map design concept)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                    child: Container(
                      height: 220,
                      decoration: BoxDecoration(
                        color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
                        borderRadius: BorderRadius.circular(AppDimensions.radiusCard),
                        border: Border.all(
                          color: isDark ? AppColors.darkBorder : AppColors.border,
                        ),
                        image: const DecorationImage(
                          image: NetworkImage('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&fit=crop'), // Abstract map view
                          fit: BoxFit.cover,
                          opacity: 0.7,
                        ),
                      ),
                      child: Stack(
                        children: [
                          Center(
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                              decoration: BoxDecoration(
                                color: AppColors.accent,
                                borderRadius: BorderRadius.circular(999),
                                boxShadow: [
                                  BoxShadow(
                                    color: AppColors.accent.withValues(alpha: 0.3),
                                    blurRadius: 20,
                                    offset: const Offset(0, 10),
                                  ),
                                ],
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  const Icon(Icons.map_rounded, color: AppColors.textOnAccent, size: 20),
                                  const SizedBox(width: 8),
                                  Text('Open Interactive Map', style: AppTypography.button(color: AppColors.textOnAccent)),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: AppDimensions.xxxl),

                  // TOP DESTINATIONS
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                    child: Text(
                      'Top Destinations',
                      style: AppTypography.sectionTitle(
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                  ),
                  const SizedBox(height: AppDimensions.lg),
                  SizedBox(
                    height: AppDimensions.cityChipSize + 40,
                    child: ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                      scrollDirection: Axis.horizontal,
                      physics: const BouncingScrollPhysics(),
                      itemCount: MockData.cities.length,
                      separatorBuilder: (context, index) => const SizedBox(width: AppDimensions.base),
                      itemBuilder: (context, index) {
                        final city = MockData.cities[index];
                        return CityChip(
                          name: city.name,
                          imageUrl: city.image,
                          hotelCount: city.hotelCount,
                          onTap: () {},
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: AppDimensions.xxxl),
                  
                  // NEARBY ATTRACTIONS
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                    child: Text(
                      'Popular Near You',
                      style: AppTypography.sectionTitle(
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                  ),
                  const SizedBox(height: AppDimensions.lg),
                  // Render a vertical list of locations
                  ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                    itemCount: 4,
                    itemBuilder: (context, index) {
                      return Padding(
                        padding: const EdgeInsets.only(bottom: AppDimensions.md),
                        child: Row(
                          children: [
                            Container(
                              width: 60,
                              height: 60,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(AppDimensions.radiusMd),
                                image: DecorationImage(
                                  image: NetworkImage(MockData.hotels[index % MockData.hotels.length].images.first),
                                  fit: BoxFit.cover,
                                ),
                              ),
                            ),
                            const SizedBox(width: AppDimensions.md),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    MockData.hotels[index % MockData.hotels.length].name,
                                    style: AppTypography.bodySemiBold(
                                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    '${(index + 1) * 2.5} km away',
                                    style: AppTypography.caption(
                                      color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                            IconButton(
                              icon: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
                              color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                              onPressed: () {},
                            ),
                          ],
                        ),
                      );
                    },
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
