import 'package:flutter/material.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';

class StaffManagementPage extends StatelessWidget {
  const StaffManagementPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const AdminAppBar(title: 'Staff Management'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search staff by name, role or department...',
                  addButtonLabel: 'Add Staff Member',
                  filterChips: const ['All', 'Active', 'On Leave'],
                  columns: const ['Name', 'Role', 'Department', 'Hotel', 'Hire Date', 'Salary', 'Status', 'Actions'],
                  rows: AdminMockData.staff.map((s) => [
                    s['name'],
                    s['role'],
                    s['department'],
                    s['hotel'],
                    s['hireDate'],
                    '\$${s['salary']}/mo',
                    s['status'],
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.edit_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'Edit',
                        ),
                        IconButton(
                          icon: const Icon(Icons.delete_rounded, size: 18, color: Colors.red),
                          onPressed: () {},
                          tooltip: 'Remove',
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
