import 'package:ecommerce_int2/app_properties.dart';
import 'package:ecommerce_int2/screens/intro_page.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:pin_code_text_field/pin_code_text_field.dart';

class ConfirmOtpPage extends StatefulWidget {
  @override
  _ConfirmOtpPageState createState() => _ConfirmOtpPageState();
}

class _ConfirmOtpPageState extends State<ConfirmOtpPage> {
  TextEditingController otp1 = TextEditingController(text: '1');
  TextEditingController otp2 = TextEditingController(text: '2');
  TextEditingController otp3 = TextEditingController(text: '3');
  TextEditingController otp4 = TextEditingController(text: '4');
  TextEditingController otp5 = TextEditingController(text: '5');

  Widget otpBox(TextEditingController otpController) {
    return Container(
      height: 48,
      width: 48,
      decoration: BoxDecoration(
          color: Color.fromRGBO(255, 255, 255, 0.8),
          borderRadius: BorderRadius.all(Radius.circular(10))),
      child: Center(
        child: SizedBox(
          width: 9,
          child: Padding(
            padding: const EdgeInsets.only(top: 8.0),
            child: TextField(
              controller: otpController,
              decoration: InputDecoration(
                  border: InputBorder.none, contentPadding: EdgeInsets.zero),
              style: TextStyle(fontSize: 16.0),
              keyboardType: TextInputType.phone,
            ),
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    Widget title = Text(
      'Confirm your OTP',
      style: TextStyle(
          color: Colors.white,
          fontSize: 34.0,
          fontWeight: FontWeight.bold,
          shadows: [
            BoxShadow(
              color: Color.fromRGBO(0, 0, 0, 0.15),
              offset: Offset(0, 5),
              blurRadius: 10.0,
            )
          ]),
    );

    Widget subTitle = Padding(
        padding: const EdgeInsets.only(right: 56.0),
        child: Text(
          'Please wait, we are confirming your OTP',
          style: TextStyle(
            color: Colors.white,
            fontSize: 16.0,
          ),
        ));

    Widget verifyButton = Center(
      child: InkWell(
        onTap: () {
          Navigator.of(context)
              .push(MaterialPageRoute(builder: (_) => IntroPage()));
        },
        child: Container(
          width: MediaQuery.of(context).size.width / 2,
          height: 80,
          child: Center(
              child: new Text("Verify",
                  style: const TextStyle(
                      color: const Color(0xfffefefe),
                      fontWeight: FontWeight.w600,
                      fontStyle: FontStyle.normal,
                      fontSize: 20.0))),
          decoration: BoxDecoration(
              gradient: LinearGradient(
                  colors: [
                    Color.fromRGBO(236, 60, 3, 1),
                    Color.fromRGBO(234, 60, 3, 1),
                    Color.fromRGBO(216, 78, 16, 1),
                  ],
                  begin: FractionalOffset.topCenter,
                  end: FractionalOffset.bottomCenter),
              boxShadow: [
                BoxShadow(
                  color: Color.fromRGBO(0, 0, 0, 0.16),
                  offset: Offset(0, 5),
                  blurRadius: 10.0,
                )
              ],
              borderRadius: BorderRadius.circular(9.0)),
        ),
      ),
    );

    Widget otpCode = Container(
      padding: const EdgeInsets.only(right: 28.0),
      height: 190,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: <Widget>[
          otpBox(otp1),
          otpBox(otp2),
          otpBox(otp3),
          otpBox(otp4),
          otpBox(otp5)
        ],
      ),
    );

    Widget resendText = Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Text(
          "Resend again after ",
          style: TextStyle(
            fontStyle: FontStyle.italic,
            color: Color.fromRGBO(255, 255, 255, 0.5),
            fontSize: 14.0,
          ),
        ),
        InkWell(
          onTap: () {},
          child: Text(
            '0:39',
            style: TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 14.0,
            ),
          ),
        ),
      ],
    );

    return GestureDetector(
      onTap: () => FocusScope.of(context).requestFocus(new FocusNode()),
      child: Container(
        decoration: BoxDecoration(
            image: DecorationImage(
                image: AssetImage('assets/background.jpg'), fit: BoxFit.cover)),
        child: Container(
          decoration: BoxDecoration(color: transparentYellow),
          child: Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0.0,
            ),
            body: Stack(
              children: <Widget>[
                Padding(
                  padding: const EdgeInsets.only(left: 28.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      Spacer(flex: 3),
                      title,
                      Spacer(),
                      subTitle,
                      Spacer(flex: 1),
                      Padding(
                        padding: const EdgeInsets.only(right: 28.0),
                        child: Center(
                          child: PinCodeTextField(
                            controller: new TextEditingController(),
                            highlightColor: Colors.white,
                            highlightAnimation: true,
                            highlightAnimationBeginColor: Colors.white,
                            highlightAnimationEndColor: Theme.of(context).primaryColor,
                            pinTextAnimatedSwitcherDuration: Duration(milliseconds: 500),
                            wrapAlignment: WrapAlignment.center,
                            hasTextBorderColor: Colors.transparent,
                            highlightPinBoxColor: Colors.white,
                            autofocus: true,
                            pinBoxHeight: 60,
                            pinBoxWidth: 60,
                            pinBoxRadius: 5,
                            defaultBorderColor: Colors.transparent,
                            pinBoxColor: Color.fromRGBO(255, 255, 255, 0.8),
                            maxLength: 4,
                          ),
                        ),
                      ),
                      Spacer(flex: 1),
//                      otpCode,
                      Padding(
                        padding: const EdgeInsets.only(right: 28.0),
                        child: verifyButton,
                      ),
                      Spacer(flex: 2),
                      resendText,
                      Spacer()
                    ],
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
