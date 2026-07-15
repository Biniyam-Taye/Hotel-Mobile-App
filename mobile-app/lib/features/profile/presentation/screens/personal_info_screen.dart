import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../../core/widgets/buttons/primary_button.dart';

class PersonalInfoScreen extends StatefulWidget {
  const PersonalInfoScreen({super.key});

  @override
  State<PersonalInfoScreen> createState() => _PersonalInfoScreenState();
}

class _PersonalInfoScreenState extends State<PersonalInfoScreen> {
  final _nameController = TextEditingController(text: 'Alex Johnson');
  final _emailController = TextEditingController(text: 'alex.johnson@example.com');
  final _phoneController = TextEditingController(text: '+1 (555) 123-4567');
  final _dobController = TextEditingController(text: '15 Aug 1990');

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _phoneController.dispose();
    _dobController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Personal Information'),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Center(
              child: Stack(
                children: [
                  Container(
                    width: 100,
                    height: 100,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.primary, width: 3),
                      image: const DecorationImage(
                        image: NetworkImage('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 0,
                    right: 0,
                    child: Container(
                      padding: const EdgeInsets.all(8),
                      decoration: const BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(Icons.camera_alt_rounded, color: Colors.white, size: 20),
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: AppSpacing.xxl),
            _buildTextField(context, 'Full Name', _nameController, Icons.person_outline_rounded),
            const SizedBox(height: AppSpacing.md),
            _buildTextField(context, 'Email Address', _emailController, Icons.email_outlined),
            const SizedBox(height: AppSpacing.md),
            _buildTextField(context, 'Phone Number', _phoneController, Icons.phone_outlined),
            const SizedBox(height: AppSpacing.md),
            _buildTextField(context, 'Date of Birth', _dobController, Icons.calendar_today_rounded),
            const SizedBox(height: 40),
            SizedBox(
              width: double.infinity,
              child: PrimaryButton(
                text: 'Save Changes',
                onPressed: () {
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Profile updated successfully!')),
                  );
                  context.pop();
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTextField(BuildContext context, String label, TextEditingController controller, IconData icon) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: Theme.of(context).textTheme.titleSmall?.copyWith(
                fontWeight: FontWeight.w700,
                color: Theme.of(context).colorScheme.onSurface.withValues(alpha: 0.8),
              ),
        ),
        const SizedBox(height: AppSpacing.sm),
        Container(
          decoration: BoxDecoration(
            color: Theme.of(context).cardTheme.color,
            borderRadius: AppBorders.medium,
            border: Border.all(
              color: Theme.of(context).dividerColor.withValues(alpha: 0.2),
            ),
          ),
          child: TextField(
            controller: controller,
            decoration: InputDecoration(
              prefixIcon: Icon(icon, color: AppColors.grey400),
              border: InputBorder.none,
              contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 16),
            ),
          ),
        ),
      ],
    );
  }
}
