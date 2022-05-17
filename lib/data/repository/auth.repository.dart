import 'dart:ffi';

import 'package:ecommerce_int2/data/models/login.result.dart';
import 'package:ecommerce_int2/data/models/user.model.dart';
import 'package:ecommerce_int2/data/provider/auth.provider.dart';

class AuthRepository {
  final AuthProvider provider;

  AuthRepository(this.provider);

  Future<LoginResult> login(String username, password) async {
    final response = await provider.login(username, password);
    if(response.statusCode != 200) {
      throw Exception("Login failed");
    }
    final result = LoginResult.fromJson(response.body);
    return result;
  }

  Future<UserModel> getUserInfo() async {
    final response = await provider.getUserInfo();
    if(response.statusCode != 200) {
      throw Exception("Login failed");
    }
    final result = UserModel.fromJson(response.body);
    return result;
  }


}