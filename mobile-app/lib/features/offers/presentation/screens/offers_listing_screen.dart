import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../data/dummy_offers_data.dart';

class OffersListingScreen extends StatelessWidget {
  const OffersListingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Exclusive Offers'),
      body: ListView.separated(
        padding: const EdgeInsets.fromLTRB(AppSpacing.lg, AppSpacing.md, AppSpacing.lg, 32),
        itemCount: DummyOffersData.offers.length,
        separatorBuilder: (context, index) => const SizedBox(height: AppSpacing.xl),
        itemBuilder: (context, index) {
          final offer = DummyOffersData.offers[index];
          return _OfferCard(offer: offer)
              .animate()
              .fade(delay: Duration(milliseconds: index * 120))
              .slideY(begin: 0.15);
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
                  ),
                  const SizedBox(height: 4),
                  Text(
                    offer['subtitle'],
                    style: TextStyle(
                      color: Colors.white.withValues(alpha: 0.9),
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const Spacer(),

                  // Bottom: promo code + expiry
                  Row(
                    children: [
                      Expanded(
                        child: _PromoCodeBox(code: offer['code']),
                      ),
                      const SizedBox(width: AppSpacing.md),
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

class _PromoCodeBox extends StatelessWidget {
  final String code;
  const _PromoCodeBox({required this.code});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Clipboard.setData(ClipboardData(text: code));
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Code "$code" copied!'),
            duration: const Duration(seconds: 2),
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: AppBorders.medium),
          ),
        );
      },
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.15),
          borderRadius: AppBorders.medium,
          border: Border.all(
            color: Colors.white.withValues(alpha: 0.4),
            style: BorderStyle.solid,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.copy_rounded, color: Colors.white, size: 14),
            const SizedBox(width: 8),
            Text(
              code,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.w900,
                fontSize: 15,
                letterSpacing: 2,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
