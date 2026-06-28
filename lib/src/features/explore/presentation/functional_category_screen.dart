import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';

/// Business & Family — Editorial Catalog with parallax scroll effects.
/// Used for: Business Hotels, Family Hotels, Pet Friendly
class FunctionalCategoryScreen extends StatefulWidget {
  final String categoryName;
  const FunctionalCategoryScreen({super.key, required this.categoryName});

  @override
  State<FunctionalCategoryScreen> createState() => _FunctionalCategoryScreenState();
}

class _FunctionalCategoryScreenState extends State<FunctionalCategoryScreen> {
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

  // Dynamic color per category
  Color get _accentColor {
    if (widget.categoryName.contains('Business')) return const Color(0xFF1565C0);
    if (widget.categoryName.contains('Family')) return const Color(0xFFE91E63);
    if (widget.categoryName.contains('Pet')) return const Color(0xFFFF9800);
    return AppColors.accent;
  }

  IconData get _categoryIcon {
    if (widget.categoryName.contains('Business')) return Icons.business_center_rounded;
    if (widget.categoryName.contains('Family')) return Icons.family_restroom_rounded;
    if (widget.categoryName.contains('Pet')) return Icons.pets_rounded;
    return Icons.hotel_rounded;
  }

  String get _subtitle {
    if (widget.categoryName.contains('Business')) return 'Seamless productivity meets premium comfort.';
    if (widget.categoryName.contains('Family')) return 'Memories that last a lifetime start here.';
    if (widget.categoryName.contains('Pet')) return 'Because your furry friends deserve luxury too.';
    return 'Curated stays for every occasion.';
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0D0D0D) : const Color(0xFFFAFAFA);
    final textPrimary = isDark ? Colors.white : const Color(0xFF111111);

    return Scaffold(
      backgroundColor: bg,
      body: CustomScrollView(
        controller: _scrollController,
        physics: const BouncingScrollPhysics(),
        slivers: [
          // ─── HEADER ───────────────────────────────────────────────
          SliverToBoxAdapter(
            child: SafeArea(
              bottom: false,
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GestureDetector(
                          onTap: () => context.pop(),
                          child: Container(
                            width: 44,
                            height: 44,
                            decoration: BoxDecoration(
                              color: isDark ? Colors.white.withOpacity(0.08) : Colors.black.withOpacity(0.04),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(Icons.arrow_back_rounded, color: textPrimary, size: 20),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                          decoration: BoxDecoration(
                            color: _accentColor.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              Icon(_categoryIcon, size: 16, color: _accentColor),
                              const SizedBox(width: 6),
                              Text(widget.categoryName, style: AppTypography.captionMedium(color: _accentColor)),
                            ],
                          ),
                        ),
                        GestureDetector(
                          onTap: () {},
                          child: Container(
                            width: 44,
                            height: 44,
                            decoration: BoxDecoration(
                              color: isDark ? Colors.white.withOpacity(0.08) : Colors.black.withOpacity(0.04),
                              shape: BoxShape.circle,
                            ),
                            child: Icon(Icons.search_rounded, color: textPrimary, size: 20),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 32),

                    // Big editorial heading
                    Text(
                      widget.categoryName,
                      style: AppTypography.heroLarge(color: textPrimary).copyWith(fontSize: 38, fontWeight: FontWeight.w700),
                    ),
                    const SizedBox(height: 12),
                    Text(_subtitle, style: AppTypography.body(color: AppColors.textTertiary).copyWith(height: 1.5)),
                    const SizedBox(height: 24),

                    // Stats row
                    Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: isDark ? const Color(0xFF1A1A1A) : Colors.white,
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: isDark ? Colors.white.withOpacity(0.06) : Colors.black.withOpacity(0.05)),
                      ),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          _StatColumn(value: '${_properties.length}', label: 'Properties', color: _accentColor),
                          Container(width: 1, height: 32, color: isDark ? Colors.white12 : Colors.black12),
                          _StatColumn(value: '4.7', label: 'Avg Rating', color: _accentColor),
                          Container(width: 1, height: 32, color: isDark ? Colors.white12 : Colors.black12),
                          _StatColumn(value: '${MockData.cities.length}', label: 'Cities', color: _accentColor),
                        ],
                      ),
                    ),
                    const SizedBox(height: 32),
                  ],
                ),
              ),
            ),
          ),

          // ─── PROPERTY LIST ────────────────────────────────────────
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final prop = _properties[index];
                // Alternate between large and small card layouts
                final isLarge = index % 3 == 0;

                return Padding(
                  padding: const EdgeInsets.fromLTRB(20, 0, 20, 24),
                  child: isLarge
                      ? _LargeEditorialCard(
                          property: prop,
                          isDark: isDark,
                          accentColor: _accentColor,
                          scrollOffset: _scrollOffset,
                          cardIndex: index,
                          onTap: () => context.push('/hotel/${prop.id}'),
                        )
                      : _CompactEditorialCard(
                          property: prop,
                          isDark: isDark,
                          accentColor: _accentColor,
                          onTap: () => context.push('/hotel/${prop.id}'),
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

class _StatColumn extends StatelessWidget {
  final String value;
  final String label;
  final Color color;

  const _StatColumn({required this.value, required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(value, style: AppTypography.sectionTitle(color: color)),
        const SizedBox(height: 4),
        Text(label, style: AppTypography.label(color: AppColors.textTertiary)),
      ],
    );
  }
}

/// Large card — full-width image with overlay text. Every 3rd item.
class _LargeEditorialCard extends StatelessWidget {
  final Hotel property;
  final bool isDark;
  final Color accentColor;
  final double scrollOffset;
  final int cardIndex;
  final VoidCallback onTap;

  const _LargeEditorialCard({
    required this.property,
    required this.isDark,
    required this.accentColor,
    required this.scrollOffset,
    required this.cardIndex,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 320,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(isDark ? 0.3 : 0.1),
              blurRadius: 20,
              offset: const Offset(0, 8),
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(24),
          child: Stack(
            fit: StackFit.expand,
            children: [
              CachedNetworkImage(
                imageUrl: property.images.first,
                fit: BoxFit.cover,
                placeholder: (_, __) => Container(color: isDark ? Colors.grey[900] : Colors.grey[200]),
              ),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, Colors.black.withOpacity(0.85)],
                  ),
                ),
              ),
              Positioned(
                left: 24,
                right: 24,
                bottom: 24,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    if (property.discount != null)
                      Padding(
                        padding: const EdgeInsets.only(bottom: 10),
                        child: Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(color: accentColor, borderRadius: BorderRadius.circular(6)),
                          child: Text(property.discount!, style: AppTypography.labelBold(color: Colors.white)),
                        ),
                      ),
                    Text(property.name, style: AppTypography.pageTitle(color: Colors.white), maxLines: 2, overflow: TextOverflow.ellipsis),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Icon(Icons.location_on_outlined, size: 14, color: Colors.white60),
                        const SizedBox(width: 4),
                        Expanded(child: Text(property.location, style: AppTypography.caption(color: Colors.white60), maxLines: 1, overflow: TextOverflow.ellipsis)),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                          decoration: BoxDecoration(color: Colors.white.withOpacity(0.15), borderRadius: BorderRadius.circular(6)),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.star_rounded, size: 14, color: AppColors.accent),
                              const SizedBox(width: 3),
                              Text('${property.rating}', style: AppTypography.labelBold(color: Colors.white)),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text('\$${property.pricePerNight.toInt()}', style: AppTypography.price(color: Colors.white)),
                            const SizedBox(width: 4),
                            Padding(
                              padding: const EdgeInsets.only(bottom: 3),
                              child: Text('/night', style: AppTypography.caption(color: Colors.white38)),
                            ),
                          ],
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                          decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(10)),
                          child: Text('View', style: AppTypography.buttonSmall(color: Colors.black)),
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
    );
  }
}

