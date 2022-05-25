import 'package:ecommerce_int2/data/models/category.model.dart';
import 'package:ecommerce_int2/data/repository/category.repository.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class SubCategoryController extends GetxController {
  
  final CategoryRepository repository;
  final Category category;

  SubCategoryController(this.repository, this.category);

  CategoryList categoryList = CategoryList();

  TextEditingController searchController = TextEditingController();

  List<SubCategory> get list => category.subcategories ?? [];

  List<SubCategory> tempList = [];

  void onChanged(String value) {
    if (value.isNotEmpty) {
      list.forEach((subCategory) {
        if (subCategory.name!.toLowerCase().contains(value)) {
          tempList.add(subCategory);
        }
      });
    } else {
      tempList.clear();
      tempList.addAll(list);
    }
    update();
  }
}
