import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/theme/app_theme.dart';
import 'package:luxestay/src/core/widgets/buttons/primary_button.dart';
import 'package:luxestay/src/core/widgets/cards/image_carousel.dart';
import 'package:luxestay/src/core/widgets/cards/offer_card.dart';
import 'package:luxestay/src/data/models/models.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';

class HotelDetailsScreen extends StatefulWidget {
  final String hotelId;

  const HotelDetailsScreen({super.key, required this.hotelId});

  @override
  State<HotelDetailsScreen> createState() => _HotelDetailsScreenState();
}

class _HotelDetailsScreenState extends State<HotelDetailsScreen> {
  late final Hotel hotel;

  @override
  void initState() {
    super.initState();
    hotel = MockData.hotels.firstWhere((h) => h.id == widget.hotelId, orElse: () => MockData.hotels.first);
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          // ─── HERO APP BAR ───────────────────────────────────────────
          SliverAppBar(
            expandedHeight: 350,
            pinned: true,
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                decoration: BoxDecoration(
                  color: Colors.black.withValues(alpha: 0.3),
                  shape: BoxShape.circle,
                ),
                child: IconButton(
                  icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
                  onPressed: () => context.pop(),
                ),
              ),
            ),
            actions: [
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.black.withValues(alpha: 0.3),
                    shape: BoxShape.circle,
                  ),
                  child: IconButton(
                    icon: Icon(
                      hotel.isFavorite ? Icons.favorite_rounded : Icons.favorite_border_rounded,
                      color: hotel.isFavorite ? AppColors.error : Colors.white,
                    ),
                    onPressed: () {},
                  ),
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: Container(
                  decoration: BoxDecoration(
                    color: Colors.black.withValues(alpha: 0.3),
                    shape: BoxShape.circle,
                  ),
                  child: IconButton(
                    icon: const Icon(Icons.share_rounded, color: Colors.white),
                    onPressed: () {},
                  ),
                ),
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Hero(
                tag: 'hotel_image_${hotel.id}',
                child: ImageCarousel(
                  imageUrls: hotel.images,
                  height: 400,
                  borderRadius: 0,
                ),
              ),
            ),
          ),

          // ─── HOTEL INFO ─────────────────────────────────────────────
          SliverToBoxAdapter(
            child: Container(
              padding: const EdgeInsets.all(AppDimensions.paddingScreen),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkBackground : AppColors.background,
                borderRadius: const BorderRadius.vertical(top: Radius.circular(AppDimensions.radiusXxl)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Hero(
                    tag: 'hotel_name_${hotel.id}',
                    child: Material(
                      color: Colors.transparent,
                      child: Text(
                        hotel.name,
                        style: AppTypography.pageTitle(
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: AppDimensions.sm),
                  Row(
                    children: [
                      RatingWidget(rating: hotel.rating, reviewCount: hotel.reviewCount),
                      const SizedBox(width: AppDimensions.md),
                      Icon(Icons.location_on_outlined, size: 16, color: AppColors.textTertiary),
                      const SizedBox(width: 4),
                      Expanded(
                        child: Text(
                          hotel.location,
                          style: AppTypography.body(color: AppColors.textTertiary),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: AppDimensions.xl),
                  const Divider(),
                  const SizedBox(height: AppDimensions.xl),

                  // ─── DESCRIPTION ────────────────────────────────────────
                  Text(
                    'About this hotel',
                    style: AppTypography.sectionTitle(
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: AppDimensions.sm),
                  Text(
                    hotel.description,
                    style: AppTypography.body(
                      color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                    ),
                  ),
                  const SizedBox(height: AppDimensions.xxl),

                  // ─── AMENITIES ──────────────────────────────────────────
                  Text(
                    'Amenities',
                    style: AppTypography.sectionTitle(
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: AppDimensions.md),
                  Wrap(
                    spacing: 12,
                    runSpacing: 12,
                    children: hotel.amenities.take(6).map((amenity) {
                      return Chip(
                        label: Text(amenity),
                        avatar: Icon(
                          IconData(
                            MockData.amenityIcons[amenity] ?? Icons.check_circle_outline.codePoint,
                            fontFamily: 'MaterialIcons',
                          ),
                          size: 16,
                          color: AppColors.textPrimary,
                        ),
                        backgroundColor: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
                        side: BorderSide.none,
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: AppDimensions.sm),
                  TextButton(
                    onPressed: () {},
                    child: Text('View all ${hotel.amenities.length} amenities', style: AppTypography.bodySemiBold(color: AppColors.accent)),
                  ),
                  const SizedBox(height: AppDimensions.xxl),

                  // ─── NEARBY ATTRACTIONS ─────────────────────────────────
                  if (hotel.nearbyPlaces != null && hotel.nearbyPlaces!.isNotEmpty) ...[
                    Text(
                      'Nearby Attractions',
                      style: AppTypography.sectionTitle(
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: AppDimensions.md),
                    ...hotel.nearbyPlaces!.map((place) => Padding(
                          padding: const EdgeInsets.only(bottom: AppDimensions.sm),
                          child: Row(
                            children: [
                              Icon(Icons.place_outlined, size: 20, color: AppColors.textTertiary),
                              const SizedBox(width: AppDimensions.md),
                              Expanded(
                                child: Text(
                                  place.name,
                                  style: AppTypography.body(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                                ),
                              ),
                              Text(
                                '${place.distance} km',
                                style: AppTypography.captionMedium(color: AppColors.textTertiary),
                              ),
                            ],
                          ),
                        )),
                    const SizedBox(height: AppDimensions.xxl),
                  ],
                  
                  // Empty space for bottom bar
                  const SizedBox(height: 100),
                ],
              ),
            ),
          ),
        ],
      ),
      bottomNavigationBar: _BottomBookingBar(hotel: hotel),
    );
  }
}

class _BottomBookingBar extends StatelessWidget {
  final Hotel hotel;

  const _BottomBookingBar({required this.hotel});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(AppDimensions.paddingScreen),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        boxShadow: AppTheme.navBarShadow,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(AppDimensions.radiusXl)),
      ),
      child: SafeArea(
        child: Row(
          children: [
            Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Total Price',
                  style: AppTypography.caption(color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary),
                ),
                Row(
                  children: [
                    Text(
                      '\$${hotel.pricePerNight.toInt()}',
                      style: AppTypography.price(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                    ),
                    Text(
                      ' /night',
                      style: AppTypography.caption(color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(width: AppDimensions.xl),
            Expanded(
              child: PrimaryButton(
                text: 'Select Room',
                onPressed: () {
                  context.push('/rooms/${hotel.id}');
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
