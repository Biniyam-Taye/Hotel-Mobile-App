import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../theme/app_colors.dart';

class AnimatedFavoriteButton extends StatelessWidget {
  final bool isFavorite;
  final VoidCallback onTap;
  final double size;

  const AnimatedFavoriteButton({
    super.key,
    required this.isFavorite,
    required this.onTap,
    this.size = 24,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.9),
          shape: BoxShape.circle,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.1),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Icon(
          isFavorite ? Icons.favorite_rounded : Icons.favorite_border_rounded,
          color: isFavorite ? AppColors.error : AppColors.grey400,
          size: size,
        )
        .animate(target: isFavorite ? 1 : 0)
        .scaleXY(begin: 1.0, end: 1.2, duration: 150.ms, curve: Curves.easeOut)
        .then()
        .scaleXY(begin: 1.2, end: 1.0, duration: 150.ms, curve: Curves.bounceOut),
      ),
    );
  }
}
