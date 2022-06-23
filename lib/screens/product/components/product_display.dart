import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:ecommerce_int2/utils/app_properties.dart';
import 'package:flutter/material.dart';

class ProductDisplay extends StatelessWidget {
  final Product product;

  const ProductDisplay({
    required this.product,
  });
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Align(
          alignment: Alignment(-1, 0),
          child: Padding(
            padding: const EdgeInsets.only(right: 20.0, left: 20.0),
            child: Container(
              height: screenAwareSize(220, context),
              child: Stack(
                children: <Widget>[
                  Padding(
                    padding: const EdgeInsets.only(
                      bottom: 18.0,
                    ),
                    child: Container(
                      child: Hero(
                        tag: product.imageUrl!,
                        child: Image.network(
                          product.imageUrl!,
                          fit: BoxFit.contain,
                          height: 230,
                          width: 230,
                        ),
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
        Align(
          alignment: Alignment.centerRight,
            child: Container(
                width: MediaQuery.of(context).size.width / 1.5,
                height: 85,
                padding: EdgeInsets.only(right: 24),
                decoration: new BoxDecoration(
                    color: darkGrey,
                    borderRadius: BorderRadius.only(
                        topLeft: Radius.circular(8.0),
                        bottomLeft: Radius.circular(8.0)),
                    boxShadow: [
                      BoxShadow(
                          color: Color.fromRGBO(0, 0, 0, 0.16),
                          offset: Offset(0, 3),
                          blurRadius: 6.0),
                    ]),
                child: Align(
                  alignment: Alignment(1, 0),
                  child: RichText(
                      text: TextSpan(children: [
                    TextSpan(
                        text: '\$ ${product.price}',
                        style: const TextStyle(
                            color: const Color(0xFFFFFFFF),
                            fontWeight: FontWeight.w400,
                            fontFamily: "Montserrat",
                            fontSize: 36.0)),
                    TextSpan(
                        text: 'VND',
                        style: const TextStyle(
                            color: const Color(0xFFFFFFFF),
                            fontWeight: FontWeight.w400,
                            fontFamily: "Montserrat",
                            fontSize: 18.0))
                  ])),
                ))),
      ],
    );
  }
}
