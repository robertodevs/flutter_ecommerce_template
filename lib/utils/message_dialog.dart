import 'package:flutter/material.dart';
import 'package:get/get.dart';

class MessageDialog {
  static void hideLoading() {
    if (Get.isDialogOpen!) {
      Get.back();
    }
  }

  static void showToast(String text) {
    Get.showSnackbar(GetSnackBar(
      messageText: Text(text),
    ));
  }

  static void showConfirmDialog({
    required String content,
  }) {
    Get.generalDialog(
      barrierDismissible: false,
      barrierColor: const Color.fromRGBO(0, 0, 0, 0.3),
      transitionDuration: Duration.zero,
      pageBuilder: (context, _, __) {
        return AlertDialog(
          backgroundColor: Colors.white,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(10),
            ),
          ),
          content: SizedBox(
            height: 65,
            width: Get.width,
            child: Center(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  //todo: Change the loading indicator
                  const CircularProgressIndicator(),
                  const SizedBox(width: 16),
                  Text(
                    content,
                  ),
                ],
              ),
            ),
          ),
          buttonPadding: EdgeInsets.zero,
        );
      },
    );
  }

  static void showLoading() {
    Get.generalDialog(
      barrierDismissible: false,
      barrierColor: const Color.fromRGBO(0, 0, 0, 0.3),
      transitionDuration: Duration.zero,
      pageBuilder: (context, _, __) {
        return AlertDialog(
          backgroundColor: Colors.white,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(10),
            ),
          ),
          content: SizedBox(
            height: 65,
            width: Get.width,
            child: Center(
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  //todo: Change the loading indicator
                  const CircularProgressIndicator(),
                  const SizedBox(width: 16),
                  Text(
                    'Processing...',
                  ),
                ],
              ),
            ),
          ),
          buttonPadding: EdgeInsets.zero,
        );
      },
    );
  }
}
