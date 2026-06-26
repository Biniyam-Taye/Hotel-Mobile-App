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
import 'package:luxestay/src/core/widgets/cards/review_card.dart';
import 'package:luxestay/src/core/widgets/cards/inspiration_card.dart';
import 'package:luxestay/src/core/widgets/cards/featured_room_card.dart';
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
                      onPressed: () => context.push('/notifications'),
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
                        onTap: () => context.push('/search'),
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

                    // ─── FEATURED DESTINATIONS (ROOMS) ──────────────────
                    Column(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                          decoration: BoxDecoration(
                            color: AppColors.accent.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: AppColors.accent.withOpacity(0.2)),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(Icons.diamond_rounded, size: 12, color: AppColors.accent),
                              const SizedBox(width: 6),
                              Text(
                                'Handpicked For You',
                                style: AppTypography.captionMedium(color: AppColors.accent).copyWith(
                                  fontWeight: FontWeight.w600,
                                  fontSize: 11,
                                ),
                              ),
                              const SizedBox(width: 6),
                              Icon(Icons.diamond_rounded, size: 12, color: AppColors.accent),
                            ],
                          ),
                        ),
                        const SizedBox(height: AppDimensions.lg),
                        Text(
                          'Featured Destinations',
                          style: AppTypography.pageTitle(
                            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                          ).copyWith(fontWeight: FontWeight.w800),
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: AppDimensions.md),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(width: 30, height: 1, color: AppColors.accent),
                            const SizedBox(width: 8),
                            CircleAvatar(radius: 4, backgroundColor: AppColors.accent),
                            const SizedBox(width: 8),
                            Container(width: 30, height: 1, color: AppColors.accent),
                          ],
                        ),
                        const SizedBox(height: AppDimensions.lg),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: AppDimensions.xl),
                          child: Text(
                            'Discover our handpicked selection of exceptional properties around the world, offering unparalleled luxury and unforgettable experiences.',
                            style: AppTypography.captionMedium(
                              color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                            ).copyWith(height: 1.5),
                            textAlign: TextAlign.center,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: AppDimensions.xl),
                    SizedBox(
                      height: 420,
                      child: ListView.separated(
                        padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen, vertical: AppDimensions.md),
                        scrollDirection: Axis.horizontal,
                        physics: const BouncingScrollPhysics(),
                        itemCount: MockData.hotels.length,
                        separatorBuilder: (context, index) => const SizedBox(width: AppDimensions.xl),
                        itemBuilder: (context, index) {
                          final hotel = MockData.hotels[index];
                          final room = hotel.rooms.isNotEmpty ? hotel.rooms.first : MockData.hotels[0].rooms[0];
                          return FeaturedRoomCard(
                            room: room,
                            hotel: hotel,
                            onTap: () => context.push('/hotel/${hotel.id}'),
                            onBookNow: () => context.push('/rooms/${hotel.id}'),
                          );
                        },
                      ),
                    ),
                    const SizedBox(height: AppDimensions.xxxl),
                    // ─── WHAT OUR GUESTS SAY ───────────────────────────────
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                      child: Text(
                        'What Our Guests Say',
                        style: AppTypography.sectionTitle(
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                    ),
                    const SizedBox(height: AppDimensions.lg),
                    SizedBox(
                      height: 180,
                      child: ListView.separated(
                        padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                        scrollDirection: Axis.horizontal,
                        physics: const BouncingScrollPhysics(),
                        itemCount: MockData.hotels[0].reviews.length,
                        separatorBuilder: (context, index) => const SizedBox(width: AppDimensions.lg),
                        itemBuilder: (context, index) {
                          return ReviewCard(review: MockData.hotels[0].reviews[index]);
                        },
                      ),
                    ),
                    const SizedBox(height: AppDimensions.xxxl),

                    // ─── STAY INSPIRED ───────────────────────────────────
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                      child: Text(
                        'Stay Inspired',
                        style: AppTypography.sectionTitle(
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                    ),
                    const SizedBox(height: AppDimensions.lg),
                    SizedBox(
                      height: 280,
                      child: ListView.separated(
                        padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                        scrollDirection: Axis.horizontal,
                        physics: const BouncingScrollPhysics(),
                        itemCount: 3,
                        separatorBuilder: (context, index) => const SizedBox(width: AppDimensions.lg),
                        itemBuilder: (context, index) {
                          final inspirations = [
                            {'title': '10 Best Beachfront Villas in Bali', 'cat': 'Travel Guide', 'img': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&fit=crop'},
                            {'title': 'A Weekend Guide to Paris', 'cat': 'City Breaks', 'img': 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&fit=crop'},
                            {'title': 'Top 5 Eco-Friendly Lodges', 'cat': 'Sustainable', 'img': 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&fit=crop'},
                          ];
                          final item = inspirations[index];
                          return InspirationCard(
                            title: item['title']!,
                            category: item['cat']!,
                            imageUrl: item['img']!,
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
