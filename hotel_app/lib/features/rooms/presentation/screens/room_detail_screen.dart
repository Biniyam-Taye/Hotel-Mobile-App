import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/buttons/primary_button.dart';
import '../../data/dummy_rooms_data.dart';

class RoomDetailScreen extends StatefulWidget {
  final String roomId;

  const RoomDetailScreen({super.key, required this.roomId});

  @override
  State<RoomDetailScreen> createState() => _RoomDetailScreenState();
}

class _RoomDetailScreenState extends State<RoomDetailScreen> {
  late final Map<String, dynamic>? _room;
  final ScrollController _scrollController = ScrollController();
  bool _isScrolled = false;

  @override
  void initState() {
    super.initState();
    _room = DummyRoomsData.getRoomById(widget.roomId);
    _scrollController.addListener(() {
      if (_scrollController.offset > 50 && !_isScrolled) {
        setState(() => _isScrolled = true);
      } else if (_scrollController.offset <= 50 && _isScrolled) {
        setState(() => _isScrolled = false);
      }
    });
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    if (_room == null) {
      return Scaffold(
        appBar: AppBar(),
        body: const Center(child: Text('Room not found')),
      );
    }

    final List<String> imageUrls = _room['imageUrls'] ?? [];
    final List<Map<String, String>> amenities = _room['amenities'] ?? [];

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Stack(
        children: [
          CustomScrollView(
            controller: _scrollController,
            slivers: [
              // Image Gallery Header
              SliverAppBar(
                expandedHeight: 350,
                pinned: true,
                backgroundColor: Theme.of(context).scaffoldBackgroundColor,
                elevation: _isScrolled ? 4 : 0,
                leading: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    decoration: BoxDecoration(
                      color: Theme.of(context).scaffoldBackgroundColor.withValues(alpha: 0.8),
                      shape: BoxShape.circle,
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 20),
                      onPressed: () => context.pop(),
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                ),
                actions: [
                  Padding(
                    padding: const EdgeInsets.all(8.0),
                    child: Container(
                      decoration: BoxDecoration(
                        color: Theme.of(context).scaffoldBackgroundColor.withValues(alpha: 0.8),
                        shape: BoxShape.circle,
                      ),
                      child: IconButton(
                        icon: Icon(
                          _room['isFavorite'] == true
                              ? Icons.favorite_rounded
                              : Icons.favorite_border_rounded,
                        ),
                        color: _room['isFavorite'] == true
                            ? AppColors.error
                            : Theme.of(context).colorScheme.onSurface,
                        onPressed: () {
                          setState(() {
                            _room['isFavorite'] = !(_room['isFavorite'] ?? false);
                          });
                        },
                      ),
                    ),
                  ),
                ],
                flexibleSpace: FlexibleSpaceBar(
                  background: _ImageGallery(imageUrls: imageUrls),
                ),
              ),

              // Room Information
              SliverToBoxAdapter(
                child: Padding(
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Title & Rating
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Text(
                              _room['title'],
                              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                                    fontWeight: FontWeight.w800,
                                    height: 1.2,
                                  ),
                            ),
                          ),
                          Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: AppSpacing.sm,
                              vertical: 6,
                            ),
                            decoration: BoxDecoration(
                              color: AppColors.primaryContainer,
                              borderRadius: AppBorders.circular,
                            ),
                            child: Row(
                              children: [
                                const Icon(
                                  Icons.star_rounded,
                                  color: AppColors.primary,
                                  size: 18,
                                ),
                                const SizedBox(width: 4),
                                Text(
                                  _room['rating'].toString(),
                                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                                        color: AppColors.primary,
                                        fontWeight: FontWeight.w800,
                                      ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      
                      // Location
                      Row(
                        children: [
                          Icon(
                            Icons.location_on_rounded,
                            color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.5),
                            size: 18,
                          ),
                          const SizedBox(width: 6),
                          Text(
                            _room['location'],
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                  color: Theme.of(context)
                                      .colorScheme
                                      .onSurface
                                      .withValues(alpha: 0.7),
                                ),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.xl),

                      // Description
                      Text(
                        'Description',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.w800,
                            ),
                      ),
                      const SizedBox(height: AppSpacing.sm),
                      Text(
                        _room['description'],
                        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                              color: Theme.of(context)
                                  .colorScheme
                                  .onSurface
                                  .withValues(alpha: 0.7),
                              height: 1.6,
                            ),
                      ),
                      const SizedBox(height: AppSpacing.xl),

                      // Amenities
                      Text(
                        'Amenities',
                        style: Theme.of(context).textTheme.titleLarge?.copyWith(
                              fontWeight: FontWeight.w800,
                            ),
                      ),
                      const SizedBox(height: AppSpacing.md),
                      _AmenitiesGrid(amenities: amenities),
                      
                      const SizedBox(height: AppSpacing.xl),
                      
                      // Reviews Preview
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            'Reviews (${_room['reviews']})',
                            style: Theme.of(context).textTheme.titleLarge?.copyWith(
                                  fontWeight: FontWeight.w800,
                                ),
                          ),
                          TextButton(
                            onPressed: () {},
                            child: const Text('See All'),
                          ),
                        ],
                      ),
                      const SizedBox(height: AppSpacing.md),
                      // Dummy Review
                      Container(
                        padding: const EdgeInsets.all(AppSpacing.md),
                        decoration: BoxDecoration(
                          color: Theme.of(context).cardTheme.color,
                          borderRadius: AppBorders.medium,
                          border: Border.all(
                            color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                CircleAvatar(
                                  backgroundColor: AppColors.primaryContainer,
                                  child: const Text('JD', style: TextStyle(color: AppColors.primary)),
                                ),
                                const SizedBox(width: AppSpacing.md),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        'John Doe',
                                        style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                              fontWeight: FontWeight.w700,
                                            ),
                                      ),
                                      Text(
                                        '2 days ago',
                                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                                              color: AppColors.grey400,
                                            ),
                                      ),
                                    ],
                                  ),
                                ),
                                Row(
                                  children: List.generate(5, (index) => const Icon(
                                    Icons.star_rounded,
                                    color: AppColors.warning,
                                    size: 16,
                                  )),
                                ),
                              ],
                            ),
                            const SizedBox(height: AppSpacing.md),
                            Text(
                              'Absolutely stunning experience! The room was spotless, and the view is exactly as shown in the pictures. Highly recommended!',
                              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                    color: Theme.of(context)
                                        .colorScheme
                                        .onSurface
                                        .withValues(alpha: 0.8),
                                    height: 1.5,
                                  ),
                            ),
                          ],
                        ),
                      ),
                      
                      // Extra space for bottom bar
                      const SizedBox(height: 120),
                    ],
                  ),
                ),
              ),
            ],
          ),
          
          // Sticky Bottom Bar
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: _StickyBottomBar(
              price: _room['price'],
              onBookTap: () {
                context.push('/rooms/${_room['id']}/book');
              },
            ),
          ),
        ],
      ),
    );
  }
}

