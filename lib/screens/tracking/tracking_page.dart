import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/screens/tracking/order.controller.dart';
import 'package:ecommerce_int2/screens/tracking/row_text.widget.dart';
import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class TrackingPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetBuilder<OrderController>(
        init: OrderController(Get.find<OrderRepository>()),
        builder: (controller) => Container(
              decoration: BoxDecoration(
                  color: Colors.grey[100],
                  image: DecorationImage(
                      image: AssetImage('assets/Group 444.png'),
                      fit: BoxFit.contain)),
              child: Container(
                color: Colors.white54,
                child: MaterialApp(
                  home: DefaultTabController(
                    length: 5,
                    child: Scaffold(
                      appBar: AppBar(
                        backgroundColor: Colors.transparent,
                        elevation: 0.0,
                        iconTheme: IconThemeData(color: Colors.grey),
                        title: Text(
                          'Your orders',
                          style: TextStyle(
                            color: darkGrey,
                            fontSize: 22,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        leading:
                            BackButton(onPressed: () => controller.onBack()),
                        bottom: TabBar(
                          labelColor: Colors.black,
                          isScrollable: true,
                          tabs: [
                            Tab(child: Text('Not processing')),
                            Tab(child: Text('Processing')),
                            Tab(child: Text('Delivering')),
                            Tab(child: Text('Cancel')),
                            Tab(child: Text('Received')),
                          ],
                        ),
                      ),
                      body: TabBarView(
                        children: [
                          Body(orders: controller.notProcessList),
                          Body(orders: controller.processingList),
                          Body(orders: controller.deliveringList),
                          Body(orders: controller.cancelledList),
                          Body(orders: controller.receivedList),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
            ));
  }
}

class Body extends StatelessWidget {
  const Body({Key? key, required this.orders}) : super(key: key);

  final List<Order> orders;
  @override
  Widget build(BuildContext context) {
    return GetBuilder<OrderController>(
      builder: (controller) => SafeArea(
        child: LayoutBuilder(
          builder: (_, constraints) => SingleChildScrollView(
            child: orders.isEmpty
                ? Padding(
                  padding: const EdgeInsets.all(18.0),
                  child: Center(child: Text('Empty')),
                )
                : Column(
                    children: [
                      ...orders
                          .map((order) => GestureDetector(
                                onTap: (() => controller.getOrderDetail(order)),
                                child: Container(
                                  width: Get.width,
                                  child: Card(
                                    child: Padding(
                                      padding: const EdgeInsets.all(8.0),
                                      child: Column(
                                        children: [
                                          RowTextWidget(
                                              text1: 'Date',
                                              text2: '${order.createdDate}'),
                                          RowTextWidget(
                                              text1: 'Deliver status',
                                              text2: ' ${order.status ?? ''}'),
                                          RowTextWidget(
                                              text1: 'Payment status',
                                              text2:
                                                  '${order.paymentStatus ?? ''}'),
                                          RowTextWidget(
                                              text1: 'Merchant',
                                              text2: '${order.merchant ?? ''}'),
                                        ],
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                      ),
                                    ),
                                  ),
                                ),
                              ))
                          .toList()
                    ],
                  ),
          ),
        ),
      ),
    );
  }
}
