import { CloudFunction, EventContext } from "../cloud-functions";
import { DeploymentOptions, ScheduleRetryConfig } from "../function-configuration";
/**
 * Registers a Cloud Function triggered when a Google Cloud Pub/Sub message
 * is sent to a specified topic.
 *
 * @param topic - The Pub/Sub topic to watch for message events.
 * @returns Pub/Sub topic builder interface.
 */
export declare function topic(topic: string): TopicBuilder;
/**
 * The Google Cloud Pub/Sub topic builder.
 *
 * Access via `functions.pubsub.topic()`.
 */
export declare class TopicBuilder {
    private triggerResource;
    private options;
    /** @hidden */
    constructor(triggerResource: () => string, options: DeploymentOptions);
    /**
     * Event handler that fires every time a Cloud Pub/Sub message is
     * published.
     *
     * @param handler - Event handler that runs every time a Cloud Pub/Sub message
     *   is published.
     * @returns A function that you can export and deploy.
     */
    onPublish(handler: (message: Message, context: EventContext) => PromiseLike<any> | any): CloudFunction<Message>;
}
/**
 * Registers a Cloud Function to run at specified times.
 *
 * @param schedule - The schedule, in Unix Crontab or AppEngine syntax.
 * @returns ScheduleBuilder interface.
 */
export declare function schedule(schedule: string): ScheduleBuilder;
/**
 * The builder for scheduled functions, which are powered by
 * Google Pub/Sub and Cloud Scheduler. Describes the Cloud Scheduler
 * job that is deployed to trigger a scheduled function at the provided
 * frequency. For more information, see
 * [Schedule functions](/docs/functions/schedule-functions).
 *
 * Access via `functions.pubsub.schedule()`.
 */
export declare class ScheduleBuilder {
    private triggerResource;
    private options;
    /** @hidden */
    constructor(triggerResource: () => string, options: DeploymentOptions);
    retryConfig(config: ScheduleRetryConfig): ScheduleBuilder;
    timeZone(timeZone: string): ScheduleBuilder;
    /**
     * Event handler for scheduled functions. Triggered whenever the associated
     * scheduler job sends a Pub/Sub message.
     *
     * @param handler - Handler that fires whenever the associated
     *   scheduler job sends a Pub/Sub message.
     * @returns A function that you can export and deploy.
     */
    onRun(handler: (context: EventContext) => PromiseLike<any> | any): CloudFunction<unknown>;
}
/**
 * Interface representing a Google Cloud Pub/Sub message.
 *
 * @param data - Payload of a Pub/Sub message.
 */
export declare class Message {
    /**
     * The data payload of this message object as a base64-encoded string.
     */
    readonly data: string;
    /**
     * User-defined attributes published with the message, if any.
     */
    readonly attributes: {
        [key: string]: string;
    };
    /** @hidden */
    private _json;
    constructor(data: any);
    /**
     * The JSON data payload of this message object, if any.
     */
    get json(): any;
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON(): any;
}
