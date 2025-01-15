import * as express from "express";
import { ResetValue } from "../common/options";
import { Expression } from "../params/types";
import { EventContext } from "./cloud-functions";
import { DeploymentOptions, RuntimeOptions, SUPPORTED_REGIONS } from "./function-configuration";
import * as analytics from "./providers/analytics";
import * as auth from "./providers/auth";
import * as database from "./providers/database";
import * as firestore from "./providers/firestore";
import * as https from "./providers/https";
import * as pubsub from "./providers/pubsub";
import * as remoteConfig from "./providers/remoteConfig";
import * as storage from "./providers/storage";
import * as tasks from "./providers/tasks";
import * as testLab from "./providers/testLab";
/**
 * Configure the regions that the function is deployed to.
 * @param regions One of more region strings.
 * @example
 * functions.region('us-east1')
 * @example
 * functions.region('us-east1', 'us-central1')
 */
export declare function region(...regions: Array<(typeof SUPPORTED_REGIONS)[number] | string | Expression<string> | ResetValue>): FunctionBuilder;
/**
 * Configure runtime options for the function.
 * @param runtimeOptions Object with optional fields:
 * 1. `memory`: amount of memory to allocate to the function, possible values
 *    are: '128MB', '256MB', '512MB', '1GB', '2GB', '4GB', and '8GB'.
 * 2. `timeoutSeconds`: timeout for the function in seconds, possible values are
 *    0 to 540.
 * 3. `failurePolicy`: failure policy of the function, with boolean `true` being
 *    equivalent to providing an empty retry object.
 * 4. `vpcConnector`: id of a VPC connector in same project and region.
 * 5. `vpcConnectorEgressSettings`: when a vpcConnector is set, control which
 *    egress traffic is sent through the vpcConnector.
 * 6. `serviceAccount`: Specific service account for the function.
 * 7. `ingressSettings`: ingress settings for the function, which control where a HTTPS
 *    function can be called from.
 *
 * Value must not be null.
 */
