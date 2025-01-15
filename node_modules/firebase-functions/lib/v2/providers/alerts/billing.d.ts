/**
 * Cloud functions to handle billing events from Firebase Alerts.
 * @packageDocumentation
 */
import { CloudEvent, CloudFunction } from "../../core";
import { FirebaseAlertData } from "./alerts";
import * as options from "../../options";
/**
 * The internal payload object for billing plan updates.
 * Payload is wrapped inside a `FirebaseAlertData` object.
 */
export interface PlanUpdatePayload {
    ["@type"]: "type.googleapis.com/google.events.firebase.firebasealerts.v1.BillingPlanUpdatePayload";
    /** A Firebase billing plan. */
    billingPlan: string;
    /** The email address of the person that triggered billing plan change */
    principalEmail: string;
    /** The type of the notification, e.g. upgrade, downgrade */
    notificationType: string;
}
/**
 * The internal payload object for billing plan automated updates.
 * Payload is wrapped inside a `FirebaseAlertData` object.
 */
export interface PlanAutomatedUpdatePayload {
    ["@type"]: "type.googleapis.com/google.events.firebase.firebasealerts.v1.BillingPlanAutomatedUpdatePayload";
    /** A Firebase billing plan. */
    billingPlan: string;
    /** The type of the notification, e.g. upgrade, downgrade */
    notificationType: string;
}
/**
 * A custom CloudEvent for billing Firebase Alerts (with custom extension attributes).
 * @typeParam T - the data type for billing alerts that is wrapped in a `FirebaseAlertData` object.
 */
export interface BillingEvent<T> extends CloudEvent<FirebaseAlertData<T>> {
    /** The type of the alerts that got triggered. */
    alertType: string;
}
/**
 * Declares a function that can handle a billing plan update event.
 * @param handler - Event handler which is run every time a billing plan is updated.
 * @returns A function that you can export and deploy.
 */
export declare function onPlanUpdatePublished(handler: (event: BillingEvent<PlanUpdatePayload>) => any | Promise<any>): CloudFunction<BillingEvent<PlanUpdatePayload>>;
/**
 * Declares a function that can handle a billing plan update event.
 * @param opts - Options that can be set on the function.
 * @param handler - Event handler which is run every time a billing plan is updated.
 * @returns A function that you can export and deploy.
 */
export declare function onPlanUpdatePublished(opts: options.EventHandlerOptions, handler: (event: BillingEvent<PlanUpdatePayload>) => any | Promise<any>): CloudFunction<BillingEvent<PlanUpdatePayload>>;
/**
 * Declares a function that can handle an automated billing plan update event.
 * @param handler - Event handler which is run every time an automated billing plan update occurs.
 * @returns A function that you can export and deploy.
 */
export declare function onPlanAutomatedUpdatePublished(handler: (event: BillingEvent<PlanAutomatedUpdatePayload>) => any | Promise<any>): CloudFunction<BillingEvent<PlanAutomatedUpdatePayload>>;
/**
 * Declares a function that can handle an automated billing plan update event.
 * @param opts - Options that can be set on the function.
 * @param handler - Event handler which is run every time an automated billing plan update occurs.
 * @returns A function that you can export and deploy.
 */
export declare function onPlanAutomatedUpdatePublished(opts: options.EventHandlerOptions, handler: (event: BillingEvent<PlanAutomatedUpdatePayload>) => any | Promise<any>): CloudFunction<BillingEvent<PlanAutomatedUpdatePayload>>;
