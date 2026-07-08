import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/stat_card.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_chart_card.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_section_header.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';
import 'package:intl/intl.dart';

class RevenuePage extends StatelessWidget {
  const RevenuePage({super.key});

  @override
  Widget build(BuildContext context) {
    final dateFormat = DateFormat('MMM dd, yyyy');
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        const AdminAppBar(title: 'Revenue & Payments'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(16),
            child: LayoutBuilder(
              builder: (context, constraints) {
                final isMobile = constraints.maxWidth < 600;
                final isTablet = constraints.maxWidth < 1000;
                
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    // KPIs
                    GridView.builder(
                      shrinkWrap: true,
                      physics: const NeverScrollableScrollPhysics(),
                      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: isMobile ? 1 : (isTablet ? 2 : 4),
                        crossAxisSpacing: 16,
                        mainAxisSpacing: 16,
                        mainAxisExtent: 180, // Updated height to guarantee no overflow
                      ),
                      itemCount: 4,
                      itemBuilder: (context, index) {
                        final cards = [
                          const StatCard(
                            icon: Icons.account_balance_wallet_rounded,
                            title: 'Total Revenue',
                            value: '\$284,750',
                            trendPercentage: 12.5,
                          ),
                          const StatCard(
                            icon: Icons.receipt_long_rounded,
                            title: 'Avg Transaction',
                            value: '\$845',
                            trendPercentage: 4.2,
                            iconColor: AppColors.info,
                            iconBgColor: AppColors.info,
                          ),
                          const StatCard(
                            icon: Icons.pending_actions_rounded,
                            title: 'Pending Payments',
                            value: '\$12,450',
                            trendPercentage: -5.4,
                            iconColor: AppColors.warning,
                            iconBgColor: AppColors.warning,
                          ),
                          const StatCard(
                            icon: Icons.money_off_rounded,
                            title: 'Refunds',
                            value: '\$2,140',
                            trendPercentage: -1.2,
                            iconColor: AppColors.error,
                            iconBgColor: AppColors.error,
                          ),
                        ];
                        return cards[index];
                      },
                    ),
                    
                    const SizedBox(height: 32),
                    
                    // Charts Row/Column
                    if (isTablet)
                      Column(
                        children: [
                          _buildRevenueSourceChart(isDark),
                          const SizedBox(height: 24),
                          _buildPaymentMethodsChart(),
                        ],
                      )
                    else
                      Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            flex: 2,
                            child: _buildRevenueSourceChart(isDark),
                          ),
                          const SizedBox(width: 24),
                          Expanded(
                            flex: 1,
                            child: _buildPaymentMethodsChart(),
                          ),
                        ],
                      ),
                    
                    const SizedBox(height: 32),
                    
                    // Transactions Table
                    const AdminSectionHeader(
                      title: 'Recent Transactions',
                      actionLabel: 'Export CSV',
                      actionIcon: Icons.download_rounded,
                    ),
                    
                    AdminDataTable(
                      searchHint: 'Search transactions by ID or guest...',
                      filterChips: const ['All', 'Completed', 'Pending', 'Refunded'],
                      columns: const ['ID', 'Description', 'Guest', 'Date', 'Method', 'Amount', 'Status', 'Actions'],
                      rows: AdminMockData.transactions.map((t) => [
                        t['id'],
                        t['description'],
                        t['guest'],
                        dateFormat.format(t['date']),
                        t['method'],
                        '\$${(t['amount'] as num).toStringAsFixed(2)}',
                        t['status'],
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            IconButton(
                              icon: const Icon(Icons.receipt_rounded, size: 18),
                              onPressed: () {},
                              tooltip: 'View Receipt',
                            ),
                            if (t['status'] == 'Completed')
                              IconButton(
                                icon: const Icon(Icons.money_off_rounded, size: 18),
                                onPressed: () {},
                                tooltip: 'Issue Refund',
                              ),
                          ],
                        ),
                      ]).toList(),
                    ),
                  ],
                );
              },
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildRevenueSourceChart(bool isDark) {
    return AdminChartCard(
      title: 'Revenue by Source',
      subtitle: 'Breakdown of revenue streams',
      height: 300,
      chart: BarChart(
        BarChartData(
          alignment: BarChartAlignment.spaceAround,
          maxY: 200000,
          barTouchData: BarTouchData(enabled: true),
          titlesData: FlTitlesData(
            show: true,
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, meta) {
                  if (value.toInt() >= 0 && value.toInt() < AdminMockData.revenueSources.length) {
                    return Padding(
                      padding: const EdgeInsets.only(top: 8.0),
                      child: Text(
                        AdminMockData.revenueSources[value.toInt()]['source'].toString().split(' ').first,
                        style: const TextStyle(fontSize: 10),
                      ),
                    );
                  }
                  return const Text('');
                },
              ),
            ),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                reservedSize: 40,
                getTitlesWidget: (value, meta) {
                  if (value == 0) return const Text('');
                  return Text(
                    '${(value / 1000).toInt()}k',
                    style: const TextStyle(fontSize: 10),
                  );
                },
              ),
            ),
            topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
            rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
          ),
          gridData: FlGridData(
            show: true,
            drawVerticalLine: false,
            horizontalInterval: 50000,
            getDrawingHorizontalLine: (value) => FlLine(
              color: isDark ? AppColors.darkDivider : AppColors.divider,
              strokeWidth: 1,
            ),
          ),
          borderData: FlBorderData(show: false),
          barGroups: AdminMockData.revenueSources.asMap().entries.map((e) {
            return BarChartGroupData(
              x: e.key,
              barRods: [
                BarChartRodData(
                  toY: (e.value['amount'] as num).toDouble(),
                  color: AppColors.accent,
                  width: 22,
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(6)),
                ),
              ],
            );
          }).toList(),
        ),
      ),
    );
  }

  Widget _buildPaymentMethodsChart() {
    return AdminChartCard(
      title: 'Payment Methods',
      subtitle: 'Distribution of payment types',
      height: 300,
      chart: PieChart(
        PieChartData(
          sectionsSpace: 2,
          centerSpaceRadius: 40,
          sections: AdminMockData.paymentMethods.map((m) {
            Color color;
            switch (m['method']) {
              case 'Visa': color = const Color(0xFF1A1F71); break;
              case 'Mastercard': color = const Color(0xFFEB001B); break;
              case 'TeleBirr': color = const Color(0xFF8DC63F); break;
              case 'CBE': color = const Color(0xFF4B2E83); break;
              default: color = AppColors.textTertiary;
            }
            return PieChartSectionData(
              color: color,
              value: (m['percentage'] as num).toDouble(),
              title: '${m['percentage']}%',
              radius: 50,
              titleStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
            );
          }).toList(),
        ),
      ),
    );
  }
}
