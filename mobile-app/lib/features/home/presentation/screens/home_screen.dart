import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/inputs/search_input.dart';

import '../widgets/home_app_bar.dart';
import '../widgets/category_chips_list.dart';
import '../widgets/promo_carousel.dart';
import '../widgets/section_header.dart';
import '../widgets/featured_room_card.dart';
import '../widgets/service_card.dart';
import '../../../services/data/dummy_services_data.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();

  final List<Map<String, dynamic>> _featuredRooms = [
    {
      'id': 'room_1',
      'title': 'Ocean View Suite',
      'location': 'Maldives, Indian Ocean',
      'rating': 4.9,
      'reviews': 128,
      'price': 450.0,
      'imageUrl': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800',
      'isFavorite': true,
    },
    {
      'id': 'room_2',
      'title': 'Mountain Retreat',
      'location': 'Swiss Alps, Switzerland',
      'rating': 4.8,
      'reviews': 84,
      'price': 320.0,
      'imageUrl': 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=800',
      'isFavorite': false,
    },
    {
      'id': 'room_3',
      'title': 'City Center Penthouse',
      'location': 'New York, USA',
      'rating': 4.7,
      'reviews': 256,
      'price': 550.0,
      'imageUrl': 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      'isFavorite': false,
    },
  ];

  final List<Map<String, dynamic>> _services = DummyServicesData.services.take(3).toList();

  final List<Map<String, dynamic>> _testimonials = [
    {
      'name': 'Sarah K.',
      'avatar': 'https://i.pravatar.cc/150?img=44',
      'rating': 5,
      'review': 'Absolutely breathtaking stay! The ocean view from our suite was unmatched. Service was impeccable.',
      'room': 'Ocean View Suite',
    },
    {
      'name': 'James M.',
      'avatar': 'https://i.pravatar.cc/150?img=12',
      'rating': 5,
      'review': 'The spa experience was world-class. Staff went above and beyond every single day.',
      'room': 'Mountain Retreat',
    },
    {
      'name': 'Lena P.',
      'avatar': 'https://i.pravatar.cc/150?img=47',
      'rating': 5,
      'review': 'Gorgeous property, amazing food. The penthouse had every luxury you could imagine.',
      'room': 'City Penthouse',
    },
  ];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: SafeArea(
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // ── App Bar ──────────────────────────────────────────────
                  HomeAppBar(
                    userName: 'Alex Johnson',
                    hasNotification: true,
                    onNotificationTap: () => context.push('/notifications'),
                    onAvatarTap: () {},
                  ),
                  const SizedBox(height: AppSpacing.sm),

                  // ── Search ───────────────────────────────────────────────
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                    child: GestureDetector(
                      onTap: () => context.push('/rooms'),
                      child: AbsorbPointer(
                        child: SearchInput(
                          controller: _searchController,
                          hintText: 'Search hotels, destinations...',
                          onFilterTap: () => context.push('/rooms'),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),

                  // ── Category Chips ───────────────────────────────────────
                  CategoryChipsList(
                    onCategorySelected: (category) {
                      if (category == 'Rooms') {
                        context.push('/rooms');
                      } else if (category == 'Hospitality') {
                        context.push('/services');
                      } else if (category == 'Restaurant') {
                        context.push('/restaurant');
                      } else if (category == 'Offers') {
                        context.push('/offers');
                      }
                    },
                  ),
                  const SizedBox(height: AppSpacing.xl),

                  // ── Promo Carousel ───────────────────────────────────────
                  const PromoCarousel(),
                  const SizedBox(height: AppSpacing.md),

                  // ── Featured Rooms ───────────────────────────────────────
                  SectionHeader(
                    title: 'Featured Rooms',
                    onActionTap: () => context.push('/rooms'),
                  ),
                  SizedBox(
                    height: 310,
                    child: ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                      scrollDirection: Axis.horizontal,
                      itemCount: _featuredRooms.length,
                      separatorBuilder: (context, _) => const SizedBox(width: AppSpacing.md),
                      itemBuilder: (context, index) {
                        final room = _featuredRooms[index];
                        return SizedBox(
                          width: 260,
                          child: FeaturedRoomCard(
                            id: room['id'],
                            title: room['title'],
                            location: room['location'],
                            rating: room['rating'],
                            reviews: room['reviews'],
                            price: room['price'],
                            imageUrl: room['imageUrl'],
                            isFavorite: room['isFavorite'],
                            onFavoriteTap: () {
                              setState(() {
                                room['isFavorite'] = !room['isFavorite'];
                              });
                            },
                            onTap: () => context.push('/rooms/${room['id']}'),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),

                  // ── Hospitality & Services ───────────────────────────────
                  SectionHeader(
                    title: 'Hospitality & Services',
                    onActionTap: () => context.push('/services'),
                  ),
                  SizedBox(
                    height: 180,
                    child: ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                      scrollDirection: Axis.horizontal,
                      itemCount: _services.length,
                      separatorBuilder: (context, _) => const SizedBox(width: AppSpacing.md),
                      itemBuilder: (context, index) {
                        final service = _services[index];
                        return SizedBox(
                          width: 160,
                          child: ServiceCard(
                            id: service['id'],
                            title: service['title'],
                            subtitle: '\$${service['price'].toInt()}',
                            imageUrl: service['imageUrl'],
                            onTap: () => context.push('/services/${service['id']}'),
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xxl),

                  // ── Guest Reviews ────────────────────────────────────────
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Guest Reviews',
                                style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                      fontWeight: FontWeight.w800,
                                    ),
                              ),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  const Icon(Icons.star_rounded, color: AppColors.warning, size: 18),
                                  const SizedBox(width: 4),
                                  Text(
                                    '4.9 from 2,400+ reviews',
                                    style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                          color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
                                        ),
                                  ),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  SizedBox(
                    height: 200,
                    child: ListView.separated(
                      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                      scrollDirection: Axis.horizontal,
                      itemCount: _testimonials.length,
                      separatorBuilder: (context, _) => const SizedBox(width: AppSpacing.md),
                      itemBuilder: (context, index) {
                        return _TestimonialCard(testimonial: _testimonials[index])
                            .animate()
                            .fade(delay: Duration(milliseconds: index * 100))
                            .slideX(begin: 0.1);
                      },
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xxl),

                  // ── Flash Deals ──────────────────────────────────────────
                  _FlashDealsSection(),
                  const SizedBox(height: AppSpacing.xxl),

                  // ── Membership Banner ────────────────────────────────────
                  _MembershipBanner(),
                  SizedBox(height: MediaQuery.of(context).padding.bottom + AppSpacing.xxl),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────
// Testimonial Card
// ─────────────────────────────────────────────────────────────
class _TestimonialCard extends StatelessWidget {
  final Map<String, dynamic> testimonial;
  const _TestimonialCard({required this.testimonial});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 280,
      padding: const EdgeInsets.all(AppSpacing.md),
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: AppBorders.large,
        border: Border.all(
          color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.04),
            blurRadius: 12,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              CircleAvatar(
                backgroundImage: NetworkImage(testimonial['avatar']),
                radius: 20,
              ),
              const SizedBox(width: AppSpacing.sm),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      testimonial['name'],
                      style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 14),
                    ),
                    Text(
                      testimonial['room'],
                      style: TextStyle(
                        color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5),
                        fontSize: 11,
                      ),
                    ),
                  ],
                ),
              ),
              Row(
                children: List.generate(
                  5,
                  (i) => const Icon(Icons.star_rounded, color: AppColors.warning, size: 14),
                ),
              ),
            ],
          ),
          const SizedBox(height: AppSpacing.sm),
          const Divider(height: 1),
          const SizedBox(height: AppSpacing.sm),
          Text(
            '"${testimonial['review']}"',
            style: TextStyle(
              color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.7),
              fontSize: 13,
              fontStyle: FontStyle.italic,
              height: 1.5,
            ),
            maxLines: 4,
            overflow: TextOverflow.ellipsis,
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────
// Flash Deals Section
// ─────────────────────────────────────────────────────────────
class _FlashDealsSection extends StatelessWidget {
  final List<Map<String, dynamic>> _deals = const [
    {
      'title': 'Summer Getaway',
      'subtitle': '20% off all Villas',
      'code': 'SUMMER20',
      'badge': 'HOT',
      'imageUrl': 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=600',
      'colorStart': 0xFFFF6B35,
      'colorEnd': 0xFFFF8E53,
    },
    {
      'title': 'Spa Special',
      'subtitle': 'BOGO Massage',
      'code': 'SPABOGO',
      'badge': 'BOGO',
      'imageUrl': 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=600',
      'colorStart': 0xFF7E57C2,
      'colorEnd': 0xFFAB47BC,
    },
    {
      'title': 'Weekend Escape',
      'subtitle': 'Free Breakfast',
      'code': 'WKNDFREE',
      'badge': 'FREE',
      'imageUrl': 'https://images.unsplash.com/photo-1551882547-ff40c4a49f7e?auto=format&fit=crop&q=80&w=600',
      'colorStart': 0xFF00897B,
      'colorEnd': 0xFF4DB6AC,
    },
  ];

