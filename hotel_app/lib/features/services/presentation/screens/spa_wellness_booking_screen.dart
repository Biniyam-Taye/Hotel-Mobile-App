import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/buttons/primary_button.dart';
import '../../data/dummy_services_data.dart';

class SpaWellnessBookingScreen extends StatelessWidget {
  const SpaWellnessBookingScreen({super.key});

  static const _sageGreen = Color(0xFF6B8F71);
  static const _cream = Color(0xFFFDF8F4);

  @override
  Widget build(BuildContext context) {
    final service = DummyServicesData.getServiceById('service_1')!;

    return Scaffold(
      backgroundColor: _cream,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: Color(0xFF2D4A30)),
          onPressed: () => context.pop(),
        ),
        title: const Text(
          'Confirm Booking',
          style: TextStyle(color: Color(0xFF2D4A30), fontWeight: FontWeight.w800),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Summary Card
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.large,
                boxShadow: [
                  BoxShadow(
                    color: _sageGreen.withValues(alpha: 0.1),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Row(
                children: [
                  Container(
                    width: 70,
                    height: 70,
                    decoration: BoxDecoration(
                      borderRadius: AppBorders.medium,
                      image: DecorationImage(
                        image: NetworkImage(service['imageUrl']),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Aromatherapy Session',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontWeight: FontWeight.w800,
                            fontSize: 16,
                            color: Color(0xFF2D4A30),
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '60 Minutes',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontSize: 13,
                            color: Colors.grey.shade600,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '\$120',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontWeight: FontWeight.w900,
                            fontSize: 18,
                            color: _sageGreen,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ).animate().fade().slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),

            // Time Slot
            const Text(
              'Scheduled Time',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: Color(0xFF2D4A30),
              ),
            ).animate().fade(delay: 100.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.medium,
                border: Border.all(color: _sageGreen.withValues(alpha: 0.2)),
              ),
              child: Row(
                children: [
                  Icon(Icons.calendar_today_rounded, color: _sageGreen, size: 24),
                  const SizedBox(width: AppSpacing.md),
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Tomorrow, Oct 18',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontWeight: FontWeight.w800,
                            fontSize: 15,
                            color: Color(0xFF2D4A30),
                          ),
                        ),
                        Text(
                          'Afternoon (1:00 PM)',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontSize: 13,
                            color: Colors.grey,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ).animate().fade(delay: 200.ms).slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),

            // Therapist Preference
            const Text(
              'Therapist',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: Color(0xFF2D4A30),
              ),
            ).animate().fade(delay: 300.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.medium,
                border: Border.all(color: _sageGreen.withValues(alpha: 0.2)),
              ),
              child: Row(
                children: [
                  const CircleAvatar(
                    backgroundImage: NetworkImage('https://i.pravatar.cc/150?img=47'),
                    radius: 20,
                  ),
                  const SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Amara',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontWeight: FontWeight.w800,
                            fontSize: 15,
                            color: Color(0xFF2D4A30),
                          ),
                        ),
                        Text(
                          'Aromatherapy Specialist',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontSize: 13,
                            color: Colors.grey.shade600,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ).animate().fade(delay: 400.ms).slideY(begin: 0.2),

            const SizedBox(height: 40),

            // Confirm Button
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Spa Session booked successfully!')),
                  );
                  context.go('/main');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: _sageGreen,
                  shape: RoundedRectangleBorder(
                    borderRadius: AppBorders.medium,
                  ),
                ),
                child: const Text(
                  'Confirm Reservation',
                  style: TextStyle(
                    fontFamily: 'Nunito',
                    fontWeight: FontWeight.w800,
                    fontSize: 16,
                    color: Colors.white,
                  ),
                ),
              ),
            ).animate().fade(delay: 500.ms).slideY(begin: 0.2),
          ],
        ),
      ),
    );
  }
}
