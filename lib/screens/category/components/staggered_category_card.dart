import 'package:flutter/material.dart';
import 'package:ecommerce_int2/screens/main/components/category_card.dart'; // Importa CategoryCard desde la ubicación correcta

class StaggeredCardCard extends StatefulWidget {
  final Color begin;
  final Color end;
  final String categoryName;
  final String imageUrl; // Cambiado a imageUrl
  final dynamic category; // Agrega esta línea
  final String description; // Nueva propiedad
  final double rating; // Nueva propiedad
  final String whatsappUrl; // Nueva propiedad

  const StaggeredCardCard({
    required this.begin,
    required this.end,
    required this.categoryName,
    required this.imageUrl, // Cambiado aquí
    required this.category,
    required this.description,
    required this.rating,
    required this.whatsappUrl, // Agrega esta línea
  });

  @override
  _StaggeredCardCardState createState() => _StaggeredCardCardState();
}

class _StaggeredCardCardState extends State<StaggeredCardCard>
    with TickerProviderStateMixin {
  late AnimationController _controller;
  bool isActive = false;

  @override
  void initState() {
    super.initState();
    _controller =
        AnimationController(duration: const Duration(milliseconds: 300), vsync: this);
  }

  Future<void> _playAnimation() async {
    try {
      await _controller.forward().orCancel;
    } on TickerCanceled {
      // the animation got canceled, probably because we were disposed
    }
  }

  Future<void> _reverseAnimation() async {
    try {
      await _controller.reverse().orCancel;
    } on TickerCanceled {
      // the animation got canceled, probably because we were disposed
    }
  }

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      behavior: HitTestBehavior.opaque,
      onTap: () {
        if (isActive) {
          isActive = !isActive;
          _reverseAnimation();
        } else {
          isActive = !isActive;
          _playAnimation();
        }
      },
      child: CategoryCard(
        controller: _controller.view,
        categoryName: widget.categoryName,
        begin: widget.begin,
        end: widget.end,
        imageUrl: widget.imageUrl, // Cambiado aquí
        category: widget.category, // Asegúrate de pasar el parámetro 'category'
        rating: widget.rating,
        whatsappUrl: widget.whatsappUrl,
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
