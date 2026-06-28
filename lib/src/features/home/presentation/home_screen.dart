import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen>
    with TickerProviderStateMixin {
  int _selectedCategoryIndex = 0;
  late final ScrollController _scrollController;
  late final AnimationController _fadeController;
  late final Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _scrollController = ScrollController();
    _fadeController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 800),
    );
    _fadeAnimation = CurvedAnimation(
      parent: _fadeController,
      curve: Curves.easeOutCubic,
    );
    _fadeController.forward();
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _fadeController.dispose();
    super.dispose();
  }

  Future<void> _onRefresh() async {
    setState(() {});
    HapticFeedback.mediumImpact();
    await Future.delayed(const Duration(milliseconds: 1200));
    if (mounted) setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final user = MockData.currentUser;
    final screenWidth = MediaQuery.of(context).size.width;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
      body: FadeTransition(
        opacity: _fadeAnimation,
        child: SafeArea(
          child: RefreshIndicator(
            onRefresh: _onRefresh,
            color: AppColors.accent,
            backgroundColor: isDark ? AppColors.darkCard : AppColors.card,
            child: CustomScrollView(
              controller: _scrollController,
              physics: const BouncingScrollPhysics(
                parent: AlwaysScrollableScrollPhysics(),
              ),
              slivers: [
                // ═══════════════════════════════════════════════════════
                // SECTION 1: HERO HEADER
                // ═══════════════════════════════════════════════════════
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
                    child: _HeroHeader(
                      user: user,
                      isDark: isDark,
                      onNotificationTap: () => context.push('/notifications'),
                    ),
                  ),
                ),

                // Search Bar
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
                    child: _PremiumSearchBar(
                      isDark: isDark,
                      onTap: () => context.push('/search'),
                    ),
                  ),
                ),

                // ═══════════════════════════════════════════════════════
                // SECTION 2: EXPLORE CATEGORIES
                // ═══════════════════════════════════════════════════════
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 28),
                    child: SizedBox(
                      height: 46,
                      child: ListView.separated(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        scrollDirection: Axis.horizontal,
                        physics: const BouncingScrollPhysics(),
                        itemCount: MockData.categories.length,
                        separatorBuilder: (_, __) => const SizedBox(width: 10),
                        itemBuilder: (context, index) {
                          final category = MockData.categories[index];
                          final isSelected = _selectedCategoryIndex == index;
                          return GestureDetector(
                            onTap: () {
                              HapticFeedback.selectionClick();
                              if (index == 0) {
                                setState(() => _selectedCategoryIndex = 0);
                              } else {
                                context.push('/category/$category');
                              }
                            },
                            child: AnimatedContainer(
                              duration: const Duration(milliseconds: 250),
                              curve: Curves.easeOutCubic,
                              padding: const EdgeInsets.symmetric(
                                horizontal: 18, vertical: 12,
                              ),
                              decoration: BoxDecoration(
                                color: isSelected
                                    ? AppColors.accent
                                    : (isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary),
                                borderRadius: BorderRadius.circular(999),
                                border: isSelected ? null : Border.all(
                                  color: isDark ? AppColors.darkBorder : AppColors.border,
                                ),
                              ),
                              child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                  Icon(
                                    IconData(
                                      MockData.categoryIcons[category] ?? Icons.hotel.codePoint,
                                      fontFamily: 'MaterialIcons',
                                    ),
                                    size: 16,
                                    color: isSelected
                                        ? AppColors.textOnAccent
                                        : (isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                                  ),
                                  const SizedBox(width: 6),
                                  Text(
                                    category,
                                    style: AppTypography.captionMedium(
                                      color: isSelected
                                          ? AppColors.textOnAccent
                                          : (isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          );
                        },
                      ),
                    ),
                  ),
                ),

                // ═══════════════════════════════════════════════════════
                // SECTION 3: FEATURED HOTELS
                // ═══════════════════════════════════════════════════════
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 36),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: _SectionHeader(
                            title: 'Featured Luxury',
                            subtitle: 'Handpicked five-star experiences',
                            actionText: 'See All',
                            onAction: () {},
                            isDark: isDark,
                          ),
                        ),
                        const SizedBox(height: 20),
                        SizedBox(
                          height: 360,
                          child: ListView.separated(
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            scrollDirection: Axis.horizontal,
                            physics: const BouncingScrollPhysics(),
                            itemCount: MockData.hotels.length,
                            separatorBuilder: (_, __) => const SizedBox(width: 16),
                            itemBuilder: (context, index) {
                              final hotel = MockData.hotels[index];
                              return _FeaturedHotelCard(
                                hotel: hotel,
                                width: screenWidth * 0.78,
                                onTap: () => context.push('/hotel/${hotel.id}'),
                                onFavorite: () {},
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // ═══════════════════════════════════════════════════════
                // SECTION 4: EXCLUSIVE OFFERS
                // ═══════════════════════════════════════════════════════
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 40),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: _SectionHeader(
                            title: 'Exclusive Offers',
                            subtitle: 'Limited time deals for you',
                            actionText: 'View All',
                            onAction: () {},
                            isDark: isDark,
                            badge: 'Hot',
                          ),
                        ),
                        const SizedBox(height: 20),
                        SizedBox(
                          height: 200,
                          child: ListView.separated(
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            scrollDirection: Axis.horizontal,
                            physics: const BouncingScrollPhysics(),
                            itemCount: MockData.offers.length,
                            separatorBuilder: (_, __) => const SizedBox(width: 16),
                            itemBuilder: (context, index) {
                              final offer = MockData.offers[index];
                              return _ExclusiveOfferCard(
                                offer: offer,
                                width: screenWidth * 0.82,
                                isDark: isDark,
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // ═══════════════════════════════════════════════════════
                // SECTION 5: POPULAR DESTINATIONS
                // ═══════════════════════════════════════════════════════
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 40),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: _SectionHeader(
                            title: 'Popular Destinations',
                            subtitle: 'Where travelers love to stay',
                            isDark: isDark,
                          ),
                        ),
                        const SizedBox(height: 20),
                        SizedBox(
                          height: 180,
                          child: ListView.separated(
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            scrollDirection: Axis.horizontal,
                            physics: const BouncingScrollPhysics(),
                            itemCount: MockData.cities.length,
                            separatorBuilder: (_, __) => const SizedBox(width: 14),
                            itemBuilder: (context, index) {
                              final city = MockData.cities[index];
                              return _DestinationCard(
                                city: city,
                                isDark: isDark,
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // ═══════════════════════════════════════════════════════
                // SECTION 6: WHAT OUR GUESTS SAY
                // ═══════════════════════════════════════════════════════
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 40),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: _SectionHeader(
                            title: 'What Our Guests Say',
                            subtitle: 'Real reviews from real travelers',
                            isDark: isDark,
                          ),
                        ),
                        const SizedBox(height: 20),
                        SizedBox(
                          height: 200,
                          child: ListView.separated(
                            padding: const EdgeInsets.symmetric(horizontal: 20),
                            scrollDirection: Axis.horizontal,
                            physics: const BouncingScrollPhysics(),
                            itemCount: MockData.hotels[0].reviews.length,
                            separatorBuilder: (_, __) => const SizedBox(width: 14),
                            itemBuilder: (context, index) {
                              final review = MockData.hotels[0].reviews[index];
                              return _ReviewCard(
                                review: review,
                                isDark: isDark,
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ),

                // ═══════════════════════════════════════════════════════
                // SECTION 7: STAY INSPIRED
                // ═══════════════════════════════════════════════════════
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 40),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: _SectionHeader(
                            title: 'Stay Inspired',
                            subtitle: 'Curated travel stories & guides',
                            isDark: isDark,
                          ),
                        ),
                        const SizedBox(height: 20),
                        ..._buildInspirationCards(isDark, screenWidth),
                      ],
                    ),
                  ),
                ),

                // ═══════════════════════════════════════════════════════
                // SECTION 8: CALL TO ACTION
                // ═══════════════════════════════════════════════════════
                SliverToBoxAdapter(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(20, 40, 20, 120),
                    child: _HomeCtaSection(isDark: isDark),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  List<Widget> _buildInspirationCards(bool isDark, double screenWidth) {
    final items = [
      {
        'title': '10 Best Beachfront Villas in Bali',
        'category': 'Travel Guide',
        'readTime': '5 min read',
        'img': 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&fit=crop',
      },
      {
        'title': 'A Weekend Guide to Paris',
        'category': 'City Breaks',
        'readTime': '8 min read',
        'img': 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&fit=crop',
      },
      {
        'title': 'Top 5 Eco-Friendly Luxury Lodges',
        'category': 'Sustainable Travel',
        'readTime': '4 min read',
        'img': 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&fit=crop',
      },
    ];

    return items.map((item) {
      return Padding(
        padding: const EdgeInsets.fromLTRB(20, 0, 20, 14),
        child: _InspirationCard(
          title: item['title']!,
          category: item['category']!,
          readTime: item['readTime']!,
          imageUrl: item['img']!,
          isDark: isDark,
        ),
      );
    }).toList();
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO HEADER
// ═══════════════════════════════════════════════════════════════════════════
class _HeroHeader extends StatelessWidget {
  final UserProfile user;
  final bool isDark;
  final VoidCallback onNotificationTap;

  const _HeroHeader({
    required this.user,
    required this.isDark,
    required this.onNotificationTap,
  });

  String get _greeting {
    final hour = DateTime.now().hour;
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        // Avatar
        Container(
          width: 52,
          height: 52,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            border: Border.all(color: AppColors.accent, width: 2),
          ),
          child: ClipOval(
            child: CachedNetworkImage(
              imageUrl: user.avatar ?? '',
              fit: BoxFit.cover,
              placeholder: (_, __) => Container(
                color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
              ),
              errorWidget: (_, __, ___) => Container(
                color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                child: const Icon(Icons.person, size: 28),
              ),
            ),
          ),
        ),
        const SizedBox(width: 14),

        // Greeting & Location
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                '$_greeting, ${user.name}',
                style: AppTypography.body(
                  color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                ).copyWith(fontSize: 13),
              ),
              const SizedBox(height: 2),
              Row(
                children: [
                  Icon(
                    Icons.location_on_rounded,
                    size: 14,
                    color: AppColors.accent,
                  ),
                  const SizedBox(width: 4),
                  Flexible(
                    child: Text(
                      user.location ?? 'Current Location',
                      style: AppTypography.bodySemiBold(
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ).copyWith(fontSize: 14),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ),
                  const SizedBox(width: 4),
                  Icon(
                    Icons.keyboard_arrow_down_rounded,
                    size: 18,
                    color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                  ),
                ],
              ),
            ],
          ),
        ),

        // Notification Bell
        _AnimatedIconButton(
          icon: Icons.notifications_outlined,
          badgeCount: 3,
          isDark: isDark,
          onTap: onNotificationTap,
        ),
      ],
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED ICON BUTTON WITH BADGE
// ═══════════════════════════════════════════════════════════════════════════
class _AnimatedIconButton extends StatefulWidget {
  final IconData icon;
  final int badgeCount;
  final bool isDark;
  final VoidCallback onTap;

  const _AnimatedIconButton({
    required this.icon,
    required this.badgeCount,
    required this.isDark,
    required this.onTap,
  });

  @override
  State<_AnimatedIconButton> createState() => _AnimatedIconButtonState();
}

class _AnimatedIconButtonState extends State<_AnimatedIconButton>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 120),
    );
    _scale = Tween<double>(begin: 1.0, end: 0.9).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) {
        _controller.reverse();
        widget.onTap();
      },
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            shape: BoxShape.circle,
            color: widget.isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
            border: Border.all(
              color: widget.isDark ? AppColors.darkBorder : AppColors.border,
            ),
          ),
          child: Stack(
            alignment: Alignment.center,
            children: [
              Icon(
                widget.icon,
                size: 22,
                color: widget.isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
              ),
              if (widget.badgeCount > 0)
                Positioned(
                  top: 10,
                  right: 10,
                  child: Container(
                    width: 10,
                    height: 10,
                    decoration: BoxDecoration(
                      color: AppColors.error,
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: widget.isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
                        width: 1.5,
                      ),
                    ),
                  ),
                ),
            ],
          ),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM SEARCH BAR
