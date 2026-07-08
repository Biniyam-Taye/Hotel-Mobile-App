import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/features/dev_launcher/presentation/dev_launcher_screen.dart';
import 'package:luxestay/src/features/receptionist/presentation/receptionist_shell.dart';
import 'package:luxestay/src/features/receptionist/presentation/pages/r_dashboard_page.dart';
import 'package:luxestay/src/features/receptionist/presentation/pages/r_rooms_page.dart';
import 'package:luxestay/src/features/receptionist/presentation/pages/r_checkin_page.dart';
import 'package:luxestay/src/features/receptionist/presentation/pages/r_guests_page.dart';
import 'package:luxestay/src/features/receptionist/presentation/pages/r_profile_page.dart';
import 'package:luxestay/src/features/admin/presentation/admin_shell.dart';
import 'package:luxestay/src/features/admin/presentation/pages/dashboard_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/hotel_management_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/room_management_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/booking_management_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/customer_management_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/receptionist_management_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/staff_management_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/revenue_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/reports_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/reviews_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/notifications_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/promotions_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/roles_permissions_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/activity_logs_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/settings_page.dart';
import 'package:luxestay/src/features/admin/presentation/pages/admin_profile_page.dart';
import 'package:luxestay/src/features/splash/presentation/splash_screen.dart';
import 'package:luxestay/src/features/onboarding/presentation/onboarding_screen.dart';
import 'package:luxestay/src/features/auth/presentation/login_screen.dart';
import 'package:luxestay/src/features/auth/presentation/register_screen.dart';
import 'package:luxestay/src/features/home/presentation/home_screen.dart';
import 'package:luxestay/src/features/explore/presentation/explore_screen.dart';
import 'package:luxestay/src/features/bookings/presentation/bookings_screen.dart';
import 'package:luxestay/src/features/favorites/presentation/favorites_screen.dart';
import 'package:luxestay/src/features/search/presentation/search_screen.dart';
import 'package:luxestay/src/features/notifications/presentation/notifications_screen.dart';
import 'package:luxestay/src/core/widgets/navigation/navigation_shell.dart';
import 'package:luxestay/src/features/hotel_details/presentation/hotel_details_screen.dart';
import 'package:luxestay/src/features/room_selection/presentation/room_selection_screen.dart';
import 'package:luxestay/src/features/booking/presentation/booking_screen.dart';
import 'package:luxestay/src/features/payment/presentation/payment_screen.dart';
import 'package:luxestay/src/features/booking_success/presentation/booking_success_screen.dart';
import 'package:luxestay/src/features/profile/presentation/profile_screen.dart';
import 'package:luxestay/src/features/profile/presentation/personal_info_screen.dart';
import 'package:luxestay/src/features/profile/presentation/payment_methods_screen.dart';
import 'package:luxestay/src/features/profile/presentation/settings_screen.dart';
import 'package:luxestay/src/features/profile/presentation/support_screen.dart';
import 'package:luxestay/src/features/explore/presentation/category_screen.dart';
import 'package:luxestay/src/features/explore/presentation/hotels_category_screen.dart';
import 'package:luxestay/src/features/explore/presentation/resorts_category_screen.dart';
import 'package:luxestay/src/features/explore/presentation/apartments_category_screen.dart';
import 'package:luxestay/src/features/explore/presentation/nature_category_screen.dart';
import 'package:luxestay/src/features/explore/presentation/luxury_category_screen.dart';
import 'package:luxestay/src/features/explore/presentation/functional_category_screen.dart';
final GlobalKey<NavigatorState> _rootNavigatorKey = GlobalKey<NavigatorState>(debugLabel: 'root');
final GlobalKey<NavigatorState> _shellNavigatorHomeKey = GlobalKey<NavigatorState>(debugLabel: 'shellHome');
final GlobalKey<NavigatorState> _shellNavigatorExploreKey = GlobalKey<NavigatorState>(debugLabel: 'shellExplore');
final GlobalKey<NavigatorState> _shellNavigatorBookingsKey = GlobalKey<NavigatorState>(debugLabel: 'shellBookings');
final GlobalKey<NavigatorState> _shellNavigatorFavoritesKey = GlobalKey<NavigatorState>(debugLabel: 'shellFavorites');
final GlobalKey<NavigatorState> _shellNavigatorProfileKey = GlobalKey<NavigatorState>(debugLabel: 'shellProfile');
final GlobalKey<NavigatorState> _shellNavigatorAdminKey = GlobalKey<NavigatorState>(debugLabel: 'shellAdmin');

