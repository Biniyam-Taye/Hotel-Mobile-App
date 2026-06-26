import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/widgets/cards/hotel_card.dart';
import 'package:luxestay/src/core/widgets/inputs/search_field.dart';
import 'package:luxestay/src/core/widgets/cards/category_chip.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:go_router/go_router.dart';

class SearchScreen extends StatefulWidget {
  const SearchScreen({super.key});

  @override
  State<SearchScreen> createState() => _SearchScreenState();
}

class _SearchScreenState extends State<SearchScreen> {
  final TextEditingController _searchController = TextEditingController();
  bool _isSearching = false;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ─── SEARCH HEADER ────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.all(AppDimensions.paddingScreen),
              child: Row(
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20),
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    onPressed: () => context.pop(),
                  ),
                  const SizedBox(width: AppDimensions.sm),
                  Expanded(
                    child: SearchField(
                      controller: _searchController,
                      hint: 'Search hotels, cities...',
                      onChanged: (val) {
                        setState(() {
                          _isSearching = val.isNotEmpty;
                        });
                      },
                      onFilterTap: () {
                        // Open filter bottom sheet
                      },
                    ),
                  ),
                ],
              ),
            ),

            // ─── CONTENT ──────────────────────────────────────────────
            Expanded(
              child: _isSearching
                  ? _buildSearchResults(isDark)
                  : _buildSearchSuggestions(isDark),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSearchSuggestions(bool isDark) {
    return ListView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
      children: [
        const SizedBox(height: AppDimensions.md),
        Text(
          'Recent Searches',
          style: AppTypography.sectionTitle(
            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: AppDimensions.lg),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            _buildRecentChip('Bali, Indonesia', isDark),
            _buildRecentChip('Luxury Villas', isDark),
            _buildRecentChip('Paris', isDark),
          ],
        ),
        const SizedBox(height: AppDimensions.xxxl),
        Text(
          'Trending Destinations',
          style: AppTypography.sectionTitle(
            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
          ),
        ),
        const SizedBox(height: AppDimensions.lg),
        SizedBox(
          height: AppDimensions.cityChipSize + 40,
          child: ListView.separated(
            clipBehavior: Clip.none,
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
                onTap: () {
                  _searchController.text = city.name;
                  setState(() => _isSearching = true);
                },
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildSearchResults(bool isDark) {
    // Just mock results for now based on the query length to simulate filtering
    final results = MockData.hotels;

    return ListView.separated(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.fromLTRB(
        AppDimensions.paddingScreen,
        0,
        AppDimensions.paddingScreen,
        AppDimensions.paddingScreen,
      ),
      itemCount: results.length,
      separatorBuilder: (context, index) => const SizedBox(height: AppDimensions.xl),
      itemBuilder: (context, index) {
        return HotelCard(
          hotel: results[index],
          onTap: () => context.push('/hotel/${results[index].id}'),
        );
      },
    );
  }

  Widget _buildRecentChip(String text, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
        borderRadius: BorderRadius.circular(AppDimensions.radiusChip),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.border,
        ),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(
            Icons.history,
            size: 16,
            color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
          ),
          const SizedBox(width: 8),
          Text(
            text,
            style: AppTypography.captionMedium(
              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
            ),
          ),
        ],
      ),
    );
  }
}
