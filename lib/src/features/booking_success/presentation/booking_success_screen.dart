import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/widgets/buttons/primary_button.dart';

class BookingSuccessScreen extends StatelessWidget {
  final String hotelId;
  final String roomId;

  const BookingSuccessScreen({super.key, required this.hotelId, required this.roomId});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Padding(
            padding: const EdgeInsets.all(AppDimensions.paddingScreen),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    color: AppColors.success.withValues(alpha: 0.1),
                    shape: BoxShape.circle,
                  ),
                  child: const Icon(
                    Icons.check_circle_rounded,
                    color: AppColors.success,
                    size: 64,
                  ),
                ),
                const SizedBox(height: AppDimensions.xxl),
                
                Text(
                  'Booking Confirmed!',
                  style: AppTypography.pageTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: AppDimensions.md),
                
                Text(
                  'Your payment was successful and your reservation has been confirmed. You will receive an email shortly.',
                  style: AppTypography.body(color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: AppDimensions.xxxl),
                
                Container(
                  padding: const EdgeInsets.all(AppDimensions.xl),
                  decoration: BoxDecoration(
                    color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
                    borderRadius: BorderRadius.circular(AppDimensions.radiusMd),
                  ),
                  child: Column(
                    children: [
                      Text('Booking ID', style: AppTypography.caption(color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary)),
                      const SizedBox(height: 4),
                      Text('BK-2026-8942', style: AppTypography.cardTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                    ],
                  ),
                ),
                const Spacer(),
                
                PrimaryButton(
                  text: 'View Booking',
                  onPressed: () {
                    // Navigate to bookings tab or details
                    context.go('/home');
                  },
                ),
                const SizedBox(height: AppDimensions.md),
                TextButton(
                  onPressed: () => context.go('/home'),
                  child: Text('Back to Home', style: AppTypography.button(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                ),
                const SizedBox(height: AppDimensions.xl),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
