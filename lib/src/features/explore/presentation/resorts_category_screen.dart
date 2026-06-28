import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';

/// Resorts Category — Immersive, large imagery layout focused on relaxation and amenities.
class ResortsCategoryScreen extends StatefulWidget {
  const ResortsCategoryScreen({super.key});

  @override
  State<ResortsCategoryScreen> createState() => _ResortsCategoryScreenState();
}

class _ResortsCategoryScreenState extends State<ResortsCategoryScreen> {
  final List<Hotel> _resorts = MockData.hotels.where((h) => true).toList()..shuffle();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? AppColors.darkBackground : AppColors.backgroundSecondary;

    return Scaffold(
      backgroundColor: bg,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          // ─── TRANSLUCENT APP BAR ──────────────────────────────────
          SliverAppBar(
            expandedHeight: 120,
            pinned: true,
            backgroundColor: bg,
            elevation: 0,
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkSurfaceVariant : Colors.white,
                  shape: BoxShape.circle,
                  boxShadow: [
                    if (!isDark) BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10),
                  ],
                ),
                child: IconButton(
                  icon: Icon(Icons.arrow_back_rounded, color: isDark ? Colors.white : Colors.black),
                  onPressed: () => context.pop(),
                ),
              ),
            ),
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: const EdgeInsets.only(left: 20, bottom: 16),
              title: Text(
                'Luxury Resorts',
                style: AppTypography.pageTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
              ),
              background: Stack(
                children: [
                  Positioned(
                    right: -20,
                    top: -20,
                    child: Icon(
                      Icons.beach_access_rounded,
                      size: 150,
                      color: AppColors.accent.withOpacity(isDark ? 0.05 : 0.2),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // ─── TOP DESTINATIONS CAROUSEL ───────────────────────────
          SliverToBoxAdapter(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
                  child: Text('Trending Destinations', style: AppTypography.sectionTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  height: 140,
                  child: ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    scrollDirection: Axis.horizontal,
                    physics: const BouncingScrollPhysics(),
                    itemCount: 4,
                    separatorBuilder: (_, __) => const SizedBox(width: 16),
                    itemBuilder: (context, index) {
                      final city = MockData.cities[index];
                      return _DestinationPill(city: city, isDark: isDark);
                    },
                  ),
                ),
                const SizedBox(height: 32),
              ],
            ),
          ),

          // ─── FULL WIDTH RESORT CARDS ─────────────────────────────
          SliverList(
            delegate: SliverChildBuilderDelegate(
              (context, index) {
                final resort = _resorts[index];
                return Padding(
                  padding: const EdgeInsets.only(bottom: 32),
                  child: _ResortCard(resort: resort, isDark: isDark, onTap: () => context.push('/hotel/${resort.id}')),
                );
              },
              childCount: _resorts.length,
            ),
          ),
          
          const SliverToBoxAdapter(child: SizedBox(height: 40)),
        ],
      ),
    );
  }
}

class _DestinationPill extends StatelessWidget {
  final City city;
  final bool isDark;

  const _DestinationPill({required this.city, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 120,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        image: DecorationImage(
          image: CachedNetworkImageProvider(city.image),
          fit: BoxFit.cover,
        ),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          gradient: const LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [Colors.transparent, Colors.black87],
          ),
        ),
        padding: const EdgeInsets.all(12),
        alignment: Alignment.bottomLeft,
        child: Text(city.name, style: AppTypography.bodySemiBold(color: Colors.white)),
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
        margin: const EdgeInsets.symmetric(horizontal: 20),
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.surface,
          borderRadius: BorderRadius.circular(24),
          boxShadow: [
            BoxShadow(color: Colors.black.withOpacity(isDark ? 0.2 : 0.05), blurRadius: 20, offset: const Offset(0, 8)),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Large Hero Image
            Stack(
              children: [
                ClipRRect(
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
                  child: CachedNetworkImage(
                    imageUrl: resort.images.first,
                    height: 240,
                    width: double.infinity,
                    fit: BoxFit.cover,
                  ),
                ),
                Positioned(
                  top: 16,
                  right: 16,
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(color: Colors.black45, shape: BoxShape.circle),
                    child: const Icon(Icons.favorite_border_rounded, color: Colors.white, size: 20),
                  ),
                ),
                if (resort.discount != null)
                  Positioned(
                    top: 16,
                    left: 16,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(color: AppColors.error, borderRadius: BorderRadius.circular(20)),
                      child: Text(resort.discount!, style: AppTypography.badge(color: Colors.white)),
                    ),
                  ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(
                        child: Text(resort.name, style: AppTypography.pageTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary), maxLines: 1, overflow: TextOverflow.ellipsis),
                      ),
                      Row(
                        children: [
                          const Icon(Icons.star_rounded, size: 20, color: AppColors.warning),
                          const SizedBox(width: 4),
                          Text('${resort.rating}', style: AppTypography.bodySemiBold(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Icon(Icons.location_on_outlined, size: 16, color: AppColors.textTertiary),
                      const SizedBox(width: 4),
                      Text(resort.location, style: AppTypography.bodyMedium(color: AppColors.textTertiary)),
                    ],
                  ),
                  const SizedBox(height: 16),
                  // Amenities row
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: resort.amenities.take(3).map((a) {
                      return Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                        decoration: BoxDecoration(
                          color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(a, style: AppTypography.caption(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                      );
                    }).toList(),
                  ),
                  const SizedBox(height: 20),
                  const Divider(),
                  const SizedBox(height: 16),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text('Price from', style: AppTypography.caption(color: AppColors.textTertiary)),
                          Row(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text('\$${resort.pricePerNight.toInt()}', style: AppTypography.price(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                              const SizedBox(width: 4),
                              Text('/night', style: AppTypography.caption(color: AppColors.textTertiary)),
                            ],
                          ),
                        ],
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                        decoration: BoxDecoration(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary, borderRadius: BorderRadius.circular(12)),
                        child: Text('View Details', style: AppTypography.buttonSmall(color: isDark ? AppColors.textPrimary : Colors.white)),
                      ),
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
