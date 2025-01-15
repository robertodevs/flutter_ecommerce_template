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
exports.extractInstanceAndPath = exports.RefBuilder = exports._refWithOptions = exports.InstanceBuilder = exports._instanceWithOptions = exports.ref = exports.instance = exports.service = exports.provider = exports.DataSnapshot = void 0;
const app_1 = require("../../common/app");
const config_1 = require("../../common/config");
const database_1 = require("../../common/providers/database");
Object.defineProperty(exports, "DataSnapshot", { enumerable: true, get: function () { return database_1.DataSnapshot; } });
const path_1 = require("../../common/utilities/path");
const utils_1 = require("../../common/utilities/utils");
const cloud_functions_1 = require("../cloud-functions");
/** @internal */
exports.provider = "google.firebase.database";
/** @internal */
exports.service = "firebaseio.com";
const databaseURLRegex = new RegExp("^https://([^.]+).");
const emulatorDatabaseURLRegex = new RegExp("^http://.*ns=([^&]+)");
/**
 * Registers a function that triggers on events from a specific
 * Firebase Realtime Database instance.
 *
 * @remarks
 * Use this method together with `ref` to specify the instance on which to
 * watch for database events. For example: `firebase.database.instance('my-app-db-2').ref('/foo/bar')`
 *
 * Note that `functions.database.ref` used without `instance` watches the
 * *default* instance for events.
 *
 * @param instance The instance name of the database instance
 *   to watch for write events.
 * @returns Firebase Realtime Database instance builder interface.
 */
function instance(instance) {
    return _instanceWithOptions(instance, {});
}
exports.instance = instance;
/**
 * Registers a function that triggers on Firebase Realtime Database write
 * events.
 *
 * @remarks
 * This method behaves very similarly to the method of the same name in the
 * client and Admin Firebase SDKs. Any change to the Database that affects the
 * data at or below the provided `path` will fire an event in Cloud Functions.
 *
 * There are three important differences between listening to a Realtime
 * Database event in Cloud Functions and using the Realtime Database in the
 * client and Admin SDKs:
 *
 * 1. Cloud Functions allows wildcards in the `path` name. Any `path` component
 *    in curly brackets (`{}`) is a wildcard that matches all strings. The value
 *    that matched a certain invocation of a Cloud Function is returned as part
 *    of the [`EventContext.params`](cloud_functions_eventcontext.html#params object. For
 *    example, `ref("messages/{messageId}")` matches changes at
 *    `/messages/message1` or `/messages/message2`, resulting in
 *    `event.params.messageId` being set to `"message1"` or `"message2"`,
 *    respectively.
 *
 * 2. Cloud Functions do not fire an event for data that already existed before
 *    the Cloud Function was deployed.
 *
 * 3. Cloud Function events have access to more information, including a
 *    snapshot of the previous event data and information about the user who
 *    triggered the Cloud Function.
 *
 * @param path The path within the Database to watch for write events.
 * @returns Firebase Realtime Database builder interface.
 */
function ref(path) {
    return _refWithOptions(path, {});
}
exports.ref = ref;
/** @internal */
function _instanceWithOptions(instance, options) {
    return new InstanceBuilder(instance, options);
}
exports._instanceWithOptions = _instanceWithOptions;
/**
 * The Firebase Realtime Database instance builder interface.
 *
 * Access via [`database.instance()`](providers_database_.html#instance).
 */
class InstanceBuilder {
    constructor(instance, options) {
        this.instance = instance;
        this.options = options;
    }
    /**
     * @returns Firebase Realtime Database reference builder interface.
     */
    ref(path) {
        const normalized = (0, path_1.normalizePath)(path);
        return new RefBuilder(() => `projects/_/instances/${this.instance}/refs/${normalized}`, this.options);
    }
}
exports.InstanceBuilder = InstanceBuilder;
/** @internal */
function _refWithOptions(path, options) {
    const resourceGetter = () => {
        const normalized = (0, path_1.normalizePath)(path);
        const databaseURL = (0, config_1.firebaseConfig)().databaseURL;
        if (!databaseURL) {
            throw new Error("Missing expected firebase config value databaseURL, " +
                "config is actually" +
                JSON.stringify((0, config_1.firebaseConfig)()) +
                "\n If you are unit testing, please set process.env.FIREBASE_CONFIG");
        }
        let instance;
        const prodMatch = databaseURL.match(databaseURLRegex);
        if (prodMatch) {
            instance = prodMatch[1];
        }
        else {
            const emulatorMatch = databaseURL.match(emulatorDatabaseURLRegex);
            if (emulatorMatch) {
                instance = emulatorMatch[1];
            }
        }
        if (!instance) {
            throw new Error("Invalid value for config firebase.databaseURL: " + databaseURL);
        }
        return `projects/_/instances/${instance}/refs/${normalized}`;
    };
    return new RefBuilder(resourceGetter, options);
}
exports._refWithOptions = _refWithOptions;
/**
 * The Firebase Realtime Database reference builder interface.
 *
 * Access via [`functions.database.ref()`](functions.database#.ref).
 */
