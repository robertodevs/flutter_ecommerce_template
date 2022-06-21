import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/screens/main/main_page.dart';
import 'package:ecommerce_int2/screens/tracking/order_detail.view.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:get/get.dart';

class OrderController extends GetxController {
  final OrderRepository repository;

  final SwiperController swiperController = SwiperController();

  OrderController(this.repository);

  List<Order> orders = [];

  @override
  void onReady() {
    getAllOrders();
    super.onReady();
  }

  void onBack() {
    if(Get.arguments != null && Get.arguments == true) {
      Get.offAll(() => MainPage());
    } else {
      Get.back();
    }
  }

  void getAllOrders() {
    MessageDialog.showLoading();
    repository.getAllOrders().then((value) {
      orders = value;
      update();
      MessageDialog.hideLoading();
    });
  }

  void getOrderDetail(Order order) {
    Get.to(() => OrderDetail(orderId: order.sId!));
  }

  void remove(String orderId) {
    orders.removeWhere((element) => element.sId == orderId);
    update();
  }
}
