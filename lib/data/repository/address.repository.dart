import 'package:ecommerce_int2/data/models/address.model.dart';
import 'package:ecommerce_int2/data/provider/address.provider.dart';

class AddressRepository {
  final AddressProvider provider;

  AddressRepository(this.provider);

  Future<List<Address>> getAllAddress() async {
    final response = await provider.getAllAddress();
    if (response.statusCode != 200) {
      throw Exception("Get address failed");
    }
    final result = (response.body['addresses'] as List).map((i) =>
        Address.fromJson(i)).toList();
    return result;
  }


  Future<void> addAddress(Address address) async {
    final response =
    await provider.addAddress(address);
    if (response.statusCode != 200) {
      throw Exception("Add address failed");
    }
  }

  Future<void> updateAddress(Address address) async {
    final response =
    await provider.updateAddress(address);
    if (response.statusCode != 200) {
      throw Exception("Update address failed");
    }
  }
}
