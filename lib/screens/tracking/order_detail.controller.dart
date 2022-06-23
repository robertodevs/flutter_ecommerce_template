import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/screens/tracking/order.controller.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:ecommerce_int2/utils/webview.dart';
import 'package:get/get.dart';

class OrderDetailController extends GetxController {
  final OrderRepository repository;

  final OrderController orderController;

  final String orderDetail;

  OrderDetailController(
      this.repository, this.orderDetail, this.orderController);

  OrderDocDetail? detail;

  @override
  void onReady() {
    getOrder();
    super.onReady();
  }

  void getOrder() {
    MessageDialog.showLoading();
    repository.getOrderDetail(orderDetail).then((value) {
      detail = value;
      MessageDialog.hideLoading();
      update();
    });
  }

  void remove(String orderId) {
    repository.cancleOrder(orderId);
    orderController.remove(orderId);
    Get.back();
  }

  void makePayment(String orderId) async {
    MessageDialog.showLoading();
    try {
      final String href = await repository.makePayment(orderId);
      await Get.to(() => WebViewExample(url: href));
      await repository
          .getOrderDetail(orderDetail)
          .then((value) => detail = value);
      orderController.getAllOrders();
    } on Exception catch (e) {
      MessageDialog.showToast(e.toString());
    }
    MessageDialog.hideLoading();
  }

  void confirmOrder(String orderId) async {
    MessageDialog.showLoading();
    try {
      await repository.confirmReceived(orderId);
      orderController.getAllOrders();
      MessageDialog.hideLoading();
      Get.back();
    } on Exception catch (e) {
      MessageDialog.hideLoading();
      MessageDialog.showToast(e.toString());
    }
  }
}
