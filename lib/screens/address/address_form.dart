import 'package:ecommerce_int2/data/models/address.model.dart';
import 'package:flutter/material.dart';

class AddAddressForm extends StatelessWidget {
  final Address address;

  final TextEditingController addr;
  final TextEditingController city;
  final TextEditingController phone;

  const AddAddressForm(
      {Key? key,
      required this.address,
      required this.addr,
      required this.phone,
      required this.city})
      : super(key: key);
  @override
  Widget build(BuildContext context) {
    return Flexible(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text("Address"),
          ),
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
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text("City"),
          ),
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
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text("Phone number"),
          ),
          Container(
            padding: EdgeInsets.only(left: 16.0, top: 8.0, bottom: 4.0),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(5)),
              color: Colors.white,
            ),
            child: TextField(
              controller: phone,
              decoration: InputDecoration(
                  border: InputBorder.none, hintText: address.city),
            ),
          ),
        ],
      ),
    );
  }
}
