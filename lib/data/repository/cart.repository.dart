import 'package:ecommerce_int2/data/models/cart.model.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/provider/cart.provider.dart';

class CartRepository {
  final CartProvider provider;

  CartRepository(this.provider);

  Future<List<CartModel>> getCarts() async {
    final response = await provider.getCarts();
    if (response.statusCode != 200) {
      throw Exception("Get cart failed");
    }
    final result = CartResponse.fromJson(response.body);
    return result.data ?? [];
  }

  Future<String> addProduct(AddProductParam param) async {
    final response = await provider.addProduct(param);
    if (response.statusCode != 200) {
      throw Exception("Add product failed");
    }
    return response.body['_id'];
  }

  Future<void> deleteProduct(String cartId, String productID) async {
    final response = await provider.deleteProduct(cartId, productID);
    if (response.statusCode != 200) {
      throw Exception("Delete product failed");
    }
  }

  Future<void> modifyProduct(
      String cartId, String productId, int before, int after) async {
    final response =
        await provider.modifyProduct(cartId, productId, before, after);
    if (response.statusCode != 200) {
      throw Exception("Update product failed");
    }
  }

  Future<void> checkOutCart(List<CartModel> carts) async {
    for(CartModel cart in carts) {
      await provider.checkoutCart(cart.sId!, cart.merchant!);
    }
  }
}
