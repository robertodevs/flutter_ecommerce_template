import 'package:ecommerce_int2/data/models/product.model.dart';
import 'package:flutter/material.dart';

class ProductCard extends StatelessWidget {
  final Product product;
  final Function onTap;

  ProductCard(this.product, this.onTap);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8.0),
      child: Card(
        child: InkWell(
            onTap: () => onTap(),
            child: Container(
                height: 200,
                width: MediaQuery.of(context).size.width / 2 - 29,
                decoration: BoxDecoration(
                    borderRadius: BorderRadius.all(Radius.circular(10)),
                    color: Color(0xfffbd085).withOpacity(0.46)),
                child: Row(
                  children: <Widget>[
                    Align(
                      alignment: Alignment.topCenter,
                      child: Container(
                        padding: EdgeInsets.all(16.0),
                        width: 180,
                        height: 180,
                        child: Image.network(
                          product.imageUrl!,
                        ),
                      ),
                    ),
                    Flexible(
                      child: Container(
                          margin: const EdgeInsets.only(left: 16.0),
                          padding: const EdgeInsets.all(8.0),
                          decoration: BoxDecoration(
                              color: Color(0xffe0450a).withOpacity(0.51),
                              borderRadius: BorderRadius.only(
                                  topLeft: Radius.circular(10),
                                  bottomLeft: Radius.circular(10))),
                          child: Text(
                            product.name ?? "Product",
                            textAlign: TextAlign.right,
                            style: TextStyle(
                              fontSize: 12.0,
                              color: Colors.white,
                            ),
                          )),
                    )
                  ],
                ))),
      ),
    );
  }
}
