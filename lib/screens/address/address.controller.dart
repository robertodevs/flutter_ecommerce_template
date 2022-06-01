import 'package:ecommerce_int2/data/models/address.model.dart';
import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/repository/address.repository.dart';
import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/screens/tracking_page.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:get/get.dart';

class AddressController extends GetxController {
  final AddressRepository repository;
  final OrderRepository orderRepository;

  AddressController(this.repository, this.orderRepository);

  String? cartId;

  List<Address> addresses = <Address>[Address()];

  int selectIndex = 0;

  Address get selectedAddress => addresses[selectIndex];

  @override
  void onInit() {
    getArgument();
    getAllAddress();
    super.onInit();
  }

  void getArgument() {
    final arg = Get.arguments;
    if (arg != null && arg is String) {
      cartId = arg;
    }
  }

  void getAllAddress() async {
    final List<Address> res = await repository.getAllAddress();
    addresses.assignAll(res);
    addresses.insert(0, Address());
    int index = addresses.indexWhere((element) => element.isDefault!);
    if (index != -1) selectIndex = index;
    update();
  }

  void updateIndex(int index) {
    selectIndex = index;
    update();
  }

  void updateCurrentAddress(String address, String city) {
    if(address.isNotEmpty) selectedAddress.address = address;
    if(city.isNotEmpty) selectedAddress.city = city;
  }

  void submitAddress() {
    if(selectedAddress.id == null) {
      repository.addAddress(selectedAddress).then((value) => null, onError: (e) => null);
    } else {
      repository.updateAddress(selectedAddress).then((value) => null, onError: (e) => null);
    }
  }

    void checkOut() async {
    try {
      MessageDialog.showLoading();
      final Order order = await orderRepository.checkOut(cartId!);
      MessageDialog.hideLoading();
      Get.to(TrackingPage());
    } on Exception catch (e) {
      MessageDialog.hideLoading();
      print(e);
    }
  }
}