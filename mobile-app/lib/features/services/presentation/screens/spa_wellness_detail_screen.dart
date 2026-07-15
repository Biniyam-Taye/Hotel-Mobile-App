import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class SpaWellnessDetailScreen extends StatefulWidget {
  const SpaWellnessDetailScreen({super.key});

  @override
  State<SpaWellnessDetailScreen> createState() => _SpaWellnessDetailScreenState();
}

class _SpaWellnessDetailScreenState extends State<SpaWellnessDetailScreen> {
  int _selectedTreatment = 0;
  int _selectedSlot = 1;

  static const _sageGreen = Color(0xFF6B8F71);
  static const _cream = Color(0xFFFDF8F4);

  final _treatments = [
    {'name': 'Aromatherapy', 'duration': '60 min', 'price': 120, 'icon': Icons.spa_rounded},
    {'name': 'Hot Stone', 'duration': '75 min', 'price': 150, 'icon': Icons.circle_rounded},
    {'name': 'Deep Tissue', 'duration': '90 min', 'price': 180, 'icon': Icons.healing_rounded},
  ];

  final _slots = ['Morning\n8–11 AM', 'Afternoon\n1–5 PM', 'Evening\n6–9 PM'];

  final _includes = [
    {'icon': Icons.checkroom_rounded, 'label': 'Plush robe & slippers'},
    {'icon': Icons.local_cafe_rounded, 'label': 'Herbal tea welcome'},
    {'icon': Icons.shower_rounded, 'label': 'Steam room access'},
    {'icon': Icons.self_improvement_rounded, 'label': 'Meditation lounge'},
    {'icon': Icons.local_florist_rounded, 'label': 'Essential oil kit'},
    {'icon': Icons.workspace_premium_rounded, 'label': 'Certified therapist'},
  ];

  final _therapists = [
    {'name': 'Amara', 'specialty': 'Aromatherapy', 'url': 'https://i.pravatar.cc/150?img=47'},
    {'name': 'Lena', 'specialty': 'Deep Tissue', 'url': 'https://i.pravatar.cc/150?img=25'},
    {'name': 'Sofia', 'specialty': 'Hot Stone', 'url': 'https://i.pravatar.cc/150?img=5'},
  ];

