import 'package:ecommerce_int2/app_properties.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class TrackingPage extends StatefulWidget {
  @override
  _TrackingPageState createState() => _TrackingPageState();
}

class _TrackingPageState extends State<TrackingPage> {
  final List<Location> locations = [
    Location('Kolkata Facility', DateTime(2019, 6, 5, 5, 23, 4),
        showHour: false, isHere: false, passed: true),
    Location('Hyderabad Facility', DateTime(2019, 6, 6, 5, 23, 4),
        showHour: false, isHere: false, passed: true),
    Location(
      'Chennai Facility',
      DateTime(2019, 6, 9, 5, 23, 4),
      showHour: false,
      isHere: true,
    ),
    Location(
      'Kerala Facility',
      DateTime(2019, 6, 10, 5, 23, 4),
      showHour: true,
      isHere: false,
    ),
  ];

  String selectedProduct = 'Boat Headphones Bass boost 100v';

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
          color: Colors.grey[100],
          image: DecorationImage(
              image: AssetImage('assets/Group 444.png'), fit: BoxFit.contain)),
      child: Container(
        color: Colors.white54,
        child: Scaffold(
            appBar: AppBar(
              backgroundColor: Colors.transparent,
              elevation: 0.0,
              brightness: Brightness.light,
              iconTheme: IconThemeData(color: Colors.grey),
              title: Text(
                'Shipped',
                style: TextStyle(
                  color: darkGrey,
                  fontSize: 22,
                  fontWeight: FontWeight.bold,
                ),
              ),
              leading: SizedBox(),
              actions: <Widget>[CloseButton()],
            ),
            body: SafeArea(
              child: LayoutBuilder(
                builder: (_, constraints) => Column(
                  mainAxisSize: MainAxisSize.min,
                  children: <Widget>[
                    Container(
                      margin: const EdgeInsets.symmetric(horizontal: 16.0),
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.all(Radius.circular(5))),
                      child: DropdownButtonHideUnderline(
                        child: DropdownButton(
                          items: <String>[
                            'Boat Headphones Bass boost 100v',
                            'Boat Headphones Bass boost 200v',
                            'Boat Headphones Bass boost 300v',
                            'Boat Headphones Bass boost 400v',
                            'Boat Headphones Bass boost 500v',
                            'Boat Headphones Bass double boosting 600v'
                          ].map((val) {
                            return DropdownMenuItem<String>(
                              value: val,
                              child: Container(
                                  color: Colors.white,
                                  child: Align(
                                      alignment: Alignment.centerLeft,
                                      child: Text(
                                        val,
                                        maxLines: 2,
                                        semanticsLabel: '...',
                                        overflow: TextOverflow.ellipsis,
                                      ))),
                            );
                          }).toList(),
                          onChanged: (newValue) {
                            setState(() {
                              selectedProduct = newValue as String;
                            });
                          },
                          value: selectedProduct,
                          isExpanded: true,
                          icon: Icon(Icons.keyboard_arrow_down),
                          elevation: 0,
                        ),
                      ),
                    ),
                    SingleChildScrollView(
                      child: ConstrainedBox(
                        constraints: BoxConstraints(
                          maxHeight: constraints.maxHeight - 48,
                        ),
                        child: Theme(
                          data: ThemeData(
                              primaryColor: yellow, fontFamily: 'Montserrat'),
                          child: Stepper(
//                          physics: NeverScrollableScrollPhysics(),
                            steps: [
                              ...locations
                                  .map(
                                    (location) => Step(
                                      isActive:
                                          location.isHere || location.passed,
                                      title: Text(location.city),
                                      subtitle: Text(location.getDate()),
                                      content: Align(
                                        child: Image.asset(
                                            'assets/icons/truck.png'),
                                        alignment: Alignment.centerLeft,
                                      ),
                                      state: location.passed
                                          ? StepState.complete
                                          : location.isHere
                                              ? StepState.editing
                                              : StepState.indexed,
                                    ),
                                  )
                                  .toList()
                            ],
                            currentStep: locations.indexOf(
                                locations.firstWhere((loc) => loc.isHere)),
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            )),
      ),
    );
  }
}

class Location {
  String city;
  DateTime date;
  bool showHour;
  bool isHere;
  bool passed;

  Location(this.city, this.date,
      {this.showHour = false, this.isHere = false, this.passed = false});

  String getDate() {
    if (showHour) {
      return DateFormat("K:mm aaa, d MMMM y").format(date);
    } else {
      return DateFormat('d MMMM y').format(date);
    }
  }
}
