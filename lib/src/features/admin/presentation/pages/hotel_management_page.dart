import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/data/admin_mock_data.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_app_bar.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_data_table.dart';

class HotelManagementPage extends StatefulWidget {
  const HotelManagementPage({super.key});

  @override
  State<HotelManagementPage> createState() => _HotelManagementPageState();
}

class _HotelManagementPageState extends State<HotelManagementPage> {
  int _filterIndex = 0;

  Widget _buildActiveView(bool isDark) {
    final activeHotels = AdminMockData.hotels
        .where((h) => h['status'].toString().toLowerCase() == 'active')
        .toList();

    return GridView.builder(
      padding: const EdgeInsets.all(16),
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 400,
        mainAxisSpacing: 16,
        crossAxisSpacing: 16,
        mainAxisExtent: 200,
      ),
      itemCount: activeHotels.length,
      itemBuilder: (context, index) {
        final hotel = activeHotels[index];
        return Container(
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.border),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(10),
                        decoration: BoxDecoration(
                          color: AppColors.success.withValues(alpha: 0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Icon(Icons.hotel_rounded, color: AppColors.success, size: 24),
                      ),
                      const SizedBox(width: 12),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            hotel['name'],
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.bold,
                              color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                            ),
                          ),
                          Text(
                            hotel['location'],
                            style: TextStyle(
                              fontSize: 12,
                              color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                  const Icon(Icons.more_vert_rounded, size: 20),
                ],
              ),
              const Spacer(),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  _buildStat(Icons.meeting_room_rounded, '${hotel['rooms']} Rooms', isDark),
                  _buildStat(Icons.star_rounded, '${hotel['rating']}', isDark),
                ],
              ),
              const SizedBox(height: 16),
              Text(
                'Occupancy Rate',
                style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  Expanded(
                    child: ClipRRect(
                      borderRadius: BorderRadius.circular(4),
                      child: LinearProgressIndicator(
                        value: (hotel['occupancy'] as num) / 100,
                        backgroundColor: (isDark ? AppColors.darkBorder : AppColors.border).withValues(alpha: 0.5),
                        valueColor: const AlwaysStoppedAnimation<Color>(AppColors.accent),
                        minHeight: 8,
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Text(
                    '${hotel['occupancy']}%',
                    style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12, color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                  ),
                ],
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildMaintenanceView(bool isDark) {
    final maintenanceHotels = AdminMockData.hotels
        .where((h) => h['status'].toString().toLowerCase() == 'maintenance')
        .toList();

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      itemCount: maintenanceHotels.isEmpty ? 1 : maintenanceHotels.length * 2,
      itemBuilder: (context, index) {
        if (maintenanceHotels.isEmpty) {
          return const Padding(
            padding: EdgeInsets.all(24.0),
            child: Center(child: Text('No hotels under maintenance.')),
          );
        }
        
        final isEmergency = index % 2 == 0;
        final hotel = maintenanceHotels[index % maintenanceHotels.length];
        
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
            borderRadius: BorderRadius.circular(12),
            border: Border(left: BorderSide(color: isEmergency ? AppColors.error : AppColors.warning, width: 4)),
          ),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: (isEmergency ? AppColors.error : AppColors.warning).withValues(alpha: 0.1),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  isEmergency ? Icons.build_rounded : Icons.cleaning_services_rounded,
                  color: isEmergency ? AppColors.error : AppColors.warning,
                  size: 20,
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      isEmergency ? 'HVAC System Repair - ${hotel['name']}' : 'Deep Cleaning - ${hotel['name']}',
                      style: TextStyle(fontWeight: FontWeight.bold, color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Reported: 2 days ago • Expected Completion: Tomorrow',
                      style: TextStyle(fontSize: 12, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
                    ),
                  ],
                ),
              ),
              ElevatedButton(
                onPressed: () {},
                style: ElevatedButton.styleFrom(
                  backgroundColor: isDark ? AppColors.darkCard : AppColors.card,
                  foregroundColor: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  elevation: 0,
                  side: BorderSide(color: isDark ? AppColors.darkBorder : AppColors.border),
                ),
                child: const Text('View Ticket'),
              ),
            ],
          ),
        );
      },
    );
  }

  Widget _buildStat(IconData icon, String label, bool isDark) {
    return Row(
      children: [
        Icon(icon, size: 16, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
        const SizedBox(width: 6),
        Text(
          label,
          style: TextStyle(fontSize: 13, fontWeight: FontWeight.w500, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary),
        ),
      ],
    );
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Column(
      children: [
        const AdminAppBar(title: 'Hotel Management'),
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                AdminDataTable(
                  searchHint: 'Search hotels by name or location...',
                  addButtonLabel: 'Add Hotel',
                  filterChips: const ['All', 'Active', 'Maintenance'],
                  selectedFilterIndex: _filterIndex,
                  onFilterChanged: (index) {
                    setState(() {
                      _filterIndex = index;
                    });
                  },
                  customContent: _filterIndex == 1 
                      ? _buildActiveView(isDark)
                      : (_filterIndex == 2 ? _buildMaintenanceView(isDark) : null),
                  columns: _filterIndex == 0 ? const ['Name', 'Location', 'Rooms', 'Occupancy', 'Rating', 'Status', 'Actions'] : null,
                  rows: _filterIndex == 0 ? AdminMockData.hotels.map((h) => [
                    h['name'],
                    h['location'],
                    h['rooms'].toString(),
                    '${h['occupancy']}%',
                    '⭐ ${h['rating']}',
                    h['status'],
                    Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.edit_rounded, size: 18),
                          onPressed: () {},
                          tooltip: 'Edit',
                        ),
                        IconButton(
                          icon: const Icon(Icons.delete_rounded, size: 18, color: Colors.red),
                          onPressed: () {},
                          tooltip: 'Delete',
                        ),
                      ],
                    ),
                  ]).toList() : null,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

