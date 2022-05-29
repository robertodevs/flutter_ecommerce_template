import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/cart.repository.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:get/get.dart';

class CartController extends GetxController {
  final CartRepository repository;

  final SwiperController swiperController = SwiperController();

  CartController(this.repository);

  List<Product> products = [

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

  void addProduct(Product product) {
    MessageDialog.showToast("Added product to cart");
    // repository.addProduct(param);
    products.add(product);
    update();
  }
}
