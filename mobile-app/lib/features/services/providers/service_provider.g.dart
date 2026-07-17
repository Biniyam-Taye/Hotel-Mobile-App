// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'service_provider.dart';

// **************************************************************************
// RiverpodGenerator
// **************************************************************************

// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint, type=warning

@ProviderFor(serviceRepository)
final serviceRepositoryProvider = ServiceRepositoryProvider._();

final class ServiceRepositoryProvider
    extends
        $FunctionalProvider<
          ServiceRepository,
          ServiceRepository,
          ServiceRepository
        >
    with $Provider<ServiceRepository> {
  ServiceRepositoryProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'serviceRepositoryProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$serviceRepositoryHash();

  @$internal
  @override
  $ProviderElement<ServiceRepository> $createElement(
    $ProviderPointer pointer,
  ) => $ProviderElement(pointer);

  @override
  ServiceRepository create(Ref ref) {
    return serviceRepository(ref);
  }

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(ServiceRepository value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<ServiceRepository>(value),
    );
  }
}

String _$serviceRepositoryHash() => r'bab0de45a2284a88b778ec9c00c814bfbed406c3';

@ProviderFor(HotelServices)
final hotelServicesProvider = HotelServicesFamily._();

final class HotelServicesProvider
    extends $AsyncNotifierProvider<HotelServices, List<HotelService>> {
  HotelServicesProvider._({
    required HotelServicesFamily super.from,
    required String? super.argument,
  }) : super(
         retry: null,
         name: r'hotelServicesProvider',
         isAutoDispose: true,
         dependencies: null,
         $allTransitiveDependencies: null,
       );

  @override
  String debugGetCreateSourceHash() => _$hotelServicesHash();

  @override
  String toString() {
    return r'hotelServicesProvider'
        ''
        '($argument)';
  }

  @$internal
  @override
  HotelServices create() => HotelServices();

  @override
  bool operator ==(Object other) {
    return other is HotelServicesProvider && other.argument == argument;
  }

  @override
  int get hashCode {
    return argument.hashCode;
  }
}

String _$hotelServicesHash() => r'12172bee02aa29d79467fbc40d1a704e467a2cda';

final class HotelServicesFamily extends $Family
    with
        $ClassFamilyOverride<
          HotelServices,
          AsyncValue<List<HotelService>>,
          List<HotelService>,
          FutureOr<List<HotelService>>,
          String?
        > {
  HotelServicesFamily._()
    : super(
        retry: null,
        name: r'hotelServicesProvider',
        dependencies: null,
        $allTransitiveDependencies: null,
        isAutoDispose: true,
      );

  HotelServicesProvider call({String? category}) =>
      HotelServicesProvider._(argument: category, from: this);

  @override
  String toString() => r'hotelServicesProvider';
}

abstract class _$HotelServices extends $AsyncNotifier<List<HotelService>> {
  late final _$args = ref.$arg as String?;
  String? get category => _$args;

  FutureOr<List<HotelService>> build({String? category});
  @$mustCallSuper
  @override
  WhenComplete runBuild() {
    final ref =
        this.ref as $Ref<AsyncValue<List<HotelService>>, List<HotelService>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<AsyncValue<List<HotelService>>, List<HotelService>>,
              AsyncValue<List<HotelService>>,
              Object?,
              Object?
            >;
    return element.handleCreate(ref, () => build(category: _$args));
  }
}

@ProviderFor(serviceDetail)
final serviceDetailProvider = ServiceDetailFamily._();

final class ServiceDetailProvider
    extends
        $FunctionalProvider<
          AsyncValue<HotelService>,
          HotelService,
          FutureOr<HotelService>
        >
    with $FutureModifier<HotelService>, $FutureProvider<HotelService> {
  ServiceDetailProvider._({
    required ServiceDetailFamily super.from,
    required String super.argument,
  }) : super(
         retry: null,
         name: r'serviceDetailProvider',
         isAutoDispose: true,
         dependencies: null,
         $allTransitiveDependencies: null,
       );

  @override
  String debugGetCreateSourceHash() => _$serviceDetailHash();

  @override
  String toString() {
    return r'serviceDetailProvider'
        ''
        '($argument)';
  }

  @$internal
  @override
  $FutureProviderElement<HotelService> $createElement(
    $ProviderPointer pointer,
  ) => $FutureProviderElement(pointer);

  @override
  FutureOr<HotelService> create(Ref ref) {
    final argument = this.argument as String;
    return serviceDetail(ref, argument);
  }

  @override
  bool operator ==(Object other) {
    return other is ServiceDetailProvider && other.argument == argument;
  }

  @override
  int get hashCode {
    return argument.hashCode;
  }
}

String _$serviceDetailHash() => r'c94020647f9669a73756be6ca20a0976a7afbc3a';

final class ServiceDetailFamily extends $Family
    with $FunctionalFamilyOverride<FutureOr<HotelService>, String> {
  ServiceDetailFamily._()
    : super(
        retry: null,
        name: r'serviceDetailProvider',
        dependencies: null,
        $allTransitiveDependencies: null,
        isAutoDispose: true,
      );

  ServiceDetailProvider call(String id) =>
      ServiceDetailProvider._(argument: id, from: this);

  @override
  String toString() => r'serviceDetailProvider';
}

@ProviderFor(MyServiceBookings)
final myServiceBookingsProvider = MyServiceBookingsProvider._();

final class MyServiceBookingsProvider
    extends $AsyncNotifierProvider<MyServiceBookings, List<ServiceBooking>> {
  MyServiceBookingsProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'myServiceBookingsProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$myServiceBookingsHash();

  @$internal
  @override
  MyServiceBookings create() => MyServiceBookings();
}

String _$myServiceBookingsHash() => r'83ec3b25b099d6e25f45feebe8e32bf0907579a0';

abstract class _$MyServiceBookings
    extends $AsyncNotifier<List<ServiceBooking>> {
  FutureOr<List<ServiceBooking>> build();
  @$mustCallSuper
  @override
  WhenComplete runBuild() {
    final ref =
        this.ref
            as $Ref<AsyncValue<List<ServiceBooking>>, List<ServiceBooking>>;
    final element =
        ref.element
            as $ClassProviderElement<
              AnyNotifier<
                AsyncValue<List<ServiceBooking>>,
                List<ServiceBooking>
              >,
              AsyncValue<List<ServiceBooking>>,
              Object?,
              Object?
            >;
    return element.handleCreate(ref, build);
  }
}

@ProviderFor(ServiceBookingState)
final serviceBookingStateProvider = ServiceBookingStateProvider._();

final class ServiceBookingStateProvider
    extends $NotifierProvider<ServiceBookingState, AsyncValue<void>> {
  ServiceBookingStateProvider._()
    : super(
        from: null,
        argument: null,
        retry: null,
        name: r'serviceBookingStateProvider',
        isAutoDispose: true,
        dependencies: null,
        $allTransitiveDependencies: null,
      );

  @override
  String debugGetCreateSourceHash() => _$serviceBookingStateHash();

  @$internal
  @override
  ServiceBookingState create() => ServiceBookingState();

  /// {@macro riverpod.override_with_value}
  Override overrideWithValue(AsyncValue<void> value) {
    return $ProviderOverride(
      origin: this,
      providerOverride: $SyncValueProvider<AsyncValue<void>>(value),
    );
  }
}

String _$serviceBookingStateHash() =>
    r'e0f83212e2e0eab938f7310cf07a46874c4fb0f2';

abstract class _$ServiceBookingState extends $Notifier<AsyncValue<void>> {
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
