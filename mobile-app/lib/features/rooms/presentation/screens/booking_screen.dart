import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../../core/widgets/buttons/primary_button.dart';
import '../../data/dummy_rooms_data.dart';

class BookingScreen extends StatefulWidget {
  final String roomId;

  const BookingScreen({super.key, required this.roomId});

  @override
  State<BookingScreen> createState() => _BookingScreenState();
}

class _BookingScreenState extends State<BookingScreen> {
  late final Map<String, dynamic>? _room;
  int _adults = 2;
  int _children = 0;

  // Mutable dates for calendar picker
  DateTime _checkIn = DateTime.now().add(const Duration(days: 7));
  DateTime _checkOut = DateTime.now().add(const Duration(days: 10));

  @override
  void initState() {
    super.initState();
    _room = DummyRoomsData.getRoomById(widget.roomId);
  }

  int get _nights => _checkOut.difference(_checkIn).inDays;
  double get _basePrice => (_room?['price'] ?? 0.0) * _nights;
  double get _taxes => _basePrice * 0.12; // 12% tax
  double get _totalPrice => _basePrice + _taxes;

  @override
  Widget build(BuildContext context) {
    if (_room == null) {
      return const Scaffold(
        appBar: CustomAppBar(title: 'Booking'),
        body: Center(child: Text('Room not found')),
      );
    }

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(
        title: 'Complete Booking',
      ),
      body: Stack(
        children: [
          SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Room Summary
                Container(
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: Theme.of(context).cardTheme.color,
                    borderRadius: AppBorders.medium,
                    border: Border.all(
                      color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
                    ),
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 80,
                        height: 80,
                        decoration: BoxDecoration(
                          borderRadius: AppBorders.circular,
                          image: DecorationImage(
                            image: NetworkImage(_room['imageUrls'].first),
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                      const SizedBox(width: AppSpacing.md),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              _room['title'],
                              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                    fontWeight: FontWeight.w800,
                                  ),
                            ),
                            const SizedBox(height: 4),
                            Text(
                              _room['location'],
                              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                    color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
                                  ),
                            ),
                            const SizedBox(height: 8),
                            Text(
                              '\$${_room['price'].toInt()} /night',
                              style: Theme.of(context).textTheme.titleSmall?.copyWith(
                                    color: AppColors.primary,
                                    fontWeight: FontWeight.w800,
                                  ),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.xl),

                // Date Selection
                Text(
                  'Select Dates',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                ),
                const SizedBox(height: AppSpacing.md),
                Row(
                  children: [
                    Expanded(
                      child: _DateSelectorCard(
                        title: 'Check-In',
                        date: _checkIn,
                        onTap: () async {
                          final picked = await showDatePicker(
                            context: context,
                            initialDate: _checkIn,
                            firstDate: DateTime.now(),
                            lastDate: DateTime.now().add(const Duration(days: 365)),
                            builder: (context, child) => Theme(
                              data: Theme.of(context).copyWith(
                                colorScheme: Theme.of(context).colorScheme.copyWith(
                                  primary: AppColors.primary,
                                ),
                              ),
                              child: child!,
                            ),
                          );
                          if (picked != null && mounted) {
                            setState(() {
                              _checkIn = picked;
                              if (_checkOut.isBefore(_checkIn.add(const Duration(days: 1)))) {
                                _checkOut = _checkIn.add(const Duration(days: 1));
                              }
                            });
                          }
                        },
                      ),
                    ),
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: _DateSelectorCard(
                        title: 'Check-Out',
                        date: _checkOut,
                        onTap: () async {
                          final picked = await showDatePicker(
                            context: context,
                            initialDate: _checkOut,
                            firstDate: _checkIn.add(const Duration(days: 1)),
                            lastDate: DateTime.now().add(const Duration(days: 365)),
                            builder: (context, child) => Theme(
                              data: Theme.of(context).copyWith(
                                colorScheme: Theme.of(context).colorScheme.copyWith(
                                  primary: AppColors.primary,
                                ),
                              ),
                              child: child!,
                            ),
                          );
                          if (picked != null && mounted) {
                            setState(() => _checkOut = picked);
                          }
                        },
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: AppSpacing.xl),

                // Guests
                Text(
                  'Guests',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                ),
                const SizedBox(height: AppSpacing.md),
                Container(
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: Theme.of(context).cardTheme.color,
                    borderRadius: AppBorders.medium,
                    border: Border.all(
                      color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
                    ),
                  ),
                  child: Column(
                    children: [
                      _GuestStepper(
                        title: 'Adults',
                        subtitle: 'Ages 13 or above',
                        value: _adults,
                        onChanged: (val) {
                          setState(() => _adults = val);
                        },
                      ),
                      Divider(color: Theme.of(context).dividerColor.withValues(alpha: 0.1), height: 32),
                      _GuestStepper(
                        title: 'Children',
                        subtitle: 'Ages 2-12',
                        value: _children,
                        onChanged: (val) {
                          setState(() => _children = val);
                        },
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: AppSpacing.xl),

                // Price Breakdown
                Text(
                  'Price Breakdown',
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                ),
                const SizedBox(height: AppSpacing.md),
                Container(
                  padding: const EdgeInsets.all(AppSpacing.md),
                  decoration: BoxDecoration(
                    color: Theme.of(context).cardTheme.color,
                    borderRadius: AppBorders.medium,
                    border: Border.all(
                      color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
                    ),
                  ),
                  child: Column(
                    children: [
                      _PriceRow(
                        label: '\$${_room['price'].toInt()} x $_nights nights',
                        value: '\$${_basePrice.toStringAsFixed(2)}',
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      _PriceRow(
                        label: 'Taxes & Fees',
                        value: '\$${_taxes.toStringAsFixed(2)}',
                      ),
                      Divider(color: Theme.of(context).dividerColor.withValues(alpha: 0.1), height: 32),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Total',
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.w800,
                                ),
                          ),
                          Text(
                            '\$${_totalPrice.toStringAsFixed(2)}',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                  color: AppColors.primary,
                                  fontWeight: FontWeight.w800,
                                ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),

                // Bottom Spacing
                const SizedBox(height: 120),
              ],
            ),
          ),

          // Sticky Button
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: EdgeInsets.fromLTRB(
                AppSpacing.xl,
                AppSpacing.lg,
                AppSpacing.xl,
                MediaQuery.of(context).padding.bottom + AppSpacing.lg,
              ),
              decoration: BoxDecoration(
                color: Theme.of(context).scaffoldBackgroundColor,
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.05),
                    blurRadius: 20,
                    offset: const Offset(0, -5),
                  ),
                ],
                borderRadius: const BorderRadius.only(
                  topLeft: Radius.circular(AppBorders.radiusLarge),
                  topRight: Radius.circular(AppBorders.radiusLarge),
                ),
              ),
              child: PrimaryButton(
                text: 'Proceed to Payment',
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(
                      content: Text('Payment flow is mocked for this demo!'),
                      behavior: SnackBarBehavior.floating,
                    ),
                  );
                  context.go('/main');
                },
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _DateSelectorCard extends StatelessWidget {
  final String title;
  final DateTime date;
  final VoidCallback onTap;

  const _DateSelectorCard({
    required this.title,
    required this.date,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          color: Theme.of(context).cardTheme.color,
          borderRadius: AppBorders.medium,
          border: Border.all(
            color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
                  ),
            ),
            const SizedBox(height: 4),
            Row(
              children: [
                const Icon(Icons.calendar_today_rounded, size: 16, color: AppColors.primary),
                const SizedBox(width: 8),
                Text(
                  '${date.day}/${date.month}/${date.year}',
                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                        fontWeight: FontWeight.w700,
                      ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class _GuestStepper extends StatelessWidget {
  final String title;
  final String subtitle;
  final int value;
  final ValueChanged<int> onChanged;

  const _GuestStepper({
    required this.title,
    required this.subtitle,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    fontWeight: FontWeight.w700,
                  ),
            ),
            Text(
              subtitle,
              style: Theme.of(context).textTheme.bodySmall?.copyWith(
                    color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
                  ),
            ),
          ],
        ),
        Row(
          children: [
            _StepperButton(
              icon: Icons.remove_rounded,
              onTap: value > 0 ? () => onChanged(value - 1) : null,
            ),
            SizedBox(
              width: 40,
              child: Center(
                child: Text(
                  value.toString(),
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                ),
              ),
            ),
            _StepperButton(
              icon: Icons.add_rounded,
              onTap: () => onChanged(value + 1),
            ),
          ],
        ),
      ],
    );
  }
}

class _StepperButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback? onTap;

  const _StepperButton({required this.icon, this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          shape: BoxShape.circle,
          border: Border.all(
            color: onTap != null
                ? AppColors.primary.withValues(alpha: 0.5)
                : Theme.of(context).dividerColor.withValues(alpha: 0.1),
          ),
          color: onTap != null
              ? AppColors.primary.withValues(alpha: 0.1)
              : Colors.transparent,
        ),
        child: Icon(
          icon,
          size: 20,
          color: onTap != null ? AppColors.primary : AppColors.grey400,
        ),
      ),
    );
  }
}

class _PriceRow extends StatelessWidget {
  final String label;
  final String value;

  const _PriceRow({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(
          label,
          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7),
              ),
        ),
        Text(
          value,
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w700,
              ),
        ),
      ],
    );
  }
}
