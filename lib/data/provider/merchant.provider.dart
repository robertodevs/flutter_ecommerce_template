import 'package:ecommerce_int2/services/network.service.dart';
import 'package:get_storage/get_storage.dart';

class MerchantProvider {
  final NetWorkService networkService;

  final GetStorage storage = GetStorage();

  MerchantProvider(this.networkService);

  final String getMerchantInfoUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/merchant';

  Future<HttpResponse> getMerchantInfo(
      String keyword) {
    return networkService.get("$getMerchantInfoUrl/$keyword");
  }


}
