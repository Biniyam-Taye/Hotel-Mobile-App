import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';

/// Apartments Category — Modern masonry grid layout highlighting long stays and spaces.
class ApartmentsCategoryScreen extends StatefulWidget {
  const ApartmentsCategoryScreen({super.key});

  @override
  State<ApartmentsCategoryScreen> createState() => _ApartmentsCategoryScreenState();
}

class _ApartmentsCategoryScreenState extends State<ApartmentsCategoryScreen> {
  final List<Hotel> _apartments = MockData.hotels.where((h) => true).toList()..shuffle();

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
            // ─── SIMPLE HEADER ─────────────────────────────────────────
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 20, 20, 10),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                        color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                        shape: BoxShape.circle,
                      ),
                      child: IconButton(
                        icon: Icon(Icons.arrow_back_rounded, color: isDark ? Colors.white : Colors.black),
                        onPressed: () => context.pop(),
                      ),
                    ),
                    Text('Apartments', style: AppTypography.pageTitle(color: textPrimary)),
                    IconButton(
                      icon: Icon(Icons.search_rounded, color: textPrimary),
                      onPressed: () {},
                    ),
                  ],
                ),
              ),
            ),

            // ─── INFO BANNER ───────────────────────────────────────────
            SliverToBoxAdapter(
              child: Container(
                margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkCard : AppColors.accentSurface,
                  borderRadius: BorderRadius.circular(16),
                  border: isDark ? Border.all(color: AppColors.darkBorder) : null,
                ),
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppColors.accent.withOpacity(0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.home_work_rounded, color: AppColors.accentDark, size: 28),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Extended Stays', style: AppTypography.cardTitle(color: textPrimary)),
                          const SizedBox(height: 4),
                          Text('Save up to 30% when you book for 7+ nights', style: AppTypography.captionMedium(color: textSecondary)),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            // ─── QUICK FILTERS ─────────────────────────────────────────
            SliverToBoxAdapter(
              child: SizedBox(
                height: 40,
                child: ListView(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  scrollDirection: Axis.horizontal,
                  physics: const BouncingScrollPhysics(),
                  children: [
                    _FilterChip(label: 'Any Price', icon: Icons.attach_money_rounded, isDark: isDark),
                    const SizedBox(width: 8),
                    _FilterChip(label: 'Full Kitchen', icon: Icons.kitchen_rounded, isDark: isDark),
                    const SizedBox(width: 8),
                    _FilterChip(label: 'Washer', icon: Icons.local_laundry_service_rounded, isDark: isDark),
                    const SizedBox(width: 8),
                    _FilterChip(label: 'Workspace', icon: Icons.desk_rounded, isDark: isDark),
                  ],
                ),
              ),
            ),

            // ─── MASONRY GRID ──────────────────────────────────────────
            SliverPadding(
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 40),
              sliver: SliverMasonryGrid.count(
                crossAxisCount: 2,
                mainAxisSpacing: 16,
                crossAxisSpacing: 16,
                itemBuilder: (context, index) {
                  final apartment = _apartments[index];
                  return _ApartmentCard(
                    apartment: apartment,
                    isDark: isDark,
                    onTap: () => context.push('/hotel/${apartment.id}'),
                    heightFactor: index % 3 == 0 ? 1.4 : 1.0, // Staggered heights
                  );
                },
                childCount: _apartments.length,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final IconData icon;
  final bool isDark;

  const _FilterChip({required this.label, required this.icon, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 16, color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
          const SizedBox(width: 6),
          Text(label, style: AppTypography.captionMedium(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
        ],
      ),
    );
  }
}

class _ApartmentCard extends StatelessWidget {
  final Hotel apartment;
  final bool isDark;
  final VoidCallback onTap;
  final double heightFactor;

  const _ApartmentCard({
    required this.apartment,
    required this.isDark,
    required this.onTap,
    required this.heightFactor,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.card,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, 4)),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
              child: CachedNetworkImage(
                imageUrl: apartment.images.first,
                height: 140 * heightFactor,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(
                          apartment.name,
                          style: AppTypography.cardTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary).copyWith(fontSize: 16),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      Row(
                        children: [
                          const Icon(Icons.star_rounded, size: 14, color: AppColors.warning),
                          const SizedBox(width: 2),
                          Text('${apartment.rating}', style: AppTypography.captionMedium(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text(apartment.location, style: AppTypography.caption(color: AppColors.textTertiary), maxLines: 1, overflow: TextOverflow.ellipsis),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Text('\$${apartment.pricePerNight.toInt()}', style: AppTypography.bodySemiBold(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                      Text('/night', style: AppTypography.caption(color: AppColors.textTertiary)),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
