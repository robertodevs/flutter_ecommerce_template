// another_page.dart
import 'package:flutter/material.dart';

class AnotherPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Otra Página')),
      body: Center(
        child: Text('Bienvenido a la nueva ventana'),
      ),
    );
  }
}
