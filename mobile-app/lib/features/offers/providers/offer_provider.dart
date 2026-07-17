import 'package:riverpod_annotation/riverpod_annotation.dart';
import '../../../core/network/api_client.dart';
import '../data/offer_repository.dart';
import '../domain/offer_model.dart';

part 'offer_provider.g.dart';

@riverpod
OfferRepository offerRepository(Ref ref) {
  final dio = ref.watch(apiClientProvider);
  return OfferRepository(dio: dio);
}

@riverpod
class Offers extends _$Offers {
  @override
  Future<List<Offer>> build() {
    return ref.watch(offerRepositoryProvider).getOffers();
  }
}
