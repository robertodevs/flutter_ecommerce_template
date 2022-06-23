import 'package:ecommerce_int2/utils/dependencies.dart';
import 'package:ecommerce_int2/screens/splash_page.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:pull_to_refresh/pull_to_refresh.dart';

void main() {
  GetStorage.init();
  Dependency.init();
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return RefreshConfiguration(
      headerBuilder: () => WaterDropHeader(),        // Configure the default header indicator. If you have the same header indicator for each page, you need to set this
      footerBuilder:  () => ClassicFooter(),        // Configure default bottom indicator
      headerTriggerDistance: 80.0,        // header trigger refresh trigger distance
      maxOverScrollExtent :100, //The maximum dragging range of the head. Set this property if a rush out of the view area occurs
      maxUnderScrollExtent:100, // Maximum dragging range at the bottom
      enableScrollWhenRefreshCompleted: true, //This property is incompatible with PageView and TabBarView. If you need TabBarView to slide left and right, you need to set it to true.
      enableLoadingWhenFailed : true, //In the case of load failure, users can still trigger more loads by gesture pull-up.
      hideFooterWhenNotFull: false, // Disable pull-up to load more functionality when Viewport is less than one screen
      enableBallisticLoad: true,
      child: GetMaterialApp(
        title: 'E-commerce',
        debugShowCheckedModeBanner: false,
        theme: ThemeData(
          brightness: Brightness.light,
          canvasColor: Colors.transparent,
          primarySwatch: Colors.blue,
          fontFamily: "Montserrat",
        ),
        home: SplashScreen(),
      ),
    );
  }
}
