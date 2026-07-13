import 'package:flutter/material.dart';

class AppSpacing {
  static const double xxxs = 2.0;
  static const double xxs = 4.0;
  static const double xs = 8.0;
  static const double sm = 12.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 40.0;
  static const double xxxl = 48.0;
  static const double huge = 64.0;

  // Common padding and margins
  static const EdgeInsets pagePadding = EdgeInsets.all(md);
  static const EdgeInsets horizontalPadding = EdgeInsets.symmetric(horizontal: md);
  static const EdgeInsets verticalPadding = EdgeInsets.symmetric(vertical: md);
  static const EdgeInsets cardPadding = EdgeInsets.all(md);
  
  // Widget-specific sizes
  static const double buttonHeight = 56.0;
  static const double iconSizeSmall = 16.0;
  static const double iconSizeMedium = 24.0;
  static const double iconSizeLarge = 32.0;
}
