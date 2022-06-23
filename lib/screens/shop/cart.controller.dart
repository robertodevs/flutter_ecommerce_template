import 'package:ecommerce_int2/data/models/cart.model.dart';
import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/cart.repository.dart';
import 'package:ecommerce_int2/screens/address/add_address_page.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:get/get.dart';

class CartController extends GetxController {
  final CartRepository repository;

  CartController(this.repository);

  bool isLoadingCart = false;

  List<Product> get products {
    if (carts == null) return [];
    List<Product> products = [];
    for (CartModel cart in carts!) {
      products.addAll(cart.products!);
    }
    return products;
  }

  List<CartModel>? carts;

  @override
  onInit() {
    super.onInit();
  }

  String get total {
    int result = 0;
    products.forEach((element) {
      result += (element.price ?? element.purchasePrice ?? 0) *
          (element.quantity ?? 1);
    });
    return '$result VND';
  }

  Future<void> getCart() async {
    isLoadingCart = true;
    update();
    repository.getCarts().then((value) {
      carts = value;
      isLoadingCart = false;
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
      await repository.addProduct(param);
      MessageDialog.showToast("Added product to cart");
      update();
    } on Exception catch (e) {
      print(e);
    }
  }

  void checkOut() async {
    MessageDialog.showLoading();
    final List<OrderProceed> orderIds = await repository.checkOutCart(carts!);
    MessageDialog.hideLoading();
    Get.to(() => AddAddressPage(), arguments: orderIds);
  }

  void onChangeQuantity(String id, int quantity) {
    try {
      final product = products.firstWhere((element) => element.sId == id);
      repository.modifyProduct(
          carts!
              .firstWhere((element) => element.products!.contains(product))
              .sId!,
          product.sId!,
          product.quantity!,
          quantity);
      product.quantity = quantity;
      update();
    } on Exception catch (e) {
      print(e.toString());
    }
  }
}
