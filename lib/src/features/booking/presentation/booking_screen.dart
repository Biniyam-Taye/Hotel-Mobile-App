import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/widgets/buttons/primary_button.dart';

class BookingScreen extends StatelessWidget {
  final String hotelId;
  final String roomId;

  const BookingScreen({super.key, required this.hotelId, required this.roomId});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Booking Details'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppDimensions.paddingScreen),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Contact Information',
              style: AppTypography.sectionTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
            ),
            const SizedBox(height: AppDimensions.md),
            const TextField(
              decoration: InputDecoration(
                hintText: 'Full Name',
                prefixIcon: Icon(Icons.person_outline),
              ),
            ),
            const SizedBox(height: AppDimensions.md),
            const TextField(
              decoration: InputDecoration(
                hintText: 'Email Address',
                prefixIcon: Icon(Icons.email_outlined),
              ),
            ),
            const SizedBox(height: AppDimensions.md),
            const TextField(
              decoration: InputDecoration(
                hintText: 'Phone Number',
                prefixIcon: Icon(Icons.phone_outlined),
              ),
            ),
            const SizedBox(height: AppDimensions.xxl),
            
            Text(
              'Special Requests',
              style: AppTypography.sectionTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
            ),
            const SizedBox(height: AppDimensions.md),
            const TextField(
              maxLines: 4,
              decoration: InputDecoration(
                hintText: 'e.g. Late check-in, high floor...',
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(AppDimensions.paddingScreen),
          child: PrimaryButton(
            text: 'Continue to Payment',
            onPressed: () {
              context.push('/payment/$hotelId/$roomId');
            },
          ),
        ),
      ),
    );
  }
}
