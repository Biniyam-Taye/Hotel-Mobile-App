import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/widgets/cards/hotel_card.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';

class CategoryScreen extends StatefulWidget {
  final String categoryName;

  const CategoryScreen({super.key, required this.categoryName});

  @override
  State<CategoryScreen> createState() => _CategoryScreenState();
}

class _CategoryScreenState extends State<CategoryScreen> {
  late final List<Hotel> _hotels;

  @override
  void initState() {
    super.initState();
    _hotels = List<Hotel>.from(MockData.hotels)..shuffle();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final iconData = IconData(
      MockData.categoryIcons[widget.categoryName] ?? Icons.category.codePoint,
      fontFamily: 'MaterialIcons',
    );

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
      body: CustomScrollView(
        physics: const BouncingScrollPhysics(),
        slivers: [
          // ─── HERO APP BAR ───────────────────────────────────────────
          SliverAppBar(
            expandedHeight: 200,
            pinned: true,
            backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
            elevation: 0,
            leading: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                  shape: BoxShape.circle,
                ),
                child: IconButton(
                  icon: Icon(Icons.arrow_back_rounded, color: isDark ? Colors.white : Colors.black),
                  onPressed: () => context.pop(),
                ),
              ),
            ),
            flexibleSpace: FlexibleSpaceBar(
              titlePadding: const EdgeInsets.only(left: 20, bottom: 16),
              title: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(
                    iconData,
                    size: 20,
                    color: isDark ? Colors.white : Colors.black,
                  ),
                  const SizedBox(width: 8),
                  Text(
                    widget.categoryName,
                    style: AppTypography.pageTitle(
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    ).copyWith(fontSize: 22),
                  ),
                ],
              ),
              background: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      AppColors.accent.withOpacity(isDark ? 0.2 : 0.1),
                      isDark ? AppColors.darkBackground : AppColors.background,
                    ],
                  ),
                ),
                child: Stack(
                  children: [
                    Positioned(
                      right: -40,
                      top: -20,
                      child: Icon(
                        iconData,
                        size: 200,
                        color: AppColors.accent.withOpacity(0.05),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),

          // ─── INFO BAR ─────────────────────────────────────────────
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 10, 20, 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    '${_hotels.length} places found',
                    style: AppTypography.bodyMedium(
                      color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                    ),
                  ),
                  TextButton.icon(
                    onPressed: () {
                      HapticFeedback.lightImpact();
                    },
                    icon: Icon(
                      Icons.tune_rounded,
                      size: 18,
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    ),
                    label: Text(
                      'Filters',
                      style: AppTypography.buttonSmall(
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // ─── LISTINGS ─────────────────────────────────────────────
          SliverPadding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            sliver: SliverList(
              delegate: SliverChildBuilderDelegate(
                (context, index) {
                  final hotel = _hotels[index];
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 24),
                    child: HotelCard(
                      hotel: hotel,
                      onTap: () {
                        HapticFeedback.selectionClick();
                        context.push('/hotel/${hotel.id}');
                      },
                    ),
                  );
                },
                childCount: _hotels.length,
              ),
            ),
          ),
          
          const SliverToBoxAdapter(
            child: SizedBox(height: 40),
          ),
        ],
      ),
    );
  }
}
