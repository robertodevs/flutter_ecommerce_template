import 'dart:io';
import 'package:dio/dio.dart';
import 'package:ecommerce_int2/app_properties.dart';
import 'package:ecommerce_int2/services/auth.service.dart';
import 'package:get_storage/get_storage.dart';

class DioInterceptors extends InterceptorsWrapper {
  final _store = GetStorage();

  final AuthService authService;

  DioInterceptors(this.authService);

  @override
  Future onRequest(
      RequestOptions options, RequestInterceptorHandler handler) async {
    String? token = _store.read(accessToken);
    if (token != null && token.isNotEmpty) {
      options.headers.addAll({
        HttpHeaders.authorizationHeader: 'Bearer $token',
      });
    }

    handler.next(options);
  }

  @override
  void onError(DioError err, ErrorInterceptorHandler handler) {
    if (err.response?.statusCode == 401) {
      authService.logout();
    }
    super.onError(err, handler);
  }
}
