import 'package:flutter/material.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/widgets/buttons/primary_button.dart';
import '../../../../core/widgets/buttons/secondary_button.dart';
import '../../../../core/widgets/cards/premium_card.dart';
import '../../../../core/widgets/chips/filter_chip_widget.dart';
import '../../../../core/widgets/feedback/empty_state.dart';
import '../../../../core/widgets/feedback/loading_indicator.dart';
import '../../../../core/widgets/inputs/search_input.dart';
import '../../../../core/widgets/inputs/standard_text_field.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../../core/widgets/navigation/custom_bottom_nav_bar.dart';

class ShowcaseScreen extends StatefulWidget {
  const ShowcaseScreen({super.key});

  @override
  State<ShowcaseScreen> createState() => _ShowcaseScreenState();
}

class _ShowcaseScreenState extends State<ShowcaseScreen> {
  int _navIndex = 0;
  bool _filterSelected1 = true;
  bool _filterSelected2 = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(
        title: 'Design Showcase',
        actions: [
          IconButton(
            icon: const Icon(Icons.nights_stay),
            onPressed: () {
              // Theme toggle to be implemented by Riverpod later
            },
          )
        ],
      ),
      body: SingleChildScrollView(
        padding: AppSpacing.pagePadding,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionHeader('Typography'),
            Text('Display Large', style: Theme.of(context).textTheme.displayLarge),
            Text('Headline Medium', style: Theme.of(context).textTheme.headlineMedium),
            Text('Title Large', style: Theme.of(context).textTheme.titleLarge),
            Text('Body Medium (Secondary)', style: Theme.of(context).textTheme.bodyMedium),
            
            _buildSectionHeader('Buttons'),
            Row(
              children: [
                Expanded(child: PrimaryButton(text: 'Primary', onPressed: () {})),
                const SizedBox(width: AppSpacing.sm),
                Expanded(child: SecondaryButton(text: 'Secondary', onPressed: () {})),
              ],
            ),
            const SizedBox(height: AppSpacing.sm),
            PrimaryButton(
              text: 'With Icon',
              icon: const Icon(Icons.bookmark_outline, color: Colors.white),
              onPressed: () {},
            ),
            
            _buildSectionHeader('Inputs'),
            const SearchInput(hintText: 'Search destinations...'),
            const SizedBox(height: AppSpacing.md),
            const StandardTextField(
              label: 'Email Address',
              hintText: 'Enter your email',
            ),

            _buildSectionHeader('Chips'),
            Wrap(
              spacing: 8.0,
              children: [
                FilterChipWidget(
                  label: 'Hotels',
                  isSelected: _filterSelected1,
                  onSelected: (val) => setState(() => _filterSelected1 = val),
                ),
                FilterChipWidget(
                  label: 'Flights',
                  isSelected: _filterSelected2,
                  onSelected: (val) => setState(() => _filterSelected2 = val),
                ),
              ],
            ),

            _buildSectionHeader('Cards'),
            PremiumCard(
              onTap: () {},
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    height: 150,
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: AppColors.grey300,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.image, size: 50, color: AppColors.grey400),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  Text('Grand Plaza Hotel', style: Theme.of(context).textTheme.titleLarge),
                  const SizedBox(height: AppSpacing.xxs),
                  Text('New York City, USA', style: Theme.of(context).textTheme.bodyMedium),
                  const SizedBox(height: AppSpacing.md),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Text(
                        '\$240 / night',
                        style: Theme.of(context).textTheme.titleMedium?.copyWith(color: AppColors.primary),
                      ),
                      const Icon(Icons.bookmark_outline),
                    ],
                  )
                ],
              ),
            ),
            
            _buildSectionHeader('Feedback'),
            const LoadingIndicator(),
            const SizedBox(height: AppSpacing.md),
            const SkeletonLoader(width: double.infinity, height: 100),
            const SizedBox(height: AppSpacing.md),
            const EmptyStateWidget(
              icon: Icons.search_off,
              title: 'No results found',
              description: 'Try adjusting your search filters.',
              actionLabel: 'Clear Filters',
              onActionTap: null,
            ),
            
            const SizedBox(height: 100), // padding for bottom nav
          ],
        ),
      ),
      bottomNavigationBar: CustomBottomNavBar(
        currentIndex: _navIndex,
        onTap: (index) {
          setState(() {
            _navIndex = index;
          });
        },
      ),
    );
  }

  Widget _buildSectionHeader(String title) {
    return Padding(
      padding: const EdgeInsets.only(top: AppSpacing.xl, bottom: AppSpacing.md),
      child: Text(
        title,
        style: Theme.of(context).textTheme.titleLarge?.copyWith(
              color: AppColors.primary,
              fontWeight: FontWeight.bold,
            ),
      ),
    );
  }
}
