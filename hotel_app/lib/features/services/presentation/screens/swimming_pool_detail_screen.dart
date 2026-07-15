import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class SwimmingPoolDetailScreen extends StatefulWidget {
  const SwimmingPoolDetailScreen({super.key});

  @override
  State<SwimmingPoolDetailScreen> createState() => _SwimmingPoolDetailScreenState();
}

class _SwimmingPoolDetailScreenState extends State<SwimmingPoolDetailScreen> {
  bool _cabanaAddon = false;
  bool _lunchAddon = false;

  static const _aqua = Color(0xFF0891B2);
  static const _aquaLight = Color(0xFFE0F7FA);
  static const _aquaDark = Color(0xFF0E7490);

  final _features = [
    {'icon': Icons.thermostat_rounded, 'label': 'Heated\n28°C'},
    {'icon': Icons.landscape_rounded, 'label': 'Infinity\nEdge'},
    {'icon': Icons.waves_rounded, 'label': 'Ocean\nView'},
    {'icon': Icons.child_care_rounded, 'label': 'Kids\nZone'},
    {'icon': Icons.security_rounded, 'label': 'Life\nGuard'},
    {'icon': Icons.pool_rounded, 'label': 'Olympic\nSize'},
  ];

  final _hours = [
    {'day': 'Monday – Friday', 'time': '6:00 AM – 10:00 PM'},
    {'day': 'Saturday', 'time': '7:00 AM – 11:00 PM'},
    {'day': 'Sunday', 'time': '8:00 AM – 9:00 PM'},
  ];

  final _amenities = ['🛁 Towels', '🪑 Sunbeds', '🍹 Poolside Bar', '🧴 Sunscreen', '🎵 Live DJ Sat', '🚿 Showers'];

  @override
  Widget build(BuildContext context) {
    int price = 20;
    if (_cabanaAddon) price += 60;
    if (_lunchAddon) price += 30;

    return Scaffold(
      backgroundColor: _aquaLight,
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
                      Text('Infinity Swimming Pool',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontWeight: FontWeight.w800, color: _aquaDark,
                              )).animate().fade(duration: 400.ms).slideY(begin: 0.1),
                      const SizedBox(height: 4),
                      Text('Where the water meets the sky.',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                color: _aqua, fontStyle: FontStyle.italic,
                              )).animate(delay: 80.ms).fade(duration: 400.ms),

                      const SizedBox(height: AppSpacing.xl),

