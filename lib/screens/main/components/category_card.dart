import 'package:ecommerce_int2/models/category.dart';
import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class CategoryCard extends StatelessWidget {
  final Color begin;
  final Color end;
  final String categoryName;
  final String imageUrl; // Nombre de la imagen
  final double rating; // Nueva propiedad
  final String whatsappUrl; // Nueva propiedad
  final Animation<double> controller;
  final double imageHeight; // Nuevo parámetro

  CategoryCard({
    required this.controller,
    required this.begin,
    required this.end,
    required this.categoryName,
    required this.imageUrl,
    required this.rating,
    required this.whatsappUrl,
    required Category category,
    this.imageHeight = 100.0, // Valor por defecto para la altura de la imagen
  });

  Widget _buildAnimation(BuildContext context, Widget? child) {
    return LayoutBuilder(
      builder: (context, constraints) {
        // Ajuste dinámico del ancho según el tamaño de la pantalla
        double cardWidth;
        if (constraints.maxWidth < 600) {
          // Para dispositivos móviles
          cardWidth = constraints.maxWidth * 0.60; // 60% del ancho
        } else {
          // Para dispositivos de escritorio
          cardWidth = 300; // Ancho fijo para escritorio
        }

        return Container(
          width: cardWidth,
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: [begin, end],
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            borderRadius: BorderRadius.all(Radius.circular(8)), // Redondeo mejorado
          ),
          child: Column(
            children: [
              // Ajustar la altura de la imagen aquí
              CachedNetworkImage(
                imageUrl: imageUrl,
                placeholder: (context, url) => Container(
                  height: imageHeight,
                  child: Center(child: CircularProgressIndicator()),
                ),
                errorWidget: (context, url, error) => Container(
                  height: imageHeight,
                  child: Center(child: Icon(Icons.error)),
                ),
                height: imageHeight, // Usar el nuevo parámetro de altura
                fit: BoxFit.cover, // Ajuste para que la imagen cubra el espacio
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween, // Alinear los elementos a los extremos
                children: [
                  Expanded(
                    child: Text(
                      categoryName,
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                        color: Colors.black,
                      ),
                      textAlign: TextAlign.left,
                    ),
                  ),
                  Row(
                    children: [
                      Icon(Icons.star, color: Colors.yellow),
                      SizedBox(width: 4.0), // Espacio entre estrella y rating
                      Text(
                        '$rating',
                        style: TextStyle(
                          color: Colors.black, // Color del texto del rating
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              IconButton(
                icon: FaIcon(FontAwesomeIcons.whatsapp, color: Colors.green),
                onPressed: () async {
                  final Uri whatsappUri = Uri.parse(whatsappUrl);
                  if (await canLaunchUrl(whatsappUri)) {
                    await launchUrl(whatsappUri);
                  } else {
                    throw 'No se puede abrir $whatsappUrl';
                  }
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: controller,
      builder: _buildAnimation,
    );
  }
}
