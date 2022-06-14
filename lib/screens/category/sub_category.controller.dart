import 'package:ecommerce_int2/data/models/category.model.dart';
import 'package:ecommerce_int2/data/repository/category.repository.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SubCategoryController extends GetxController {
  
  final CategoryRepository repository;
  final Category category;

  SubCategoryController(this.repository, this.category);

  TextEditingController searchController = TextEditingController();

  List<SubCategory> get list => category.subcategories ?? [];

  List<SubCategory> tempList = [];

  @override
  void onInit() {
    super.onInit();
  }

  @override
  void onReady() {
    final temp = Category.fromJson(category.toJson());
    tempList = temp.subcategories!;
    update();
    super.onReady();
  }

  void onChanged(String value) {
    tempList.clear();
    if (value.isNotEmpty) {
      list.forEach((subCategory) {
        if (subCategory.name!.toLowerCase().contains(value)) {
          tempList.add(subCategory);
        }
      });
    } else {
      tempList.addAll(list);
    }
    update();
  }
}
