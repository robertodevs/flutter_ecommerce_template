class Address {
  String? id;
  String? address;
  String? city;
  String? country;
  String? zipCode;
  bool? isDefault;

  Address(
      {this.id,
      this.address,
      this.city,
      this.country = "Viet Name",
      this.zipCode = "+84",
      this.isDefault = false});

  Address.fromJson(Map<String, dynamic> json) {
    id = json['_id'];
    address = json['address'];
    city = json['city'];
    country = json['country'];
    zipCode = json['zipCode'];
    isDefault = json['isDefault'] ?? false;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['address'] = this.address;
    data['city'] = this.city;
    data['country'] = this.country;
    data['zipCode'] = this.zipCode;
    data['isDefault'] = this.isDefault;
    return data;
  }
}
