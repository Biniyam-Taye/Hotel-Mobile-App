import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class SwimmingPoolBookingScreen extends StatefulWidget {
  const SwimmingPoolBookingScreen({super.key});

  @override
  State<SwimmingPoolBookingScreen> createState() => _SwimmingPoolBookingScreenState();
}

class _SwimmingPoolBookingScreenState extends State<SwimmingPoolBookingScreen> {
  static const _aquaDark = Color(0xFF0E7490);
  static const _aquaLight = Color(0xFFE0F7FA);

  int _guests = 2;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _aquaLight,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: _aquaDark),
          onPressed: () => context.pop(),
        ),
        title: const Text(
          'Reserve Pool Spot',
          style: TextStyle(color: _aquaDark, fontWeight: FontWeight.w800),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Details Card
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.large,
                boxShadow: [
                  BoxShadow(
                    color: _aquaDark.withValues(alpha: 0.1),
                    blurRadius: 20,
                    offset: const Offset(0, 10),
                  ),
                ],
              ),
              child: Column(
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Pool Access', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 16, color: _aquaDark)),
                      Text('\$20', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 16, color: Colors.grey.shade700)),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      const Text('Private Cabana', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 16, color: _aquaDark)),
                      Text('\$60', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 16, color: Colors.grey.shade700)),
                    ],
                  ),
                  const Padding(
                    padding: EdgeInsets.symmetric(vertical: 12),
                    child: Divider(color: _aquaLight),
                  ),
                  const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text('Total', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w900, fontSize: 20, color: _aquaDark)),
                      Text('\$80', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w900, fontSize: 24, color: _aquaDark)),
                    ],
                  ),
                ],
              ),
            ).animate().fade().slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),

            // Number of Guests
            const Text(
              'Number of Guests',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: _aquaDark,
              ),
            ).animate().fade(delay: 100.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.medium,
                border: Border.all(color: _aquaDark.withValues(alpha: 0.2)),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text('Guests', style: TextStyle(fontFamily: 'Nunito', fontSize: 16, fontWeight: FontWeight.w600, color: _aquaDark)),
                  Row(
                    children: [
                      IconButton(
                        onPressed: _guests > 1 ? () => setState(() => _guests--) : null,
                        icon: Icon(Icons.remove_circle_outline_rounded, color: _guests > 1 ? _aquaDark : Colors.grey),
                      ),
                      Text('$_guests', style: const TextStyle(fontFamily: 'Nunito', fontSize: 18, fontWeight: FontWeight.w800, color: _aquaDark)),
                      IconButton(
                        onPressed: _guests < 6 ? () => setState(() => _guests++) : null,
                        icon: Icon(Icons.add_circle_outline_rounded, color: _guests < 6 ? _aquaDark : Colors.grey),
                      ),
                    ],
                  ),
                ],
              ),
            ).animate().fade(delay: 200.ms).slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),
            
            // Date Selection
            const Text(
              'Date',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: _aquaDark,
              ),
            ).animate().fade(delay: 300.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.medium,
                border: Border.all(color: _aquaDark.withValues(alpha: 0.2)),
              ),
              child: const Row(
                children: [
                  Icon(Icons.calendar_today_rounded, color: _aquaDark, size: 20),
                  SizedBox(width: AppSpacing.md),
                  Text('Tomorrow, Oct 18', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 16, color: _aquaDark)),
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
                    const SnackBar(content: Text('Pool spot reserved successfully!')),
                  );
                  context.go('/main');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: _aquaDark,
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
