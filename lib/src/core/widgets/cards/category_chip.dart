import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';

/// Animated category chip for horizontal scrolling filter lists.
/// Pill-shaped with smooth selection animation.
class CategoryChip extends StatelessWidget {
  final String label;
  final IconData? icon;
  final bool isSelected;
  final VoidCallback? onTap;

  const CategoryChip({
    super.key,
    required this.label,
    this.icon,
    this.isSelected = false,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: AnimatedScale(
        scale: isSelected ? 1.05 : 1.0,
        duration: const Duration(milliseconds: AppDimensions.animFast),
        curve: Curves.easeOutBack,
        child: AnimatedContainer(
          duration: const Duration(milliseconds: AppDimensions.animFast),
          curve: Curves.easeInOut,
          height: AppDimensions.categoryChipHeight,
          padding: EdgeInsets.symmetric(
            horizontal: icon != null ? 16 : 20,
          ),
          decoration: BoxDecoration(
            color: isSelected
                ? AppColors.accent
                : (isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary),
            borderRadius: BorderRadius.circular(AppDimensions.radiusChip),
            border: isSelected
                ? null
                : Border.all(
                    color: isDark ? AppColors.darkBorder : AppColors.border,
                    width: 1,
                  ),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              if (icon != null) ...[
                TweenAnimationBuilder<Color?>(
                  tween: ColorTween(
                    begin: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                    end: isSelected
                        ? AppColors.textOnAccent
                        : (isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                  ),
                  duration: const Duration(milliseconds: AppDimensions.animFast),
                  builder: (context, color, child) {
                    return Icon(icon, size: 18, color: color);
                  },
                ),
                const SizedBox(width: 6),
              ],
              AnimatedDefaultTextStyle(
                duration: const Duration(milliseconds: AppDimensions.animFast),
                style: AppTypography.captionMedium(
                  color: isSelected
                      ? AppColors.textOnAccent
                      : (isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                ),
                child: Text(label),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

/// Circular city image chip for explore section.
class CityChip extends StatelessWidget {
  final String name;
  final String imageUrl;
  final int hotelCount;
  final VoidCallback? onTap;

  const CityChip({
    super.key,
    required this.name,
    required this.imageUrl,
    required this.hotelCount,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return GestureDetector(
      onTap: onTap,
      child: SizedBox(
        width: AppDimensions.cityChipSize + 8,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: AppDimensions.cityChipSize,
              height: AppDimensions.cityChipSize,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(
                  color: AppColors.accent.withValues(alpha: 0.4),
                  width: 2.5,
                ),
                boxShadow: [
                  BoxShadow(
                    color: AppColors.accent.withValues(alpha: 0.15),
                    blurRadius: 12,
                    offset: const Offset(0, 4),
                  ),
                ],
                image: DecorationImage(
                  image: NetworkImage(imageUrl),
                  fit: BoxFit.cover,
                ),
              ),
            ),
            const SizedBox(height: 8),
            Text(
              name,
              style: AppTypography.captionMedium(
                color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              textAlign: TextAlign.center,
            ),
            Text(
              '$hotelCount hotels',
              style: AppTypography.label(
                color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
