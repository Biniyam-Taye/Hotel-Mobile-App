import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

/// Luxury & Wellness — Minimalist editorial asymmetrical masonry grid.
/// Used for: Luxury Villas, Spa Resorts, Beach Hotels
class LuxuryCategoryScreen extends StatefulWidget {
  final String categoryName;
  const LuxuryCategoryScreen({super.key, required this.categoryName});

  @override
  State<LuxuryCategoryScreen> createState() => _LuxuryCategoryScreenState();
}

class _LuxuryCategoryScreenState extends State<LuxuryCategoryScreen> {
  final List<Hotel> _properties = MockData.hotels.toList()..shuffle();
  final ScrollController _scrollController = ScrollController();
  double _scrollOffset = 0;

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      setState(() => _scrollOffset = _scrollController.offset);
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  // Dynamic accent based on category
  Color get _accentColor {
    if (widget.categoryName.contains('Luxury')) return const Color(0xFFD4AF37); // Gold
    if (widget.categoryName.contains('Spa')) return const Color(0xFF7E57C2); // Purple
    if (widget.categoryName.contains('Beach')) return const Color(0xFF26C6DA); // Teal
    return AppColors.accent;
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0A0A0A) : Colors.white;
    final textPrimary = isDark ? Colors.white : const Color(0xFF111111);

    return Scaffold(
      backgroundColor: bg,
      body: CustomScrollView(
        controller: _scrollController,
        physics: const BouncingScrollPhysics(),
        slivers: [
          // ─── HERO HEADER ──────────────────────────────────────────
          SliverToBoxAdapter(
            child: SafeArea(
              bottom: false,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(24, 16, 24, 0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Top bar
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GestureDetector(
                          onTap: () => context.pop(),
                          child: Icon(Icons.arrow_back_ios_new_rounded, color: textPrimary, size: 20),
                        ),
                        Container(
                          width: 6,
                          height: 6,
                          decoration: BoxDecoration(color: _accentColor, shape: BoxShape.circle),
                        ),
                        Icon(Icons.tune_rounded, color: textPrimary, size: 22),
                      ],
                    ),
                    const SizedBox(height: 40),

                    // Large editorial title
                    Text(
                      widget.categoryName,
                      style: AppTypography.heroLarge(color: textPrimary).copyWith(
                        fontSize: 48,
                        fontWeight: FontWeight.w300,
                        letterSpacing: -1.5,
                        height: 1.05,
                      ),
                    ),
                    const SizedBox(height: 16),

                    // Thin divider line with accent color
                    Container(
                      width: 60,
                      height: 2,
                      color: _accentColor,
                    ),
                    const SizedBox(height: 16),

                    Text(
                      'A curated selection of the finest properties. Refined taste, unmatched comfort.',
                      style: AppTypography.body(color: isDark ? Colors.white54 : AppColors.textTertiary).copyWith(height: 1.6),
                    ),
                    const SizedBox(height: 32),
                  ],
                ),
              ),
            ),
          ),

          // ─── FEATURED HIGHLIGHT ───────────────────────────────────
          if (_properties.isNotEmpty)
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(24, 0, 24, 32),
                child: GestureDetector(
                  onTap: () => context.push('/hotel/${_properties.first.id}'),
                  child: Container(
                    height: 380,
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(20),
                      image: DecorationImage(
                        image: CachedNetworkImageProvider(_properties.first.images.first),
                        fit: BoxFit.cover,
                      ),
                    ),
                    child: Container(
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.circular(20),
                        gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [Colors.transparent, Colors.black.withOpacity(0.8)],
                        ),
                      ),
                      padding: const EdgeInsets.all(24),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.end,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                            decoration: BoxDecoration(
                              color: _accentColor,
                              borderRadius: BorderRadius.circular(6),
                            ),
                            child: Text('FEATURED', style: AppTypography.badge(color: Colors.white)),
                          ),
                          const SizedBox(height: 12),
                          Text(
                            _properties.first.name,
                            style: AppTypography.pageTitle(color: Colors.white),
                          ),
                          const SizedBox(height: 6),
                          Row(
                            children: [
                              Icon(Icons.location_on_outlined, size: 14, color: Colors.white60),
                              const SizedBox(width: 4),
                              Text(_properties.first.location, style: AppTypography.caption(color: Colors.white60)),
                              const Spacer(),
                              Text(
                                '\$${_properties.first.pricePerNight.toInt()} / night',
                                style: AppTypography.bodySemiBold(color: Colors.white),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ),

          // ─── SECTION TITLE ────────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(24, 0, 24, 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('All Properties', style: AppTypography.sectionTitle(color: textPrimary)),
                  Text('${_properties.length} results', style: AppTypography.caption(color: AppColors.textTertiary)),
                ],
              ),
            ),
          ),

          // ─── EDITORIAL ASYMMETRIC GRID ────────────────────────────
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            sliver: SliverMasonryGrid.count(
              crossAxisCount: 2,
              mainAxisSpacing: 20,
              crossAxisSpacing: 16,
              itemBuilder: (context, index) {
                if (index >= _properties.length) return const SizedBox.shrink();
                final prop = _properties[index];
                final isEven = index % 2 == 0;

                return GestureDetector(
                  onTap: () => context.push('/hotel/${prop.id}'),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Image with parallax-like offset based on scroll
                      ClipRRect(
                        borderRadius: BorderRadius.circular(16),
                        child: CachedNetworkImage(
                          imageUrl: prop.images.first,
                          height: isEven ? 260 : 200,
                          width: double.infinity,
                          fit: BoxFit.cover,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        prop.name,
                        style: AppTypography.bodySemiBold(color: textPrimary),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Row(
                        children: [
                          Icon(Icons.star_rounded, size: 13, color: _accentColor),
                          const SizedBox(width: 3),
                          Text('${prop.rating}', style: AppTypography.caption(color: textPrimary)),
                          const SizedBox(width: 8),
                          Text(prop.location, style: AppTypography.label(color: AppColors.textTertiary), maxLines: 1, overflow: TextOverflow.ellipsis),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Row(
                        children: [
                          Text('\$${prop.pricePerNight.toInt()}', style: AppTypography.bodyMedium(color: textPrimary)),
                          Text(' / night', style: AppTypography.label(color: AppColors.textTertiary)),
                        ],
                      ),
                    ],
                  ),
                );
              },
              childCount: _properties.length,
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: 60)),
        ],
      ),
    );
  }
}
