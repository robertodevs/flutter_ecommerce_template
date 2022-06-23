import 'package:ecommerce_int2/data/models/category.model.dart';
import 'package:ecommerce_int2/data/provider/category.provider.dart';

class CategoryRepository {
  final CategoryProvider provider;

  CategoryRepository(this.provider);

  Future<CategoryList> getAllCategories() async {
    final response = await provider.getCategories();
    if (response.statusCode != 200) {
      throw Exception("Get category failed");
    }
    final result = CategoryList.fromJson(response.body);
    return result;
  }

}
