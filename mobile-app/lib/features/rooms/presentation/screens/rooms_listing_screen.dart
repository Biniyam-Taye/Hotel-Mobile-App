import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../../core/widgets/inputs/search_input.dart';
import '../../../home/presentation/widgets/category_chips_list.dart';
import '../widgets/room_list_card.dart';
import '../../providers/rooms_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class RoomsListingScreen extends ConsumerStatefulWidget {
  const RoomsListingScreen({super.key});

  @override
  ConsumerState<RoomsListingScreen> createState() => _RoomsListingScreenState();
}

class _RoomsListingScreenState extends ConsumerState<RoomsListingScreen> {
  final TextEditingController _searchController = TextEditingController();
  final ScrollController _scrollController = ScrollController();
  
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      ref.read(roomsProvider.notifier).fetchRooms();
    });
    
    _scrollController.addListener(() {
      if (_scrollController.position.pixels >= _scrollController.position.maxScrollExtent - 200) {
        ref.read(roomsProvider.notifier).fetchMoreRooms();
      }
    });
  }

  @override
  void dispose() {
    _searchController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  void _filterRooms(String category) {
    if (category == 'All' || category == 'Rooms') {
      ref.read(roomsProvider.notifier).fetchRooms(roomType: 'all');
    } else {
      ref.read(roomsProvider.notifier).fetchRooms(roomType: category.toLowerCase());
    }
  }

  @override
  Widget build(BuildContext context) {
    final roomsState = ref.watch(roomsProvider);
    
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(
        title: 'Discover Rooms',
      ),
      body: Column(
        children: [
          // Search & Filter Header
          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: AppSpacing.md,
            ),
            child: SearchInput(
              controller: _searchController,
              hintText: 'Search destinations, hotels...',
              onFilterTap: () {
                // Future: show advanced filter bottom sheet
              },
              onSubmitted: (value) {
                ref.read(roomsProvider.notifier).fetchRooms(search: value);
              },
            ),
          ),
          
          // Category Chips
          CategoryChipsList(
            onCategorySelected: _filterRooms,
          ),
          const SizedBox(height: AppSpacing.md),
          
          // Room List
          if (roomsState.isLoading)
            const Expanded(child: Center(child: CircularProgressIndicator()))
          else if (roomsState.error != null)
            Expanded(
              child: Center(
                child: Text('Error: ${roomsState.error}', style: const TextStyle(color: Colors.red)),
              ),
            )
          else if (roomsState.rooms.isEmpty)
            Expanded(
              child: Center(
                child: Text('No rooms found', style: Theme.of(context).textTheme.bodyLarge),
              ),
            )
          else
            Expanded(
              child: ListView.separated(
                controller: _scrollController,
                padding: const EdgeInsets.symmetric(
                  horizontal: AppSpacing.lg,
                  vertical: AppSpacing.md,
                ),
                itemCount: roomsState.rooms.length + (roomsState.isFetchingMore ? 1 : 0),
                separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.xl),
                itemBuilder: (context, index) {
                  if (index == roomsState.rooms.length) {
                    return const Center(child: CircularProgressIndicator());
                  }
                  final room = roomsState.rooms[index];
                  final Map<String, dynamic> roomMap = {
                    'id': room.id,
                    'title': room.title,
                    'location': 'Grand Hotel - ${room.roomType}',
                    'rating': 4.8,
                    'reviews': 120,
                    'price': room.pricePerNight,
                    'imageUrls': room.images.isNotEmpty ? room.images : ['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800'],
                    'isFavorite': false,
                  };
                  return RoomListCard(
                    room: roomMap,
                    onTap: () {
                      context.push('/rooms/${room.id}');
                    },
                    onFavoriteTap: () {},
                  ).animate(delay: (index * 50).ms).fade(duration: 300.ms).slideY(begin: 0.1, curve: Curves.easeOutQuart);
                },
              ),
            ),
        ],
      ),
    );
  }
}
