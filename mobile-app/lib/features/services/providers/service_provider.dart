import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../core/network/api_client.dart';
import '../data/service_repository.dart';
import '../domain/service_model.dart';
import '../domain/service_booking_model.dart';

part 'service_provider.g.dart';

@riverpod
ServiceRepository serviceRepository(Ref ref) {
  final dio = ref.watch(apiClientProvider);
  return ServiceRepository(dio: dio);
}

@riverpod
class HotelServices extends _$HotelServices {
  @override
  Future<List<HotelService>> build({String? category}) {
    return ref.watch(serviceRepositoryProvider).getServices(category: category);
  }
}

@riverpod
Future<HotelService> serviceDetail(Ref ref, String id) {
  return ref.watch(serviceRepositoryProvider).getServiceById(id);
}

@riverpod
class MyServiceBookings extends _$MyServiceBookings {
  @override
  Future<List<ServiceBooking>> build() {
    return ref.watch(serviceRepositoryProvider).getMyBookings();
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() => ref.read(serviceRepositoryProvider).getMyBookings());
  }
}

@riverpod
class ServiceBookingState extends _$ServiceBookingState {
  @override
  AsyncValue<void> build() {
    return const AsyncValue.data(null);
  }

  Future<bool> bookService(Map<String, dynamic> bookingData) async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() async {
      await ref.read(serviceRepositoryProvider).createBooking(bookingData);
      ref.invalidate(myServiceBookingsProvider);
    });
    return !state.hasError;
  }
}
