import 'package:flutter/material.dart';

class AppBorders {
  static const double radiusSmall = 8.0;
  static const double radiusMedium = 16.0;
  static const double radiusLarge = 24.0;
  static const double radiusCircular = 999.0;

  static final BorderRadius small = BorderRadius.circular(radiusSmall);
  static final BorderRadius medium = BorderRadius.circular(radiusMedium);
  static final BorderRadius large = BorderRadius.circular(radiusLarge);
  static final BorderRadius circular = BorderRadius.circular(radiusCircular);

  // Border styles for inputs, cards, etc. if needed
  static final Border outlineBorder = Border.all(
    color: const Color(0xFFE2E8F0),
    width: 1.0,
  );
}
