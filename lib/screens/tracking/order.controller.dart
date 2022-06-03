import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:get/get.dart';

class OrderController extends GetxController {
  final OrderRepository repository;

  final SwiperController swiperController = SwiperController();

  OrderController(this.repository);

  List<Order> orders = [];

  @override
  void onInit() {
    getAllOrders();
    super.onInit();
  }

  void getAllOrders() {
    repository.getAllOrders().then((value) => orders = value);
  }

  void remove(Order order) {
    orders.remove(order);
    update();
  }

}
