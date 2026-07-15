import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';

class OnboardingScreen extends StatelessWidget {
  const OnboardingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isTablet = size.width > 600;

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: SafeArea(
        child: LayoutBuilder(
          builder: (context, constraints) {
            return SingleChildScrollView(
              child: ConstrainedBox(
                constraints: BoxConstraints(
                  minHeight: constraints.maxHeight,
                ),
                child: Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: AppSpacing.xl,
                    vertical: AppSpacing.xl,
                  ),
                  child: IntrinsicHeight(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        const Spacer(),
                        // Beautiful central icon/illustration
                        Center(
                          child: Container(
                            width: isTablet ? 260 : 220,
                            height: isTablet ? 260 : 220,
                            decoration: BoxDecoration(
                              color: AppColors.primary.withValues(alpha: 0.1),
                              shape: BoxShape.circle,
                            ),
                            child: Center(
                              child: Container(
                                width: isTablet ? 180 : 150,
                                height: isTablet ? 180 : 150,
                                decoration: BoxDecoration(
                                  color: AppColors.primary.withValues(alpha: 0.2),
                                  shape: BoxShape.circle,
                                ),
                                child: Icon(
                                  Icons.travel_explore_rounded,
                                  size: isTablet ? 90 : 75,
                                  color: AppColors.primary,
                                ),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: AppSpacing.xxxl),
                        // Text Content
                        Text(
                          'Experience\nUltimate Luxury',
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.displaySmall?.copyWith(
                                fontWeight: FontWeight.w800,
                                height: 1.15,
                              ),
                        ),
                        const SizedBox(height: AppSpacing.md),
                        Text(
                          'Discover and book the finest hotels around the globe with a seamless, one-tap experience.',
                          textAlign: TextAlign.center,
                          style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                                color: Theme.of(context)
                                    .colorScheme
                                    .onSurface
                                    .withValues(alpha: 0.6),
                                height: 1.6,
                              ),
                        ),
                        const Spacer(),
                        const SizedBox(height: AppSpacing.xxl),
                        // CTA Button
                        SizedBox(
                          height: AppSpacing.buttonHeight,
                          child: ElevatedButton(
                            onPressed: () => context.go('/login'),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: AppColors.primary,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(16),
                              ),
                              elevation: 0,
                            ),
                            child: const Text(
                              'Get Started',
                              style: TextStyle(
                                fontFamily: 'Nunito',
                                fontSize: 18,
                                fontWeight: FontWeight.w700,
                                color: Colors.white,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
