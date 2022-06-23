import 'package:ecommerce_int2/data/models/review.dart';
import 'package:ecommerce_int2/data/repository/review.repository.dart';
import 'package:ecommerce_int2/utils/message_dialog.dart';
import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';

class ReviewController extends GetxController {
  final ReviewRepository repository;
  final String productId;

  final TextEditingController textEditingController = TextEditingController();

  ReviewController(this.repository, this.productId);

  ReviewParam param = ReviewParam(rating: 5);

  @override
  onInit() {
    getReview();
    super.onInit();
  }

  void updateRating(int value) {
    param.rating = value;
  }

  void addReview() async {
    try {
      ReviewParam param = ReviewParam(
          product: productId, review: textEditingController.text.trim());
      await repository.addReview(param);
      MessageDialog.showToast("Thank you for your review");
      Get.back();
    } on Exception catch (e) {
      print(e);
    }
  }

  List<Review>? reviews;

  List<Review> get reviewList => reviews ?? [];

  void getReview() async {
    final res = await repository.getReviewProduct(productId);
    reviews = res;
    update();
  }
}
