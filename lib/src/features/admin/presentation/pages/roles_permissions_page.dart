import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';

class RolesPermissionsPage extends StatelessWidget {
  const RolesPermissionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        const AdminAppBar(title: 'Roles & Permissions'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  addButtonLabel: 'Create Role',
                  columns: const ['Role Name', 'Description', 'Members', 'Permissions', 'Actions'],
                  rows: AdminMockData.roles.map((r) => [
                    r['name'],
                    r['description'],
                    r['members'].toString(),
                    Wrap(
                      spacing: 4,
                      runSpacing: 4,
                      children: (r['permissions'] as List<String>).take(3).map((p) => Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: AppColors.accent.withValues(alpha: 0.1),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          p,
                          style: const TextStyle(fontSize: 10, color: AppColors.accent),
                        ),
                      )).toList()..addAll([
                        if ((r['permissions'] as List).length > 3)
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                            decoration: BoxDecoration(
                              color: isDark ? AppColors.darkSurfaceVariant : AppColors.surfaceVariant,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: Text(
                              '+${(r['permissions'] as List).length - 3} more',
                              style: TextStyle(fontSize: 10, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                            ),
                          )
                      ]),
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.edit_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'Edit Role',
                        ),
                      ],
                    ),
                  ]).toList(),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}
