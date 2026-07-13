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

  // BorderSide for use in OutlinedButton, InputDecoration, etc.
  static const BorderSide outlineSide = BorderSide(
    color: Color(0xFFE2E8F0),
    width: 1.0,
  );
}
