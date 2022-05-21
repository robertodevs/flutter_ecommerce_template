import 'package:ecommerce_int2/data/provider/auth.provider.dart';
import 'package:ecommerce_int2/data/repository/auth.repository.dart';
import 'package:ecommerce_int2/services/auth.service.dart';
import 'package:ecommerce_int2/services/network.service.dart';
import 'package:get/get.dart';

class Dependency {
  static void init() {
    Get
      ..put(NetWorkService())
      ..put(AuthProvider(Get.find<NetWorkService>()))
      ..put(AuthRepository(Get.find<AuthProvider>()))
      ..put(AuthService(Get.find<AuthRepository>()));
  }
}
