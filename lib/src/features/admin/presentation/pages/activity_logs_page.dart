import 'package:flutter/material.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';
import 'package:intl/intl.dart';

class ActivityLogsPage extends StatelessWidget {
  const ActivityLogsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy HH:mm');

    return Column(
      children: [
        const AdminAppBar(title: 'Activity Logs'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search by user, action or IP address...',
                  filterChips: const ['All', 'Updates', 'Creations', 'Deletions', 'System'],
                  columns: const ['Timestamp', 'User', 'Action', 'Target', 'IP Address'],
                  rows: AdminMockData.activityLogs.map((l) => [
                    dateFormat.format(l['timestamp']),
                    l['user'],
                    l['action'],
                    l['target'],
                    l['ip'],
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
