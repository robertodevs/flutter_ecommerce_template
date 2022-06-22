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
  void onReady() {
    super.onReady();
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
      await Get.to(() => WebViewExample(
          url: order.data!.payment!.links!
              .firstWhere(
                  (element) => element.method!.toUpperCase() == 'REDIRECT')
              .href!));
      final res = await repository.getOrderDetail(order.data!.order!.sId!);
      if (res.paymentStatus == "PAID") orders!.remove(order);
      if (orders!.isEmpty) {
        onBack();
      }
      update();
    } on Exception catch (e) {
      MessageDialog.showToast(e.toString());
    }
    MessageDialog.hideLoading();
  }

  void onBack() {
    Get.back(result: orders!.isEmpty);
  }
}
