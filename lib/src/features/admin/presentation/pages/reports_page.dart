import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';

class ReportsPage extends StatelessWidget {
  const ReportsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        const AdminAppBar(title: 'Reports & Analytics'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(
                      'Available Reports',
                      style: TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w600,
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                    Row(
                      children: [
                        OutlinedButton.icon(
                          onPressed: () {},
                          icon: const Icon(Icons.calendar_today_rounded, size: 16),
                          label: const Text('Last 30 Days'),
                        ),
                        const SizedBox(width: 12),
                        ElevatedButton.icon(
                          onPressed: () {},
                          icon: const Icon(Icons.download_rounded, size: 16),
                          label: const Text('Export All'),
                        ),
                      ],
                    ),
                  ],
                ),
                const SizedBox(height: 24),
                GridView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: MediaQuery.of(context).size.width > 1200 ? 3 : 2,
                    crossAxisSpacing: 24,
                    mainAxisSpacing: 24,
                    childAspectRatio: 1.5,
                  ),
                  itemCount: AdminMockData.reportCards.length,
                  itemBuilder: (context, index) {
                    final report = AdminMockData.reportCards[index];
                    return _ReportCard(
                      title: report['title'],
                      description: report['description'],
                      iconName: report['icon'],
                      lastGenerated: report['lastGenerated'],
                      trend: report['trend'],
                    );
                  },
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _ReportCard extends StatelessWidget {
  final String title;
  final String description;
  final String iconName;
  final String lastGenerated;
  final String trend;

  const _ReportCard({
    required this.title,
    required this.description,
    required this.iconName,
    required this.lastGenerated,
    required this.trend,
  });

  IconData _getIcon() {
    switch (iconName) {
      case 'bed': return Icons.bed_rounded;
      case 'revenue': return Icons.attach_money_rounded;
      case 'star': return Icons.star_rounded;
      case 'people': return Icons.people_rounded;
      case 'calendar': return Icons.calendar_month_rounded;
      case 'finance': return Icons.account_balance_rounded;
      default: return Icons.insert_chart_rounded;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.border,
          width: 1,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.accent.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  _getIcon(),
                  color: AppColors.accent,
                  size: 24,
                ),
              ),
              const Spacer(),
              IconButton(
                icon: const Icon(Icons.download_rounded),
                color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                onPressed: () {},
                tooltip: 'Download CSV',
              ),
              IconButton(
                icon: const Icon(Icons.arrow_forward_rounded),
                color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                onPressed: () {},
                tooltip: 'View Full Report',
              ),
            ],
          ),
          const Spacer(),
          Text(
            title,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            description,
            style: TextStyle(
              fontSize: 13,
              color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
            ),
            maxLines: 2,
            overflow: TextOverflow.ellipsis,
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Icon(
                Icons.access_time_rounded,
                size: 14,
                color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
              ),
              const SizedBox(width: 4),
              Text(
                'Generated $lastGenerated',
                style: TextStyle(
                  fontSize: 12,
                  color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                ),
              ),
              const Spacer(),
              Icon(
                trend == 'up' ? Icons.trending_up_rounded : 
                (trend == 'down' ? Icons.trending_down_rounded : Icons.trending_flat_rounded),
                size: 16,
                color: trend == 'up' ? AppColors.success : 
                       (trend == 'down' ? AppColors.error : AppColors.info),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
