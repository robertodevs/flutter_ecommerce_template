import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'category_card.dart';
import 'recommended_list.dart';
import 'package:ecommerce_int2/screens/category/category_provider.dart';

class TabView extends StatelessWidget {
  final TabController tabController;

  TabView({
    required this.tabController,
  });

  @override
  Widget build(BuildContext context) {
    // Obtén las categorías del CategoryProvider
    final categories = Provider.of<CategoryProvider>(context).categories;

    if (categories.isEmpty) {
      // Manejo de caso cuando no hay categorías disponibles
      return Center(child: Text('No categories available'));
    }

    return TabBarView(
      physics: AlwaysScrollableScrollPhysics(),
      controller: tabController,
      children: <Widget>[
        // Primer Tab
        CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: LayoutBuilder(
                builder: (context, constraints) {
                  bool isDesktop = constraints.maxWidth > 600;

                  // Define la altura del contenedor
                  double containerHeight = isDesktop
                      ? MediaQuery.of(context).size.height * 0.80  // Altura para escritorio
                      : MediaQuery.of(context).size.height * 0.45; // Altura para móvil

                  // Ajusta la altura de la imagen
                  double imageHeight = isDesktop ? 250.0 : containerHeight * 0.80; // Aumenta el tamaño de la imagen

                  return Container(
                    width: constraints.maxWidth,
                    height: containerHeight,
                    child: ListView.builder(
                      scrollDirection: Axis.horizontal,
                      itemCount: categories.length,
                      itemBuilder: (_, index) {
                        final category = categories[index];

                        return Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 4.0),
                          child: CategoryCard(
                            controller: AnimationController(
                              vsync: Scaffold.of(context),
                              duration: const Duration(milliseconds: 300),
                            ),
                            begin: category.begin,
                            end: category.end,
                            categoryName: category.name ?? 'Unnamed Category',
                            imageUrl: category.imageUrls.isNotEmpty ? category.imageUrls[0] : '',
                            category: category,
                            rating: category.averageRating ?? 0.0,
                            whatsappUrl: category.whatsappUrl ?? '',
                            imageHeight: imageHeight,  // Usar la altura ajustada
                          ),
                        );
                      },
                    ),
                  );
                },
              ),
            ),

            SliverToBoxAdapter(
              child: SizedBox(height: 1.0), // Espacio entre la lista de categorías y la lista recomendada
            ),
            SliverFillRemaining(
              child: RecommendedList(),
            ),
          ],
        ),
        // Otros Tabs con lógica similar...
      ],
    );
  }
}
