import 'package:ecommerce_int2/data/models/cart.model.dart';

class OrderResponse {
  bool? success;
  String? message;
  Order? order;

  OrderResponse({this.success, this.message, this.order});

  OrderResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    message = json['message'];
    order = json['order'] != null ? new Order.fromJson(json['order']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    data['message'] = this.message;
    if (this.order != null) {
      data['order'] = this.order!.toJson();
    }
    return data;
  }
}

class Order {
  String? cart;
  String? user;
  String? merchant;
  String? payment;
  String? otherAddress;
  String? phoneNumber;
  String? status;
  String? paymentStatus;
  String? sId;
  String? created;
  int? iV;

  Order(
      {this.cart,
      this.user,
      this.merchant,
      this.payment,
      this.otherAddress,
      this.phoneNumber,
      this.status,
      this.paymentStatus,
      this.sId,
      this.created,
      this.iV});

  Order.fromJson(Map<String, dynamic> json) {
    cart = json['cart'];
    user = json['user'];
    merchant = json['merchant'];
    payment = json['payment'];
    otherAddress = json['otherAddress'];
    phoneNumber = json['phoneNumber'];
    status = json['status'];
    paymentStatus = json['paymentStatus'];
    sId = json['_id'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['cart'] = this.cart;
    data['user'] = this.user;
    data['merchant'] = this.merchant;
    data['payment'] = this.payment;
    data['otherAddress'] = this.otherAddress;
    data['phoneNumber'] = this.phoneNumber;
    data['status'] = this.status;
    data['paymentStatus'] = this.paymentStatus;
    data['_id'] = this.sId;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}

class CompleteOrderParam {
  String? address;
  String? otherAddress;
  String? phoneNumber;
  String? payment;

  CompleteOrderParam(
      {this.address, this.otherAddress, this.phoneNumber, this.payment});

  CompleteOrderParam.fromJson(Map<String, dynamic> json) {
    address = json['address'];
    otherAddress = json['otherAddress'];
    phoneNumber = json['phoneNumber'];
    payment = json['payment'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['address'] = this.address;
    data['otherAddress'] = this.otherAddress;
    data['phoneNumber'] = this.phoneNumber;
    data['payment'] = this.payment;
    return data;
  }
}

class CompleteOrderResponse {
  bool? success;
  String? message;
  OrderDoc? orderDoc;

  CompleteOrderResponse({this.success, this.message, this.orderDoc});

  CompleteOrderResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    message = json['message'];
    orderDoc = json['data'] != null
        ? new OrderDoc.fromJson(json['data'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    data['message'] = this.message;
    if (this.orderDoc != null) {
      data['data'] = this.orderDoc!.toJson();
    }
    return data;
  }
}

class OrderDoc {
  String? sId;
  String? cart;
  String? user;
  String? merchant;
  String? payment;
  String? otherAddress;
  String? phoneNumber;
  String? status;
  String? paymentStatus;
  String? created;
  int? iV;

  OrderDoc(
      {this.sId,
      this.cart,
      this.user,
      this.merchant,
      this.payment,
      this.otherAddress,
      this.phoneNumber,
      this.status,
      this.paymentStatus,
      this.created,
      this.iV});

  OrderDoc.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    cart = json['cart'];
    user = json['user'];
    merchant = json['merchant'];
    payment = json['payment'];
    otherAddress = json['otherAddress'];
    phoneNumber = json['phoneNumber'];
    status = json['status'];
    paymentStatus = json['paymentStatus'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['cart'] = this.cart;
    data['user'] = this.user;
    data['merchant'] = this.merchant;
    data['payment'] = this.payment;
    data['otherAddress'] = this.otherAddress;
    data['phoneNumber'] = this.phoneNumber;
    data['status'] = this.status;
    data['paymentStatus'] = this.paymentStatus;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}

class AllOrderResponse {
  bool? success;
  List<Order>? orders;

  AllOrderResponse({this.success, this.orders});

  AllOrderResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    if (json['data'] != null) {
      orders = <Order>[];
      json['data'].forEach((v) {
        orders!.add(new Order.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    if (this.orders != null) {
      data['data'] = this.orders!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class DetailOrderResponse {
  bool? success;
  OrderDocDetail? orderDoc;

  DetailOrderResponse({this.success, this.orderDoc});

  DetailOrderResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    orderDoc = json['data'] != null
        ? new OrderDocDetail.fromJson(json['data'])
        : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    if (this.orderDoc != null) {
      data['data'] = this.orderDoc!.toJson();
    }
    return data;
  }
}

class OrderDocDetail {
  String? sId;
  CartModel? cart;
  String? user;
  String? merchant;
  String? payment;
  String? phoneNumber;
  String? status;
  String? paymentStatus;
  String? created;
  int? iV;
  String? address;

  bool get isPayWithCash => payment == 'CASH';

  bool get canCancel => status == 'NOT_PROCESS';

  OrderDocDetail(
      {this.sId,
      this.cart,
      this.user,
      this.merchant,
      this.payment,
      this.phoneNumber,
      this.status,
      this.paymentStatus,
      this.created,
      this.iV,
      this.address});

  OrderDocDetail.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    cart = json['cart'] != null ? new CartModel.fromJson(json['cart']) : null;
    user = json['user']['_id'];
    merchant = json['merchant'];
    payment = json['payment'];
    phoneNumber = json['phoneNumber'];
    status = json['status'];
    paymentStatus = json['paymentStatus'];
    created = json['created'];
    iV = json['__v'];
    address = json['address'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    if (this.cart != null) {
      data['cart'] = this.cart!.toJson();
    }
    data['user'] = this.user;
    data['merchant'] = this.merchant;
    data['payment'] = this.payment;
    data['phoneNumber'] = this.phoneNumber;
    data['status'] = this.status;
    data['paymentStatus'] = this.paymentStatus;
    data['created'] = this.created;
    data['__v'] = this.iV;
    data['address'] = this.address;
    return data;
  }
}