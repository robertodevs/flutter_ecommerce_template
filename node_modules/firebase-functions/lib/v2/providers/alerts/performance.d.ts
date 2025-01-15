import { CloudEvent, CloudFunction } from "../../core";
import { EventHandlerOptions } from "../../options";
import { FirebaseAlertData } from "./alerts";
/**
 * The internal payload object for a performance threshold alert.
 * Payload is wrapped inside a {@link FirebaseAlertData} object.
 */
export interface ThresholdAlertPayload {
    /** Name of the trace or network request this alert is for (e.g. my_custom_trace, firebase.com/api/123) */
    eventName: string;
    /** The resource type this alert is for (i.e. trace, network request, screen rendering, etc.) */
    eventType: string;
    /** The metric type this alert is for (i.e. success rate, response time, duration, etc.) */
    metricType: string;
    /** The number of events checked for this alert condition */
    numSamples: number;
    /** The threshold value of the alert condition without units (e.g. "75", "2.1") */
    thresholdValue: number;
    /** The unit for the alert threshold (e.g. "percent", "seconds") */
    thresholdUnit: string;
    /** The percentile of the alert condition, can be 0 if percentile is not applicable to the alert condition and omitted; range: [1, 100] */
    conditionPercentile?: number;
    /** The app version this alert was triggered for, can be omitted if the alert is for a network request (because the alert was checked against data from all versions of app) or a web app (where the app is versionless) */
    appVersion?: string;
    /** The value that violated the alert condition (e.g. "76.5", "3") */
    violationValue: number;
    /** The unit for the violation value (e.g. "percent", "seconds") */
    violationUnit: string;
    /** The link to Fireconsole to investigate more into this alert */
    investigateUri: string;
}
/**
 * A custom CloudEvent for Firebase Alerts (with custom extension attributes).
 * @typeParam T - the data type for performance alerts that is wrapped in a `FirebaseAlertData` object.
 */
export interface PerformanceEvent<T> extends CloudEvent<FirebaseAlertData<T>> {
    /** The type of the alerts that got triggered. */
    alertType: string;
    /** The Firebase App ID that’s associated with the alert. */
    appId: string;
}
/**
 * Configuration for app distribution functions.
 */
export interface PerformanceOptions extends EventHandlerOptions {
    /** Scope the function to trigger on a specific application. */
    appId?: string;
}
/**
 * Declares a function that can handle receiving performance threshold alerts.
 * @param handler - Event handler which is run every time a threshold alert is received.
 * @returns A function that you can export and deploy.
 */
export declare function onThresholdAlertPublished(handler: (event: PerformanceEvent<ThresholdAlertPayload>) => any | Promise<any>): CloudFunction<PerformanceEvent<ThresholdAlertPayload>>;
/**
 * Declares a function that can handle receiving performance threshold alerts.
 * @param appId - A specific application the handler will trigger on.
 * @param handler - Event handler which is run every time a threshold alert is received.
 * @returns A function that you can export and deploy.
 */
export declare function onThresholdAlertPublished(appId: string, handler: (event: PerformanceEvent<ThresholdAlertPayload>) => any | Promise<any>): CloudFunction<PerformanceEvent<ThresholdAlertPayload>>;
/**
 * Declares a function that can handle receiving performance threshold alerts.
 * @param opts - Options that can be set on the function.
 * @param handler - Event handler which is run every time a threshold alert is received.
 * @returns A function that you can export and deploy.
 */
export declare function onThresholdAlertPublished(opts: PerformanceOptions, handler: (event: PerformanceEvent<ThresholdAlertPayload>) => any | Promise<any>): CloudFunction<PerformanceEvent<ThresholdAlertPayload>>;
