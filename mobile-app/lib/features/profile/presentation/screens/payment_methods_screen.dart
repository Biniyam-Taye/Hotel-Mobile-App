import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';

class PaymentMethodsScreen extends StatelessWidget {
  const PaymentMethodsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Payment Methods'),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          const Text(
            'Saved Cards',
            style: TextStyle(
              fontWeight: FontWeight.w800,
              fontSize: 18,
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          _PaymentCard(
            brand: 'Visa',
            last4: '4242',
            expiry: '12/26',
            icon: Icons.credit_card_rounded,
            color: const Color(0xFF1A1F71),
            isDefault: true,
          ),
          const SizedBox(height: AppSpacing.md),
          _PaymentCard(
            brand: 'Mastercard',
            last4: '8899',
            expiry: '08/25',
            icon: Icons.credit_card_rounded,
            color: const Color(0xFFEB001B),
            isDefault: false,
          ),
          const SizedBox(height: AppSpacing.xl),
          Container(
            padding: const EdgeInsets.all(AppSpacing.lg),
            decoration: BoxDecoration(
              color: AppColors.primaryContainer.withValues(alpha: 0.3),
              borderRadius: AppBorders.medium,
              border: Border.all(color: AppColors.primary.withValues(alpha: 0.3)),
            ),
            child: const Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.add_circle_outline_rounded, color: AppColors.primary),
                SizedBox(width: AppSpacing.sm),
                Text(
                  'Add New Payment Method',
                  style: TextStyle(
                    color: AppColors.primary,
                    fontWeight: FontWeight.w800,
                    fontSize: 16,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _PaymentCard extends StatelessWidget {
  final String brand;
  final String last4;
  final String expiry;
  final IconData icon;
  final Color color;
  final bool isDefault;

  const _PaymentCard({
    required this.brand,
    required this.last4,
    required this.expiry,
    required this.icon,
    required this.color,
    required this.isDefault,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [color, color.withValues(alpha: 0.8)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: AppBorders.large,
        boxShadow: [
          BoxShadow(
            color: color.withValues(alpha: 0.3),
            blurRadius: 10,
            offset: const Offset(0, 5),
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
                brand,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 20,
                  fontStyle: FontStyle.italic,
                ),
              ),
              if (isDefault)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.2),
                    borderRadius: AppBorders.circular,
                  ),
                  child: const Text(
                    'Default',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
            ],
          ),
          const SizedBox(height: 30),
          const Text(
            '**** **** **** ****',
            style: TextStyle(
              color: Colors.white,
              letterSpacing: 2,
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                '**** $last4',
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                  fontSize: 16,
                ),
              ),
              Text(
                expiry,
                style: const TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w600,
                  fontSize: 14,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
