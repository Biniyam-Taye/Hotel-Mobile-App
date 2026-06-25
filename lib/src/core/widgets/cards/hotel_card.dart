import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/theme/app_theme.dart';
import 'package:luxestay/src/data/models/models.dart';

/// Premium hotel card with image, gradient overlay, info, and heart button.
/// Features smooth animations for hover/press and hero transition support.
class HotelCard extends StatefulWidget {
  final Hotel hotel;
  final VoidCallback? onTap;
  final VoidCallback? onFavoriteToggle;
  final bool isCompact;

  const HotelCard({
    super.key,
    required this.hotel,
    this.onTap,
    this.onFavoriteToggle,
    this.isCompact = false,
  });

  @override
  State<HotelCard> createState() => _HotelCardState();
}

class _HotelCardState extends State<HotelCard>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(begin: 1.0, end: 0.97).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final hotel = widget.hotel;
    final cardHeight = widget.isCompact ? 280.0 : AppDimensions.hotelCardHeight;

    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) => Transform.scale(
        scale: _scaleAnimation.value,
        child: child,
      ),
      child: GestureDetector(
        onTapDown: (_) => _controller.forward(),
        onTapUp: (_) {
          _controller.reverse();
          widget.onTap?.call();
        },
        onTapCancel: () => _controller.reverse(),
        child: Container(
          height: cardHeight,
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkCard : AppColors.card,
            borderRadius: BorderRadius.circular(AppDimensions.radiusHotelCard),
            boxShadow: isDark ? null : AppTheme.cardShadow,
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(AppDimensions.radiusHotelCard),
            child: Stack(
              children: [
                // ─── IMAGE ────────────────────────────────────────────
                Positioned.fill(
                  child: Hero(
                    tag: 'hotel_image_${hotel.id}',
                    child: CachedNetworkImage(
                      imageUrl: hotel.images.first,
                      fit: BoxFit.cover,
                      placeholder: (_, __) => Container(
                        color: isDark
                            ? AppColors.darkShimmerBase
                            : AppColors.shimmerBase,
                      ),
                      errorWidget: (_, __, ___) => Container(
                        color: isDark
                            ? AppColors.darkSurfaceVariant
                            : AppColors.surfaceVariant,
                        child: Icon(
                          Icons.hotel_rounded,
                          size: 48,
                          color: AppColors.textTertiary,
                        ),
                      ),
                    ),
                  ),
                ),

                // ─── GRADIENT OVERLAY ─────────────────────────────────
                Positioned.fill(
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.transparent,
                          Colors.transparent,
                          Colors.black.withValues(alpha: 0.3),
                          Colors.black.withValues(alpha: 0.75),
                        ],
                        stops: const [0.0, 0.35, 0.65, 1.0],
                      ),
                    ),
                  ),
                ),

                // ─── DISCOUNT BADGE ───────────────────────────────────
                if (hotel.discount != null)
                  Positioned(
                    top: 16,
                    left: 16,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: AppColors.accent,
                        borderRadius: BorderRadius.circular(
                          AppDimensions.radiusChip,
                        ),
                      ),
                      child: Text(
                        hotel.discount!,
                        style: AppTypography.labelBold(
                          color: AppColors.textOnAccent,
                        ),
                      ),
                    ),
                  ),

                // ─── FAVORITE BUTTON ──────────────────────────────────
                Positioned(
                  top: 16,
                  right: 16,
                  child: _FavoriteButton(
                    isFavorite: hotel.isFavorite,
                    onTap: widget.onFavoriteToggle,
                  ),
                ),

                // ─── BOTTOM INFO ──────────────────────────────────────
                Positioned(
                  left: 16,
                  right: 16,
                  bottom: 16,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      // Name
                      Hero(
                        tag: 'hotel_name_${hotel.id}',
                        child: Material(
                          color: Colors.transparent,
                          child: Text(
                            hotel.name,
                            style: AppTypography.cardTitle(
                              color: Colors.white,
                            ),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ),
                      const SizedBox(height: 4),

                      // Location & Distance
                      Row(
                        children: [
                          Icon(
                            Icons.location_on_outlined,
                            size: 14,
                            color: Colors.white.withValues(alpha: 0.8),
                          ),
                          const SizedBox(width: 4),
                          Expanded(
                            child: Text(
                              hotel.location,
                              style: AppTypography.caption(
                                color: Colors.white.withValues(alpha: 0.8),
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 3,
                            ),
                            decoration: BoxDecoration(
                              color: Colors.white.withValues(alpha: 0.2),
                              borderRadius: BorderRadius.circular(
                                AppDimensions.radiusChip,
                              ),
                            ),
                            child: Text(
                              '${hotel.distance} km',
                              style: AppTypography.label(
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 8),

                      // Rating & Price
                      Row(
                        children: [
                          // Rating
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 8,
                              vertical: 4,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.accent,
                              borderRadius: BorderRadius.circular(
                                AppDimensions.radiusXs,
                              ),
                            ),
                            child: Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                const Icon(
                                  Icons.star_rounded,
                                  size: 14,
                                  color: AppColors.textOnAccent,
                                ),
                                const SizedBox(width: 2),
                                Text(
                                  hotel.rating.toString(),
                                  style: AppTypography.captionMedium(
                                    color: AppColors.textOnAccent,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(width: 6),
                          Text(
                            '(${hotel.reviewCount})',
                            style: AppTypography.caption(
                              color: Colors.white.withValues(alpha: 0.7),
                            ),
                          ),
                          const Spacer(),

                          // Price
                          if (hotel.originalPrice != null) ...[
                            Text(
                              '\$${hotel.originalPrice!.toInt()}',
                              style: AppTypography.priceOld(
                                color: Colors.white.withValues(alpha: 0.5),
                              ),
                            ),
                            const SizedBox(width: 6),
                          ],
                          Text(
                            '\$${hotel.pricePerNight.toInt()}',
                            style: AppTypography.priceSmall(
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            '/night',
                            style: AppTypography.label(
                              color: Colors.white.withValues(alpha: 0.7),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

/// Animated heart/favorite button with scale bounce.
class _FavoriteButton extends StatefulWidget {
  final bool isFavorite;
  final VoidCallback? onTap;

  const _FavoriteButton({required this.isFavorite, this.onTap});

  @override
  State<_FavoriteButton> createState() => _FavoriteButtonState();
}

class _FavoriteButtonState extends State<_FavoriteButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _bounceAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _bounceAnimation = TweenSequence<double>([
      TweenSequenceItem(tween: Tween(begin: 1.0, end: 1.3), weight: 50),
      TweenSequenceItem(tween: Tween(begin: 1.3, end: 1.0), weight: 50),
    ]).animate(CurvedAnimation(parent: _controller, curve: Curves.easeInOut));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        _controller.forward(from: 0);
        widget.onTap?.call();
      },
      child: AnimatedBuilder(
        animation: _bounceAnimation,
        builder: (context, child) => Transform.scale(
          scale: _bounceAnimation.value,
          child: child,
        ),
        child: Container(
          width: 40,
          height: 40,
          decoration: BoxDecoration(
            color: Colors.black.withValues(alpha: 0.3),
            shape: BoxShape.circle,
          ),
          child: Icon(
            widget.isFavorite
                ? Icons.favorite_rounded
                : Icons.favorite_border_rounded,
            size: 20,
            color: widget.isFavorite ? AppColors.error : Colors.white,
          ),
        ),
      ),
    );
  }
}
