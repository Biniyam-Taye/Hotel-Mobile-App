import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'app_colors.dart';

/// Typography system using Google Fonts Outfit.
/// Clean, geometric, premium — Apple-inspired hierarchy.
class AppTypography {
  AppTypography._();

  static String get _fontFamily => GoogleFonts.outfit().fontFamily!;

  // ─── HERO / DISPLAY ────────────────────────────────────────────────
  static TextStyle hero({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 36,
        fontWeight: FontWeight.w700,
        height: 1.15,
        letterSpacing: -0.5,
        color: color ?? AppColors.textPrimary,
      );

  static TextStyle heroLarge({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 42,
        fontWeight: FontWeight.w800,
        height: 1.1,
        letterSpacing: -1.0,
        color: color ?? AppColors.textPrimary,
      );

  // ─── PAGE TITLE ────────────────────────────────────────────────────
  static TextStyle pageTitle({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 28,
        fontWeight: FontWeight.w700,
        height: 1.2,
        letterSpacing: -0.3,
        color: color ?? AppColors.textPrimary,
      );

  // ─── SECTION TITLE ─────────────────────────────────────────────────
  static TextStyle sectionTitle({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 22,
        fontWeight: FontWeight.w600,
        height: 1.25,
        letterSpacing: -0.2,
        color: color ?? AppColors.textPrimary,
      );

  // ─── CARD TITLE ────────────────────────────────────────────────────
  static TextStyle cardTitle({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 18,
        fontWeight: FontWeight.w600,
        height: 1.3,
        letterSpacing: -0.1,
        color: color ?? AppColors.textPrimary,
      );

  // ─── SUBTITLE ──────────────────────────────────────────────────────
  static TextStyle subtitle({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 16,
        fontWeight: FontWeight.w500,
        height: 1.35,
        color: color ?? AppColors.textSecondary,
      );

  // ─── BODY ──────────────────────────────────────────────────────────
  static TextStyle body({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 15,
        fontWeight: FontWeight.w400,
        height: 1.5,
        color: color ?? AppColors.textPrimary,
      );

  static TextStyle bodyMedium({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 15,
        fontWeight: FontWeight.w500,
        height: 1.5,
        color: color ?? AppColors.textPrimary,
      );

  static TextStyle bodySemiBold({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 15,
        fontWeight: FontWeight.w600,
        height: 1.5,
        color: color ?? AppColors.textPrimary,
      );

  // ─── CAPTION ───────────────────────────────────────────────────────
  static TextStyle caption({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 13,
        fontWeight: FontWeight.w400,
        height: 1.4,
        color: color ?? AppColors.textSecondary,
      );

  static TextStyle captionMedium({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 13,
        fontWeight: FontWeight.w500,
        height: 1.4,
        color: color ?? AppColors.textSecondary,
      );

  // ─── LABELS ────────────────────────────────────────────────────────
  static TextStyle label({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 11,
        fontWeight: FontWeight.w500,
        height: 1.3,
        letterSpacing: 0.3,
        color: color ?? AppColors.textTertiary,
      );

  static TextStyle labelBold({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 11,
        fontWeight: FontWeight.w700,
        height: 1.3,
        letterSpacing: 0.5,
        color: color ?? AppColors.textTertiary,
      );

  // ─── BUTTON ────────────────────────────────────────────────────────
  static TextStyle button({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 16,
        fontWeight: FontWeight.w600,
        height: 1.0,
        letterSpacing: 0.2,
        color: color ?? AppColors.textPrimary,
      );

  static TextStyle buttonSmall({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 14,
        fontWeight: FontWeight.w600,
        height: 1.0,
        letterSpacing: 0.1,
        color: color ?? AppColors.textPrimary,
      );

  // ─── PRICE ─────────────────────────────────────────────────────────
  static TextStyle price({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 24,
        fontWeight: FontWeight.w700,
        height: 1.2,
        letterSpacing: -0.3,
        color: color ?? AppColors.textPrimary,
      );

  static TextStyle priceSmall({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 18,
        fontWeight: FontWeight.w700,
        height: 1.2,
        color: color ?? AppColors.textPrimary,
      );

  static TextStyle priceOld({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 14,
        fontWeight: FontWeight.w400,
        height: 1.2,
        decoration: TextDecoration.lineThrough,
        color: color ?? AppColors.textTertiary,
      );

  // ─── BADGE ─────────────────────────────────────────────────────────
  static TextStyle badge({Color? color}) => TextStyle(
        fontFamily: _fontFamily,
        fontSize: 10,
        fontWeight: FontWeight.w700,
        height: 1.0,
        letterSpacing: 0.5,
        color: color ?? Colors.white,
      );
}
