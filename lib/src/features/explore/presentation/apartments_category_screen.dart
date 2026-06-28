import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:luxestay/src/core/theme/app_colors.dart';
import 'package:luxestay/src/core/theme/app_typography.dart';
import 'package:luxestay/src/data/mock/mock_data.dart';
import 'package:luxestay/src/data/models/models.dart';

/// Apartments Category — Interactive Explorer with split-screen card carousel.
class ApartmentsCategoryScreen extends StatefulWidget {
  const ApartmentsCategoryScreen({super.key});

  @override
  State<ApartmentsCategoryScreen> createState() => _ApartmentsCategoryScreenState();
}

class _ApartmentsCategoryScreenState extends State<ApartmentsCategoryScreen> {
  late final PageController _cardController;
  final List<Hotel> _properties = MockData.hotels.toList()..shuffle();
  int _currentCard = 0;

  static const _accentColor = Color(0xFF5B7FFF);

  @override
  void initState() {
    super.initState();
    _cardController = PageController(viewportFraction: 0.82);
  }

  @override
  void dispose() {
    _cardController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final bg = isDark ? const Color(0xFF0D0D0D) : const Color(0xFFF5F5F7);
    final textPrimary = isDark ? Colors.white : const Color(0xFF1A1A1A);
    final hotel = _properties.isNotEmpty ? _properties[_currentCard.clamp(0, _properties.length - 1)] : null;

    return Scaffold(
      backgroundColor: bg,
      body: Column(
        children: [
          // ─── TOP HERO SECTION (40%) ───────────────────────────────
          Expanded(
            flex: 4,
            child: Stack(
              children: [
                AnimatedSwitcher(
                  duration: const Duration(milliseconds: 500),
                  child: hotel != null
                      ? CachedNetworkImage(
                          key: ValueKey(hotel.id),
                          imageUrl: hotel.images.first,
                          fit: BoxFit.cover,
                          width: double.infinity,
                          height: double.infinity,
                        )
                      : const SizedBox.expand(),
                ),
                Container(
                  decoration: BoxDecoration(
                    gradient: LinearGradient(
                      begin: Alignment.topCenter,
                      end: Alignment.bottomCenter,
                      colors: [
                        Colors.black.withOpacity(0.5),
                        Colors.black.withOpacity(0.2),
                        bg.withOpacity(0.0),
                        bg,
                      ],
                      stops: const [0.0, 0.3, 0.7, 1.0],
                    ),
                  ),
                ),
                SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(16, 8, 16, 0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        GestureDetector(
                          onTap: () => context.pop(),
                          child: Container(
                            width: 44, height: 44,
                            decoration: BoxDecoration(color: Colors.black.withOpacity(0.3), shape: BoxShape.circle),
                            child: const Icon(Icons.arrow_back_rounded, color: Colors.white, size: 20),
                          ),
                        ),
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            const Icon(Icons.apartment_rounded, color: Colors.white, size: 22),
                            const SizedBox(width: 8),
                            Text('Apartments', style: AppTypography.cardTitle(color: Colors.white)),
                          ],
                        ),
                        GestureDetector(
                          onTap: () {},
                          child: Container(
                            width: 44, height: 44,
                            decoration: BoxDecoration(color: Colors.black.withOpacity(0.3), shape: BoxShape.circle),
                            child: const Icon(Icons.bookmark_border_rounded, color: Colors.white, size: 20),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Positioned(
                  left: 24, bottom: 20, right: 24,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(hotel?.name ?? '', style: AppTypography.heroLarge(color: textPrimary).copyWith(fontSize: 26), maxLines: 2, overflow: TextOverflow.ellipsis),
                      const SizedBox(height: 4),
                      Row(children: [
                        Icon(Icons.location_on_outlined, size: 14, color: _accentColor),
                        const SizedBox(width: 4),
                        Text(hotel?.location ?? '', style: AppTypography.caption(color: isDark ? Colors.white60 : AppColors.textTertiary)),
                      ]),
                    ],
                  ),
                ),
              ],
            ),
          ),

          // ─── BOTTOM CARD CAROUSEL (60%) ───────────────────────────
          Expanded(
            flex: 6,
            child: Column(
              children: [
                Padding(
                  padding: const EdgeInsets.fromLTRB(24, 8, 24, 20),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      _StatPill(icon: Icons.hotel_rounded, value: '${_properties.length}', label: 'Properties', color: _accentColor, isDark: isDark),
                      _StatPill(icon: Icons.star_rounded, value: '4.7+', label: 'Avg Rating', color: _accentColor, isDark: isDark),
                      _StatPill(icon: Icons.location_city_rounded, value: '${MockData.cities.length}', label: 'Cities', color: _accentColor, isDark: isDark),
                    ],
                  ),
                ),
                Expanded(
                  child: PageView.builder(
                    controller: _cardController,
                    physics: const BouncingScrollPhysics(),
                    onPageChanged: (i) => setState(() => _currentCard = i),
                    itemCount: _properties.length,
                    itemBuilder: (context, index) {
                      final prop = _properties[index];
                      return _AptCard(property: prop, isDark: isDark, onTap: () => context.push('/hotel/${prop.id}'));
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(_properties.length.clamp(0, 8), (i) {
                      final isActive = i == _currentCard;
                      return AnimatedContainer(
                        duration: const Duration(milliseconds: 250),
                        margin: const EdgeInsets.symmetric(horizontal: 3),
                        width: isActive ? 20 : 6, height: 6,
                        decoration: BoxDecoration(color: isActive ? _accentColor : _accentColor.withOpacity(0.2), borderRadius: BorderRadius.circular(3)),
                      );
                    }),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _StatPill extends StatelessWidget {
  final IconData icon; final String value; final String label; final Color color; final bool isDark;
  const _StatPill({required this.icon, required this.value, required this.label, required this.color, required this.isDark});
  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Container(padding: const EdgeInsets.all(10), decoration: BoxDecoration(color: color.withOpacity(0.1), shape: BoxShape.circle), child: Icon(icon, size: 18, color: color)),
      const SizedBox(height: 6),
      Text(value, style: AppTypography.bodySemiBold(color: isDark ? Colors.white : Colors.black)),
      Text(label, style: AppTypography.label(color: AppColors.textTertiary)),
    ]);
  }
}

class _AptCard extends StatelessWidget {
  final Hotel property; final bool isDark; final VoidCallback onTap;
  const _AptCard({required this.property, required this.isDark, required this.onTap});

  static const _accentColor = Color(0xFF5B7FFF);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.fromLTRB(8, 0, 8, 8),
        decoration: BoxDecoration(
          color: isDark ? const Color(0xFF1A1A1A) : Colors.white,
          borderRadius: BorderRadius.circular(28),
          boxShadow: [BoxShadow(color: Colors.black.withOpacity(isDark ? 0.3 : 0.08), blurRadius: 24, offset: const Offset(0, 8))],
        ),
        child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
          Expanded(
            flex: 5,
            child: ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(28)),
              child: Stack(fit: StackFit.expand, children: [
                CachedNetworkImage(imageUrl: property.images.first, fit: BoxFit.cover, placeholder: (_, __) => Container(color: isDark ? Colors.grey[900] : Colors.grey[200])),
                Positioned(top: 16, right: 16, child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(color: Colors.black.withOpacity(0.5), borderRadius: BorderRadius.circular(10)),
                  child: Row(mainAxisSize: MainAxisSize.min, children: [
                    Icon(Icons.star_rounded, size: 14, color: AppColors.accent), const SizedBox(width: 3),
                    Text('${property.rating}', style: AppTypography.labelBold(color: Colors.white)),
                  ]),
                )),
                if (property.discount != null) Positioned(top: 16, left: 16, child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                  decoration: BoxDecoration(color: _accentColor, borderRadius: BorderRadius.circular(8)),
                  child: Text(property.discount!, style: AppTypography.labelBold(color: Colors.white)),
                )),
              ]),
            ),
          ),
          Expanded(
            flex: 4,
            child: Padding(padding: const EdgeInsets.all(20), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
              Text(property.name, style: AppTypography.cardTitle(color: isDark ? Colors.white : Colors.black), maxLines: 1, overflow: TextOverflow.ellipsis),
              const SizedBox(height: 6),
              Row(children: [
                Icon(Icons.location_on_outlined, size: 13, color: _accentColor), const SizedBox(width: 4),
                Expanded(child: Text(property.location, style: AppTypography.caption(color: AppColors.textTertiary), maxLines: 1, overflow: TextOverflow.ellipsis)),
              ]),
              const Spacer(),
              Wrap(spacing: 6, runSpacing: 4, children: property.amenities.take(3).map((a) => Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: _accentColor.withOpacity(0.08), borderRadius: BorderRadius.circular(6)),
                child: Text(a, style: AppTypography.label(color: _accentColor)),
              )).toList()),
              const Spacer(),
              Row(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
                Row(crossAxisAlignment: CrossAxisAlignment.end, children: [
                  Text('\$${property.pricePerNight.toInt()}', style: AppTypography.priceSmall(color: isDark ? Colors.white : Colors.black)),
                  Text(' /night', style: AppTypography.caption(color: AppColors.textTertiary)),
                ]),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  decoration: BoxDecoration(color: _accentColor, borderRadius: BorderRadius.circular(10)),
                  child: Text('Book', style: AppTypography.buttonSmall(color: Colors.white)),
                ),
              ]),
            ])),
          ),
        ]),
      ),
    );
  }
}