final appRouter = GoRouter(
  navigatorKey: _rootNavigatorKey,
  initialLocation: kDebugMode ? '/dev-launcher' : '/splash',
  routes: [
    GoRoute(
      path: '/dev-launcher',
      redirect: (context, state) => kDebugMode ? null : '/splash',
      builder: (context, state) => const DevLauncherScreen(),
    ),
    // ─── RECEPTIONIST SHELL ──────────────────────────────────────────
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        return ReceptionistShell(navigationShell: navigationShell);
      },
      branches: [
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/receptionist',
              redirect: (context, state) => '/receptionist/dashboard',
            ),
            GoRoute(
              path: '/receptionist/dashboard',
              builder: (context, state) => const RDashboardPage(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/receptionist/rooms',
              builder: (context, state) => const RRoomsPage(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/receptionist/checkin',
              builder: (context, state) => const RCheckinPage(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/receptionist/guests',
              builder: (context, state) => const RGuestsPage(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/receptionist/profile',
              builder: (context, state) => const RProfilePage(),
            ),
          ],
        ),
      ],
    ),
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

    // ─── PHASE 3 SECONDARY ROUTES ──────────────────────────────────
    GoRoute(
      path: '/search',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => const SearchScreen(),
    ),
    GoRoute(
      path: '/notifications',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => const NotificationsScreen(),
    ),
    
    // ─── PHASE 2 ROUTES (Full Screen / No Bottom Nav) ───────────────────
    GoRoute(
      path: '/category/:name',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) {
        final name = state.pathParameters['name']!;
        if (name == 'Hotels') return const HotelsCategoryScreen();
        if (name == 'Resorts') return const ResortsCategoryScreen();
        if (name == 'Apartments') return const ApartmentsCategoryScreen();
        if (['Cabins', 'Eco Lodge', 'Camping', 'Mountain Hotels'].contains(name)) {
          return ExplorerCategoryScreen(categoryName: name);
        }
        if (['Luxury Villas', 'Spa Resorts', 'Beach Hotels'].contains(name)) {
          return LuxuryCategoryScreen(categoryName: name);
        }
        if (['Business Hotels', 'Family Hotels', 'Pet Friendly'].contains(name)) {
          return FunctionalCategoryScreen(categoryName: name);
        }
        return CategoryScreen(categoryName: name);
      },
    ),
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
    GoRoute(
      path: '/profile/personal-info',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => const PersonalInfoScreen(),
    ),
    GoRoute(
      path: '/profile/payment-methods',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => const PaymentMethodsScreen(),
    ),
    GoRoute(
      path: '/profile/settings',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => const SettingsScreen(),
    ),
    GoRoute(
      path: '/profile/support',
      parentNavigatorKey: _rootNavigatorKey,
      builder: (context, state) => const SupportScreen(),
    ),

    // ─── ADMIN SHELL ──────────────────────────────────────────────────
    ShellRoute(
      navigatorKey: _shellNavigatorAdminKey,
      builder: (context, state, child) => AdminShell(child: child),
      routes: [
        GoRoute(
          path: '/admin',
          redirect: (context, state) => '/admin/dashboard',
        ),
        GoRoute(path: '/admin/dashboard', builder: (context, state) => const DashboardPage()),
        GoRoute(path: '/admin/hotels', builder: (context, state) => const HotelManagementPage()),
        GoRoute(path: '/admin/rooms', builder: (context, state) => const RoomManagementPage()),
        GoRoute(path: '/admin/bookings', builder: (context, state) => const BookingManagementPage()),
        GoRoute(path: '/admin/customers', builder: (context, state) => const CustomerManagementPage()),
        GoRoute(path: '/admin/receptionists', builder: (context, state) => const ReceptionistManagementPage()),
        GoRoute(path: '/admin/staff', builder: (context, state) => const StaffManagementPage()),
        GoRoute(path: '/admin/revenue', builder: (context, state) => const RevenuePage()),
        GoRoute(path: '/admin/reports', builder: (context, state) => const ReportsPage()),
        GoRoute(path: '/admin/reviews', builder: (context, state) => const ReviewsPage()),
        GoRoute(path: '/admin/notifications', builder: (context, state) => const NotificationsPage()),
        GoRoute(path: '/admin/promotions', builder: (context, state) => const PromotionsPage()),
        GoRoute(path: '/admin/roles', builder: (context, state) => const RolesPermissionsPage()),
        GoRoute(path: '/admin/logs', builder: (context, state) => const ActivityLogsPage()),
        GoRoute(path: '/admin/settings', builder: (context, state) => const SettingsPage()),
        GoRoute(path: '/admin/profile', builder: (context, state) => const AdminProfilePage()),
      ],
    ),

    // ─── BOTTOM NAVIGATION SHELL (CUSTOMER APP) ───────────────────────
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
              builder: (context, state) => const ExploreScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorBookingsKey,
          routes: [
            GoRoute(
              path: '/bookings',
              builder: (context, state) => const BookingsScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorFavoritesKey,
          routes: [
            GoRoute(
              path: '/favorites',
              builder: (context, state) => const FavoritesScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          navigatorKey: _shellNavigatorProfileKey,
          routes: [
            GoRoute(
              path: '/profile',
              builder: (context, state) => const ProfileScreen(),
            ),
          ],
        ),
      ],
    ),
  ],
);
