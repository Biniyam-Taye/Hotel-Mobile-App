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
            padding: const EdgeInsets.all(16),
            child: LayoutBuilder(
              builder: (context, constraints) {
                final width = constraints.maxWidth;
                final crossAxisCount = width > 1200 ? 3 : (width > 800 ? 2 : 1);

                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Available Reports',
                          style: TextStyle(
                            fontSize: width > 600 ? 18 : 16,
                            fontWeight: FontWeight.w600,
                            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                          ),
                        ),
                        if (width > 600)
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
                          )
                        else
                          IconButton(
                            onPressed: () {},
                            icon: const Icon(Icons.more_vert_rounded),
                          ),
                      ],
                    ),
                    const SizedBox(height: 24),
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: crossAxisCount,
                        crossAxisSpacing: 16,
                        mainAxisSpacing: 16,
                        mainAxisExtent: 200, // Fixed height to prevent overflow
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
                );
              }
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
      padding: const EdgeInsets.all(20),
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
          const SizedBox(height: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.w600,
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
                const SizedBox(height: 4),
                Text(
                  description,
                  style: TextStyle(
                    fontSize: 12,
                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                  ),
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              Icon(
                Icons.access_time_rounded,
                size: 14,
                color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
              ),
              const SizedBox(width: 4),
              Expanded(
                child: Text(
                  'Gen: $lastGenerated',
                  style: TextStyle(
                    fontSize: 11,
                    color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                  ),
                  maxLines: 1,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
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