  const _FlashDealsSection();

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.error.withValues(alpha: 0.12),
                  borderRadius: AppBorders.circular,
                ),
                child: Row(
                  children: [
                    Container(width: 7, height: 7, decoration: const BoxDecoration(color: AppColors.error, shape: BoxShape.circle)),
                    const SizedBox(width: 5),
                    const Text('LIVE DEALS', style: TextStyle(color: AppColors.error, fontWeight: FontWeight.w800, fontSize: 11, letterSpacing: 0.8)),
                  ],
                ),
              ),
              const SizedBox(width: AppSpacing.sm),
              Text(
                'Flash Offers',
                style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w900),
              ),
              const Spacer(),
              GestureDetector(
                onTap: () => context.push('/offers'),
                child: const Text('See All', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.w700, fontSize: 14)),
              ),
            ],
          ),
        ),
        const SizedBox(height: AppSpacing.md),
        SizedBox(
          height: 175,
          child: ListView.separated(
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
            scrollDirection: Axis.horizontal,
            itemCount: _deals.length,
            separatorBuilder: (context, _) => const SizedBox(width: AppSpacing.md),
            itemBuilder: (context, index) {
              final deal = _deals[index];
              final colorStart = Color(deal['colorStart'] as int);
              final colorEnd = Color(deal['colorEnd'] as int);
              return GestureDetector(
                onTap: () => context.push('/offers'),
                child: ClipRRect(
                  borderRadius: AppBorders.large,
                  child: SizedBox(
                    width: 210,
                    child: Stack(
                      children: [
                        Positioned.fill(
                          child: Image.network(
                            deal['imageUrl'],
                            fit: BoxFit.cover,
                            errorBuilder: (context, error, stack) => Container(color: colorStart),
                          ),
                        ),
                        Positioned.fill(
                          child: Container(
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.topLeft,
                                end: Alignment.bottomRight,
                                colors: [
                                  colorStart.withValues(alpha: 0.85),
                                  colorEnd.withValues(alpha: 0.7),
                                ],
                              ),
                            ),
                          ),
                        ),
                        Padding(
                          padding: const EdgeInsets.all(14),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 9, vertical: 3),
                                decoration: BoxDecoration(
                                  color: Colors.white,
                                  borderRadius: AppBorders.circular,
                                ),
                                child: Text(
                                  deal['badge'],
                                  style: TextStyle(
                                    color: colorStart,
                                    fontWeight: FontWeight.w900,
                                    fontSize: 10,
                                    letterSpacing: 0.8,
                                  ),
                                ),
                              ),
                              const Spacer(),
                              Text(
                                deal['title'],
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w900,
                                  fontSize: 16,
                                ),
                              ),
                              const SizedBox(height: 2),
                              Text(
                                deal['subtitle'],
                                style: TextStyle(
                                  color: Colors.white.withValues(alpha: 0.9),
                                  fontSize: 12,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                                decoration: BoxDecoration(
                                  color: Colors.white.withValues(alpha: 0.18),
                                  borderRadius: AppBorders.medium,
                                  border: Border.all(color: Colors.white.withValues(alpha: 0.3)),
                                ),
                                child: Text(
                                  deal['code'],
                                  style: const TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w900,
                                    fontSize: 13,
                                    letterSpacing: 1.5,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ).animate().fade(delay: Duration(milliseconds: index * 80)).slideX(begin: 0.1);
            },
          ),
        ),
      ],
    );
  }
}

