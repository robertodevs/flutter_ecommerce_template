import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/services/network.service.dart';
import 'package:get_storage/get_storage.dart';

class CartProvider {
  final NetWorkService networkService;

  final GetStorage storage = GetStorage();

  CartProvider(this.networkService);

  final String getAllCartUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/cart';

  final String addProductToCartUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/cart/add';

  final String modifyProductToCartUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/cart/modify';

  final String deleteProductFromCartUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/cart/modify';

  Future<HttpResponse> getCarts() {
    return networkService.get(getAllCartUrl);
  }

  Future<HttpResponse> addProduct(AddProductParam param) {
    return networkService.post(addProductToCartUrl, data: param.toJson());
  }

  Future<HttpResponse> modifyProduct(String productId, int before, int after) {
    return networkService.put('$addProductToCartUrl/$productId',
        data: {"previousQuantity": before, "currentQuantity": after});
  }

  Future<HttpResponse> deleteProduct(String productId) {
    return networkService.delete('$deleteProductFromCartUrl/$productId');
  }
}
