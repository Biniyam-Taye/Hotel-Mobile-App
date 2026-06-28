import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';

/// Business & Family Theme (Business Hotels, Family Hotels, Pet Friendly)
class FunctionalCategoryScreen extends StatefulWidget {
  final String categoryName;
  const FunctionalCategoryScreen({super.key, required this.categoryName});

  @override
  State<FunctionalCategoryScreen> createState() => _FunctionalCategoryScreenState();
}

class _FunctionalCategoryScreenState extends State<FunctionalCategoryScreen> {
  final List<Hotel> _properties = MockData.hotels.where((h) => true).toList()..shuffle();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? AppColors.darkBackground : AppColors.backgroundSecondary;
    final textPrimary = isDark ? AppColors.darkTextPrimary : AppColors.textPrimary;
    
    // Determine filters based on category
    List<String> topFilters = [];
    if (widget.categoryName.contains('Business')) {
      topFilters = ['Fast Wi-Fi', 'Meeting Rooms', 'Gym', 'Airport Shuttle'];
    } else if (widget.categoryName.contains('Family')) {
      topFilters = ['Kids Club', 'Connecting Rooms', 'Pool', 'Cribs Available'];
    } else if (widget.categoryName.contains('Pet')) {
      topFilters = ['Pet Beds', 'Dog Park Nearby', 'Pet Sitting', 'Bowls Provided'];
    } else {
      topFilters = ['Popular', 'Top Rated', 'Budget Friendly', 'Luxury'];
    }

    return Scaffold(
      backgroundColor: bg,
      appBar: AppBar(
        backgroundColor: bg,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: Icon(Icons.arrow_back_rounded, color: textPrimary),
          onPressed: () => context.pop(),
        ),
        title: Text(widget.categoryName, style: AppTypography.cardTitle(color: textPrimary)),
        actions: [
          IconButton(
            icon: Icon(Icons.search_rounded, color: textPrimary),
            onPressed: () {},
          ),
        ],
      ),
      body: Column(
        children: [
          // ─── QUICK FILTERS ─────────────────────────────────────────
          Container(
            height: 50,
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: 16),
              scrollDirection: Axis.horizontal,
              physics: const BouncingScrollPhysics(),
              itemCount: topFilters.length,
              separatorBuilder: (_, __) => const SizedBox(width: 8),
              itemBuilder: (context, index) {
                return _FilterBadge(label: topFilters[index], isDark: isDark);
              },
            ),
          ),
          
          // ─── INFO BAR ──────────────────────────────────────────────
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('${_properties.length} results found', style: AppTypography.bodyMedium(color: AppColors.textTertiary)),
                Row(
                  children: [
                    Icon(Icons.sort_rounded, size: 16, color: AppColors.info),
                    const SizedBox(width: 4),
                    Text('Recommended', style: AppTypography.bodyMedium(color: AppColors.info)),
                  ],
                ),
              ],
            ),
          ),

          // ─── DENSE LIST VIEW ───────────────────────────────────────
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(16, 0, 16, 40),
              physics: const BouncingScrollPhysics(),
              itemCount: _properties.length,
              separatorBuilder: (_, __) => const SizedBox(height: 16),
              itemBuilder: (context, index) {
                final prop = _properties[index];
                return _FunctionalCard(
                  property: prop,
                  isDark: isDark,
                  onTap: () => context.push('/hotel/${prop.id}'),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _FilterBadge extends StatelessWidget {
  final String label;
  final bool isDark;

  const _FilterBadge({required this.label, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      alignment: Alignment.center,
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : Colors.white,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
      ),
      child: Text(label, style: AppTypography.captionMedium(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
    );
  }
}

class _FunctionalCard extends StatelessWidget {
  final Hotel property;
  final bool isDark;
  final VoidCallback onTap;

  const _FunctionalCard({required this.property, required this.isDark, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 140,
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
        ),
        child: Row(
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.horizontal(left: Radius.circular(12)),
              child: CachedNetworkImage(
                imageUrl: property.images.first,
                width: 120,
                height: 140,
                fit: BoxFit.cover,
              ),
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      property.name,
                      style: AppTypography.bodySemiBold(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Icon(Icons.location_on_rounded, size: 12, color: AppColors.textTertiary),
                        const SizedBox(width: 4),
                        Expanded(child: Text(property.location, style: AppTypography.caption(color: AppColors.textTertiary), maxLines: 1, overflow: TextOverflow.ellipsis)),
                      ],
                    ),
                    const Spacer(),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(color: AppColors.info, borderRadius: BorderRadius.circular(4)),
                          child: Text('${property.rating}', style: AppTypography.labelBold(color: Colors.white)),
                        ),
                        const SizedBox(width: 8),
                        Text('${property.reviewCount} reviews', style: AppTypography.caption(color: AppColors.textTertiary)),
                      ],
                    ),
                    const SizedBox(height: 8),
                    Align(
                      alignment: Alignment.centerRight,
                      child: Text('\$${property.pricePerNight.toInt()}', style: AppTypography.cardTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
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
