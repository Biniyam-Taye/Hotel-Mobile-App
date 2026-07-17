import 'package:flutter/material.dart';
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
import '../../features/services/presentation/screens/spa_wellness_booking_screen.dart';
import '../../features/services/presentation/screens/airport_transfer_booking_screen.dart';
import '../../features/services/presentation/screens/gym_fitness_booking_screen.dart';
import '../../features/services/presentation/screens/swimming_pool_booking_screen.dart';
import '../../features/services/presentation/screens/massage_therapy_booking_screen.dart';
import '../../features/services/presentation/screens/laundry_booking_screen.dart';
import '../../features/services/presentation/screens/spa_wellness_detail_screen.dart';
import '../../features/services/presentation/screens/airport_transfer_detail_screen.dart';
import '../../features/services/presentation/screens/gym_fitness_detail_screen.dart';
import '../../features/services/presentation/screens/swimming_pool_detail_screen.dart';
import '../../features/services/presentation/screens/massage_therapy_detail_screen.dart';
import '../../features/services/presentation/screens/laundry_detail_screen.dart';
import '../../features/restaurant/presentation/screens/food_listing_screen.dart';
import '../../features/restaurant/presentation/screens/food_detail_screen.dart';
import '../../features/restaurant/presentation/screens/food_cart_screen.dart';
import '../../features/restaurant/presentation/screens/food_checkout_screen.dart';
import '../../features/offers/presentation/screens/offers_listing_screen.dart';
import '../../features/profile/presentation/screens/personal_info_screen.dart';
import '../../features/profile/presentation/screens/payment_methods_screen.dart';
import '../../features/profile/presentation/screens/security_privacy_screen.dart';
import '../../features/profile/presentation/screens/help_center_screen.dart';
import '../../features/profile/presentation/screens/about_us_screen.dart';
import '../../features/profile/presentation/screens/terms_of_service_screen.dart';
import '../../features/profile/presentation/screens/privacy_policy_screen.dart';
import '../../features/profile/presentation/screens/licenses_screen.dart';
import '../../features/notifications/presentation/screens/notifications_screen.dart';
import '../../features/auth/providers/auth_provider.dart';
import '../../features/auth/providers/auth_state.dart';
part 'app_router.g.dart';

// Helper for smooth transitions
CustomTransitionPage<T> _buildTransitionPage<T>({
  required BuildContext context,
  required GoRouterState state,
  required Widget child,
}) {
  return CustomTransitionPage<T>(
    key: state.pageKey,
    child: child,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      return FadeTransition(
        opacity: CurveTween(curve: Curves.easeInOut).animate(animation),
        child: SlideTransition(
          position: Tween<Offset>(
            begin: const Offset(0, 0.05),
            end: Offset.zero,
          ).animate(CurvedAnimation(
            parent: animation,
            curve: Curves.easeOutCubic,
          )),
          child: child,
        ),
      );
    },
  );
}

