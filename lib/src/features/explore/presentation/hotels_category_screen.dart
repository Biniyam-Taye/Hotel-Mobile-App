import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';

/// Hotels Category — Professional grid layout with star filters and editor picks.
class HotelsCategoryScreen extends StatefulWidget {
  const HotelsCategoryScreen({super.key});

  @override
  State<HotelsCategoryScreen> createState() => _HotelsCategoryScreenState();
}

class _HotelsCategoryScreenState extends State<HotelsCategoryScreen> {
  int _selectedStarFilter = 0; // 0 = all
  final List<Hotel> _hotels = MockData.hotels.where((h) => true).toList();

  List<Hotel> get _filteredHotels {
    if (_selectedStarFilter == 0) return _hotels;
    return _hotels.where((h) => h.rating >= _selectedStarFilter).toList();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? AppColors.darkBackground : AppColors.background;
    final textPrimary = isDark ? AppColors.darkTextPrimary : AppColors.textPrimary;
    final textSecondary = isDark ? AppColors.darkTextSecondary : AppColors.textSecondary;

    return Scaffold(
      backgroundColor: bg,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          // ─── COLLAPSED HEADER ──────────────────────────────────────
          SliverAppBar(
            expandedHeight: 260,
            pinned: true,
            backgroundColor: const Color(0xFF1A1A2E),
            leading: _BackBtn(),
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  // Dark gradient background
                  Container(
                    decoration: const BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [Color(0xFF1A1A2E), Color(0xFF16213E), Color(0xFF0F3460)],
                      ),
                    ),
                  ),
                  // Decorative circles
                  Positioned(
                    top: -50,
                    right: -30,
                    child: Container(
                      width: 200,
                      height: 200,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: Colors.white.withOpacity(0.04),
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: -40,
                    left: -20,
                    child: Container(
                      width: 140,
                      height: 140,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: AppColors.accent.withOpacity(0.08),
                      ),
                    ),
                  ),
                  // Content
                  Positioned(
                    bottom: 40,
                    left: 24,
                    right: 24,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: AppColors.accent,
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text('PREMIUM COLLECTION', style: AppTypography.badge(color: AppColors.textOnAccent)),
                        ),
                        const SizedBox(height: 14),
                        Text('Discover Hotels', style: AppTypography.heroLarge(color: Colors.white)),
                        const SizedBox(height: 8),
                        Text(
                          'Handpicked luxury stays across ${MockData.cities.length} cities worldwide',
                          style: AppTypography.body(color: Colors.white70),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // ─── QUICK STATS BAR ───────────────────────────────────────
          SliverToBoxAdapter(
            child: Container(
              margin: const EdgeInsets.fromLTRB(20, 20, 20, 0),
              padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
              decoration: BoxDecoration(
                color: isDark ? AppColors.darkCard : AppColors.card,
                borderRadius: BorderRadius.circular(16),
                boxShadow: [
                  BoxShadow(color: Colors.black.withOpacity(0.06), blurRadius: 16, offset: const Offset(0, 4)),
                ],
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  _StatItem(icon: Icons.hotel_rounded, value: '${_hotels.length}', label: 'Hotels', color: const Color(0xFF0F3460)),
                  Container(width: 1, height: 36, color: AppColors.border),
                  _StatItem(icon: Icons.location_city_rounded, value: '${MockData.cities.length}', label: 'Cities', color: AppColors.info),
                  Container(width: 1, height: 36, color: AppColors.border),
                  _StatItem(icon: Icons.star_rounded, value: '4.7+', label: 'Avg Rating', color: AppColors.warning),
                ],
              ),
            ),
          ),

          // ─── STAR FILTER CHIPS ─────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 8),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Filter by Rating', style: AppTypography.captionMedium(color: textSecondary)),
                  const SizedBox(height: 10),
                  Wrap(
                    spacing: 8,
                    children: [
                      _FilterChip(label: 'All', isSelected: _selectedStarFilter == 0, onTap: () => setState(() => _selectedStarFilter = 0), isDark: isDark),
                      _FilterChip(label: '⭐ 3+', isSelected: _selectedStarFilter == 3, onTap: () => setState(() => _selectedStarFilter = 3), isDark: isDark),
                      _FilterChip(label: '⭐ 4+', isSelected: _selectedStarFilter == 4, onTap: () => setState(() => _selectedStarFilter = 4), isDark: isDark),
                      _FilterChip(label: '⭐ 4.5+', isSelected: _selectedStarFilter == 4.5.toInt(), onTap: () => setState(() => _selectedStarFilter = 5), isDark: isDark),
                    ],
                  ),
                ],
              ),
            ),
          ),

          // ─── EDITOR'S PICK ─────────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.auto_awesome, size: 20, color: AppColors.warning),
                      const SizedBox(width: 8),
                      Text("Editor's Pick", style: AppTypography.sectionTitle(color: textPrimary)),
                    ],
                  ),
                  const SizedBox(height: 4),
                  Text('Our top recommendation this week', style: AppTypography.caption(color: textSecondary)),
                ],
              ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
              child: _EditorPickCard(hotel: _hotels.first, isDark: isDark, onTap: () => context.push('/hotel/${_hotels.first.id}')),
            ),
          ),

          // ─── RESULTS HEADER ────────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 32, 20, 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('${_filteredHotels.length} hotels found', style: AppTypography.sectionTitle(color: textPrimary)),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.sort_rounded, size: 16, color: textSecondary),
                        const SizedBox(width: 4),
                        Text('Sort', style: AppTypography.captionMedium(color: textSecondary)),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),

          // ─── HOTEL LIST ────────────────────────────────────────────
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final hotel = _filteredHotels[index];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 16),
                    child: _HotelListTile(hotel: hotel, isDark: isDark, onTap: () => context.push('/hotel/${hotel.id}')),
                  );
                },
                childCount: _filteredHotels.length,
              ),
            ),
          ),

          const SliverToBoxAdapter(child: SizedBox(height: 40)),
        ],
      ),
    );
  }
}

