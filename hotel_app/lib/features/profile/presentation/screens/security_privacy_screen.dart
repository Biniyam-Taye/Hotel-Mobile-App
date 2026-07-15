import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';

class SecurityPrivacyScreen extends StatelessWidget {
  const SecurityPrivacyScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Security & Privacy'),
      body: ListView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        children: [
          _buildSectionTitle(context, 'Security'),
          const SizedBox(height: AppSpacing.sm),
          _buildCard(
            context,
            children: [
              _buildListTile(context, Icons.lock_outline_rounded, 'Change Password'),
              _buildDivider(context),
              _buildListTile(context, Icons.fingerprint_rounded, 'Biometric Authentication', trailing: Switch(value: true, onChanged: (v) {}, activeTrackColor: AppColors.primary)),
              _buildDivider(context),
              _buildListTile(context, Icons.security_rounded, 'Two-Factor Authentication', trailing: const Text('Enabled', style: TextStyle(color: AppColors.primary, fontWeight: FontWeight.bold))),
            ],
          ),
          const SizedBox(height: AppSpacing.xl),
          _buildSectionTitle(context, 'Privacy'),
          const SizedBox(height: AppSpacing.sm),
          _buildCard(
            context,
            children: [
              _buildListTile(context, Icons.share_location_rounded, 'Location Services', trailing: Switch(value: false, onChanged: (v) {}, activeTrackColor: AppColors.primary)),
              _buildDivider(context),
              _buildListTile(context, Icons.analytics_outlined, 'Data Analytics', trailing: Switch(value: true, onChanged: (v) {}, activeTrackColor: AppColors.primary)),
              _buildDivider(context),
              _buildListTile(context, Icons.delete_outline_rounded, 'Delete Account', textColor: AppColors.error),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildSectionTitle(BuildContext context, String title) {
    return Text(
      title,
      style: Theme.of(context).textTheme.titleMedium?.copyWith(
            fontWeight: FontWeight.w800,
          ),
    );
  }

  Widget _buildCard(BuildContext context, {required List<Widget> children}) {
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: AppBorders.medium,
        border: Border.all(
          color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
        ),
      ),
      child: Column(children: children),
    );
  }

  Widget _buildDivider(BuildContext context) {
    return Divider(
      height: 1,
      indent: 56,
      color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
    );
  }

  Widget _buildListTile(BuildContext context, IconData icon, String title, {Widget? trailing, Color? textColor}) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: (textColor ?? AppColors.primary).withValues(alpha: 0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: textColor ?? AppColors.primary, size: 20),
      ),
      title: Text(
        title,
        style: Theme.of(context).textTheme.bodyLarge?.copyWith(
              fontWeight: FontWeight.w600,
              color: textColor,
            ),
      ),
      trailing: trailing ?? const Icon(Icons.arrow_forward_ios_rounded, size: 16, color: AppColors.grey400),
      onTap: () {},
    );
  }
}
