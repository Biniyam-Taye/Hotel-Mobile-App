import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class LaundryBookingScreen extends StatefulWidget {
  const LaundryBookingScreen({super.key});

  @override
  State<LaundryBookingScreen> createState() => _LaundryBookingScreenState();
}

class _LaundryBookingScreenState extends State<LaundryBookingScreen> {
  static const _skyBlue = Color(0xFF0EA5E9);
  static const _skyDark = Color(0xFF0369A1);
  static const _skyLight = Color(0xFFE0F2FE);

  final _roomController = TextEditingController();
  final _instructionsController = TextEditingController();

  @override
  void dispose() {
    _roomController.dispose();
    _instructionsController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _skyLight,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: _skyDark),
          onPressed: () => context.pop(),
        ),
        title: const Text(
          'Schedule Pickup',
          style: TextStyle(color: _skyDark, fontWeight: FontWeight.w800),
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
                    color: _skyBlue.withValues(alpha: 0.1),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Column(
                children: [
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Wash & Fold', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 16, color: _skyDark)),
                      Text('\$30', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w900, fontSize: 20, color: _skyBlue)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    children: [
                      Icon(Icons.watch_later_rounded, color: Colors.grey.shade400, size: 16),
                      const SizedBox(width: 8),
                      Text('Pickup by 9 AM, Return by 6 PM', style: TextStyle(color: Colors.grey.shade600, fontSize: 13)),
                    ],
                  ),
                ],
              ),
            ).animate().fade().slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),

            // Room Number
            const Text(
              'Room Number',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: _skyDark,
              ),
            ).animate().fade(delay: 100.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.medium,
                border: Border.all(color: _skyBlue.withValues(alpha: 0.2)),
              ),
              child: TextField(
                controller: _roomController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  hintText: 'Enter your room number',
                  prefixIcon: Icon(Icons.meeting_room_rounded, color: _skyBlue),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                ),
              ),
            ).animate().fade(delay: 200.ms).slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),

            // Special Instructions
            const Text(
              'Special Instructions',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: _skyDark,
              ),
            ).animate().fade(delay: 300.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.medium,
                border: Border.all(color: _skyBlue.withValues(alpha: 0.2)),
              ),
              child: TextField(
                controller: _instructionsController,
                maxLines: 3,
                decoration: const InputDecoration(
                  hintText: 'e.g., Heavy starch on shirts',
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.all(16),
                ),
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
                    const SnackBar(content: Text('Laundry pickup scheduled successfully!')),
                  );
                  context.go('/main');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: _skyBlue,
                  shape: RoundedRectangleBorder(
                    borderRadius: AppBorders.medium,
                  ),
                ),
                child: const Text(
                  'Confirm Schedule',
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
