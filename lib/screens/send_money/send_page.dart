import 'package:ecommerce_int2/api_service.dart';
import 'package:ecommerce_int2/models/user.dart';
import 'package:ecommerce_int2/screens/send_money/quick_send_amount_page.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';

import '../../app_properties.dart';

class SendPage extends StatefulWidget {
  @override
  _SendPageState createState() => _SendPageState();
}

class _SendPageState extends State<SendPage> {
  List<User> frequentUsers = [];
  List<User> users = [];

  getFrequentUsers() async {
    var temp = await ApiService.getUsers(nrUsers: 5);
    setState(() {
      frequentUsers = temp;
    });
  }

  getUsers() async {
    var temp = await ApiService.getUsers(nrUsers: 5);
    setState(() {
      users = temp;
    });
  }

  @override
  void initState() {
    super.initState();
    getFrequentUsers();
    getUsers();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        iconTheme: IconThemeData(
          color: Colors.black,
        ),
        brightness: Brightness.light,
        backgroundColor: Colors.transparent,
        title: Text(
          'Send Amount',
          style: TextStyle(color: darkGrey),
        ),
        elevation: 0,
      ),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Container(
              margin: const EdgeInsets.symmetric(horizontal: 16.0),
              decoration: BoxDecoration(
                  border: Border(
                      bottom: BorderSide(color: Colors.orange, width: 1))),
              child: TextField(
                cursorColor: darkGrey,
                decoration: InputDecoration(
                    hintText: 'Search',
                    contentPadding: EdgeInsets.zero,
                    border: InputBorder.none,
                    prefixIcon: SvgPicture.asset('assets/icons/search_icon.svg', fit: BoxFit.scaleDown,),
                    suffix: FlatButton(
                        onPressed: () {
                          // searchController.clear();
                          // searchResults.clear();
                        },
                        child: Text(
                          'Clear',
                          style: TextStyle(color: Colors.red),
                        ))),
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(16.0, 32.0, 16.0, 16.0),
              child: Text('Frequent Contacts'),
            ),
            Expanded(
                child: Center(
                  child: Container(
              height: 150,
              padding:
                    const EdgeInsets.symmetric(horizontal: 16.0, vertical: 8.0),
              child: Center(
                  child: frequentUsers.length == 0
                      ? CupertinoActivityIndicator()
                      : ListView(
                          scrollDirection: Axis.horizontal,
                          children: frequentUsers
                              .map((user) => InkWell(
                                    onTap: () => Navigator.of(context).push(
                                        MaterialPageRoute(
                                            builder: (_) =>
                                                QuickSendAmountPage(user))),
                                    child: Container(
                                        width: 100,
                                        height: 200,
                                        margin: const EdgeInsets.only(
                                            left: 8.0, right: 8.0),
                                        decoration: BoxDecoration(
                                            color: Colors.white,
                                            borderRadius: BorderRadius.all(
                                                Radius.circular(5))),
                                        child: Column(
                                          mainAxisSize: MainAxisSize.min,
                                          mainAxisAlignment:
                                              MainAxisAlignment.center,
                                          children: <Widget>[
                                            CircleAvatar(
                                              maxRadius: 24,
                                              backgroundImage: NetworkImage(
                                                  user.picture.thumbnail),
                                            ),
                                            Padding(
                                              padding: const EdgeInsets.fromLTRB(
                                                  4.0, 16.0, 4.0, 0.0),
                                              child: Text(
                                                  user.name.first +
                                                      ' ' +
                                                      user.name.last,
                                                  textAlign: TextAlign.center,
                                                  style: TextStyle(
                                                    fontSize: 14.0,
                                                  )),
                                            ),
                                            Padding(
                                              padding:
                                                  const EdgeInsets.only(top: 8.0),
                                              child: Text(
                                                user.phone,
                                                textAlign: TextAlign.center,
                                                style: TextStyle(fontSize: 10),
                                              ),
                                            ),
                                          ],
                                        )),
                                  ))
                              .toList(),
                        ),
              ),
            ),
                )),
            Padding(
              padding: const EdgeInsets.fromLTRB(16.0, 16.0, 16.0, 0.0),
              child: Text('Your Contacts'),
            ),
            Expanded(
                flex: 2,
                child: Center(
                  child: users.length == 0
                      ? CupertinoActivityIndicator()
                      : Container(
                        color: Colors.white,
                        padding: const EdgeInsets.symmetric(
                              horizontal: 16.0, vertical: 8.0),
                        child: ListView(
                            children: users
                                .map((user) => InkWell(
                                      onTap: () => Navigator.of(context).push(
                                          MaterialPageRoute(
                                              builder: (_) =>
                                                  QuickSendAmountPage(user))),
                                      child: Column(
                                        children: <Widget>[
                                          Row(
                                            children: <Widget>[
                                              Padding(
                                                padding: const EdgeInsets.only(
                                                    right: 16.0),
                                                child: CircleAvatar(
                                                  maxRadius: 24,
                                                  backgroundImage: NetworkImage(
                                                      user.picture.thumbnail),
                                                ),
                                              ),
                                              Column(
                                                crossAxisAlignment:
                                                    CrossAxisAlignment.start,
                                                children: <Widget>[
                                                  Padding(
                                                    padding:
                                                        const EdgeInsets.only(
                                                            top: 16.0),
                                                    child: Text(
                                                        user.name.first +
                                                            ' ' +
                                                            user.name.last,
                                                        style: TextStyle(
                                                            fontSize: 16.0,
                                                            fontWeight:
                                                                FontWeight
                                                                    .bold)),
                                                  ),
                                                  Padding(
                                                    padding:
                                                        const EdgeInsets.only(
                                                            top: 8.0,
                                                            bottom: 16.0),
                                                    child: Text(
                                                      user.phone,
                                                    ),
                                                  ),
                                                ],
                                              ),
                                              Spacer(),
                                              Text(
                                                'Send as a gift',
                                                style:
                                                    TextStyle(fontSize: 10.0),
                                              )
                                            ],
                                          ),
                                          Padding(
                                            padding: const EdgeInsets.only(
                                                left: 64.0),
                                            child: Divider(),
                                          )
                                        ],
                                      ),
                                    ))
                                .toList(),
                          ),
                      ),
                )),
          ],
        ),
      ),
    );
  }
}
