import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/data/repository/review.repository.dart';
import 'package:ecommerce_int2/screens/rating/review.controller.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';

import 'package:get/get.dart';

class Ratings extends StatelessWidget {
  const Ratings({Key? key, required this.product}) : super(key: key);
  final Product product;

  @override
  Widget build(BuildContext context) {
    return GetBuilder<ReviewController>(
        init: ReviewController(Get.find<ReviewRepository>(), product.sId!),
        tag: product.sId!,
        global: false,
        builder: (controller) => controller.reviewList.isEmpty
            ? SizedBox.shrink()
            : Padding(
                padding: const EdgeInsets.all(8.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Text(
                        "Reviews:",
                        style: TextStyle(fontSize: 18),
                      ),
                    ),
                    ...controller.reviewList
                        .map((val) => Container(
                            margin: const EdgeInsets.symmetric(vertical: 4.0),
                            padding: const EdgeInsets.all(8.0),
                            decoration: BoxDecoration(
                                color: Colors.white,
                                borderRadius:
                                    BorderRadius.all(Radius.circular(5.0))),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                Padding(
                                  padding: const EdgeInsets.only(right: 16.0),
                                  child: CircleAvatar(
                                    maxRadius: 14,
                                    backgroundImage:
                                        AssetImage('assets/background.jpg'),
                                  ),
                                ),
                                Expanded(
                                  child: Column(
                                    mainAxisSize: MainAxisSize.min,
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: <Widget>[
                                      Row(
                                        mainAxisAlignment:
                                            MainAxisAlignment.spaceBetween,
                                        children: <Widget>[
                                          Text(
                                            val.user?.firstName ?? "Anonymous",
                                            style: TextStyle(
                                                fontWeight: FontWeight.bold),
                                          ),
                                          Text(
                                            val.createdDate,
                                            style: TextStyle(
                                                color: Colors.grey,
                                                fontSize: 10.0),
                                          )
                                        ],
                                      ),
                                      Padding(
                                        padding: const EdgeInsets.symmetric(
                                            vertical: 8.0),
                                        child: RatingBar(
                                          ignoreGestures: true,
                                          itemSize: 20,
                                          allowHalfRating: true,
                                          initialRating:
                                              (val.rating ?? 5).toDouble(),
                                          itemPadding: EdgeInsets.symmetric(
                                              horizontal: 4.0),
                                          ratingWidget: RatingWidget(
                                            empty: Icon(Icons.favorite_border,
                                                color: Color(0xffFF8993),
                                                size: 20),
                                            full: Icon(
                                              Icons.favorite,
                                              color: Color(0xffFF8993),
                                              size: 20,
                                            ),
                                            half: SizedBox(),
                                          ),
                                          onRatingUpdate: (value) {
                                            print(value);
                                          },
                                        ),
                                      ),
                                      Text(
                                        val.review ?? "Review is hidden",
                                        style: TextStyle(
                                          color: Colors.grey,
                                        ),
                                      ),
                                      const SizedBox(height: 12)
                                    ],
                                  ),
                                )
                              ],
                            )))
                        .toList()
                  ],
                ),
              ));
  }
}
