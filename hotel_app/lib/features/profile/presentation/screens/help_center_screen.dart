import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';

class HelpCenterScreen extends StatelessWidget {
  const HelpCenterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Help Center'),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            decoration: BoxDecoration(
              color: Theme.of(context).cardTheme.color,
              borderRadius: AppBorders.medium,
              border: Border.all(color: Theme.of(context).dividerColor.withValues(alpha: 0.2)),
            ),
            child: const TextField(
              decoration: InputDecoration(
                prefixIcon: Icon(Icons.search_rounded, color: AppColors.grey400),
                hintText: 'Search for help...',
                border: InputBorder.none,
              ),
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
          Text(
            'Frequently Asked Questions',
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
          const SizedBox(height: AppSpacing.md),
          _buildFaqAccordion(
            context,
            'How do I cancel my booking?',
            'You can cancel your booking up to 24 hours before your check-in date without any penalty. Go to your Orders tab, select the booking, and tap "Cancel".',
          ),
          _buildFaqAccordion(
            context,
            'What payment methods do you accept?',
            'We accept all major credit cards including Visa, Mastercard, American Express, as well as digital wallets like Apple Pay and Google Pay.',
          ),
          _buildFaqAccordion(
            context,
            'Can I modify my check-in time?',
            'Yes, you can request an early check-in or late check-out through the app in your active booking details, subject to availability.',
          ),
          const SizedBox(height: AppSpacing.xxl),
          Container(
            padding: const EdgeInsets.all(AppSpacing.lg),
            decoration: BoxDecoration(
              color: AppColors.primary.withValues(alpha: 0.1),
              borderRadius: AppBorders.large,
            ),
            child: Column(
              children: [
                const Icon(Icons.support_agent_rounded, size: 40, color: AppColors.primary),
                const SizedBox(height: AppSpacing.md),
                const Text(
                  'Still need help?',
                  style: TextStyle(fontWeight: FontWeight.w800, fontSize: 18),
                ),
                const SizedBox(height: AppSpacing.sm),
                const Text(
                  'Our customer support team is available 24/7 to assist you.',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: AppColors.grey400),
                ),
                const SizedBox(height: AppSpacing.lg),
                ElevatedButton(
                  onPressed: () {},
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    shape: RoundedRectangleBorder(borderRadius: AppBorders.medium),
                    padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 12),
                  ),
                  child: const Text('Contact Support', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFaqAccordion(BuildContext context, String question, String answer) {
    return Container(
      margin: const EdgeInsets.only(bottom: AppSpacing.sm),
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: AppBorders.medium,
        border: Border.all(color: Theme.of(context).dividerColor.withValues(alpha: 0.1)),
      ),
      child: ExpansionTile(
        title: Text(
          question,
          style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15),
        ),
        iconColor: AppColors.primary,
        collapsedIconColor: AppColors.grey400,
        shape: const Border(),
        children: [
          Padding(
            padding: const EdgeInsets.only(left: 16, right: 16, bottom: 16),
            child: Text(
              answer,
              style: TextStyle(color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7), height: 1.5),
            ),
          ),
        ],
      ),
    );
  }
}
