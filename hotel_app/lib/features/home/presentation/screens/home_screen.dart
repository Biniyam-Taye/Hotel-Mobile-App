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

  final List<Map<String, dynamic>> _destinations = [
    {
      'city': 'Paris',
      'country': 'France',
      'hotels': 240,
      'imageUrl': 'https://images.unsplash.com/photo-1499856374010-9df3ee6e1e51?auto=format&fit=crop&q=80&w=600',
    },
    {
      'city': 'Bali',
      'country': 'Indonesia',
      'hotels': 185,
      'imageUrl': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600',
    },
    {
      'city': 'Dubai',
      'country': 'UAE',
      'hotels': 310,
      'imageUrl': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80&w=600',
    },
    {
      'city': 'Santorini',
      'country': 'Greece',
      'hotels': 95,
      'imageUrl': 'https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?auto=format&fit=crop&q=80&w=600',
    },
  ];

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

                  // ── Why Choose Us ────────────────────────────────────────
                  _WhyChooseUsSection(),
                  const SizedBox(height: AppSpacing.xxl),

                  // ── CTA Section ──────────────────────────────────────────
                  _CtaSection(),
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
// Stats Banner
// ─────────────────────────────────────────────────────────────
class _StatsBanner extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
      padding: const EdgeInsets.symmetric(vertical: 28, horizontal: AppSpacing.lg),
      decoration: BoxDecoration(
        gradient: const LinearGradient(
          colors: [Color(0xFF1A1A2E), Color(0xFF16213E)],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: AppBorders.large,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.25),
            blurRadius: 24,
            offset: const Offset(0, 12),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: const [
          _StatItem(value: '500+', label: 'Hotels'),
          _StatDivider(),
          _StatItem(value: '80+', label: 'Countries'),
          _StatDivider(),
          _StatItem(value: '2M+', label: 'Happy Guests'),
        ],
      ),
    ).animate().fade(delay: 200.ms).slideY(begin: 0.15);
  }
}

class _StatItem extends StatelessWidget {
  final String value;
  final String label;
  const _StatItem({required this.value, required this.label});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          value,
          style: const TextStyle(
            color: AppColors.primary,
            fontWeight: FontWeight.w900,
            fontSize: 26,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          label,
          style: const TextStyle(
            color: Colors.white60,
            fontSize: 13,
            fontWeight: FontWeight.w500,
          ),
        ),
      ],
    );
  }
}

class _StatDivider extends StatelessWidget {
  const _StatDivider();
  @override
  Widget build(BuildContext context) {
    return Container(width: 1, height: 40, color: Colors.white.withValues(alpha: 0.12));
  }
}

