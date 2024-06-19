import 'package:flutter/material.dart';
import 'package:ecommerce_int2/models/category.dart';

class CategoryProvider with ChangeNotifier {
  List<Category> _categories = [
    Category(
      Color(0xf4ff0000),
      Color(0xffF68D7F),
      'Oppo',
      'assets/funda-silicona-suave-con-cubreobjetivo-para-oppo-a-79-5g.png',
    ),
    Category(
      Color(0xffF749A2),
      Color(0xffFF7375),
      'Samsung',
      'assets/funda-silicona-suave-samsung-a14-5g-con-camara-3d-7-colores.jpg',
    ),
    Category(
      Color(0xff00E9DA),
      Color(0xff5189EA),
      'Redmi',
      'assets/Redmi_13c_5g.png',
    ),
    Category(
      Color(0xffAF2D68),
      Color(0xff632376),
      'A21S',
      'assets/A21s.jpg',
    ),
    Category(
      Color(0xff36E892),
      Color(0xff33B2B9),
      'Redmi Note10s',
      'assets/Redmi_Note_10s.jpg',
    ),
    Category(
      Color(0xffF123C4),
      Color(0xff668CEA),
      'Motorola G54',
      'assets/G54.jpg',
    ),
  ];

  List<Category> get categories => _categories;
}
