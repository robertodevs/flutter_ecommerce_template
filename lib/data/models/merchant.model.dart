import 'package:ecommerce_int2/data/models/product.model.dart';

class MerchantResponse {
  bool? success;
  MerchantData? data;

  MerchantResponse({this.success, this.data});

  MerchantResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    data = json['data'] != null ? new MerchantData.fromJson(json['data']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    if (this.data != null) {
      data['data'] = this.data!.toJson();
    }
    return data;
  }
}

class MerchantData {
  Merchant? merchant;
  List<Product>? products;
  int? page;
  int? pages;
  int? totalProducts;

  MerchantData(
      {this.merchant,
        this.products,
        this.page,
        this.pages,
        this.totalProducts});

  MerchantData.fromJson(Map<String, dynamic> json) {
    merchant = json['merchant'] != null
        ? new Merchant.fromJson(json['merchant'])
        : null;
    if (json['products'] != null) {
      products = <Product>[];
      json['products'].forEach((v) {
        products!.add(new Product.fromJson(v));
      });
    }
    page = json['page'];
    pages = json['pages'];
    totalProducts = json['totalProducts'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.merchant != null) {
      data['merchant'] = this.merchant!.toJson();
    }
    if (this.products != null) {
      data['products'] = this.products!.map((v) => v.toJson()).toList();
    }
    data['page'] = this.page;
    data['pages'] = this.pages;
    data['totalProducts'] = this.totalProducts;
    return data;
  }
}

class Merchant {
  String? sId;
  String? name;
  String? email;
  String? phoneNumber;
  List<Categories>? categories;
  String? business;
  bool? isActive;
  String? status;
  String? created;
  String? slug;
  int? iV;

  Merchant(
      {this.sId,
        this.name,
        this.email,
        this.phoneNumber,
        this.categories,
        this.business,
        this.isActive,
        this.status,
        this.created,
        this.slug,
        this.iV});

  Merchant.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    email = json['email'];
    phoneNumber = json['phoneNumber'];
    if (json['categories'] != null) {
      categories = <Categories>[];
      json['categories'].forEach((v) {
        categories!.add(new Categories.fromJson(v));
      });
    }
    business = json['business'];
    isActive = json['isActive'];
    status = json['status'];
    created = json['created'];
    slug = json['slug'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['email'] = this.email;
    data['phoneNumber'] = this.phoneNumber;
    if (this.categories != null) {
      data['categories'] = this.categories!.map((v) => v.toJson()).toList();
    }
    data['business'] = this.business;
    data['isActive'] = this.isActive;
    data['status'] = this.status;
    data['created'] = this.created;
    data['slug'] = this.slug;
    data['__v'] = this.iV;
    return data;
  }
}

class Categories {
  String? sId;
  String? name;
  String? slug;
  String? image;

  Categories({this.sId, this.name, this.slug, this.image});

  Categories.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    slug = json['slug'];
    image = json['image'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['slug'] = this.slug;
    data['image'] = this.image;
    return data;
  }
}


