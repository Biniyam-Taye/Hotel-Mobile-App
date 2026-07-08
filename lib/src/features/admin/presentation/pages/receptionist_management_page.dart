import 'package:flutter/material.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';

class ReceptionistManagementPage extends StatelessWidget {
  const ReceptionistManagementPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const AdminAppBar(title: 'Receptionist Management'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search receptionists by name or hotel...',
                  addButtonLabel: 'Add Receptionist',
                  filterChips: const ['All', 'On Duty', 'Off Duty', 'On Leave'],
                  columns: const ['Name', 'Hotel', 'Shift', 'Email', 'Phone', 'Rating', 'Status', 'Actions'],
                  rows: AdminMockData.receptionists.map((r) => [
                    r['name'],
                    r['hotel'],
                    r['shift'],
                    r['email'],
                    r['phone'],
                    '⭐ ${r['rating']}',
                    r['status'],
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.edit_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'Edit',
                        ),
                        IconButton(
                          icon: const Icon(Icons.calendar_month_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'Schedule',
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
