import 'package:ecommerce_int2/data/models/cart.model.dart';
import 'package:intl/intl.dart';

class OrderResponse {
  bool? success;
  String? message;
  Order? order;

  OrderResponse({this.success, this.message, this.order});

  OrderResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    message = json['message'];
    order = json['data'] != null ? new Order.fromJson(json['data']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    data['message'] = this.message;
    if (this.order != null) {
      data['data'] = this.order!.toJson();
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

  String get createdDate {
    if (created == null) return '';
    final date = DateTime.tryParse(created!);
    if (date == null) return '';
    final res = DateFormat("yyyy-MM-dd HH:mm:ss aa").format(date);
    return res;
  }

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
    cart = json['cart'] is String ? json['cart']: json['cart']['_id'];
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
    orderDoc =
        json['data'] != null ? new OrderDoc.fromJson(json['data']) : null;
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
    orderDoc =
        json['data'] != null ? new OrderDocDetail.fromJson(json['data']) : null;
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

  String get createdDate {
    if (created == null) return '';
    final date = DateTime.tryParse(created!);
    if (date == null) return '';
    final res = DateFormat("yyyy-MM-dd HH:mm:ss aa").format(date);
    return res;
  }

  bool get isPayWithCash => payment == 'CASH' && canCancel;

  bool get canCancel => !(status == 'CANCLED' || status == 'RECEIVED') ;

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

class OrderProceed {
  bool? success;
  Data? data;

  OrderProceed({this.success, this.data});

  OrderProceed.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    data = json['data'] != null ? new Data.fromJson(json['data']) : null;
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

class Data {
  Order? order;
  Payment? payment;

  Data({this.order, this.payment});

  Data.fromJson(Map<String, dynamic> json) {
    order = json['order'] != null ? new Order.fromJson(json['order']) : null;
    payment =
    json['payment'] != null ? new Payment.fromJson(json['payment']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.order != null) {
      data['order'] = this.order!.toJson();
    }
    if (this.payment != null) {
      data['payment'] = this.payment!.toJson();
    }
    return data;
  }
}


class Payment {
  String? id;
  String? intent;
  String? state;
  Payer? payer;
  List<Transactions>? transactions;
  String? createTime;
  List<Links>? links;
  int? httpStatusCode;

  Payment(
      {this.id,
        this.intent,
        this.state,
        this.payer,
        this.transactions,
        this.createTime,
        this.links,
        this.httpStatusCode});

  Payment.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    intent = json['intent'];
    state = json['state'];
    payer = json['payer'] != null ? new Payer.fromJson(json['payer']) : null;
    if (json['transactions'] != null) {
      transactions = <Transactions>[];
      json['transactions'].forEach((v) {
        transactions!.add(new Transactions.fromJson(v));
      });
    }
    createTime = json['create_time'];
    if (json['links'] != null) {
      links = <Links>[];
      json['links'].forEach((v) {
        links!.add(new Links.fromJson(v));
      });
    }
    httpStatusCode = json['httpStatusCode'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['intent'] = this.intent;
    data['state'] = this.state;
    if (this.payer != null) {
      data['payer'] = this.payer!.toJson();
    }
    if (this.transactions != null) {
      data['transactions'] = this.transactions!.map((v) => v.toJson()).toList();
    }
    data['create_time'] = this.createTime;
    if (this.links != null) {
      data['links'] = this.links!.map((v) => v.toJson()).toList();
    }
    data['httpStatusCode'] = this.httpStatusCode;
    return data;
  }
}

class Payer {
  String? paymentMethod;

  Payer({this.paymentMethod});

  Payer.fromJson(Map<String, dynamic> json) {
    paymentMethod = json['payment_method'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['payment_method'] = this.paymentMethod;
    return data;
  }
}

class Transactions {
  Amount? amount;
  String? description;
  List<dynamic>? relatedResources;

  Transactions({this.amount, this.description, this.relatedResources});

  Transactions.fromJson(Map<String, dynamic> json) {
    amount =
    json['amount'] != null ? new Amount.fromJson(json['amount']) : null;
    description = json['description'];
    if (json['related_resources'] != null) {
      relatedResources = <Null>[];
      json['related_resources'].forEach((v) {
        relatedResources!.add(v);
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.amount != null) {
      data['amount'] = this.amount!.toJson();
    }
    data['description'] = this.description;
    if (this.relatedResources != null) {
      data['related_resources'] =
          this.relatedResources!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Amount {
  String? total;
  String? currency;

  Amount({this.total, this.currency});

  Amount.fromJson(Map<String, dynamic> json) {
    total = json['total'];
    currency = json['currency'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['total'] = this.total;
    data['currency'] = this.currency;
    return data;
  }
}

class Links {
  String? href;
  String? rel;
  String? method;

  Links({this.href, this.rel, this.method});

  Links.fromJson(Map<String, dynamic> json) {
    href = json['href'];
    rel = json['rel'];
    method = json['method'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['href'] = this.href;
    data['rel'] = this.rel;
    data['method'] = this.method;
    return data;
  }
}

