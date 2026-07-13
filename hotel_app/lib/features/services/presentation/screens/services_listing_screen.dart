import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../../core/theme/app_spacing.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';
import '../../../home/presentation/widgets/service_card.dart';
import '../../data/dummy_services_data.dart';

class ServicesListingScreen extends StatelessWidget {
  const ServicesListingScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Hospitality Services'),
      body: GridView.builder(
        padding: const EdgeInsets.all(AppSpacing.lg),
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 2,
          crossAxisSpacing: AppSpacing.md,
          mainAxisSpacing: AppSpacing.md,
          childAspectRatio: 0.8,
        ),
        itemCount: DummyServicesData.services.length,
        itemBuilder: (context, index) {
          final service = DummyServicesData.services[index];
          return ServiceCard(
            title: service['title'],
            subtitle: '\$${service['price'].toInt()}',
            imageUrl: service['imageUrl'],
            onTap: () {
              context.push('/services/${service['id']}');
            },
          );
        },
      ),
    );
  }
}