export declare function runWith(runtimeOptions: RuntimeOptions): FunctionBuilder;
export declare class FunctionBuilder {
    private options;
    constructor(options: DeploymentOptions);
    /**
     * Configure the regions that the function is deployed to.
     * @param regions One or more region strings.
     * @example
     * functions.region('us-east1')
     * @example
     * functions.region('us-east1', 'us-central1')
     */
    region(...regions: Array<(typeof SUPPORTED_REGIONS)[number] | string | Expression<string> | ResetValue>): FunctionBuilder;
    /**
     * Configure runtime options for the function.
     * @param runtimeOptions Object with optional fields:
     * 1. `memory`: amount of memory to allocate to the function, possible values
     *    are: '128MB', '256MB', '512MB', '1GB', '2GB', '4GB', and '8GB'.
     * 2. `timeoutSeconds`: timeout for the function in seconds, possible values are
     *    0 to 540.
     * 3. `failurePolicy`: failure policy of the function, with boolean `true` being
     *    equivalent to providing an empty retry object.
     * 4. `vpcConnector`: id of a VPC connector in the same project and region
     * 5. `vpcConnectorEgressSettings`: when a `vpcConnector` is set, control which
     *    egress traffic is sent through the `vpcConnector`.
     *
     * Value must not be null.
     */
    runWith(runtimeOptions: RuntimeOptions): FunctionBuilder;
    get https(): {
        /**
         * Handle HTTP requests.
         * @param handler A function that takes a request and response object,
         * same signature as an Express app.
         */
        onRequest: (handler: (req: https.Request, resp: express.Response) => void | Promise<void>) => import("./cloud-functions").HttpsFunction;
        /**
         * Declares a callable method for clients to call using a Firebase SDK.
         * @param handler A method that takes a data and context and returns a value.
         */
        onCall: (handler: (data: any, context: https.CallableContext) => any | Promise<any>) => import("./cloud-functions").HttpsFunction & import("./cloud-functions").Runnable<any>;
    };
    get tasks(): {
        /**
         * Declares a task queue function for clients to call using a Firebase Admin SDK.
         * @param options Configurations for the task queue function.
         */
        /** @hidden */
        taskQueue: (options?: tasks.TaskQueueOptions) => tasks.TaskQueueBuilder;
    };
    get database(): {
        /**
         * Selects a database instance that will trigger the function. If omitted,
         * will pick the default database for your project.
         * @param instance The Realtime Database instance to use.
         */
        instance: (instance: string) => database.InstanceBuilder;
        /**
         * Select Firebase Realtime Database Reference to listen to.
         *
         * This method behaves very similarly to the method of the same name in
         * the client and Admin Firebase SDKs. Any change to the Database that
         * affects the data at or below the provided `path` will fire an event in
         * Cloud Functions.
         *
         * There are three important differences between listening to a Realtime
         * Database event in Cloud Functions and using the Realtime Database in
         * the client and Admin SDKs:
         * 1. Cloud Functions allows wildcards in the `path` name. Any `path`
         *    component in curly brackets (`{}`) is a wildcard that matches all
         *    strings. The value that matched a certain invocation of a Cloud
         *    Function is returned as part of the `context.params` object. For
         *    example, `ref("messages/{messageId}")` matches changes at
         *    `/messages/message1` or `/messages/message2`, resulting in
         *    `context.params.messageId` being set to `"message1"` or
         *    `"message2"`, respectively.
         * 2. Cloud Functions do not fire an event for data that already existed
         *    before the Cloud Function was deployed.
         * 3. Cloud Function events have access to more information, including
         *    information about the user who triggered the Cloud Function.
         * @param ref Path of the database to listen to.
         */
        ref: <Ref extends string>(path: Ref) => database.RefBuilder<Ref>;
    };
    get firestore(): {
        /**
         * Select the Firestore document to listen to for events.
         * @param path Full database path to listen to. This includes the name of
         * the collection that the document is a part of. For example, if the
         * collection is named "users" and the document is named "Ada", then the
         * path is "/users/Ada".
         */
        document: <Path extends string>(path: Path) => firestore.DocumentBuilder<Path>;
        /** @hidden */
        namespace: (namespace: string) => firestore.NamespaceBuilder;
        /** @hidden */
        database: (database: string) => firestore.DatabaseBuilder;
    };
    get analytics(): {
        /**
         * Select analytics events to listen to for events.
         * @param analyticsEventType Name of the analytics event type.
         */
        event: (analyticsEventType: string) => analytics.AnalyticsEventBuilder;
    };
    get remoteConfig(): {
        /**
         * Handle all updates (including rollbacks) that affect a Remote Config
         * project.
         * @param handler A function that takes the updated Remote Config template
         * version metadata as an argument.
         */
        onUpdate: (handler: (version: remoteConfig.TemplateVersion, context: EventContext) => PromiseLike<any> | any) => import("./cloud-functions").CloudFunction<remoteConfig.TemplateVersion>;
    };
    get storage(): {
        /**
         * The optional bucket function allows you to choose which buckets' events
         * to handle. This step can be bypassed by calling object() directly,
         * which will use the default Cloud Storage for Firebase bucket.
         * @param bucket Name of the Google Cloud Storage bucket to listen to.
         */
        bucket: (bucket?: string) => storage.BucketBuilder;
        /**
         * Handle events related to Cloud Storage objects.
         */
        object: () => storage.ObjectBuilder;
    };
    get pubsub(): {
        /**
         * Select Cloud Pub/Sub topic to listen to.
         * @param topic Name of Pub/Sub topic, must belong to the same project as
         * the function.
         */
        topic: (topic: string) => pubsub.TopicBuilder;
        schedule: (schedule: string) => pubsub.ScheduleBuilder;
    };
    get auth(): {
        /**
         * Handle events related to Firebase authentication users.
         */
        user: (userOptions?: auth.UserOptions) => auth.UserBuilder;
    };
    get testLab(): {
        /**
         * Handle events related to Test Lab test matrices.
         */
        testMatrix: () => testLab.TestMatrixBuilder;
    };
}
