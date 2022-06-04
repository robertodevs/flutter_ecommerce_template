class ProductList {
  List<Product>? products;
  int? page;
  int? pages;
  int? totalProducts;

  List<Product> get random => [products!.first, products!.last, products![1]];

  ProductList({this.products, this.page, this.pages, this.totalProducts});

  ProductList.fromJson(Map<String, dynamic> json) {
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
    if (this.products != null) {
      data['products'] = this.products!.map((v) => v.toJson()).toList();
    }
    data['page'] = this.page;
    data['pages'] = this.pages;
    data['totalProducts'] = this.totalProducts;
    return data;
  }
}

class Product {
  String? sId;
  String? name;
  String? imageUrl;
  String? imageKey;
  String? description;
  int? quantity;
  int? price;
  int? purchasePrice;
  int? totalPrice;
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

  Product(
      {this.sId,
      this.name,
      this.imageUrl,
      this.imageKey,
      this.description,
      this.quantity,
      this.price,
      this.purchasePrice,
      this.totalPrice,
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

  Product.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    imageUrl = json['imageUrl'];
    imageKey = json['imageKey'];
    description = json['description'];
    quantity = json['quantity'];
    price = json['price'];
    purchasePrice = json['purchasePrice'];
    totalPrice = json['totalPrice'];
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
    data['purchasePrice'] = this.purchasePrice;
    data['totalPrice'] = this.totalPrice;
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
  String? name;
  String? merchant;
  int? order;
  int? pageNumber;

  ProductFilter(
      {this.sortOrder,
      this.rating,
      this.max,
      this.min,
      this.subcategory,
      this.name,
      this.merchant,
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
    data['name'] = this.name ?? '';
    data['merchant'] = this.merchant;
    data['order'] = this.order;
    data['pageNumber'] = this.pageNumber;
    return data;
  }
}

class SortOrder {
  int? price;

  SortOrder({this.price});

  SortOrder.fromJson(Map<String, dynamic> json) {
    price = json['_id'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['price'] = this.price;
    return data;
  }
}

class AddProductParam {
  List<ProductParam>? products;

  AddProductParam({this.products});

  AddProductParam.fromJson(Map<String, dynamic> json) {
    if (json['products'] != null) {
      products = <ProductParam>[];
      json['products'].forEach((v) {
        products!.add(new ProductParam.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.products != null) {
      data['products'] = this.products!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class ProductParam {
  String? product;
  int? quantity;
  int? price;
  String? merchant;

  ProductParam({this.product, this.quantity, this.price, this.merchant});

  ProductParam.fromJson(Map<String, dynamic> json) {
    product = json['product'];
    quantity = json['quantity'];
    price = json['price'];
    merchant = json['merchant'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['product'] = this.product;
    data['quantity'] = this.quantity;
    data['price'] = this.price;
    data['merchant'] = this.merchant;
    return data;
  }
}
