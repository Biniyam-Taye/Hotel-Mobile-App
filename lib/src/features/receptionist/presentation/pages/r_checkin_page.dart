import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/receptionist/data/receptionist_mock_data.dart';

class RCheckinPage extends StatefulWidget {
  const RCheckinPage({super.key});

  @override
  State<RCheckinPage> createState() => _RCheckinPageState();
}

class _RCheckinPageState extends State<RCheckinPage> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Scaffold(
      backgroundColor: isDark ? AppColors.darkBackground : AppColors.backgroundSecondary,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ─── HEADER ───────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
              child: Text(
                'Check-in / Check-out',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
            ),

            const SizedBox(height: 16),

            // ─── TAB BAR ──────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Container(
                height: 48,
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkCard : AppColors.backgroundTertiary,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: TabBar(
                  controller: _tabController,
                  indicator: BoxDecoration(
                    color: AppColors.accent,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  indicatorSize: TabBarIndicatorSize.tab,
                  labelColor: AppColors.textPrimary,
                  unselectedLabelColor: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                  labelStyle: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14),
                  dividerHeight: 0,
                  tabs: [
                    Tab(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.login_rounded, size: 18),
                          const SizedBox(width: 8),
                          Text('Check-In (${ReceptionistMockData.todayArrivals.length})'),
                        ],
                      ),
                    ),
                    Tab(
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          const Icon(Icons.logout_rounded, size: 18),
                          const SizedBox(width: 8),
                          Text('Check-Out (${ReceptionistMockData.todayDepartures.length})'),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 16),

            // ─── TAB CONTENT ──────────────────────────────────────
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildCheckInTab(isDark),
                  _buildCheckOutTab(isDark),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCheckInTab(bool isDark) {
    final arrivals = ReceptionistMockData.todayArrivals;

    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      itemCount: arrivals.length,
      itemBuilder: (context, index) {
        final a = arrivals[index];
        final isPending = a['status'] == 'pending';

        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkCard : AppColors.card,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  // Guest Avatar
                  CircleAvatar(
                    radius: 22,
                    backgroundColor: AppColors.accent.withValues(alpha: 0.2),
                    child: Text(
                      a['guest'].toString().split(' ').map((w) => w[0]).join(),
                      style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: AppColors.textPrimary),
                    ),
                  ),
                  const SizedBox(width: 14),
                  // Guest Info
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          a['guest'],
                          style: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                          ),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          'Room ${a['room']} • ${a['type']} • ${a['nights']} nights',
                          style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                        ),
                      ],
                    ),
                  ),
                  // Status badge
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: (isPending ? AppColors.warning : AppColors.success).withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(8),
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
              const SizedBox(height: 14),
              // Bottom row
              Row(
                children: [
                  Icon(Icons.access_time_rounded, size: 14, color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary),
                  const SizedBox(width: 6),
                  Text(
                    'Expected: ${a['time']}',
                    style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                  ),
                  const SizedBox(width: 16),
                  Icon(Icons.confirmation_number_rounded, size: 14, color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary),
                  const SizedBox(width: 6),
                  Text(
                    a['source'],
                    style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                  ),
                  const Spacer(),
                  SizedBox(
                    height: 36,
                    child: ElevatedButton(
                      onPressed: () {},
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.accent,
                        foregroundColor: AppColors.textPrimary,
                        elevation: 0,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        textStyle: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                      ),
                      child: const Text('Check In'),
                    ),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildCheckOutTab(bool isDark) {
    final departures = ReceptionistMockData.todayDepartures;

    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      itemCount: departures.length,
      itemBuilder: (context, index) {
        final d = departures[index];
        final isCheckedOut = d['status'] == 'checked_out';
        final hasBill = d['status'] == 'pending_bill';

        Color statusColor = AppColors.success;
        String statusLabel = 'Ready';
        if (isCheckedOut) {
          statusColor = AppColors.textTertiary;
          statusLabel = 'Checked Out';
        } else if (hasBill) {
          statusColor = AppColors.warning;
          statusLabel = 'Pending Bill';
        }

        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkCard : AppColors.card,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
            // Muted style for checked out
          ),
          child: Opacity(
            opacity: isCheckedOut ? 0.5 : 1.0,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    CircleAvatar(
                      radius: 22,
                      backgroundColor: statusColor.withValues(alpha: 0.15),
                      child: Text(
                        d['guest'].toString().split(' ').map((w) => w[0]).join(),
                        style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: statusColor),
                      ),
                    ),
                    const SizedBox(width: 14),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            d['guest'],
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                              decoration: isCheckedOut ? TextDecoration.lineThrough : null,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            'Room ${d['room']} • ${d['type']} • ${d['nights']} nights',
                            style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(
                        color: statusColor.withValues(alpha: 0.12),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(statusLabel, style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: statusColor)),
                    ),
                  ],
                ),
                const SizedBox(height: 14),
                Row(
                  children: [
                    Icon(Icons.access_time_rounded, size: 14, color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary),
                    const SizedBox(width: 6),
                    Text('Departure: ${d['time']}', style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary)),
                    if (hasBill) ...[
                      const SizedBox(width: 16),
                      Icon(Icons.receipt_long_rounded, size: 14, color: AppColors.warning),
                      const SizedBox(width: 6),
                      Text('Balance: \$${d['balance']}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.warning)),
                    ],
                    const Spacer(),
                    if (!isCheckedOut)
                      SizedBox(
                        height: 36,
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: hasBill ? AppColors.warning : AppColors.info,
                            foregroundColor: Colors.white,
                            elevation: 0,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                            textStyle: const TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                          ),
                          child: Text(hasBill ? 'Settle Bill' : 'Check Out'),
                        ),
                      ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }
}
