class ReviewResponse {
  bool? success;
  List<Review>? data;

  ReviewResponse({this.success, this.data});

  ReviewResponse.fromJson(Map<String, dynamic> json) {
    success = json['success'];
    if (json['data'] != null) {
      data = <Review>[];
      json['data'].forEach((v) {
        data!.add(new Review.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['success'] = this.success;
    if (this.data != null) {
      data['data'] = this.data!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Review {
  String? sId;
  String? product;
  User? user;
  int? rating;
  String? review;
  String? created;
  int? iV;

  Review(
      {this.sId,
        this.product,
        this.user,
        this.rating,
        this.review,
        this.created,
        this.iV});

  Review.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    product = json['product'];
    user = json['user'] != null ? new User.fromJson(json['user']) : null;
    rating = json['rating'];
    review = json['review'];
    created = json['created'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['product'] = this.product;
    if (this.user != null) {
      data['user'] = this.user!.toJson();
    }
    data['rating'] = this.rating;
    data['review'] = this.review;
    data['created'] = this.created;
    data['__v'] = this.iV;
    return data;
  }
}

class User {
  String? sId;
  String? firstName;

  User({this.sId, this.firstName});

  User.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    firstName = json['firstName'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['firstName'] = this.firstName;
    return data;
  }
}

class ReviewParam {
  String? product;
  int? rating;
  String? review;

  ReviewParam({this.product, this.rating, this.review});

  ReviewParam.fromJson(Map<String, dynamic> json) {
    product = json['product'];
    rating = json['rating'];
    review = json['review'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['product'] = this.product;
    data['rating'] = this.rating;
    data['review'] = this.review;
    return data;
  }
}

