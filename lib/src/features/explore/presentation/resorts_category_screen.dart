import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';

/// Resorts Category — Cinematic horizontal carousel with hero imagery.
class ResortsCategoryScreen extends StatefulWidget {
  const ResortsCategoryScreen({super.key});

  @override
  State<ResortsCategoryScreen> createState() => _ResortsCategoryScreenState();
}

class _ResortsCategoryScreenState extends State<ResortsCategoryScreen> {
  late final PageController _pageController;
  final List<Hotel> _resorts = MockData.hotels.toList()..shuffle();
  double _currentPageValue = 0;

  @override
  void initState() {
    super.initState();
    _pageController = PageController(viewportFraction: 0.88)
      ..addListener(() {
        setState(() => _currentPageValue = _pageController.page ?? 0);
      });
  }

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0A0A0A) : const Color(0xFFF8F6F2);
    final textPrimary = isDark ? Colors.white : const Color(0xFF1A1A1A);

    return Scaffold(
      backgroundColor: bg,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ─── HEADER ─────────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  GestureDetector(
                    onTap: () => context.pop(),
                    child: Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        color: isDark ? Colors.white.withOpacity(0.08) : Colors.black.withOpacity(0.05),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(Icons.arrow_back_rounded, color: textPrimary, size: 20),
                    ),
                  ),
                  Column(
                    children: [
                      Text('EXPLORE', style: AppTypography.label(color: AppColors.textTertiary).copyWith(letterSpacing: 2)),
                      const SizedBox(height: 2),
                      Text('Resorts', style: AppTypography.cardTitle(color: textPrimary)),
                    ],
                  ),
                  GestureDetector(
                    onTap: () {},
                    child: Container(
                      width: 44,
                      height: 44,
                      decoration: BoxDecoration(
                        color: isDark ? Colors.white.withOpacity(0.08) : Colors.black.withOpacity(0.05),
                        shape: BoxShape.circle,
                      ),
                      child: Icon(Icons.search_rounded, color: textPrimary, size: 20),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),

            // ─── SUBTITLE ───────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 24),
              child: Text(
                'Escape to paradise. Swipe to explore our handpicked resort destinations.',
                style: AppTypography.caption(color: AppColors.textTertiary),
                textAlign: TextAlign.center,
              ),
            ),
            const SizedBox(height: 28),

            // ─── HORIZONTAL CAROUSEL ────────────────────────────────
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                physics: const BouncingScrollPhysics(),
                itemCount: _resorts.length,
                itemBuilder: (context, index) {
                  final resort = _resorts[index];
                  final diff = (index - _currentPageValue).abs();
                  final scale = 1 - (diff * 0.08).clamp(0.0, 0.08);
                  final opacity = 1 - (diff * 0.3).clamp(0.0, 0.3);

                  return TweenAnimationBuilder<double>(
                    tween: Tween(begin: scale, end: scale),
                    duration: Duration.zero,
                    builder: (context, value, child) {
                      return Transform.scale(
                        scale: value,
                        child: Opacity(
                          opacity: opacity,
                          child: _ResortCard(
                            resort: resort,
                            isDark: isDark,
                            onTap: () => context.push('/hotel/${resort.id}'),
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
            const SizedBox(height: 20),

            // ─── PAGE DOTS ──────────────────────────────────────────
            Center(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: List.generate(_resorts.length.clamp(0, 8), (i) {
                  final isActive = i == _currentPageValue.round();
                  return AnimatedContainer(
                    duration: const Duration(milliseconds: 250),
                    margin: const EdgeInsets.symmetric(horizontal: 3),
                    width: isActive ? 24 : 8,
                    height: 8,
                    decoration: BoxDecoration(
                      color: isActive ? textPrimary : textPrimary.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(4),
                    ),
                  );
                }),
              ),
            ),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }
}

class _ResortCard extends StatelessWidget {
  final Hotel resort;
  final bool isDark;
  final VoidCallback onTap;

  const _ResortCard({required this.resort, required this.isDark, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 6, vertical: 4),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(32),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(isDark ? 0.4 : 0.12),
              blurRadius: 30,
              offset: const Offset(0, 12),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(32),
          child: Stack(
            fit: StackFit.expand,
            children: [
              // Background image
              CachedNetworkImage(
                imageUrl: resort.images.first,
                fit: BoxFit.cover,
                placeholder: (_, __) => Container(color: isDark ? Colors.grey[900] : Colors.grey[200]),
                errorWidget: (_, __, ___) => Container(color: Colors.grey[800]),
              ),

              // Gradient overlay
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      Colors.transparent,
                      Colors.black.withOpacity(0.7),
                      Colors.black.withOpacity(0.92),
                    ],
                    stops: const [0.0, 0.35, 0.7, 1.0],
                  ),
                ),
              ),

              // ─── CONTENT ──────────────────────────────────────────
              Positioned(
                left: 24,
                right: 24,
                bottom: 28,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Amenity chips
                    Wrap(
                      spacing: 8,
                      runSpacing: 6,
                      children: resort.amenities.take(3).map((a) {
                        return Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                          decoration: BoxDecoration(
                            color: Colors.white.withOpacity(0.15),
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: Colors.white.withOpacity(0.1)),
                          ),
                          child: Text(a, style: AppTypography.label(color: Colors.white70)),
                        );
                      }).toList(),
                    ),
                    const SizedBox(height: 16),

                    // Name
                    Text(
                      resort.name,
                      style: AppTypography.heroLarge(color: Colors.white).copyWith(fontSize: 28),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 8),

                    // Location + Rating
                    Row(
                      children: [
                        Icon(Icons.location_on_outlined, size: 14, color: Colors.white60),
                        const SizedBox(width: 4),
                        Expanded(
                          child: Text(resort.location, style: AppTypography.caption(color: Colors.white60), maxLines: 1, overflow: TextOverflow.ellipsis),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.accent,
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.star_rounded, size: 12, color: AppColors.textOnAccent),
                              const SizedBox(width: 3),
                              Text('${resort.rating}', style: AppTypography.labelBold(color: AppColors.textOnAccent)),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 20),

                    // Price + CTA
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text('\$${resort.pricePerNight.toInt()}', style: AppTypography.price(color: Colors.white)),
                            const SizedBox(width: 4),
                            Padding(
                              padding: const EdgeInsets.only(bottom: 3),
                              child: Text('/night', style: AppTypography.caption(color: Colors.white38)),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                          decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Text('Explore', style: AppTypography.buttonSmall(color: Colors.black)),
                              const SizedBox(width: 6),
                              const Icon(Icons.arrow_forward_rounded, size: 16, color: Colors.black),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),

              // Discount badge top left
              if (resort.discount != null)
                Positioned(
                  top: 20,
                  left: 20,
                  child: Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppColors.error,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Text(resort.discount!, style: AppTypography.labelBold(color: Colors.white)),
                  ),
                ),

              // Favorite button top right
              Positioned(
                top: 20,
                right: 20,
                child: Container(
                  width: 42,
                  height: 42,
                  decoration: BoxDecoration(
                    color: Colors.black.withOpacity(0.3),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(Icons.favorite_border_rounded, color: Colors.white, size: 20),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
