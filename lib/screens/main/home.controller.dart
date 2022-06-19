import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/product.repository.dart';
import 'package:ecommerce_int2/utils/debounce.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

class HomeController extends GetxController {
  final ProductRepository repository;

  HomeController(this.repository);

  TextEditingController searchController = TextEditingController();

  RefreshController refreshController =
      RefreshController(initialRefresh: false);
  int currentPage = 1;

  int total = 0;

  ProductFilter filter = ProductFilter(
      sortOrder: SortOrder(price: 1),
      pageNumber: 1,
      rating: 0,
      min: 1,
      max: 500000,
      // subcategory: '',
      // name: '',
      // merchant: '',
      order: 2);

  final Debounce debounce = Debounce(milliseconds: 2000);

  List<Product> list = [];

  @override
  void onInit() {
    getProduct();
    super.onInit();
  }

  Future<void> getProduct() async {
    try {
      final res = await repository.getProducts(filter);
      total = res.totalProducts ?? 0;
      list.addAll(res.products!);
      update();
    } on Exception catch (e) {
      print(e);
    }
  }

  void onRefresh() async {
    list.clear();
    currentPage = 1;
    filter.pageNumber = 1;
    await getProduct();
    refreshController.refreshCompleted();
  }

  void onLoadMore() async {
    if(list.length == total) return;
    ++currentPage;
    filter.pageNumber = currentPage;
    await getProduct();
    refreshController.loadComplete();
  }

  void onChanged(String value) {
    debounce.run(() {
      if (value.isNotEmpty) {
        filter.name = value;
        getProduct();
        update();
      }
    });
  }
}
