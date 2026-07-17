import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../core/network/api_client.dart';
import '../data/payment_repository.dart';
import '../domain/payment_model.dart';

part 'payment_provider.g.dart';

@riverpod
PaymentRepository paymentRepository(Ref ref) {
  final dio = ref.watch(apiClientProvider);
  return PaymentRepository(dio: dio);
}

class PaymentState {
  final bool isLoading;
  final String? error;
  final PaymentIntentResponse? paymentIntent;

  PaymentState({
    this.isLoading = false,
    this.error,
    this.paymentIntent,
  });

  PaymentState copyWith({
    bool? isLoading,
    String? error,
    PaymentIntentResponse? paymentIntent,
    bool clearError = false,
  }) {
    return PaymentState(
      isLoading: isLoading ?? this.isLoading,
      error: clearError ? null : (error ?? this.error),
      paymentIntent: paymentIntent ?? this.paymentIntent,
    );
  }
}

@riverpod
class PaymentNotifier extends _$PaymentNotifier {
  @override
  PaymentState build() {
    return PaymentState();
  }

  Future<bool> processPayment({
    required String relatedType,
    required String relatedId,
    required double amount,
  }) async {
    state = state.copyWith(isLoading: true, clearError: true);
    try {
      final repository = ref.read(paymentRepositoryProvider);
      final intent = await repository.createPaymentIntent(
        relatedType: relatedType,
        relatedId: relatedId,
        amount: amount,
      );
      
      // Native Stripe SDK integration would happen here using intent.clientSecret
      // For now, we simulate a success after intent creation
      state = state.copyWith(isLoading: false, paymentIntent: intent);
      return true;
    } catch (e) {
      state = state.copyWith(isLoading: false, error: e.toString());
      return false;
    }
  }
}
