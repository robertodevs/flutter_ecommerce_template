import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/screens/tracking/order.controller.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:get/get.dart';

class OrderDetailController extends GetxController {
  final OrderRepository repository;

  final OrderController orderController;

  final String orderDetail;

  OrderDetailController(this.repository, this.orderDetail, this.orderController);

  OrderDocDetail? detail;


  void getOrder() {
    repository.getOrderDetail(orderDetail).then((value) => detail = value);
  }

  void remove(Order order) {
    repository.cancleOrder(order.sId!);
    orderController.remove(order);
    Get.back();
  }

  void makePayment(Order order) async {
    MessageDialog.showLoading();
    await repository.makePayment(order.sId!);
    await repository.getOrderDetail(orderDetail).then((value) => detail = value);
    orderController.getAllOrders();
    MessageDialog.hideLoading();
  }

}
