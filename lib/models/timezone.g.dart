// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'timezone.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Timezone _$TimezoneFromJson(Map<String, dynamic> json) {
  return Timezone(
    offset: json['offset'] as String,
    description: json['description'] as String,
  );
}

Map<String, dynamic> _$TimezoneToJson(Timezone instance) => <String, dynamic>{
      'offset': instance.offset,
      'description': instance.description,
    };
