import 'package:ecommerce_int2/data/models/address.model.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/provider/cart.provider.dart';

class CartRepository {
  final CartProvider provider;

  CartRepository(this.provider);

  Future<List<Address>> getCarts() async {
    final response = await provider.getCarts();
    if (response.statusCode != 200) {
      throw Exception("Get cart failed");
    }
    final result = (response.body['addresses'] as List)
        .map((i) => Address.fromJson(i))
        .toList();
    return result;
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


}
