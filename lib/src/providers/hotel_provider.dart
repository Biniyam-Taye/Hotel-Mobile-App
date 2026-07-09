import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:luxestay/src/core/config/env.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';
import 'package:luxestay/src/data/repositories/hotel_repository.dart';

final hotelFiltersProvider = Provider<HotelFilters>((ref) => const HotelFilters());

final hotelsProvider = FutureProvider<List<Hotel>>((ref) async {
  if (!Env.useLiveApi) {
    return MockData.hotels;
  }
  final filters = ref.watch(hotelFiltersProvider);
  return ref.read(hotelRepositoryProvider).getHotels(filters);
});

final citiesProvider = FutureProvider<List<City>>((ref) async {
  if (!Env.useLiveApi) {
    return MockData.cities;
  }
  return ref.read(hotelRepositoryProvider).getCities();
});

final hotelDetailProvider = FutureProvider.family<Hotel, String>((ref, id) async {
  if (!Env.useLiveApi) {
    return MockData.hotels.firstWhere((h) => h.id == id);
  }
  return ref.read(hotelRepositoryProvider).getHotelById(id);
});
