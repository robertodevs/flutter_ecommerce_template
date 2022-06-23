class PaymentResponse {
  bool? success;
  String? message;
  Data? data;

  PaymentResponse({this.success, this.message, this.data});

  PaymentResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    message = json['message'];
    data = json['data'] != null ? new Data.fromJson(json['data']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    data['message'] = this.message;
    if (this.data != null) {
      data['data'] = this.data!.toJson();
    }
    return data;
  }
}

class Data {
  String? id;
  String? intent;
  String? state;
  Payer? payer;
  List<Transactions>? transactions;
  String? createTime;
  List<Links>? links;
  int? httpStatusCode;

  Data(
      {this.id,
      this.intent,
      this.state,
      this.payer,
      this.transactions,
      this.createTime,
      this.links,
      this.httpStatusCode});

  Data.fromJson(Map<String, dynamic> json) {
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

  Transactions({this.amount, this.description});

  Transactions.fromJson(Map<String, dynamic> json) {
    amount =
        json['amount'] != null ? new Amount.fromJson(json['amount']) : null;
    description = json['description'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.amount != null) {
      data['amount'] = this.amount!.toJson();
    }
    data['description'] = this.description;
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
