import 'package:ecommerce_int2/app_properties.dart';
import 'package:ecommerce_int2/models/user.dart';
import 'package:ecommerce_int2/screens/request_money/receive_page.dart';
import 'package:flutter/material.dart';

class RequestAmountPage extends StatelessWidget {
  final User user;

  RequestAmountPage(this.user);

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    Widget viewProductButton = InkWell(
      onTap: () {},
      child: Container(
        padding: const EdgeInsets.all(16.0),
        height: 60,
        // width: width / 1.5,
        decoration: BoxDecoration(
            gradient: mainButton,
            boxShadow: [
              BoxShadow(
                color: Color.fromRGBO(0, 0, 0, 0.16),
                offset: Offset(0, 5),
                blurRadius: 10.0,
              )
            ],
            borderRadius: BorderRadius.circular(9.0)),
        child: Center(
          child: Text("Request Now",
              style: const TextStyle(
                  color: const Color(0xfffefefe),
                  fontWeight: FontWeight.w600,
                  fontStyle: FontStyle.normal,
                  fontSize: 16.0)),
        ),
      ),
    );

    Widget qrCode = InkWell(
      onTap: () => Navigator.of(context)
          .push(MaterialPageRoute(builder: (_) => ReceivePaymentPage(user))),
      child: Container(
        padding: const EdgeInsets.all(16.0),
        height: 60,
        // width: width / 1.5,
        decoration: BoxDecoration(
            gradient: mainButton,
            boxShadow: [
              BoxShadow(
                color: Color.fromRGBO(0, 0, 0, 0.16),
                offset: Offset(0, 5),
                blurRadius: 10.0,
              )
            ],
            borderRadius: BorderRadius.circular(9.0)),
        child: Center(
          child: Text("QR Code",
              style: const TextStyle(
                  color: const Color(0xfffefefe),
                  fontWeight: FontWeight.w600,
                  fontStyle: FontStyle.normal,
                  fontSize: 16.0)),
        ),
      ),
    );

    return Scaffold(
        backgroundColor: Colors.grey[100],
        appBar: AppBar(
          iconTheme: IconThemeData(
            color: Colors.black,
          ),
          brightness: Brightness.light,
          backgroundColor: Colors.transparent,
          title: Text(
            'Request Amount',
            style: TextStyle(color: darkGrey),
          ),
          elevation: 0,
        ),
        body: LayoutBuilder(
          builder: (context, constraints) => SingleChildScrollView(
            physics: ClampingScrollPhysics(),
            child: ConstrainedBox(
              constraints:
                  BoxConstraints(minHeight: MediaQuery.of(context).size.height),
              child: SizedBox(
                height: MediaQuery.of(context).size.height,
                child: Column(
//                mainAxisSize: MainAxisSize.min,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Container(
                      height: MediaQuery.of(context).size.height / 2.3,
                      padding: const EdgeInsets.all(16.0),
                      width: MediaQuery.of(context).size.width,
                      color: yellow,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: <Widget>[
                          Padding(
                            padding: const EdgeInsets.all(16.0),
                            child: Row(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                CircleAvatar(
                                  maxRadius: 24,
                                  backgroundImage:
                                      NetworkImage(user.picture.thumbnail),
                                ),
                                SizedBox(width: 16.0),
                                Column(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: <Widget>[
                                    Text(
                                      user.name.first + ' ' + user.name.last,
                                      style: TextStyle(
                                          color: Colors.white54,
                                          fontSize: 16,
                                          fontWeight: FontWeight.bold),
                                    ),
                                    Text(user.phone,
                                        style: TextStyle(
                                            fontSize: 12,
                                            color: Colors.white30)),
                                  ],
                                )
                              ],
                            ),
                          ),
                          Text('Enter Amount You want to Request',
                              style: TextStyle(color: Colors.white)),
                          SizedBox(
                              width: 250,
                              child: Theme(
                                data: ThemeData(
                                    primaryColor: Colors.white,
                                    fontFamily: 'Montserrat'),
                                child: TextField(
                                  style: TextStyle(
                                      color: Colors.white, fontSize: 48),
                                  textAlign: TextAlign.center,
                                  decoration: InputDecoration(
                                    hintText: '\$ 00.00',
                                    hintStyle: TextStyle(
                                        color: Colors.white30, fontSize: 48),
                                    enabledBorder: const UnderlineInputBorder(
                                      borderSide:
                                          const BorderSide(color: Colors.white),
                                    ),
                                  ),
                                ),
                              )),
                          Text('You can only send \$54.24',
                              style: TextStyle(color: Colors.white54)),
                        ],
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(24.0),
                      child: Text('Payment History'),
                    ),
                    Flexible(
                        child: ListView(
                      children: <Widget>[
                        ListTile(
                          title: Text('24th December 2018',
                              style: TextStyle(
                                  color: Colors.grey[600],
                                  fontWeight: FontWeight.bold)),
                          subtitle: Text('Received'),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                '\$ ',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 10.0),
                              ),
                              Text(
                                '90.00',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                        ListTile(
                          title: Text('24th December 2018',
                              style: TextStyle(
                                  color: Colors.grey[600],
                                  fontWeight: FontWeight.bold)),
                          subtitle: Text('Received'),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                '\$ ',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 10.0),
                              ),
                              Text(
                                '90.00',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                        ListTile(
                          title: Text('24th December 2018',
                              style: TextStyle(
                                  color: Colors.grey[600],
                                  fontWeight: FontWeight.bold)),
                          subtitle: Text('Received'),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                '\$ ',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 10.0),
                              ),
                              Text(
                                '90.00',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                        ListTile(
                          title: Text('24th December 2018',
                              style: TextStyle(
                                  color: Colors.grey[600],
                                  fontWeight: FontWeight.bold)),
                          subtitle: Text('Received'),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                '\$ ',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 10.0),
                              ),
                              Text(
                                '90.00',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        ),
                        ListTile(
                          title: Text('24th December 2018',
                              style: TextStyle(
                                  color: Colors.grey[600],
                                  fontWeight: FontWeight.bold)),
                          subtitle: Text('Received'),
                          trailing: Row(
                            mainAxisSize: MainAxisSize.min,
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                '\$ ',
                                style: TextStyle(
                                    fontWeight: FontWeight.bold,
                                    fontSize: 10.0),
                              ),
                              Text(
                                '90.00',
                                style: TextStyle(fontWeight: FontWeight.bold),
                              ),
                            ],
                          ),
                        )
                      ],
                    )),
                    Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: <Widget>[
                          Expanded(child: viewProductButton),
                          SizedBox(width: 16.0),
                          Expanded(child: qrCode)
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
          ),
        ));
  }
}
