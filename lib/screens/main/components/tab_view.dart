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

    return TabBarView(
      physics: NeverScrollableScrollPhysics(),
      controller: tabController,
      children: <Widget>[
        Container(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              Container(
                margin: EdgeInsets.all(8.0),
                height: MediaQuery.of(context).size.height / 9,
                width: MediaQuery.of(context).size.width,
                child: ListView.builder(
                  scrollDirection: Axis.horizontal,
                  itemCount: categories.length,
                  itemBuilder: (_, index) => CategoryCard(
                    category: categories[index],
                  ),
                ),
              ),
              SizedBox(height: 16.0),
              Flexible(child: RecommendedList()),
            ],
          ),
        ),
        // Repite las otras pestañas si es necesario
        Column(children: <Widget>[
          SizedBox(height: 16.0),
          Flexible(child: RecommendedList())
        ]),
        Column(children: <Widget>[
          SizedBox(height: 16.0),
          Flexible(child: RecommendedList())
        ]),
        Column(children: <Widget>[
          SizedBox(height: 16.0),
          Flexible(child: RecommendedList())
        ]),
        Column(children: <Widget>[
          SizedBox(height: 16.0),
          Flexible(child: RecommendedList())
        ]),
      ],
    );
  }
}
