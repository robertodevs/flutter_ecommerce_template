"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2017 Firebase
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionBuilder = exports.runWith = exports.region = void 0;
const options_1 = require("../common/options");
const types_1 = require("../params/types");
const function_configuration_1 = require("./function-configuration");
const analytics = require("./providers/analytics");
const auth = require("./providers/auth");
const database = require("./providers/database");
const firestore = require("./providers/firestore");
const https = require("./providers/https");
const pubsub = require("./providers/pubsub");
const remoteConfig = require("./providers/remoteConfig");
const storage = require("./providers/storage");
const tasks = require("./providers/tasks");
const testLab = require("./providers/testLab");
/**
 * Assert that the runtime options passed in are valid.
 * @param runtimeOptions object containing memory and timeout information.
 * @throws { Error } Memory and TimeoutSeconds values must be valid.
 */
function assertRuntimeOptionsValid(runtimeOptions) {
    const mem = runtimeOptions.memory;
    if (mem && typeof mem !== "object" && !function_configuration_1.VALID_MEMORY_OPTIONS.includes(mem)) {
        throw new Error(`The only valid memory allocation values are: ${function_configuration_1.VALID_MEMORY_OPTIONS.join(", ")}`);
    }
    if (typeof runtimeOptions.timeoutSeconds === "number" &&
        (runtimeOptions.timeoutSeconds > function_configuration_1.MAX_TIMEOUT_SECONDS || runtimeOptions.timeoutSeconds < 0)) {
        throw new Error(`TimeoutSeconds must be between 0 and ${function_configuration_1.MAX_TIMEOUT_SECONDS}`);
    }
    if (runtimeOptions.ingressSettings &&
        !(runtimeOptions.ingressSettings instanceof options_1.ResetValue) &&
        !function_configuration_1.INGRESS_SETTINGS_OPTIONS.includes(runtimeOptions.ingressSettings)) {
        throw new Error(`The only valid ingressSettings values are: ${function_configuration_1.INGRESS_SETTINGS_OPTIONS.join(",")}`);
    }
    if (runtimeOptions.vpcConnectorEgressSettings &&
        !(runtimeOptions.vpcConnectorEgressSettings instanceof options_1.ResetValue) &&
        !function_configuration_1.VPC_EGRESS_SETTINGS_OPTIONS.includes(runtimeOptions.vpcConnectorEgressSettings)) {
        throw new Error(`The only valid vpcConnectorEgressSettings values are: ${function_configuration_1.VPC_EGRESS_SETTINGS_OPTIONS.join(",")}`);
    }
    validateFailurePolicy(runtimeOptions.failurePolicy);
    const serviceAccount = runtimeOptions.serviceAccount;
    if (serviceAccount &&
        !(serviceAccount === "default" ||
            serviceAccount instanceof options_1.ResetValue ||
            serviceAccount instanceof types_1.Expression ||
            serviceAccount.includes("@"))) {
        throw new Error(`serviceAccount must be set to 'default', a string expression, a service account email, or '{serviceAccountName}@'`);
    }
    if (runtimeOptions.labels) {
        // Labels must follow the rules listed in
        // https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements
        if (Object.keys(runtimeOptions.labels).length > function_configuration_1.MAX_NUMBER_USER_LABELS) {
            throw new Error(`A function must not have more than ${function_configuration_1.MAX_NUMBER_USER_LABELS} user-defined labels.`);
        }
        // We reserve the 'deployment' and 'firebase' namespaces for future feature development.
        const reservedKeys = Object.keys(runtimeOptions.labels).filter((key) => key.startsWith("deployment") || key.startsWith("firebase"));
        if (reservedKeys.length) {
            throw new Error(`Invalid labels: ${reservedKeys.join(", ")}. Labels may not start with reserved names 'deployment' or 'firebase'`);
        }
        const invalidLengthKeys = Object.keys(runtimeOptions.labels).filter((key) => key.length < 1 || key.length > 63);
        if (invalidLengthKeys.length > 0) {
            throw new Error(`Invalid labels: ${invalidLengthKeys.join(", ")}. Label keys must be between 1 and 63 characters in length.`);
        }
        const invalidLengthValues = Object.values(runtimeOptions.labels).filter((value) => value.length > 63);
        if (invalidLengthValues.length > 0) {
            throw new Error(`Invalid labels: ${invalidLengthValues.join(", ")}. Label values must be less than 64 charcters.`);
        }
        // Keys can contain lowercase letters, foreign characters, numbers, _ or -. They must start with a letter.
        const validKeyPattern = /^[\p{Ll}\p{Lo}][\p{Ll}\p{Lo}\p{N}_-]{0,62}$/u;
        const invalidKeys = Object.keys(runtimeOptions.labels).filter((key) => !validKeyPattern.test(key));
        if (invalidKeys.length > 0) {
            throw new Error(`Invalid labels: ${invalidKeys.join(", ")}. Label keys can only contain lowercase letters, international characters, numbers, _ or -, and must start with a letter.`);
        }
        // Values can contain lowercase letters, foreign characters, numbers, _ or -.
        const validValuePattern = /^[\p{Ll}\p{Lo}\p{N}_-]{0,63}$/u;
        const invalidValues = Object.values(runtimeOptions.labels).filter((value) => !validValuePattern.test(value));
        if (invalidValues.length > 0) {
            throw new Error(`Invalid labels: ${invalidValues.join(", ")}. Label values can only contain lowercase letters, international characters, numbers, _ or -.`);
        }
    }
    if (typeof runtimeOptions.invoker === "string" && runtimeOptions.invoker.length === 0) {
        throw new Error("Invalid service account for function invoker, must be a non-empty string");
    }
    if (runtimeOptions.invoker !== undefined && Array.isArray(runtimeOptions.invoker)) {
        if (runtimeOptions.invoker.length === 0) {
            throw new Error("Invalid invoker array, must contain at least 1 service account entry");
        }
        for (const serviceAccount of runtimeOptions.invoker) {
            if (serviceAccount.length === 0) {
                throw new Error("Invalid invoker array, a service account must be a non-empty string");
            }
            if (serviceAccount === "public") {
                throw new Error("Invalid invoker array, a service account cannot be set to the 'public' identifier");
            }
            if (serviceAccount === "private") {
                throw new Error("Invalid invoker array, a service account cannot be set to the 'private' identifier");
            }
        }
    }
    if (runtimeOptions.secrets !== undefined) {
        const invalidSecrets = runtimeOptions.secrets.filter((s) => !/^[A-Za-z\d\-_]+$/.test(s instanceof types_1.SecretParam ? s.name : s));
        if (invalidSecrets.length > 0) {
            throw new Error(`Invalid secrets: ${invalidSecrets.join(",")}. ` +
                "Secret must be configured using the resource id (e.g. API_KEY)");
        }
    }
    if ("allowInvalidAppCheckToken" in runtimeOptions) {
        throw new Error('runWith option "allowInvalidAppCheckToken" has been inverted and ' +
            'renamed "enforceAppCheck"');
    }
    return true;
}
function validateFailurePolicy(policy) {
    if (typeof policy === "boolean" || typeof policy === "undefined") {
        return;
    }
    if (typeof policy !== "object") {
        throw new Error(`failurePolicy must be a boolean or an object.`);
    }
    const retry = policy.retry;
    if (typeof retry !== "object" || Object.keys(retry).length) {
        throw new Error("failurePolicy.retry must be an empty object.");
    }
}
/**
 * Assert regions specified are valid.
 * @param regions list of regions.
 * @throws { Error } Regions must be in list of supported regions.
 */
