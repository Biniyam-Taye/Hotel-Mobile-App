import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';

/// Admin Sidebar Navigation
class AdminSidebar extends StatelessWidget {
  final bool isExpanded;
  final VoidCallback onToggle;

  const AdminSidebar({
    super.key,
    required this.isExpanded,
    required this.onToggle,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final currentRoute = GoRouterState.of(context).uri.toString();

    return AnimatedContainer(
      duration: const Duration(milliseconds: 300),
      width: isExpanded ? 280 : 80,
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        border: Border(
          right: BorderSide(
            color: isDark ? AppColors.darkBorder : AppColors.border,
          ),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Logo & Toggle
          Padding(
            padding: EdgeInsets.all(isExpanded ? 20.0 : 16.0),
            child: Row(
              mainAxisAlignment: isExpanded ? MainAxisAlignment.spaceBetween : MainAxisAlignment.center,
              children: [
                if (isExpanded)
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: AppColors.accent,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Icon(Icons.apartment_rounded, color: AppColors.textPrimary, size: 24),
                      ),
                      const SizedBox(width: 12),
                      Text(
                        'LuxeAdmin',
                        style: TextStyle(
                          fontSize: 20,
                          fontWeight: FontWeight.bold,
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                    ],
                  ),
                if (!isExpanded)
                  Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: AppColors.accent,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.apartment_rounded, color: AppColors.textPrimary, size: 24),
                  ),
              ],
            ),
          ),
          
          if (isExpanded)
            Align(
              alignment: Alignment.centerRight,
              child: IconButton(
                icon: Icon(Icons.menu_open_rounded, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                onPressed: onToggle,
                tooltip: 'Collapse sidebar',
              ),
            ),
            
          if (!isExpanded)
            Align(
              alignment: Alignment.center,
              child: IconButton(
                icon: Icon(Icons.menu_rounded, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                onPressed: onToggle,
                tooltip: 'Expand sidebar',
              ),
            ),

          const SizedBox(height: 16),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.symmetric(horizontal: 12),
              children: [
                _buildCategoryTitle('MAIN', isExpanded, isDark),
                _NavItem(
                  icon: Icons.dashboard_rounded,
                  label: 'Dashboard',
                  route: '/admin/dashboard',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                
                _buildCategoryTitle('MANAGEMENT', isExpanded, isDark),
                _NavItem(
                  icon: Icons.hotel_rounded,
                  label: 'Hotels',
                  route: '/admin/hotels',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.meeting_room_rounded,
                  label: 'Rooms',
                  route: '/admin/rooms',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.book_online_rounded,
                  label: 'Bookings',
                  route: '/admin/bookings',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.people_rounded,
                  label: 'Customers',
                  route: '/admin/customers',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.support_agent_rounded,
                  label: 'Receptionists',
                  route: '/admin/receptionists',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.badge_rounded,
                  label: 'Staff',
                  route: '/admin/staff',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                
                _buildCategoryTitle('ANALYTICS', isExpanded, isDark),
                _NavItem(
                  icon: Icons.attach_money_rounded,
                  label: 'Revenue',
                  route: '/admin/revenue',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.analytics_rounded,
                  label: 'Reports',
                  route: '/admin/reports',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.star_rate_rounded,
                  label: 'Reviews',
                  route: '/admin/reviews',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                
                _buildCategoryTitle('SYSTEM', isExpanded, isDark),
                _NavItem(
                  icon: Icons.campaign_rounded,
                  label: 'Promotions',
                  route: '/admin/promotions',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.admin_panel_settings_rounded,
                  label: 'Roles & Permissions',
                  route: '/admin/roles',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.history_rounded,
                  label: 'Activity Logs',
                  route: '/admin/logs',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
                _NavItem(
                  icon: Icons.settings_rounded,
                  label: 'Settings',
                  route: '/admin/settings',
                  currentRoute: currentRoute,
                  isExpanded: isExpanded,
                ),
              ],
            ),
          ),
          
          // User Profile Section at bottom
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              border: Border(
                top: BorderSide(
                  color: isDark ? AppColors.darkBorder : AppColors.border,
                ),
              ),
            ),
            child: isExpanded
                ? Row(
                    children: [
                      CircleAvatar(
                        radius: 20,
                        backgroundColor: AppColors.accent,
                        child: Text(
                          'BT',
                          style: TextStyle(
                            color: AppColors.textPrimary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Biniyam Taye',
                              style: TextStyle(
                                fontSize: 14,
                                fontWeight: FontWeight.bold,
                                color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                              ),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                            Text(
                              'Super Admin',
                              style: TextStyle(
                                fontSize: 12,
                                color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        icon: const Icon(Icons.logout_rounded, size: 20),
                        color: AppColors.error,
                        onPressed: () {
                          // TODO: Logout logic
                          context.go('/dev-launcher');
                        },
                      ),
                    ],
                  )
                : Tooltip(
                    message: 'Logout',
                    child: InkWell(
                      onTap: () => context.go('/dev-launcher'),
                      child: CircleAvatar(
                        radius: 20,
                        backgroundColor: AppColors.accent,
                        child: Text(
                          'BT',
                          style: TextStyle(
                            color: AppColors.textPrimary,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ),
                  ),
          ),
        ],
      ),
    );
  }

  Widget _buildCategoryTitle(String title, bool isExpanded, bool isDark) {
    if (!isExpanded) {
      return const Padding(
        padding: EdgeInsets.symmetric(vertical: 8.0),
        child: Divider(),
      );
    }
    return Padding(
      padding: const EdgeInsets.only(top: 16, bottom: 8, left: 12),
      child: Text(
        title,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.bold,
          letterSpacing: 1.2,
          color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final String route;
  final String currentRoute;
  final bool isExpanded;

  const _NavItem({
    required this.icon,
    required this.label,
    required this.route,
    required this.currentRoute,
    required this.isExpanded,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isSelected = currentRoute.startsWith(route);

    return Padding(
      padding: const EdgeInsets.only(bottom: 4),
      child: Tooltip(
        message: isExpanded ? '' : label,
        child: InkWell(
          onTap: () {
            if (currentRoute != route) {
              context.go(route);
            }
          },
          borderRadius: BorderRadius.circular(10),
          child: Container(
            padding: EdgeInsets.symmetric(
              horizontal: isExpanded ? 16 : 0,
              vertical: 12,
            ),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(10),
              color: isSelected
                  ? (isDark ? AppColors.accent.withValues(alpha: 0.1) : AppColors.accent.withValues(alpha: 0.15))
                  : Colors.transparent,
            ),
            child: isExpanded
                ? Row(
                    children: [
                      Icon(
                        icon,
                        size: 22,
                        color: isSelected
                            ? AppColors.accent
                            : (isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                      ),
                      const SizedBox(width: 16),
                      Text(
                        label,
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                          color: isSelected
                              ? (isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)
                              : (isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                        ),
                      ),
                    ],
                  )
                : Center(
                    child: Icon(
                      icon,
                      size: 24,
                      color: isSelected
                          ? AppColors.accent
                          : (isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                    ),
                  ),
          ),
        ),
      ),
    );
  }
}
