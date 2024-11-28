import 'package:ecommerce_int2/app_properties.dart';
import 'package:ecommerce_int2/models/product.dart';
import 'package:ecommerce_int2/screens/product/product_page.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:flutter_staggered_grid_view/flutter_staggered_grid_view.dart';
import 'package:flutter/material.dart';

class RecommendedList extends StatefulWidget {
  @override
  _RecommendedListState createState() => _RecommendedListState();
}

class _RecommendedListState extends State<RecommendedList> {
  final List<Product> products = [
    Product(id: '1', imageUrls: ['https://i.imgur.com/4mejGU4.jpg',
      'https://i.imgur.com/3Lk2fcw.jpg'], name: 'Forro con cadena', description: 'Dieño para Dama', price: 30000),
    Product(id: '2', imageUrls: ['https://i.imgur.com/G4z0HpV.png',
      'https://i.imgur.com/Xf2TEUR.png'], name: 'Vidrios para Pantalla', description: 'A70', price: 1000),
    Product(id: '3', imageUrls: ['https://i.imgur.com/5zqRhBS.png'], name: 'Botones', description: 'Astronautas', price: 2000),
    Product(id: '4', imageUrls: ['https://i.imgur.com/3Lk2fcw.jpg',
      'https://i.imgur.com/k16kyo7.png'], name: 'cadena de colores', description: 'cadena', price: 5000),
    Product(id: '5', imageUrls: ['https://i.imgur.com/t1mUHdd.jpg',
      'https://firebasestorage.googleapis.com/v0/b/flutterecommercetemplate-72969.appspot.com/o/IMG-20240827-WA0038.jpg?alt=media&token=3901ab4b-f309-4f7c-b65c-a04dc91addd6'], name: 'Billete de Colección', description: 'Billete de CINCO PESOS ORO', price: 50000),
    Product(id: '6', imageUrls: ['https://i.imgur.com/zaMg63b.jpg'], name: 'Lentes Para Camara', description: 'Lisos y de Piedra', price: 5000),
    Product(id: '7', imageUrls: ['https://firebasestorage.googleapis.com/v0/b/flutterecommercetemplate-72969.appspot.com/o/Iphone_Silicone.jpg?alt=media&token=c673ce14-832e-4aa3-b9cb-fece81c28c7b',
      'https://i.imgur.com/ziPFySl.jpg',
      'https://i.imgur.com/VyzRYec.jpg'], name: 'Iphone', description: 'Forro Silicone Case', price: 20000),
    Product(id: '8', imageUrls: ['https://firebasestorage.googleapis.com/v0/b/flutterecommercetemplate-72969.appspot.com/o/soporte_plano_color_para_celular.jpg?alt=media&token=2dc611f5-7e21-4284-b5a0-2217a772f504'], name: 'Soporte Móvil', description: 'Soporte plao Color', price: 15000),
    Product(id: '9', imageUrls: ['https://firebasestorage.googleapis.com/v0/b/flutterecommercetemplate-72969.appspot.com/o/samsung%2025w.jpg?alt=media&token=6aeca5f8-feb1-48de-b6ee-e0c76cd786a1',
      'https://i.imgur.com/pJ31feH.jpg',
      'https://i.imgur.com/c5QE6kL.jpg'], name: 'Adaptador', description: 'Memoria Usb', price: 5000),
  ];

  // Variables para manejar la calificación de productos
  Map<String, double> _currentRatings = {};
  Map<String, int> _ratingCounts = {};

  @override
  void initState() {
    super.initState();
    products.forEach((product) {
      _currentRatings[product.id] = 4.5; // Calificación predeterminada
      _ratingCounts[product.id] = 200; // Opiniones predeterminadas
    });
  }

  void _saveRating(String productId, double rating) {
    setState(() {
      _currentRatings[productId] = rating;
      _ratingCounts[productId] = _ratingCounts[productId]! + 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
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
                      'Recomendado',
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
                  physics: BouncingScrollPhysics(), // Permite el desplazamiento
                  padding: EdgeInsets.zero,
                  crossAxisCount: 2,
                  itemCount: products.length,
                  itemBuilder: (BuildContext context, int index) {
                    final product = products[index];
                    return ClipRRect(
                      borderRadius: BorderRadius.all(Radius.circular(10.0)),
                      child: InkWell(
                        onTap: () => Navigator.of(context).push(
                          MaterialPageRoute(
                            builder: (_) => ProductPage(product: product),
                          ),
                        ),
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
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Hero(
                                tag: product.imageUrls[0],
                                child: Image.network(
                                  product.imageUrls[0],
                                  fit: BoxFit.cover,
                                  height: constraints.maxWidth < 600 ? 190 : 300, // Ajuste dinámico
                                  width: double.infinity,
                                  errorBuilder: (context, error, stackTrace) =>
                                      Icon(Icons.error),
                                ),
                              ),
                              Padding(
                                padding: const EdgeInsets.all(8.0),
                                child: Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: <Widget>[
                                    Text(
                                      product.name,
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 16.0,
                                      ),
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    SizedBox(height: 0.7),
                                    Text(
                                      product.description,
                                      style: TextStyle(
                                        fontSize: 12.0,
                                        color: Colors.black,
                                      ),
                                      overflow: TextOverflow.ellipsis,
                                    ),
                                    SizedBox(height: 0.7),
                                    Text(
                                      '\$${product.price.toStringAsFixed(0)}',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                        fontSize: 14.0,
                                        color: Colors.black87,
                                      ),
                                    ),
                                    SizedBox(height: 0.7),
                                    // Barra de calificación
                                    RatingBar.builder(
                                      initialRating: _currentRatings[product.id]!,
                                      minRating: 1,
                                      direction: Axis.horizontal,
                                      allowHalfRating: true,
                                      itemCount: 5,
                                      itemSize: 20.0,
                                      itemBuilder: (context, _) => Icon(
                                        Icons.star,
                                        color: Colors.amber,
                                      ),
                                      onRatingUpdate: (rating) {
                                        _saveRating(product.id, rating);
                                      },
                                    ),
                                    SizedBox(height: 0.5),
                                    // Mostrar calificación promedio y número de opiniones
                                    Text(
                                      'Promedio: ${_currentRatings[product.id]} (${_ratingCounts[product.id]} opiniones)',
                                      style: TextStyle(
                                        fontSize: 12.0,
                                        color: Colors.black,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    );
                  },
                  mainAxisSpacing: 16.0,
                  crossAxisSpacing: 16.0,
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}
