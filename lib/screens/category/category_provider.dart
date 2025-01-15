import 'package:flutter/material.dart';
import 'package:ecommerce_int2/models/category.dart';

class CategoryProvider with ChangeNotifier {
  List<Category> _categories = [
    Category(
      id: 'Redmi',
      begin: Color(0xf4ff0000),
      end:Color(0xffF68D7F),
      name:'Redmi',
      imageUrls:['https://i.imgur.com/650xpzR.jpg'],
      description:'14c,13c', // Descripción
      averageRating: 4.5, // Calificación,
      whatsappUrl:'https://wa.me/1234567890', // WhatsApp UR
    ),
    Category(
      id: 'Iphone',
      begin: Color(0xffF749A2),
      end: Color(0xffFF7375),
      name: 'Iphone',
      imageUrls: ['https://i.imgur.com/ei0dabO.jpg'],
      description: '11,12/12 pro,12 pro max,13,14,13promax,14pro', // Descripción
      averageRating: 4.5, // Calificación,
      whatsappUrl: 'https://wa.me/1234567890', // WhatsApp URL
    ),
    Category(
      id: 'Diseños Pines',
      begin: Color(0xff00E9DA),
      end: Color(0xff5189EA),
      name: 'Pines-Diseño-Protección trasera',
      imageUrls: ['https://i.imgur.com/NLzlWUv.jpg'],
      description: 'camon20,note13pro,note13proplus,A24 ',
      averageRating: 4.5, // Calificación,
      whatsappUrl: 'https://wa.me/1234567890', // WhatsApp URL
    ),
    Category(
      id: 'Silicone',
      begin:  Color(0xffAF2D68),
      end:  Color(0xff632376),
      name: 'Silicona de Colores',
      imageUrls: ['https://i.imgur.com/b8ESxdU.jpg'],
      description: 'Note11,A05,A05S,A15,A35,A55,HOT40,,Y9Prime',
      averageRating: 4.5, // Calificación,
      whatsappUrl: 'https://wa.me/1234567890',
    ),
    Category(
      id: 'IphoneD',
      begin: Color(0xff36E892),
      end: Color(0xff33B2B9),
      name: 'Iphone Diamantado',
      imageUrls: ['https://i.imgur.com/7wCgiWf.jpg'],
      description: '11,12,13,14,15',
      averageRating: 4.5, // Calificación,
      whatsappUrl: 'https://wa.me/1234567890',
    ),
    Category(
      id: 'IphoneE',
      begin: Color(0xffF123C4),
      end: Color(0xff668CEA),
      name: 'Iphone Escarchado',
      imageUrls: ['https://i.imgur.com/xBkEJcB.jpg'],
      description: '11,12,13promax',
      averageRating:  4.5, // Calificación,
      whatsappUrl: 'https://wa.me/1234567890',

    ),
  ];

  List<Category> get categories => _categories;
}
