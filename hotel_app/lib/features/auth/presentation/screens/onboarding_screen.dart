import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/widgets/buttons/primary_button.dart';

class _OnboardingPage {
  final String title;
  final String subtitle;
  final IconData icon;
  final Color accent;

  const _OnboardingPage({
    required this.title,
    required this.subtitle,
    required this.icon,
    required this.accent,
  });
}

final _pages = [
  const _OnboardingPage(
    title: 'Discover\nDream Hotels',
    subtitle: 'Explore thousands of handpicked\nluxury hotels around the world.',
    icon: Icons.travel_explore_rounded,
    accent: AppColors.primary,
  ),
  const _OnboardingPage(
    title: 'Book in\nSeconds',
    subtitle: 'A seamless, one-tap booking\nexperience designed for you.',
    icon: Icons.bolt_rounded,
    accent: Color(0xFF7C3AED),
  ),
  const _OnboardingPage(
    title: 'Live the\nLuxury Life',
    subtitle: 'World-class amenities, exclusive\ndeals and 24/7 concierge.',
    icon: Icons.star_rounded,
    accent: Color(0xFF0EA5E9),
  ),
];

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final _controller = PageController();
  int _currentPage = 0;

  void _next() {
    if (_currentPage < _pages.length - 1) {
      _controller.nextPage(
        duration: const Duration(milliseconds: 400),
        curve: Curves.easeInOut,
      );
    } else {
      context.go('/login');
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final size = MediaQuery.of(context).size;
    final isTablet = size.width > 600;

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      body: Stack(
        children: [
          // Page view
          PageView.builder(
            controller: _controller,
            itemCount: _pages.length,
            onPageChanged: (i) => setState(() => _currentPage = i),
            itemBuilder: (context, index) {
              final page = _pages[index];
              return _OnboardingPageView(
                page: page,
                isTablet: isTablet,
                screenHeight: size.height,
              );
            },
          ),

          // Bottom controls
          Positioned(
            bottom: 0,
            left: 0,
            right: 0,
            child: Container(
              padding: EdgeInsets.fromLTRB(
                AppSpacing.lg,
                AppSpacing.lg,
                AppSpacing.lg,
                MediaQuery.of(context).padding.bottom + AppSpacing.lg,
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Dot indicators
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                      _pages.length,
                      (i) => AnimatedContainer(
                        duration: const Duration(milliseconds: 300),
                        margin: const EdgeInsets.symmetric(horizontal: 4),
                        width: _currentPage == i ? 28 : 8,
                        height: 8,
                        decoration: BoxDecoration(
                          color: _currentPage == i
                              ? _pages[_currentPage].accent
                              : AppColors.grey300,
                          borderRadius: BorderRadius.circular(999),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.xl),

                  // CTA Button
                  SizedBox(
                    width: isTablet ? 400 : double.infinity,
                    height: AppSpacing.buttonHeight,
                    child: ElevatedButton(
                      onPressed: _next,
                      style: ElevatedButton.styleFrom(
                        backgroundColor: _pages[_currentPage].accent,
                      ),
                      child: Text(
                        _currentPage == _pages.length - 1
                            ? 'Get Started'
                            : 'Next',
                        style: const TextStyle(
                          fontFamily: 'Nunito',
                          fontSize: 16,
                          fontWeight: FontWeight.w700,
                          color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),

                  // Skip
                  if (_currentPage < _pages.length - 1)
                    TextButton(
                      onPressed: () => context.go('/login'),
                      child: Text(
                        'Skip',
                        style: TextStyle(
                          fontFamily: 'Nunito',
                          fontWeight: FontWeight.w600,
                          color: AppColors.grey400,
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _OnboardingPageView extends StatelessWidget {
  final _OnboardingPage page;
  final bool isTablet;
  final double screenHeight;

  const _OnboardingPageView({
    required this.page,
    required this.isTablet,
    required this.screenHeight,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        // Illustration area
        Expanded(
          flex: 5,
          child: Container(
            width: double.infinity,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  page.accent.withOpacity(0.12),
                  page.accent.withOpacity(0.04),
                ],
              ),
            ),
            child: SafeArea(
              child: Center(
                child: Container(
                  width: isTablet ? 220 : 170,
                  height: isTablet ? 220 : 170,
                  decoration: BoxDecoration(
                    color: page.accent.withOpacity(0.15),
                    shape: BoxShape.circle,
                  ),
                  child: Container(
                    margin: const EdgeInsets.all(24),
                    decoration: BoxDecoration(
                      color: page.accent.withOpacity(0.2),
                      shape: BoxShape.circle,
                    ),
                    child: Icon(
                      page.icon,
                      size: isTablet ? 80 : 64,
                      color: page.accent,
                    ),
                  ),
                ),
              ),
            ),
          ),
        ),

        // Text area
        Expanded(
          flex: 3,
          child: Padding(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.xl,
              vertical: AppSpacing.lg,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  page.title,
                  style: Theme.of(context).textTheme.displaySmall?.copyWith(
                        fontWeight: FontWeight.w800,
                        height: 1.15,
                      ),
                ),
                const SizedBox(height: AppSpacing.md),
                Text(
                  page.subtitle,
                  style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                        color: Theme.of(context)
                            .colorScheme
                            .onSurface
                            .withOpacity(0.55),
                        height: 1.6,
                      ),
                ),
              ],
            ),
          ),
        ),

        // Space for bottom controls
        const SizedBox(height: 180),
      ],
    );
  }
}
