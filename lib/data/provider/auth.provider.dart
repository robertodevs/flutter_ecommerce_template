import 'package:ecommerce_int2/data/models/login.result.dart';
import 'package:ecommerce_int2/services/network.service.dart';

class AuthProvider {
  final NetWorkService networkService;

  AuthProvider(this.networkService);

  final String loginUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/auth/login';
  final String registerUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/auth/register';
  final String forgotUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/auth/forgot';
  final String userInfoUrl = 'https://ecommerce-api-dut.herokuapp.com/api/user';

  Future<HttpResponse> login(String username, String password) {
    return networkService
        .post(loginUrl, data: {"email": username, "password": password});
  }

  Future<HttpResponse> getUserInfo() {
    return networkService.get(userInfoUrl);
  }

  Future<HttpResponse> register(
      String username, String password, String firstName, String lastName) {
    return networkService.post(registerUrl, data: {
      "email": username,
      "password": password,
      "firstName": firstName,
      "lastName": lastName
    });
  }

  Future<HttpResponse> forgotPassword(
      String email) {
    return networkService.post(forgotUrl, data: {
      "email": email
    });
  }
}
