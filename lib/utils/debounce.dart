import 'package:flutter/foundation.dart';
import 'dart:async';

class Debounce {
  final int milliseconds;
  Timer? _timer;

  Debounce({required this.milliseconds});

  run(VoidCallback action) {
    if (_timer != null) {
      _timer!.cancel();
    }

    _timer = Timer(Duration(milliseconds: milliseconds), action);
  }
}
