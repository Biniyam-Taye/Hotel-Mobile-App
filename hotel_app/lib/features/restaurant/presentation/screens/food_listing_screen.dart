import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../../core/widgets/inputs/search_input.dart';
import '../../data/dummy_food_data.dart';

class FoodListingScreen extends StatefulWidget {
  const FoodListingScreen({super.key});

  @override
  State<FoodListingScreen> createState() => _FoodListingScreenState();
}

class _FoodListingScreenState extends State<FoodListingScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<Map<String, dynamic>> _displayedFood = DummyFoodData.menu;
  String _selectedCategory = 'All';

  final List<String> _categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Drinks'];

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _filterFood(String category) {
    setState(() {
      _selectedCategory = category;
      if (category == 'All') {
        _displayedFood = DummyFoodData.menu;
      } else {
        _displayedFood = DummyFoodData.menu
            .where((food) => food['category'] == category)
            .toList();
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: CustomAppBar(
        title: 'Room Service',
        actions: [
          IconButton(
            icon: const Icon(Icons.shopping_cart_rounded, color: AppColors.primary),
            onPressed: () => context.push('/restaurant/cart'),
          ),
        ],
      ),
      body: Column(
        children: [
          Container(
            padding: const EdgeInsets.symmetric(
              horizontal: AppSpacing.lg,
              vertical: AppSpacing.md,
            ),
            child: SearchInput(
              controller: _searchController,
              hintText: 'Search dishes, drinks...',
              onFilterTap: () {},
            ),
          ),
          // Food-specific category chips
          SizedBox(
            height: 40,
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
              scrollDirection: Axis.horizontal,
              itemCount: _categories.length,
              separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.sm),
              itemBuilder: (context, index) {
                final cat = _categories[index];
                final isSelected = _selectedCategory == cat;
                return GestureDetector(
                  onTap: () => _filterFood(cat),
                  child: AnimatedContainer(
                    duration: const Duration(milliseconds: 200),
                    padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
                    decoration: BoxDecoration(
                      color: isSelected ? AppColors.primary : AppColors.primaryContainer.withValues(alpha: 0.5),
                      borderRadius: AppBorders.circular,
                    ),
                    child: Text(
                      cat,
                      style: TextStyle(
                        fontFamily: 'Nunito',
                        fontWeight: FontWeight.w700,
                        fontSize: 13,
                        color: isSelected ? Colors.white : AppColors.primary,
                      ),
                    ),
                  ),
                );
              },
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          Expanded(
            child: _displayedFood.isEmpty
                ? Center(
                    child: Text(
                      'No items in this category',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: AppColors.grey400,
                          ),
                    ),
                  )
                : GridView.builder(
                    padding: const EdgeInsets.all(AppSpacing.lg),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      crossAxisSpacing: AppSpacing.md,
                      mainAxisSpacing: AppSpacing.md,
                      childAspectRatio: 0.75,
                    ),
                    itemCount: _displayedFood.length,
                    itemBuilder: (context, index) {
                      final food = _displayedFood[index];
                      return _FoodCard(
                        food: food,
                        onTap: () => context.push('/restaurant/${food['id']}'),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

class _FoodCard extends StatelessWidget {
  final Map<String, dynamic> food;
  final VoidCallback onTap;

  const _FoodCard({required this.food, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: Theme.of(context).cardTheme.color,
          borderRadius: AppBorders.medium,
          border: Border.all(
            color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Stack(
                fit: StackFit.expand,
                children: [
                  ClipRRect(
                    borderRadius: const BorderRadius.only(
                      topLeft: Radius.circular(AppBorders.radiusMedium),
                      topRight: Radius.circular(AppBorders.radiusMedium),
                    ),
                    child: Image.network(
                      food['imageUrl'],
                      fit: BoxFit.cover,
                      errorBuilder: (_, __, ___) => Container(
                        color: AppColors.grey100,
                        child: const Icon(Icons.broken_image_rounded, color: AppColors.grey400),
                      ),
                    ),
                  ),
                  if (food['isPopular'] == true)
                    Positioned(
                      top: 8,
                      left: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: AppColors.warning,
                          borderRadius: AppBorders.circular,
                        ),
                        child: const Text(
                          'Popular',
                          style: TextStyle(
                            fontFamily: 'Nunito',
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                            color: Colors.white,
                          ),
                        ),
                      ),
                    ),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(AppSpacing.sm),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    food['title'],
                    style: Theme.of(context).textTheme.titleSmall?.copyWith(
                          fontWeight: FontWeight.w800,
                        ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '\$${food['price'].toInt()}',
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: AppColors.primary,
                              fontWeight: FontWeight.w800,
                            ),
                      ),
                      Row(
                        children: [
                          const Icon(Icons.timer_outlined, size: 12, color: AppColors.grey400),
                          const SizedBox(width: 2),
                          Text(
                            food['prepTime'],
                            style: Theme.of(context).textTheme.labelSmall?.copyWith(
                                  color: AppColors.grey400,
                                ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
