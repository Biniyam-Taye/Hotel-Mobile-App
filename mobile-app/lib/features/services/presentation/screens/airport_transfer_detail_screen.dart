import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class AirportTransferDetailScreen extends StatefulWidget {
  const AirportTransferDetailScreen({super.key});

  @override
  State<AirportTransferDetailScreen> createState() => _AirportTransferDetailScreenState();
}

class _AirportTransferDetailScreenState extends State<AirportTransferDetailScreen> {
  int _selectedVehicle = 1;

  static const _navy = Color(0xFF1A2F5E);
  static const _gold = Color(0xFFC9A84C);
  static const _lightNavy = Color(0xFFEEF2FB);

  final _vehicles = [
    {'label': 'Economy', 'icon': Icons.directions_car_rounded, 'passengers': '1–3', 'luggage': '2 bags', 'price': 65},
    {'label': 'Business', 'icon': Icons.airport_shuttle_rounded, 'passengers': '1–4', 'luggage': '4 bags', 'price': 85},
    {'label': 'Luxury', 'icon': Icons.directions_car_filled_rounded, 'passengers': '1–6', 'luggage': '6 bags', 'price': 140},
  ];

  final _features = [
    {'icon': Icons.person_pin_rounded, 'label': 'Meet & Greet'},
    {'icon': Icons.luggage_rounded, 'label': 'Luggage Help'},
    {'icon': Icons.flight_rounded, 'label': 'Flight Tracking'},
    {'icon': Icons.support_agent_rounded, 'label': '24/7 Dispatch'},
    {'icon': Icons.wifi_rounded, 'label': 'In-car Wi-Fi'},
    {'icon': Icons.local_drink_rounded, 'label': 'Welcome Drink'},
  ];

  @override
  Widget build(BuildContext context) {
    final vehicle = _vehicles[_selectedVehicle];
    final price = vehicle['price'] as int;

    return Scaffold(
      backgroundColor: _lightNavy,
      body: Stack(
        children: [
          CustomScrollView(
            slivers: [
              SliverToBoxAdapter(child: _buildHero(context)),
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(AppSpacing.lg, AppSpacing.lg, AppSpacing.lg, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Airport Transfer',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontWeight: FontWeight.w800, color: _navy,
                              )).animate().fade(duration: 400.ms).slideY(begin: 0.1),
                      const SizedBox(height: 4),
                      Text('Arrive in style. Leave without stress.',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                color: _gold, fontStyle: FontStyle.italic,
                              )).animate(delay: 80.ms).fade(duration: 400.ms),

                      const SizedBox(height: AppSpacing.xl),

                      // Route Card
                      _buildRouteCard(context),

                      const SizedBox(height: AppSpacing.xl),

                      // Vehicle Selector
                      _sectionTitle(context, 'Select Vehicle Class'),
                      const SizedBox(height: AppSpacing.sm),
                      ...List.generate(_vehicles.length, (i) {
                        final v = _vehicles[i];
                        final selected = _selectedVehicle == i;
                        return GestureDetector(
                          onTap: () => setState(() => _selectedVehicle = i),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 200),
                            margin: const EdgeInsets.only(bottom: AppSpacing.sm),
                            padding: const EdgeInsets.all(AppSpacing.md),
                            decoration: BoxDecoration(
                              color: selected ? _navy : Colors.white,
                              borderRadius: AppBorders.medium,
                              border: Border.all(color: selected ? _navy : const Color(0xFFE2E8F0), width: selected ? 0 : 1),
                              boxShadow: selected
                                  ? [BoxShadow(color: _navy.withValues(alpha: 0.3), blurRadius: 16, offset: const Offset(0, 6))]
                                  : [const BoxShadow(color: Color(0x0A000000), blurRadius: 8, offset: Offset(0, 2))],
                            ),
                            child: Row(
                              children: [
                                Container(
                                  padding: const EdgeInsets.all(10),
                                  decoration: BoxDecoration(
                                    color: selected ? Colors.white.withValues(alpha: 0.15) : _lightNavy,
                                    borderRadius: AppBorders.small,
                                  ),
                                  child: Icon(v['icon'] as IconData, color: selected ? _gold : _navy, size: 24),
                                ),
                                const SizedBox(width: AppSpacing.md),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(v['label'] as String,
                                          style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 15,
                                              color: selected ? Colors.white : _navy)),
                                      Text('${v['passengers']} passengers · ${v['luggage']}',
                                          style: TextStyle(fontFamily: 'Nunito', fontSize: 12,
                                              color: selected ? Colors.white60 : const Color(0xFF64748B))),
                                    ],
                                  ),
                                ),
                                Text('\$${v['price']}',
                                    style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 20,
                                        color: selected ? _gold : _navy)),
                              ],
                            ),
                          ).animate(delay: (i * 80).ms).fade(duration: 300.ms).slideX(begin: 0.1),
                        );
                      }),

                      const SizedBox(height: AppSpacing.xl),

                      // Features Grid
                      _sectionTitle(context, 'Every Transfer Includes'),
                      const SizedBox(height: AppSpacing.sm),
                      GridView.count(
                        crossAxisCount: 3,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        mainAxisSpacing: AppSpacing.sm,
                        crossAxisSpacing: AppSpacing.sm,
                        childAspectRatio: 1.1,
                        children: _features.asMap().entries.map((e) {
                          return _FeatureTile(
                            icon: e.value['icon'] as IconData,
                            label: e.value['label'] as String,
                            accentColor: _navy,
                            bgColor: Colors.white,
                          ).animate(delay: (e.key * 60).ms).fade(duration: 300.ms).scale(begin: const Offset(0.85, 0.85));
                        }).toList(),
                      ),

                      const SizedBox(height: 120),
                    ],
                  ),
                ),
              ),
            ],
          ),

          Positioned(
            bottom: 0, left: 0, right: 0,
            child: _BottomBarTransfer(
              price: price,
              buttonColor: _navy,
              goldColor: _gold,
              onBook: () => context.push('/services/service_2/book'),
            ).animate().slideY(begin: 1.0, duration: 450.ms, curve: Curves.easeOutQuart, delay: 300.ms),
          ),
        ],
      ),
    );
  }

  Widget _buildHero(BuildContext context) {
    return Stack(
      children: [
        SizedBox(
          height: 300,
          child: Stack(
            fit: StackFit.expand,
            children: [
              Image.network(
                'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800',
                fit: BoxFit.cover,
              ),
              Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Color(0x331A2F5E), Color(0xCC1A2F5E)],
                  ),
                ),
              ),
              Positioned(
                bottom: AppSpacing.lg,
                left: AppSpacing.lg,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                  decoration: BoxDecoration(
                    color: _gold,
                    borderRadius: AppBorders.circular,
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.verified_rounded, color: Colors.white, size: 16),
                      SizedBox(width: 6),
                      Text('Premium Verified Drivers', style: TextStyle(color: Colors.white, fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 13)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
        SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.sm),
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: 0.85),
                shape: BoxShape.circle,
              ),
              child: IconButton(
                icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20),
                onPressed: () => context.pop(),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildRouteCard(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(AppSpacing.lg),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: AppBorders.large,
        boxShadow: [BoxShadow(color: _navy.withValues(alpha: 0.08), blurRadius: 20, offset: const Offset(0, 4))],
      ),
      child: Column(
        children: [
          _RoutePoint(icon: Icons.flight_land_rounded, label: 'International Airport', color: _gold),
          Padding(
            padding: const EdgeInsets.only(left: 12),
            child: Column(
              children: List.generate(3, (_) => Container(
                margin: const EdgeInsets.symmetric(vertical: 2),
                width: 2, height: 8,
                color: const Color(0xFFE2E8F0),
              )),
            ),
          ),
          _RoutePoint(icon: Icons.hotel_rounded, label: 'Your Hotel', color: _navy),
        ],
      ),
    );
  }

  Widget _sectionTitle(BuildContext context, String title) {
    return Text(title,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w800, color: _navy,
            ));
  }
}

