import 'package:flutter/material.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';

class RoomManagementPage extends StatelessWidget {
  const RoomManagementPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const AdminAppBar(title: 'Room Management'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search rooms by number or type...',
                  addButtonLabel: 'Add Room',
                  filterChips: const ['All', 'Available', 'Occupied', 'Maintenance'],
                  columns: const ['Number', 'Hotel', 'Type', 'Floor', 'Price', 'Status', 'Actions'],
                  rows: AdminMockData.rooms.map((r) => [
                    r['number'],
                    r['hotel'],
                    r['type'],
                    r['floor'].toString(),
                    '\$${r['price']}',
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
                          icon: const Icon(Icons.build_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'Maintenance',
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
