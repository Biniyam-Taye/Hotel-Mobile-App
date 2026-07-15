import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class MassageTherapyDetailScreen extends StatefulWidget {
  const MassageTherapyDetailScreen({super.key});

  @override
  State<MassageTherapyDetailScreen> createState() => _MassageTherapyDetailScreenState();
}

class _MassageTherapyDetailScreenState extends State<MassageTherapyDetailScreen> {
  int _selectedType = 0;
  int _selectedDuration = 1;
  String _genderPref = 'No Preference';
  final Set<String> _addons = {};

  static const _sand = Color(0xFFD4A574);
  static const _terra = Color(0xFFC17B4E);
  static const _cream = Color(0xFFFAF5EE);
  static const _darkText = Color(0xFF3D2B1F);

  final _types = [
    {'name': 'Swedish', 'desc': 'Light & relaxing', 'icon': Icons.spa_rounded},
    {'name': 'Deep Tissue', 'desc': 'Tension relief', 'icon': Icons.healing_rounded},
    {'name': 'Aromatherapy', 'desc': 'Scented oils', 'icon': Icons.local_florist_rounded},
  ];

  final _durations = [
    {'label': '30 min', 'price': 55},
    {'label': '45 min', 'price': 90},
    {'label': '60 min', 'price': 130},
    {'label': '90 min', 'price': 180},
  ];

  final _addonOptions = ['🪨 Hot Stones', '🌿 CBD Oil', '🦶 Foot Scrub', '🍃 Detox Wrap'];

  @override
  Widget build(BuildContext context) {
    final basePrice = _durations[_selectedDuration]['price'] as int;
    final totalPrice = basePrice + (_addons.length * 20);

    return Scaffold(
      backgroundColor: _cream,
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
                      Text('Massage Therapy',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontWeight: FontWeight.w800, color: _darkText,
                              )).animate().fade(duration: 400.ms).slideY(begin: 0.1),
                      const SizedBox(height: 4),
                      Text('Melt away tension. Renew your body.',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                color: _terra, fontStyle: FontStyle.italic,
                              )).animate(delay: 80.ms).fade(duration: 400.ms),

                      const SizedBox(height: AppSpacing.xl),

