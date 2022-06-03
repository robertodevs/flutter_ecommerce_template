import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/provider/order.provider.dart';

class OrderRepository {
  final OrderProvider provider;

  OrderRepository(this.provider);

  Future<List<Order>> getAllOrders() async {
    final response = await provider.getAllOrders();
    if (response.statusCode != 200) {
      throw Exception("Complete order failed");
    }
    final result = AllOrderResponse.fromJson(response.body);
    return result.orders ?? [];
  }

  Future<String> completeOrder(String orderId, CompleteOrderParam param) async {
    final response = await provider.completeOrder(orderId, param);
    if (response.statusCode != 200) {
      throw Exception("Complete order failed");
    }
    final result = CompleteOrderResponse.fromJson(response.body);
    return result.orderDoc!.sId!;
  }

  Future<String> makePayment(String orderId) async {
    final response = await provider.makePayment(orderId);
    if (response.statusCode != 200) {
      throw Exception("Make payment failed");
    }
    // final result = CompleteOrderResponse.fromJson(response.body);
    return 'href';
  }

  Future<void> cancleOrder(String orderId) async {
    final response = await provider.cancleOrder(orderId);
    if (response.statusCode != 200) {
      throw Exception("Cancel order failed");
    }
    return;
  }

  Future<OrderDocDetail> getOrderDetail(String orderId) async {
    final response = await provider.getOrderDetail(orderId);
    if (response.statusCode != 200) {
      throw Exception("Cancel order failed");
    }
    final res = DetailOrderResponse.fromJson(response.body);
    return res.orderDoc!;
  }
}
