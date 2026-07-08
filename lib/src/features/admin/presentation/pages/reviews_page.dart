import 'package:flutter/material.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';
import 'package:intl/intl.dart';

class ReviewsPage extends StatelessWidget {
  const ReviewsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy');

    return Column(
      children: [
        const AdminAppBar(title: 'Reviews & Ratings'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search reviews by guest or hotel...',
                  filterChips: const ['All', 'Unanswered', '5 Stars', '1-3 Stars'],
                  columns: const ['Guest', 'Hotel', 'Rating', 'Comment', 'Date', 'Status', 'Actions'],
                  rows: AdminMockData.reviews.map((r) => [
                    r['guest'],
                    r['hotel'],
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: List.generate(5, (index) {
                        return Icon(
                          index < r['rating'] ? Icons.star_rounded : Icons.star_border_rounded,
                          size: 16,
                          color: Colors.amber,
                        );
                      }),
                    ),
                    SizedBox(
                      width: 250,
                      child: Text(
                        r['comment'],
                        maxLines: 2,
                        overflow: TextOverflow.ellipsis,
                      ),
                    ),
                    dateFormat.format(r['date']),
                    r['responded'] ? 'Responded' : 'Pending',
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        if (!r['responded'])
                          IconButton(
                            icon: const Icon(Icons.reply_rounded, size: 18),
                            onPressed: () {},
                            tooltip: 'Reply',
                          ),
                        IconButton(
                          icon: const Icon(Icons.visibility_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'View Full',
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
