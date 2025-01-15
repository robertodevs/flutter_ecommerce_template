import { Request, Response } from "express";
import { DeploymentOptions, FailurePolicy, Schedule } from "./function-configuration";
export { Request, Response };
import { ManifestEndpoint, ManifestRequiredAPI } from "../runtime/manifest";
export { Change } from "../common/change";
/**
 * Wire format for an event.
 */
export interface Event {
    /**
     * Wire format for an event context.
     */
    context: {
        eventId: string;
        timestamp: string;
        eventType: string;
        resource: Resource;
        domain?: string;
        auth?: {
            variable?: {
                uid?: string;
                token?: string;
            };
            admin: boolean;
        };
    };
    /**
     * Event data over wire.
     */
    data: any;
}
/**
 * The context in which an event occurred.
 *
 * @remarks
 * An EventContext describes:
 * - The time an event occurred.
 * - A unique identifier of the event.
 * - The resource on which the event occurred, if applicable.
 * - Authorization of the request that triggered the event, if applicable and
 *   available.
 */
export interface EventContext<Params = Record<string, string>> {
    /**
     * Authentication information for the user that triggered the function.
     *
     * @remarks
     * This object contains `uid` and `token` properties for authenticated users.
     * For more detail including token keys, see the
     * {@link https://firebase.google.com/docs/reference/rules/rules#properties | security rules reference}.
     *
     * This field is only populated for Realtime Database triggers and Callable
     * functions. For an unauthenticated user, this field is null. For Firebase
     * admin users and event types that do not provide user information, this field
     * does not exist.
     */
    auth?: {
        token: object;
        uid: string;
    };
    /**
     * The level of permissions for a user.
     *
     * @remarks
     * Valid values are:
     *
     * - `ADMIN`: Developer user or user authenticated via a service account.
     *
     * - `USER`: Known user.
     *
     * - `UNAUTHENTICATED`: Unauthenticated action
     *
     * - `null`: For event types that do not provide user information (all except
     *   Realtime Database).
     */
    authType?: "ADMIN" | "USER" | "UNAUTHENTICATED";
    /**
     * The event’s unique identifier.
     */
    eventId: string;
    /**
     * Type of event.
     *
     * @remarks
     * Possible values are:
     *
     * - `google.analytics.event.log`
     *
     * - `google.firebase.auth.user.create`
     *
     * - `google.firebase.auth.user.delete`
     *
     * - `google.firebase.database.ref.write`
     *
     * - `google.firebase.database.ref.create`
     *
     * - `google.firebase.database.ref.update`
     *
     * - `google.firebase.database.ref.delete`
     *
     * - `google.firestore.document.write`
     *
     * - `google.firestore.document.create`
     *
     * - `google.firestore.document.update`
     *
     * - `google.firestore.document.delete`
     *
     * - `google.pubsub.topic.publish`
     *
     * - `google.firebase.remoteconfig.update`
     *
     * - `google.storage.object.finalize`
     *
     * - `google.storage.object.archive`
     *
     * - `google.storage.object.delete`
     *
     * - `google.storage.object.metadataUpdate`
     *
     * - `google.testing.testMatrix.complete`
     */
    eventType: string;
    /**
     * An object containing the values of the wildcards in the `path` parameter
     * provided to the {@link fireabase-functions.v1.database#ref | `ref()`} method for a Realtime Database trigger.
     */
    params: Params;
    /**
     * The resource that emitted the event.
     *
     * @remarks
     * Valid values are:
     *
     * Analytics: `projects/<projectId>/events/<analyticsEventType>`
     *
     * Realtime Database: `projects/_/instances/<databaseInstance>/refs/<databasePath>`
     *
     * Storage: `projects/_/buckets/<bucketName>/objects/<fileName>#<generation>`
     *
     * Authentication: `projects/<projectId>`
     *
     * Pub/Sub: `projects/<projectId>/topics/<topicName>`
     *
     * Because Realtime Database instances and Cloud Storage buckets are globally
     * unique and not tied to the project, their resources start with `projects/_`.
     * Underscore is not a valid project name.
     */
    resource: Resource;
    /**
     * Timestamp for the event as an {@link https://www.ietf.org/rfc/rfc3339.txt | RFC 3339} string.
     */
    timestamp: string;
}
/**
 * Resource is a standard format for defining a resource
 * (google.rpc.context.AttributeContext.Resource). In Cloud Functions, it is the
 * resource that triggered the function - such as a storage bucket.
 */
