import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class LaundryDetailScreen extends StatefulWidget {
  const LaundryDetailScreen({super.key});

  @override
  State<LaundryDetailScreen> createState() => _LaundryDetailScreenState();
}

class _LaundryDetailScreenState extends State<LaundryDetailScreen> {
  int _selectedService = 0;
  int _selectedPickup = 0;
  final Map<String, int> _itemCounts = {};

  static const _skyBlue = Color(0xFF0EA5E9);
  static const _skyLight = Color(0xFFE0F2FE);
  static const _skyDark = Color(0xFF0369A1);

  final _serviceTypes = [
    {'label': 'Wash & Fold', 'pricePerItem': 5, 'icon': Icons.local_laundry_service_rounded},
    {'label': 'Dry Clean', 'pricePerItem': 12, 'icon': Icons.dry_cleaning_rounded},
    {'label': 'Press Only', 'pricePerItem': 4, 'icon': Icons.iron_rounded},
  ];

  final _items = [
    {'emoji': '👕', 'name': 'Shirts / Tops'},
    {'emoji': '👖', 'name': 'Trousers'},
    {'emoji': '👔', 'name': 'Suits / Blazers'},
    {'emoji': '👗', 'name': 'Dresses'},
    {'emoji': '🧥', 'name': 'Jackets'},
    {'emoji': '🧦', 'name': 'Socks (pairs)'},
  ];

  final _pickupSlots = ['Morning\nDrop-off\n(by 9 AM)', 'Afternoon\nDrop-off\n(by 1 PM)', 'Evening\nDrop-off\n(by 6 PM)'];

  int get _totalItems => _itemCounts.values.fold(0, (a, b) => a + b);
  int get _totalPrice {
    final pricePerItem = _serviceTypes[_selectedService]['pricePerItem'] as int;
    final base = _totalItems * pricePerItem;
    return base < 30 && _totalItems > 0 ? 30 : base; // minimum $30
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _skyLight,
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
                      Text('Laundry Service',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontWeight: FontWeight.w800, color: _skyDark,
                              )).animate().fade(duration: 400.ms).slideY(begin: 0.1),
                      const SizedBox(height: 4),
                      Text('Fresh, pressed, and ready by evening.',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                color: _skyBlue, fontStyle: FontStyle.italic,
                              )).animate(delay: 80.ms).fade(duration: 400.ms),

                      const SizedBox(height: AppSpacing.xl),

                      // Service Type
                      _sectionTitle(context, 'Service Type'),
                      const SizedBox(height: AppSpacing.sm),
                      Row(
                        children: List.generate(_serviceTypes.length, (i) {
                          final s = _serviceTypes[i];
                          final sel = _selectedService == i;
                          return Expanded(
                            child: GestureDetector(
                              onTap: () => setState(() => _selectedService = i),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                margin: EdgeInsets.only(right: i < 2 ? AppSpacing.sm : 0),
                                padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 6),
                                decoration: BoxDecoration(
                                  color: sel ? _skyBlue : Colors.white,
                                  borderRadius: AppBorders.medium,
                                  border: Border.all(color: sel ? _skyBlue : const Color(0xFFE2E8F0)),
                                  boxShadow: sel ? [BoxShadow(color: _skyBlue.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4))] : [],
                                ),
                                child: Column(
                                  children: [
                                    Icon(s['icon'] as IconData, color: sel ? Colors.white : _skyBlue, size: 22),
                                    const SizedBox(height: 6),
                                    Text(s['label'] as String,
                                        textAlign: TextAlign.center,
                                        style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 11,
                                            color: sel ? Colors.white : _skyDark)),
                                    Text('\$${s['pricePerItem']}/item',
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

                      // Item Counter
                      _sectionTitle(context, 'Add Your Items'),
                      const SizedBox(height: AppSpacing.sm),
                      ...(_items.asMap().entries.map((e) {
                        final item = e.value;
                        final count = _itemCounts[item['name']] ?? 0;
                        return Container(
                          margin: const EdgeInsets.only(bottom: AppSpacing.sm),
                          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: 10),
                          decoration: BoxDecoration(
                            color: count > 0 ? _skyBlue.withValues(alpha: 0.06) : Colors.white,
                            borderRadius: AppBorders.medium,
                            border: Border.all(color: count > 0 ? _skyBlue.withValues(alpha: 0.4) : const Color(0xFFE2E8F0)),
                          ),
                          child: Row(
                            children: [
                              Text(item['emoji']!, style: const TextStyle(fontSize: 22)),
                              const SizedBox(width: AppSpacing.sm),
                              Expanded(
                                child: Text(item['name']!, style: const TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 14, color: Color(0xFF1E293B))),
                              ),
                              _CounterButton(
                                icon: Icons.remove_rounded,
                                enabled: count > 0,
                                accentColor: _skyBlue,
                                onTap: () => setState(() {
                                  if (count > 0) _itemCounts[item['name']!] = count - 1;
                                }),
                              ),
                              Container(
                                width: 36,
                                alignment: Alignment.center,
                                child: AnimatedSwitcher(
                                  duration: const Duration(milliseconds: 200),
                                  child: Text('$count', key: ValueKey(count),
                                      style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w900, fontSize: 16,
                                          color: count > 0 ? _skyBlue : const Color(0xFFCBD5E1))),
                                ),
                              ),
                              _CounterButton(
                                icon: Icons.add_rounded,
                                enabled: true,
                                accentColor: _skyBlue,
                                onTap: () => setState(() => _itemCounts[item['name']!] = count + 1),
                              ),
                            ],
                          ),
                        ).animate(delay: (e.key * 60).ms).fade(duration: 300.ms).slideX(begin: 0.05);
                      })),

                      const SizedBox(height: AppSpacing.xl),

                      // Pickup Slot
                      _sectionTitle(context, 'Pickup Time'),
                      const SizedBox(height: AppSpacing.sm),
                      Row(
                        children: List.generate(_pickupSlots.length, (i) {
                          final sel = _selectedPickup == i;
                          return Expanded(
                            child: GestureDetector(
                              onTap: () => setState(() => _selectedPickup = i),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                margin: EdgeInsets.only(right: i < 2 ? AppSpacing.sm : 0),
                                padding: const EdgeInsets.symmetric(vertical: 10),
                                decoration: BoxDecoration(
                                  color: sel ? _skyBlue : Colors.white,
                                  borderRadius: AppBorders.medium,
                                  border: Border.all(color: sel ? _skyBlue : const Color(0xFFE2E8F0)),
                                ),
                                child: Text(_pickupSlots[i],
                                    textAlign: TextAlign.center,
                                    style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 10, height: 1.5,
                                        color: sel ? Colors.white : const Color(0xFF64748B))),
                              ),
                            ),
                          );
                        }),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Price Calculator Card
                      if (_totalItems > 0)
                        Container(
                          padding: const EdgeInsets.all(AppSpacing.md),
                          decoration: BoxDecoration(
                            gradient: LinearGradient(colors: [_skyBlue, _skyDark]),
                            borderRadius: AppBorders.large,
                            boxShadow: [BoxShadow(color: _skyBlue.withValues(alpha: 0.35), blurRadius: 16, offset: const Offset(0, 6))],
                          ),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  const Text('Estimated Total', style: TextStyle(fontFamily: 'Nunito', fontSize: 13, color: Colors.white70)),
                                  const SizedBox(height: 2),
                                  Text('$_totalItems item${_totalItems != 1 ? 's' : ''} · ${_serviceTypes[_selectedService]['label']}',
                                      style: const TextStyle(fontFamily: 'Nunito', fontSize: 12, color: Colors.white60)),
                                ],
                              ),
                              AnimatedSwitcher(
                                duration: const Duration(milliseconds: 250),
                                child: Text('\$$_totalPrice', key: ValueKey(_totalPrice),
                                    style: const TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w900, fontSize: 28, color: Colors.white)),
                              ),
                            ],
                          ),
                        ).animate().fade(duration: 400.ms).scale(begin: const Offset(0.95, 0.95)),

                      const SizedBox(height: 120),
                    ],
                  ),
                ),
              ),
            ],
          ),

          Positioned(
            bottom: 0, left: 0, right: 0,
            child: _LaundryBottomBar(
              price: _totalPrice,
              itemCount: _totalItems,
              accentColor: _skyBlue,
              onBook: () => context.push('/services/service_6/book'),
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
          height: 280,
          child: Stack(
            fit: StackFit.expand,
            children: [
              Image.network(
                'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=800',
                fit: BoxFit.cover,
              ),
              Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, _skyDark.withValues(alpha: 0.6)],
                  ),
                ),
              ),
              Positioned(
                bottom: AppSpacing.md,
                left: AppSpacing.md,
                child: Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(color: _skyBlue, borderRadius: AppBorders.circular),
                      child: const Text('Same Day Return', style: TextStyle(color: Colors.white, fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 12)),
                    ),
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
    return Text(title, style: Theme.of(context).textTheme.titleMedium?.copyWith(fontWeight: FontWeight.w800, color: _skyDark));
  }
}

