import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/screens/main/components/product_list.dart';
import 'package:ecommerce_int2/screens/tracking/order.controller.dart';
import 'package:ecommerce_int2/screens/tracking/order_detail.controller.dart';
import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class OrderDetail extends StatelessWidget {
  final String orderId;

  const OrderDetail({Key? key, required this.orderId}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetBuilder<OrderDetailController>(
      init: OrderDetailController(
          Get.find<OrderRepository>(), orderId, Get.find<OrderController>()),
      builder: (controller) => Container(
        decoration: BoxDecoration(
            color: Colors.grey[100],
            image: DecorationImage(
                image: AssetImage('assets/Group 444.png'),
                fit: BoxFit.contain)),
        child: Container(
          color: Colors.white54,
          child: Scaffold(
              appBar: AppBar(
                backgroundColor: Colors.transparent,
                elevation: 0.0,
                brightness: Brightness.light,
                iconTheme: IconThemeData(color: Colors.grey),
                title: Text(
                  orderId,
                  style: TextStyle(
                    color: darkGrey,
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                leading: SizedBox(),
                actions: <Widget>[CloseButton()],
              ),
              body: SafeArea(
                child: LayoutBuilder(
                  builder: (_, constraints) => SingleChildScrollView(
                    child: ConstrainedBox(
                      constraints: BoxConstraints(
                        maxHeight: constraints.maxHeight - 48,
                      ),
                      child: SingleChildScrollView(
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16.0),
                          child: controller.detail != null
                              ? Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    const SizedBox(height: 24),
                                    Text(
                                        'Deliver status: ${controller.detail?.status ?? ''}'),
                                    Text(
                                        'Payment status: ${controller.detail?.paymentStatus ?? ''}'),
                                    Text(
                                        'Merchant: ${controller.detail?.merchant ?? ''}'),
                                    Text(
                                        'Date: ${controller.detail?.created ?? ''}'),
                                    Text('Products'),
                                    const SizedBox(height: 16),
                                    ...controller.detail!.cart!.products!
                                        .map((product) => ProductCard(
                                            product: product,
                                            height: 130,
                                            width: Get.width))
                                        .toList(),
                                    if (controller.detail!.isPayWithCash)
                                      GestureDetector(
                                        onTap: (() => controller.makePayment(orderId)),
                                        child: Center(
                                          child: Container(
                                            height: 40,
                                            width:
                                                MediaQuery.of(context).size.width /
                                                    1.5,
                                            decoration: BoxDecoration(
                                                gradient: mainButton,
                                                boxShadow: [
                                                  BoxShadow(
                                                    color: Color.fromRGBO(
                                                        0, 0, 0, 0.16),
                                                    offset: Offset(0, 5),
                                                    blurRadius: 10.0,
                                                  )
                                                ],
                                                borderRadius:
                                                    BorderRadius.circular(9.0)),
                                            child: Center(
                                              child: Text("Pay with PayPal",
                                                  style: const TextStyle(
                                                      color:
                                                          const Color(0xfffefefe),
                                                      fontWeight: FontWeight.w600,
                                                      fontStyle: FontStyle.normal,
                                                      fontSize: 20.0)),
                                            ),
                                          ),
                                        ),
                                      )
                                  ],
                                )
                              : SizedBox.shrink(),
                        ),
                      ),
                    ),
                  ),
                ),
              )),
        ),
      ),
    );
  }
}

class Location {
  String city;
  DateTime date;
  bool showHour;
  bool isHere;
  bool passed;

  Location(this.city, this.date,
      {this.showHour = false, this.isHere = false, this.passed = false});

  String getDate() {
    if (showHour) {
      return DateFormat("K:mm aaa, d MMMM y").format(date);
    } else {
      return DateFormat('d MMMM y').format(date);
    }
  }
}
