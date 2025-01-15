"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2022 Firebase
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
exports.getOptsAndBucket = exports.onOperation = exports.onObjectMetadataUpdated = exports.onObjectDeleted = exports.onObjectFinalized = exports.onObjectArchived = exports.metadataUpdatedEvent = exports.deletedEvent = exports.finalizedEvent = exports.archivedEvent = void 0;
/**
 * Cloud functions to handle events from Google Cloud Storage.
 * @packageDocumentation
 */
const config_1 = require("../../common/config");
const encoding_1 = require("../../common/encoding");
const manifest_1 = require("../../runtime/manifest");
const trace_1 = require("../trace");
const options = require("../options");
const onInit_1 = require("../../common/onInit");
/** @internal */
exports.archivedEvent = "google.cloud.storage.object.v1.archived";
/** @internal */
exports.finalizedEvent = "google.cloud.storage.object.v1.finalized";
/** @internal */
exports.deletedEvent = "google.cloud.storage.object.v1.deleted";
/** @internal */
exports.metadataUpdatedEvent = "google.cloud.storage.object.v1.metadataUpdated";
/**
 * Event handler sent only when a bucket has enabled object versioning.
 * This event indicates that the live version of an object has become an
 * archived version, either because it was archived or because it was
 * overwritten by the upload of an object of the same name.
 *
 * @param bucketOrOptsOrHandler - Options or string that may (or may not) define the bucket to be used.
 * @param handler - Event handler which is run every time a Google Cloud Storage archival occurs.
 */
function onObjectArchived(bucketOrOptsOrHandler, handler) {
    return onOperation(exports.archivedEvent, bucketOrOptsOrHandler, handler);
}
exports.onObjectArchived = onObjectArchived;
/**
 * Event handler which fires every time a Google Cloud Storage object
 * creation occurs.
 *
 * Sent when a new object (or a new generation of an existing object)
 * is successfully created in the bucket. This includes copying or rewriting
 * an existing object. A failed upload does not trigger this event.
 *
 * @param bucketOrOptsOrHandler - Options or string that may (or may not) define the bucket to be used.
 * @param handler - Event handler which is run every time a Google Cloud Storage object creation occurs.
 */
function onObjectFinalized(bucketOrOptsOrHandler, handler) {
    return onOperation(exports.finalizedEvent, bucketOrOptsOrHandler, handler);
}
exports.onObjectFinalized = onObjectFinalized;
/**
 * Event handler which fires every time a Google Cloud Storage deletion occurs.
 *
 * Sent when an object has been permanently deleted. This includes objects
 * that are overwritten or are deleted as part of the bucket's lifecycle
 * configuration. For buckets with object versioning enabled, this is not
 * sent when an object is archived, even if archival occurs
 * via the `storage.objects.delete` method.
 *
 * @param bucketOrOptsOrHandler - Options or string that may (or may not) define the bucket to be used.
 * @param handler - Event handler which is run every time a Google Cloud Storage object deletion occurs.
 */
function onObjectDeleted(bucketOrOptsOrHandler, handler) {
    return onOperation(exports.deletedEvent, bucketOrOptsOrHandler, handler);
}
exports.onObjectDeleted = onObjectDeleted;
/**
 * Event handler which fires every time the metadata of an existing object
 * changes.
 *
 * @param bucketOrOptsOrHandler - Options or string that may (or may not) define the bucket to be used.
 * @param handler - Event handler which is run every time a Google Cloud Storage object metadata update occurs.
 */
function onObjectMetadataUpdated(bucketOrOptsOrHandler, handler) {
    return onOperation(exports.metadataUpdatedEvent, bucketOrOptsOrHandler, handler);
}
exports.onObjectMetadataUpdated = onObjectMetadataUpdated;
/** @internal */
function onOperation(eventType, bucketOrOptsOrHandler, handler) {
    if (typeof bucketOrOptsOrHandler === "function") {
        handler = bucketOrOptsOrHandler;
        bucketOrOptsOrHandler = {};
    }
    const [opts, bucket] = getOptsAndBucket(bucketOrOptsOrHandler);
    const func = (raw) => {
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))(raw);
    };
    func.run = handler;
    Object.defineProperty(func, "__trigger", {
        get: () => {
            const baseOpts = options.optionsToTriggerAnnotations(options.getGlobalOptions());
            const specificOpts = options.optionsToTriggerAnnotations(opts);
            return {
                platform: "gcfv2",
                ...baseOpts,
                ...specificOpts,
                labels: {
                    ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
                    ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
                },
                eventTrigger: {
                    eventType,
                    resource: bucket, // TODO(colerogers): replace with 'bucket,' eventually
                },
            };
        },
    });
    // TypeScript doesn't recognize defineProperty as adding a property and complains
    // that __endpoint doesn't exist. We can either cast to any and lose all type safety
    // or we can just assign a meaningless value before calling defineProperty.
    func.__endpoint = {};
    // SDK may attempt to read FIREBASE_CONFIG env var to fetch the default bucket name.
    // To prevent runtime errors when FIREBASE_CONFIG env var is missing, we use getters.
    Object.defineProperty(func, "__endpoint", {
        get: () => {
            var _a;
            const baseOpts = options.optionsToEndpoint(options.getGlobalOptions());
            const specificOpts = options.optionsToEndpoint(opts);
            const endpoint = {
                platform: "gcfv2",
                ...(0, manifest_1.initV2Endpoint)(options.getGlobalOptions(), opts),
                ...baseOpts,
                ...specificOpts,
                labels: {
                    ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
                    ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
                },
                eventTrigger: {
                    eventType,
                    eventFilters: { bucket },
                    retry: (_a = opts.retry) !== null && _a !== void 0 ? _a : false,
                },
            };
            (0, encoding_1.copyIfPresent)(endpoint.eventTrigger, opts, "retry", "retry");
            return endpoint;
        },
    });
    return func;
}
exports.onOperation = onOperation;
/** @internal */
function getOptsAndBucket(bucketOrOpts) {
    var _a;
    let bucket;
    let opts;
    // If bucket is a string or Expression<string>
    if (typeof bucketOrOpts === "string" || "value" in bucketOrOpts) {
        bucket = bucketOrOpts;
        opts = {};
    }
    else {
        bucket = bucketOrOpts.bucket || ((_a = (0, config_1.firebaseConfig)()) === null || _a === void 0 ? void 0 : _a.storageBucket);
        opts = { ...bucketOrOpts };
        delete opts.bucket;
    }
    if (!bucket) {
        throw new Error("Missing bucket name. If you are unit testing, please provide a bucket name" +
            " by providing bucket name directly in the event handler or by setting process.env.FIREBASE_CONFIG.");
    }
    if (typeof bucket === "string" && !/^[a-z\d][a-z\d\\._-]{1,230}[a-z\d]$/.test(bucket)) {
        throw new Error(`Invalid bucket name ${bucket}`);
    }
    return [opts, bucket];
}
exports.getOptsAndBucket = getOptsAndBucket;
