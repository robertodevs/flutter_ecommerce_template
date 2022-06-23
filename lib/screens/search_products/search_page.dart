// ignore_for_file: deprecated_member_use

import 'package:ecommerce_int2/screens/product/components/product_card.dart';
import 'package:ecommerce_int2/screens/product/product_page.dart';
import 'package:ecommerce_int2/screens/search_products/search_controller.dart';
import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:ecommerce_int2/utils/cart_button.widget.dart';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

// ignore: must_be_immutable
class SearchPage extends GetView<SearchProductController> {
  String? subCategory;

  SearchPage({this.subCategory});

  Widget _getLowerLayer(SearchProductController controller) {
    return Container(
      margin: const EdgeInsets.only(top: 16),
      child: Column(
        children: <Widget>[
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                BackButton(),
                Text(
                  'Search',
                  style: TextStyle(
                    color: darkGrey,
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                Spacer(),
                CartButton(),
              ],
            ),
          ),
          Container(
            margin: EdgeInsets.symmetric(horizontal: 16.0),
            decoration: BoxDecoration(
                border:
                    Border(bottom: BorderSide(color: Colors.orange, width: 1))),
            child: TextField(
              controller: controller.searchController,
              onChanged: (value) => controller.onChanged(value),
              cursorColor: darkGrey,
              decoration: InputDecoration(
                contentPadding: EdgeInsets.zero,
                border: InputBorder.none,
                prefixIcon: SvgPicture.asset(
                  'assets/icons/search_icon.svg',
                  fit: BoxFit.scaleDown,
                ),
                suffix: FlatButton(
                  onPressed: () {
                    controller.onClear();
                  },
                  child: Text(
                    'Clear',
                    style: TextStyle(color: Colors.red),
                  ),
                ),
              ),
            ),
          ),
          Expanded(
            child: Container(
              color: Colors.orange[50],
              child: SmartRefresher(
                enablePullDown: true,
                enablePullUp: true,
                controller: controller.refreshController,
                onLoading: controller.onLoadMore,
                onRefresh: controller.onRefresh,
                header: WaterDropHeader(),
                child: ListView.builder(
                  controller: controller.scrollController,
                    itemCount: controller.list.length,
                    itemBuilder: (_, index) => Padding(
                          padding: EdgeInsets.symmetric(horizontal: 16.0),
                          child: ProductCard(
                              controller.list[index],
                              () => Get.to(() => ProductPage(
                                    product: controller.list[index],
                                  ))),
                        )),
              ),
            ),
          )
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.white,
      child: SafeArea(
        top: true,
        bottom: false,
        child: Scaffold(
            body: GetBuilder<SearchProductController>(
          init: controller,
          initState: (state) {
            controller.filter.subcategory = subCategory;
            controller.filter.name = '';
            controller.onRefresh();
          },
          builder: (controller) => _getLowerLayer(controller),
        )),
      ),
    );
  }
}
