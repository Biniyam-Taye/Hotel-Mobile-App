import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../../core/theme/app_colors.dart';
import '../providers/offer_provider.dart';
import 'package:intl/intl.dart';

class OffersListingScreen extends ConsumerWidget {
  const OffersListingScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final offersAsync = ref.watch(offersProvider);

    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Exclusive Offers'),
      body: offersAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.error_outline, size: 48, color: AppColors.error),
              const SizedBox(height: AppSpacing.md),
              Text('Failed to load offers', style: Theme.of(context).textTheme.titleMedium),
              TextButton(
                onPressed: () => ref.invalidate(offersProvider),
                child: const Text('Retry'),
              ),
            ],
          ),
        ),
        data: (offers) {
          if (offers.isEmpty) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Icon(Icons.local_offer_outlined, size: 72, color: AppColors.grey300),
                  const SizedBox(height: AppSpacing.lg),
                  Text(
                    'No offers available',
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.w700),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Text(
                    'Check back later for new promotions.',
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.grey400),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(offersProvider),
            child: ListView.separated(
              padding: const EdgeInsets.fromLTRB(AppSpacing.lg, AppSpacing.md, AppSpacing.lg, 32),
              itemCount: offers.length,
              separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.xl),
              itemBuilder: (context, index) {
                final offer = offers[index];
                
                // Map the backend model to the UI expectations
                final offerMap = {
                  'title': offer.title,
                  'subtitle': offer.description,
                  'imageUrl': offer.image,
                  'discount': offer.discountPercentage != null ? '${offer.discountPercentage!.toInt()}% OFF' : 'SPECIAL',
                  'category': 'OFFER',
                  'expires': DateFormat('MMM dd, yyyy').format(offer.validUntil),
                  'colorStart': 0xFF1E88E5, // Default blue gradient
                  'colorEnd': 0xFF1565C0,
                };
                
                return _OfferCard(offer: offerMap)
                    .animate()
                    .fade(delay: Duration(milliseconds: index * 120))
                    .slideY(begin: 0.15);
              },
            ),
          );
        },
      ),
    );
  }
}

class _OfferCard extends StatelessWidget {
  final Map<String, dynamic> offer;

  const _OfferCard({required this.offer});

  @override
  Widget build(BuildContext context) {
    final colorStart = Color(offer['colorStart'] as int);
    final colorEnd = Color(offer['colorEnd'] as int);

    return ClipRRect(
      borderRadius: AppBorders.large,
      child: Stack(
        children: [
          // Background image
          SizedBox(
            height: 230,
            width: double.infinity,
            child: Image.network(
              offer['imageUrl'],
              fit: BoxFit.cover,
              errorBuilder: (context, error, stackTrace) => Container(color: colorStart),
            ),
          ),

          // Gradient overlay
          Container(
            height: 230,
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  colorStart.withValues(alpha: 0.88),
                  colorEnd.withValues(alpha: 0.75),
                ],
              ),
            ),
          ),

          // Content
          SizedBox(
            height: 230,
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Top row: category chip + discount badge
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _GlassPill(label: offer['category']),
                      _DiscountBadge(label: offer['discount']),
                    ],
                  ),
                  const Spacer(),

                  // Title + subtitle
                  Text(
                    offer['title'],
                    style: const TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w900,
                      fontSize: 26,
                      letterSpacing: -0.5,
                      shadows: [Shadow(color: Colors.black26, blurRadius: 4)],
                    ),
                    maxLines: 1,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    offer['subtitle'],
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.9),
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const Spacer(),

                  // Bottom: promo code + expiry
                  Row(
                    children: [
                      // Removed PromoCodeBox as Offers don't have codes
                      const Spacer(),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.end,
                        children: [
                          const Text(
                            'Valid until',
                            style: TextStyle(
                              color: Colors.white60,
                              fontSize: 11,
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                          Text(
                            offer['expires'],
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _GlassPill extends StatelessWidget {
  final String label;
  const _GlassPill({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 5),
      decoration: BoxDecoration(
        color: Colors.white.withValues(alpha: 0.18),
        borderRadius: AppBorders.circular,
        border: Border.all(color: Colors.white.withValues(alpha: 0.3)),
      ),
      child: Text(
        label.toUpperCase(),
        style: const TextStyle(
          color: Colors.white,
          fontSize: 11,
          fontWeight: FontWeight.w800,
          letterSpacing: 1.2,
        ),
      ),
    );
  }
}

class _DiscountBadge extends StatelessWidget {
  final String label;
  const _DiscountBadge({required this.label});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: AppBorders.circular,
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: 0.15),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Text(
        label,
        style: const TextStyle(
          color: Colors.black87,
          fontSize: 11,
          fontWeight: FontWeight.w900,
          letterSpacing: 0.5,
        ),
      ),
    );
  }
}
