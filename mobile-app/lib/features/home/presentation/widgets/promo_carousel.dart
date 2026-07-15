import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class PromoCarousel extends StatefulWidget {
  const PromoCarousel({super.key});

  @override
  State<PromoCarousel> createState() => _PromoCarouselState();
}

class _PromoCarouselState extends State<PromoCarousel> {
  final PageController _pageController = PageController(viewportFraction: 0.9);
  int _currentPage = 0;

  final List<Map<String, String>> _promos = [
    {
      'title': 'Enjoy 20% off your\nfirst luxury stay!',
      'subtitle': 'Valid until Oct 31',
      'image': 'https://images.unsplash.com/photo-1542314831-c6a4d142104d?auto=format&fit=crop&q=80&w=1200',
    },
    {
      'title': 'Exclusive Spa\nWeekend Package',
      'subtitle': 'Relax and rejuvenate',
      'image': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=1200',
    },
    {
      'title': 'Fine Dining\nExperience',
      'subtitle': 'Michelin star chefs',
      'image': 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        SizedBox(
          height: 180,
          child: PageView.builder(
            controller: _pageController,
            onPageChanged: (index) {
              setState(() {
                _currentPage = index;
              });
            },
            itemCount: _promos.length,
            itemBuilder: (context, index) {
              final promo = _promos[index];
              return AnimatedBuilder(
                animation: _pageController,
                builder: (context, child) {
                  double value = 1.0;
                  if (_pageController.position.haveDimensions) {
                    value = _pageController.page! - index;
                    value = (1 - (value.abs() * 0.2)).clamp(0.8, 1.0);
                  }
                  return Center(
                    child: SizedBox(
                      height: Curves.easeOut.transform(value) * 180,
                      width: double.infinity,
                      child: child,
                    ),
                  );
                },
                child: Container(
                  margin: const EdgeInsets.symmetric(horizontal: AppSpacing.sm),
                  decoration: BoxDecoration(
                    borderRadius: AppBorders.large,
                    color: AppColors.grey200,
                    image: DecorationImage(
                      image: NetworkImage(promo['image']!),
                      fit: BoxFit.cover,
                      colorFilter: ColorFilter.mode(
                        Colors.black.withValues(alpha: 0.35),
                        BlendMode.darken,
                      ),
                    ),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.15),
                        blurRadius: 16,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(AppSpacing.lg),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        Text(
                          promo['title']!,
                          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w800,
                                height: 1.2,
                              ),
                        ),
                        const SizedBox(height: AppSpacing.xs),
                        Text(
                          promo['subtitle']!,
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                color: Colors.white.withValues(alpha: 0.9),
                                fontWeight: FontWeight.w500,
                              ),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        // Indicators
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: List.generate(
            _promos.length,
            (index) => AnimatedContainer(
              duration: const Duration(milliseconds: 300),
              margin: const EdgeInsets.symmetric(horizontal: 4),
              width: _currentPage == index ? 24 : 8,
              height: 8,
              decoration: BoxDecoration(
                color: _currentPage == index
                    ? AppColors.primary
                    : AppColors.grey300,
                borderRadius: BorderRadius.circular(4),
              ),
            ),
          ),
        ),
      ],
    );
  }
}
