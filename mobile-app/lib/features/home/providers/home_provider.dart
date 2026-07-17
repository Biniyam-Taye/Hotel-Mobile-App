import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../data/home_repository.dart';
import '../../rooms/domain/room_model.dart';

class HomeState {
  final bool isLoading;
  final String? error;
  final List<Room> featuredRooms;
  final List<Map<String, dynamic>> featuredServices;
  final List<Map<String, dynamic>> offers;
  final List<Map<String, dynamic>> reviews;

  HomeState({
    this.isLoading = false,
    this.error,
    this.featuredRooms = const [],
    this.featuredServices = const [],
    this.offers = const [],
    this.reviews = const [],
  });

  HomeState copyWith({
    bool? isLoading,
    String? error,
    List<Room>? featuredRooms,
    List<Map<String, dynamic>>? featuredServices,
    List<Map<String, dynamic>>? offers,
    List<Map<String, dynamic>>? reviews,
  }) {
    return HomeState(
      isLoading: isLoading ?? this.isLoading,
      error: error ?? this.error,
      featuredRooms: featuredRooms ?? this.featuredRooms,
      featuredServices: featuredServices ?? this.featuredServices,
      offers: offers ?? this.offers,
      reviews: reviews ?? this.reviews,
    );
  }
}

final homeProvider = NotifierProvider<HomeNotifier, HomeState>(() {
  return HomeNotifier();
});

class HomeNotifier extends Notifier<HomeState> {
  @override
  HomeState build() {
    return HomeState();
  }

  HomeRepository get _repository => ref.read(homeRepositoryProvider);

  Future<void> loadHomeData() async {
    state = state.copyWith(isLoading: true, error: null);

    try {
      // Fetch all concurrently for speed
      final results = await Future.wait([
        _repository.getFeaturedRooms(),
        _repository.getFeaturedServices(),
        _repository.getOffers(),
        _repository.getReviews(),
      ]);

      state = state.copyWith(
        isLoading: false,
        featuredRooms: results[0] as List<Room>,
        featuredServices: results[1] as List<Map<String, dynamic>>,
        offers: results[2] as List<Map<String, dynamic>>,
        reviews: results[3] as List<Map<String, dynamic>>,
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }
}
