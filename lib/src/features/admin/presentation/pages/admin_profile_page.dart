import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';

class AdminProfilePage extends StatelessWidget {
  const AdminProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final profile = AdminMockData.adminProfile;

    return Column(
      children: [
        const AdminAppBar(title: 'My Profile'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Profile Card (Left)
                SizedBox(
                  width: 350,
                  child: Container(
                    padding: const EdgeInsets.all(32),
                    decoration: BoxDecoration(
                      color: isDark ? AppColors.darkCard : AppColors.card,
                      borderRadius: BorderRadius.circular(16),
                      border: Border.all(
                        color: isDark ? AppColors.darkBorder : AppColors.border,
                      ),
                    ),
                    child: Column(
                      children: [
                        CircleAvatar(
                          radius: 50,
                          backgroundColor: AppColors.accent,
                          child: Text(
                            profile['name'].toString().substring(0, 2).toUpperCase(),
                            style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: AppColors.textPrimary),
                          ),
                        ),
                        const SizedBox(height: 24),
                        Text(
                          profile['name'],
                          style: TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.bold,
                            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                          decoration: BoxDecoration(
                            color: AppColors.accent.withValues(alpha: 0.1),
                            borderRadius: BorderRadius.circular(20),
                          ),
                          child: Text(
                            profile['role'],
                            style: const TextStyle(color: AppColors.accent, fontWeight: FontWeight.w600),
                          ),
                        ),
                        const SizedBox(height: 32),
                        const Divider(),
                        const SizedBox(height: 24),
                        _buildProfileInfo(Icons.email_rounded, profile['email'], isDark),
                        const SizedBox(height: 16),
                        _buildProfileInfo(Icons.phone_rounded, profile['phone'], isDark),
                        const SizedBox(height: 16),
                        _buildProfileInfo(Icons.calendar_month_rounded, 'Joined ${profile['joined']}', isDark),
                      ],
                    ),
                  ),
                ),
                
                const SizedBox(width: 32),
                
                // Edit Profile (Right)
                Expanded(
                  child: Container(
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
                          'Edit Profile',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 32),
                        
                        Row(
                          children: [
                            Expanded(child: _buildTextField('Full Name', profile['name'], isDark)),
                            const SizedBox(width: 24),
                            Expanded(child: _buildTextField('Phone Number', profile['phone'], isDark)),
                          ],
                        ),
                        const SizedBox(height: 24),
                        _buildTextField('Email Address', profile['email'], isDark),
                        
                        const SizedBox(height: 48),
                        Text(
                          'Security',
                          style: TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 24),
                        
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text('Two-Factor Authentication', style: TextStyle(fontWeight: FontWeight.w600)),
                                const SizedBox(height: 4),
                                Text(
                                  'Add an extra layer of security to your account',
                                  style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                                ),
                              ],
                            ),
                            Switch(value: profile['twoFactorEnabled'], onChanged: (v) {}, activeColor: AppColors.accent),
                          ],
                        ),
                        
                        const SizedBox(height: 32),
                        OutlinedButton(
                          onPressed: () {},
                          child: const Text('Change Password'),
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
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildProfileInfo(IconData icon, String text, bool isDark) {
    return Row(
      children: [
        Icon(icon, size: 18, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
        const SizedBox(width: 12),
        Text(
          text,
          style: TextStyle(color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
        ),
      ],
    );
  }

  Widget _buildTextField(String label, String value, bool isDark) {
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
