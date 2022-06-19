import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/repository/cart.repository.dart';
import 'package:ecommerce_int2/screens/shop/cart.controller.dart';
import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

import 'components/credit_card.dart';
import 'components/shop_item_list.dart';

class CheckOutPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Widget checkOutButton(CartController controller) => InkWell(
      onTap: () => controller.checkOut(),
      child: Container(
        height: 80,
        width: MediaQuery.of(context).size.width / 1.5,
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
          child: Text("Check Out",
              style: const TextStyle(
                  color: const Color(0xfffefefe),
                  fontWeight: FontWeight.w600,
                  fontStyle: FontStyle.normal,
                  fontSize: 20.0)),
        ),
      ),
    );

    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0.0,
        iconTheme: IconThemeData(color: darkGrey),
        title: Text(
          'Checkout',
          style: TextStyle(
              color: darkGrey, fontWeight: FontWeight.w500, fontSize: 18.0),
        ),
      ),
      body: LayoutBuilder(
        builder: (_, constraints) => SingleChildScrollView(
          physics: ClampingScrollPhysics(),
          child: ConstrainedBox(
            constraints: BoxConstraints(minHeight: constraints.maxHeight),
            child: GetBuilder<CartController>(
              init: CartController(Get.find<CartRepository>()),
              initState: (state) {
                  Get.find<CartController>().getCart();
              },
              builder: (controller) => Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 32.0),
                    height: 48.0,
                    color: yellow,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          'Subtotal',
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16),
                        ),
                        Text(
                          controller.products.length.toString() + ' items',
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16),
                        )
                      ],
                    ),
                  ),
                  if(controller.isLoadingCart) 
                  Container(height: 100, child: Center(child: CircularProgressIndicator.adaptive()),),
                  if(!controller.isLoadingCart)
                  ...controller.products.map(
                    (product) => ShopItemList(
                      product,
                      onRemove: () => controller.remove(product),
                    ),
                  ),
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 32.0),
                    height: 48.0,
                    color: yellow,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Text(
                          'Total',
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16),
                        ),
                        Text(
                          controller.total,
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 16),
                        )
                      ],
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Text(
                      'Payment',
                      style: TextStyle(
                          fontSize: 20,
                          color: darkGrey,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                  SizedBox(
                    height: 50,
                    child: Swiper(
                      itemCount: 2,
                      itemBuilder: (_, index) {
                        return CreditCard(
                          text: index == 0 ? 'CASH \$\$\$' : 'PAYPAL',
                        );
                      },
                      scale: 0.8,
                      controller: controller.swiperController,
                      viewportFraction: 0.6,
                      loop: false,
                      fade: 0.7,
                    ),
                  ),
                  SizedBox(height: 24),
                  Center(
                      child: Padding(
                    padding: EdgeInsets.only(
                        bottom: MediaQuery.of(context).padding.bottom == 0
                            ? 20
                            : MediaQuery.of(context).padding.bottom),
                    child: checkOutButton(controller),
                  ))
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class Scroll extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    // TODO: implement paint

    LinearGradient grT = LinearGradient(
        colors: [Colors.transparent, Colors.black26],
        begin: Alignment.topCenter,
        end: Alignment.bottomCenter);
    LinearGradient grB = LinearGradient(
        colors: [Colors.transparent, Colors.black26],
        begin: Alignment.bottomCenter,
        end: Alignment.topCenter);

    canvas.drawRect(
        Rect.fromLTRB(0, 0, size.width, 30),
        Paint()
          ..shader = grT.createShader(Rect.fromLTRB(0, 0, size.width, 30)));

    canvas.drawRect(Rect.fromLTRB(0, 30, size.width, size.height - 40),
        Paint()..color = Color.fromRGBO(50, 50, 50, 0.4));

    canvas.drawRect(
        Rect.fromLTRB(0, size.height - 40, size.width, size.height),
        Paint()
          ..shader = grB.createShader(
              Rect.fromLTRB(0, size.height - 40, size.width, size.height)));
  }

  @override
  bool shouldRepaint(CustomPainter oldDelegate) {
    // TODO: implement shouldRepaint
    return false;
  }
}
