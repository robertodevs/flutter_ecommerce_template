import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/cart.repository.dart';
import 'package:get/get.dart';

class CartController extends GetxController {
  final CartRepository repository;

  final SwiperController swiperController = SwiperController();

  CartController(this.repository);

  List<Product> products = [
    Product(
        imageUrl: 'assets/headphones.png',
        name: 'Boat roackerz 400 On-Ear Bluetooth Headphones',
        description: 'description',
        price: 45000),
    Product(
        imageUrl: 'assets/headphones_2.png',
        name: 'Boat roackerz 100 On-Ear Bluetooth Headphones',
        description: 'description',
        price: 22000),
    Product(
        imageUrl: 'assets/headphones_3.png',
        name: 'Boat roackerz 300 On-Ear Bluetooth Headphones',
        description: 'description',
        price: 58000)
  ];

  String get total {
    int result = 0;
    products.forEach((element) {
      result += element.price!;
    });
    return '$result VND';
  }

  void remove(Product product) {
    repository.deleteProduct(product.sId!);
    products.remove(product);
    update();
  }
}
