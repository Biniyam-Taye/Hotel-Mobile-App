import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../../core/widgets/inputs/search_input.dart';
import '../../../home/presentation/widgets/category_chips_list.dart';
import '../../data/dummy_food_data.dart';

class FoodListingScreen extends StatefulWidget {
  const FoodListingScreen({super.key});

  @override
  State<FoodListingScreen> createState() => _FoodListingScreenState();
}

class _FoodListingScreenState extends State<FoodListingScreen> {
  final TextEditingController _searchController = TextEditingController();
  List<Map<String, dynamic>> _displayedFood = DummyFoodData.menu;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _filterFood(String category) {
    if (category == 'All' || category == 'Restaurant') {
      setState(() {
        _displayedFood = DummyFoodData.menu;
      });
    } else {
      setState(() {
        _displayedFood = DummyFoodData.menu
            .where((food) => food['category'] == category)
            .toList();
      });
    }
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
            onPressed: () {
              context.push('/restaurant/cart');
            },
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
          CategoryChipsList(
            onCategorySelected: _filterFood,
          ),
          const SizedBox(height: AppSpacing.md),
          Expanded(
            child: GridView.builder(
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
                  onTap: () {
                    context.push('/restaurant/${food['id']}');
                  },
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
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(AppBorders.radiusMedium),
                    topRight: Radius.circular(AppBorders.radiusMedium),
                  ),
                  image: DecorationImage(
                    image: NetworkImage(food['imageUrl']),
                    fit: BoxFit.cover,
                  ),
                ),
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