export interface Resource {
    /** The name of the service that this resource belongs to. */
    service: string;
    /**
     * The stable identifier (name) of a resource on the service.
     * A resource can be logically identified as "//{resource.service}/{resource.name}"
     */
    name: string;
    /**
     * The type of the resource. The syntax is platform-specific because different platforms define their resources differently.
     * For Google APIs, the type format must be "{service}/{kind}"
     */
    type?: string;
    /** Map of Resource's labels. */
    labels?: {
        [tag: string]: string;
    };
}
/**
 * TriggerAnnotion is used internally by the firebase CLI to understand what
 * type of Cloud Function to deploy.
 */
interface TriggerAnnotation {
    availableMemoryMb?: number;
    blockingTrigger?: {
        eventType: string;
        options?: Record<string, unknown>;
    };
    eventTrigger?: {
        eventType: string;
        resource: string;
        service: string;
    };
    failurePolicy?: FailurePolicy;
    httpsTrigger?: {
        invoker?: string[];
    };
    labels?: {
        [key: string]: string;
    };
    regions?: string[];
    schedule?: Schedule;
    timeout?: string;
    vpcConnector?: string;
    vpcConnectorEgressSettings?: string;
    serviceAccountEmail?: string;
    ingressSettings?: string;
    secrets?: string[];
}
/**
 * A Runnable has a `run` method which directly invokes the user-defined
 * function - useful for unit testing.
 */
export interface Runnable<T> {
    /** Directly invoke the user defined function. */
    run: (data: T, context: any) => PromiseLike<any> | any;
}
/**
 * The function type for HTTPS triggers. This should be exported from your
 * JavaScript file to define a Cloud Function.
 *
 * @remarks
 * This type is a special JavaScript function which takes Express
 * {@link https://expressjs.com/en/api.html#req | `Request` } and
 * {@link https://expressjs.com/en/api.html#res | `Response` } objects as its only
 * arguments.
 */
export interface HttpsFunction {
    (req: Request, resp: Response): void | Promise<void>;
    /** @alpha */
    __trigger: TriggerAnnotation;
    /** @alpha */
    __endpoint: ManifestEndpoint;
    /** @alpha */
    __requiredAPIs?: ManifestRequiredAPI[];
}
/**
 * The function type for Auth Blocking triggers.
 *
 * @remarks
 * This type is a special JavaScript function for Auth Blocking triggers which takes Express
 * {@link https://expressjs.com/en/api.html#req | `Request` } and
 * {@link https://expressjs.com/en/api.html#res | `Response` } objects as its only
 * arguments.
 */
export interface BlockingFunction {
    /** @public */
    (req: Request, resp: Response): void | Promise<void>;
    /** @alpha */
    __trigger: TriggerAnnotation;
    /** @alpha */
    __endpoint: ManifestEndpoint;
    /** @alpha */
    __requiredAPIs?: ManifestRequiredAPI[];
}
/**
 * The function type for all non-HTTPS triggers. This should be exported
 * from your JavaScript file to define a Cloud Function.
 *
 * This type is a special JavaScript function which takes a templated
 * `Event` object as its only argument.
 */
export interface CloudFunction<T> extends Runnable<T> {
    (input: any, context?: any): PromiseLike<any> | any;
    /** @alpha */
    __trigger: TriggerAnnotation;
    /** @alpha */
    __endpoint: ManifestEndpoint;
    /** @alpha */
    __requiredAPIs?: ManifestRequiredAPI[];
}
/** @hidden */
export declare function optionsToTrigger(options: DeploymentOptions): any;
export declare function optionsToEndpoint(options: DeploymentOptions): ManifestEndpoint;