class _CounterButton extends StatelessWidget {
  final IconData icon;
  final bool enabled;
  final Color accentColor;
  final VoidCallback onTap;

  const _CounterButton({required this.icon, required this.enabled, required this.accentColor, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: enabled ? onTap : null,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        width: 32, height: 32,
        decoration: BoxDecoration(
          color: enabled ? accentColor.withValues(alpha: 0.12) : const Color(0xFFF1F5F9),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: enabled ? accentColor : const Color(0xFFCBD5E1), size: 18),
      ),
    );
  }
}

class _LaundryBottomBar extends StatelessWidget {
  final int price, itemCount;
  final Color accentColor;
  final VoidCallback onBook;

  const _LaundryBottomBar({required this.price, required this.itemCount, required this.accentColor, required this.onBook});

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
              Text(itemCount > 0 ? '$itemCount item${itemCount != 1 ? 's' : ''}' : 'add items above',
                  style: const TextStyle(fontFamily: 'Nunito', fontSize: 12, color: Color(0xFF94A3B8))),
              AnimatedSwitcher(
                duration: const Duration(milliseconds: 250),
                child: Text(itemCount > 0 ? '\$$price' : '--',
                    key: ValueKey(price),
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          color: itemCount > 0 ? accentColor : const Color(0xFFCBD5E1),
                          fontWeight: FontWeight.w800)),
              ),
            ],
          ),
          SizedBox(
            width: 175,
            height: 52,
            child: ElevatedButton(
              onPressed: itemCount > 0 ? onBook : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: itemCount > 0 ? accentColor : const Color(0xFFE2E8F0),
                shape: const StadiumBorder(),
              ),
              child: Text('Schedule Pickup',
                  style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 14,
                      color: itemCount > 0 ? Colors.white : const Color(0xFFCBD5E1))),
            ),
          ),
        ],
      ),
    );
  }
}
