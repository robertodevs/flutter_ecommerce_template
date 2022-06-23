import 'package:ecommerce_int2/data/models/merchant.model.dart';
import 'package:ecommerce_int2/data/provider/merchant.provider.dart';

class MerchantRepository {
  final MerchantProvider provider;

  MerchantRepository(this.provider);

  Future<MerchantData> getMerchantInfo(String merchant) async {
    final response = await provider.getMerchantInfo(merchant);
    if (response.statusCode != 200) {
      throw Exception("Get merchant failed");
    }
    final result = MerchantResponse.fromJson(response.body);
    return result.data!;
  }
}