// ═══════════════════════════════════════════════════════════════════════════
class _PremiumSearchBar extends StatelessWidget {
  final bool isDark;
  final VoidCallback onTap;

  const _PremiumSearchBar({required this.isDark, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 56,
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
          borderRadius: BorderRadius.circular(28),
          border: Border.all(
            color: isDark ? AppColors.darkBorder : AppColors.border,
          ),
        ),
        child: Row(
          children: [
            const SizedBox(width: 18),
            Icon(
              Icons.search_rounded,
              size: 22,
              color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                'Search hotels, destinations...',
                style: AppTypography.body(
                  color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                ).copyWith(fontSize: 14),
              ),
            ),
            // Voice search
            Container(
              width: 36,
              height: 36,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: isDark ? AppColors.darkBackground : AppColors.background,
              ),
              child: Icon(
                Icons.mic_none_rounded,
                size: 18,
                color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
              ),
            ),
            const SizedBox(width: 6),
            // Filter
            Container(
              width: 42,
              height: 42,
              decoration: BoxDecoration(
                color: AppColors.accent,
                borderRadius: BorderRadius.circular(14),
              ),
              child: const Icon(
                Icons.tune_rounded,
                size: 20,
                color: AppColors.textOnAccent,
              ),
            ),
            const SizedBox(width: 7),
          ],
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// SECTION HEADER
// ═══════════════════════════════════════════════════════════════════════════
class _SectionHeader extends StatelessWidget {
  final String title;
  final String? subtitle;
  final String? actionText;
  final VoidCallback? onAction;
  final bool isDark;
  final String? badge;

