import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/screens/tracking/order.controller.dart';
import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

class TrackingPage extends StatefulWidget {
  @override
  _TrackingPageState createState() => _TrackingPageState();
}

class _TrackingPageState extends State<TrackingPage> {
  final List<Location> locations = [
    Location('Kolkata Facility', DateTime(2019, 6, 5, 5, 23, 4),
        showHour: false, isHere: false, passed: true),
    Location('Hyderabad Facility', DateTime(2019, 6, 6, 5, 23, 4),
        showHour: false, isHere: false, passed: true),
    Location(
      'Chennai Facility',
      DateTime(2019, 6, 9, 5, 23, 4),
      showHour: false,
      isHere: true,
    ),
    Location(
      'Kerala Facility',
      DateTime(2019, 6, 10, 5, 23, 4),
      showHour: true,
      isHere: false,
    ),
  ];

  String selectedProduct = 'Boat Headphones Bass boost 100v';

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
          child: Scaffold(
              appBar: AppBar(
                backgroundColor: Colors.transparent,
                elevation: 0.0,
                brightness: Brightness.light,
                iconTheme: IconThemeData(color: Colors.grey),
                title: Text(
                  'Your orders',
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
                    child: Column(
                      children: [
                        ...controller.orders.reversed
                            .map((order) => GestureDetector(
                              onTap: (() => controller.getOrderDetail(order)),
                              child: Container(
                                width: Get.width,
                                child: Card(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(children: [
                                          Text('Order Id: ${order.sId ?? 'Order'}'),
                                          Text('Deliver status: ${order.status ?? ''}'),
                                          Text('Payment status: ${order.paymentStatus ?? ''}'),
                                          Text('Merchant: ${order.merchant ?? ''}'),
                                          Text('Date: ${order.created ?? ''}')
                                        ],
                                        crossAxisAlignment: CrossAxisAlignment.start,
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
