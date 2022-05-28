import 'package:ecommerce_int2/data/models/address.model.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/services/network.service.dart';
import 'package:get_storage/get_storage.dart';

class ProductProvider {
  final NetWorkService networkService;

  final GetStorage storage = GetStorage();

  ProductProvider(this.networkService);

  final String getAllProductsUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/product/list';

  final String searchProductUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/product/list/search/';


  Future<HttpResponse> getProducts(
      ProductFilter filter) {
    return networkService.post(getAllProductsUrl, data: filter.toJson());
  }

  Future<HttpResponse> searchProducts(
      String keyword) {
    return networkService.get("$searchProductUrl/$keyword");
  }


}
