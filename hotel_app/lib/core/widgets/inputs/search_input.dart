import 'package:flutter/material.dart';
import '../../theme/app_colors.dart';

class SearchInput extends StatelessWidget {
  final String hintText;
  final TextEditingController? controller;
  final ValueChanged<String>? onChanged;
  final VoidCallback? onFilterTap;

  const SearchInput({
    super.key,
    this.hintText = 'Search...',
    this.controller,
    this.onChanged,
    this.onFilterTap,
  });

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      onChanged: onChanged,
      decoration: InputDecoration(
        hintText: hintText,
        prefixIcon: const Icon(Icons.search, color: AppColors.grey400),
        suffixIcon: onFilterTap != null
            ? IconButton(
                icon: const Icon(Icons.tune, color: AppColors.primary),
                onTap: onFilterTap,
              )
            : null,
      ),
    );
  }
}
