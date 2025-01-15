import { App } from "firebase-admin/app";
export declare function getApp(): App;
/**
 * This function allows the Firebase Emulator Suite to override the FirebaseApp instance
 * used by the Firebase Functions SDK. Developers should never call this function for
 * other purposes.
 * N.B. For clarity for use in testing this name has no mention of emulation, but
 * it must be exported from index as app.setEmulatedAdminApp or we break the emulator.
 * We can remove this export when:
 * A) We complete the new emulator and no longer depend on monkeypatching
 * B) We tweak the CLI to look for different APIs to monkeypatch depending on versions.
 * @alpha
 */
export declare function setApp(app?: App): void;