                      // Pool Features
                      _sectionTitle(context, 'Pool Features'),
                      const SizedBox(height: AppSpacing.sm),
                      GridView.count(
                        crossAxisCount: 3,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        mainAxisSpacing: AppSpacing.sm,
                        crossAxisSpacing: AppSpacing.sm,
                        childAspectRatio: 1.1,
                        children: _features.asMap().entries.map((e) {
                          return Container(
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: AppBorders.medium,
                              boxShadow: [BoxShadow(color: _aqua.withValues(alpha: 0.1), blurRadius: 8, offset: const Offset(0, 2))],
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(e.value['icon'] as IconData, color: _aqua, size: 26),
                                const SizedBox(height: 6),
                                Text(e.value['label'] as String,
                                    textAlign: TextAlign.center,
                                    style: const TextStyle(fontFamily: 'Nunito', fontSize: 10, fontWeight: FontWeight.w700, color: Color(0xFF475569), height: 1.3)),
                              ],
                            ),
                          ).animate(delay: (e.key * 60).ms).fade(duration: 300.ms).scale(begin: const Offset(0.85, 0.85));
                        }).toList(),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Opening Hours
                      _sectionTitle(context, 'Opening Hours'),
                      const SizedBox(height: AppSpacing.sm),
                      Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: AppBorders.large,
                          boxShadow: [BoxShadow(color: _aqua.withValues(alpha: 0.08), blurRadius: 16, offset: const Offset(0, 4))],
                        ),
                        child: Column(
                          children: _hours.asMap().entries.map((e) {
                            final isLast = e.key == _hours.length - 1;
                            return Container(
                              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 14),
                              decoration: BoxDecoration(
                                border: isLast ? null : const Border(bottom: BorderSide(color: Color(0xFFF1F5F9))),
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                children: [
                                  Text(e.value['day']!, style: const TextStyle(fontFamily: 'Nunito', fontSize: 13, fontWeight: FontWeight.w600, color: Color(0xFF475569))),
                                  Text(e.value['time']!, style: TextStyle(fontFamily: 'Nunito', fontSize: 13, fontWeight: FontWeight.w800, color: _aquaDark)),
                                ],
                              ),
                            ).animate(delay: (e.key * 80).ms).fade(duration: 300.ms).slideX(begin: 0.05);
                          }).toList(),
                        ),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Amenities
                      _sectionTitle(context, 'Included Amenities'),
                      const SizedBox(height: AppSpacing.sm),
                      Wrap(
                        spacing: AppSpacing.sm,
                        runSpacing: AppSpacing.sm,
                        children: _amenities.asMap().entries.map((e) {
                          return Container(
                            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
                            decoration: BoxDecoration(
                              color: Colors.white,
                              borderRadius: AppBorders.circular,
                              border: Border.all(color: _aqua.withValues(alpha: 0.3)),
                            ),
                            child: Text(e.value, style: TextStyle(fontFamily: 'Nunito', fontSize: 13, fontWeight: FontWeight.w600, color: _aquaDark)),
                          ).animate(delay: (e.key * 50).ms).fade(duration: 300.ms).slideX(begin: 0.1);
                        }).toList(),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Add-ons
                      _sectionTitle(context, 'Upgrade Your Experience'),
                      const SizedBox(height: AppSpacing.sm),
                      _AddOnCard(
                        icon: Icons.deck_rounded,
                        title: 'Private Cabana',
                        subtitle: 'Shaded retreat with personal attendant',
                        price: '+\$60',
                        color: _aqua,
                        isSelected: _cabanaAddon,
                        onToggle: () => setState(() => _cabanaAddon = !_cabanaAddon),
                      ).animate().fade(duration: 400.ms).slideY(begin: 0.1),
                      const SizedBox(height: AppSpacing.sm),
                      _AddOnCard(
                        icon: Icons.restaurant_rounded,
                        title: 'Poolside Lunch',
                        subtitle: '3-course seasonal menu delivered to you',
                        price: '+\$30',
                        color: _aqua,
                        isSelected: _lunchAddon,
                        onToggle: () => setState(() => _lunchAddon = !_lunchAddon),
                      ).animate(delay: 80.ms).fade(duration: 400.ms).slideY(begin: 0.1),

                      const SizedBox(height: 120),
                    ],
                  ),
                ),
              ),
            ],
          ),

          Positioned(
            bottom: 0, left: 0, right: 0,
            child: _PoolBottomBar(
              price: price,
              accentColor: _aquaDark,
              onBook: () => context.push('/services/service_4/book'),
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
                'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800',
                fit: BoxFit.cover,
              ),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, _aquaDark.withValues(alpha: 0.7)],
                  ),
                ),
              ),
              Positioned(
                bottom: AppSpacing.md,
                left: AppSpacing.md,
                child: Row(
                  children: [
                    const Icon(Icons.pool_rounded, color: Colors.white, size: 18),
                    const SizedBox(width: 6),
                    const Text('Infinity Pool · Ocean Level', style: TextStyle(color: Colors.white, fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 14)),
                  ],
                ),
              ),
            ],
          ),
        ),
        SafeArea(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.sm),
            child: Container(
              decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.85), shape: BoxShape.circle),
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

  Widget _sectionTitle(BuildContext context, String title) {
    return Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: _aquaDark));
  }
}

class _AddOnCard extends StatelessWidget {
  final IconData icon;
  final String title, subtitle, price;
  final Color color;
  final bool isSelected;
  final VoidCallback onToggle;

  const _AddOnCard({required this.icon, required this.title, required this.subtitle, required this.price, required this.color, required this.isSelected, required this.onToggle});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onToggle,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(AppSpacing.md),
        decoration: BoxDecoration(
          color: isSelected ? color.withValues(alpha: 0.08) : Colors.white,
          borderRadius: AppBorders.medium,
          border: Border.all(color: isSelected ? color : const Color(0xFFE2E8F0), width: isSelected ? 1.5 : 1),
        ),
        child: Row(
          children: [
            Icon(icon, color: color, size: 22),
            const SizedBox(width: AppSpacing.sm),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 14, color: Color(0xFF1E293B))),
                  Text(subtitle, style: const TextStyle(fontFamily: 'Nunito', fontSize: 12, color: Color(0xFF64748B))),
                ],
              ),
            ),
            Text(price, style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 14, color: color)),
            const SizedBox(width: AppSpacing.sm),
            Icon(isSelected ? Icons.check_circle_rounded : Icons.add_circle_outline_rounded, color: isSelected ? color : const Color(0xFFCBD5E1), size: 24),
          ],
        ),
      ),
    );
  }
}

class _PoolBottomBar extends StatelessWidget {
  final int price;
  final Color accentColor;
  final VoidCallback onBook;

  const _PoolBottomBar({required this.price, required this.accentColor, required this.onBook});

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
              const Text('total today', style: TextStyle(fontFamily: 'Nunito', fontSize: 12, color: Color(0xFF94A3B8))),
              AnimatedSwitcher(
                duration: const Duration(milliseconds: 250),
                child: Text('\$$price', key: ValueKey(price),
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(color: accentColor, fontWeight: FontWeight.w800)),
              ),
            ],
          ),
          SizedBox(
            width: 165,
            height: 52,
            child: ElevatedButton(
              onPressed: onBook,
              style: ElevatedButton.styleFrom(backgroundColor: accentColor, shape: const StadiumBorder()),
              child: const Text('Reserve Spot', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 15, color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}
