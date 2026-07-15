import 'package:flutter/material.dart';
import '../../theme/app_borders.dart';
import '../../theme/app_shadows.dart';

class PremiumCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry? padding;
  final VoidCallback? onTap;

  const PremiumCard({
    super.key,
    required this.child,
    this.padding,
    this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    
    return Container(
      decoration: BoxDecoration(
        color: Theme.of(context).cardTheme.color,
        borderRadius: AppBorders.medium,
        boxShadow: isDark ? AppShadows.darkSoft : AppShadows.lightSoft,
      ),
      child: Material(
        color: Colors.transparent,
        borderRadius: AppBorders.medium,
        child: InkWell(
          onTap: onTap,
          borderRadius: AppBorders.medium,
          child: Padding(
            padding: padding ?? const EdgeInsets.all(16.0),
            child: child,
          ),
        ),
      ),
    );
  }
}
