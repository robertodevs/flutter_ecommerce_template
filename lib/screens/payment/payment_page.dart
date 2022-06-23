import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/screens/payment/payment.controller.dart';
import 'package:ecommerce_int2/screens/tracking/row_text.widget.dart';
import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class PaymentPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetBuilder<PaymentController>(
      init: PaymentController(Get.find<OrderRepository>()),
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
                iconTheme: IconThemeData(color: Colors.grey),
                title: Text(
                  'Your payment',
                  style: TextStyle(
                    color: darkGrey,
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                leading: BackButton(onPressed: () => controller.onBack()),
              ),
              body: SafeArea(
                child: LayoutBuilder(
                  builder: (_, constraints) => SingleChildScrollView(
                    child: Column(
                      children: [
                        ...controller.orders!.reversed
                            .map((order) => GestureDetector(
                                  onTap: (() => controller.makePayment(order)),
                                  child: Container(
                                    width: Get.width,
                                    child: Card(
                                      child: Padding(
                                        padding: const EdgeInsets.all(8.0),
                                        child: Column(
                                          children: [
                                            RowTextWidget(
                                                text1: 'ID',
                                                text2:
                                                    '${order.data!.order!.sId}'),
                                            RowTextWidget(
                                                text1: 'Total',
                                                text2:
                                                    ' ${order.data!.payment!.transactions!.fold(0, (previousValue, element) => (previousValue as int) + (int.tryParse(element.amount!.total!) ?? 0))}'),
                                            RowTextWidget(
                                                text1: 'Merchant',
                                                text2:
                                                    '${order.data?.order?.merchant ?? ''}'),
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
              )),
        ),
      ),
    );
  }
}
