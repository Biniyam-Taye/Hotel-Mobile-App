import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';

class SettingsPage extends StatelessWidget {
  const SettingsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        const AdminAppBar(title: 'System Settings'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: LayoutBuilder(
              builder: (context, constraints) {
                final isMobile = constraints.maxWidth < 800;
                
                if (isMobile) {
                  return Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      // Horizontal Navigation for Mobile
                      SingleChildScrollView(
                        scrollDirection: Axis.horizontal,
                        child: Row(
                          children: [
                            _buildSettingsTab('General', Icons.settings_rounded, true, isDark),
                            _buildSettingsTab('Notifications', Icons.notifications_rounded, false, isDark),
                            _buildSettingsTab('Security', Icons.security_rounded, false, isDark),
                            _buildSettingsTab('Integrations', Icons.api_rounded, false, isDark),
                            _buildSettingsTab('Backup', Icons.backup_rounded, false, isDark),
                          ],
                        ),
                      ),
                      const SizedBox(height: 24),
                      _buildSettingsContent(isDark),
                    ],
                  );
                }

                return Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // Settings Navigation (Left)
                    SizedBox(
                      width: 250,
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          _buildSettingsNav('General', Icons.settings_rounded, true, isDark),
                          _buildSettingsNav('Notifications', Icons.notifications_rounded, false, isDark),
                          _buildSettingsNav('Security', Icons.security_rounded, false, isDark),
                          _buildSettingsNav('Integrations', Icons.api_rounded, false, isDark),
                          _buildSettingsNav('Backup', Icons.backup_rounded, false, isDark),
                        ],
                      ),
                    ),
                    const SizedBox(width: 32),
                    Expanded(
                      child: _buildSettingsContent(isDark),
                    ),
                  ],
                );
              },
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildSettingsTab(String title, IconData icon, bool isSelected, bool isDark) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      decoration: BoxDecoration(
        color: isSelected ? (isDark ? AppColors.darkCard : AppColors.card) : Colors.transparent,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isSelected ? AppColors.accent : Colors.transparent,
        ),
      ),
      child: Material(
        color: Colors.transparent,
        child: InkWell(
          onTap: () {},
          borderRadius: BorderRadius.circular(20),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(
                  icon,
                  size: 18,
                  color: isSelected ? AppColors.accent : (isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                ),
                const SizedBox(width: 8),
                Text(
                  title,
                  style: TextStyle(
                    fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                    color: isSelected
                        ? (isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)
                        : (isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSettingsContent(bool isDark) {
    return Container(
      padding: const EdgeInsets.all(32),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.border,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'General Settings',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 32),
          
          _buildSettingsField('Company Name', 'LuxeStay Hotels & Resorts', isDark),
          const SizedBox(height: 24),
          _buildSettingsField('Support Email', 'support@luxestay.com', isDark),
          const SizedBox(height: 24),
          _buildSettingsField('Default Currency', 'USD (\$)', isDark),
          const SizedBox(height: 32),
          
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Maintenance Mode'),
              Switch(value: false, onChanged: (v) {}, activeColor: AppColors.accent),
            ],
          ),
          const Divider(height: 48),
          
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Enable Public Registration'),
              Switch(value: true, onChanged: (v) {}, activeColor: AppColors.accent),
            ],
          ),
          
          const SizedBox(height: 48),
          Align(
            alignment: Alignment.centerRight,
            child: ElevatedButton(
              onPressed: () {},
              child: const Text('Save Changes'),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingsNav(String title, IconData icon, bool isSelected, bool isDark) {
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: isSelected ? (isDark ? AppColors.darkCard : AppColors.card) : Colors.transparent,
        borderRadius: BorderRadius.circular(8),
      ),
      child: ListTile(
        leading: Icon(
          icon,
          color: isSelected ? AppColors.accent : (isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
        ),
        title: Text(
          title,
          style: TextStyle(
            fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
            color: isSelected
                ? (isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)
                : (isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
          ),
        ),
        onTap: () {},
      ),
    );
  }

  Widget _buildSettingsField(String label, String value, bool isDark) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.w500,
            color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: TextEditingController(text: value),
          decoration: const InputDecoration(filled: true),
        ),
      ],
    );
  }
}
