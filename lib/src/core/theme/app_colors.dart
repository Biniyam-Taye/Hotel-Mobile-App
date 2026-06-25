import 'package:flutter/material.dart';

/// Premium color palette for the luxury hotel booking app.
/// Inspired by Apple aesthetics with a luxury lime accent.
class AppColors {
  AppColors._();

  // ─── PRIMARY BACKGROUNDS ───────────────────────────────────────────
  static const Color background = Color(0xFFFFFFFF);
  static const Color backgroundSecondary = Color(0xFFF8F8F8);
  static const Color backgroundTertiary = Color(0xFFF2F2F2);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color surfaceVariant = Color(0xFFF5F5F5);

  // ─── PRIMARY ACCENT ────────────────────────────────────────────────
  static const Color accent = Color(0xFFDFFF4F);
  static const Color accentDark = Color(0xFFC8E635);
  static const Color accentLight = Color(0xFFEBFF8A);
  static const Color accentSurface = Color(0xFFF7FFD6);

  // ─── TEXT ──────────────────────────────────────────────────────────
  static const Color textPrimary = Color(0xFF111111);
  static const Color textSecondary = Color(0xFF707070);
  static const Color textTertiary = Color(0xFFA0A0A0);
  static const Color textOnAccent = Color(0xFF111111);
  static const Color textOnDark = Color(0xFFFFFFFF);
  static const Color textDisabled = Color(0xFFBDBDBD);

  // ─── BORDERS & DIVIDERS ────────────────────────────────────────────
  static const Color border = Color(0xFFECECEC);
  static const Color borderLight = Color(0xFFF5F5F5);
  static const Color divider = Color(0xFFEEEEEE);

  // ─── SEMANTIC COLORS ───────────────────────────────────────────────
  static const Color success = Color(0xFF22C55E);
  static const Color successLight = Color(0xFFDCFCE7);
  static const Color warning = Color(0xFFF59E0B);
  static const Color warningLight = Color(0xFFFEF3C7);
  static const Color error = Color(0xFFEF4444);
  static const Color errorLight = Color(0xFFFEE2E2);
  static const Color info = Color(0xFF3B82F6);
  static const Color infoLight = Color(0xFFDBEAFE);

  // ─── CARD & SHADOW ─────────────────────────────────────────────────
  static const Color card = Color(0xFFFFFFFF);
  static const Color shadow = Color(0x0A000000);
  static const Color shadowMedium = Color(0x14000000);
  static const Color overlay = Color(0x33000000);
  static const Color overlayDark = Color(0x80000000);
  static const Color shimmerBase = Color(0xFFEEEEEE);
  static const Color shimmerHighlight = Color(0xFFF5F5F5);

  // ─── GRADIENT ──────────────────────────────────────────────────────
  static const LinearGradient cardGradient = LinearGradient(
    begin: Alignment.topCenter,
    end: Alignment.bottomCenter,
    colors: [Colors.transparent, Color(0xCC000000)],
  );

  static const LinearGradient accentGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFFDFFF4F), Color(0xFFC8E635)],
  );

  static const LinearGradient premiumGradient = LinearGradient(
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
    colors: [Color(0xFF1A1A1A), Color(0xFF2D2D2D)],
  );

  // ─── RATING STARS ──────────────────────────────────────────────────
  static const Color starFilled = Color(0xFFFFC107);
  static const Color starEmpty = Color(0xFFE0E0E0);

  // ─── DARK MODE ─────────────────────────────────────────────────────
  static const Color darkBackground = Color(0xFF0A0A0A);
  static const Color darkBackgroundSecondary = Color(0xFF141414);
  static const Color darkSurface = Color(0xFF1A1A1A);
  static const Color darkSurfaceVariant = Color(0xFF242424);
  static const Color darkCard = Color(0xFF1E1E1E);
  static const Color darkBorder = Color(0xFF2A2A2A);
  static const Color darkDivider = Color(0xFF222222);
  static const Color darkTextPrimary = Color(0xFFF5F5F5);
  static const Color darkTextSecondary = Color(0xFF999999);
  static const Color darkTextTertiary = Color(0xFF666666);
  static const Color darkShadow = Color(0x33000000);
  static const Color darkShimmerBase = Color(0xFF2A2A2A);
  static const Color darkShimmerHighlight = Color(0xFF3A3A3A);
}
