import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_spacing.dart';
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
                  HomeAppBar(
                    userName: 'Alex Johnson',
                    hasNotification: true,
                    onNotificationTap: () {},
                    onAvatarTap: () {},
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                    child: SearchInput(
                      controller: _searchController,
                      hintText: 'Search hotels, destinations...',
                      onFilterTap: () {
                        context.push('/rooms');
                      },
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
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
                  const PromoCarousel(),
                  const SizedBox(height: AppSpacing.md),
                  
                  // Featured Rooms Section
                  SectionHeader(
                    title: 'Featured Rooms',
                    onActionTap: () {
                      context.push('/rooms');
                    },
                  ),
                  SizedBox(
                    height: 290,
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
                            onTap: () {
                              context.push('/rooms/${room['id']}');
                            },
                          ),
                        );
                      },
                    ),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  
                  // Hospitality Services Section
                  SectionHeader(
                    title: 'Hospitality & Services',
                    onActionTap: () {
                      context.push('/services');
                    },
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
                            title: service['title'],
                            subtitle: '\$${service['price'].toInt()}',
                            imageUrl: service['imageUrl'],
                            onTap: () {
                              context.push('/services/${service['id']}');
                            },
                          ),
                        );
                      },
                    ),
                  ),
                  
                  // Bottom Padding
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
