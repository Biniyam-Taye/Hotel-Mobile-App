import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(
        title: 'My Profile',
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          children: [
            // Profile Header
            Container(
              padding: const EdgeInsets.all(AppSpacing.lg),
              decoration: BoxDecoration(
                color: Theme.of(context).cardTheme.color,
                borderRadius: AppBorders.large,
                border: Border.all(
                  color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
                ),
              ),
              child: Row(
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.primary, width: 3),
                      image: const DecorationImage(
                        image: NetworkImage('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  const SizedBox(width: AppSpacing.lg),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Alex Johnson',
                          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                                fontWeight: FontWeight.w800,
                              ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'alex.johnson@example.com',
                          style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                                color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.6),
                              ),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.warning.withValues(alpha: 0.1),
                            borderRadius: AppBorders.circular,
                          ),
                          child: Row(
                            mainAxisSize: MainAxisSize.min,
                            children: [
                              const Icon(Icons.stars_rounded, size: 16, color: AppColors.warning),
                              const SizedBox(width: 4),
                              Text(
                                'Gold Member',
                                style: Theme.of(context).textTheme.labelSmall?.copyWith(
                                      color: AppColors.warning,
                                      fontWeight: FontWeight.w800,
                                    ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.edit_rounded, color: AppColors.primary),
                    onPressed: () => context.push('/profile/personal-info'),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xl),

            // Settings Sections
            _SettingsSection(
              title: 'Account Settings',
              items: [
                _SettingsItem(icon: Icons.person_outline_rounded, title: 'Personal Information', onTap: () => context.push('/profile/personal-info')),
                _SettingsItem(icon: Icons.payment_rounded, title: 'Payment Methods', onTap: () => context.push('/profile/payment-methods')),
                _SettingsItem(icon: Icons.security_rounded, title: 'Security & Privacy', onTap: () => context.push('/profile/security')),
              ],
            ),
            const SizedBox(height: AppSpacing.xl),
            
            _SettingsSection(
              title: 'Preferences',
              items: [
                _SettingsItem(icon: Icons.notifications_none_rounded, title: 'Notifications', trailing: Switch(value: true, onChanged: (v) {}, activeTrackColor: AppColors.primary, thumbColor: WidgetStateProperty.all(Colors.white))),
                _SettingsItem(icon: Icons.language_rounded, title: 'Language', trailing: const Text('English', style: TextStyle(fontWeight: FontWeight.bold))),
                _SettingsItem(icon: Icons.dark_mode_outlined, title: 'Dark Mode', trailing: Switch(value: false, onChanged: (v) {}, activeTrackColor: AppColors.primary, thumbColor: WidgetStateProperty.all(Colors.white))),
              ],
            ),
            const SizedBox(height: AppSpacing.xl),
            
            _SettingsSection(
              title: 'Support',
              items: [
                _SettingsItem(icon: Icons.help_outline_rounded, title: 'Help Center', onTap: () => context.push('/profile/help')),
                _SettingsItem(icon: Icons.info_outline_rounded, title: 'About Us', onTap: () => context.push('/profile/about')),
              ],
            ),
            const SizedBox(height: AppSpacing.xl),
            
            // Logout
            SizedBox(
              width: double.infinity,
              child: TextButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.logout_rounded, color: AppColors.error),
                label: Text(
                  'Log Out',
                  style: Theme.of(context).textTheme.titleMedium?.copyWith(
                        color: AppColors.error,
                        fontWeight: FontWeight.w700,
                      ),
                ),
                style: TextButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  shape: RoundedRectangleBorder(
                    borderRadius: AppBorders.medium,
                    side: const BorderSide(color: AppColors.error, width: 1),
                  ),
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.xxl),
          ],
        ),
      ),
    );
  }
}

class _SettingsSection extends StatelessWidget {
  final String title;
  final List<_SettingsItem> items;

  const _SettingsSection({required this.title, required this.items});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(left: 8, bottom: 12),
          child: Text(
            title,
            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                  fontWeight: FontWeight.w800,
                ),
          ),
        ),
        Container(
          decoration: BoxDecoration(
            color: Theme.of(context).cardTheme.color,
            borderRadius: AppBorders.medium,
            border: Border.all(
              color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
            ),
          ),
          child: Column(
            children: items.asMap().entries.map((entry) {
              final isLast = entry.key == items.length - 1;
              return Column(
                children: [
                  entry.value,
                  if (!isLast)
                    Divider(
                      height: 1,
                      indent: 56,
                      color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
                    ),
                ],
              );
            }).toList(),
          ),
        ),
      ],
    );
  }
}

class _SettingsItem extends StatelessWidget {
  final IconData icon;
  final String title;
  final Widget? trailing;
  final VoidCallback? onTap;

  const _SettingsItem({
    required this.icon,
    required this.title,
    this.trailing,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: trailing == null ? onTap : null,
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppColors.primaryContainer.withValues(alpha: 0.5),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: AppColors.primary, size: 22),
      ),
      title: Text(
        title,
        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontWeight: FontWeight.w600,
            ),
      ),
      trailing: trailing ?? const Icon(Icons.arrow_forward_ios_rounded, size: 16, color: AppColors.grey400),
      shape: RoundedRectangleBorder(borderRadius: AppBorders.medium),
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
    );
  }
}
