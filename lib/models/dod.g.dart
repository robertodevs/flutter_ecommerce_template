// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'dod.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Dob _$DobFromJson(Map<String, dynamic> json) {
  return Dob(
    date: json['date'] as String,
    age: json['age'] as int,
  );
}

Map<String, dynamic> _$DobToJson(Dob instance) => <String, dynamic>{
      'date': instance.date,
      'age': instance.age,
    };
