import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/provider/order.provider.dart';

class OrderRepository {
  final OrderProvider provider;

  OrderRepository(this.provider);

  Future<String> completeOrder(CompleteOrderParam param) async {
    final response = await provider.completeOrder(param);
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

    Future<Order> checkOut(
      String cartId) async {
    final response =
        await provider.checkOut(cartId);
    if (response.statusCode != 200) {
      throw Exception("Check out cart failed");
    }

    final result = OrderResponse.fromJson(response.body);
    return result.order!;
  }
}