  @override
  Widget build(BuildContext context) {
    final price = _treatments[_selectedTreatment]['price'] as int;

    return Scaffold(
      backgroundColor: _cream,
      body: Stack(
        children: [
          CustomScrollView(
            slivers: [
              // Hero
              SliverToBoxAdapter(child: _buildHero(context)),

              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.fromLTRB(AppSpacing.lg, AppSpacing.lg, AppSpacing.lg, 0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Title
                      Text('Spa & Wellness',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontWeight: FontWeight.w800,
                                color: const Color(0xFF2D4A30),
                              )).animate().fade(duration: 400.ms).slideY(begin: 0.1),

                      const SizedBox(height: 4),
                      Text('Restore balance. Renew your spirit.',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                color: _sageGreen,
                                fontStyle: FontStyle.italic,
                              )).animate(delay: 80.ms).fade(duration: 400.ms),

                      const SizedBox(height: AppSpacing.xl),

                      // Treatment Selector
                      _sectionTitle(context, 'Choose Treatment'),
                      const SizedBox(height: AppSpacing.sm),
                      SizedBox(
                        height: 120,
                        child: ListView.separated(
                          scrollDirection: Axis.horizontal,
                          separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.sm),
                          itemCount: _treatments.length,
                          itemBuilder: (context, i) => _TreatmentCard(
                            name: _treatments[i]['name'] as String,
                            duration: _treatments[i]['duration'] as String,
                            price: _treatments[i]['price'] as int,
                            icon: _treatments[i]['icon'] as IconData,
                            isSelected: _selectedTreatment == i,
                            accentColor: _sageGreen,
                            onTap: () => setState(() => _selectedTreatment = i),
                          ).animate(delay: (i * 80).ms).fade(duration: 300.ms).slideX(begin: 0.2),
                        ),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Time Slot
                      _sectionTitle(context, 'Preferred Time'),
                      const SizedBox(height: AppSpacing.sm),
                      Row(
                        children: List.generate(_slots.length, (i) {
                          final selected = _selectedSlot == i;
                          return Expanded(
                            child: GestureDetector(
                              onTap: () => setState(() => _selectedSlot = i),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                margin: EdgeInsets.only(right: i < 2 ? AppSpacing.sm : 0),
                                padding: const EdgeInsets.symmetric(vertical: 12),
                                decoration: BoxDecoration(
                                  color: selected ? _sageGreen : Colors.white,
                                  borderRadius: AppBorders.medium,
                                  border: Border.all(
                                    color: selected ? _sageGreen : const Color(0xFFE2E8F0),
                                  ),
                                  boxShadow: selected
                                      ? [BoxShadow(color: _sageGreen.withValues(alpha: 0.25), blurRadius: 12, offset: const Offset(0, 4))]
                                      : [],
                                ),
                                child: Text(
                                  _slots[i],
                                  textAlign: TextAlign.center,
                                  style: TextStyle(
                                    fontFamily: 'Nunito',
                                    fontSize: 12,
                                    fontWeight: FontWeight.w700,
                                    color: selected ? Colors.white : const Color(0xFF64748B),
                                    height: 1.5,
                                  ),
                                ),
                              ),
                            ),
                          );
                        }),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // What's Included
                      _sectionTitle(context, "What's Included"),
                      const SizedBox(height: AppSpacing.sm),
                      GridView.count(
                        crossAxisCount: 2,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        mainAxisSpacing: AppSpacing.sm,
                        crossAxisSpacing: AppSpacing.sm,
                        childAspectRatio: 3.5,
                        children: _includes.asMap().entries.map((e) {
                          return _IncludeRow(
                            icon: e.value['icon'] as IconData,
                            label: e.value['label'] as String,
                            color: _sageGreen,
                          ).animate(delay: (e.key * 60).ms).fade(duration: 300.ms).slideX(begin: 0.1);
                        }).toList(),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Our Therapists
                      _sectionTitle(context, 'Our Therapists'),
                      const SizedBox(height: AppSpacing.sm),
                      Row(
                        children: _therapists.asMap().entries.map((e) {
                          return Padding(
                            padding: const EdgeInsets.only(right: AppSpacing.md),
                            child: _TherapistAvatar(
                              name: e.value['name']!,
                              specialty: e.value['specialty']!,
                              url: e.value['url']!,
                            ).animate(delay: (e.key * 100).ms).fade(duration: 400.ms).scale(begin: const Offset(0.8, 0.8)),
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

          // Bottom bar
          Positioned(
            bottom: 0, left: 0, right: 0,
            child: _BottomBar(
              price: price,
              priceLabel: 'per session',
              buttonLabel: 'Book Session',
              buttonColor: _sageGreen,
              onBook: () => context.push('/services/service_1/book'),
            ).animate().slideY(begin: 1.0, duration: 450.ms, curve: Curves.easeOutQuart, delay: 300.ms),
          ),
        ],
      ),
    );
  }

  Widget _buildHero(BuildContext context) {
    return Stack(
      children: [
        Container(
          height: 300,
          decoration: const BoxDecoration(
            gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [Color(0xFFB5C9B7), Color(0xFFF2B5A4)],
            ),
          ),
          child: Stack(
            fit: StackFit.expand,
            children: [
              Image.network(
                'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
                fit: BoxFit.cover,
              ),
              Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [Colors.transparent, Color(0x88000000)],
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
        Positioned(
          bottom: AppSpacing.md,
          right: AppSpacing.md,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.45),
              borderRadius: AppBorders.circular,
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.star_rounded, color: Color(0xFFF59E0B), size: 16),
                SizedBox(width: 4),
                Text('4.9 (320 reviews)', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w600)),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _sectionTitle(BuildContext context, String title) {
    return Text(title,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w800,
              color: const Color(0xFF2D4A30),
            ));
  }
}

class _TreatmentCard extends StatelessWidget {
  final String name, duration;
  final int price;
  final IconData icon;
  final bool isSelected;
  final Color accentColor;
  final VoidCallback onTap;

  const _TreatmentCard({
    required this.name, required this.duration, required this.price,
    required this.icon, required this.isSelected, required this.accentColor, required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: 130,
        padding: const EdgeInsets.all(AppSpacing.sm),
        decoration: BoxDecoration(
          color: isSelected ? accentColor : Colors.white,
          borderRadius: AppBorders.medium,
          border: Border.all(color: isSelected ? accentColor : const Color(0xFFE2E8F0)),
          boxShadow: isSelected
              ? [BoxShadow(color: accentColor.withValues(alpha: 0.3), blurRadius: 12, offset: const Offset(0, 4))]
              : [const BoxShadow(color: Color(0x0A000000), blurRadius: 8, offset: Offset(0, 2))],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, color: isSelected ? Colors.white : accentColor, size: 22),
            const SizedBox(height: 6),
            Text(name, style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 13,
                color: isSelected ? Colors.white : const Color(0xFF1E293B))),
            const SizedBox(height: 2),
            Text('$duration · \$$price', style: TextStyle(fontFamily: 'Nunito', fontSize: 11,
                color: isSelected ? Colors.white70 : const Color(0xFF64748B))),
          ],
        ),
      ),
    );
  }
}

class _IncludeRow extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  const _IncludeRow({required this.icon, required this.label, required this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: AppBorders.small,
        border: Border.all(color: const Color(0xFFE2E8F0)),
      ),
      child: Row(
        children: [
          Icon(icon, color: color, size: 16),
          const SizedBox(width: 6),
          Expanded(child: Text(label, style: const TextStyle(fontFamily: 'Nunito', fontSize: 11, fontWeight: FontWeight.w600, color: Color(0xFF475569)))),
        ],
      ),
    );
  }
}

class _TherapistAvatar extends StatelessWidget {
  final String name, specialty, url;
  const _TherapistAvatar({required this.name, required this.specialty, required this.url});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        CircleAvatar(radius: 32, backgroundImage: NetworkImage(url)),
        const SizedBox(height: 6),
        Text(name, style: const TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 13, color: Color(0xFF1E293B))),
        Text(specialty, style: const TextStyle(fontFamily: 'Nunito', fontSize: 11, color: Color(0xFF94A3B8))),
      ],
    );
  }
}

class _BottomBar extends StatelessWidget {
  final int price;
  final String priceLabel, buttonLabel;
  final Color buttonColor;
  final VoidCallback onBook;

  const _BottomBar({required this.price, required this.priceLabel, required this.buttonLabel, required this.buttonColor, required this.onBook});

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
              Text(priceLabel, style: const TextStyle(fontFamily: 'Nunito', fontSize: 12, color: Color(0xFF94A3B8))),
              Text('\$$price', style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    color: AppColors.primary, fontWeight: FontWeight.w800)),
            ],
          ),
          SizedBox(
            width: 170,
            height: 52,
            child: ElevatedButton(
              onPressed: onBook,
              style: ElevatedButton.styleFrom(backgroundColor: buttonColor, shape: const StadiumBorder()),
              child: Text(buttonLabel, style: const TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 15, color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}
