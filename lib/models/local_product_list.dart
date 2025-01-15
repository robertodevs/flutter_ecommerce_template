import 'package:ecommerce_int2/models/product.dart';

// Clase que gestiona productos locales
class LocalProductService {
  // Lista local de productos
  final List<Product> products = [
    Product(
      id: 'iphome_001',
      imageUrls: [
        'https://i.imgur.com/pKWSR08.jpg',
        'https://i.imgur.com/Ort5tWN.jpg',
        'https://i.imgur.com/IXfsIJJ.jpg',
        'https://i.imgur.com/zJIjhZu.jpg'

      ],
      name: 'Iphone',
      description: 'lentes,Case',
      price: 25000,
    ),
    Product(
      id: 'Samsung001',
      imageUrls: [
        'https://i.imgur.com/Zap1XCB.jpg',
        'https://i.imgur.com/xlucFE2.jpg'
      ],
      name: 'Samsung A22',
      description: 'A22 4G, A22 5G',
      price: 30000,
    ),
    Product(
      id: 'Redmi',
      imageUrls: [
        'https://i.imgur.com/GEWI08P.jpg',
        'https://i.imgur.com/650xpzR.jpg',
        'https://i.imgur.com/4mejGU4.jpg'
      ],
      name: 'Redmin 14c',
      description: '14c, 12',
      price: 25000,
    ),
    Product(
      id: 'samsung_Camara',
      imageUrls: [
        'https://i.imgur.com/Ghrw0g5.jpg',
        'https://i.imgur.com/Mk5phUn.jpg',
        'https://i.imgur.com/3NUtyhr.jpg',
        'https://i.imgur.com/U9KP4c5.jpg',
        'https://i.imgur.com/7hjCxbU.jpg',
        'https://i.imgur.com/IkyYPoB.jpg',
        'https://i.imgur.com/MtMle6w.jpg',
        'https://i.imgur.com/BngXOfK.jpg',
        'https://i.imgur.com/EKmFTAk.jpg'
      ],
      name: 'Cámara Digital',
      description: 'Samsung Cámara Digital',
      price: 300000,
    ),
  ];

  // Método para obtener la lista de productos
  List<Product> getProducts() {
    return products;
  }
}
