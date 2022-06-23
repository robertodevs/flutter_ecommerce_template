import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/screens/main/components/product_list.dart';
import 'package:ecommerce_int2/screens/merchant/merchant.view.dart';
import 'package:ecommerce_int2/screens/rating/rating_page.dart';
import 'package:ecommerce_int2/screens/search_products/search_controller.dart';
import 'package:ecommerce_int2/screens/shop/cart.controller.dart';
import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:ecommerce_int2/utils/cart_button.widget.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'components/product_display.dart';

class ProductPage extends StatelessWidget {
  final Product product;

  ProductPage({required this.product});

  @override
  Widget build(BuildContext context) {
    final controller = Get.find<CartController>();
    double width = MediaQuery.of(context).size.width;
    double bottomPadding = MediaQuery.of(context).padding.bottom;

    Widget viewProductButton = InkWell(
      onTap: () => controller.addProduct(product, quantity: 1),
      child: Container(
        height: 60,
        width: width / 1.5,
        decoration: BoxDecoration(
            gradient: mainButton,
            boxShadow: [
              BoxShadow(
                color: Color.fromRGBO(0, 0, 0, 0.16),
                offset: Offset(0, 5),
                blurRadius: 10.0,
              )
            ],
            borderRadius: BorderRadius.circular(9.0)),
        child: Center(
          child: Text('Add to Cart',
              style: const TextStyle(
                  color: const Color(0xfffefefe),
                  fontWeight: FontWeight.w600,
                  fontStyle: FontStyle.normal,
                  fontSize: 20.0)),
        ),
      ),
    );

    return Scaffold(
      backgroundColor: yellow,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        iconTheme: IconThemeData(color: darkGrey),
        title: Text(
          product.name ?? 'Product',
          style: const TextStyle(
              color: darkGrey, fontWeight: FontWeight.w500, fontSize: 18.0),
        ),
        actions: [CartButton()],
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            ProductDisplay(
              product: product,
            ),
            SizedBox(
              height: 16.0,
            ),
            Padding(
              padding: const EdgeInsets.only(left: 20.0, right: 16.0),
              child: Text(
                product.name ?? "",
                style: const TextStyle(
                    color: const Color(0xFFFEFEFE),
                    fontWeight: FontWeight.w600,
                    fontSize: 20.0),
              ),
            ),
            const SizedBox(
              height: 24.0
            ),
            Padding(
                padding: EdgeInsets.only(left: 20.0, right: 40.0, bottom: 20),
                child: new Text(product.description ?? "",
                    style: const TextStyle(
                        color: const Color(0xfefefefe),
                        fontWeight: FontWeight.w800,
                        fontFamily: "NunitoSans",
                        fontStyle: FontStyle.normal,
                        fontSize: 16.0))),
            Align(
              alignment: Alignment.bottomCenter,
              child: Container(
                padding: EdgeInsets.only(
                    top: 8.0, bottom: bottomPadding != 20 ? 20 : bottomPadding),
                decoration: BoxDecoration(
                    gradient: LinearGradient(
                        colors: [
                      Color.fromRGBO(255, 255, 255, 0),
                      Color.fromRGBO(253, 192, 84, 0.5),
                      Color.fromRGBO(253, 192, 84, 1),
                    ],
                        begin: FractionalOffset.topCenter,
                        end: FractionalOffset.bottomCenter)),
                width: width,
                height: 120,
                child: Center(child: viewProductButton),
              ),
            ),
            Ratings(product: product),
            GestureDetector(
              onTap: () => Get.to(() => MerchantPage(), arguments: product.merchant),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 16.0),
                child: Text(
                  'More product',
                  style: TextStyle(fontSize: 18),
                ),
              ),
            ),
            const SizedBox(height: 8),
            ProductListView(
                products: Get.find<SearchProductController>()
                    .list
                    .where((element) => element.subcategory == product.subcategory)
                    .toList())
          ],
        ),
      ),
    );
  }
}
