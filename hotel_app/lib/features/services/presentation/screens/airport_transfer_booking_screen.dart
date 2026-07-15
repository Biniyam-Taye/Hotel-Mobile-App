import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../data/dummy_services_data.dart';

class AirportTransferBookingScreen extends StatefulWidget {
  const AirportTransferBookingScreen({super.key});

  @override
  State<AirportTransferBookingScreen> createState() => _AirportTransferBookingScreenState();
}

class _AirportTransferBookingScreenState extends State<AirportTransferBookingScreen> {
  static const _navy = Color(0xFF1A2F5E);
  static const _gold = Color(0xFFC9A84C);
  static const _lightNavy = Color(0xFFEEF2FB);

  final _flightController = TextEditingController();

  @override
  void dispose() {
    _flightController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final service = DummyServicesData.getServiceById('service_2')!;

    return Scaffold(
      backgroundColor: _lightNavy,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back_ios_new_rounded, color: _navy),
          onPressed: () => context.pop(),
        ),
        title: const Text(
          'Schedule Pickup',
          style: TextStyle(color: _navy, fontWeight: FontWeight.w800),
        ),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // Route Card
            Container(
              padding: const EdgeInsets.all(AppSpacing.md),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.large,
                boxShadow: [
                  BoxShadow(
                    color: _navy.withValues(alpha: 0.1),
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
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: _lightNavy,
                          borderRadius: AppBorders.medium,
                        ),
                        child: const Icon(Icons.airport_shuttle_rounded, color: _navy, size: 28),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      const Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Business Class SUV',
                              style: TextStyle(
                                fontFamily: 'Nunito',
                                fontWeight: FontWeight.w800,
                                fontSize: 16,
                                color: _navy,
                              ),
                            ),
                            Text(
                              'Up to 4 passengers',
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
                        '\$85',
                        style: TextStyle(
                          fontFamily: 'Nunito',
                          fontWeight: FontWeight.w900,
                          fontSize: 20,
                          color: _gold,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ).animate().fade().slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),

            // Flight Details
            const Text(
              'Flight Details',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: _navy,
              ),
            ).animate().fade(delay: 100.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: AppBorders.medium,
                border: Border.all(color: _navy.withValues(alpha: 0.2)),
              ),
              child: TextField(
                controller: _flightController,
                decoration: const InputDecoration(
                  hintText: 'e.g., AA1234',
                  prefixIcon: Icon(Icons.flight_land_rounded, color: _navy),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                ),
              ),
            ).animate().fade(delay: 200.ms).slideY(begin: 0.2),

            const SizedBox(height: AppSpacing.xl),

            // Arrival Date & Time
            const Text(
              'Estimated Arrival',
              style: TextStyle(
                fontFamily: 'Nunito',
                fontWeight: FontWeight.w800,
                fontSize: 18,
                color: _navy,
              ),
            ).animate().fade(delay: 300.ms).slideY(begin: 0.2),
            const SizedBox(height: AppSpacing.sm),
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(AppSpacing.md),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: AppBorders.medium,
                      border: Border.all(color: _navy.withValues(alpha: 0.2)),
                    ),
                    child: const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Date', style: TextStyle(color: Colors.grey, fontSize: 12)),
                        SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(Icons.calendar_today_rounded, size: 16, color: _navy),
                            SizedBox(width: 6),
                            Text('Oct 18', style: TextStyle(fontWeight: FontWeight.w700, color: _navy)),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: AppSpacing.sm),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(AppSpacing.md),
                    decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: AppBorders.medium,
                      border: Border.all(color: _navy.withValues(alpha: 0.2)),
                    ),
                    child: const Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Time', style: TextStyle(color: Colors.grey, fontSize: 12)),
                        SizedBox(height: 4),
                        Row(
                          children: [
                            Icon(Icons.access_time_rounded, size: 16, color: _navy),
                            SizedBox(width: 6),
                            Text('09:45 AM', style: TextStyle(fontWeight: FontWeight.w700, color: _navy)),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ).animate().fade(delay: 400.ms).slideY(begin: 0.2),

            const SizedBox(height: 40),

            // Confirm Button
            SizedBox(
              width: double.infinity,
              height: 56,
              child: ElevatedButton(
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Transfer scheduled successfully!')),
                  );
                  context.go('/main');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: _navy,
                  shape: RoundedRectangleBorder(
                    borderRadius: AppBorders.medium,
                  ),
                ),
                child: const Text(
                  'Confirm Transfer',
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
