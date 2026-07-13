import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../rooms/data/dummy_rooms_data.dart';
import '../../../rooms/presentation/widgets/room_list_card.dart';

class FavoritesScreen extends StatefulWidget {
  const FavoritesScreen({super.key});

  @override
  State<FavoritesScreen> createState() => _FavoritesScreenState();
}

class _FavoritesScreenState extends State<FavoritesScreen> {
  late List<Map<String, dynamic>> _favoriteRooms;

  @override
  void initState() {
    super.initState();
    _favoriteRooms =
        DummyRoomsData.rooms.where((room) => room['isFavorite'] == true).toList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Favorites'),
      body: _favoriteRooms.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.favorite_border_rounded,
                    size: 72,
                    color: AppColors.grey300,
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Text(
                    'No favorites yet',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                          fontWeight: FontWeight.w700,
                        ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Rooms you heart will appear here.',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: AppColors.grey400,
                        ),
                  ),
                ],
              ),
            )
          : ListView.separated(
              padding: const EdgeInsets.all(AppSpacing.lg),
              itemCount: _favoriteRooms.length,
              separatorBuilder: (context, index) =>
                  const SizedBox(height: AppSpacing.lg),
              itemBuilder: (context, index) {
                final room = _favoriteRooms[index];
                return RoomListCard(
                  room: room,
                  onTap: () => context.push('/rooms/${room['id']}'),
                  onFavoriteTap: () {
                    setState(() {
                      room['isFavorite'] = false;
                      _favoriteRooms = DummyRoomsData.rooms
                          .where((r) => r['isFavorite'] == true)
                          .toList();
                    });
                  },
                ).animate(delay: (index * 50).ms).fade(duration: 300.ms).slideY(begin: 0.1, curve: Curves.easeOutQuart);
              },
            ),
    );
  }
}
