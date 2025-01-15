import 'package:cloud_firestore/cloud_firestore.dart';

class Product {
  final String id;  // Propiedad para almacenar el ID del producto
  final String name;
  final String description;
  final List<String> imageUrls;
  final double price;
  final double averageRating;
  final int ratingCount;

  Product({
    required this.id,  // ID requerido
    required this.name,
    required this.description,
    required this.imageUrls,
    required this.price,
    this.averageRating = 0.0,
    this.ratingCount = 0,
  });

  // Método para crear un producto desde un documento de Firestore
  factory Product.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Product(
      id: doc.id,  // Usar el ID del documento Firestore
      name: data['name'] ?? '',  // Valor por defecto si 'name' es null
      description: data['description'] ?? '',
      imageUrls: List<String>.from(data['imageUrls'] ?? []),  // Manejar lista vacía si no hay 'imageUrls'
      price: (data['price'] is int) ? (data['price'] as int).toDouble() : (data['price']?.toDouble() ?? 0.0),
      averageRating: (data['averageRating']?.toDouble() ?? 0.0),  // Asegurar conversión a double
      ratingCount: data['ratingCount'] ?? 0,  // Valor por defecto si no hay 'ratingCount'
    );
  }

  // Método para convertir un producto en un mapa que se pueda guardar en Firestore
  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'description': description,
      'imageUrls': imageUrls,
      'price': price,
      'averageRating': averageRating,
      'ratingCount': ratingCount,
    };
  }
}
