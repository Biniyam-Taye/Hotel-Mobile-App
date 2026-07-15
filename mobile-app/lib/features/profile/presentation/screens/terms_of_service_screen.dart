import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';

class TermsOfServiceScreen extends StatelessWidget {
  const TermsOfServiceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Terms of Service'),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Container(
          padding: const EdgeInsets.all(AppSpacing.lg),
          decoration: BoxDecoration(
            color: Theme.of(context).cardTheme.color,
            borderRadius: AppBorders.large,
            border: Border.all(
              color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
            ),
          ),
          child: const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Last Updated: October 2026',
                style: TextStyle(
                  color: AppColors.grey400,
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                ),
              ),
              SizedBox(height: AppSpacing.lg),
              _Section(
                title: '1. Acceptance of Terms',
                content: 'By accessing and using the Premium Hotel Booking application, you accept and agree to be bound by the terms and provision of this agreement.',
              ),
              _Section(
                title: '2. Booking Policies',
                content: 'All reservations are subject to availability. The hotel reserves the right to cancel or modify reservations where it appears that a customer has engaged in fraudulent or inappropriate activity.',
              ),
              _Section(
                title: '3. Cancellation Policy',
                content: "Cancellations made less than 24 hours prior to the check-in date may be subject to a cancellation fee equivalent to one night's stay.",
              ),
              _Section(
                title: '4. User Conduct',
                content: 'Users agree to use the application for lawful purposes only and will not engage in any activity that interferes with or disrupts the services.',
              ),
              _Section(
                title: '5. Modifications',
                content: 'We reserve the right to modify these terms at any time. Your continued use of the application constitutes your acceptance of such changes.',
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _Section extends StatelessWidget {
  final String title;
  final String content;

  const _Section({required this.title, required this.content});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: AppSpacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.w800,
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            content,
            style: const TextStyle(
              color: Colors.grey,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}
