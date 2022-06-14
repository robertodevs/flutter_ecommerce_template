import 'package:ecommerce_int2/data/provider/address.provider.dart';
import 'package:ecommerce_int2/data/provider/auth.provider.dart';
import 'package:ecommerce_int2/data/provider/cart.provider.dart';
import 'package:ecommerce_int2/data/provider/category.provider.dart';
import 'package:ecommerce_int2/data/provider/order.provider.dart';
import 'package:ecommerce_int2/data/provider/product.provider.dart';
import 'package:ecommerce_int2/data/repository/address.repository.dart';
import 'package:ecommerce_int2/data/repository/auth.repository.dart';
import 'package:ecommerce_int2/data/repository/cart.repository.dart';
import 'package:ecommerce_int2/data/repository/category.repository.dart';
import 'package:ecommerce_int2/data/repository/order.repository.dart';
import 'package:ecommerce_int2/data/repository/product.repository.dart';
import 'package:ecommerce_int2/screens/search_products/search_controller.dart';
import 'package:ecommerce_int2/screens/shop/cart.controller.dart';
import 'package:ecommerce_int2/services/auth.service.dart';
import 'package:ecommerce_int2/services/network.service.dart';
import 'package:get/get.dart';

class Dependency {
  static void init() {
    Get
      ..put(NetWorkService())
      ..put(AuthProvider(Get.find<NetWorkService>()))
      ..put(AuthRepository(Get.find<AuthProvider>()))
      ..put(AuthService(Get.find<AuthRepository>()))
      ..put(AddressProvider(Get.find<NetWorkService>()))
      ..put(AddressRepository(Get.find<AddressProvider>()))
      ..put(CategoryProvider(Get.find<NetWorkService>()))
      ..put(CategoryRepository(Get.find<CategoryProvider>()))
      ..put(ProductProvider(Get.find<NetWorkService>()))
      ..put(ProductRepository(Get.find<ProductProvider>()))
      ..put(CartProvider(Get.find<NetWorkService>()))
      ..put(CartRepository(Get.find<CartProvider>()))
      ..put(CartController(Get.find<CartRepository>()), permanent: true)
      ..put(OrderProvider(Get.find<NetWorkService>()))
      ..put(OrderRepository(Get.find<OrderProvider>()))
      ..put(SearchProductController(Get.find<ProductRepository>()))
      ;
  }
}
