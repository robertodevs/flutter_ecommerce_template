import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class BannerWidget extends StatelessWidget {
  final String imageUrl;
  final VoidCallback onTap;

  const BannerWidget({
    Key? key,
    required this.imageUrl,
    required this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        double width = constraints.maxWidth;
        double height = width > 800
            ? MediaQuery.of(context).size.height * 0.4 // 40% de altura en pantallas grandes
            : MediaQuery.of(context).size.height * 0.25; // 25% en móviles

        return GestureDetector(
          onTap: onTap,
          child: Container(
            width: double.infinity, // Ancho completo
            height: height.clamp(200, 400), // Limita la altura entre 100 y 300
            color: Colors.orange, // Fondo naranja
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10), // Bordes redondeados
              child: AspectRatio(
                aspectRatio: 16 / 9, // Relación de aspecto (ancho/alto)
                child: Image.network(
                  imageUrl,
                  fit: width > 800 ? BoxFit.cover : BoxFit.contain, // Ajuste según el tamaño
                  loadingBuilder: (context, child, loadingProgress) {
                    if (loadingProgress == null) return child;
                    return Center(
                      child: CircularProgressIndicator(
                        value: loadingProgress.expectedTotalBytes != null
                            ? loadingProgress.cumulativeBytesLoaded /
                            (loadingProgress.expectedTotalBytes ?? 1)
                            : null,
                      ),
                    );
                  },
                  errorBuilder: (context, error, stackTrace) => Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.broken_image, size: 50, color: Colors.grey),
                        SizedBox(height: 10),
                        Text(
                          'Error al cargar la imagen',
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}
