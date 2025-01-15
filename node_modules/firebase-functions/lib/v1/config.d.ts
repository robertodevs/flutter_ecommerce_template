export { firebaseConfig } from "../common/config";
/**
 * Store and retrieve project configuration data such as third-party API
 * keys or other settings. You can set configuration values using the
 * Firebase CLI as described in
 * https://firebase.google.com/docs/functions/config-env.
 *
 * @deprecated Using functions.config() is discouraged. See https://firebase.google.com/docs/functions/config-env.
 */
export declare function config(): Record<string, any>;
