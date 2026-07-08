import 'package:flutter/material.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';

class CustomerManagementPage extends StatelessWidget {
  const CustomerManagementPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const AdminAppBar(title: 'Customer Management'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search customers by name, email or phone...',
                  filterChips: const ['All', 'Active', 'Inactive'],
                  columns: const ['Name', 'Email', 'Phone', 'Tier', 'Bookings', 'Total Spent', 'Status', 'Actions'],
                  rows: AdminMockData.customers.map((c) => [
                    c['name'],
                    c['email'],
                    c['phone'],
                    c['tier'],
                    c['bookings'].toString(),
                    '\$${c['totalSpent']}',
                    c['status'],
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.visibility_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'View Profile',
                        ),
                        IconButton(
                          icon: const Icon(Icons.edit_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'Edit',
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
