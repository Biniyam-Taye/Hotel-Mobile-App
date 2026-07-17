import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../core/network/api_client.dart';
import '../data/engagement_repository.dart';
import '../domain/engagement_models.dart';

part 'engagement_provider.g.dart';

@riverpod
EngagementRepository engagementRepository(Ref ref) {
  final dio = ref.watch(apiClientProvider);
  return EngagementRepository(dio: dio);
}

@riverpod
class MyFavorites extends _$MyFavorites {
  @override
  Future<List<FavoriteRoom>> build() {
    return ref.watch(engagementRepositoryProvider).getFavorites();
  }

  Future<void> toggleFavorite(String itemId, String itemType) async {
    await ref.read(engagementRepositoryProvider).toggleFavorite(itemId, itemType);
    ref.invalidateSelf();
  }
}

@riverpod
class MyNotifications extends _$MyNotifications {
  @override
  Future<List<NotificationModel>> build() {
    return ref.watch(engagementRepositoryProvider).getMyNotifications();
  }

  Future<void> markRead(String id) async {
    await ref.read(engagementRepositoryProvider).markNotificationRead(id);
    ref.invalidateSelf();
  }
}
