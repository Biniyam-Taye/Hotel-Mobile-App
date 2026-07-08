import 'package:flutter/material.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';

class HotelManagementPage extends StatelessWidget {
  const HotelManagementPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const AdminAppBar(title: 'Hotel Management'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search hotels by name or location...',
                  addButtonLabel: 'Add Hotel',
                  filterChips: const ['All', 'Active', 'Maintenance'],
                  columns: const ['Name', 'Location', 'Rooms', 'Occupancy', 'Rating', 'Status', 'Actions'],
                  rows: AdminMockData.hotels.map((h) => [
                    h['name'],
                    h['location'],
                    h['rooms'].toString(),
                    '${h['occupancy']}%',
                    '⭐ ${h['rating']}',
                    h['status'],
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
                          tooltip: 'Delete',
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
