import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/address.model.dart';
import 'package:ecommerce_int2/data/models/order.model.dart';
import 'package:ecommerce_int2/data/repository/address.repository.dart';
import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/screens/payment/payment_page.dart';
import 'package:ecommerce_int2/screens/tracking/tracking_page.dart';
import 'package:ecommerce_int2/services/auth.service.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class AddressController extends GetxController {
  final AddressRepository repository;
  final OrderRepository orderRepository;
  final AuthService authService;

  final TextEditingController address = TextEditingController();
  final TextEditingController city = TextEditingController();
  final TextEditingController phone = TextEditingController();

  final SwiperController swiperController = SwiperController();

  AddressController(this.repository, this.orderRepository, this.authService);

  List<OrderProceed>? orderIds;

  List<Address> addresses = <Address>[Address()];

  int selectIndex = 0;

  Address get selectedAddress => addresses[selectIndex];

  @override
  void onInit() {
    getArgument();
    super.onInit();
  }

  @override
  void onReady() {
    getAllAddress();

    super.onReady();
  }

  void getArgument() {
    final arg = Get.arguments;
    if (arg != null && arg is List<OrderProceed>) {
      orderIds = arg;
    }
  }

  void getAllAddress() async {
    MessageDialog.showLoading();
    final List<Address> res = await repository.getAllAddress();
    addresses.assignAll(res);
    addresses.insert(0, Address());
    int index = addresses.indexWhere((element) => element.isDefault!);
    if (index != -1) selectIndex = index;
    address.text = selectedAddress.address ?? "";
    city.text = selectedAddress.city ?? "";
    phone.text = authService.userModel!.email ?? "";
    MessageDialog.hideLoading();
    update();
  }

  void updateIndex(int index) {
    selectIndex = index;
    address.text = selectedAddress.address ?? "";
    city.text = selectedAddress.city ?? "";
    update();
  }

  void updateCurrentAddress() {
    if (address.text.isNotEmpty) selectedAddress.address = address.text;
    if (city.text.isNotEmpty) selectedAddress.city = city.text;
  }

  void submitAddress() {
    if (selectedAddress.id == null) {
      repository
          .addAddress(selectedAddress)
          .then((value) => null, onError: (e) => null);
    } else {
      repository
          .updateAddress(selectedAddress)
          .then((value) => null, onError: (e) => null);
    }
    checkOut();
  }

  void checkOut() async {
    if (orderIds == null) {
      Get.back();
      return;
    }
    if( swiperController.index == 1) {
      final done = await Get.to(() => PaymentPage());
      if(!done) return;
    }
    try {
      MessageDialog.showLoading();
      for (OrderProceed order in orderIds!) {
        await orderRepository.completeOrder(
            order.data!.order!.sId! ,
            CompleteOrderParam(
                address: '${selectedAddress.address}, ${selectedAddress.city}',
                phoneNumber: authService.userModel!.email,
                payment: swiperController.index == 0 ? 'CASH' : 'PAYPAL'));
      }
      MessageDialog.hideLoading();
      if (swiperController.index == 0)
        Get.offAll(() => TrackingPage(), arguments: true);
      else
        Get.to(() => PaymentPage());
    } on Exception catch (e) {
      MessageDialog.hideLoading();
      print(e);
    }
  }
}