@riverpod
GoRouter appRouter(Ref ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/',
    redirect: (context, state) {
      final isAuthRoute = state.matchedLocation == '/login' ||
          state.matchedLocation == '/signup' ||
          state.matchedLocation == '/forgot-password' ||
          state.matchedLocation == '/onboarding' ||
          state.matchedLocation == '/';

      if (authState is AuthInitial || authState is AuthLoading) {
        return null; 
      }

      final isAuthenticated = authState is AuthAuthenticated;

      if (!isAuthenticated) {
        if (isAuthRoute) return null;
        return '/login';
      } else {
        if (isAuthRoute && state.matchedLocation != '/') return '/main';
      }

      return null;
    },
    routes: [
      GoRoute(
        path: '/',
        name: 'splash',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const SplashScreen()),
      ),
      GoRoute(
        path: '/onboarding',
        name: 'onboarding',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const OnboardingScreen()),
      ),
      GoRoute(
        path: '/login',
        name: 'login',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const LoginScreen()),
      ),
      GoRoute(
        path: '/signup',
        name: 'signup',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const SignupScreen()),
      ),
      GoRoute(
        path: '/forgot-password',
        name: 'forgot-password',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const ForgotPasswordScreen()),
      ),
      GoRoute(
        path: '/main',
        name: 'main',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const MainNavigationScreen()),
      ),
      GoRoute(
        path: '/rooms',
        name: 'rooms',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const RoomsListingScreen()),
        routes: [
          GoRoute(
            path: ':id',
            name: 'room-detail',
            pageBuilder: (context, state) {
              final id = state.pathParameters['id']!;
              return _buildTransitionPage(context: context, state: state, child: RoomDetailScreen(roomId: id));
            },
            routes: [
              GoRoute(
                path: 'book',
                name: 'room-book',
                pageBuilder: (context, state) {
                  final id = state.pathParameters['id']!;
                  return _buildTransitionPage(context: context, state: state, child: BookingScreen(roomId: id));
                },
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        path: '/services',
        name: 'services',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const ServicesListingScreen()),
        routes: [
          GoRoute(
            path: ':id',
            name: 'service-detail',
            pageBuilder: (context, state) {
              final id = state.pathParameters['id']!;
              final Widget screen = switch (id) {
                'service_1' => const SpaWellnessDetailScreen(),
                'service_2' => const AirportTransferDetailScreen(),
                'service_3' => const GymFitnessDetailScreen(),
                'service_4' => const SwimmingPoolDetailScreen(),
                'service_5' => const MassageTherapyDetailScreen(),
                'service_6' => const LaundryDetailScreen(),
                _ => ServiceDetailScreen(serviceId: id),
              };
              return _buildTransitionPage(context: context, state: state, child: screen);
            },
            routes: [
              GoRoute(
                path: 'book',
                name: 'service-book',
                pageBuilder: (context, state) {
                  final id = state.pathParameters['id']!;
                  final Widget screen = switch (id) {
                    'service_1' => const SpaWellnessBookingScreen(),
                    'service_2' => const AirportTransferBookingScreen(),
                    'service_3' => const GymFitnessBookingScreen(),
                    'service_4' => const SwimmingPoolBookingScreen(),
                    'service_5' => const MassageTherapyBookingScreen(),
                    'service_6' => const LaundryBookingScreen(),
                    _ => ServiceBookingScreen(serviceId: id),
                  };
                  return _buildTransitionPage(context: context, state: state, child: screen);
                },
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        path: '/restaurant',
        name: 'restaurant',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const FoodListingScreen()),
        routes: [
          GoRoute(
            path: 'cart',
            name: 'food-cart',
            pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const FoodCartScreen()),
          ),
          GoRoute(
            path: 'checkout',
            name: 'food-checkout',
            pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const FoodCheckoutScreen()),
          ),
          GoRoute(
            path: ':id',
            name: 'food-detail',
            pageBuilder: (context, state) {
              final id = state.pathParameters['id']!;
              return _buildTransitionPage(context: context, state: state, child: FoodDetailScreen(foodId: id));
            },
          ),
        ],
      ),
      GoRoute(
        path: '/offers',
        name: 'offers',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const OffersListingScreen()),
      ),
      GoRoute(
        path: '/profile/personal-info',
        name: 'personal-info',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const PersonalInfoScreen()),
      ),
      GoRoute(
        path: '/profile/payment-methods',
        name: 'payment-methods',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const PaymentMethodsScreen()),
      ),
      GoRoute(
        path: '/profile/security',
        name: 'security',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const SecurityPrivacyScreen()),
      ),
      GoRoute(
        path: '/profile/help',
        name: 'help-center',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const HelpCenterScreen()),
      ),
      GoRoute(
        path: '/profile/about',
        name: 'about-us',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const AboutUsScreen()),
      ),
      GoRoute(
        path: '/profile/about/terms',
        name: 'terms-of-service',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const TermsOfServiceScreen()),
      ),
      GoRoute(
        path: '/profile/about/privacy',
        name: 'privacy-policy',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const PrivacyPolicyScreen()),
      ),
      GoRoute(
        path: '/profile/about/licenses',
        name: 'licenses',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const LicensesScreen()),
      ),
      GoRoute(
        path: '/notifications',
        name: 'notifications',
        pageBuilder: (context, state) => _buildTransitionPage(context: context, state: state, child: const NotificationsScreen()),
      ),
    ],
  );
}
