import 'package:flutter/material.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../rooms/data/dummy_rooms_data.dart';
import '../../../rooms/presentation/widgets/room_list_card.dart';

class FavoritesScreen extends StatelessWidget {
  const FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    // Filter rooms marked as favorite
    final favoriteRooms = DummyRoomsData.rooms.where((room) => room['isFavorite'] == true).toList();

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(
        title: 'Favorites',
      ),
      body: favoriteRooms.isEmpty
          ? Center(
              child: Text(
                'No favorites yet!',
                style: Theme.of(context).textTheme.titleMedium,
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(AppSpacing.lg),
              itemCount: favoriteRooms.length,
              separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.lg),
              itemBuilder: (context, index) {
                final room = favoriteRooms[index];
                return RoomListCard(
                  room: room,
                  onTap: () {},
                  onFavoriteTap: () {},
                );
              },
            ),
    );
  }
}
