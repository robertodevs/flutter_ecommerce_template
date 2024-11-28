import 'package:ecommerce_int2/app_properties.dart';
import 'package:flutter/material.dart';
const Color transparentPink = Color.fromARGB(150, 255, 182, 193); // Rosado transparente

class MainBackground extends CustomPainter {
  MainBackground();

  @override
  void paint(Canvas canvas, Size size) {
    double height = size.height;
    double width = size.width;
    canvas.drawRect(
        Rect.fromLTRB(0, 0, width, height), Paint()..color = Colors.white);
    canvas.drawRect(Rect.fromLTRB(width - (width / 3), 0, width, height),
        Paint()..color = transparentPink);
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    return false;
  }
}
