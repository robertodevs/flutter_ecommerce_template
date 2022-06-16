import 'package:flutter/material.dart';
import 'package:get/get.dart';

// ignore: must_be_immutable
class RowTextWidget extends StatelessWidget {
  RowTextWidget(
      {required this.text1,
      required this.text2,
      Key? key,
      this.isBold = false,
      this.isHighlight = false})
      : super(key: key);
  final String text1;
  final String text2;
  bool isBold;
  final bool isHighlight;

  @override
  Widget build(BuildContext context) {
    TextStyle subHeader = TextStyle(fontSize: 14);
    final style = !isBold
        ? subHeader.copyWith(color: const Color(0xFF292B30))
        : subHeader.copyWith(
            color: const Color(0xFF292B30), fontWeight: FontWeight.w700);
    var textStyle = style;
    if (isHighlight) {
      textStyle = style.copyWith(fontSize: 16);
    }
    return SizedBox(
      height: 56,
      child: Center(
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(text1, style: textStyle),
            const SizedBox(width: 12),
            Container(
              constraints: BoxConstraints(maxWidth: Get.width * 0.5),
              child: Text(
                text2,
                style: textStyle,
                overflow: TextOverflow.ellipsis,
              ),
            )
          ],
        ),
      ),
    );
  }
}
