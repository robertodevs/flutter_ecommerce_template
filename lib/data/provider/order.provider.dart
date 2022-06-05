import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/services/network.service.dart';
import 'package:get_storage/get_storage.dart';

class OrderProvider {
  final NetWorkService networkService;

  final GetStorage storage = GetStorage();

  OrderProvider(this.networkService);

  final String orderUrl = 'https://ecommerce-api-dut.herokuapp.com/api/order';

  final String completeOrderUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/order/';

  final String checkOutCartUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/order/add';
  final String cancleOrderUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/order';

  Future<HttpResponse> getAllOrders() {
    return networkService.get(orderUrl);
  }

  Future<HttpResponse> checkOut(String cartId) {
    return networkService.post(checkOutCartUrl,
        data: {"cart": cartId, "merchant": "626e237ef4224ee4107039b9"});
  }

  Future<HttpResponse> completeOrder(String orderId, CompleteOrderParam param) {
    return networkService.put('$completeOrderUrl/$orderId/',
        data: param.toJson());
  }

  Future<HttpResponse> makePayment(String orderId) {
    return networkService.post('$completeOrderUrl/$orderId/pay');
  }

  Future<HttpResponse> cancleOrder(String orderId) {
    return networkService.delete('$cancleOrder/$orderId/cancel');
  }

  Future<HttpResponse> getOrderDetail(String orderId) {
    return networkService.get('$orderUrl/$orderId');
  }
}
