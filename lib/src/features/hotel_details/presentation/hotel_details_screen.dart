import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
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
  late final ScrollController _scrollController;

  // How much the card is initially pushed below the image
  static const double _imageHeight = 320.0;
  // How far the card overlaps the image at rest
  static const double _cardOverlap = 32.0;

  double _cardRadius = 32.0; // starts fully rounded
  double _headerOpacity = 0.0; // back-button bg opacity

  @override
  void initState() {
    super.initState();
    hotel = MockData.hotels.firstWhere(
      (h) => h.id == widget.hotelId,
      orElse: () => MockData.hotels.first,
    );
    _scrollController = ScrollController()..addListener(_onScroll);
  }

  void _onScroll() {
    final offset = _scrollController.offset;

    // Phase 1 (0 → imageHeight): card slides up over image.
    // Radius stays at max (32), opacity of back-button bg grows.
    // Phase 2 (imageHeight → imageHeight+80): card has cleared the image,
    // radius animates DOWN to 0 (sharp card filling full screen).
    const double phase2Start = _imageHeight - _cardOverlap;
    const double phase2End = phase2Start + 80;

    final double newRadius;
    if (offset < phase2Start) {
      newRadius = 32.0; // fully rounded while image is still behind
    } else {
      // animate from 32 → 0 once card has fully passed the image
      final t = ((offset - phase2Start) / (phase2End - phase2Start)).clamp(0.0, 1.0);
      newRadius = 32.0 * (1.0 - t);
    }

    // Header overlay fades in as image scrolls away
    final double newOpacity = (offset / (_imageHeight - 56)).clamp(0.0, 1.0);

    if ((newRadius - _cardRadius).abs() > 0.1 || (newOpacity - _headerOpacity).abs() > 0.01) {
      setState(() {
        _cardRadius = newRadius;
        _headerOpacity = newOpacity;
      });
    }
  }

  @override
  void dispose() {
    _scrollController.removeListener(_onScroll);
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? AppColors.darkBackground : AppColors.background;
    final textPrimary = isDark ? AppColors.darkTextPrimary : AppColors.textPrimary;
    final textSecondary = isDark ? AppColors.darkTextSecondary : AppColors.textSecondary;

    return Scaffold(
      backgroundColor: bg,
      extendBodyBehindAppBar: true,
      body: Stack(
        children: [
          // ─── BACKGROUND IMAGE (Parallax) ──────────────
          AnimatedBuilder(
            animation: _scrollController,
            builder: (context, child) {
              double offset = 0.0;
              if (_scrollController.hasClients) {
                offset = _scrollController.offset;
              }
              // Parallax effect: image scrolls up at half the speed of the content
              final topOffset = offset > 0 ? -offset * 0.5 : 0.0;
              
              return Positioned(
                top: topOffset,
                left: 0,
                right: 0,
                height: _imageHeight + 40,
                child: child!,
              );
            },
            child: Hero(
              tag: 'hotel_image_${hotel.id}',
              child: ImageCarousel(
                imageUrls: hotel.images,
                height: _imageHeight + 40,
                borderRadius: 0,
              ),
            ),
          ),

          // ─── SCROLLABLE CONTENT ──────────────────────────────────────
          SingleChildScrollView(
            controller: _scrollController,
            physics: const BouncingScrollPhysics(),
            child: Column(
              children: [
                // Spacer so that the card starts at the bottom of the image
                SizedBox(height: _imageHeight - _cardOverlap),

                // ─── CONTENT CARD (animated radius) ───────────────────
                Container(
                  decoration: BoxDecoration(
                    color: bg,
                    borderRadius: BorderRadius.vertical(
                      top: Radius.circular(_cardRadius),
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.12),
                        blurRadius: 24,
                        offset: const Offset(0, -4),
                      ),
                    ],
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // ── Drag handle ──────────────────────────────────
                      Center(
                        child: Padding(
                          padding: const EdgeInsets.only(top: 12, bottom: 8),
                          child: Container(
                            width: 40,
                            height: 4,
                            decoration: BoxDecoration(
                              color: isDark
                                  ? Colors.white.withOpacity(0.2)
                                  : Colors.black.withOpacity(0.12),
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                        ),
                      ),

                      Padding(
                        padding: const EdgeInsets.fromLTRB(
                          AppDimensions.paddingScreen,
                          8,
                          AppDimensions.paddingScreen,
                          0,
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            // ── Hotel name ───────────────────────────────
                            Hero(
                              tag: 'hotel_name_${hotel.id}',
                              child: Material(
                                color: Colors.transparent,
                                child: Text(
                                  hotel.name,
                                  style: AppTypography.pageTitle(color: textPrimary),
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

                            // ── About ────────────────────────────────────
                            Text('About this hotel', style: AppTypography.sectionTitle(color: textPrimary)),
                            const SizedBox(height: AppDimensions.sm),
                            Text(hotel.description, style: AppTypography.body(color: textSecondary)),
                            const SizedBox(height: AppDimensions.xxl),

                            // ── Amenities ────────────────────────────────
                            Text('Amenities', style: AppTypography.sectionTitle(color: textPrimary)),
                            const SizedBox(height: AppDimensions.md),
                            Wrap(
                              spacing: 12,
                              runSpacing: 12,
                              children: hotel.amenities.take(6).map((amenity) {
                                return Container(
                                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                                  decoration: BoxDecoration(
                                    color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                  child: Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Icon(
                                        IconData(
                                          MockData.amenityIcons[amenity] ?? Icons.check_circle_outline.codePoint,
                                          fontFamily: 'MaterialIcons',
                                        ),
                                        size: 16,
                                        color: textPrimary,
                                      ),
                                      const SizedBox(width: 6),
                                      Text(amenity, style: AppTypography.captionMedium(color: textPrimary)),
                                    ],
                                  ),
                                );
                              }).toList(),
                            ),
                            const SizedBox(height: AppDimensions.sm),
                            TextButton(
                              onPressed: () {},
                              child: Text(
                                'View all ${hotel.amenities.length} amenities',
                                style: AppTypography.bodySemiBold(color: AppColors.accent),
                              ),
                            ),
                            const SizedBox(height: AppDimensions.xxl),

                            // ── Nearby ───────────────────────────────────
                            if (hotel.nearbyPlaces != null && hotel.nearbyPlaces!.isNotEmpty) ...[
                              Text('Nearby Attractions', style: AppTypography.sectionTitle(color: textPrimary)),
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
                                            style: AppTypography.body(color: textPrimary),
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

                            // Bottom padding for the booking bar
                            const SizedBox(height: 120),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // ─── FLOATING OVERLAY BUTTONS (back / fav / share) ──────────
          SafeArea(
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _OverlayButton(
                    opacity: _headerOpacity,
                    child: IconButton(
                      icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
                      onPressed: () => context.pop(),
                    ),
                  ),
                  Row(
                    children: [
                      _OverlayButton(
                        opacity: _headerOpacity,
                        child: IconButton(
                          icon: Icon(
                            hotel.isFavorite ? Icons.favorite_rounded : Icons.favorite_border_rounded,
                            color: hotel.isFavorite ? AppColors.error : Colors.white,
                          ),
                          onPressed: () {
                            HapticFeedback.lightImpact();
                          },
                        ),
                      ),
                      const SizedBox(width: 4),
                      _OverlayButton(
                        opacity: _headerOpacity,
                        child: IconButton(
                          icon: const Icon(Icons.share_rounded, color: Colors.white),
                          onPressed: () {},
                        ),
                      ),
                    ],
                  ),
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

/// A floating button that always has a dark tinted circle bg.
class _OverlayButton extends StatelessWidget {
  final Widget child;
  final double opacity;

  const _OverlayButton({required this.child, required this.opacity});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.black.withOpacity(0.28 + opacity * 0.22),
        shape: BoxShape.circle,
      ),
      child: child,
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
                onPressed: () => context.push('/rooms/${hotel.id}'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
