import 'dart:io';

 import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

 class WebViewExample extends StatefulWidget {
   final String url;

  const WebViewExample({Key? key,required this.url}) : super(key: key);
   @override
   WebViewExampleState createState() => WebViewExampleState();
 }

 class WebViewExampleState extends State<WebViewExample> {
   @override
   void initState() {
     super.initState();
     // Enable virtual display.
     if (Platform.isAndroid) WebView.platform = AndroidWebView();
   }

   @override
   Widget build(BuildContext context) {
     return WebView(
       initialUrl: widget.url,
     );
   }
 }