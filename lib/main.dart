import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:ecommerce_int2/screens/splash_page.dart';
import 'package:ecommerce_int2/models/category.dart';
import 'package:ecommerce_int2/screens/category/category_provider.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart'; // Archivo generado por Firebase para las opciones de configuración.
import 'package:ecommerce_int2/screens/main/main_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // Inicialización de Firebase con las opciones específicas de la plataforma actual.
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );

  // Ejecuta la aplicación.
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        // Proveedor para el manejo de la lógica de la categoría.
        ChangeNotifierProvider(create: (_) => CategoryProvider()),
      ],
      child: MaterialApp(
        title: 'El mejor Servicio',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          brightness: Brightness.light,
          canvasColor: Colors.transparent,
          primarySwatch: Colors.blue,
          fontFamily: "Montserrat",
        ),
        home: MainPage(), // Página principal de la aplicación.
      ),
    );
  }
}
