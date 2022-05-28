import 'package:ecommerce_int2/data/models/category.model.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/product.repository.dart';
import 'package:ecommerce_int2/utils/debounce.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

class SearchProductController extends GetxController {
  final ProductRepository repository;

  SearchProductController(this.repository);

  TextEditingController searchController = TextEditingController();

RefreshController refreshController =
      RefreshController(initialRefresh: false);
  int currentPage = 1;

  ProductFilter filter = ProductFilter(sortOrder: SortOrder(iId: -1));

  final Debounce debounce = Debounce(milliseconds: 2000);

  List<Product> list = [];

  @override
  void onInit() {
    super.onInit();
  }

  void getProduct() async {
    final res = await repository.getProducts(filter);
    list.addAll(res.products!);
    refreshController.loadComplete();
    update();
  }

  void onRefresh() {
    list.clear();
    currentPage = 1;
    filter.pageNumber = 1;
    getProduct();
  }

  void onLoadMore() {
    ++ currentPage;
    filter.pageNumber = currentPage;
    getProduct();
  }

  void onChanged(String value) {
    debounce.run(() {
      if (value.isNotEmpty) {
        getProduct();
        update();
      }
    });
  }
}
