import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/widgets/buttons/primary_button.dart';

class PaymentScreen extends StatefulWidget {
  final String hotelId;
  final String roomId;

  const PaymentScreen({super.key, required this.hotelId, required this.roomId});

  @override
  State<PaymentScreen> createState() => _PaymentScreenState();
}

class _PaymentScreenState extends State<PaymentScreen> {
  bool _isLoading = false;

  void _handlePayment() async {
    setState(() => _isLoading = true);
    await Future.delayed(const Duration(seconds: 2));
    if (mounted) {
      setState(() => _isLoading = false);
      context.go('/booking-success/${widget.hotelId}/${widget.roomId}');
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Payment'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppDimensions.paddingScreen),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Select Payment Method',
              style: AppTypography.sectionTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
            ),
            const SizedBox(height: AppDimensions.md),
            
            _PaymentOptionTile(
              icon: Icons.credit_card_rounded,
              title: 'Credit / Debit Card',
              subtitle: 'Visa, Mastercard',
              isSelected: true,
            ),
            const SizedBox(height: AppDimensions.sm),
            _PaymentOptionTile(
              icon: Icons.wallet_rounded,
              title: 'Digital Wallet',
              subtitle: 'Apple Pay, Google Pay',
              isSelected: false,
            ),
            const SizedBox(height: AppDimensions.sm),
            _PaymentOptionTile(
              icon: Icons.account_balance_rounded,
              title: 'Bank Transfer',
              subtitle: 'CBE, Telebirr',
              isSelected: false,
            ),
            const SizedBox(height: AppDimensions.xxl),

            // Card Details Form
            Text(
              'Card Details',
              style: AppTypography.sectionTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
            ),
            const SizedBox(height: AppDimensions.md),
            const TextField(
              decoration: InputDecoration(
                hintText: 'Card Number',
                prefixIcon: Icon(Icons.credit_card),
              ),
            ),
            const SizedBox(height: AppDimensions.md),
            Row(
              children: [
                Expanded(
                  child: const TextField(
                    decoration: InputDecoration(
                      hintText: 'MM/YY',
                    ),
                  ),
                ),
                const SizedBox(width: AppDimensions.md),
                Expanded(
                  child: const TextField(
                    decoration: InputDecoration(
                      hintText: 'CVV',
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppDimensions.md),
            const TextField(
              decoration: InputDecoration(
                hintText: 'Cardholder Name',
              ),
            ),
            const SizedBox(height: AppDimensions.xxxl),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppDimensions.paddingScreen),
          child: PrimaryButton(
            text: 'Pay Now',
            isLoading: _isLoading,
            onPressed: _handlePayment,
          ),
        ),
      ),
    );
  }
}

class _PaymentOptionTile extends StatelessWidget {
  final IconData icon;
  final String title;
  final String subtitle;
  final bool isSelected;

  const _PaymentOptionTile({
    required this.icon,
    required this.title,
    required this.subtitle,
    required this.isSelected,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      padding: const EdgeInsets.all(AppDimensions.base),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
        borderRadius: BorderRadius.circular(AppDimensions.radiusMd),
        border: Border.all(
          color: isSelected ? AppColors.accent : Colors.transparent,
          width: 2,
        ),
      ),
      child: Row(
        children: [
          Icon(icon, color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
          const SizedBox(width: AppDimensions.md),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: AppTypography.bodySemiBold(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
                Text(subtitle, style: AppTypography.caption(color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary)),
              ],
            ),
          ),
          if (isSelected)
            const Icon(Icons.check_circle_rounded, color: AppColors.accent),
        ],
      ),
    );
  }
}
