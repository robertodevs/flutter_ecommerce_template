class Product {
  List<Products>? products;
  int? page;
  int? pages;
  int? totalProducts;

  Product({this.products, this.page, this.pages, this.totalProducts});

  Product.fromJson(Map<String, dynamic> json) {
    if (json['products'] != null) {
      products = <Products>[];
      json['products'].forEach((v) {
        products!.add(new Products.fromJson(v));
      });
    }
    page = json['page'];
    pages = json['pages'];
    totalProducts = json['totalProducts'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.products != null) {
      data['products'] = this.products!.map((v) => v.toJson()).toList();
    }
    data['page'] = this.page;
    data['pages'] = this.pages;
    data['totalProducts'] = this.totalProducts;
    return data;
  }
}

class Products {
  String? sId;
  String? name;
  String? imageUrl;
  String? imageKey;
  String? description;
  int? quantity;
  int? price;
  bool? isActive;
  String? merchant;
  String? category;
  String? subcategory;
  String? created;
  String? slug;
  int? iV;
  int? totalRatings;
  int? totalReviews;
  int? averageRating;

  Products(
      {this.sId,
      this.name,
      this.imageUrl,
      this.imageKey,
      this.description,
      this.quantity,
      this.price,
      this.isActive,
      this.merchant,
      this.category,
      this.subcategory,
      this.created,
      this.slug,
      this.iV,
      this.totalRatings,
      this.totalReviews,
      this.averageRating});

  Products.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    imageUrl = json['imageUrl'];
    imageKey = json['imageKey'];
    description = json['description'];
    quantity = json['quantity'];
    price = json['price'];
    isActive = json['isActive'];
    merchant = json['merchant'];
    category = json['category'];
    subcategory = json['subcategory'];
    created = json['created'];
    slug = json['slug'];
    iV = json['__v'];
    totalRatings = json['totalRatings'];
    totalReviews = json['totalReviews'];
    averageRating = json['averageRating'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['imageUrl'] = this.imageUrl;
    data['imageKey'] = this.imageKey;
    data['description'] = this.description;
    data['quantity'] = this.quantity;
    data['price'] = this.price;
    data['isActive'] = this.isActive;
    data['merchant'] = this.merchant;
    data['category'] = this.category;
    data['subcategory'] = this.subcategory;
    data['created'] = this.created;
    data['slug'] = this.slug;
    data['__v'] = this.iV;
    data['totalRatings'] = this.totalRatings;
    data['totalReviews'] = this.totalReviews;
    data['averageRating'] = this.averageRating;
    return data;
  }
}

class ProductFilter {
  SortOrder? sortOrder;
  int? rating;
  int? max;
  int? min;
  String? subcategory;
  int? order;
  int? pageNumber;

  ProductFilter(
      {this.sortOrder,
      this.rating,
      this.max,
      this.min,
      this.subcategory,
      this.order,
      this.pageNumber});

  ProductFilter.fromJson(Map<String, dynamic> json) {
    sortOrder = json['sortOrder'] != null
        ? new SortOrder.fromJson(json['sortOrder'])
        : null;
    rating = json['rating'];
    max = json['max'];
    min = json['min'];
    subcategory = json['subcategory'];
    order = json['order'];
    pageNumber = json['pageNumber'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.sortOrder != null) {
      data['sortOrder'] = this.sortOrder!.toJson();
    }
    data['rating'] = this.rating;
    data['max'] = this.max;
    data['min'] = this.min;
    data['subcategory'] = this.subcategory;
    data['order'] = this.order;
    data['pageNumber'] = this.pageNumber;
    return data;
  }
}

class SortOrder {
  int? iId;

  SortOrder({this.iId});

  SortOrder.fromJson(Map<String, dynamic> json) {
    iId = json['_id'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.iId;
    return data;
  }
}
