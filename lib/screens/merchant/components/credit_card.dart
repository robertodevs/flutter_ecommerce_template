import 'package:flutter/material.dart';

class CreditCard extends StatelessWidget {
  final String text;

  const CreditCard({Key? key,required this.text}) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return  Container(
      height: 50,
      width: 250,
      padding: EdgeInsets.all(16.0),
      decoration: BoxDecoration(
          color: Colors.deepPurple[700],
          borderRadius: BorderRadius.all(Radius.circular(10))),
      child: Center(
        child: Text(
              text,
              style: TextStyle(color: Colors.white),
            ),
      ),
    );
  }
}
