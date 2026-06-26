import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';

class PaymentMethodsScreen extends StatelessWidget {
  const PaymentMethodsScreen({super.key});

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
          'Payment Methods',
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
              Text(
                'Manage your saved payment methods for faster booking.',
                style: AppTypography.body(
                  color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: 32),
              
              // ─── SAVED CARDS ──────────────────────────────────────────
              _CreditCardWidget(
                cardHolder: 'Biniyam Taye',
                cardNumber: '•••• •••• •••• 4242',
                expiry: '12/28',
                cardType: 'Visa',
                color: const Color(0xFF1C1C1E),
                isDefault: true,
              ),
              const SizedBox(height: 20),
              
              _CreditCardWidget(
                cardHolder: 'Biniyam Taye',
                cardNumber: '•••• •••• •••• 8899',
                expiry: '09/26',
                cardType: 'Mastercard',
                color: const Color(0xFF005C9E),
                isDefault: false,
              ),
              const SizedBox(height: 32),
              
              // ─── DIGITAL WALLETS ────────────────────────────────────
              Text(
                'Digital Wallets',
                style: AppTypography.sectionTitle(
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ).copyWith(fontSize: 18),
              ),
              const SizedBox(height: 16),
              
              Container(
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkCard : AppColors.card,
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isDark ? AppColors.darkBorder : AppColors.border,
                  ),
                ),
                child: Row(
                  children: [
                    Icon(
                      Icons.apple_rounded, // Assuming Apple Pay
                      size: 28,
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: Text(
                        'Apple Pay',
                        style: AppTypography.bodyMedium(
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                    ),
                    Switch.adaptive(
                      value: true,
                      onChanged: (value) {},
                      activeColor: AppColors.accent,
                    ),
                  ],
                ),
              ),
              
              const SizedBox(height: 48),
              
              // ─── ADD NEW CARD BUTTON ────────────────────────────────
              SizedBox(
                width: double.infinity,
                child: OutlinedButton(
                  onPressed: () {
                    HapticFeedback.lightImpact();
                  },
                  style: OutlinedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 20),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    side: BorderSide(
                      color: isDark ? AppColors.darkBorder : AppColors.border,
                      width: 1.5,
                    ),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.add_rounded,
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                      const SizedBox(width: 8),
                      Text(
                        'Add New Card',
                        style: AppTypography.buttonSmall(
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              
              const SizedBox(height: 48),
            ],
          ),
        ),
      ),
    );
  }
}

class _CreditCardWidget extends StatelessWidget {
  final String cardHolder;
  final String cardNumber;
  final String expiry;
  final String cardType;
  final Color color;
  final bool isDefault;

  const _CreditCardWidget({
    required this.cardHolder,
    required this.cardNumber,
    required this.expiry,
    required this.cardType,
    required this.color,
    this.isDefault = false,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.3),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                cardType,
                style: AppTypography.pageTitle(color: Colors.white).copyWith(
                  fontSize: 20,
                  fontStyle: FontStyle.italic,
                ),
              ),
              if (isDefault)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    'Default',
                    style: AppTypography.label(color: Colors.white),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 32),
          Text(
            cardNumber,
            style: AppTypography.pageTitle(color: Colors.white).copyWith(
              fontSize: 22,
              letterSpacing: 2,
            ),
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'CARD HOLDER',
                    style: AppTypography.label(color: Colors.white.withOpacity(0.6)),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    cardHolder.toUpperCase(),
                    style: AppTypography.bodyMedium(color: Colors.white).copyWith(letterSpacing: 1),
                  ),
                ],
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'EXPIRES',
                    style: AppTypography.label(color: Colors.white.withOpacity(0.6)),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    expiry,
                    style: AppTypography.bodyMedium(color: Colors.white),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    );
  }
}
