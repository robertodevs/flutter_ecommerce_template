import 'package:flutter/material.dart';

const Color yellow = Color(0xff4CAF50); // Un tono verde claro
const Color mediumYellow = Color(0xff8BC34A); // Un tono verde más oscuro
const Color darkYellow = Color(0xff388E3C); // Un verde aún más oscuro
const Color transparentYellow = Color.fromRGBO(139, 195, 74, 0.7); // Verde transparente
const Color darkGrey = Color(0xff202020);

const LinearGradient mainButton = LinearGradient(colors: [
  Color.fromRGBO(33, 150, 243, 1), // Un azul
  Color.fromRGBO(30, 136, 229, 1), // Azul más oscuro
  Color.fromRGBO(25, 118, 210, 1), // Otro tono de azul
], begin: FractionalOffset.topCenter, end: FractionalOffset.bottomCenter);

const List<BoxShadow> shadow = [
  BoxShadow(color: Colors.black12, offset: Offset(0, 3), blurRadius: 6)
];

screenAwareSize(int size, BuildContext context) {
  double baseHeight = 640.0;
  return size * MediaQuery.of(context).size.height / baseHeight;
}
