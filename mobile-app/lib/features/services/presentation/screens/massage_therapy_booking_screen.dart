import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class MassageTherapyBookingScreen extends StatefulWidget {
  const MassageTherapyBookingScreen({super.key});

  @override
  State<MassageTherapyBookingScreen> createState() => _MassageTherapyBookingScreenState();
}

class _MassageTherapyBookingScreenState extends State<MassageTherapyBookingScreen> {
  static const _terra = Color(0xFFC17B4E);
  static const _cream = Color(0xFFFAF5EE);
  static const _darkText = Color(0xFF3D2B1F);
  
  final _roomController = TextEditingController();

  @override
  void dispose() {
    _roomController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _cream,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: _darkText),
          onPressed: () => context.pop(),
        ),
        title: const Text(
          'Confirm Massage',
          style: TextStyle(color: _darkText, fontWeight: FontWeight.w800),
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
                    color: _terra.withValues(alpha: 0.1),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(12),
                        decoration: BoxDecoration(
                          color: _cream,
                          borderRadius: AppBorders.medium,
                        ),
                        child: const Icon(Icons.spa_rounded, color: _terra, size: 28),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Swedish Massage',
                              style: TextStyle(
                                fontFamily: 'Nunito',
                                fontWeight: FontWeight.w800,
                                fontSize: 16,
                                color: _darkText,
                              ),
                            ),
                            Text(
                              '45 Minutes',
                              style: TextStyle(
                                fontFamily: 'Nunito',
                                fontSize: 13,
                                color: Colors.grey,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const Text(
                        '\$90',
                        style: TextStyle(
                          fontFamily: 'Nunito',
                          fontWeight: FontWeight.w900,
                          fontSize: 20,
                          color: _terra,
                        ),
                      ),
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 12),
                    child: Divider(color: _cream),
                  ),
                  Row(
                    children: [
                      Icon(Icons.check_circle_rounded, color: Colors.grey.shade400, size: 16),
                      const SizedBox(width: 8),
                      Text('Female Therapist Preferred', style: TextStyle(color: Colors.grey.shade600, fontSize: 13)),
                    ],
                  ),
                ],
              ),
            ).animate().fade().slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),

            // Room Number
            const Text(
              'Your Room Number',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: _darkText,
              ),
            ).animate().fade(delay: 100.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.medium,
                border: Border.all(color: _terra.withValues(alpha: 0.2)),
              ),
              child: TextField(
                controller: _roomController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  hintText: 'e.g., 402',
                  prefixIcon: Icon(Icons.meeting_room_rounded, color: _terra),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                ),
              ),
            ).animate().fade(delay: 200.ms).slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),

            // Schedule
            const Text(
              'Schedule',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: _darkText,
              ),
            ).animate().fade(delay: 300.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.medium,
                border: Border.all(color: _terra.withValues(alpha: 0.2)),
              ),
              child: const Row(
                children: [
                  Icon(Icons.calendar_month_rounded, color: _terra, size: 24),
                  SizedBox(width: AppSpacing.md),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Today, Oct 17',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontWeight: FontWeight.w800,
                            fontSize: 15,
                            color: _darkText,
                          ),
                        ),
                        Text(
                          '4:00 PM',
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
            ).animate().fade(delay: 400.ms).slideY(begin: 0.2),

            const SizedBox(height: 40),

            // Confirm Button
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Massage booked successfully!')),
                  );
                  context.go('/main');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: _terra,
                  shape: RoundedRectangleBorder(
                    borderRadius: AppBorders.medium,
                  ),
                ),
                child: const Text(
                  'Confirm Booking',
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
