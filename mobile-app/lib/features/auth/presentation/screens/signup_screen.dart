import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';

class SignupScreen extends StatefulWidget {
  const SignupScreen({super.key});

  @override
  State<SignupScreen> createState() => _SignupScreenState();
}

class _SignupScreenState extends State<SignupScreen> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _obscurePassword = true;
  bool _obscureConfirm = true;
  bool _acceptTerms = false;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isTablet = size.width > 600;

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: EdgeInsets.symmetric(
              horizontal: isTablet ? size.width * 0.2 : AppSpacing.lg,
              vertical: AppSpacing.lg,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: AppSpacing.md),

                // Back button
                GestureDetector(
                  onTap: () => context.go('/login'),
                  child: Container(
                    width: 42,
                    height: 42,
                    decoration: BoxDecoration(
                      color: Theme.of(context).colorScheme.surface,
                      borderRadius: BorderRadius.circular(14),
                      border: Border.all(color: AppColors.grey200),
                    ),
                    child: const Icon(Icons.arrow_back_ios_new_rounded,
                        size: 18),
                  ),
                ),

                const SizedBox(height: AppSpacing.xl),

                // Heading
                Text(
                  'Create account ✨',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.w800,
                      ),
                ),
                const SizedBox(height: AppSpacing.xs),
                Text(
                  'Start your luxury journey today.',
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Theme.of(context)
                            .colorScheme
                            .onSurface
                            .withValues(alpha: 0.5),
                      ),
                ),

                const SizedBox(height: AppSpacing.xxl),

                // Full Name
                _FieldLabel('Full Name'),
                const SizedBox(height: AppSpacing.xs),
                TextFormField(
                  controller: _nameController,
                  keyboardType: TextInputType.name,
                  textCapitalization: TextCapitalization.words,
                  decoration: const InputDecoration(
                    hintText: 'John Doe',
                    prefixIcon: Icon(Icons.person_outline_rounded,
                        color: AppColors.grey400),
                  ),
                ),

                const SizedBox(height: AppSpacing.lg),

                // Email
                _FieldLabel('Email address'),
                const SizedBox(height: AppSpacing.xs),
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  decoration: const InputDecoration(
                    hintText: 'you@example.com',
                    prefixIcon: Icon(Icons.mail_outline_rounded,
                        color: AppColors.grey400),
                  ),
                ),

                const SizedBox(height: AppSpacing.lg),

                // Password
                _FieldLabel('Password'),
                const SizedBox(height: AppSpacing.xs),
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    hintText: '••••••••',
                    prefixIcon: const Icon(Icons.lock_outline_rounded,
                        color: AppColors.grey400),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword
                            ? Icons.visibility_off_outlined
                            : Icons.visibility_outlined,
                        color: AppColors.grey400,
                      ),
                      onPressed: () =>
                          setState(() => _obscurePassword = !_obscurePassword),
                    ),
                  ),
                ),

                const SizedBox(height: AppSpacing.lg),

                // Confirm Password
                _FieldLabel('Confirm Password'),
                const SizedBox(height: AppSpacing.xs),
                TextFormField(
                  controller: _confirmPasswordController,
                  obscureText: _obscureConfirm,
                  decoration: InputDecoration(
                    hintText: '••••••••',
                    prefixIcon: const Icon(Icons.lock_outline_rounded,
                        color: AppColors.grey400),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscureConfirm
                            ? Icons.visibility_off_outlined
                            : Icons.visibility_outlined,
                        color: AppColors.grey400,
                      ),
                      onPressed: () =>
                          setState(() => _obscureConfirm = !_obscureConfirm),
                    ),
                  ),
                ),

                const SizedBox(height: AppSpacing.lg),

                // Terms
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    Transform.scale(
                      scale: 0.9,
                      child: Checkbox(
                        value: _acceptTerms,
                        onChanged: (v) =>
                            setState(() => _acceptTerms = v ?? false),
                        activeColor: AppColors.primary,
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(4)),
                      ),
                    ),
                    Expanded(
                      child: Wrap(
                        children: [
                          Text(
                            'I agree to the ',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                          GestureDetector(
                            onTap: () {},
                            child: Text(
                              'Terms of Service',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodySmall
                                  ?.copyWith(
                                    color: AppColors.primary,
                                    fontWeight: FontWeight.w700,
                                  ),
                            ),
                          ),
                          Text(
                            ' and ',
                            style: Theme.of(context).textTheme.bodySmall,
                          ),
                          GestureDetector(
                            onTap: () {},
                            child: Text(
                              'Privacy Policy',
                              style: Theme.of(context)
                                  .textTheme
                                  .bodySmall
                                  ?.copyWith(
                                    color: AppColors.primary,
                                    fontWeight: FontWeight.w700,
                                  ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: AppSpacing.xl),

                // Create account button
                SizedBox(
                  width: double.infinity,
                  height: AppSpacing.buttonHeight,
                  child: ElevatedButton(
                    onPressed: () => context.go('/main'),
                    child: const Text(
                      'Create Account',
                      style: TextStyle(
                        fontFamily: 'Nunito',
                        fontSize: 16,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ),

                const SizedBox(height: AppSpacing.xl),

                // Divider
                Row(
                  children: [
                    const Expanded(child: Divider()),
                    Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: AppSpacing.md),
                      child: Text(
                        'or sign up with',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: AppColors.grey400,
                            ),
                      ),
                    ),
                    const Expanded(child: Divider()),
                  ],
                ),

                const SizedBox(height: AppSpacing.xl),

                // Social buttons
                Row(
                  children: [
                    Expanded(
                      child: _SocialButton(
                        label: 'Google',
                        icon: Icons.g_mobiledata_rounded,
                        onTap: () {},
                      ),
                    ),
                    const SizedBox(width: AppSpacing.md),
                    Expanded(
                      child: _SocialButton(
                        label: 'Apple',
                        icon: Icons.apple_rounded,
                        onTap: () {},
                      ),
                    ),
                  ],
                ),

                const SizedBox(height: AppSpacing.xxl),

                // Login link
                Center(
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Text(
                        'Already have an account? ',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                      TextButton(
                        onPressed: () => context.go('/login'),
                        style: TextButton.styleFrom(
                          padding: EdgeInsets.zero,
                          minimumSize: Size.zero,
                          tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                        ),
                        child: const Text(
                          'Sign In',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontWeight: FontWeight.w700,
                            color: AppColors.primary,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: AppSpacing.lg),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _FieldLabel extends StatelessWidget {
  final String text;
  const _FieldLabel(this.text);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      style: Theme.of(context).textTheme.labelLarge?.copyWith(
            color: Theme.of(context).colorScheme.onSurface,
            fontSize: 13,
          ),
    );
  }
}

class _SocialButton extends StatelessWidget {
  final String label;
  final IconData icon;
  final VoidCallback onTap;

  const _SocialButton({
    required this.label,
    required this.icon,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return OutlinedButton.icon(
      onPressed: onTap,
      icon: Icon(icon, size: 22),
      label: Text(
        label,
        style: const TextStyle(
          fontFamily: 'Nunito',
          fontWeight: FontWeight.w600,
        ),
      ),
      style: OutlinedButton.styleFrom(
        padding: const EdgeInsets.symmetric(vertical: 14),
      ),
    );
  }
}
