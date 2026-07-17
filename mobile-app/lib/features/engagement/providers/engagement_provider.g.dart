// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'engagement_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(engagementRepository)
final engagementRepositoryProvider = EngagementRepositoryProvider._();

final class EngagementRepositoryProvider
    extends
        $FunctionalProvider<
          EngagementRepository,
          EngagementRepository,
          EngagementRepository
        >
    with $Provider<EngagementRepository> {
  EngagementRepositoryProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'engagementRepositoryProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$engagementRepositoryHash();

  @$internal
  @override
  $ProviderElement<EngagementRepository> $createElement(
    $ProviderPointer pointer,
  ) => $ProviderElement(pointer);

  @override
  EngagementRepository create(Ref ref) {
    return engagementRepository(ref);
  }

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(EngagementRepository value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<EngagementRepository>(value),
    );
  }
}

String _$engagementRepositoryHash() =>
    r'3fb7a039bf2f4767c7dcd1f1132cd050df7846f7';

@ProviderFor(MyFavorites)
final myFavoritesProvider = MyFavoritesProvider._();

final class MyFavoritesProvider
    extends $AsyncNotifierProvider<MyFavorites, List<FavoriteRoom>> {
  MyFavoritesProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'myFavoritesProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$myFavoritesHash();

  @$internal
  @override
  MyFavorites create() => MyFavorites();
}

String _$myFavoritesHash() => r'57007f1c4680e73d86587a457744e10e3eee95ab';

abstract class _$MyFavorites extends $AsyncNotifier<List<FavoriteRoom>> {
  FutureOr<List<FavoriteRoom>> build();
  @$mustCallSuper
  @override
  WhenComplete runBuild() {
    final ref =
        this.ref as $Ref<AsyncValue<List<FavoriteRoom>>, List<FavoriteRoom>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<AsyncValue<List<FavoriteRoom>>, List<FavoriteRoom>>,
              AsyncValue<List<FavoriteRoom>>,
              Object?,
              Object?
            >;
    return element.handleCreate(ref, build);
  }
}

@ProviderFor(MyNotifications)
final myNotificationsProvider = MyNotificationsProvider._();

final class MyNotificationsProvider
    extends $AsyncNotifierProvider<MyNotifications, List<NotificationModel>> {
  MyNotificationsProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'myNotificationsProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$myNotificationsHash();

  @$internal
  @override
  MyNotifications create() => MyNotifications();
}

String _$myNotificationsHash() => r'ea384b1736d95aebf958aeb609431d471e698858';

abstract class _$MyNotifications
    extends $AsyncNotifier<List<NotificationModel>> {
  FutureOr<List<NotificationModel>> build();
  @$mustCallSuper
  @override
  WhenComplete runBuild() {
    final ref =
        this.ref
            as $Ref<
              AsyncValue<List<NotificationModel>>,
              List<NotificationModel>
            >;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<
                AsyncValue<List<NotificationModel>>,
                List<NotificationModel>
              >,
              AsyncValue<List<NotificationModel>>,
              Object?,
              Object?
            >;
    return element.handleCreate(ref, build);
  }
}
