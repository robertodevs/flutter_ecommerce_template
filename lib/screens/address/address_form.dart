import 'package:ecommerce_int2/data/models/address.model.dart';
import 'package:flutter/material.dart';

class AddAddressForm extends StatelessWidget {
  final Address address;

  final TextEditingController addr;
  final TextEditingController city;

  const AddAddressForm(
      {Key? key,
      required this.address,
      required this.addr,
      required this.city})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Text("Address"),
          Container(
            padding: EdgeInsets.only(left: 16.0, top: 8.0, bottom: 4.0),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(5)),
              color: Colors.white,
            ),
            child: TextField(
              controller: addr,
              decoration: InputDecoration(
                  border: InputBorder.none, hintText: address.address),
            ),
          ),
          const SizedBox(height: 16,),
          Text("City"),
          Container(
            padding: EdgeInsets.only(left: 16.0, top: 8.0, bottom: 4.0),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(5)),
              color: Colors.white,
            ),
            child: TextField(
              controller: city,
              decoration: InputDecoration(
                  border: InputBorder.none, hintText: address.city),
            ),
          ),
        ],
      ),
    );
  }
}
