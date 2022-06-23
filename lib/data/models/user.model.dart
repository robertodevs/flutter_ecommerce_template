import 'package:json_annotation/json_annotation.dart';
part 'user.model.g.dart';

@JsonSerializable()
class UserModel {
  final String? id;
  final String? firstName;
  final String? lastName;
  final String? email;
  final String? role;
  final String? resetToken;

  String get name => (firstName ?? '') + ' ' + (lastName ?? '');

  UserModel(this.id, this.firstName, this.lastName, this.email, this.role, this.resetToken);

  factory UserModel.fromJson(Map<String, dynamic> json) =>
      _$UserModelFromJson(json);

  Map<String, dynamic> toJson() => _$UserModelToJson(this);
}
