import 'package:riverpod_annotation/riverpod_annotation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../core/network/api_client.dart';
import '../data/restaurant_repository.dart';
import '../domain/food_category_model.dart';
import '../domain/food_item_model.dart';
import '../domain/food_order_model.dart';

part 'restaurant_provider.g.dart';

@riverpod
RestaurantRepository restaurantRepository(Ref ref) {
  final dio = ref.watch(apiClientProvider);
  return RestaurantRepository(dio: dio);
}

@riverpod
Future<List<FoodCategory>> foodCategories(Ref ref) {
  return ref.watch(restaurantRepositoryProvider).getCategories();
}

@riverpod
class FoodItems extends _$FoodItems {
  @override
  Future<List<FoodItem>> build({String? categoryId, String? search}) {
    return ref.watch(restaurantRepositoryProvider).getFoodItems(
          categoryId: categoryId,
          search: search,
        );
  }
}

@riverpod
Future<FoodItem> foodItemDetail(Ref ref, String id) {
  return ref.watch(restaurantRepositoryProvider).getFoodItemById(id);
}

@riverpod
class MyFoodOrders extends _$MyFoodOrders {
  @override
  Future<List<FoodOrder>> build() {
    return ref.watch(restaurantRepositoryProvider).getMyOrders();
  }

  Future<void> refresh() async {
    state = const AsyncValue.loading();
    state = await AsyncValue.guard(() => ref.read(restaurantRepositoryProvider).getMyOrders());
  }
}

// Cart state (local only, submitted to backend on checkout)
@riverpod
class FoodCart extends _$FoodCart {
  @override
  Map<String, OrderItem> build() {
    return {};
  }

  void addItem(FoodItem item, int quantity) {
    final currentQuantity = state[item.id]?.quantity ?? 0;
    state = {
      ...state,
      item.id: OrderItem(
        foodItemId: item.id,
        foodItem: item,
        quantity: currentQuantity + quantity,
        priceAtOrder: item.price,
      ),
    };
  }

  void updateQuantity(String itemId, int newQuantity) {
    if (newQuantity <= 0) {
      removeItem(itemId);
      return;
    }
    if (state.containsKey(itemId)) {
      final currentItem = state[itemId]!;
      state = {
        ...state,
        itemId: OrderItem(
          foodItemId: currentItem.foodItemId,
          foodItem: currentItem.foodItem,
          quantity: newQuantity,
          priceAtOrder: currentItem.priceAtOrder,
        ),
      };
    }
  }

  void removeItem(String itemId) {
    final newState = Map<String, OrderItem>.from(state);
    newState.remove(itemId);
    state = newState;
  }

  void clearCart() {
    state = {};
  }

  double get totalAmount {
    return state.values.fold(0.0, (total, item) => total + (item.quantity * item.priceAtOrder));
  }
}

@riverpod
class CheckoutState extends _$CheckoutState {
  @override
  AsyncValue<void> build() {
    return const AsyncValue.data(null);
  }

  Future<bool> submitOrder(String? specialInstructions) async {
    state = const AsyncValue.loading();
    final cart = ref.read(foodCartProvider);
    
    if (cart.isEmpty) {
      state = AsyncValue.error('Cart is empty', StackTrace.current);
      return false;
    }

    final orderData = {
      'items': cart.values.map((item) => {
        'foodItem': item.foodItemId,
        'quantity': item.quantity,
      }).toList(),
      'specialInstructions': specialInstructions,
    };

    state = await AsyncValue.guard(() async {
      await ref.read(restaurantRepositoryProvider).createOrder(orderData);
      ref.read(foodCartProvider.notifier).clearCart();
      ref.invalidate(myFoodOrdersProvider);
    });

    return !state.hasError;
  }
}
