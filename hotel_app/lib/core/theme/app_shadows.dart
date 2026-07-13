import 'package:flutter/material.dart';
import 'app_colors.dart';

class AppShadows {
  // Soft, diffused shadows for light mode
  static final List<BoxShadow> lightSoft = [
    BoxShadow(
      color: AppColors.grey900.withValues(alpha: 0.04),
      blurRadius: 10,
      offset: const Offset(0, 4),
      spreadRadius: 0,
    ),
    BoxShadow(
      color: AppColors.grey900.withValues(alpha: 0.02),
      blurRadius: 4,
      offset: const Offset(0, 2),
      spreadRadius: 0,
    ),
  ];

  static final List<BoxShadow> lightMedium = [
    BoxShadow(
      color: AppColors.grey900.withValues(alpha: 0.06),
      blurRadius: 16,
      offset: const Offset(0, 8),
      spreadRadius: -2,
    ),
    BoxShadow(
      color: AppColors.grey900.withValues(alpha: 0.04),
      blurRadius: 6,
      offset: const Offset(0, 4),
      spreadRadius: -1,
    ),
  ];

  static final List<BoxShadow> lightElevated = [
    BoxShadow(
      color: AppColors.primary.withValues(alpha: 0.15),
      blurRadius: 24,
      offset: const Offset(0, 12),
      spreadRadius: 0,
    ),
  ];

  // Dark mode shadows
  static final List<BoxShadow> darkSoft = [
    BoxShadow(
      color: Colors.black.withValues(alpha: 0.2),
      blurRadius: 10,
      offset: const Offset(0, 4),
      spreadRadius: 0,
    ),
  ];

  static final List<BoxShadow> darkMedium = [
    BoxShadow(
      color: Colors.black.withValues(alpha: 0.3),
      blurRadius: 16,
      offset: const Offset(0, 8),
      spreadRadius: -2,
    ),
  ];
}
