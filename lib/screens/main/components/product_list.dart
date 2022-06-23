import 'package:card_swiper/card_swiper.dart';
import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/screens/rating/rating_dialog.dart';
import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:ecommerce_int2/screens/product/product_page.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

// ignore: must_be_immutable
class ProductListView extends StatelessWidget {
  List<Product> products;

  final SwiperController swiperController = SwiperController();

  ProductListView({required this.products});

  @override
  Widget build(BuildContext context) {
    double cardHeight = MediaQuery.of(context).size.height / 2.7;
    double cardWidth = MediaQuery.of(context).size.width / 1.8;

    return SizedBox(
      height: cardHeight,
      child: Swiper(
        itemCount: products.length,
        itemBuilder: (_, index) {
          return ProductCard(
              height: cardHeight, width: cardWidth, product: products[index]);
        },
        scale: 0.8,
        controller: swiperController,
        viewportFraction: 0.6,
        loop: false,
        fade: 0.5,
        pagination: SwiperCustomPagination(
          builder: (context, config) {
            if (config!.itemCount! > 20) {
              print(
                  "The itemCount is too big, we suggest use FractionPaginationBuilder instead of DotSwiperPaginationBuilder in this sitituation");
            }
            Color activeColor = mediumYellow;
            Color color = Colors.grey.withOpacity(.3);
            double size = 10.0;
            double space = 5.0;

            if (config.indicatorLayout != PageIndicatorLayout.NONE &&
                config.layout == SwiperLayout.DEFAULT) {
              return new PageIndicator(
                count: config.itemCount!,
                controller: config.pageController!,
                layout: config.indicatorLayout,
                size: size,
                activeColor: activeColor,
                color: color,
                space: space,
              );
            }

            List<Widget> dots = [];

            int itemCount = config.itemCount!;
            int activeIndex = config.activeIndex!;

            for (int i = 0; i < itemCount; ++i) {
              bool active = i == activeIndex;
              dots.add(Container(
                key: Key("pagination_$i"),
                margin: EdgeInsets.all(space),
                child: ClipOval(
                  child: Container(
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      color: active ? activeColor : color,
                    ),
                    width: size,
                    height: size,
                  ),
                ),
              ));
            }

            return Padding(
              padding: const EdgeInsets.all(16.0),
              child: Align(
                alignment: Alignment.centerLeft,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: dots,
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}

class ProductCard extends StatelessWidget {
  final Product product;
  final double height;
  final double width;
  final bool hasReceived;

  const ProductCard({
    required this.product,
    required this.height,
    required this.width,
    this.hasReceived = false,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () => Navigator.of(context).push(
          MaterialPageRoute(builder: (_) => ProductPage(product: product))),
      child: Container(
        margin: const EdgeInsets.symmetric(vertical: 8),
        height: height,
        width: Get.width,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.all(Radius.circular(8)),
          color: mediumYellow,
        ),
        child: Row(children: [
          Hero(
            tag: product.sId!,
            child: Image.network(
              product.imageUrl!,
              height: 130,
              width: 130,
              fit: BoxFit.contain,
            ),
          ),
          Expanded(
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: <Widget>[
                  Text(
                    product.name ?? "",
                    style: TextStyle(color: Colors.white, fontSize: 16.0),
                  ),
                  Container(
                    padding: const EdgeInsets.fromLTRB(8.0, 4.0, 12.0, 4.0),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(10),
                          bottomLeft: Radius.circular(10)),
                      color: Color.fromRGBO(224, 69, 10, 1),
                    ),
                    child: Text(
                      '\$${product.price ?? product.purchasePrice ?? 0}',
                      style: TextStyle(
                          color: Colors.white,
                          fontSize: 18,
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                  if (hasReceived)
                    Align(
                      alignment: Alignment.centerRight,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: GestureDetector(
                            child: Text('Add review', style: TextStyle(color: Colors.white),),
                            onTap: () {
                              showDialog(
                                context: context,
                                builder: (BuildContext context) {
                                  return Dialog(
                                    shape: BeveledRectangleBorder(
                                        borderRadius: BorderRadius.all(
                                            Radius.circular(10))),
                                    child: RatingDialog(product: product),
                                  );
                                },
                              );
                            }),
                      ),
                    )
                ],
              ),
            ),
          ),
        ]),
      ),
    );
  }
}
