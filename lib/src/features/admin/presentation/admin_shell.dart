import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_sidebar.dart';
import 'package:go_router/go_router.dart';

class AdminShell extends StatefulWidget {
  final Widget child;

  const AdminShell({
    super.key,
    required this.child,
  });

  @override
  State<AdminShell> createState() => _AdminShellState();
}

class _AdminShellState extends State<AdminShell> {
  bool _isSidebarExpanded = true;

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Auto collapse sidebar on smaller screens
    final width = MediaQuery.of(context).size.width;
    if (width < 1200 && _isSidebarExpanded) {
      setState(() => _isSidebarExpanded = false);
    } else if (width >= 1200 && !_isSidebarExpanded) {
      setState(() => _isSidebarExpanded = true);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBackgroundSecondary : AppColors.backgroundSecondary,
      body: Row(
        children: [
          // Sidebar Navigation
          AdminSidebar(
            isExpanded: _isSidebarExpanded,
            onToggle: () {
              setState(() {
                _isSidebarExpanded = !_isSidebarExpanded;
              });
            },
          ),
          
          // Main Content Area
          Expanded(
            child: ClipRRect(
              child: widget.child,
            ),
          ),
        ],
      ),
    );
  }
}
