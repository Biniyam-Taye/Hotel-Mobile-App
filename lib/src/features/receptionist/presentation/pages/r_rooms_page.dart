import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/receptionist/data/receptionist_mock_data.dart';

class RRoomsPage extends StatefulWidget {
  const RRoomsPage({super.key});

  @override
  State<RRoomsPage> createState() => _RRoomsPageState();
}

class _RRoomsPageState extends State<RRoomsPage> {
  int _selectedFloor = 0; // 0 = All

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final allRooms = ReceptionistMockData.rooms;
    final floors = [0, 1, 2, 3, 4];
    final filteredRooms = _selectedFloor == 0
        ? allRooms
        : allRooms.where((r) => r['floor'] == _selectedFloor).toList();

    // Status counts
    final occupied = allRooms.where((r) => r['status'] == 'occupied').length;
    final available = allRooms.where((r) => r['status'] == 'available').length;
    final maintenance = allRooms.where((r) => r['status'] == 'maintenance').length;
    final reserved = allRooms.where((r) => r['status'] == 'reserved').length;

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
                'Room Status',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                ),
              ),
            ),

            const SizedBox(height: 16),

            // ─── LEGEND ───────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Wrap(
                spacing: 16,
                runSpacing: 8,
                children: [
                  _buildLegend('Occupied ($occupied)', AppColors.info, isDark),
                  _buildLegend('Available ($available)', AppColors.success, isDark),
                  _buildLegend('Reserved ($reserved)', AppColors.warning, isDark),
                  _buildLegend('Maintenance ($maintenance)', AppColors.error, isDark),
                ],
              ),
            ),

            const SizedBox(height: 16),

            // ─── FLOOR FILTER ─────────────────────────────────────
            SizedBox(
              height: 40,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                padding: const EdgeInsets.symmetric(horizontal: 20),
                itemCount: floors.length,
                itemBuilder: (context, index) {
                  final floor = floors[index];
                  final isSelected = floor == _selectedFloor;
                  return Padding(
                    padding: const EdgeInsets.only(right: 8),
                    child: ChoiceChip(
                      label: Text(floor == 0 ? 'All Floors' : 'Floor $floor'),
                      selected: isSelected,
                      onSelected: (_) => setState(() => _selectedFloor = floor),
                      selectedColor: AppColors.accent,
                      labelStyle: TextStyle(
                        fontSize: 13,
                        fontWeight: FontWeight.w600,
                        color: isSelected ? AppColors.textPrimary : null,
                      ),
                      side: BorderSide.none,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                    ),
                  );
                },
              ),
            ),

            const SizedBox(height: 16),

            // ─── ROOMS GRID ───────────────────────────────────────
            Expanded(
              child: LayoutBuilder(
                builder: (context, constraints) {
                  final crossAxisCount = constraints.maxWidth < 400 ? 3 : (constraints.maxWidth < 600 ? 4 : 6);
                  return GridView.builder(
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
                    gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: crossAxisCount,
                      mainAxisSpacing: 12,
                      crossAxisSpacing: 12,
                      childAspectRatio: 0.85,
                    ),
                    itemCount: filteredRooms.length,
                    itemBuilder: (context, index) {
                      final room = filteredRooms[index];
                      return _buildRoomCard(room, isDark);
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLegend(String label, Color color, bool isDark) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            borderRadius: BorderRadius.circular(4),
          ),
        ),
        const SizedBox(width: 6),
        Text(
          label,
          style: TextStyle(
            fontSize: 12,
            color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
          ),
        ),
      ],
    );
  }

  Widget _buildRoomCard(Map<String, dynamic> room, bool isDark) {
    Color statusColor;
    IconData statusIcon;
    switch (room['status']) {
      case 'occupied':
        statusColor = AppColors.info;
        statusIcon = Icons.person_rounded;
        break;
      case 'available':
        statusColor = AppColors.success;
        statusIcon = Icons.check_circle_rounded;
        break;
      case 'reserved':
        statusColor = AppColors.warning;
        statusIcon = Icons.schedule_rounded;
        break;
      case 'maintenance':
        statusColor = AppColors.error;
        statusIcon = Icons.build_rounded;
        break;
      default:
        statusColor = AppColors.textTertiary;
        statusIcon = Icons.help_rounded;
    }

    return GestureDetector(
      onTap: () => _showRoomDetails(room, isDark),
      child: Container(
        decoration: BoxDecoration(
          color: isDark ? AppColors.darkCard : AppColors.card,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: statusColor.withValues(alpha: 0.4),
            width: 1.5,
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: statusColor.withValues(alpha: 0.12),
                shape: BoxShape.circle,
              ),
              child: Icon(statusIcon, size: 20, color: statusColor),
            ),
            const SizedBox(height: 8),
            Text(
              room['number'],
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              room['type'],
              style: TextStyle(
                fontSize: 10,
                color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
              ),
            ),
          ],
        ),
      ),
    );
  }

  void _showRoomDetails(Map<String, dynamic> room, bool isDark) {
    Color statusColor;
    String statusLabel;
    switch (room['status']) {
      case 'occupied':
        statusColor = AppColors.info;
        statusLabel = 'Occupied';
        break;
      case 'available':
        statusColor = AppColors.success;
        statusLabel = 'Available';
        break;
      case 'reserved':
        statusColor = AppColors.warning;
        statusLabel = 'Reserved';
        break;
      case 'maintenance':
        statusColor = AppColors.error;
        statusLabel = 'Under Maintenance';
        break;
      default:
        statusColor = AppColors.textTertiary;
        statusLabel = 'Unknown';
    }

    showModalBottomSheet(
      context: context,
      backgroundColor: isDark ? AppColors.darkCard : AppColors.card,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (context) {
        return Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Center(
                child: Container(
                  width: 40,
                  height: 4,
                  decoration: BoxDecoration(
                    color: isDark ? AppColors.darkBorder : AppColors.border,
                    borderRadius: BorderRadius.circular(2),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Text(
                    'Room ${room['number']}',
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(width: 12),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: statusColor.withValues(alpha: 0.12),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(
                      statusLabel,
                      style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: statusColor),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              _detailRow('Type', room['type'], isDark),
              _detailRow('Floor', '${room['floor']}', isDark),
              if (room['guest'].toString().isNotEmpty)
                _detailRow('Guest', room['guest'], isDark),
              if (room['checkOut'].toString().isNotEmpty)
                _detailRow('Check-out', room['checkOut'], isDark),
              const SizedBox(height: 20),
              if (room['status'] == 'available')
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () => Navigator.pop(context),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.accent,
                      foregroundColor: AppColors.textPrimary,
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: const Text('Assign Room', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ),
              const SizedBox(height: 8),
            ],
          ),
        );
      },
    );
  }

  Widget _detailRow(String label, String value, bool isDark) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: TextStyle(fontSize: 14, color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary)),
          Text(value, style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary)),
        ],
      ),
    );
  }
}
