class CategoryList {
  List<Category>? categories;

  CategoryList({this.categories});

  CategoryList.fromJson(Map<String, dynamic> json) {
    if (json['categories'] != null) {
      categories = <Category>[];
      json['categories'].forEach((v) {
        categories!.add(new Category.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.categories != null) {
      data['categories'] = this.categories!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Category {
  String? categoryId;
  String? categoryName;
  List<SubCategory>? subcategories;

  Category({this.categoryId, this.categoryName, this.subcategories});

  Category.fromJson(Map<String, dynamic> json) {
    categoryId = json['category_id'];
    categoryName = json['category_name'];
    if (json['subcategories'] != null) {
      subcategories = <SubCategory>[];
      json['subcategories'].forEach((v) {
        subcategories!.add(new SubCategory.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['category_id'] = this.categoryId;
    data['category_name'] = this.categoryName;
    if (this.subcategories != null) {
      data['subcategories'] =
          this.subcategories!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class SubCategory {
  String? sId;
  String? name;
  String? description;
  bool? isActive;
  String? category;
  String? created;
  String? slug;
  int? iV;

  SubCategory(
      {this.sId,
      this.name,
      this.description,
      this.isActive,
      this.category,
      this.created,
      this.slug,
      this.iV});

  SubCategory.fromJson(Map<String, dynamic> json) {
    sId = json['_id'];
    name = json['name'];
    description = json['description'];
    isActive = json['isActive'];
    category = json['category'];
    created = json['created'];
    slug = json['slug'];
    iV = json['__v'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['_id'] = this.sId;
    data['name'] = this.name;
    data['description'] = this.description;
    data['isActive'] = this.isActive;
    data['category'] = this.category;
    data['created'] = this.created;
    data['slug'] = this.slug;
    data['__v'] = this.iV;
    return data;
  }
}
