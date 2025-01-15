/**
 * Cloud functions to handle Firebase App Distribution events from Firebase Alerts.
 * @packageDocumentation
 */
import { ResetValue } from "../../../common/options";
import { Expression } from "../../../params";
import { CloudEvent, CloudFunction } from "../../core";
import { FirebaseAlertData } from "./alerts";
import * as options from "../../options";
import { SecretParam } from "../../../params/types";
/**
 * The internal payload object for adding a new tester device to app distribution.
 * Payload is wrapped inside a `FirebaseAlertData` object.
 */
export interface NewTesterDevicePayload {
    ["@type"]: "type.googleapis.com/google.events.firebase.firebasealerts.v1.AppDistroNewTesterIosDevicePayload";
    /** Name of the tester */
    testerName: string;
    /** Email of the tester */
    testerEmail: string;
    /** The device model name */
    testerDeviceModelName: string;
    /** The device ID */
    testerDeviceIdentifier: string;
}
/**
 * The internal payload object for receiving in-app feedback from a tester.
 * Payload is wrapped inside a `FirebaseAlertData` object.
 */
export interface InAppFeedbackPayload {
    ["@type"]: "type.googleapis.com/google.events.firebase.firebasealerts.v1.AppDistroInAppFeedbackPayload";
    /** Resource name. Format: `projects/{project_number}/apps/{app_id}/releases/{release_id}/feedbackReports/{feedback_id}` */
    feedbackReport: string;
    /** Deep link back to the Firebase console. */
    feedbackConsoleUri: string;
    /** Name of the tester */
    testerName?: string;
    /** Email of the tester */
    testerEmail: string;
    /**
     * Version consisting of `versionName` and `versionCode` for Android and
     * `CFBundleShortVersionString` and `CFBundleVersion` for iOS.
     */
    appVersion: string;
    /** Text entered by the tester */
    text: string;
    /** URI to download screenshot. This URI is fast expiring. */
    screenshotUri?: string;
}
/**
 * A custom CloudEvent for Firebase Alerts (with custom extension attributes).
 * @typeParam T - the data type for app distribution alerts that is wrapped in a `FirebaseAlertData` object.
 */
export interface AppDistributionEvent<T> extends CloudEvent<FirebaseAlertData<T>> {
    /** The type of the alerts that got triggered. */
    alertType: string;
    /** The Firebase App ID that’s associated with the alert. */
    appId: string;
}
/**
 * Configuration for app distribution functions.
 */
export interface AppDistributionOptions extends options.EventHandlerOptions {
    /** Scope the function to trigger on a specific application. */
    appId?: string;
    /**
     * If true, do not deploy or emulate this function.
     */
    omit?: boolean | Expression<boolean>;
    /**
     * Region where functions should be deployed.
     */
    region?: options.SupportedRegion | string | Expression<string> | ResetValue;
    /**
     * Amount of memory to allocate to a function.
     */
    memory?: options.MemoryOption | Expression<number> | ResetValue;
    /**
     * Timeout for the function in seconds, possible values are 0 to 540.
     * HTTPS functions can specify a higher timeout.
     *
     * @remarks
     * The minimum timeout for a gen 2 function is 1s. The maximum timeout for a
     * function depends on the type of function: Event handling functions have a
     * maximum timeout of 540s (9 minutes). HTTPS and callable functions have a
     * maximum timeout of 36,00s (1 hour). Task queue functions have a maximum
     * timeout of 1,800s (30 minutes)
     */
    timeoutSeconds?: number | Expression<number> | ResetValue;
    /**
     * Min number of actual instances to be running at a given time.
     *
     * @remarks
     * Instances will be billed for memory allocation and 10% of CPU allocation
     * while idle.
     */
    minInstances?: number | Expression<number> | ResetValue;
    /**
     * Max number of instances to be running in parallel.
     */
    maxInstances?: number | Expression<number> | ResetValue;
    /**
     * Number of requests a function can serve at once.
     *
     * @remarks
     * Can only be applied to functions running on Cloud Functions v2.
     * A value of null restores the default concurrency (80 when CPU >= 1, 1 otherwise).
     * Concurrency cannot be set to any value other than 1 if `cpu` is less than 1.
     * The maximum value for concurrency is 1,000.
     */
    concurrency?: number | Expression<number> | ResetValue;
    /**
     * Fractional number of CPUs to allocate to a function.
     *
     * @remarks
     * Defaults to 1 for functions with <= 2GB RAM and increases for larger memory sizes.
     * This is different from the defaults when using the gcloud utility and is different from
     * the fixed amount assigned in Google Cloud Functions generation 1.
     * To revert to the CPU amounts used in gcloud or in Cloud Functions generation 1, set this
     * to the value "gcf_gen1"
     */
    cpu?: number | "gcf_gen1";
    /**
     * Connect cloud function to specified VPC connector.
     */
    vpcConnector?: string | Expression<string> | ResetValue;
    /**
     * Egress settings for VPC connector.
     */
    vpcConnectorEgressSettings?: options.VpcEgressSetting | ResetValue;
    /**
     * Specific service account for the function to run as.
     */
    serviceAccount?: string | Expression<string> | ResetValue;
    /**
     * Ingress settings which control where this function can be called from.
     */
    ingressSettings?: options.IngressSetting | ResetValue;
    /**
     * User labels to set on the function.
     */
    labels?: Record<string, string>;
    secrets?: (string | SecretParam)[];
    /** Whether failed executions should be delivered again. */
    retry?: boolean | Expression<boolean> | ResetValue;
}
/**
 * Declares a function that can handle adding a new tester iOS device.
 * @param handler - Event handler which is run every time a new tester iOS device is added.
 * @returns A function that you can export and deploy.
 */
