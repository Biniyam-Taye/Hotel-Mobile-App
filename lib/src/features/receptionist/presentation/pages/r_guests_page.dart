import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/receptionist/data/receptionist_mock_data.dart';

class RGuestsPage extends StatefulWidget {
  const RGuestsPage({super.key});

  @override
  State<RGuestsPage> createState() => _RGuestsPageState();
}

class _RGuestsPageState extends State<RGuestsPage> {
  int _selectedFilter = 0; // 0 = All, 1 = Pending, 2 = In Progress, 3 = Completed

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final allRequests = ReceptionistMockData.serviceRequests;
    
    List<Map<String, dynamic>> filteredRequests = allRequests;
    if (_selectedFilter == 1) {
      filteredRequests = allRequests.where((r) => r['status'] == 'pending').toList();
    } else if (_selectedFilter == 2) {
      filteredRequests = allRequests.where((r) => r['status'] == 'in_progress').toList();
    } else if (_selectedFilter == 3) {
      filteredRequests = allRequests.where((r) => r['status'] == 'completed').toList();
    }

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
                'Guest Services',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
            ),

            const SizedBox(height: 16),

            // ─── FILTERS ──────────────────────────────────────────
            SizedBox(
              height: 40,
              child: ListView(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                children: [
                  _buildFilterChip('All Requests', 0, isDark),
                  const SizedBox(width: 8),
                  _buildFilterChip('Pending', 1, isDark),
                  const SizedBox(width: 8),
                  _buildFilterChip('In Progress', 2, isDark),
                  const SizedBox(width: 8),
                  _buildFilterChip('Completed', 3, isDark),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // ─── REQUESTS LIST ────────────────────────────────────
            Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                itemCount: filteredRequests.length,
                itemBuilder: (context, index) {
                  final request = filteredRequests[index];
                  return _buildRequestCard(request, isDark);
                },
              ),
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {},
        backgroundColor: AppColors.accent,
        foregroundColor: AppColors.textPrimary,
        child: const Icon(Icons.add_rounded),
      ),
    );
  }

  Widget _buildFilterChip(String label, int index, bool isDark) {
    final isSelected = _selectedFilter == index;
    return ChoiceChip(
      label: Text(label),
      selected: isSelected,
      onSelected: (_) => setState(() => _selectedFilter = index),
      selectedColor: AppColors.accent,
      labelStyle: TextStyle(
        fontSize: 13,
        fontWeight: FontWeight.w600,
        color: isSelected ? AppColors.textPrimary : null,
      ),
      side: BorderSide.none,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
    );
  }

  Widget _buildRequestCard(Map<String, dynamic> request, bool isDark) {
    Color statusColor;
    String statusLabel;
    switch (request['status']) {
      case 'pending':
        statusColor = AppColors.warning;
        statusLabel = 'Pending';
        break;
      case 'in_progress':
        statusColor = AppColors.info;
        statusLabel = 'In Progress';
        break;
      case 'completed':
        statusColor = AppColors.success;
        statusLabel = 'Completed';
        break;
      default:
        statusColor = AppColors.textTertiary;
        statusLabel = 'Unknown';
    }

    final isUrgent = request['priority'] == 'urgent';

    IconData typeIcon;
    switch (request['type']) {
      case 'Room Service':
        typeIcon = Icons.room_service_rounded;
        break;
      case 'Housekeeping':
        typeIcon = Icons.cleaning_services_rounded;
        break;
      case 'Wake-up Call':
        typeIcon = Icons.alarm_rounded;
        break;
      case 'Maintenance':
        typeIcon = Icons.build_rounded;
        break;
      default:
        typeIcon = Icons.support_agent_rounded;
    }

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCard : AppColors.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: isUrgent ? AppColors.error : (isDark ? AppColors.darkBorder : AppColors.border),
          width: isUrgent ? 1.5 : 1.0,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(typeIcon, size: 20, color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      request['type'],
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 2),
                    Text(
                      '${request['guest']} • Room ${request['room']}',
                      style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: statusColor.withValues(alpha: 0.12),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  statusLabel,
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: statusColor),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            request['description'],
            style: TextStyle(fontSize: 14, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
          ),
          const SizedBox(height: 14),
          Row(
            children: [
              Icon(Icons.access_time_rounded, size: 14, color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary),
              const SizedBox(width: 6),
              Text(
                request['time'],
                style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary),
              ),
              if (isUrgent) ...[
                const SizedBox(width: 12),
                Icon(Icons.warning_rounded, size: 14, color: AppColors.error),
                const SizedBox(width: 4),
                const Text(
                  'Urgent',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.error),
                ),
              ],
              const Spacer(),
              if (request['status'] != 'completed')
                SizedBox(
                  height: 32,
                  child: OutlinedButton(
                    onPressed: () {},
                    style: OutlinedButton.styleFrom(
                      side: BorderSide(color: isDark ? AppColors.darkBorder : AppColors.border),
                      foregroundColor: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      padding: const EdgeInsets.symmetric(horizontal: 12),
                    ),
                    child: Text(
                      request['status'] == 'pending' ? 'Start Task' : 'Complete',
                      style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                    ),
                  ),
                ),
            ],
          ),
        ],
      ),
    );
  }
}
