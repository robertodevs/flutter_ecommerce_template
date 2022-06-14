import 'package:ecommerce_int2/screens/shop/check_out_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:get/get.dart';

class CartButton extends StatelessWidget {
  const CartButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return IconButton(
            icon: SvgPicture.asset('assets/icons/cart_icon.svg'),
            onPressed: () {
              Get.to(() => CheckOutPage());
            },
          );
  }
}