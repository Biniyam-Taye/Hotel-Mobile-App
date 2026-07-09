import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:luxestay/src/core/network/api_exception.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_dimensions.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/core/widgets/buttons/primary_button.dart';
import 'package:luxestay/src/providers/auth_provider.dart';
import 'package:go_router/go_router.dart';

class LoginScreen extends ConsumerStatefulWidget {
  const LoginScreen({super.key});

  @override
  ConsumerState<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends ConsumerState<LoginScreen> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleLogin() async {
    final email = _emailController.text.trim();
    final password = _passwordController.text;

    if (email.isEmpty || password.isEmpty) {
      _showError('Please enter email and password');
      return;
    }

    try {
      final user = await ref.read(authProvider.notifier).login(email, password);
      if (!mounted) return;

      switch (user.role) {
        case 'super_admin':
        case 'hotel_admin':
          context.go('/admin/dashboard');
        case 'receptionist':
          context.go('/receptionist/dashboard');
        default:
          context.go('/home');
      }
    } on ApiException catch (e) {
      if (mounted) _showError(e.message);
    } catch (_) {
      if (mounted) _showError('Unable to connect to server. Is the backend running?');
    }
  }

  void _showError(String message) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(content: Text(message), backgroundColor: AppColors.error),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isLoading = ref.watch(authProvider).isLoading;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBackground : AppColors.background,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(AppDimensions.paddingScreen),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Center(
                  child: Container(
                    width: 72,
                    height: 72,
                    decoration: BoxDecoration(
                      color: AppColors.accent,
                      borderRadius: BorderRadius.circular(24),
                    ),
                    child: Center(
                      child: Text(
                        'L',
                        style: TextStyle(
                          fontSize: 32,
                          fontWeight: FontWeight.w800,
                          color: AppColors.textOnAccent,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: AppDimensions.xxl),
                Text(
                  'Welcome Back',
                  style: AppTypography.pageTitle(
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: AppDimensions.sm),
                Text(
                  'Sign in to access your bookings and exclusive luxury offers.',
                  style: AppTypography.body(
                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                  ),
                  textAlign: TextAlign.center,
                ),
                const SizedBox(height: AppDimensions.xxxl),
                TextField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  style: AppTypography.body(
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  ),
                  decoration: const InputDecoration(
                    hintText: 'Email Address',
                    prefixIcon: Icon(Icons.email_outlined),
                  ),
                ),
                const SizedBox(height: AppDimensions.base),
                TextField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  style: AppTypography.body(
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  ),
                  decoration: InputDecoration(
                    hintText: 'Password',
                    prefixIcon: const Icon(Icons.lock_outline_rounded),
                    suffixIcon: IconButton(
                      icon: Icon(
                        _obscurePassword
                            ? Icons.visibility_outlined
                            : Icons.visibility_off_outlined,
                      ),
                      onPressed: () {
                        setState(() => _obscurePassword = !_obscurePassword);
                      },
                    ),
                  ),
                ),
                Align(
                  alignment: Alignment.centerRight,
                  child: TextButton(
                    onPressed: () {},
                    child: Text(
                      'Forgot Password?',
                      style: AppTypography.captionMedium(
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: AppDimensions.md),
                PrimaryButton(
                  text: 'Sign In',
                  isLoading: isLoading,
                  onPressed: _handleLogin,
                ),
                const SizedBox(height: AppDimensions.xl),
                Row(
                  children: [
                    const Expanded(child: Divider()),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: AppDimensions.md),
                      child: Text(
                        'Demo: guest@luxestay.com / Guest123!',
                        style: AppTypography.label(
                          color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                        ),
                        textAlign: TextAlign.center,
                      ),
                    ),
                    const Expanded(child: Divider()),
                  ],
                ),
                const SizedBox(height: AppDimensions.xxxl),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      'Don\'t have an account? ',
                      style: AppTypography.body(
                        color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                      ),
                    ),
                    GestureDetector(
                      onTap: () => context.push('/register'),
                      child: Text(
                        'Sign Up',
                        style: AppTypography.bodySemiBold(
                          color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
