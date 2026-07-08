import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/stat_card.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_chart_card.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_section_header.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';

class DashboardPage extends StatelessWidget {
  const DashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const AdminAppBar(title: 'Dashboard Overview'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // KPIs
                GridView.count(
                  crossAxisCount: MediaQuery.of(context).size.width > 1200 ? 4 : 2,
                  crossAxisSpacing: 24,
                  mainAxisSpacing: 24,
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  childAspectRatio: 2.5,
                  children: const [
                    StatCard(
                      icon: Icons.attach_money_rounded,
                      title: 'Total Revenue',
                      value: '\$284,750',
                      trendPercentage: 12.5,
                    ),
                    StatCard(
                      icon: Icons.book_online_rounded,
                      title: 'Total Bookings',
                      value: '1,247',
                      trendPercentage: 8.3,
                      iconColor: AppColors.info,
                      iconBgColor: AppColors.info,
                    ),
                    StatCard(
                      icon: Icons.bed_rounded,
                      title: 'Occupancy Rate',
                      value: '78.4%',
                      trendPercentage: -2.1,
                      iconColor: AppColors.warning,
                      iconBgColor: AppColors.warning,
                    ),
                    StatCard(
                      icon: Icons.star_rounded,
                      title: 'Average Rating',
                      value: '4.7',
                      trendPercentage: 0.3,
                      iconColor: AppColors.success,
                      iconBgColor: AppColors.success,
                    ),
                  ],
                ),
                
                const SizedBox(height: 32),
                
                // Charts Row
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      flex: 2,
                      child: AdminChartCard(
                        title: 'Revenue Overview',
                        subtitle: 'Monthly revenue performance across all properties',
                        periods: const ['This Year', 'Last Year'],
                        chart: LineChart(
                          LineChartData(
                            gridData: FlGridData(show: false),
                            titlesData: FlTitlesData(
                              leftTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                              rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                              topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                              bottomTitles: AxisTitles(
                                sideTitles: SideTitles(
                                  showTitles: true,
                                  getTitlesWidget: (value, meta) {
                                    if (value.toInt() >= 0 && value.toInt() < AdminMockData.monthlyRevenue.length) {
                                      return Padding(
                                        padding: const EdgeInsets.only(top: 8.0),
                                        child: Text(
                                          AdminMockData.monthlyRevenue[value.toInt()]['month'],
                                          style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
                                        ),
                                      );
                                    }
                                    return const Text('');
                                  },
                                ),
                              ),
                            ),
                            borderData: FlBorderData(show: false),
                            lineBarsData: [
                              LineChartBarData(
                                spots: AdminMockData.monthlyRevenue.asMap().entries.map((e) {
                                  return FlSpot(e.key.toDouble(), (e.value['revenue'] as num).toDouble());
                                }).toList(),
                                isCurved: true,
                                color: AppColors.accent,
                                barWidth: 4,
                                isStrokeCapRound: true,
                                dotData: FlDotData(show: false),
                                belowBarData: BarAreaData(
                                  show: true,
                                  color: AppColors.accent.withValues(alpha: 0.2),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(width: 24),
                    Expanded(
                      flex: 1,
                      child: AdminChartCard(
                        title: 'Room Availability',
                        subtitle: 'Current status across all rooms',
                        chart: PieChart(
                          PieChartData(
                            sectionsSpace: 2,
                            centerSpaceRadius: 60,
                            sections: [
                              PieChartSectionData(
                                color: AppColors.success,
                                value: 45,
                                title: 'Available\n45%',
                                radius: 40,
                                titleStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                              PieChartSectionData(
                                color: AppColors.error,
                                value: 50,
                                title: 'Occupied\n50%',
                                radius: 40,
                                titleStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                              PieChartSectionData(
                                color: AppColors.warning,
                                value: 5,
                                title: 'Maint.\n5%',
                                radius: 40,
                                titleStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.white),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                
                const SizedBox(height: 32),
                
                // Recent Bookings Table
                const AdminSectionHeader(
                  title: 'Recent Bookings',
                  actionLabel: 'View All',
                ),
                
                AdminDataTable(
                  columns: const ['ID', 'Guest', 'Hotel', 'Room', 'Amount', 'Status'],
                  rows: AdminMockData.bookings.take(5).map((b) => [
                    b['id'],
                    b['guest'],
                    b['hotel'],
                    b['room'],
                    '\$${(b['amount'] as num).toStringAsFixed(2)}',
                    b['status'],
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