  const _SectionHeader({
    required this.title,
    this.subtitle,
    this.actionText,
    this.onAction,
    required this.isDark,
    this.badge,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                title,
                style: AppTypography.sectionTitle(
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
            ),
            if (badge != null) ...[
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: AppColors.error.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(999),
                ),
                child: Text(
                  badge!,
                  style: AppTypography.label(color: AppColors.error).copyWith(
                    fontWeight: FontWeight.w600,
                    fontSize: 11,
                  ),
                ),
              ),
              const SizedBox(width: 8),
            ],
            if (actionText != null)
              GestureDetector(
                onTap: onAction,
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.accent.withOpacity(0.12),
                    borderRadius: BorderRadius.circular(999),
                  ),
                  child: Text(
                    actionText!,
                    style: AppTypography.captionMedium(
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    ).copyWith(fontWeight: FontWeight.w600),
                  ),
                ),
              ),
          ],
        ),
        if (subtitle != null) ...[
          const SizedBox(height: 4),
          Text(
            subtitle!,
            style: AppTypography.caption(
              color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
            ),
          ),
        ],
      ],
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// FEATURED HOTEL CARD
// ═══════════════════════════════════════════════════════════════════════════
class _FeaturedHotelCard extends StatefulWidget {
  final Hotel hotel;
  final double width;
  final VoidCallback onTap;
  final VoidCallback onFavorite;

