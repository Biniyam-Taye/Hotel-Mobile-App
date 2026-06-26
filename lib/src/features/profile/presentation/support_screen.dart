import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';

class SupportScreen extends StatelessWidget {
  const SupportScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
      appBar: AppBar(
        backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios_new_rounded,
            size: 20,
            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
          ),
          onPressed: () => context.pop(),
        ),
        title: Text(
          'Help & Support',
          style: AppTypography.pageTitle(
            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
          ).copyWith(fontSize: 20),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              
              // ─── AI CONCIERGE BANNER ────────────────────────────────
              Container(
                padding: const EdgeInsets.all(24),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    colors: [AppColors.accentDark, AppColors.accent],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(24),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            'Chat with AI Concierge',
                            style: AppTypography.cardTitle(color: Colors.white),
                          ),
                          const SizedBox(height: 8),
                          Text(
                            'Get instant help with bookings, recommendations, and more.',
                            style: AppTypography.captionMedium(color: Colors.white.withOpacity(0.9)),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 16),
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: Colors.white.withOpacity(0.2),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.chat_bubble_outline_rounded, color: Colors.white),
                    ),
                  ],
                ),
              ),
              
              const SizedBox(height: 32),
              
              // ─── CONTACT OPTIONS ────────────────────────────────────
              Text(
                'Contact Us',
                style: AppTypography.sectionTitle(
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ).copyWith(fontSize: 18),
              ),
              const SizedBox(height: 16),
              
              Row(
                children: [
                  Expanded(
                    child: _ContactCard(
                      icon: Icons.phone_outlined,
                      title: 'Call Us',
                      subtitle: '24/7 Support',
                      isDark: isDark,
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: _ContactCard(
                      icon: Icons.email_outlined,
                      title: 'Email',
                      subtitle: 'support@luxestay.com',
                      isDark: isDark,
                    ),
                  ),
                ],
              ),
              
              const SizedBox(height: 32),
              
              // ─── FAQ ────────────────────────────────────────────────
              Text(
                'Frequently Asked Questions',
                style: AppTypography.sectionTitle(
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ).copyWith(fontSize: 18),
              ),
              const SizedBox(height: 16),
              
              _FaqTile(
                question: 'How do I cancel a booking?',
                answer: 'You can cancel your booking from the Bookings tab up to 48 hours before check-in for a full refund.',
                isDark: isDark,
              ),
              _FaqTile(
                question: 'How do I use my Luxe Rewards points?',
                answer: 'Points can be applied during checkout. Every 1,000 points equals \$10 off your booking.',
                isDark: isDark,
              ),
              _FaqTile(
                question: 'Can I request early check-in?',
                answer: 'Yes, early check-in can be requested in the booking preferences, subject to availability.',
                isDark: isDark,
              ),
              
              const SizedBox(height: 48),
            ],
          ),
        ),
      ),
    );
  }
}

class _ContactCard extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final bool isDark;

  const _ContactCard({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
      ),
      child: Column(
        children: [
          Icon(icon, size: 28, color: AppColors.accent),
          const SizedBox(height: 12),
          Text(
            title,
            style: AppTypography.bodySemiBold(
              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            subtitle,
            style: AppTypography.label(
              color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}

class _FaqTile extends StatelessWidget {
  final String question;
  final String answer;
  final bool isDark;

  const _FaqTile({
    required this.question,
    required this.answer,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    return Theme(
      data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
      child: ExpansionTile(
        title: Text(
          question,
          style: AppTypography.bodyMedium(
            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
          ),
        ),
        iconColor: AppColors.accent,
        collapsedIconColor: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
        childrenPadding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
        children: [
          Text(
            answer,
            style: AppTypography.caption(
              color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
            ).copyWith(height: 1.5),
          ),
        ],
      ),
    );
  }
}
