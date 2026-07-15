import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_spacing.dart';
import '../../../../core/theme/app_borders.dart';
import '../../../../core/widgets/navigation/custom_app_bar.dart';

class LicensesScreen extends StatelessWidget {
  const LicensesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).scaffoldBackgroundColor,
      appBar: const CustomAppBar(title: 'Open Source Licenses'),
      body: FutureBuilder<List<LicenseEntry>>(
        future: LicenseRegistry.licenses.toList(),
        builder: (context, snapshot) {
          if (!snapshot.hasData) {
            return const Center(child: CircularProgressIndicator(color: AppColors.primary));
          }

          final licenses = snapshot.data!;
          
          return ListView.builder(
            padding: const EdgeInsets.all(AppSpacing.lg),
            itemCount: licenses.length,
            itemBuilder: (context, index) {
              final license = licenses[index];
              return Container(
                margin: const EdgeInsets.only(bottom: AppSpacing.md),
                decoration: BoxDecoration(
                  color: Theme.of(context).cardTheme.color,
                  borderRadius: AppBorders.medium,
                  border: Border.all(
                    color: Theme.of(context).dividerColor.withValues(alpha: 0.1),
                  ),
                ),
                child: ExpansionTile(
                  title: Text(
                    license.packages.join(', '),
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      fontSize: 15,
                    ),
                  ),
                  iconColor: AppColors.primary,
                  collapsedIconColor: AppColors.grey400,
                  shape: const Border(),
                  children: [
                    Container(
                      padding: const EdgeInsets.all(16),
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: Theme.of(context).scaffoldBackgroundColor,
                        borderRadius: const BorderRadius.vertical(bottom: Radius.circular(12)),
                      ),
                      child: SelectableText(
                        license.paragraphs.map((p) => p.text).join('\\n\\n'),
                        style: const TextStyle(
                          color: Colors.grey,
                          fontSize: 12,
                          fontFamily: 'monospace',
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          );
        },
      ),
    );
  }
}
