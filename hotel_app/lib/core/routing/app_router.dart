import 'package:go_router/go_router.dart';

import 'package:riverpod_annotation/riverpod_annotation.dart';

import '../../features/auth/presentation/screens/splash_screen.dart';
import '../../features/auth/presentation/screens/onboarding_screen.dart';
import '../../features/auth/presentation/screens/login_screen.dart';
import '../../features/auth/presentation/screens/signup_screen.dart';
import '../../features/auth/presentation/screens/forgot_password_screen.dart';
import '../../features/navigation/presentation/screens/main_navigation_screen.dart';
import '../../features/rooms/presentation/screens/rooms_listing_screen.dart';
import '../../features/rooms/presentation/screens/room_detail_screen.dart';
import '../../features/rooms/presentation/screens/booking_screen.dart';
import '../../features/services/presentation/screens/services_listing_screen.dart';
import '../../features/services/presentation/screens/service_detail_screen.dart';
import '../../features/services/presentation/screens/service_booking_screen.dart';
import '../../features/restaurant/presentation/screens/food_listing_screen.dart';
import '../../features/restaurant/presentation/screens/food_detail_screen.dart';
import '../../features/restaurant/presentation/screens/food_cart_screen.dart';
import '../../features/restaurant/presentation/screens/food_checkout_screen.dart';
import '../../features/offers/presentation/screens/offers_listing_screen.dart';

part 'app_router.g.dart';

@riverpod
GoRouter appRouter(Ref ref) {
  return GoRouter(
    initialLocation: '/',
    routes: [
      GoRoute(
        path: '/',
        name: 'splash',
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        name: 'onboarding',
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: '/login',
        name: 'login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/signup',
        name: 'signup',
        builder: (context, state) => const SignupScreen(),
      ),
      GoRoute(
        path: '/forgot-password',
        name: 'forgot-password',
        builder: (context, state) => const ForgotPasswordScreen(),
      ),
      GoRoute(
        path: '/main',
        name: 'main',
        builder: (context, state) => const MainNavigationScreen(),
      ),
      GoRoute(
        path: '/rooms',
        name: 'rooms',
        builder: (context, state) => const RoomsListingScreen(),
        routes: [
          GoRoute(
            path: ':id',
            name: 'room-detail',
            builder: (context, state) {
              final id = state.pathParameters['id']!;
              return RoomDetailScreen(roomId: id);
            },
            routes: [
              GoRoute(
                path: 'book',
                name: 'room-book',
                builder: (context, state) {
                  final id = state.pathParameters['id']!;
                  return BookingScreen(roomId: id);
                },
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        path: '/services',
        name: 'services',
        builder: (context, state) => const ServicesListingScreen(),
        routes: [
          GoRoute(
            path: ':id',
            name: 'service-detail',
            builder: (context, state) {
              final id = state.pathParameters['id']!;
              return ServiceDetailScreen(serviceId: id);
            },
            routes: [
              GoRoute(
                path: 'book',
                name: 'service-book',
                builder: (context, state) {
                  final id = state.pathParameters['id']!;
                  return ServiceBookingScreen(serviceId: id);
                },
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        path: '/restaurant',
        name: 'restaurant',
        builder: (context, state) => const FoodListingScreen(),
        routes: [
          GoRoute(
            path: 'cart',
            name: 'food-cart',
            builder: (context, state) => const FoodCartScreen(),
          ),
          GoRoute(
            path: 'checkout',
            name: 'food-checkout',
            builder: (context, state) => const FoodCheckoutScreen(),
          ),
          GoRoute(
            path: ':id',
            name: 'food-detail',
            builder: (context, state) {
              final id = state.pathParameters['id']!;
              return FoodDetailScreen(foodId: id);
            },
          ),
        ],
      ),
      GoRoute(
        path: '/offers',
        name: 'offers',
        builder: (context, state) => const OffersListingScreen(),
      ),
    ],
  );
}
