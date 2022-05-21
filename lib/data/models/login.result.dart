import 'package:ecommerce_int2/data/models/user.model.dart';
import 'package:json_annotation/json_annotation.dart';
part 'login.result.g.dart';

@JsonSerializable(explicitToJson: true)
class LoginResult {
  final String token;
  final bool success;
  final UserModel user;

  LoginResult(this.token, this.success, this.user);

  
  factory LoginResult.fromJson(Map<String, dynamic> json) =>
     _$LoginResultFromJson(json);

  Map<String, dynamic> toJson() => _$LoginResultToJson(this);
}