import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';

class GymFitnessDetailScreen extends StatefulWidget {
  const GymFitnessDetailScreen({super.key});

  @override
  State<GymFitnessDetailScreen> createState() => _GymFitnessDetailScreenState();
}

class _GymFitnessDetailScreenState extends State<GymFitnessDetailScreen> {
  bool _trainerAddon = false;
  int _selectedClass = 0;

  static const _charcoal = Color(0xFF1C1C1E);
  static const _darkCard = Color(0xFF2C2C2E);
  static const _dimText = Color(0xFF8E8E93);

  final _equipment = [
    {'icon': Icons.directions_run_rounded, 'label': 'Cardio'},
    {'icon': Icons.fitness_center_rounded, 'label': 'Free Weights'},
    {'icon': Icons.rowing_rounded, 'label': 'Rowing'},
    {'icon': Icons.self_improvement_rounded, 'label': 'Yoga Studio'},
    {'icon': Icons.pool_rounded, 'label': 'Lap Pool'},
    {'icon': Icons.sports_rounded, 'label': 'Functional'},
  ];

  final _classes = [
    {'name': 'Yoga Flow', 'time': '7:00 AM', 'trainer': 'Maya', 'spots': 4},
    {'name': 'HIIT Blast', 'time': '9:00 AM', 'trainer': 'Jake', 'spots': 2},
    {'name': 'Pilates Core', 'time': '11:00 AM', 'trainer': 'Sofia', 'spots': 6},
    {'name': 'Spin Cycle', 'time': '6:00 PM', 'trainer': 'Leo', 'spots': 3},
  ];

  final _stats = [
    {'value': '120+', 'label': 'Equipment'},
    {'value': '12', 'label': 'Daily Classes'},
    {'value': '6', 'label': 'Trainers'},
    {'value': '24h', 'label': 'Access'},
  ];

  @override
  Widget build(BuildContext context) {
    final price = _trainerAddon ? 75 : 25;

    return Scaffold(
      backgroundColor: _charcoal,
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
                      // Stats Row
                      Row(
                        children: _stats.asMap().entries.map((e) {
                          return Expanded(
                            child: Container(
                              margin: EdgeInsets.only(right: e.key < 3 ? AppSpacing.sm : 0),
                              padding: const EdgeInsets.symmetric(vertical: 12),
                              decoration: BoxDecoration(color: _darkCard, borderRadius: AppBorders.medium),
                              child: Column(
                                children: [
                                  Text(e.value['value']!, style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w900, fontSize: 18, color: AppColors.primary)),
                                  const SizedBox(height: 2),
                                  Text(e.value['label']!, style: const TextStyle(fontFamily: 'Nunito', fontSize: 10, color: Color(0xFF8E8E93))),
                                ],
                              ),
                            ).animate(delay: (e.key * 80).ms).fade(duration: 300.ms).scale(begin: const Offset(0.85, 0.85)),
                          );
                        }).toList(),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Title
                      Text('Gym & Fitness Center',
                          style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                fontWeight: FontWeight.w800, color: Colors.white,
                              )).animate().fade(duration: 400.ms).slideY(begin: 0.1),
                      const SizedBox(height: 4),
                      Text('Push your limits. Exceed them.',
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                color: AppColors.primary, fontStyle: FontStyle.italic,
                              )).animate(delay: 80.ms).fade(duration: 400.ms),

                      const SizedBox(height: AppSpacing.xl),

