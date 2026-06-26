import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';

class SettingsScreen extends StatefulWidget {
  const SettingsScreen({super.key});

  @override
  State<SettingsScreen> createState() => _SettingsScreenState();
}

class _SettingsScreenState extends State<SettingsScreen> {
  bool _pushNotifications = true;
  bool _emailPromos = false;
  bool _faceId = true;
  bool _darkMode = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    // We update _darkMode toggle just for UI preview purposes based on current system/app theme
    _darkMode = isDark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
      appBar: AppBar(
        backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
        elevation: 0,
        centerTitle: true,
        leading: IconButton(
          icon: Icon(
            Icons.arrow_back_ios_new_rounded,
            size: 20,
            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
          ),
          onPressed: () => context.pop(),
        ),
        title: Text(
          'Settings',
          style: AppTypography.pageTitle(
            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
          ).copyWith(fontSize: 20),
        ),
      ),
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(horizontal: AppDimensions.paddingScreen),
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 24),
              
              // ─── NOTIFICATIONS ────────────────────────────────────────
              _SectionTitle(title: 'Notifications', isDark: isDark),
              const SizedBox(height: 16),
              _SettingsGroup(
                isDark: isDark,
                children: [
                  _ToggleTile(
                    title: 'Push Notifications',
                    subtitle: 'Receive updates on your bookings',
                    value: _pushNotifications,
                    onChanged: (v) => setState(() => _pushNotifications = v),
                    isDark: isDark,
                  ),
                  _Divider(isDark: isDark),
                  _ToggleTile(
                    title: 'Email Promotions',
                    subtitle: 'Exclusive offers and travel inspiration',
                    value: _emailPromos,
                    onChanged: (v) => setState(() => _emailPromos = v),
                    isDark: isDark,
                  ),
                ],
              ),
              
              const SizedBox(height: 32),
              
              // ─── SECURITY ─────────────────────────────────────────────
              _SectionTitle(title: 'Security', isDark: isDark),
              const SizedBox(height: 16),
              _SettingsGroup(
                isDark: isDark,
                children: [
                  _ToggleTile(
                    title: 'Face ID / Biometrics',
                    subtitle: 'Use biometric authentication to sign in',
                    value: _faceId,
                    onChanged: (v) => setState(() => _faceId = v),
                    isDark: isDark,
                  ),
                  _Divider(isDark: isDark),
                  _ActionTile(
                    title: 'Change Password',
                    onTap: () {},
                    isDark: isDark,
                  ),
                ],
              ),
              
              const SizedBox(height: 32),
              
              // ─── DISPLAY ──────────────────────────────────────────────
              _SectionTitle(title: 'Display & Appearance', isDark: isDark),
              const SizedBox(height: 16),
              _SettingsGroup(
                isDark: isDark,
                children: [
                  _ToggleTile(
                    title: 'Dark Mode',
                    subtitle: 'Toggle dark mode (syncs with system)',
                    value: _darkMode,
                    onChanged: (v) => setState(() => _darkMode = v),
                    isDark: isDark,
                  ),
                  _Divider(isDark: isDark),
                  _ActionTile(
                    title: 'Language',
                    trailingText: 'English (US)',
                    onTap: () {},
                    isDark: isDark,
                  ),
                  _Divider(isDark: isDark),
                  _ActionTile(
                    title: 'Currency',
                    trailingText: 'USD (\$)',
                    onTap: () {},
                    isDark: isDark,
                  ),
                ],
              ),
              
              const SizedBox(height: 48),
              
              Center(
                child: Text(
                  'LuxeStay v1.0.0',
                  style: AppTypography.caption(
                    color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                  ),
                ),
              ),
              const SizedBox(height: 48),
            ],
          ),
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;
  final bool isDark;

  const _SectionTitle({required this.title, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Text(
      title,
      style: AppTypography.sectionTitle(
        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
      ).copyWith(fontSize: 18),
    );
  }
}

class _SettingsGroup extends StatelessWidget {
  final List<Widget> children;
  final bool isDark;

  const _SettingsGroup({required this.children, required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(24),
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
      ),
      child: Column(children: children),
    );
  }
}

class _Divider extends StatelessWidget {
  final bool isDark;

  const _Divider({required this.isDark});

  @override
  Widget build(BuildContext context) {
    return Divider(
      height: 1,
      thickness: 1,
      color: isDark ? AppColors.darkBorder : AppColors.border,
      indent: 20,
      endIndent: 20,
    );
  }
}

class _ToggleTile extends StatelessWidget {
  final String title;
  final String subtitle;
  final bool value;
  final ValueChanged<bool> onChanged;
  final bool isDark;

  const _ToggleTile({
    required this.title,
    required this.subtitle,
    required this.value,
    required this.onChanged,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: AppTypography.bodyMedium(
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  subtitle,
                  style: AppTypography.caption(
                    color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                  ),
                ),
              ],
            ),
          ),
          Switch.adaptive(
            value: value,
            onChanged: onChanged,
            activeColor: AppColors.accent,
          ),
        ],
      ),
    );
  }
}

class _ActionTile extends StatelessWidget {
  final String title;
  final String? trailingText;
  final VoidCallback onTap;
  final bool isDark;

  const _ActionTile({
    required this.title,
    this.trailingText,
    required this.onTap,
    required this.isDark,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(24),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
        child: Row(
          children: [
            Expanded(
              child: Text(
                title,
                style: AppTypography.bodyMedium(
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
            ),
            if (trailingText != null) ...[
              Text(
                trailingText!,
                style: AppTypography.caption(
                  color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                ),
              ),
              const SizedBox(width: 8),
            ],
            Icon(
              Icons.chevron_right_rounded,
              size: 20,
              color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
            ),
          ],
        ),
      ),
    );
  }
}
