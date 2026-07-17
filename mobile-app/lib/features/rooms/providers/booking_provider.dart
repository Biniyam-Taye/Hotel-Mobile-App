import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../domain/booking_model.dart';
import '../data/booking_repository.dart';

// My Bookings Provider
final myBookingsProvider = FutureProvider<List<Booking>>((ref) async {
  final repository = ref.watch(bookingRepositoryProvider);
  return repository.getMyBookings();
});

class BookingState {
  final bool isLoading;
  final String? error;
  final Booking? booking;

  BookingState({
    this.isLoading = false,
    this.error,
    this.booking,
  });

  BookingState copyWith({
    bool? isLoading,
    String? error,
    Booking? booking,
    bool clearError = false,
    bool clearBooking = false,
  }) {
    return BookingState(
      isLoading: isLoading ?? this.isLoading,
      error: clearError ? null : (error ?? this.error),
      booking: clearBooking ? null : (booking ?? this.booking),
    );
  }
}

final bookingProvider = NotifierProvider<BookingNotifier, BookingState>(() {
  return BookingNotifier();
});

class BookingNotifier extends Notifier<BookingState> {
  @override
  BookingState build() {
    return BookingState();
  }

  BookingRepository get _repository => ref.read(bookingRepositoryProvider);

  Future<bool> createBooking({
    required String roomId,
    required DateTime checkInDate,
    required DateTime checkOutDate,
    required int adults,
    required int children,
    required double totalAmount,
    String specialRequests = '',
  }) async {
    state = state.copyWith(isLoading: true, clearError: true);
    try {
      final booking = await _repository.createBooking(
        roomId: roomId,
        checkInDate: checkInDate,
        checkOutDate: checkOutDate,
        adults: adults,
        children: children,
        totalAmount: totalAmount,
        specialRequests: specialRequests,
      );
      state = state.copyWith(isLoading: false, booking: booking);
      
      // Invalidate my bookings so it refreshes
      ref.invalidate(myBookingsProvider);
      
      return true; // Success
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      return false; // Error
    }
  }

  void reset() {
    state = BookingState();
  }
}