// ─── HOTELS: Editor Pick Card ─────────────────────────────────────────
class _EditorPickCard extends StatelessWidget {
  final Hotel hotel;
  final bool isDark;
  final VoidCallback onTap;

  const _EditorPickCard({required this.hotel, required this.isDark, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 220,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(24),
          image: DecorationImage(
            image: CachedNetworkImageProvider(hotel.images.first),
            fit: BoxFit.cover,
          ),
        ),
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            gradient: const LinearGradient(
              begin: Alignment.topCenter,
              end: Alignment.bottomCenter,
              colors: [Colors.transparent, Colors.black87],
            ),
          ),
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.end,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.accent,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text('EDITOR\'S CHOICE', style: AppTypography.badge(color: AppColors.textOnAccent)),
              ),
              const SizedBox(height: 10),
              Text(hotel.name, style: AppTypography.pageTitle(color: Colors.white)),
              const SizedBox(height: 4),
              Row(
                children: [
                  const Icon(Icons.star_rounded, size: 16, color: AppColors.accent),
                  const SizedBox(width: 4),
                  Text('${hotel.rating}', style: AppTypography.bodySemiBold(color: Colors.white)),
                  const SizedBox(width: 8),
                  Text('• ${hotel.location}', style: AppTypography.caption(color: Colors.white70)),
                  const Spacer(),
                  Text('\$${hotel.pricePerNight.toInt()}', style: AppTypography.price(color: AppColors.accent)),
                  Text('/night', style: AppTypography.caption(color: Colors.white60)),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ─── HOTELS: Horizontal List Tile ─────────────────────────────────────
class _HotelListTile extends StatelessWidget {
  final Hotel hotel;
  final bool isDark;
  final VoidCallback onTap;

  const _HotelListTile({required this.hotel, required this.isDark, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.card,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border, width: 0.5),
        ),
        child: Row(
          children: [
            // Image
            ClipRRect(
              borderRadius: BorderRadius.circular(14),
              child: CachedNetworkImage(
                imageUrl: hotel.images.first,
                width: 100,
                height: 100,
                fit: BoxFit.cover,
                placeholder: (_, __) => Container(width: 100, height: 100, color: AppColors.shimmerBase),
              ),
            ),
            const SizedBox(width: 14),
            // Info
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(hotel.name, style: AppTypography.cardTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary), maxLines: 1, overflow: TextOverflow.ellipsis),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Icon(Icons.location_on_outlined, size: 14, color: AppColors.textTertiary),
                      const SizedBox(width: 2),
                      Expanded(child: Text(hotel.location, style: AppTypography.caption(color: AppColors.textTertiary), maxLines: 1, overflow: TextOverflow.ellipsis)),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: AppColors.accent.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.star_rounded, size: 14, color: AppColors.accentDark),
                            const SizedBox(width: 2),
                            Text('${hotel.rating}', style: AppTypography.captionMedium(color: AppColors.accentDark)),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      Text('(${hotel.reviewCount})', style: AppTypography.caption(color: AppColors.textTertiary)),
                      const Spacer(),
                      Text('\$${hotel.pricePerNight.toInt()}', style: AppTypography.priceSmall(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                      Text('/n', style: AppTypography.caption(color: AppColors.textTertiary)),
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

// ─── SHARED WIDGETS ───────────────────────────────────────────────────
class _BackBtn extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(8),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.black.withOpacity(0.3),
          shape: BoxShape.circle,
        ),
        child: IconButton(
          icon: const Icon(Icons.arrow_back_rounded, color: Colors.white),
          onPressed: () => context.pop(),
        ),
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final IconData icon;
  final String value;
  final String label;
  final Color color;

  const _StatItem({required this.icon, required this.value, required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, size: 22, color: color),
        const SizedBox(height: 6),
        Text(value, style: AppTypography.bodySemiBold()),
        Text(label, style: AppTypography.label()),
      ],
    );
  }
}

class _FilterChip extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;
  final bool isDark;

  const _FilterChip({required this.label, required this.isSelected, required this.onTap, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () { HapticFeedback.selectionClick(); onTap(); },
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? const Color(0xFF0F3460) : (isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant),
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(label, style: AppTypography.captionMedium(color: isSelected ? Colors.white : (isDark ? AppColors.darkTextPrimary : AppColors.textPrimary))),
      ),
    );
  }
}
