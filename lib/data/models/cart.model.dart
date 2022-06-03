import 'package:ecommerce_int2/data/models/product.model.dart';

class CartResponse {
  bool? success;
  String? message;
  List<CartModel>? data;

  CartResponse({this.success, this.message, this.data});

  CartResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    message = json['message'];
    if (json['data'] != null) {
      data = <CartModel>[];
      json['data'].forEach((v) {
        data!.add(new CartModel.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    data['message'] = this.message;
    if (this.data != null) {
      data['data'] = this.data!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class CartModel {
  String? sId;
  List<Product>? products;
  String? user;
  String? merchant;
  int? total;
  bool? isOrdered;
  String? created;
  int? iV;

  CartModel(
      {this.sId,
      this.products,
      this.user,
      this.merchant,
      this.total,
      this.isOrdered,
      this.created,
      this.iV});

  CartModel.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    if (json['products'] != null) {
      products = <Product>[];
      json['products'].forEach((v) {
        products!.add(new Product.fromJson(v));
      });
    }
    user = json['user'];
    merchant = json['merchant'];
    total = json['total'];
    isOrdered = json['isOrdered'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    if (this.products != null) {
      data['products'] = this.products!.map((v) => v.toJson()).toList();
    }
    data['user'] = this.user;
    data['merchant'] = this.merchant;
    data['total'] = this.total;
    data['isOrdered'] = this.isOrdered;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}

