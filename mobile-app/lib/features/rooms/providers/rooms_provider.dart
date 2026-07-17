import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/room_model.dart';
import '../data/rooms_repository.dart';

class RoomsState {
  final bool isLoading;
  final bool isFetchingMore;
  final String? error;
  final List<Room> rooms;
  final Map<String, dynamic> pagination;

  RoomsState({
    this.isLoading = false,
    this.isFetchingMore = false,
    this.error,
    this.rooms = const [],
    this.pagination = const {},
  });

  RoomsState copyWith({
    bool? isLoading,
    bool? isFetchingMore,
    String? error,
    List<Room>? rooms,
    Map<String, dynamic>? pagination,
    bool clearError = false,
  }) {
    return RoomsState(
      isLoading: isLoading ?? this.isLoading,
      isFetchingMore: isFetchingMore ?? this.isFetchingMore,
      error: clearError ? null : (error ?? this.error),
      rooms: rooms ?? this.rooms,
      pagination: pagination ?? this.pagination,
    );
  }
}

final roomsProvider = NotifierProvider<RoomsNotifier, RoomsState>(() {
  return RoomsNotifier();
});

class RoomsNotifier extends Notifier<RoomsState> {
  String? _currentSearch;
  double? _currentMinPrice;
  double? _currentMaxPrice;
  String? _currentRoomType;

  @override
  RoomsState build() {
    // Initial fetch can be triggered here or from the UI
    return RoomsState();
  }

  RoomsRepository get _repository => ref.read(roomsRepositoryProvider);

  Future<void> fetchRooms({
    String? search,
    double? minPrice,
    double? maxPrice,
    String? roomType,
  }) async {
    state = state.copyWith(isLoading: true, clearError: true);
    
    _currentSearch = search;
    _currentMinPrice = minPrice;
    _currentMaxPrice = maxPrice;
    _currentRoomType = roomType;

    try {
      final result = await _repository.getRooms(
        page: 1,
        limit: 10,
        search: _currentSearch,
        minPrice: _currentMinPrice,
        maxPrice: _currentMaxPrice,
        roomType: _currentRoomType,
      );
      state = state.copyWith(
        isLoading: false,
        rooms: result['rooms'],
        pagination: result['pagination'],
      );
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
    }
  }

  Future<void> fetchMoreRooms() async {
    if (state.isLoading || state.isFetchingMore || state.error != null) return;
    
    final next = state.pagination['next'];
    if (next == null) return; // No more pages

    final nextPage = next['page'] as int?;
    if (nextPage == null) return;

    state = state.copyWith(isFetchingMore: true);

    try {
      final result = await _repository.getRooms(
        page: nextPage,
        limit: 10,
        search: _currentSearch,
        minPrice: _currentMinPrice,
        maxPrice: _currentMaxPrice,
        roomType: _currentRoomType,
      );
      
      state = state.copyWith(
        isFetchingMore: false,
        rooms: [...state.rooms, ...result['rooms']],
        pagination: result['pagination'],
      );
    } catch (e) {
      state = state.copyWith(isFetchingMore: false, error: e.toString());
    }
  }
}

// Room Details Provider
final roomDetailProvider = FutureProvider.family<Room, String>((ref, id) async {
  final repository = ref.watch(roomsRepositoryProvider);
  return repository.getRoomById(id);
});
