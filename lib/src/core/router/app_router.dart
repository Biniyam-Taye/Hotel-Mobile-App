import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/features/splash/presentation/splash_screen.dart';
import 'package:luxestay/src/features/onboarding/presentation/onboarding_screen.dart';
import 'package:luxestay/src/features/auth/presentation/login_screen.dart';
import 'package:luxestay/src/features/auth/presentation/register_screen.dart';
import 'package:luxestay/src/features/home/presentation/home_screen.dart';
import 'package:luxestay/src/features/placeholder/placeholder_screen.dart';
import 'package:luxestay/src/core/widgets/navigation/navigation_shell.dart';
import 'package:luxestay/src/features/hotel_details/presentation/hotel_details_screen.dart';
import 'package:luxestay/src/features/room_selection/presentation/room_selection_screen.dart';
import 'package:luxestay/src/features/booking/presentation/booking_screen.dart';
import 'package:luxestay/src/features/payment/presentation/payment_screen.dart';
import 'package:luxestay/src/features/booking_success/presentation/booking_success_screen.dart';

final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');
final GlobalKey<NavigatorState> _shellNavigatorHomeKey = GlobalKey<NavigatorState>(debugLabel: 'shellHome');
final GlobalKey<NavigatorState> _shellNavigatorExploreKey = GlobalKey<NavigatorState>(debugLabel: 'shellExplore');
final GlobalKey<NavigatorState> _shellNavigatorBookingsKey = GlobalKey<NavigatorState>(debugLabel: 'shellBookings');
final GlobalKey<NavigatorState> _shellNavigatorFavoritesKey = GlobalKey<NavigatorState>(debugLabel: 'shellFavorites');
final GlobalKey<NavigatorState> _shellNavigatorProfileKey = GlobalKey<NavigatorState>(debugLabel: 'shellProfile');

final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: '/splash',
  routes: [
    GoRoute(
      path: '/splash',
      builder: (context, state) => SplashScreen(
        onComplete: () => context.go('/onboarding'),
      ),
    ),
    GoRoute(
      path: '/onboarding',
      builder: (context, state) => OnboardingScreen(
        onComplete: () => context.go('/login'),
      ),
    ),
    GoRoute(
      path: '/login',
      builder: (context, state) => const LoginScreen(),
    ),
    GoRoute(
      path: '/register',
      builder: (context, state) => const RegisterScreen(),
    ),
    
    // ─── PHASE 2 ROUTES (Full Screen / No Bottom Nav) ───────────────────
    GoRoute(
      path: '/hotel/:id',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => HotelDetailsScreen(
        hotelId: state.pathParameters['id']!,
      ),
    ),
    GoRoute(
      path: '/rooms/:hotelId',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => RoomSelectionScreen(
        hotelId: state.pathParameters['hotelId']!,
      ),
    ),
    GoRoute(
      path: '/booking/:hotelId/:roomId',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => BookingScreen(
        hotelId: state.pathParameters['hotelId']!,
        roomId: state.pathParameters['roomId']!,
      ),
    ),
    GoRoute(
      path: '/payment/:hotelId/:roomId',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => PaymentScreen(
        hotelId: state.pathParameters['hotelId']!,
        roomId: state.pathParameters['roomId']!,
      ),
    ),
    GoRoute(
      path: '/booking-success/:hotelId/:roomId',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => BookingSuccessScreen(
        hotelId: state.pathParameters['hotelId']!,
        roomId: state.pathParameters['roomId']!,
      ),
    ),

    // ─── BOTTOM NAVIGATION SHELL ───────────────────────────────────────
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        return NavigationShell(navigationShell: navigationShell);
      },
      branches: [
        StatefulShellBranch(
          navigatorKey: _shellNavigatorHomeKey,
          routes: [
            GoRoute(
              path: '/home',
              builder: (context, state) => const HomeScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorExploreKey,
          routes: [
            GoRoute(
              path: '/explore',
              builder: (context, state) => const PlaceholderScreen(title: 'Explore'),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorBookingsKey,
          routes: [
            GoRoute(
              path: '/bookings',
              builder: (context, state) => const PlaceholderScreen(title: 'My Bookings'),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorFavoritesKey,
          routes: [
            GoRoute(
              path: '/favorites',
              builder: (context, state) => const PlaceholderScreen(title: 'Favorites'),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorProfileKey,
          routes: [
            GoRoute(
              path: '/profile',
              builder: (context, state) => const PlaceholderScreen(title: 'Profile'),
            ),
          ],
        ),
      ],
    ),
  ],
);
