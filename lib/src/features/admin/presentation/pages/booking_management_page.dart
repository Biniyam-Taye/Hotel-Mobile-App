import 'package:flutter/material.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';
import 'package:intl/intl.dart';

class BookingManagementPage extends StatelessWidget {
  const BookingManagementPage({super.key});

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy');
    
    return Column(
      children: [
        const AdminAppBar(title: 'Booking Management'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search by booking ID or guest name...',
                  filterChips: const ['All', 'Upcoming', 'Active', 'Completed', 'Cancelled'],
                  columns: const ['ID', 'Guest', 'Hotel', 'Room', 'Dates', 'Amount', 'Status', 'Actions'],
                  rows: AdminMockData.bookings.map((b) => [
                    b['id'],
                    b['guest'],
                    b['hotel'],
                    b['room'],
                    '${dateFormat.format(b['checkIn'])} - ${dateFormat.format(b['checkOut'])}',
                    '\$${(b['amount'] as num).toStringAsFixed(2)}',
                    b['status'],
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.visibility_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'View Details',
                        ),
                        if (b['status'] == 'Upcoming' || b['status'] == 'Active')
                          IconButton(
                            icon: const Icon(Icons.cancel_rounded, size: 18, color: Colors.red),
                            onPressed: () {},
                            tooltip: 'Cancel Booking',
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