class _ImageGallery extends StatefulWidget {
  final List<String> imageUrls;

  const _ImageGallery({required this.imageUrls});

  @override
  State<_ImageGallery> createState() => _ImageGalleryState();
}

class _ImageGalleryState extends State<_ImageGallery> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        PageView.builder(
          itemCount: widget.imageUrls.length,
          onPageChanged: (index) => setState(() => _currentIndex = index),
          itemBuilder: (context, index) {
            return Image.network(
              widget.imageUrls[index],
              fit: BoxFit.cover,
            );
          },
        ),
        Positioned(
          bottom: 16,
          right: 16,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: Colors.black.withValues(alpha: 0.5),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Text(
              '${_currentIndex + 1}/${widget.imageUrls.length}',
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w600,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _AmenitiesGrid extends StatelessWidget {
  final List<Map<String, String>> amenities;

  const _AmenitiesGrid({required this.amenities});

  IconData _getIconData(String iconName) {
    switch (iconName) {
      case 'wifi':
        return Icons.wifi_rounded;
      case 'pool':
        return Icons.pool_rounded;
      case 'ac_unit':
        return Icons.ac_unit_rounded;
      case 'room_service':
        return Icons.room_service_rounded;
      case 'tv':
        return Icons.tv_rounded;
      case 'spa':
        return Icons.spa_rounded;
      case 'fireplace':
        return Icons.fireplace_rounded;
      case 'hot_tub':
        return Icons.hot_tub_rounded;
      case 'kitchen':
        return Icons.kitchen_rounded;
      case 'local_parking':
        return Icons.local_parking_rounded;
      case 'fitness_center':
        return Icons.fitness_center_rounded;
      case 'balcony':
        return Icons.balcony_rounded;
      case 'business_center':
        return Icons.business_center_rounded;
      case 'wine_bar':
        return Icons.wine_bar_rounded;
      case 'nature':
        return Icons.nature_rounded;
      case 'shower':
        return Icons.shower_rounded;
      case 'beach_access':
        return Icons.beach_access_rounded;
      default:
        return Icons.check_circle_outline_rounded;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: AppSpacing.md,
      runSpacing: AppSpacing.md,
      children: amenities.map((amenity) {
        return Container(
          width: (MediaQuery.of(context).size.width - (AppSpacing.lg * 2) - AppSpacing.md) / 2,
          padding: const EdgeInsets.all(AppSpacing.sm),
          decoration: BoxDecoration(
            color: Theme.of(context).cardTheme.color,
            borderRadius: AppBorders.medium,
            border: Border.all(
              color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
            ),
          ),
          child: Row(
            children: [
              Icon(
                _getIconData(amenity['icon']!),
                color: AppColors.primary,
                size: 24,
              ),
              const SizedBox(width: AppSpacing.sm),
              Expanded(
                child: Text(
                  amenity['label']!,
                  style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
            ],
          ),
        );
      }).toList(),
    );
  }
}

class _StickyBottomBar extends StatelessWidget {
  final double price;
  final VoidCallback onBookTap;

  const _StickyBottomBar({
    required this.price,
    required this.onBookTap,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.fromLTRB(
        AppSpacing.xl,
        AppSpacing.lg,
        AppSpacing.xl,
        MediaQuery.of(context).padding.bottom + AppSpacing.lg,
      ),
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.05),
            blurRadius: 20,
            offset: const Offset(0, -5),
          ),
        ],
        borderRadius: const BorderRadius.only(
          topLeft: Radius.circular(AppBorders.radiusLarge),
          topRight: Radius.circular(AppBorders.radiusLarge),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Price',
                style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                      color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
                    ),
              ),
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(
                    '\$${price.toInt()}',
                    style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                          color: AppColors.primary,
                          fontWeight: FontWeight.w800,
                        ),
                  ),
                  Text(
                    ' /night',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
                        ),
                  ),
                ],
              ),
            ],
          ),
          SizedBox(
            width: 160,
            child: PrimaryButton(
              text: 'Book Now',
              onPressed: onBookTap,
            ),
          ),
        ],
      ),
    );
  }
}