export declare function onNewTesterIosDevicePublished(handler: (event: AppDistributionEvent<NewTesterDevicePayload>) => any | Promise<any>): CloudFunction<AppDistributionEvent<NewTesterDevicePayload>>;
/**
 * Declares a function that can handle adding a new tester iOS device.
 * @param appId - A specific application the handler will trigger on.
 * @param handler - Event handler which is run every time a new tester iOS device is added.
 * @returns A function that you can export and deploy.
 */
export declare function onNewTesterIosDevicePublished(appId: string, handler: (event: AppDistributionEvent<NewTesterDevicePayload>) => any | Promise<any>): CloudFunction<AppDistributionEvent<NewTesterDevicePayload>>;
/**
 * Declares a function that can handle adding a new tester iOS device.
 * @param opts - Options that can be set on the function.
 * @param handler - Event handler which is run every time a new tester iOS device is added.
 * @returns A function that you can export and deploy.
 */
export declare function onNewTesterIosDevicePublished(opts: AppDistributionOptions, handler: (event: AppDistributionEvent<NewTesterDevicePayload>) => any | Promise<any>): CloudFunction<AppDistributionEvent<NewTesterDevicePayload>>;
/**
 * Declares a function that can handle receiving new in-app feedback from a tester.
 * @param handler - Event handler which is run every time new feedback is received.
 * @returns A function that you can export and deploy.
 */
export declare function onInAppFeedbackPublished(handler: (event: AppDistributionEvent<InAppFeedbackPayload>) => any | Promise<any>): CloudFunction<AppDistributionEvent<InAppFeedbackPayload>>;
/**
 * Declares a function that can handle receiving new in-app feedback from a tester.
 * @param appId - A specific application the handler will trigger on.
 * @param handler - Event handler which is run every time new feedback is received.
 * @returns A function that you can export and deploy.
 */
export declare function onInAppFeedbackPublished(appId: string, handler: (event: AppDistributionEvent<InAppFeedbackPayload>) => any | Promise<any>): CloudFunction<AppDistributionEvent<InAppFeedbackPayload>>;
/**
 * Declares a function that can handle receiving new in-app feedback from a tester.
 * @param opts - Options that can be set on the function.
 * @param handler - Event handler which is run every time new feedback is received.
 * @returns A function that you can export and deploy.
 */
export declare function onInAppFeedbackPublished(opts: AppDistributionOptions, handler: (event: AppDistributionEvent<InAppFeedbackPayload>) => any | Promise<any>): CloudFunction<AppDistributionEvent<InAppFeedbackPayload>>;
