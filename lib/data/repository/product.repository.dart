import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/provider/product.provider.dart';

class ProductRepository {
  final ProductProvider provider;

  ProductRepository(this.provider);

  Future<ProductList> getProducts(ProductFilter filter) async {
    final response = await provider.getProducts(filter);
    if (response.statusCode != 200) {
      throw Exception("Get products failed");
    }
    final result = ProductList.fromJson(response.body['data']);
    return result;
  }

  Future<ProductList> searchProduct(String keyword) async {
    final response = await provider.searchProducts(keyword);
    if (response.statusCode != 200) {
      throw Exception("Get products failed");
    }
    final result = ProductList.fromJson(response.body);
    return result;
  }

}
