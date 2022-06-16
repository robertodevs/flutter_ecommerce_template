import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/cart.model.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/cart.repository.dart';
import 'package:ecommerce_int2/screens/address/add_address_page.dart';
import 'package:ecommerce_int2/screens/search_products/search_controller.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:get/get.dart';

class MerchantController extends GetxController {
  final CartRepository repository;

  final SwiperController swiperController = SwiperController();

  MerchantController(this.repository);

  List<Product> get products {
    return Get.find<SearchProductController>()
        .list
        .where((element) => element.merchant == merchant)
        .toList();
  }

  List<CartModel>? carts;
  String? merchantId;

  String get merchant => merchantId ?? 'Merchant';
  String get des => 'A shop sellling high quality assets';

  @override
  onInit() {
    getArg();
    super.onInit();
  }

  void getArg() {
    final arg = Get.arguments;
    if (arg != null && arg is String) {
      merchantId = arg;
    }
  }

  String get total {
    int result = 0;
    products.forEach((element) {
      result += element.price ?? element.purchasePrice ?? 0;
    });
    return '$result VND';
  }

  Future<void> getCart() async {
    repository.getCarts().then((value) {
      carts = value;
      update();
    });
  }

  void remove(Product product) {
    CartModel? cart = carts!
        .firstWhereOrNull((element) => element.products!.contains(product));
    if (cart == null) {
      MessageDialog.showToast("There is something wrong!!");
      return;
    }
    repository.deleteProduct(cart.sId!, product.sId!);
    cart.products!.remove(product);
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
      final String cartId = await repository.addProduct(param);
      MessageDialog.showToast("Added product to cart");
      int index = carts!.indexWhere((element) => element.sId == cartId);
      if (index != -1) {
        carts![index].products!.add(product);
      } else {
        carts!.add(CartModel(sId: cartId, products: [product]));
      }
      update();
    } on Exception catch (e) {
      print(e);
    }
  }

  void checkOut() async {
    MessageDialog.showLoading();
    final List<String> orderIds = await repository.checkOutCart(carts!);
    MessageDialog.hideLoading();
    Get.to(() => AddAddressPage(), arguments: orderIds);
  }
}
