import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../../core/widgets/inputs/search_input.dart';
import '../../../../core/widgets/animations/bouncing_wrapper.dart';
import '../../providers/restaurant_provider.dart';
import '../../domain/food_item_model.dart';
import '../../domain/food_category_model.dart';

class FoodListingScreen extends ConsumerStatefulWidget {
  const FoodListingScreen({super.key});

  @override
  ConsumerState<FoodListingScreen> createState() => _FoodListingScreenState();
}

class _FoodListingScreenState extends ConsumerState<FoodListingScreen> {
  final TextEditingController _searchController = TextEditingController();
  FoodCategory? _selectedCategory;
  String _searchQuery = '';

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _filterFood(FoodCategory? category) {
    setState(() {
      _selectedCategory = category;
    });
  }

  void _onSearch() {
    setState(() {
      _searchQuery = _searchController.text.trim();
    });
  }

  @override
  Widget build(BuildContext context) {
    final categoriesAsync = ref.watch(foodCategoriesProvider);
    final foodItemsAsync = ref.watch(foodItemsProvider(
      categoryId: _selectedCategory?.id,
      search: _searchQuery,
    ));

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: CustomAppBar(
        title: 'Restaurant',
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
              onSubmitted: (_) => _onSearch(),
              onFilterTap: () {},
            ),
          ),
          // Food-specific category chips
          SizedBox(
            height: 40,
            child: categoriesAsync.when(
              data: (categories) {
                // Add 'All' category option
                final List<FoodCategory?> allCats = [null, ...categories];
                return ListView.separated(
                  padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
                  scrollDirection: Axis.horizontal,
                  itemCount: allCats.length,
                  separatorBuilder: (context, index) => const SizedBox(width: AppSpacing.sm),
                  itemBuilder: (context, index) {
                    final cat = allCats[index];
                    final isSelected = _selectedCategory?.id == cat?.id;
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
                          cat?.name ?? 'All',
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
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) => Center(child: Text('Error: $error')),
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          Expanded(
            child: foodItemsAsync.when(
              data: (foodItems) {
                if (foodItems.isEmpty) {
                  return Center(
                    child: Text(
                      'No items found',
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                            color: AppColors.grey400,
                          ),
                    ),
                  );
                }
                return GridView.builder(
                  padding: const EdgeInsets.all(AppSpacing.lg),
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: AppSpacing.md,
                    mainAxisSpacing: AppSpacing.md,
                    childAspectRatio: 0.75,
                  ),
                  itemCount: foodItems.length,
                  itemBuilder: (context, index) {
                    final food = foodItems[index];
                    return _FoodCard(
                      food: food,
                      onTap: () => context.push('/restaurant/${food.id}'),
                    ).animate(delay: (index * 50).ms).fade(duration: 300.ms).slideY(begin: 0.1, curve: Curves.easeOutQuart);
                  },
                );
              },
              loading: () => const Center(child: CircularProgressIndicator()),
              error: (error, stack) => Center(child: Text('Error: $error')),
            ),
          ),
        ],
      ),
    );
  }
}

class _FoodCard extends StatelessWidget {
  final FoodItem food;
  final VoidCallback onTap;

  const _FoodCard({required this.food, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return BouncingWrapper(
      child: GestureDetector(
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
                  Hero(
                    tag: 'food_image_${food.id}',
                    child: ClipRRect(
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(AppBorders.radiusMedium),
                        topRight: Radius.circular(AppBorders.radiusMedium),
                      ),
                      child: Image.network(
                        food.image,
                        fit: BoxFit.cover,
                        errorBuilder: (context, error, stackTrace) => Container(
                          color: AppColors.grey100,
                          child: const Icon(Icons.broken_image_rounded, color: AppColors.grey400),
                        ),
                      ),
                    ),
                  ),
                  if (food.tags.contains('popular') || food.tags.contains('bestseller'))
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
                    food.name,
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
                        '\$${food.price.toInt()}',
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
                            '${food.preparationTime} min',
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
    ));
  }
}
