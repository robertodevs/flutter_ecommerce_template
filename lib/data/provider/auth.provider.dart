import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:ecommerce_int2/data/models/user.model.dart';
import 'package:ecommerce_int2/services/network.service.dart';
import 'package:get_storage/get_storage.dart';

class AuthProvider {
  final NetWorkService networkService;

  final GetStorage storage = GetStorage();

  AuthProvider(this.networkService);

  final String loginUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/auth/login';
  final String registerUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/auth/register';
  final String forgotUrl =
      'https://ecommerce-api-dut.herokuapp.com/api/auth/forgot';
  final String reset = 'https://ecommerce-api-dut.herokuapp.com/api/auth/reset';
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

  Future<HttpResponse> forgotPassword(String email) {
    return networkService.post(forgotUrl, data: {"email": email});
  }

  Future<HttpResponse> resetPassword(String password) {
    final json = storage.read(user);
    final u = UserModel.fromJson(json);
    if (u.resetToken == null) throw Exception('Reset token is not available');
    return networkService
        .post('$reset/${u.resetToken}', data: {"password": password});
  }
}
