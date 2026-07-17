// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'restaurant_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(restaurantRepository)
final restaurantRepositoryProvider = RestaurantRepositoryProvider._();

final class RestaurantRepositoryProvider
    extends
        $FunctionalProvider<
          RestaurantRepository,
          RestaurantRepository,
          RestaurantRepository
        >
    with $Provider<RestaurantRepository> {
  RestaurantRepositoryProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'restaurantRepositoryProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$restaurantRepositoryHash();

  @$internal
  @override
  $ProviderElement<RestaurantRepository> $createElement(
    $ProviderPointer pointer,
  ) => $ProviderElement(pointer);

  @override
  RestaurantRepository create(Ref ref) {
    return restaurantRepository(ref);
  }

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(RestaurantRepository value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<RestaurantRepository>(value),
    );
  }
}

String _$restaurantRepositoryHash() =>
    r'48de60e353fc5e24e28245f1eff6f3d66389eaef';

@ProviderFor(foodCategories)
final foodCategoriesProvider = FoodCategoriesProvider._();

final class FoodCategoriesProvider
    extends
        $FunctionalProvider<
          AsyncValue<List<FoodCategory>>,
          List<FoodCategory>,
          FutureOr<List<FoodCategory>>
        >
    with
        $FutureModifier<List<FoodCategory>>,
        $FutureProvider<List<FoodCategory>> {
  FoodCategoriesProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'foodCategoriesProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$foodCategoriesHash();

  @$internal
  @override
  $FutureProviderElement<List<FoodCategory>> $createElement(
    $ProviderPointer pointer,
  ) => $FutureProviderElement(pointer);

  @override
  FutureOr<List<FoodCategory>> create(Ref ref) {
    return foodCategories(ref);
  }
}

String _$foodCategoriesHash() => r'e5f306afd1cd5e5c89bdf641d114cb412d3adcd7';

@ProviderFor(FoodItems)
final foodItemsProvider = FoodItemsFamily._();

final class FoodItemsProvider
    extends $AsyncNotifierProvider<FoodItems, List<FoodItem>> {
  FoodItemsProvider._({
    required FoodItemsFamily super.from,
    required ({String? categoryId, String? search}) super.argument,
  }) : super(
         retry: null,
         name: r'foodItemsProvider',
         isAutoDispose: true,
         dependencies: null,
         $allTransitiveDependencies: null,
       );

  @override
  String debugGetCreateSourceHash() => _$foodItemsHash();

  @override
  String toString() {
    return r'foodItemsProvider'
        ''
        '$argument';
  }

  @$internal
  @override
  FoodItems create() => FoodItems();

  @override
  bool operator ==(Object other) {
    return other is FoodItemsProvider && other.argument == argument;
  }

  @override
  int get hashCode {
    return argument.hashCode;
  }
}

String _$foodItemsHash() => r'217c2772013970e27642d23a142b88813497fffa';

final class FoodItemsFamily extends $Family
    with
        $ClassFamilyOverride<
          FoodItems,
          AsyncValue<List<FoodItem>>,
          List<FoodItem>,
          FutureOr<List<FoodItem>>,
          ({String? categoryId, String? search})
        > {
  FoodItemsFamily._()
    : super(
        retry: null,
        name: r'foodItemsProvider',
        dependencies: null,
        $allTransitiveDependencies: null,
        isAutoDispose: true,
      );

  FoodItemsProvider call({String? categoryId, String? search}) =>
      FoodItemsProvider._(
        argument: (categoryId: categoryId, search: search),
        from: this,
      );

  @override
  String toString() => r'foodItemsProvider';
}

abstract class _$FoodItems extends $AsyncNotifier<List<FoodItem>> {
  late final _$args = ref.$arg as ({String? categoryId, String? search});
  String? get categoryId => _$args.categoryId;
  String? get search => _$args.search;

  FutureOr<List<FoodItem>> build({String? categoryId, String? search});
  @$mustCallSuper
  @override
  WhenComplete runBuild() {
    final ref = this.ref as $Ref<AsyncValue<List<FoodItem>>, List<FoodItem>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<AsyncValue<List<FoodItem>>, List<FoodItem>>,
              AsyncValue<List<FoodItem>>,
              Object?,
              Object?
            >;
    return element.handleCreate(
      ref,
      () => build(categoryId: _$args.categoryId, search: _$args.search),
    );
  }
}

@ProviderFor(foodItemDetail)
final foodItemDetailProvider = FoodItemDetailFamily._();

