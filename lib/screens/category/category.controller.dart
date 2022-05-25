import 'package:ecommerce_int2/data/models/category.model.dart';
import 'package:ecommerce_int2/data/repository/category.repository.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CategoryController extends GetxController {
  final CategoryRepository repository;

  CategoryController(this.repository);

  CategoryList categoryList = CategoryList();

  TextEditingController searchController = TextEditingController();

  List<Category> get list => categoryList.categories ?? [];

  List<Category> tempList = [];

  @override
  void onInit() {
    getCategoryList();
    super.onInit();
  }

  void getCategoryList() {
    repository.getAllCategories().then((value) {
      categoryList = value;
      update();
    }, onError: (exeption) => print(exeption));
  }

  void onChanged(String value) {
    if (value.isNotEmpty) {
      list.forEach((category) {
        if (category.categoryName!.toLowerCase().contains(value)) {
          tempList.add(category);
        }
      });
    } else {
      tempList.clear();
      tempList.addAll(list);
    }
    update();
  }
}
