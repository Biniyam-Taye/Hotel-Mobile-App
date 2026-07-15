import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../theme/app_colors.dart';

/// A consistent app bar used across all feature screens.
/// Automatically shows a back button when there is a route to pop.
/// On the root shell it shows no leading widget.
class CustomAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final List<Widget>? actions;
  final bool centerTitle;
  final Widget? leading;

  const CustomAppBar({
    super.key,
    required this.title,
    this.actions,
    this.centerTitle = true,
    this.leading,
  });

  @override
  Widget build(BuildContext context) {
    final canPop = context.canPop();

    return AppBar(
      title: Text(
        title,
        style: Theme.of(context).textTheme.titleLarge?.copyWith(
              fontWeight: FontWeight.w800,
            ),
      ),
      centerTitle: centerTitle,
      actions: actions,
      // If a custom leading is provided use it, otherwise auto-show back button
      leading: leading ??
          (canPop
              ? Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Container(
                    decoration: BoxDecoration(
                      color: Theme.of(context)
                          .colorScheme
                          .surface
                          .withValues(alpha: 0.9),
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: Theme.of(context)
                            .dividerColor
                            .withValues(alpha: 0.1),
                      ),
                    ),
                    child: IconButton(
                      icon: const Icon(Icons.arrow_back_ios_new_rounded, size: 18),
                      color: AppColors.primary,
                      onPressed: () => context.pop(),
                    ),
                  ),
                )
              : null),
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight);
}
