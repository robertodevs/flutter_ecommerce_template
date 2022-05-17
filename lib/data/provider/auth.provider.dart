import 'package:ecommerce_int2/data/models/login.result.dart';
import 'package:ecommerce_int2/services/network.service.dart';

class AuthProvider {
  final NetWorkService networkService;

  AuthProvider(this.networkService);

  final String loginUrl = 'https://ecommerce-api-dut.herokuapp.com/api/auth/login';
  final String userInfoUrl = 'https://ecommerce-api-dut.herokuapp.com/api/user';

  Future<HttpResponse> login(String username, String password) {
    return networkService.post(loginUrl, data: {"email": username, "password": password});
  }

  Future<HttpResponse> getUserInfo() {
    return networkService.get(userInfoUrl);
  }

}