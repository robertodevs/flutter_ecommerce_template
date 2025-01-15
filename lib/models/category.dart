import 'dart:ui';

import 'package:cloud_firestore/cloud_firestore.dart';

class Category {
  final String id;
  final String name;
  final String description;
  final List<String> imageUrls;
  final double averageRating;
  final String whatsappUrl;  // Nueva propiedad para WhatsApp
  Color begin;
  Color end;

  Category({
    required this.id,
    required this.name,
    required this.description,
    required this.imageUrls,
    required this.averageRating,
    required this.whatsappUrl, // Asegúrate de pasar este valor
    required this.begin,          // Valor por defecto si no se especifica
    required this.end,            // Valor por defecto si no se especifica
  });

  // Método para crear una categoría desde un documento de Firestore
  factory Category.fromFirestore(DocumentSnapshot doc) {
    final data = doc.data() as Map<String, dynamic>;
    return Category(
      id: doc.id,
      name: data['name'] ?? '',
      description: data['description'] ?? '',
      imageUrls: List<String>.from(data['imageUrls'] ?? []),
      averageRating: (data['averageRating'] ?? 0.0).toDouble(),
      whatsappUrl: data['whatsappUrl'] ?? '',  // Asegúrate de manejar este valor
      begin: (data['begin'] ?? 0.0).toDouble(), // Valor de Firestore para 'begin'
      end: (data['end'] ?? 1.0).toDouble(),     // Valor de Firestore para 'end'
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'name': name,
      'description': description,
      'imageUrls': imageUrls,
      'averageRating': averageRating,
      'whatsappUrl': whatsappUrl,
      'begin': begin,
      'end': end,
    };
  }
}
