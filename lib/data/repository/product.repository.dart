import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/provider/product.provider.dart';

class ProductRepository {
  final ProductProvider provider;

  ProductRepository(this.provider);

  Future<Product> getProducts(ProductFilter filter) async {
    final response = await provider.getProducts(filter);
    if (response.statusCode != 200) {
      throw Exception("Get products failed");
    }
    final result = Product.fromJson(response.body);
    return result;
  }

  Future<Product> searchProduct(String keyword) async {
    final response = await provider.searchProducts(keyword);
    if (response.statusCode != 200) {
      throw Exception("Get products failed");
    }
    final result = Product.fromJson(response.body);
    return result;
  }

}
