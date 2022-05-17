// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'login.result.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

LoginResult _$LoginResultFromJson(Map<String, dynamic> json) {
  return LoginResult(
    json['token'] as String,
    json['success'] as bool,
    UserModel.fromJson(json['user'] as Map<String, dynamic>),
  );
}

Map<String, dynamic> _$LoginResultToJson(LoginResult instance) =>
    <String, dynamic>{
      'token': instance.token,
      'success': instance.success,
      'user': instance.user.toJson(),
    };