// ─────────────────────────────────────────────────────────────
// Destination Card
// ─────────────────────────────────────────────────────────────
class _DestinationCard extends StatelessWidget {
  final Map<String, dynamic> destination;
  const _DestinationCard({required this.destination});

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: AppBorders.large,
      child: SizedBox(
        width: 145,
        child: Stack(
          children: [
            Positioned.fill(
              child: Image.network(
                destination['imageUrl'],
                fit: BoxFit.cover,
                errorBuilder: (context, error, stack) => Container(color: Colors.grey.shade300),
              ),
            ),
            Positioned.fill(
              child: Container(
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                      Colors.transparent,
                      Colors.black.withValues(alpha: 0.7),
                    ],
                  ),
                ),
              ),
            ),
            Positioned(
              bottom: 14,
              left: 14,
              right: 14,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    destination['city'],
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w900,
                      fontSize: 17,
                    ),
                  ),
                  Text(
                    destination['country'],
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.8),
                      fontSize: 12,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.85),
                      borderRadius: AppBorders.circular,
                    ),
                    child: Text(
                      '${destination['hotels']} Hotels',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 11,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
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
// Why Choose Us
// ─────────────────────────────────────────────────────────────
class _WhyChooseUsSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final features = [
      {'icon': Icons.verified_rounded, 'title': 'Verified Hotels', 'desc': 'Every property is hand-picked and quality-assured.'},
      {'icon': Icons.price_change_rounded, 'title': 'Best Price Guarantee', 'desc': 'Find a lower price and we\'ll match it, instantly.'},
      {'icon': Icons.support_agent_rounded, 'title': '24/7 Concierge', 'desc': 'Our team is always available to assist you.'},
      {'icon': Icons.cancel_rounded, 'title': 'Free Cancellation', 'desc': 'Cancel most bookings for free up to 24h before.'},
    ];

    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Why Choose Us',
            style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: AppSpacing.md),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              mainAxisSpacing: AppSpacing.md,
              crossAxisSpacing: AppSpacing.md,
              childAspectRatio: 1.3,
            ),
            itemCount: features.length,
            itemBuilder: (context, index) {
              final f = features[index];
              return Container(
                padding: const EdgeInsets.all(AppSpacing.md),
                decoration: BoxDecoration(
                  color: Theme.of(context).cardTheme.color,
                  borderRadius: AppBorders.large,
                  border: Border.all(
                    color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(8),
                      decoration: BoxDecoration(
                        color: AppColors.primaryContainer.withValues(alpha: 0.5),
                        borderRadius: AppBorders.medium,
                      ),
                      child: Icon(f['icon'] as IconData, color: AppColors.primary, size: 22),
                    ),
                    const Spacer(),
                    Text(
                      f['title'] as String,
                      style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 13),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      f['desc'] as String,
                      style: TextStyle(
                        fontSize: 11,
                        color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.55),
                        height: 1.4,
                      ),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ).animate().fade(delay: Duration(milliseconds: index * 80)).scale(begin: const Offset(0.95, 0.95));
            },
          ),
        ],
      ),
    );
  }
}

// ─────────────────────────────────────────────────────────────
// CTA Section
// ─────────────────────────────────────────────────────────────
class _CtaSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
      clipBehavior: Clip.antiAlias,
      decoration: BoxDecoration(borderRadius: AppBorders.large),
      child: Stack(
        children: [
          // Background image
          SizedBox(
            height: 240,
            width: double.infinity,
            child: Image.network(
              'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800',
              fit: BoxFit.cover,
              errorBuilder: (context, error, stack) => Container(
                decoration: const BoxDecoration(
                  gradient: LinearGradient(colors: [AppColors.primary, Color(0xFFE65100)]),
                ),
              ),
            ),
          ),
          // Dark overlay
          Container(
            height: 240,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  Colors.black.withValues(alpha: 0.65),
                  Colors.black.withValues(alpha: 0.35),
                ],
              ),
            ),
          ),
          // Content
          SizedBox(
            height: 240,
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.xl),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.primary.withValues(alpha: 0.85),
                      borderRadius: AppBorders.circular,
                    ),
                    child: const Text(
                      'LIMITED OFFER',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w800,
                        fontSize: 11,
                        letterSpacing: 1.2,
                      ),
                    ),
                  ),
                  const SizedBox(height: 14),
                  const Text(
                    'Your Dream\nGetaway Awaits',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w900,
                      fontSize: 28,
                      height: 1.15,
                      letterSpacing: -0.5,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Book now and get up to 30% off\non selected luxury suites.',
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.85),
                      fontSize: 14,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 20),
                  Builder(
                    builder: (context) => GestureDetector(
                      onTap: () => context.push('/rooms'),
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 13),
                        decoration: BoxDecoration(
                          color: AppColors.primary,
                          borderRadius: AppBorders.medium,
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.primary.withValues(alpha: 0.4),
                              blurRadius: 12,
                              offset: const Offset(0, 6),
                            ),
                          ],
                        ),
                        child: const Text(
                          'Explore Rooms →',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w800,
                            fontSize: 15,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    ).animate().fade(delay: 300.ms).slideY(begin: 0.15);
  }
}
