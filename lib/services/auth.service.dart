import 'package:ecommerce_int2/app_properties.dart';
import 'package:ecommerce_int2/data/models/user.model.dart';
import 'package:ecommerce_int2/data/repository/auth.repository.dart';
import 'package:ecommerce_int2/screens/auth/welcome_back_page.dart';
import 'package:ecommerce_int2/screens/main/main_page.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

class AuthService extends GetxService {
  final AuthRepository repository;

  final store = GetStorage();

  @override
  void onInit() {
    verifyUser();
    super.onInit();
  }

  UserModel? userModel;

  AuthService(this.repository);

  void verifyUser() async {
    try {
      final res = await repository.getUserInfo();
      userModel = res;
      store.write(user, userModel!.toJson());
      Navigator.of(Get.context!)
          .pushReplacement(MaterialPageRoute(builder: (_) => MainPage()));
    } catch (e) {
      Navigator.of(Get.context!).pushReplacement(
          MaterialPageRoute(builder: (_) => WelcomeBackPage()));
    }
  }

  Future<bool> login(String username, String password) async {
    try {
      final res = await repository.login(username, password);
      userModel = res.user;
      Navigator.of(Get.context!)
          .pushReplacement(MaterialPageRoute(builder: (_) => MainPage()));
      return true;
    } catch (e) {
      return false;
    }
  }

  void setAccessToken(String token) {
    store.write(accessToken, token);
  }

  String getAccessToken() {
    final String? token = store.read(accessToken);
    if (token == null) throw Exception("Access token not available");
    return token;
  }

  Future<void> register(String username, String password, String firstName,
      String lastName) async {
    try {
      repository.register(username, password, firstName, lastName);
    } on Exception catch (e) {
      Navigator.of(Get.context!).pushReplacement(
          MaterialPageRoute(builder: (_) => WelcomeBackPage()));
    }
  }

  Future<void> forgetPassword(String email) async {
    try {
      repository.forgotPassword(email);
    } on Exception catch (e) {
    } finally {
      Navigator.of(Get.context!).pushReplacement(
          MaterialPageRoute(builder: (_) => WelcomeBackPage()));
    }
  }

  void logout() {
    store.remove(accessToken);
    Navigator.of(Get.context!)
        .pushReplacement(MaterialPageRoute(builder: (_) => WelcomeBackPage()));
  }

  void resetPassword(String password) {
    try {
      repository.resetPassword(password);
    } catch (e) {}
  }
}
