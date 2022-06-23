import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:ecommerce_int2/utils/webview.dart';
import 'package:get/get.dart';

class PaymentController extends GetxController {
  final OrderRepository repository;

  List<OrderProceed>? orders;

  PaymentController(this.repository);

  OrderDocDetail? detail;

  @override
  void onInit() {
    getArg();
    super.onInit();
  }

  void getArg() {
    final arg = Get.arguments;
    if (arg != null && arg is List<OrderProceed>) {
      orders = arg;
    }
  }

  void makePayment(OrderProceed order) async {
    MessageDialog.showLoading();
    try {
      repository.payOrder(order.data!.order!.sId!);
      await Get.to(() => WebViewExample(
          url: order.data!.payment!.links!
              .firstWhere(
                  (element) => element.method!.toUpperCase() == 'REDIRECT')
              .href!));
      final res = await repository.getOrderDetail(order.data!.order!.sId!);
      if (res.paymentStatus == "PAID") orders!.remove(order);
      update();
    } on Exception catch (e) {
      MessageDialog.showToast(e.toString());
    }
    MessageDialog.hideLoading();
    if (orders!.isEmpty) {
      onBack();
    }
  }

  void onBack() {
    Get.back(result: orders!.isEmpty);
  }
}
