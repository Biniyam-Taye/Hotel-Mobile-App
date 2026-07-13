import 'package:flutter/material.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/widgets/chips/filter_chip_widget.dart';

class CategoryChipsList extends StatefulWidget {
  final ValueChanged<String>? onCategorySelected;

  const CategoryChipsList({
    super.key,
    this.onCategorySelected,
  });

  @override
  State<CategoryChipsList> createState() => _CategoryChipsListState();
}

class _CategoryChipsListState extends State<CategoryChipsList> {
  final List<String> _categories = [
    'Rooms',
    'Hospitality',
    'Restaurant',
    'Offers',
  ];
  
  String _selectedCategory = 'Rooms';

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 40,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
        scrollDirection: Axis.horizontal,
        itemCount: _categories.length,
        separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.sm),
        itemBuilder: (context, index) {
          final category = _categories[index];
          return FilterChipWidget(
            label: category,
            isSelected: _selectedCategory == category,
            onSelected: (selected) {
              if (selected) {
                setState(() {
                  _selectedCategory = category;
                });
                if (widget.onCategorySelected != null) {
                  widget.onCategorySelected!(category);
                }
              }
            },
          );
        },
      ),
    );
  }
}