final class FoodItemDetailProvider
    extends
        $FunctionalProvider<AsyncValue<FoodItem>, FoodItem, FutureOr<FoodItem>>
    with $FutureModifier<FoodItem>, $FutureProvider<FoodItem> {
  FoodItemDetailProvider._({
    required FoodItemDetailFamily super.from,
    required String super.argument,
  }) : super(
         retry: null,
         name: r'foodItemDetailProvider',
         isAutoDispose: true,
         dependencies: null,
         $allTransitiveDependencies: null,
       );

  @override
  String debugGetCreateSourceHash() => _$foodItemDetailHash();

  @override
  String toString() {
    return r'foodItemDetailProvider'
        ''
        '($argument)';
  }

  @$internal
  @override
  $FutureProviderElement<FoodItem> $createElement($ProviderPointer pointer) =>
      $FutureProviderElement(pointer);

  @override
  FutureOr<FoodItem> create(Ref ref) {
    final argument = this.argument as String;
    return foodItemDetail(ref, argument);
  }

  @override
  bool operator ==(Object other) {
    return other is FoodItemDetailProvider && other.argument == argument;
  }

  @override
  int get hashCode {
    return argument.hashCode;
  }
}

String _$foodItemDetailHash() => r'231836e2f7e90e26a20e0e7a7bfd17167d229e37';

final class FoodItemDetailFamily extends $Family
    with $FunctionalFamilyOverride<FutureOr<FoodItem>, String> {
  FoodItemDetailFamily._()
    : super(
        retry: null,
        name: r'foodItemDetailProvider',
        dependencies: null,
        $allTransitiveDependencies: null,
        isAutoDispose: true,
      );

  FoodItemDetailProvider call(String id) =>
      FoodItemDetailProvider._(argument: id, from: this);

  @override
  String toString() => r'foodItemDetailProvider';
}

@ProviderFor(MyFoodOrders)
final myFoodOrdersProvider = MyFoodOrdersProvider._();

final class MyFoodOrdersProvider
    extends $AsyncNotifierProvider<MyFoodOrders, List<FoodOrder>> {
  MyFoodOrdersProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'myFoodOrdersProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$myFoodOrdersHash();

  @$internal
  @override
  MyFoodOrders create() => MyFoodOrders();
}

String _$myFoodOrdersHash() => r'6438f02c1c79b186e92044ad18da6fcd5c3bb509';

abstract class _$MyFoodOrders extends $AsyncNotifier<List<FoodOrder>> {
  FutureOr<List<FoodOrder>> build();
  @$mustCallSuper
  @override
  WhenComplete runBuild() {
    final ref = this.ref as $Ref<AsyncValue<List<FoodOrder>>, List<FoodOrder>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<AsyncValue<List<FoodOrder>>, List<FoodOrder>>,
              AsyncValue<List<FoodOrder>>,
              Object?,
              Object?
            >;
    return element.handleCreate(ref, build);
  }
}

@ProviderFor(FoodCart)
final foodCartProvider = FoodCartProvider._();

final class FoodCartProvider
    extends $NotifierProvider<FoodCart, Map<String, OrderItem>> {
  FoodCartProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'foodCartProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$foodCartHash();

  @$internal
  @override
  FoodCart create() => FoodCart();

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(Map<String, OrderItem> value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<Map<String, OrderItem>>(value),
    );
  }
}

String _$foodCartHash() => r'cf4822bf36314048f9bd257bfb254b16350fa20d';

abstract class _$FoodCart extends $Notifier<Map<String, OrderItem>> {
  Map<String, OrderItem> build();
  @$mustCallSuper
  @override
  WhenComplete runBuild() {
    final ref =
        this.ref as $Ref<Map<String, OrderItem>, Map<String, OrderItem>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<Map<String, OrderItem>, Map<String, OrderItem>>,
              Map<String, OrderItem>,
              Object?,
              Object?
            >;
    return element.handleCreate(ref, build);
  }
}

@ProviderFor(CheckoutState)
final checkoutStateProvider = CheckoutStateProvider._();

final class CheckoutStateProvider
    extends $NotifierProvider<CheckoutState, AsyncValue<void>> {
  CheckoutStateProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'checkoutStateProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$checkoutStateHash();

  @$internal
  @override
  CheckoutState create() => CheckoutState();

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(AsyncValue<void> value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<AsyncValue<void>>(value),
    );
  }
}

String _$checkoutStateHash() => r'c989979feb2ef3eba4278562b7c61d3383e4e62a';

abstract class _$CheckoutState extends $Notifier<AsyncValue<void>> {
  AsyncValue<void> build();
  @$mustCallSuper
  @override
  WhenComplete runBuild() {
    final ref = this.ref as $Ref<AsyncValue<void>, AsyncValue<void>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<AsyncValue<void>, AsyncValue<void>>,
              AsyncValue<void>,
              Object?,
              Object?
            >;
    return element.handleCreate(ref, build);
  }
}
