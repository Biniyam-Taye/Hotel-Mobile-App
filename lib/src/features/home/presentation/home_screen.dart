import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/widgets/inputs/search_field.dart';
import 'package:luxestay/src/core/widgets/cards/category_chip.dart';
import 'package:luxestay/src/core/widgets/cards/hotel_card.dart';
import 'package:luxestay/src/core/widgets/cards/offer_card.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int _selectedCategoryIndex = 0;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final user = MockData.currentUser;

    return Scaffold(
      body: SafeArea(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            // ─── HEADER APP BAR ───────────────────────────────────────
            SliverAppBar(
              floating: true,
              backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
              elevation: 0,
              toolbarHeight: 80,
              title: Row(
                children: [
                  CircleAvatar(
                    radius: 24,
                    backgroundImage: NetworkImage(user.avatar ?? ''),
                  ),
                  const SizedBox(width: AppDimensions.md),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Good Morning, ${user.name}',
                          style: AppTypography.body(
                            color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                          ),
                        ),
                        Row(
                          children: [
                            Icon(
                              Icons.location_on_rounded,
                              size: 14,
                              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                            ),
                            const SizedBox(width: 4),
                            Text(
                              user.location ?? 'Current Location',
                              style: AppTypography.bodySemiBold(
                                color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                  Container(
                    width: 48,
                    height: 48,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: isDark ? AppColors.darkBorder : AppColors.border,
                      ),
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.notifications_outlined),
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      onPressed: () {},
                    ),
                  ),
                ],
              ),
            ),

            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(vertical: AppDimensions.base),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // ─── SEARCH ─────────────────────────────────────────
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                      child: SearchField(
                        readOnly: true,
                        onTap: () {},
                        onFilterTap: () {},
                        onVoiceTap: () {},
                      ),
                    ),
                    const SizedBox(height: AppDimensions.xxl),

                    // ─── CATEGORIES ─────────────────────────────────────
                    SizedBox(
                      height: AppDimensions.categoryChipHeight,
                      child: ListView.separated(
                        padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                        scrollDirection: Axis.horizontal,
                        physics: const BouncingScrollPhysics(),
                        itemCount: MockData.categories.length,
                        separatorBuilder: (context, index) => const SizedBox(width: AppDimensions.sm),
                        itemBuilder: (context, index) {
                          final category = MockData.categories[index];
                          return CategoryChip(
                            label: category,
                            icon: IconData(
                              MockData.categoryIcons[category] ?? Icons.hotel.codePoint,
                              fontFamily: 'MaterialIcons',
                            ),
                            isSelected: _selectedCategoryIndex == index,
                            onTap: () {
                              setState(() => _selectedCategoryIndex = index);
                            },
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: AppDimensions.xxl),

                    // ─── FEATURED HOTELS ────────────────────────────────
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Featured Luxury',
                            style: AppTypography.sectionTitle(
                              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                            ),
                          ),
                          Text(
                            'See All',
                            style: AppTypography.bodySemiBold(
                              color: AppColors.accent,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: AppDimensions.lg),
                    SizedBox(
                      height: AppDimensions.hotelCardHeight,
                      child: ListView.separated(
                        padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                        scrollDirection: Axis.horizontal,
                        physics: const BouncingScrollPhysics(),
                        itemCount: 4, // Just show first 4
                        separatorBuilder: (context, index) => const SizedBox(width: AppDimensions.lg),
                        itemBuilder: (context, index) {
                          final hotel = MockData.hotels[index];
                          return SizedBox(
                            width: MediaQuery.of(context).size.width * 0.8,
                            child: HotelCard(
                              hotel: hotel,
                              onTap: () {
                                context.push('/hotel/${hotel.id}');
                              },
                            ),
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: AppDimensions.xxxl),

                    // ─── SPECIAL OFFERS ─────────────────────────────────
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                      child: Text(
                        'Special Offers',
                        style: AppTypography.sectionTitle(
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                    ),
                    const SizedBox(height: AppDimensions.lg),
                    SizedBox(
                      height: AppDimensions.offerCardHeight,
                      child: ListView.builder(
                        padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen - 4), // offset internal margin
                        scrollDirection: Axis.horizontal,
                        physics: const BouncingScrollPhysics(),
                        itemCount: MockData.offers.length,
                        itemBuilder: (context, index) {
                          final offer = MockData.offers[index];
                          return SizedBox(
                            width: MediaQuery.of(context).size.width * 0.85,
                            child: OfferCard(offer: offer),
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: AppDimensions.xxxl),
                    
                    // ─── EXPLORE CITIES ─────────────────────────────────
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                      child: Text(
                        'Explore Destinations',
                        style: AppTypography.sectionTitle(
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                    ),
                    const SizedBox(height: AppDimensions.lg),
                    SizedBox(
                      height: AppDimensions.cityChipSize + 40, // padding for text below
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
                    const SizedBox(height: 100), // padding for bottom nav
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
