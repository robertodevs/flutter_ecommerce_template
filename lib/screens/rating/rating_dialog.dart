import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/review.repository.dart';
import 'package:ecommerce_int2/screens/rating/review.controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:get/get.dart';

class RatingDialog extends StatelessWidget {
  final Product product;

  const RatingDialog({Key? key, required this.product}) : super(key: key);
  @override
  Widget build(BuildContext context) {

    return GetBuilder<ReviewController>(
      init: ReviewController(Get.find<ReviewRepository>(), product.sId!),
      tag: product.sId!,
      global: false,
      builder: (controller) => SingleChildScrollView(
        physics: ClampingScrollPhysics(),
        child: Container(
            decoration: BoxDecoration(
                borderRadius: BorderRadius.all(Radius.circular(10)),
                color: Colors.grey[50]),
            padding: EdgeInsets.all(24.0),
            child: Column(mainAxisSize: MainAxisSize.min, children: [
              Text(
                'Thank You!',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 16.0),
                child: RichText(
                  text: TextSpan(
                      style: TextStyle(
                          fontFamily: 'Montserrat', color: Colors.grey),
                      children: [
                        TextSpan(
                          text: 'You rated ',
                        ),
                        TextSpan(
                            text: product.name,
                            style: TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.grey[600]))
                      ]),
                ),
              ),
              RatingBar(
                itemSize: 32,
                allowHalfRating: false,
                initialRating: 1,
                itemPadding: EdgeInsets.symmetric(horizontal: 4.0),
                onRatingUpdate: (value) {
                  controller.updateRating(value.toInt());
                },
                ratingWidget: RatingWidget(
                  empty: Icon(Icons.favorite_border,
                      color: Color(0xffFF8993), size: 20),
                  full: Icon(
                    Icons.favorite,
                    color: Color(0xffFF8993),
                    size: 20,
                  ),
                  half: SizedBox(),
                ),
              ),
              Container(
                  margin: EdgeInsets.symmetric(vertical: 16.0),
                  padding: EdgeInsets.all(16.0),
                  decoration: BoxDecoration(
                      color: Colors.grey[200],
                      borderRadius: BorderRadius.all(Radius.circular(5))),
                  child: TextField(
                    controller: controller.textEditingController,
                    decoration: InputDecoration(
                        border: InputBorder.none,
                        contentPadding: EdgeInsets.zero,
                        hintText: 'Say something about the product.'),
                    style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                    maxLength: 200,
                  )),
            ])),
      ),
    );
  }
}