                      // Equipment
                      _sectionTitle(context, 'World-Class Equipment'),
                      const SizedBox(height: AppSpacing.sm),
                      GridView.count(
                        crossAxisCount: 3,
                        shrinkWrap: true,
                        physics: const NeverScrollableScrollPhysics(),
                        mainAxisSpacing: AppSpacing.sm,
                        crossAxisSpacing: AppSpacing.sm,
                        childAspectRatio: 1.1,
                        children: _equipment.asMap().entries.map((e) {
                          return Container(
                            decoration: BoxDecoration(
                              color: _darkCard,
                              borderRadius: AppBorders.medium,
                              border: Border.all(color: Colors.white.withValues(alpha: 0.05)),
                            ),
                            child: Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(e.value['icon'] as IconData, color: AppColors.primary, size: 26),
                                const SizedBox(height: 6),
                                Text(e.value['label'] as String,
                                    textAlign: TextAlign.center,
                                    style: const TextStyle(fontFamily: 'Nunito', fontSize: 11, fontWeight: FontWeight.w700, color: Colors.white70)),
                              ],
                            ),
                          ).animate(delay: (e.key * 60).ms).fade(duration: 300.ms).scale(begin: const Offset(0.85, 0.85));
                        }).toList(),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Today's Classes
                      _sectionTitle(context, "Today's Classes"),
                      const SizedBox(height: AppSpacing.sm),
                      SizedBox(
                        height: 110,
                        child: ListView.separated(
                          scrollDirection: Axis.horizontal,
                          separatorBuilder: (_, _a) => const SizedBox(width: AppSpacing.sm),
                          itemCount: _classes.length,
                          itemBuilder: (context, i) {
                            final cls = _classes[i];
                            final selected = _selectedClass == i;
                            return GestureDetector(
                              onTap: () => setState(() => _selectedClass = i),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 200),
                                width: 140,
                                padding: const EdgeInsets.all(AppSpacing.sm),
                                decoration: BoxDecoration(
                                  color: selected ? AppColors.primary : _darkCard,
                                  borderRadius: AppBorders.medium,
                                  boxShadow: selected
                                      ? [BoxShadow(color: AppColors.primary.withValues(alpha: 0.4), blurRadius: 12, offset: const Offset(0, 4))]
                                      : [],
                                ),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(cls['name'] as String,
                                        style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 13,
                                            color: selected ? Colors.white : Colors.white)),
                                    Text(cls['time'] as String,
                                        style: TextStyle(fontFamily: 'Nunito', fontSize: 12,
                                            color: selected ? Colors.white70 : AppColors.primary)),
                                    Row(
                                      children: [
                                        Icon(Icons.person_rounded, size: 12, color: selected ? Colors.white60 : _dimText),
                                        const SizedBox(width: 3),
                                        Text(cls['trainer'] as String,
                                            style: TextStyle(fontFamily: 'Nunito', fontSize: 11,
                                                color: selected ? Colors.white60 : _dimText)),
                                        const Spacer(),
                                        Container(
                                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                                          decoration: BoxDecoration(
                                            color: selected ? Colors.white.withValues(alpha: 0.2) : AppColors.primary.withValues(alpha: 0.15),
                                            borderRadius: BorderRadius.circular(4),
                                          ),
                                          child: Text('${cls['spots']} left',
                                              style: TextStyle(fontFamily: 'Nunito', fontSize: 10, fontWeight: FontWeight.w700,
                                                  color: selected ? Colors.white : AppColors.primary)),
                                        ),
                                      ],
                                    ),
                                  ],
                                ),
                              ).animate(delay: (i * 80).ms).fade(duration: 300.ms).slideX(begin: 0.2),
                            );
                          },
                        ),
                      ),

                      const SizedBox(height: AppSpacing.xl),

                      // Trainer Add-on
                      _sectionTitle(context, 'Personal Trainer Add-on'),
                      const SizedBox(height: AppSpacing.sm),
                      GestureDetector(
                        onTap: () => setState(() => _trainerAddon = !_trainerAddon),
                        child: AnimatedContainer(
                          duration: const Duration(milliseconds: 250),
                          padding: const EdgeInsets.all(AppSpacing.md),
                          decoration: BoxDecoration(
                            color: _trainerAddon ? AppColors.primary.withValues(alpha: 0.15) : _darkCard,
                            borderRadius: AppBorders.medium,
                            border: Border.all(
                              color: _trainerAddon ? AppColors.primary : Colors.white.withValues(alpha: 0.08),
                            ),
                          ),
                          child: Row(
                            children: [
                              Container(
                                padding: const EdgeInsets.all(10),
                                decoration: BoxDecoration(
                                  color: _trainerAddon ? AppColors.primary : Colors.white.withValues(alpha: 0.08),
                                  shape: BoxShape.circle,
                                ),
                                child: const Icon(Icons.fitness_center_rounded, color: Colors.white, size: 20),
                              ),
                              const SizedBox(width: AppSpacing.md),
                              Expanded(
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const Text('1-on-1 Personal Trainer', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w800, fontSize: 14, color: Colors.white)),
                                    Text('Add \$50 for a dedicated session', style: TextStyle(fontFamily: 'Nunito', fontSize: 12, color: _dimText)),
                                  ],
                                ),
                              ),
                              AnimatedSwitcher(
                                duration: const Duration(milliseconds: 200),
                                child: Icon(
                                  _trainerAddon ? Icons.check_circle_rounded : Icons.radio_button_unchecked_rounded,
                                  key: ValueKey(_trainerAddon),
                                  color: _trainerAddon ? AppColors.primary : _dimText,
                                  size: 26,
                                ),
                              ),
                            ],
                          ),
                        ).animate().fade(duration: 400.ms).slideY(begin: 0.1),
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
            child: _GymBottomBar(
              price: price,
              hasTrainer: _trainerAddon,
              onBook: () => context.push('/services/service_3/book'),
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
                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
                fit: BoxFit.cover,
              ),
              Container(color: Colors.black.withValues(alpha: 0.5)),
              Center(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white.withValues(alpha: 0.15),
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.white.withValues(alpha: 0.4), width: 2),
                  ),
                  child: const Icon(Icons.play_arrow_rounded, color: Colors.white, size: 40),
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
                color: Colors.white.withValues(alpha: 0.2),
                shape: BoxShape.circle,
              ),
              child: IconButton(
                icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20, color: Colors.white),
                onPressed: () => context.pop(),
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _sectionTitle(BuildContext context, String title) {
    return Text(title,
        style: Theme.of(context).textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w800, color: Colors.white,
            ));
  }
}

class _GymBottomBar extends StatelessWidget {
  final int price;
  final bool hasTrainer;
  final VoidCallback onBook;

  const _GymBottomBar({required this.price, required this.hasTrainer, required this.onBook});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(AppSpacing.xl, AppSpacing.lg, AppSpacing.xl, MediaQuery.of(context).padding.bottom + AppSpacing.lg),
      decoration: const BoxDecoration(
        color: Color(0xFF2C2C2E),
        borderRadius: BorderRadius.only(topLeft: Radius.circular(AppBorders.radiusLarge), topRight: Radius.circular(AppBorders.radiusLarge)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text('day pass${hasTrainer ? ' + trainer' : ''}',
                  style: const TextStyle(fontFamily: 'Nunito', fontSize: 12, color: Color(0xFF8E8E93))),
              Text('\$$price', style: Theme.of(context).textTheme.headlineMedium?.copyWith(color: AppColors.primary, fontWeight: FontWeight.w800)),
            ],
          ),
          SizedBox(
            width: 155,
            height: 52,
            child: ElevatedButton(
              onPressed: onBook,
              style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary, shape: const StadiumBorder()),
              child: const Text('Get Access', style: TextStyle(fontFamily: 'Nunito', fontWeight: FontWeight.w700, fontSize: 15, color: Colors.white)),
            ),
          ),
        ],
      ),
    );
  }
}
