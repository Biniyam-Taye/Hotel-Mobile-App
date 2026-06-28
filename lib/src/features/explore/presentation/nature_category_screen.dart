import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';

/// Nature & Adventure Theme (Cabins, Eco Lodge, Camping, Mountain Hotels)
class NatureCategoryScreen extends StatefulWidget {
  final String categoryName;
  const NatureCategoryScreen({super.key, required this.categoryName});

  @override
  State<NatureCategoryScreen> createState() => _NatureCategoryScreenState();
}

class _NatureCategoryScreenState extends State<NatureCategoryScreen> {
  final List<Hotel> _properties = MockData.hotels.where((h) => true).toList()..shuffle();

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? AppColors.darkBackground : AppColors.backgroundSecondary;
    final textPrimary = isDark ? AppColors.darkTextPrimary : AppColors.textPrimary;
    
    // Determine icon based on name
    IconData icon = Icons.nature_people_rounded;
    if (widget.categoryName.contains('Cabin')) icon = Icons.cabin_rounded;
    if (widget.categoryName.contains('Eco')) icon = Icons.eco_rounded;
    if (widget.categoryName.contains('Mountain')) icon = Icons.landscape_rounded;
    if (widget.categoryName.contains('Camp')) icon = Icons.fireplace_rounded;

    return Scaffold(
      backgroundColor: bg,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          // ─── HERO HEADER ──────────────────────────────────────────
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            backgroundColor: const Color(0xFF2E4631), // Earthy green
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                decoration: BoxDecoration(color: Colors.black45, shape: BoxShape.circle),
                child: IconButton(
                  icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
                  onPressed: () => context.pop(),
                ),
              ),
            ),
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: const EdgeInsets.only(left: 20, bottom: 16),
              title: Text(widget.categoryName, style: AppTypography.pageTitle(color: Colors.white)),
              background: Stack(
                fit: StackFit.expand,
                children: [
                  CachedNetworkImage(
                    imageUrl: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&q=80', // Forest/Cabin vibe
                    fit: BoxFit.cover,
                  ),
                  Container(
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.transparent, Colors.black87],
                      ),
                    ),
                  ),
                  Positioned(
                    right: -20,
                    bottom: -20,
                    child: Icon(icon, size: 180, color: Colors.white.withOpacity(0.1)),
                  ),
                ],
              ),
            ),
          ),

          // ─── ACTIVITIES ─────────────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 16),
              child: Text('Popular Activities', style: AppTypography.sectionTitle(color: textPrimary)),
            ),
          ),
          SliverToBoxAdapter(
            child: SizedBox(
              height: 100,
              child: ListView(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                scrollDirection: Axis.horizontal,
                physics: const BouncingScrollPhysics(),
                children: [
                  _ActivityCard(title: 'Hiking', icon: Icons.directions_walk_rounded, isDark: isDark),
                  const SizedBox(width: 12),
                  _ActivityCard(title: 'Stargazing', icon: Icons.nights_stay_rounded, isDark: isDark),
                  const SizedBox(width: 12),
                  _ActivityCard(title: 'Fishing', icon: Icons.phishing_rounded, isDark: isDark),
                  const SizedBox(width: 12),
                  _ActivityCard(title: 'Campfire', icon: Icons.local_fire_department_rounded, isDark: isDark),
                ],
              ),
            ),
          ),

          // ─── LISTINGS ───────────────────────────────────────────────
          SliverPadding(
            padding: const EdgeInsets.fromLTRB(20, 32, 20, 40),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final prop = _properties[index];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 24),
                    child: _NatureCard(property: prop, isDark: isDark, onTap: () => context.push('/hotel/${prop.id}')),
                  );
                },
                childCount: _properties.length,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _ActivityCard extends StatelessWidget {
  final String title;
  final IconData icon;
  final bool isDark;

  const _ActivityCard({required this.title, required this.icon, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 90,
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.04), blurRadius: 10, offset: const Offset(0, 4))],
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 28, color: const Color(0xFF2E4631)),
          const SizedBox(height: 8),
          Text(title, style: AppTypography.captionMedium(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
        ],
      ),
    );
  }
}

class _NatureCard extends StatelessWidget {
  final Hotel property;
  final bool isDark;
  final VoidCallback onTap;

  const _NatureCard({required this.property, required this.isDark, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 12, offset: const Offset(0, 6))],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
              child: CachedNetworkImage(
                imageUrl: property.images.first,
                height: 180,
                width: double.infinity,
                fit: BoxFit.cover,
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Expanded(child: Text(property.name, style: AppTypography.cardTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary))),
                      Row(
                        children: [
                          const Icon(Icons.star_rounded, size: 16, color: AppColors.warning),
                          const SizedBox(width: 4),
                          Text('${property.rating}', style: AppTypography.bodySemiBold(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                        ],
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(property.location, style: AppTypography.caption(color: AppColors.textTertiary)),
                  const SizedBox(height: 16),
                  Row(
                    children: [
                      const Icon(Icons.nature_rounded, size: 16, color: Color(0xFF2E4631)),
                      const SizedBox(width: 4),
                      Text('Immersive Nature', style: AppTypography.captionMedium(color: const Color(0xFF2E4631))),
                      const Spacer(),
                      Text('\$${property.pricePerNight.toInt()}', style: AppTypography.bodySemiBold(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
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
