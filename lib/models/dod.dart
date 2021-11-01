import 'package:json_annotation/json_annotation.dart';
part 'dod.g.dart';

@JsonSerializable()
class Dob {
  String date;
  int age;

  Dob({required this.date, required this.age});

  factory Dob.fromJson(Map<String, dynamic> json) => _$DobFromJson(json);

  Map<String, dynamic> toJson() => _$DobToJson(this);
}