  const _FeaturedHotelCard({
    required this.hotel,
    required this.width,
    required this.onTap,
    required this.onFavorite,
  });

  @override
  State<_FeaturedHotelCard> createState() => _FeaturedHotelCardState();
}

class _FeaturedHotelCardState extends State<_FeaturedHotelCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );
    _scale = Tween<double>(begin: 1.0, end: 0.97).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final hotel = widget.hotel;

    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) {
        _controller.reverse();
        widget.onTap();
      },
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: SizedBox(
          width: widget.width,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Image with overlays
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(28),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.08),
                        blurRadius: 24,
                        offset: const Offset(0, 8),
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(28),
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        // Hotel image
                        Hero(
                          tag: 'hotel_image_${hotel.id}',
                          child: CachedNetworkImage(
                            imageUrl: hotel.images.first,
                            fit: BoxFit.cover,
                            placeholder: (_, __) => Container(
                              color: isDark ? AppColors.darkShimmerBase : AppColors.shimmerBase,
                            ),
                            errorWidget: (_, __, ___) => Container(
                              color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                              child: const Icon(Icons.hotel, size: 48),
                            ),
                          ),
                        ),

                        // Gradient
                        Positioned.fill(
                          child: DecoratedBox(
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                                colors: [
                                  Colors.transparent,
                                  Colors.transparent,
                                  Colors.black.withOpacity(0.25),
                                  Colors.black.withOpacity(0.7),
                                ],
                                stops: const [0.0, 0.4, 0.65, 1.0],
                              ),
                            ),
                          ),
                        ),

                        // Discount badge
                        if (hotel.discount != null)
                          Positioned(
                            top: 16,
                            left: 16,
                            child: Container(
                              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                              decoration: BoxDecoration(
                                color: AppColors.accent,
                                borderRadius: BorderRadius.circular(999),
                              ),
                              child: Text(
                                hotel.discount!,
                                style: AppTypography.labelBold(color: AppColors.textOnAccent),
                              ),
                            ),
                          ),

                        // Favorite
                        Positioned(
                          top: 16,
                          right: 16,
                          child: GestureDetector(
                            onTap: widget.onFavorite,
                            child: Container(
                              width: 40,
                              height: 40,
                              decoration: BoxDecoration(
                                color: Colors.black.withOpacity(0.3),
                                shape: BoxShape.circle,
                              ),
                              child: Icon(
                                hotel.isFavorite ? Icons.favorite_rounded : Icons.favorite_border_rounded,
                                size: 20,
                                color: hotel.isFavorite ? AppColors.error : Colors.white,
                              ),
                            ),
                          ),
                        ),

                        // Bottom info
                        Positioned(
                          left: 16,
                          right: 16,
                          bottom: 16,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Material(
                                color: Colors.transparent,
                                child: Text(
                                  hotel.name,
                                  style: AppTypography.cardTitle(color: Colors.white),
                                  maxLines: 1,
                                  overflow: TextOverflow.ellipsis,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Row(
                                children: [
                                  Icon(Icons.location_on_outlined, size: 13, color: Colors.white.withOpacity(0.8)),
                                  const SizedBox(width: 4),
                                  Expanded(
                                    child: Text(
                                      hotel.location,
                                      style: AppTypography.caption(color: Colors.white.withOpacity(0.8)),
                                      maxLines: 1,
                                      overflow: TextOverflow.ellipsis,
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
                ),
              ),

              // Bottom details row
              Padding(
                padding: const EdgeInsets.fromLTRB(4, 12, 4, 0),
                child: Row(
                  children: [
                    // Rating
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: AppColors.accent,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.star_rounded, size: 14, color: AppColors.textOnAccent),
                          const SizedBox(width: 2),
                          Text(
                            hotel.rating.toString(),
                            style: AppTypography.captionMedium(color: AppColors.textOnAccent).copyWith(fontWeight: FontWeight.w700),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    Text(
                      '(${hotel.reviewCount} reviews)',
                      style: AppTypography.caption(
                        color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                      ),
                    ),
                    const Spacer(),
                    if (hotel.originalPrice != null) ...[
                      Text(
                        '\$${hotel.originalPrice!.toInt()}',
                        style: AppTypography.priceOld(
                          color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                        ).copyWith(fontSize: 13),
                      ),
                      const SizedBox(width: 6),
                    ],
                    Text(
                      '\$${hotel.pricePerNight.toInt()}',
                      style: AppTypography.priceSmall(
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                    Text(
                      '/night',
                      style: AppTypography.caption(
                        color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// EXCLUSIVE OFFER CARD
// ═══════════════════════════════════════════════════════════════════════════
class _ExclusiveOfferCard extends StatefulWidget {
  final Offer offer;
  final double width;
  final bool isDark;

  const _ExclusiveOfferCard({
    required this.offer,
    required this.width,
    required this.isDark,
  });

  @override
  State<_ExclusiveOfferCard> createState() => _ExclusiveOfferCardState();
}

class _ExclusiveOfferCardState extends State<_ExclusiveOfferCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );
    _scale = Tween<double>(begin: 1.0, end: 0.97).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: Container(
          width: widget.width,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(24),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.06),
                blurRadius: 20,
                offset: const Offset(0, 6),
              ),
            ],
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(24),
            child: Stack(
              fit: StackFit.expand,
              children: [
                // Background image
                CachedNetworkImage(
                  imageUrl: widget.offer.image,
                  fit: BoxFit.cover,
                  placeholder: (_, __) => Container(
                    color: widget.isDark ? AppColors.darkShimmerBase : AppColors.shimmerBase,
                  ),
                  errorWidget: (_, __, ___) => Container(
                    color: AppColors.accent.withOpacity(0.2),
                  ),
                ),

                // Gradient overlay
                Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.centerLeft,
                      end: Alignment.centerRight,
                      colors: [
                        Colors.black.withOpacity(0.7),
                        Colors.black.withOpacity(0.2),
                      ],
                    ),
                  ),
                ),

                // Content
                Padding(
                  padding: const EdgeInsets.all(22),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Discount badge
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.accent,
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: Text(
                          '${widget.offer.discountPercent.toInt()}% OFF',
                          style: AppTypography.labelBold(color: AppColors.textOnAccent),
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        widget.offer.title,
                        style: AppTypography.cardTitle(color: Colors.white),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 4),
                      Text(
                        widget.offer.subtitle,
                        style: AppTypography.caption(color: Colors.white.withOpacity(0.8)),
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 14),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(999),
                        ),
                        child: Text(
                          'Claim Offer',
                          style: AppTypography.captionMedium(color: AppColors.textPrimary).copyWith(
                            fontWeight: FontWeight.w600,
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
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// DESTINATION CARD
// ═══════════════════════════════════════════════════════════════════════════
class _DestinationCard extends StatefulWidget {
  final City city;
  final bool isDark;

  const _DestinationCard({required this.city, required this.isDark});

  @override
  State<_DestinationCard> createState() => _DestinationCardState();
}

class _DestinationCardState extends State<_DestinationCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );
    _scale = Tween<double>(begin: 1.0, end: 0.95).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: SizedBox(
          width: 140,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // City image
              Expanded(
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(22),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withOpacity(0.06),
                        blurRadius: 16,
                        offset: const Offset(0, 6),
                      ),
                    ],
                  ),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(22),
                    child: Stack(
                      fit: StackFit.expand,
                      children: [
                        CachedNetworkImage(
                          imageUrl: widget.city.image,
                          fit: BoxFit.cover,
                          placeholder: (_, __) => Container(
                            color: widget.isDark ? AppColors.darkShimmerBase : AppColors.shimmerBase,
                          ),
                          errorWidget: (_, __, ___) => Container(
                            color: widget.isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                          ),
                        ),
                        // Bottom gradient
                        Positioned(
                          bottom: 0,
                          left: 0,
                          right: 0,
                          height: 60,
                          child: Container(
                            decoration: BoxDecoration(
                              gradient: LinearGradient(
                                begin: Alignment.topCenter,
                                end: Alignment.bottomCenter,
                                colors: [
                                  Colors.transparent,
                                  Colors.black.withOpacity(0.5),
                                ],
                              ),
                            ),
                          ),
                        ),
                        // City name overlay
                        Positioned(
                          bottom: 10,
                          left: 12,
                          right: 12,
                          child: Text(
                            widget.city.name,
                            style: AppTypography.bodySemiBold(color: Colors.white).copyWith(fontSize: 14),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 8),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 4),
                child: Text(
                  '${widget.city.hotelCount} properties',
                  style: AppTypography.caption(
                    color: widget.isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// REVIEW CARD
// ═══════════════════════════════════════════════════════════════════════════
class _ReviewCard extends StatelessWidget {
  final Review review;
  final bool isDark;

  const _ReviewCard({required this.review, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 300,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.border,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header
          Row(
            children: [
              ClipOval(
                child: CachedNetworkImage(
                  imageUrl: review.userAvatar,
                  width: 40,
                  height: 40,
                  fit: BoxFit.cover,
                  placeholder: (_, __) => Container(
                    width: 40,
                    height: 40,
                    color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                  ),
                  errorWidget: (_, __, ___) => Container(
                    width: 40,
                    height: 40,
                    color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                    child: const Icon(Icons.person, size: 20),
                  ),
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Flexible(
                          child: Text(
                            review.userName,
                            style: AppTypography.bodySemiBold(
                              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                            ).copyWith(fontSize: 14),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        if (review.isVerified) ...[
                          const SizedBox(width: 6),
                          Icon(Icons.verified_rounded, size: 14, color: AppColors.info),
                        ],
                      ],
                    ),
                    const SizedBox(height: 2),
                    Row(
                      children: List.generate(5, (i) {
                        return Icon(
                          i < review.rating.floor() ? Icons.star_rounded : Icons.star_border_rounded,
                          size: 14,
                          color: AppColors.starFilled,
                        );
                      }),
                    ),
                  ],
                ),
              ),
            ],
          ),
          const SizedBox(height: 14),
          // Comment
          Expanded(
            child: Text(
              review.comment,
              style: AppTypography.caption(
                color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
              ).copyWith(height: 1.5),
              maxLines: 4,
              overflow: TextOverflow.ellipsis,
            ),
          ),
        ],
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// INSPIRATION CARD (Vertical list style)
// ═══════════════════════════════════════════════════════════════════════════
class _InspirationCard extends StatefulWidget {
  final String title;
  final String category;
  final String readTime;
  final String imageUrl;
  final bool isDark;

  const _InspirationCard({
    required this.title,
    required this.category,
    required this.readTime,
    required this.imageUrl,
    required this.isDark,
  });

  @override
  State<_InspirationCard> createState() => _InspirationCardState();
}

class _InspirationCardState extends State<_InspirationCard>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );
    _scale = Tween<double>(begin: 1.0, end: 0.98).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: Container(
          height: 120,
          decoration: BoxDecoration(
            color: widget.isDark ? AppColors.darkCard : AppColors.card,
            borderRadius: BorderRadius.circular(22),
            border: Border.all(
              color: widget.isDark ? AppColors.darkBorder : AppColors.border,
            ),
          ),
          child: Row(
            children: [
              // Image
              ClipRRect(
                borderRadius: const BorderRadius.horizontal(left: Radius.circular(22)),
                child: CachedNetworkImage(
                  imageUrl: widget.imageUrl,
                  width: 120,
                  height: 120,
                  fit: BoxFit.cover,
                  placeholder: (_, __) => Container(
                    width: 120,
                    color: widget.isDark ? AppColors.darkShimmerBase : AppColors.shimmerBase,
                  ),
                  errorWidget: (_, __, ___) => Container(
                    width: 120,
                    color: widget.isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                  ),
                ),
              ),

              // Content
              Expanded(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                            decoration: BoxDecoration(
                              color: AppColors.accent.withOpacity(0.15),
                              borderRadius: BorderRadius.circular(999),
                            ),
                            child: Text(
                              widget.category,
                              style: AppTypography.label(color: AppColors.accentDark).copyWith(
                                fontWeight: FontWeight.w600,
                              ),
                            ),
                          ),
                          const SizedBox(width: 8),
                          Text(
                            widget.readTime,
                            style: AppTypography.label(
                              color: widget.isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Text(
                        widget.title,
                        style: AppTypography.bodySemiBold(
                          color: widget.isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ).copyWith(fontSize: 14, height: 1.3),
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Text(
                            'Read more',
                            style: AppTypography.captionMedium(color: AppColors.accent).copyWith(
                              fontWeight: FontWeight.w600,
                            ),
                          ),
                          const SizedBox(width: 4),
                          Icon(Icons.arrow_forward_rounded, size: 14, color: AppColors.accent),
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// HOME CTA SECTION
// ═══════════════════════════════════════════════════════════════════════════
class _HomeCtaSection extends StatefulWidget {
  final bool isDark;

  const _HomeCtaSection({required this.isDark});

  @override
  State<_HomeCtaSection> createState() => _HomeCtaSectionState();
}

class _HomeCtaSectionState extends State<_HomeCtaSection>
    with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<double> _scale;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 150),
    );
    _scale = Tween<double>(begin: 1.0, end: 0.96).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOut),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) => _controller.reverse(),
      onTapCancel: () => _controller.reverse(),
      child: ScaleTransition(
        scale: _scale,
        child: Container(
          width: double.infinity,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(28),
            color: widget.isDark ? const Color(0xFF161616) : const Color(0xFF111111),
            boxShadow: [
              BoxShadow(
                color: AppColors.accent.withOpacity(0.15),
                blurRadius: 30,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Stack(
            children: [
              // Abstract shapes for premium feel
              Positioned(
                top: -50,
                right: -50,
                child: Container(
                  width: 150,
                  height: 150,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: AppColors.accent.withOpacity(0.1),
                  ),
                ),
              ),
              Positioned(
                bottom: -30,
                left: -20,
                child: Container(
                  width: 100,
                  height: 100,
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: AppColors.accent.withOpacity(0.05),
                  ),
                ),
              ),
              
              // Content
              Padding(
                padding: const EdgeInsets.all(32),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Container(
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: AppColors.accent.withOpacity(0.15),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.diamond_rounded,
                        color: AppColors.accent,
                        size: 32,
                      ),
                    ),
                    const SizedBox(height: 20),
                    Text(
                      'LuxeStay Rewards',
                      style: AppTypography.pageTitle(color: Colors.white).copyWith(fontSize: 24),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 12),
                    Text(
                      'Unlock exclusive member rates, complimentary upgrades, and tailored experiences.',
                      style: AppTypography.body(color: Colors.white.withOpacity(0.7)),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 28),
                    Container(
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(vertical: 16),
                      decoration: BoxDecoration(
                        color: AppColors.accent,
                        borderRadius: BorderRadius.circular(16),
                      ),
                      alignment: Alignment.center,
                      child: Text(
                        'Join for Free',
                        style: AppTypography.bodySemiBold(color: AppColors.textOnAccent),
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