function assertRegionsAreValid(regions) {
    if (!regions.length) {
        throw new Error("You must specify at least one region");
    }
    return true;
}
/**
 * Configure the regions that the function is deployed to.
 * @param regions One of more region strings.
 * @example
 * functions.region('us-east1')
 * @example
 * functions.region('us-east1', 'us-central1')
 */
function region(...regions) {
    if (assertRegionsAreValid(regions)) {
        return new FunctionBuilder({ regions });
    }
}
exports.region = region;
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
function runWith(runtimeOptions) {
    if (assertRuntimeOptionsValid(runtimeOptions)) {
        return new FunctionBuilder(runtimeOptions);
    }
}
exports.runWith = runWith;
class FunctionBuilder {
    constructor(options) {
        this.options = options;
    }
    /**
     * Configure the regions that the function is deployed to.
     * @param regions One or more region strings.
     * @example
     * functions.region('us-east1')
     * @example
     * functions.region('us-east1', 'us-central1')
     */
    region(...regions) {
        if (assertRegionsAreValid(regions)) {
            this.options.regions = regions;
            return this;
        }
    }
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
    runWith(runtimeOptions) {
        if (assertRuntimeOptionsValid(runtimeOptions)) {
            this.options = {
                ...this.options,
                ...runtimeOptions,
            };
            return this;
        }
    }
    get https() {
        if (this.options.failurePolicy !== undefined) {
            console.warn("RuntimeOptions.failurePolicy is not supported in https functions.");
        }
        return {
            /**
             * Handle HTTP requests.
             * @param handler A function that takes a request and response object,
             * same signature as an Express app.
             */
            onRequest: (handler) => https._onRequestWithOptions(handler, this.options),
            /**
             * Declares a callable method for clients to call using a Firebase SDK.
             * @param handler A method that takes a data and context and returns a value.
             */
            onCall: (handler) => https._onCallWithOptions(handler, this.options),
        };
    }
    get tasks() {
        return {
            /**
             * Declares a task queue function for clients to call using a Firebase Admin SDK.
             * @param options Configurations for the task queue function.
             */
            /** @hidden */
            taskQueue: (options) => {
                return new tasks.TaskQueueBuilder(options, this.options);
            },
        };
    }
    get database() {
        return {
            /**
             * Selects a database instance that will trigger the function. If omitted,
             * will pick the default database for your project.
             * @param instance The Realtime Database instance to use.
             */
            instance: (instance) => database._instanceWithOptions(instance, this.options),
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
            ref: (path) => database._refWithOptions(path, this.options),
        };
    }
    get firestore() {
        return {
            /**
             * Select the Firestore document to listen to for events.
             * @param path Full database path to listen to. This includes the name of
             * the collection that the document is a part of. For example, if the
             * collection is named "users" and the document is named "Ada", then the
             * path is "/users/Ada".
             */
            document: (path) => firestore._documentWithOptions(path, this.options),
            /** @hidden */
            namespace: (namespace) => firestore._namespaceWithOptions(namespace, this.options),
            /** @hidden */
            database: (database) => firestore._databaseWithOptions(database, this.options),
        };
    }
    get analytics() {
        return {
            /**
             * Select analytics events to listen to for events.
             * @param analyticsEventType Name of the analytics event type.
             */
            event: (analyticsEventType) => analytics._eventWithOptions(analyticsEventType, this.options),
        };
    }
    get remoteConfig() {
        return {
            /**
             * Handle all updates (including rollbacks) that affect a Remote Config
             * project.
             * @param handler A function that takes the updated Remote Config template
             * version metadata as an argument.
             */
            onUpdate: (handler) => remoteConfig._onUpdateWithOptions(handler, this.options),
        };
    }
    get storage() {
        return {
            /**
             * The optional bucket function allows you to choose which buckets' events
             * to handle. This step can be bypassed by calling object() directly,
             * which will use the default Cloud Storage for Firebase bucket.
             * @param bucket Name of the Google Cloud Storage bucket to listen to.
             */
            bucket: (bucket) => storage._bucketWithOptions(this.options, bucket),
            /**
             * Handle events related to Cloud Storage objects.
             */
            object: () => storage._objectWithOptions(this.options),
        };
    }
    get pubsub() {
        return {
            /**
             * Select Cloud Pub/Sub topic to listen to.
             * @param topic Name of Pub/Sub topic, must belong to the same project as
             * the function.
             */
            topic: (topic) => pubsub._topicWithOptions(topic, this.options),
            schedule: (schedule) => pubsub._scheduleWithOptions(schedule, this.options),
        };
    }
    get auth() {
        return {
            /**
             * Handle events related to Firebase authentication users.
             */
            user: (userOptions) => auth._userWithOptions(this.options, userOptions),
        };
    }
    get testLab() {
        return {
            /**
             * Handle events related to Test Lab test matrices.
             */
            testMatrix: () => testLab._testMatrixWithOpts(this.options),
        };
    }
}
exports.FunctionBuilder = FunctionBuilder;
