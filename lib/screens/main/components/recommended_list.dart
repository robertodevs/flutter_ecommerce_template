import 'package:ecommerce_int2/app_properties.dart';
import 'package:ecommerce_int2/models/product.dart';
import 'package:ecommerce_int2/screens/product/product_page.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:flutter/material.dart';

class RecommendedList extends StatelessWidget {
  List<Product> products = [
    Product('assets/G54.jpg', 'Bag', 'Beautiful bag', 2.33),
    Product('assets/funda-silicona-suave-con-cubreobjetivo-para-oppo-a-79-5g.png', 'Cap', 'Cap with beautiful design', 10),
    Product('assets/funda-silicona-suave-samsung-a14-5g-con-camara-3d-7-colores.jpg', 'Jeans', 'Jeans for you', 20),
    Product('assets/Iphon13_Corazzones.jpg', 'Woman Shoes', 'Shoes with special discount', 30),
    Product('assets/Redmi_13c_5g.png', 'Bag Express', 'Bag for your shops', 40),
    Product('assets/Redmi_Note_10s.jpg', 'Jeans', 'Beautiful Jeans', 102.33),
    Product('assets/Redmi_note_12.png', 'Silver Ring', 'Description', 52.33),
    Product('assets/shoeman_7.png', 'Shoes', 'Description', 62.33),
    Product('assets/headphone_9.png', 'Headphones', 'Description', 72.33),
  ];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        SizedBox(
          height: 40,
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: <Widget>[
              IntrinsicHeight(
                child: Container(
                  margin: const EdgeInsets.only(left: 16.0, right: 8.0),
                  width: 4,
                  color: mediumYellow,
                ),
              ),
              Center(
                child: Text(
                  'Recommended',
                  style: TextStyle(
                    color: darkGrey,
                    fontSize: 24.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
        ),
        Flexible(
          child: Container(
            padding: EdgeInsets.all(16.0),
            child: MasonryGridView.count(
              physics: NeverScrollableScrollPhysics(),
              padding: EdgeInsets.zero,
              crossAxisCount: 2,  // Total de columnas en la cuadrícula
              itemCount: products.length,
              itemBuilder: (BuildContext context, int index) => ClipRRect(
                borderRadius: BorderRadius.all(Radius.circular(10.0)),
                child: InkWell(
                  onTap: () => Navigator.of(context).push(MaterialPageRoute(
                    builder: (_) => ProductPage(product: products[index]),
                  )),
                  child: Container(
                    decoration: BoxDecoration(
                      gradient: RadialGradient(
                        colors: [
                          Colors.grey.withOpacity(0.3),
                          Colors.grey.withOpacity(0.7),
                        ],
                        center: Alignment(0, 0),
                        radius: 0.6,
                        focal: Alignment(0, 0),
                        focalRadius: 0.1,
                      ),
                    ),
                    child: Hero(
                      tag: products[index].image,
                      child: Image.asset(
                        products[index].image,
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
              ),
              mainAxisSpacing: 16.0,
              crossAxisSpacing: 16.0,
            ),
          ),
        ),
      ],
    );
  }
}
