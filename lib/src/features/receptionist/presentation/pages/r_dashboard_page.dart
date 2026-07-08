import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/receptionist/data/receptionist_mock_data.dart';
import 'package:luxestay/src/features/receptionist/presentation/widgets/r_stat_card.dart';

class RDashboardPage extends StatelessWidget {
  const RDashboardPage({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final stats = ReceptionistMockData.todayStats;
    final arrivals = ReceptionistMockData.todayArrivals;
    final activity = ReceptionistMockData.recentActivity;
    final receptionist = ReceptionistMockData.currentReceptionist;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBackground : AppColors.backgroundSecondary,
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // ─── WELCOME HEADER ─────────────────────────────────
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: LinearGradient(
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                    colors: isDark
                        ? [const Color(0xFF1A2A1A), const Color(0xFF1E1E1E)]
                        : [const Color(0xFFF0FFD4), const Color(0xFFFFFFFF)],
                  ),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: isDark ? AppColors.darkBorder : AppColors.accent.withValues(alpha: 0.3),
                  ),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        CircleAvatar(
                          radius: 24,
                          backgroundColor: AppColors.accent,
                          child: Text(
                            'HT',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              color: AppColors.textPrimary,
                              fontSize: 16,
                            ),
                          ),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                'Good Morning, ${receptionist['name'].toString().split(' ')[0]}! 👋',
                                style: TextStyle(
                                  fontSize: 20,
                                  fontWeight: FontWeight.bold,
                                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                '${receptionist['hotel']} • ${receptionist['shift']}',
                                style: TextStyle(
                                  fontSize: 13,
                                  color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                                ),
                                maxLines: 1,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                      decoration: BoxDecoration(
                        color: (isDark ? AppColors.darkSurfaceVariant : Colors.white).withValues(alpha: 0.8),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Icon(Icons.calendar_today_rounded, size: 16, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                          const SizedBox(width: 8),
                          Text(
                            'Tuesday, July 8, 2026',
                            style: TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(height: 24),

              // ─── STAT CARDS ─────────────────────────────────────
              LayoutBuilder(
                builder: (context, constraints) {
                  final isMobile = constraints.maxWidth < 500;
                  if (isMobile) {
                    return Column(
                      children: [
                        Row(
                          children: [
                            Expanded(child: RStatCard(title: "Today's Check-ins", value: '${stats['checkIns']}', icon: Icons.login_rounded, color: AppColors.success)),
                            const SizedBox(width: 12),
                            Expanded(child: RStatCard(title: "Today's Check-outs", value: '${stats['checkOuts']}', icon: Icons.logout_rounded, color: AppColors.info)),
                          ],
                        ),
                        const SizedBox(height: 12),
                        Row(
                          children: [
                            Expanded(child: RStatCard(title: 'Occupied', value: '${stats['occupiedRooms']}', icon: Icons.bed_rounded, color: AppColors.warning)),
                            const SizedBox(width: 12),
                            Expanded(child: RStatCard(title: 'Available', value: '${stats['availableRooms']}', icon: Icons.door_front_door_rounded, color: AppColors.accent)),
                          ],
                        ),
                      ],
                    );
                  }
                  return Row(
                    children: [
                      Expanded(child: RStatCard(title: "Today's Check-ins", value: '${stats['checkIns']}', icon: Icons.login_rounded, color: AppColors.success)),
                      const SizedBox(width: 12),
                      Expanded(child: RStatCard(title: "Today's Check-outs", value: '${stats['checkOuts']}', icon: Icons.logout_rounded, color: AppColors.info)),
                      const SizedBox(width: 12),
                      Expanded(child: RStatCard(title: 'Occupied', value: '${stats['occupiedRooms']}', icon: Icons.bed_rounded, color: AppColors.warning)),
                      const SizedBox(width: 12),
                      Expanded(child: RStatCard(title: 'Available', value: '${stats['availableRooms']}', icon: Icons.door_front_door_rounded, color: AppColors.accent)),
                    ],
                  );
                },
              ),

              const SizedBox(height: 28),

              // ─── UPCOMING ARRIVALS ──────────────────────────────
              Text(
                'Upcoming Arrivals',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 12),
              ...arrivals.take(4).map((arrival) => _buildArrivalCard(arrival, isDark)),

              const SizedBox(height: 28),

              // ─── RECENT ACTIVITY ────────────────────────────────
              Text(
                'Recent Activity',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 12),
              Container(
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkCard : AppColors.card,
                  borderRadius: BorderRadius.circular(16),
                  border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
                ),
                child: Column(
                  children: activity.asMap().entries.map((entry) {
                    final item = entry.value;
                    final isLast = entry.key == activity.length - 1;
                    return _buildActivityItem(item, isDark, isLast);
                  }).toList(),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildArrivalCard(Map<String, dynamic> arrival, bool isDark) {
    final isPending = arrival['status'] == 'pending';
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
      ),
      child: Row(
        children: [
          Container(
            width: 48,
            height: 48,
            decoration: BoxDecoration(
              color: (isPending ? AppColors.warning : AppColors.success).withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(12),
            ),
            child: Center(
              child: Text(
                arrival['room'],
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  fontSize: 14,
                  color: isPending ? AppColors.warning : AppColors.success,
                ),
              ),
            ),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  arrival['guest'],
                  style: TextStyle(
                    fontSize: 15,
                    fontWeight: FontWeight.w600,
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  '${arrival['type']} • ${arrival['nights']} nights • ${arrival['source']}',
                  style: TextStyle(
                    fontSize: 12,
                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                arrival['time'],
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w600,
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 4),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                decoration: BoxDecoration(
                  color: (isPending ? AppColors.warning : AppColors.success).withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: Text(
                  isPending ? 'Pending' : 'Confirmed',
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: isPending ? AppColors.warning : AppColors.success,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildActivityItem(Map<String, dynamic> item, bool isDark, bool isLast) {
    IconData icon;
    switch (item['icon']) {
      case 'login':
        icon = Icons.login_rounded;
        break;
      case 'logout':
        icon = Icons.logout_rounded;
        break;
      case 'room_service':
        icon = Icons.room_service_rounded;
        break;
      case 'cleaning':
        icon = Icons.cleaning_services_rounded;
        break;
      case 'build':
        icon = Icons.build_rounded;
        break;
      default:
        icon = Icons.update_rounded;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        border: isLast
            ? null
            : Border(bottom: BorderSide(color: isDark ? AppColors.darkBorder : AppColors.border)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: (isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, size: 18, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  item['action'],
                  style: TextStyle(
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 2),
                Text(
                  item['detail'],
                  style: TextStyle(
                    fontSize: 12,
                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
          Text(
            item['time'],
            style: TextStyle(
              fontSize: 12,
              color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
            ),
          ),
        ],
      ),
    );
  }
}