class _RoutePoint extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;

  const _RoutePoint({required this.icon, required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(8),
          decoration: BoxDecoration(color: color.withValues(alpha: 0.1), shape: BoxShape.circle),
          child: Icon(icon, color: color, size: 18),
        ),
        const SizedBox(width: AppSpacing.sm),
        Text(label, style: const TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 14, color: Color(0xFF1E293B))),
      ],
    );
  }
}

class _FeatureTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color accentColor, bgColor;

  const _FeatureTile({required this.icon, required this.label, required this.accentColor, required this.bgColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: AppBorders.medium,
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: accentColor, size: 24),
          const SizedBox(height: 6),
          Text(label, textAlign: TextAlign.center, style: const TextStyle(fontFamily: 'Nunito', fontSize: 11, fontWeight: FontWeight.w700, color: Color(0xFF475569))),
        ],
      ),
    );
  }
}

class _BottomBarTransfer extends StatelessWidget {
  final int price;
  final Color buttonColor, goldColor;
  final VoidCallback onBook;

  const _BottomBarTransfer({required this.price, required this.buttonColor, required this.goldColor, required this.onBook});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(AppSpacing.xl, AppSpacing.lg, AppSpacing.xl, MediaQuery.of(context).padding.bottom + AppSpacing.lg),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: const BorderRadius.only(topLeft: Radius.circular(AppBorders.radiusLarge), topRight: Radius.circular(AppBorders.radiusLarge)),
        boxShadow: [BoxShadow(color: Colors.black.withValues(alpha: 0.08), blurRadius: 20, offset: const Offset(0, -5))],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('per trip', style: TextStyle(fontFamily: 'Nunito', fontSize: 12, color: Color(0xFF94A3B8))),
              Text('\$$price', style: Theme.of(context).textTheme.headlineMedium?.copyWith(color: buttonColor, fontWeight: FontWeight.w800)),
            ],
          ),
          SizedBox(
            width: 180,
            height: 52,
            child: ElevatedButton(
              onPressed: onBook,
              style: ElevatedButton.styleFrom(backgroundColor: buttonColor, shape: const StadiumBorder()),
              child: const Text('Schedule Pickup', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 14, color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}
