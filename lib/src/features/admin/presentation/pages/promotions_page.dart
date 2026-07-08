import 'package:flutter/material.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';
import 'package:intl/intl.dart';

class PromotionsPage extends StatelessWidget {
  const PromotionsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy');

    return Column(
      children: [
        const AdminAppBar(title: 'Promotions & Coupons'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search by promo code or name...',
                  addButtonLabel: 'Create Promotion',
                  filterChips: const ['All', 'Active', 'Scheduled', 'Expired'],
                  columns: const ['Code', 'Name', 'Discount', 'Usage', 'Valid From', 'Valid Until', 'Status', 'Actions'],
                  rows: AdminMockData.promotions.map((p) => [
                    p['code'],
                    p['name'],
                    p['type'] == 'Percentage' ? '${p['discount']}%' : '\$${p['discount']}',
                    '${p['usageCount']} / ${p['usageLimit'] == 0 ? '∞' : p['usageLimit']}',
                    dateFormat.format(p['validFrom']),
                    dateFormat.format(p['validUntil']),
                    p['status'],
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.edit_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'Edit',
                        ),
                        IconButton(
                          icon: const Icon(Icons.block_rounded, size: 18, color: Colors.orange),
                          onPressed: () {},
                          tooltip: 'Deactivate',
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
