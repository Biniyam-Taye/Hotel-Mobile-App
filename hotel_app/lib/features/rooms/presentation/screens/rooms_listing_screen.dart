import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../../core/widgets/inputs/search_input.dart';
import '../../../home/presentation/widgets/category_chips_list.dart';
import '../../data/dummy_rooms_data.dart';
import '../widgets/room_list_card.dart';

class RoomsListingScreen extends StatefulWidget {
  const RoomsListingScreen({super.key});

  @override
  State<RoomsListingScreen> createState() => _RoomsListingScreenState();
}

class _RoomsListingScreenState extends State<RoomsListingScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<Map<String, dynamic>> _displayedRooms = DummyRoomsData.rooms;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _filterRooms(String category) {
    if (category == 'All' || category == 'Rooms') {
      setState(() {
        _displayedRooms = DummyRoomsData.rooms;
      });
    } else {
      setState(() {
        _displayedRooms = DummyRoomsData.rooms
            .where((room) => room['category'] == category)
            .toList();
      });
    }
  }

  @override
  Widget build(BuildContext context) {
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
            ),
          ),
          
          // Category Chips
          CategoryChipsList(
            onCategorySelected: _filterRooms,
          ),
          const SizedBox(height: AppSpacing.md),
          
          // Room List
          Expanded(
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(
                horizontal: AppSpacing.lg,
                vertical: AppSpacing.md,
              ),
              itemCount: _displayedRooms.length,
              separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.xl),
              itemBuilder: (context, index) {
                final room = _displayedRooms[index];
                return RoomListCard(
                  room: room,
                  onTap: () {
                    context.push('/rooms/${room['id']}');
                  },
                  onFavoriteTap: () {
                    setState(() {
                      room['isFavorite'] = !(room['isFavorite'] ?? false);
                    });
                  },
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