// ─────────────────────────────────────────────────────────────
// Membership Banner
// ─────────────────────────────────────────────────────────────
class _MembershipBanner extends StatelessWidget {
  const _MembershipBanner();

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1A1A2E), Color(0xFF0F3460)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: AppBorders.large,
        boxShadow: [
          BoxShadow(
            color: const Color(0xFF0F3460).withValues(alpha: 0.4),
            blurRadius: 24,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      child: Stack(
        children: [
          // Decorative circle
          Positioned(
            right: -30,
            top: -30,
            child: Container(
              width: 140,
              height: 140,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.primary.withValues(alpha: 0.08),
              ),
            ),
          ),
          Positioned(
            right: 10,
            bottom: -20,
            child: Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.white.withValues(alpha: 0.04),
              ),
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        colors: [Color(0xFFF5C518), Color(0xFFE6A817)],
                      ),
                      borderRadius: AppBorders.circular,
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.workspace_premium_rounded, color: Colors.white, size: 14),
                        SizedBox(width: 4),
                        Text('GOLD MEMBER', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900, fontSize: 11, letterSpacing: 0.8)),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              const Text(
                'Unlock Exclusive\nBenefits',
                style: TextStyle(
                  color: Colors.white,
                  fontWeight: FontWeight.w900,
                  fontSize: 24,
                  height: 1.2,
                  letterSpacing: -0.3,
                ),
              ),
              const SizedBox(height: 12),
              _MemberPerk(icon: Icons.percent_rounded, text: 'Up to 30% off on every booking'),
              const SizedBox(height: 6),
              _MemberPerk(icon: Icons.star_rounded, text: 'Priority room upgrades'),
              const SizedBox(height: 6),
              _MemberPerk(icon: Icons.restaurant_rounded, text: 'Complimentary breakfast'),
              const SizedBox(height: 20),
              Row(
                children: [
                  Expanded(
                    child: GestureDetector(
                      onTap: () => context.push('/offers'),
                      child: Container(
                        padding: const EdgeInsets.symmetric(vertical: 13),
                        decoration: BoxDecoration(
                          gradient: const LinearGradient(
                            colors: [Color(0xFFF5C518), Color(0xFFE6A817)],
                          ),
                          borderRadius: AppBorders.medium,
                          boxShadow: [
                            BoxShadow(
                              color: const Color(0xFFF5C518).withValues(alpha: 0.35),
                              blurRadius: 12,
                              offset: const Offset(0, 6),
                            ),
                          ],
                        ),
                        child: const Center(
                          child: Text(
                            'Join Now — Free',
                            style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.w900,
                              fontSize: 15,
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
    ).animate().fade(delay: 200.ms).slideY(begin: 0.15);
  }
}

class _MemberPerk extends StatelessWidget {
  final IconData icon;
  final String text;
  const _MemberPerk({required this.icon, required this.text});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          padding: const EdgeInsets.all(5),
          decoration: BoxDecoration(
            color: AppColors.primary.withValues(alpha: 0.15),
            shape: BoxShape.circle,
          ),
          child: Icon(icon, color: AppColors.primary, size: 13),
        ),
        const SizedBox(width: 10),
        Text(
          text,
          style: TextStyle(
            color: Colors.white.withValues(alpha: 0.85),
            fontSize: 13,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}
