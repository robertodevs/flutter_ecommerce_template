import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:ecommerce_int2/models/product.dart';
import 'package:ecommerce_int2/screens/product/product_page.dart';

class ProductCard extends StatefulWidget {
  final Product product;
  final double height;
  final double width;

  ProductCard({
    required this.product,
    required this.height,
    required this.width,
  });

  @override
  _ProductCardState createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  double _currentRating = 0; // Calificación actual seleccionada por el usuario
  int _currentImageIndex = 0; // Índice para manejar la imagen actual
  double _averageRating = 4.5; // Simulación de promedio de calificación inicial
  int _ratingCount = 20; // Simulación del número de opiniones

  // Cambiar la imagen cuando se presiona
  void _changeImage() {
    setState(() {
      _currentImageIndex = (_currentImageIndex + 1) % widget.product.imageUrls.length;
    });
  }

  // Función para simular el guardado de una calificación localmente
  void _saveRating(double rating) {
    setState(() {
      double currentTotalRating = _averageRating * _ratingCount;
      _ratingCount += 1;
      _averageRating = (currentTotalRating + rating) / _ratingCount;
    });
  }

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => Navigator.of(context).push(
        MaterialPageRoute(builder: (_) => ProductPage(product: widget.product)),
      ),
      child: Container(
        height: widget.height,
        width: widget.width - 28,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(10)),
          color: Colors.white30,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            // Imagen del producto con cambio al tocar
            GestureDetector(
              onTap: _changeImage,
              child: Align(
                alignment: Alignment.topCenter,
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    return Container(
                      padding: EdgeInsets.all(16.0),
                      width: MediaQuery.of(context).size.width * 1.5,
                      height: MediaQuery.of(context).size.height * 0.30,
                      child: Image.network(
                        widget.product.imageUrls[_currentImageIndex], // Mostrar la imagen actual
                        fit: BoxFit.cover,
                        height: constraints.maxWidth < 600 ? 190 : 300,
                      ),
                    );
                  },
                ),
              ),
            ),
            // Información del producto
            Container(
              padding: EdgeInsets.symmetric(horizontal: 15.0, vertical: 6.0),
              decoration: BoxDecoration(
                color: Colors.transparent,
                borderRadius: BorderRadius.only(
                  bottomLeft: Radius.circular(10),
                ),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  // Nombre del producto
                  Text(
                    widget.product.name,
                    style: TextStyle(
                      fontSize: 14.0,
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  SizedBox(height: 1.9),
                  // Descripción del producto
                  Text(
                    widget.product.description,
                    style: TextStyle(
                      fontSize: 12.0,
                      color: Colors.black,
                    ),
                  ),
                  SizedBox(height: 4.0),
                  // Precio del producto
                  Text(
                    '\$${widget.product.price.toStringAsFixed(2)}',
                    style: TextStyle(
                      fontSize: 12.0,
                      color: Colors.black87,
                    ),
                  ),
                  SizedBox(height: 4.0),
                  // Calificación con estrellas
                  RatingBar.builder(
                    initialRating: _currentRating,
                    minRating: 1,
                    direction: Axis.horizontal,
                    allowHalfRating: true,
                    itemCount: 5,
                    itemSize: 20.0, // Tamaño de las estrellas
                    itemBuilder: (context, _) => Icon(
                      Icons.star,
                      color: Colors.amber,
                    ),
                    onRatingUpdate: (rating) {
                      setState(() {
                        _currentRating = rating;
                      });
                      _saveRating(rating); // Simular guardar la calificación
                    },
                  ),
                  SizedBox(height: 3.0),
                  // Mostrar promedio de calificación
                  Text(
                    'Promedio: ${_averageRating.toStringAsFixed(1)} ($_ratingCount opiniones)',
                    style: TextStyle(
                      fontSize: 12.0,
                      color: Colors.black26,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
