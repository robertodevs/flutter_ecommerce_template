import Cocoa
import FlutterMacOS

class MainFlutterWindow: NSWindow {
  override func awakeFromNib() {
<<<<<<< HEAD
    let flutterViewController = FlutterViewController()
=======
    let flutterViewController = FlutterViewController.init()
>>>>>>> 5ac9628f9e402416023f223a5514a2342064ea03
    let windowFrame = self.frame
    self.contentViewController = flutterViewController
    self.setFrame(windowFrame, display: true)

    RegisterGeneratedPlugins(registry: flutterViewController)

    super.awakeFromNib()
  }
}
