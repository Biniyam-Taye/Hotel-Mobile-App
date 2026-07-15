import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';

class AboutUsScreen extends StatelessWidget {
  const AboutUsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'About Us'),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          children: [
            const SizedBox(height: AppSpacing.xl),
            Container(
              padding: const EdgeInsets.all(24),
              decoration: const BoxDecoration(
                color: AppColors.primary,
                shape: BoxShape.circle,
              ),
              child: const Icon(Icons.hotel_rounded, size: 64, color: Colors.white),
            ),
            const SizedBox(height: AppSpacing.xl),
            const Text(
              'Premium Hotel Booking',
              style: TextStyle(
                fontWeight: FontWeight.w900,
                fontSize: 24,
              ),
            ),
            const SizedBox(height: AppSpacing.xs),
            const Text(
              'Version 1.0.0',
              style: TextStyle(
                color: AppColors.grey400,
                fontWeight: FontWeight.w600,
              ),
            ),
            const SizedBox(height: AppSpacing.xxl),
            const Text(
              'Experience luxury and comfort at your fingertips. Our application connects you with the most premium hotel accommodations and exceptional hospitality services worldwide. Whether you are traveling for business or leisure, we ensure a seamless and unforgettable stay.',
              textAlign: TextAlign.center,
              style: TextStyle(
                height: 1.6,
                fontSize: 15,
                color: Colors.grey,
              ),
            ),
            const SizedBox(height: AppSpacing.xxl),
            _buildLink(context, 'Terms of Service', Icons.description_outlined, () => context.push('/profile/about/terms')),
            const SizedBox(height: AppSpacing.sm),
            _buildLink(context, 'Privacy Policy', Icons.privacy_tip_outlined, () => context.push('/profile/about/privacy')),
            const SizedBox(height: AppSpacing.sm),
            _buildLink(context, 'Licenses', Icons.gavel_rounded, () => context.push('/profile/about/licenses')),
            
            const SizedBox(height: 40),
            const Text(
              '© 2026 Premium Hotel Group.\nAll rights reserved.',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: AppColors.grey400,
                fontSize: 12,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLink(BuildContext context, String title, IconData icon, VoidCallback onTap) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: AppBorders.medium,
        border: Border.all(
          color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
        ),
      ),
      child: ListTile(
        leading: Icon(icon, color: AppColors.primary),
        title: Text(
          title,
          style: const TextStyle(fontWeight: FontWeight.w600),
        ),
        trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16, color: AppColors.grey400),
        onTap: onTap,
      ),
    );
  }
}
