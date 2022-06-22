import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/merchant.model.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/merchant.repository.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:get/get.dart';

class MerchantController extends GetxController {
  final MerchantRepository merchantRepository;

  final SwiperController swiperController = SwiperController();

  MerchantController(this.merchantRepository);

  List<Product> get products {
    return data?.products ?? [];
  }

  String? merchantId;
  MerchantData? data;

  String get merchant => data?.merchant?.name ?? 'Merchant';
  String get des =>
      data?.merchant?.business ?? 'A shop sellling high quality assets';
  String get email => data?.merchant?.email ?? '';
  String get phone => data?.merchant?.phoneNumber ?? '';

  @override
  onInit() {
    getArg();
    super.onInit();
  }

  void getArg() {
    final arg = Get.arguments;
    if (arg != null && arg is String) {
      merchantId = arg;
    }
  }

  void getInfo() async {
    if (merchantId == null) {
      MessageDialog.showConfirmDialog(
        content: "Error loading",
      );
      return;
    }

    final res = await merchantRepository.getMerchantInfo(merchantId!);
    data = res;
    update();
  }
}
