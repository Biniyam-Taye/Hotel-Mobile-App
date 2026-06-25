import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

/// Swipeable image gallery with progress dots indicator.
class ImageCarousel extends StatefulWidget {
  final List<String> imageUrls;
  final double height;
  final double borderRadius;
  final bool showIndicator;

  const ImageCarousel({
    super.key,
    required this.imageUrls,
    this.height = 250,
    this.borderRadius = 0,
    this.showIndicator = true,
  });

  @override
  State<ImageCarousel> createState() => _ImageCarouselState();
}

class _ImageCarouselState extends State<ImageCarousel> {
  final PageController _pageController = PageController();

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (widget.imageUrls.isEmpty) return const SizedBox.shrink();

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return SizedBox(
      height: widget.height,
      child: Stack(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(widget.borderRadius),
            child: PageView.builder(
              controller: _pageController,
              itemCount: widget.imageUrls.length,
              itemBuilder: (context, index) {
                return CachedNetworkImage(
                  imageUrl: widget.imageUrls[index],
                  fit: BoxFit.cover,
                  placeholder: (_, __) => Container(
                    color: isDark ? AppColors.darkShimmerBase : AppColors.shimmerBase,
                  ),
                );
              },
            ),
          ),
          if (widget.showIndicator && widget.imageUrls.length > 1)
            Positioned(
              bottom: AppDimensions.md,
              left: 0,
              right: 0,
              child: Center(
                child: SmoothPageIndicator(
                  controller: _pageController,
                  count: widget.imageUrls.length,
                  effect: ExpandingDotsEffect(
                    activeDotColor: Colors.white,
                    dotColor: Colors.white.withValues(alpha: 0.5),
                    dotHeight: 6,
                    dotWidth: 6,
                    expansionFactor: 3,
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