class RefBuilder {
    constructor(triggerResource, options) {
        this.triggerResource = triggerResource;
        this.options = options;
        this.changeConstructor = (raw) => {
            const [dbInstance, path] = extractInstanceAndPath(raw.context.resource.name, raw.context.domain);
            const before = new database_1.DataSnapshot(raw.data.data, path, (0, app_1.getApp)(), dbInstance);
            const after = new database_1.DataSnapshot((0, utils_1.applyChange)(raw.data.data, raw.data.delta), path, (0, app_1.getApp)(), dbInstance);
            return {
                before,
                after,
            };
        };
    }
    /**
     * Event handler that fires every time a Firebase Realtime Database write
     * of any kind (creation, update, or delete) occurs.
     *
     * @param handler Event handler that runs every time a Firebase Realtime Database
     *   write occurs.
     * @returns A function that you can export and deploy.
     */
    onWrite(handler) {
        return this.onOperation(handler, "ref.write", this.changeConstructor);
    }
    /**
     * Event handler that fires every time data is updated in
     * Firebase Realtime Database.
     *
     * @param handler Event handler which is run every time a Firebase Realtime Database
     *   write occurs.
     * @returns A function which you can export and deploy.
     */
    onUpdate(handler) {
        return this.onOperation(handler, "ref.update", this.changeConstructor);
    }
    /**
     * Event handler that fires every time new data is created in
     * Firebase Realtime Database.
     *
     * @param handler Event handler that runs every time new data is created in
     *   Firebase Realtime Database.
     * @returns A function that you can export and deploy.
     */
    onCreate(handler) {
        const dataConstructor = (raw) => {
            const [dbInstance, path] = extractInstanceAndPath(raw.context.resource.name, raw.context.domain);
            return new database_1.DataSnapshot(raw.data.delta, path, (0, app_1.getApp)(), dbInstance);
        };
        return this.onOperation(handler, "ref.create", dataConstructor);
    }
    /**
     * Event handler that fires every time data is deleted from
     * Firebase Realtime Database.
     *
     * @param handler Event handler that runs every time data is deleted from
     *   Firebase Realtime Database.
     * @returns A function that you can export and deploy.
     */
    onDelete(handler) {
        const dataConstructor = (raw) => {
            const [dbInstance, path] = extractInstanceAndPath(raw.context.resource.name, raw.context.domain);
            return new database_1.DataSnapshot(raw.data.data, path, (0, app_1.getApp)(), dbInstance);
        };
        return this.onOperation(handler, "ref.delete", dataConstructor);
    }
    onOperation(handler, eventType, dataConstructor) {
        return (0, cloud_functions_1.makeCloudFunction)({
            handler,
            provider: exports.provider,
            service: exports.service,
            eventType,
            legacyEventType: `providers/${exports.provider}/eventTypes/${eventType}`,
            triggerResource: this.triggerResource,
            dataConstructor,
            options: this.options,
        });
    }
}
exports.RefBuilder = RefBuilder;
const resourceRegex = /^projects\/([^/]+)\/instances\/([a-zA-Z0-9-]+)\/refs(\/.+)?/;
/**
 * Utility function to extract database reference from resource string
 *
 * @param optional database domain override for the original of the source database.
 *    It defaults to `firebaseio.com`.
 *    Multi-region RTDB will be served from different domains.
 *    Since region is not part of the resource name, it is provided through context.
 *
 * @internal
 */
function extractInstanceAndPath(resource, domain = "firebaseio.com") {
    const match = resource.match(new RegExp(resourceRegex));
    if (!match) {
        throw new Error(`Unexpected resource string for Firebase Realtime Database event: ${resource}. ` +
            'Expected string in the format of "projects/_/instances/{firebaseioSubdomain}/refs/{ref=**}"');
    }
    const [, project, dbInstanceName, path] = match;
    if (project !== "_") {
        throw new Error(`Expect project to be '_' in a Firebase Realtime Database event`);
    }
    const emuHost = process.env.FIREBASE_DATABASE_EMULATOR_HOST;
    if (emuHost) {
        const dbInstance = `http://${emuHost}/?ns=${dbInstanceName}`;
        return [dbInstance, path];
    }
    else {
        const dbInstance = "https://" + dbInstanceName + "." + domain;
        return [dbInstance, path];
    }
}
exports.extractInstanceAndPath = extractInstanceAndPath;