                      // Massage Type
                      _sectionTitle(context, 'Massage Type'),
                      const SizedBox(height: AppSpacing.sm),
                      Row(
                        children: List.generate(_types.length, (i) {
                          final t = _types[i];
                          final sel = _selectedType == i;
                          return Expanded(
                            child: GestureDetector(
                              onTap: () => setState(() => _selectedType = i),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                margin: EdgeInsets.only(right: i < 2 ? AppSpacing.sm : 0),
                                padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 8),
                                decoration: BoxDecoration(
                                  color: sel ? _terra : Colors.white,
                                  borderRadius: AppBorders.medium,
                                  border: Border.all(color: sel ? _terra : const Color(0xFFE2E8F0)),
                                  boxShadow: sel ? [BoxShadow(color: _terra.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4))] : [],
                                ),
                                child: Column(
                                  children: [
                                    Icon(t['icon'] as IconData, color: sel ? Colors.white : _terra, size: 22),
                                    const SizedBox(height: 6),
                                    Text(t['name'] as String,
                                        textAlign: TextAlign.center,
                                        style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 12,
                                            color: sel ? Colors.white : _darkText)),
                                    Text(t['desc'] as String,
                                        textAlign: TextAlign.center,
                                        style: TextStyle(fontFamily: 'Nunito', fontSize: 10,
                                            color: sel ? Colors.white70 : const Color(0xFF94A3B8))),
                                  ],
                                ),
                              ),
                            ).animate(delay: (i * 80).ms).fade(duration: 300.ms).slideY(begin: 0.1),
                          );
                        }),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Duration
                      _sectionTitle(context, 'Session Duration'),
                      const SizedBox(height: AppSpacing.sm),
                      Row(
                        children: List.generate(_durations.length, (i) {
                          final d = _durations[i];
                          final sel = _selectedDuration == i;
                          return Expanded(
                            child: GestureDetector(
                              onTap: () => setState(() => _selectedDuration = i),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                margin: EdgeInsets.only(right: i < 3 ? AppSpacing.xs : 0),
                                padding: const EdgeInsets.symmetric(vertical: 10),
                                decoration: BoxDecoration(
                                  color: sel ? _sand : Colors.white,
                                  borderRadius: AppBorders.medium,
                                  border: Border.all(color: sel ? _sand : const Color(0xFFE2E8F0)),
                                ),
                                child: Column(
                                  children: [
                                    Text(d['label'] as String,
                                        textAlign: TextAlign.center,
                                        style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 11,
                                            color: sel ? Colors.white : _darkText)),
                                    Text('\$${d['price']}',
                                        textAlign: TextAlign.center,
                                        style: TextStyle(fontFamily: 'Nunito', fontSize: 12, fontWeight: FontWeight.w900,
                                            color: sel ? Colors.white : _terra)),
                                  ],
                                ),
                              ),
                            ).animate(delay: (i * 60).ms).fade(duration: 300.ms),
                          );
                        }),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Gender Preference
                      _sectionTitle(context, 'Therapist Preference'),
                      const SizedBox(height: AppSpacing.sm),
                      Row(
                        children: ['No Preference', 'Female', 'Male'].map((pref) {
                          final sel = _genderPref == pref;
                          return Expanded(
                            child: GestureDetector(
                              onTap: () => setState(() => _genderPref = pref),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                margin: EdgeInsets.only(right: pref != 'Male' ? AppSpacing.sm : 0),
                                padding: const EdgeInsets.symmetric(vertical: 10),
                                decoration: BoxDecoration(
                                  color: sel ? _terra.withValues(alpha: 0.1) : Colors.white,
                                  borderRadius: AppBorders.medium,
                                  border: Border.all(color: sel ? _terra : const Color(0xFFE2E8F0)),
                                ),
                                child: Text(pref,
                                    textAlign: TextAlign.center,
                                    style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 12,
                                        color: sel ? _terra : const Color(0xFF64748B))),
                              ),
                            ),
                          );
                        }).toList(),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Add-ons
                      Row(
                        children: [
                          _sectionTitle(context, 'Enhance Your Session'),
                          const Spacer(),
                          Text('+\$20 each', style: TextStyle(fontFamily: 'Nunito', fontSize: 12, color: _terra, fontWeight: FontWeight.w700)),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      Wrap(
                        spacing: AppSpacing.sm,
                        runSpacing: AppSpacing.sm,
                        children: _addonOptions.asMap().entries.map((e) {
                          final selected = _addons.contains(e.value);
                          return GestureDetector(
                            onTap: () => setState(() {
                              if (selected) _addons.remove(e.value);
                              else _addons.add(e.value);
                            }),
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 200),
                              padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 9),
                              decoration: BoxDecoration(
                                color: selected ? _sand : Colors.white,
                                borderRadius: AppBorders.circular,
                                border: Border.all(color: selected ? _sand : const Color(0xFFE2E8F0)),
                                boxShadow: selected ? [BoxShadow(color: _sand.withValues(alpha: 0.3), blurRadius: 8, offset: const Offset(0, 3))] : [],
                              ),
                              child: Text(e.value,
                                  style: TextStyle(fontFamily: 'Nunito', fontSize: 13, fontWeight: FontWeight.w700,
                                      color: selected ? Colors.white : const Color(0xFF475569))),
                            ).animate(delay: (e.key * 60).ms).fade(duration: 300.ms).slideX(begin: 0.1),
                          );
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
            child: _MassageBottomBar(
              totalPrice: totalPrice,
              addons: _addons.length,
              accentColor: _terra,
              onBook: () => context.push('/services/service_5/book'),
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
                'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&q=80&w=800',
                fit: BoxFit.cover,
              ),
              Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, Color(0x99C17B4E)],
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
              decoration: BoxDecoration(color: Colors.white.withValues(alpha: 0.85), shape: BoxShape.circle),
              child: IconButton(
                icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20),
                onPressed: () => context.pop(),
              ),
            ),
          ),
        ),
        Positioned(
          bottom: AppSpacing.md,
          right: AppSpacing.md,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(color: Colors.black.withValues(alpha: 0.45), borderRadius: AppBorders.circular),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.star_rounded, color: Color(0xFFF59E0B), size: 16),
                SizedBox(width: 4),
                Text('4.8 (214 reviews)', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _sectionTitle(BuildContext context, String title) {
    return Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: const Color(0xFF3D2B1F)));
  }
}

class _MassageBottomBar extends StatelessWidget {
  final int totalPrice, addons;
  final Color accentColor;
  final VoidCallback onBook;

  const _MassageBottomBar({required this.totalPrice, required this.addons, required this.accentColor, required this.onBook});

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
              Text(addons > 0 ? 'incl. $addons add-on${addons > 1 ? 's' : ''}' : 'per session',
                  style: const TextStyle(fontFamily: 'Nunito', fontSize: 12, color: Color(0xFF94A3B8))),
              AnimatedSwitcher(
                duration: const Duration(milliseconds: 250),
                child: Text('\$$totalPrice', key: ValueKey(totalPrice),
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
              child: const Text('Book Massage', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 15, color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}