/// Compact card — horizontal layout with image on the left.
class _CompactEditorialCard extends StatelessWidget {
  final Hotel property;
  final bool isDark;
  final Color accentColor;
  final VoidCallback onTap;

  const _CompactEditorialCard({
    required this.property,
    required this.isDark,
    required this.accentColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 150,
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF1A1A1A) : Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: isDark ? Colors.white.withOpacity(0.06) : Colors.black.withOpacity(0.04)),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(isDark ? 0.2 : 0.04),
              blurRadius: 12,
              offset: const Offset(0, 4),
            ),
          ],
        ),
        child: Row(
          children: [
            // Image
            ClipRRect(
              borderRadius: const BorderRadius.horizontal(left: Radius.circular(20)),
              child: CachedNetworkImage(
                imageUrl: property.images.first,
                width: 130,
                height: 150,
                fit: BoxFit.cover,
                placeholder: (_, __) => Container(width: 130, color: isDark ? Colors.grey[900] : Colors.grey[200]),
              ),
            ),
            // Info
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      property.name,
                      style: AppTypography.bodySemiBold(color: isDark ? Colors.white : Colors.black),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Icon(Icons.location_on_outlined, size: 12, color: accentColor),
                        const SizedBox(width: 4),
                        Expanded(
                          child: Text(property.location, style: AppTypography.label(color: AppColors.textTertiary), maxLines: 1, overflow: TextOverflow.ellipsis),
                        ),
                      ],
                    ),
                    const Spacer(),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 3),
                          decoration: BoxDecoration(color: accentColor, borderRadius: BorderRadius.circular(4)),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.star_rounded, size: 11, color: Colors.white),
                              const SizedBox(width: 2),
                              Text('${property.rating}', style: AppTypography.badge(color: Colors.white)),
                            ],
                          ),
                        ),
                        const SizedBox(width: 8),
                        Text('${property.reviewCount} reviews', style: AppTypography.label(color: AppColors.textTertiary)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text('\$${property.pricePerNight.toInt()}', style: AppTypography.priceSmall(color: isDark ? Colors.white : Colors.black)),
                            Text('/night', style: AppTypography.label(color: AppColors.textTertiary)),
                          ],
                        ),
                        Icon(Icons.arrow_forward_rounded, size: 18, color: accentColor),
                      ],
                    ),
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
