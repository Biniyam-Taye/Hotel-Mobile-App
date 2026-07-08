import 'package:flutter/material.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/features/admin/presentation/widgets/admin_status_badge.dart';

/// Reusable styled DataTable for admin pages.
/// Supports sorting, pagination hint, search bar, and action buttons.
class AdminDataTable extends StatelessWidget {
  final List<String>? columns;
  final List<List<dynamic>>? rows;
  final Widget? customContent;
  final String? searchHint;
  final String? addButtonLabel;
  final VoidCallback? onAdd;
  final List<String>? filterChips;
  final int selectedFilterIndex;
  final ValueChanged<int>? onFilterChanged;

  const AdminDataTable({
    super.key,
    this.columns,
    this.rows,
    this.customContent,
    this.searchHint,
    this.addButtonLabel,
    this.onAdd,
    this.filterChips,
    this.selectedFilterIndex = 0,
    this.onFilterChanged,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    return Container(
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
          // ─── TOOLBAR ──────────────────────────────────────────────
          Padding(
            padding: const EdgeInsets.all(16),
            child: Wrap(
              spacing: 12,
              runSpacing: 12,
              alignment: WrapAlignment.spaceBetween,
              crossAxisAlignment: WrapCrossAlignment.center,
              children: [
                if (searchHint != null)
                  SizedBox(
                    width: 280,
                    height: 40,
                    child: TextField(
                      decoration: InputDecoration(
                        hintText: searchHint,
                        prefixIcon: const Icon(Icons.search_rounded, size: 20),
                        filled: true,
                        fillColor: isDark ? AppColors.darkSurfaceVariant : AppColors.backgroundSecondary,
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: BorderSide.none,
                        ),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 12),
                        hintStyle: TextStyle(
                          fontSize: 13,
                          color: isDark ? AppColors.darkTextTertiary : AppColors.textTertiary,
                        ),
                      ),
                      style: TextStyle(
                        fontSize: 13,
                        color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                      ),
                    ),
                  ),
                if (filterChips != null)
                  Wrap(
                    spacing: 6,
                    children: List.generate(filterChips!.length, (i) {
                      final isSelected = i == selectedFilterIndex;
                      return ChoiceChip(
                        label: Text(filterChips![i]),
                        selected: isSelected,
                        onSelected: (_) => onFilterChanged?.call(i),
                        selectedColor: AppColors.accent,
                        labelStyle: TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w500,
                          color: isSelected ? AppColors.textOnAccent : null,
                        ),
                        visualDensity: VisualDensity.compact,
                        side: BorderSide.none,
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8)),
                      );
                    }),
                  ),
                if (addButtonLabel != null)
                  ElevatedButton.icon(
                    onPressed: onAdd,
                    icon: const Icon(Icons.add_rounded, size: 18),
                    label: Text(addButtonLabel!),
                    style: ElevatedButton.styleFrom(
                      minimumSize: const Size(0, 40),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      textStyle: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600),
                    ),
                  ),
              ],
            ),
          ),

          // ─── TABLE OR CUSTOM CONTENT ──────────────────────────────────────
          if (customContent != null)
            customContent!
          else if (columns != null && rows != null)
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: ConstrainedBox(
                constraints: BoxConstraints(minWidth: MediaQuery.of(context).size.width - 330),
                child: DataTable(
                  headingRowColor: WidgetStateProperty.all(
                    isDark ? AppColors.darkSurfaceVariant.withValues(alpha: 0.5) : AppColors.backgroundSecondary,
                  ),
                  headingTextStyle: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w600,
                    color: isDark ? AppColors.darkTextSecondary : AppColors.textSecondary,
                    letterSpacing: 0.5,
                  ),
                  dataTextStyle: TextStyle(
                    fontSize: 13,
                    color: isDark ? AppColors.darkTextPrimary : AppColors.textPrimary,
                  ),
                  columnSpacing: 24,
                  horizontalMargin: 16,
                  columns: columns!
                      .map((c) => DataColumn(label: Text(c.toUpperCase())))
                      .toList(),
                  rows: rows!.map((row) {
                    return DataRow(
                      cells: row.map((cell) {
                        if (cell is Widget) {
                          return DataCell(cell);
                        }
                        final str = cell.toString();
                        if (_isStatusString(str)) {
                          return DataCell(AdminStatusBadge(status: str));
                        }
                        return DataCell(Text(str));
                      }).toList(),
                    );
                  }).toList(),
                ),
              ),
            ),
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  bool _isStatusString(String s) {
    const statusValues = [
      'active', 'inactive', 'available', 'occupied', 'maintenance',
      'upcoming', 'completed', 'cancelled', 'refunded', 'pending',
      'on duty', 'off duty', 'on leave', 'scheduled', 'expired',
    ];
    return statusValues.contains(s.toLowerCase());
  }
}
