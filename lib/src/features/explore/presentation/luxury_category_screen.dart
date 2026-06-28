import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

/// Luxury & Wellness Theme (Luxury Villas, Spa Resorts, Beach Hotels)
class LuxuryCategoryScreen extends StatefulWidget {
  final String categoryName;
  const LuxuryCategoryScreen({super.key, required this.categoryName});

  @override
  State<LuxuryCategoryScreen> createState() => _LuxuryCategoryScreenState();
}

class _LuxuryCategoryScreenState extends State<LuxuryCategoryScreen> {
  final List<Hotel> _properties = MockData.hotels.where((h) => true).toList()..shuffle();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? AppColors.darkBackground : AppColors.background;
    final textPrimary = isDark ? AppColors.darkTextPrimary : AppColors.textPrimary;
    final textSecondary = isDark ? AppColors.darkTextSecondary : AppColors.textSecondary;

    return Scaffold(
      backgroundColor: bg,
      body: SafeArea(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            // ─── MINIMALIST HEADER ────────────────────────────────────
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 32),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        IconButton(
                          padding: EdgeInsets.zero,
                          alignment: Alignment.centerLeft,
                          icon: Icon(Icons.arrow_back_ios_new_rounded, color: textPrimary, size: 20),
                          onPressed: () => context.pop(),
                        ),
                        Icon(Icons.spa_rounded, color: const Color(0xFFD4AF37), size: 24),
                        IconButton(
                          padding: EdgeInsets.zero,
                          alignment: Alignment.centerRight,
                          icon: Icon(Icons.tune_rounded, color: textPrimary, size: 22),
                          onPressed: () {},
                        ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    Text(
                      widget.categoryName,
                      style: AppTypography.heroLarge(color: textPrimary).copyWith(fontWeight: FontWeight.w300),
                    ),
                    const SizedBox(height: 8),
                    Text(
                      'Curated collections for the ultimate relaxation.',
                      style: AppTypography.body(color: textSecondary),
                    ),
                  ],
                ),
              ),
            ),

            // ─── WELLNESS HIGHLIGHTS ──────────────────────────────────
            SliverToBoxAdapter(
              child: SizedBox(
                height: 40,
                child: ListView(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  children: [
                    _LuxuryChip(label: 'Private Pool', isDark: isDark),
                    const SizedBox(width: 8),
                    _LuxuryChip(label: 'Couples Massage', isDark: isDark),
                    const SizedBox(width: 8),
                    _LuxuryChip(label: 'Ocean View', isDark: isDark),
                    const SizedBox(width: 8),
                    _LuxuryChip(label: 'Personal Butler', isDark: isDark),
                  ],
                ),
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 32)),

            // ─── ASYMMETRICAL GRID ────────────────────────────────────
            SliverPadding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              sliver: SliverMasonryGrid.count(
                crossAxisCount: 2,
                mainAxisSpacing: 24,
                crossAxisSpacing: 16,
                itemBuilder: (context, index) {
                  final prop = _properties[index];
                  // Stagger the heights slightly to create an elegant masonry look
                  final isEven = index % 2 == 0;
                  return _LuxuryCard(
                    property: prop,
                    isDark: isDark,
                    imageHeight: isEven ? 240 : 180,
                    onTap: () => context.push('/hotel/${prop.id}'),
                  );
                },
                childCount: _properties.length,
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 40)),
          ],
        ),
      ),
    );
  }
}

class _LuxuryChip extends StatelessWidget {
  final String label;
  final bool isDark;

  const _LuxuryChip({required this.label, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      decoration: BoxDecoration(
        color: isDark ? const Color(0xFF2A2A2A) : const Color(0xFFFAF9F6),
        borderRadius: BorderRadius.circular(30),
        border: Border.all(color: const Color(0xFFD4AF37).withOpacity(0.3)), // Gold border
      ),
      child: Center(
        child: Text(
          label,
          style: AppTypography.captionMedium(color: const Color(0xFFD4AF37)),
        ),
      ),
    );
  }
}

class _LuxuryCard extends StatelessWidget {
  final Hotel property;
  final bool isDark;
  final double imageHeight;
  final VoidCallback onTap;

  const _LuxuryCard({
    required this.property,
    required this.isDark,
    required this.imageHeight,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(12),
            child: CachedNetworkImage(
              imageUrl: property.images.first,
              height: imageHeight,
              width: double.infinity,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            property.name,
            style: AppTypography.bodySemiBold(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 4),
          Text(
            property.location,
            style: AppTypography.caption(color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Text('\$${property.pricePerNight.toInt()}', style: AppTypography.bodyMedium(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
              Text(' / night', style: AppTypography.caption(color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary)),
            ],
          ),
        ],
      ),
    );
  }
}
