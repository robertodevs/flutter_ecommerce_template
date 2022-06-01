import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/cart.repository.dart';
import 'package:ecommerce_int2/screens/address/add_address_page.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:get/get.dart';

class CartController extends GetxController {
  final CartRepository repository;

  final SwiperController swiperController = SwiperController();

  CartController(this.repository);

  String? id;

  List<Product> products = [];

  String get total {
    int result = 0;
    products.forEach((element) {
      result += element.price!;
    });
    return '$result VND';
  }

  void remove(Product product) {
    if (id == null) {
      MessageDialog.showToast("There is something wrong!!");
      return;
    }
    repository.deleteProduct(id!, product.sId!);
    products.remove(product);
    update();
  }

  void addProduct(Product product, {int? quantity}) async {
    try {
      AddProductParam param = AddProductParam(products: [
        ProductParam(
            product: product.sId,
            price: product.price,
            merchant: product.merchant,
            quantity: quantity)
      ]);
      // final String cartId = await repository.addProduct(param);
      MessageDialog.showToast("Added product to cart");
      // id = cartId;
      products.add(product);
      update();
    } on Exception catch (e) {
      print(e);
    }
  }

  void checkOut() async {
    Get.to(AddAddressPage(), arguments: id);
  }
}
