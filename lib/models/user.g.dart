// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) {
  return User(
    gender: json['gender'] as String,
    name: Name.fromJson(json['name'] as Map<String, dynamic>),
    location: Location.fromJson(json['location'] as Map<String, dynamic>),
    email: json['email'] as String,
    login: Login.fromJson(json['login'] as Map<String, dynamic>),
    dob: Dob.fromJson(json['dob'] as Map<String, dynamic>),
    registered: Registered.fromJson(json['registered'] as Map<String, dynamic>),
    phone: json['phone'] as String,
    cell: json['cell'] as String,
    id: Id.fromJson(json['id'] as Map<String, dynamic>),
    picture: Picture.fromJson(json['picture'] as Map<String, dynamic>),
    nat: json['nat'] as String,
  );
}

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'gender': instance.gender,
      'name': instance.name,
      'location': instance.location,
      'email': instance.email,
      'login': instance.login,
      'dob': instance.dob,
      'registered': instance.registered,
      'phone': instance.phone,
      'cell': instance.cell,
      'id': instance.id,
      'picture': instance.picture,
      'nat': instance.nat,
    };
