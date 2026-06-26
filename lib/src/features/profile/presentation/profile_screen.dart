import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final user = MockData.currentUser;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
      body: SafeArea(
        child: CustomScrollView(
          physics: const BouncingScrollPhysics(),
          slivers: [
            // ─── HEADER APP BAR ───────────────────────────────────────
            SliverAppBar(
              pinned: true,
              backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
              elevation: 0,
              toolbarHeight: 64,
              title: Text(
                'Profile',
                style: AppTypography.pageTitle(
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
              centerTitle: true,
            ),
            
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
                child: Column(
                  children: [
                    const SizedBox(height: 24),
                    // ─── AVATAR & NAME ──────────────────────────────────
                    Center(
                      child: Stack(
                        children: [
                          Container(
                            width: 110,
                            height: 110,
                            decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(color: AppColors.accent, width: 3),
                              boxShadow: [
                                BoxShadow(
                                  color: AppColors.accent.withOpacity(0.2),
                                  blurRadius: 24,
                                  offset: const Offset(0, 8),
                                ),
                              ],
                            ),
                            child: ClipOval(
                              child: CachedNetworkImage(
                                imageUrl: user.avatar ?? '',
                                fit: BoxFit.cover,
                                placeholder: (context, url) => Container(
                                  color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                                ),
                                errorWidget: (context, url, error) => Container(
                                  color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                                  child: const Icon(Icons.person, size: 48),
                                ),
                              ),
                            ),
                          ),
                          Positioned(
                            bottom: 0,
                            right: 0,
                            child: Container(
                              width: 36,
                              height: 36,
                              decoration: BoxDecoration(
                                color: AppColors.accent,
                                shape: BoxShape.circle,
                                border: Border.all(
                                  color: isDark ? AppColors.darkBackground : AppColors.background,
                                  width: 3,
                                ),
                              ),
                              child: const Icon(Icons.edit_rounded, size: 18, color: AppColors.textOnAccent),
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(height: 16),
                    Text(
                      user.name,
                      style: AppTypography.pageTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                    ),
                    const SizedBox(height: 8),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                      decoration: BoxDecoration(
                        color: AppColors.accent.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(999),
                      ),
                      child: Text(
                        'Luxe Rewards • Gold Tier',
                        style: AppTypography.labelBold(color: AppColors.accentDark).copyWith(fontSize: 12),
                      ),
                    ),
                    
                    const SizedBox(height: 32),
                    
                    // ─── STATS ROW ──────────────────────────────────────
                    Row(
                      children: [
                        Expanded(
                          child: _StatCard(
                            title: 'Points',
                            value: '24,500',
                            icon: Icons.star_rounded,
                            isDark: isDark,
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: _StatCard(
                            title: 'Trips',
                            value: '12',
                            icon: Icons.flight_takeoff_rounded,
                            isDark: isDark,
                          ),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 40),
                    
                    // ─── ACCOUNT SETTINGS ───────────────────────────────
                    _SectionHeader(title: 'Account Settings', isDark: isDark),
                    const SizedBox(height: 16),
                    _SettingsGroup(
                      isDark: isDark,
                      items: [
                        _SettingsItem(
                          icon: Icons.person_outline_rounded,
                          title: 'Personal Information',
                          onTap: () => context.push('/profile/personal-info'),
                        ),
                        _SettingsItem(
                          icon: Icons.payment_rounded,
                          title: 'Payment Methods',
                          onTap: () => context.push('/profile/payment-methods'),
                        ),
                        _SettingsItem(
                          icon: Icons.notifications_none_rounded,
                          title: 'Notifications',
                          onTap: () => context.push('/profile/settings'),
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 32),
                    
                    // ─── PREFERENCES ────────────────────────────────────
                    _SectionHeader(title: 'Preferences', isDark: isDark),
                    const SizedBox(height: 16),
                    _SettingsGroup(
                      isDark: isDark,
                      items: [
                        _SettingsItem(
                          icon: Icons.settings_outlined,
                          title: 'App Settings',
                          onTap: () => context.push('/profile/settings'),
                        ),
                        _SettingsItem(
                          icon: Icons.help_outline_rounded,
                          title: 'Help & Support',
                          onTap: () => context.push('/profile/support'),
                        ),
                        _SettingsItem(
                          icon: Icons.info_outline_rounded,
                          title: 'About LuxeStay',
                          onTap: () {},
                        ),
                      ],
                    ),
                    
                    const SizedBox(height: 40),
                    
                    // ─── LOGOUT BUTTON ──────────────────────────────────
                    SizedBox(
                      width: double.infinity,
                      child: TextButton(
                        onPressed: () {
                          HapticFeedback.lightImpact();
                          context.go('/login');
                        },
                        style: TextButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 20),
                          shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(20),
                          ),
                          backgroundColor: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                        ),
                        child: Text(
                          'Log Out',
                          style: AppTypography.buttonSmall(color: AppColors.error),
                        ),
                      ),
                    ),
                    
                    const SizedBox(height: 120),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;
  final bool isDark;

  const _StatCard({
    required this.title,
    required this.value,
    required this.icon,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: 24, color: AppColors.accent),
          const SizedBox(height: 16),
          Text(
            value,
            style: AppTypography.priceSmall(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
          ),
          const SizedBox(height: 4),
          Text(
            title,
            style: AppTypography.caption(color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
          ),
        ],
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  final String title;
  final bool isDark;

  const _SectionHeader({required this.title, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: Alignment.centerLeft,
      child: Text(
        title,
        style: AppTypography.sectionTitle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary).copyWith(fontSize: 18),
      ),
    );
  }
}

class _SettingsGroup extends StatelessWidget {
  final List<_SettingsItem> items;
  final bool isDark;

  const _SettingsGroup({required this.items, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
      ),
      child: Column(
        children: List.generate(items.length, (index) {
          final item = items[index];
          return Column(
            children: [
              _SettingsTile(
                icon: item.icon,
                title: item.title,
                onTap: item.onTap,
                isDark: isDark,
              ),
              if (index < items.length - 1)
                Divider(
                  height: 1,
                  thickness: 1,
                  color: isDark ? AppColors.darkBorder : AppColors.border,
                  indent: 24,
                  endIndent: 24,
                ),
            ],
          );
        }),
      ),
    );
  }
}

class _SettingsItem {
  final IconData icon;
  final String title;
  final VoidCallback onTap;

  _SettingsItem({required this.icon, required this.title, required this.onTap});
}

class _SettingsTile extends StatefulWidget {
  final IconData icon;
  final String title;
  final VoidCallback onTap;
  final bool isDark;

  const _SettingsTile({
    required this.icon,
    required this.title,
    required this.onTap,
    required this.isDark,
  });

  @override
  State<_SettingsTile> createState() => _SettingsTileState();
}

class _SettingsTileState extends State<_SettingsTile> with SingleTickerProviderStateMixin {
  late final AnimationController _controller;
  late final Animation<Color?> _bgColor;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(vsync: this, duration: const Duration(milliseconds: 150));
    final defaultBg = Colors.transparent;
    final pressedBg = widget.isDark ? Colors.white.withOpacity(0.05) : Colors.black.withOpacity(0.03);
    _bgColor = ColorTween(begin: defaultBg, end: pressedBg).animate(_controller);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTapDown: (_) => _controller.forward(),
      onTapUp: (_) {
        _controller.reverse();
        HapticFeedback.selectionClick();
        widget.onTap();
      },
      onTapCancel: () => _controller.reverse(),
      child: AnimatedBuilder(
        animation: _bgColor,
        builder: (context, child) => Container(
          color: _bgColor.value,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 20),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: widget.isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  widget.icon,
                  size: 20,
                  color: widget.isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Text(
                  widget.title,
                  style: AppTypography.bodyMedium(
                    color: widget.isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  ),
                ),
              ),
              Icon(
                Icons.chevron_right_rounded,
                size: 24,
                color: widget.isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
