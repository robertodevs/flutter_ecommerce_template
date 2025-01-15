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
exports.onOperation = exports.onChangedOperation = exports.makeEndpoint = exports.makeParams = exports.getOpts = exports.onValueDeleted = exports.onValueUpdated = exports.onValueCreated = exports.onValueWritten = exports.deletedEventType = exports.updatedEventType = exports.createdEventType = exports.writtenEventType = exports.DataSnapshot = void 0;
const app_1 = require("../../common/app");
const database_1 = require("../../common/providers/database");
Object.defineProperty(exports, "DataSnapshot", { enumerable: true, get: function () { return database_1.DataSnapshot; } });
const path_1 = require("../../common/utilities/path");
const path_pattern_1 = require("../../common/utilities/path-pattern");
const utils_1 = require("../../common/utilities/utils");
const manifest_1 = require("../../runtime/manifest");
const trace_1 = require("../trace");
const options = require("../options");
const onInit_1 = require("../../common/onInit");
/** @internal */
exports.writtenEventType = "google.firebase.database.ref.v1.written";
/** @internal */
exports.createdEventType = "google.firebase.database.ref.v1.created";
/** @internal */
exports.updatedEventType = "google.firebase.database.ref.v1.updated";
/** @internal */
exports.deletedEventType = "google.firebase.database.ref.v1.deleted";
/**
 * Event handler which triggers when data is created, updated, or deleted in Realtime Database.
 *
 * @param referenceOrOpts - Options or a string reference.
 * @param handler - Event handler which is run every time a Realtime Database create, update, or delete occurs.
 */
function onValueWritten(referenceOrOpts, handler) {
    return onChangedOperation(exports.writtenEventType, referenceOrOpts, handler);
}
exports.onValueWritten = onValueWritten;
/**
 * Event handler which triggers when data is created in Realtime Database.
 *
 * @param referenceOrOpts - Options or a string reference.
 * @param handler - Event handler which is run every time a Realtime Database create occurs.
 */
function onValueCreated(referenceOrOpts, handler) {
    return onOperation(exports.createdEventType, referenceOrOpts, handler);
}
exports.onValueCreated = onValueCreated;
/**
 * Event handler which triggers when data is updated in Realtime Database.
 *
 * @param referenceOrOpts - Options or a string reference.
 * @param handler - Event handler which is run every time a Realtime Database update occurs.
 */
function onValueUpdated(referenceOrOpts, handler) {
    return onChangedOperation(exports.updatedEventType, referenceOrOpts, handler);
}
exports.onValueUpdated = onValueUpdated;
/**
 * Event handler which triggers when data is deleted in Realtime Database.
 *
 * @param referenceOrOpts - Options or a string reference.
 * @param handler - Event handler which is run every time a Realtime Database deletion occurs.
 */
function onValueDeleted(referenceOrOpts, handler) {
    // TODO - need to use event.data.delta
    return onOperation(exports.deletedEventType, referenceOrOpts, handler);
}
exports.onValueDeleted = onValueDeleted;
/** @internal */
function getOpts(referenceOrOpts) {
    let path;
    let instance;
    let opts;
    if (typeof referenceOrOpts === "string") {
        path = (0, path_1.normalizePath)(referenceOrOpts);
        instance = "*";
        opts = {};
    }
    else {
        path = (0, path_1.normalizePath)(referenceOrOpts.ref);
        instance = referenceOrOpts.instance || "*";
        opts = { ...referenceOrOpts };
        delete opts.ref;
        delete opts.instance;
    }
    return {
        path,
        instance,
        opts,
    };
}
exports.getOpts = getOpts;
/** @internal */
function makeParams(event, path, instance) {
    return {
        ...path.extractMatches(event.ref),
        ...instance.extractMatches(event.instance),
    };
}
exports.makeParams = makeParams;
/** @hidden */
function makeDatabaseEvent(event, data, instance, params) {
    const snapshot = new database_1.DataSnapshot(data, event.ref, (0, app_1.getApp)(), instance);
    const databaseEvent = {
        ...event,
        firebaseDatabaseHost: event.firebasedatabasehost,
        data: snapshot,
        params,
    };
    delete databaseEvent.firebasedatabasehost;
    return databaseEvent;
}
/** @hidden */
function makeChangedDatabaseEvent(event, instance, params) {
    const before = new database_1.DataSnapshot(event.data.data, event.ref, (0, app_1.getApp)(), instance);
    const after = new database_1.DataSnapshot((0, utils_1.applyChange)(event.data.data, event.data.delta), event.ref, (0, app_1.getApp)(), instance);
    const databaseEvent = {
        ...event,
        firebaseDatabaseHost: event.firebasedatabasehost,
        data: {
            before,
            after,
        },
        params,
    };
    delete databaseEvent.firebasedatabasehost;
    return databaseEvent;
}
/** @internal */
function makeEndpoint(eventType, opts, path, instance) {
    var _a;
    const baseOpts = options.optionsToEndpoint(options.getGlobalOptions());
    const specificOpts = options.optionsToEndpoint(opts);
    const eventFilters = {};
    const eventFilterPathPatterns = {
        // Note: Eventarc always treats ref as a path pattern
        ref: path.getValue(),
    };
    instance.hasWildcards()
        ? (eventFilterPathPatterns.instance = instance.getValue())
        : (eventFilters.instance = instance.getValue());
    return {
        ...(0, manifest_1.initV2Endpoint)(options.getGlobalOptions(), opts),
        platform: "gcfv2",
        ...baseOpts,
        ...specificOpts,
        labels: {
            ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
            ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
        },
        eventTrigger: {
            eventType,
            eventFilters,
            eventFilterPathPatterns,
            retry: (_a = opts.retry) !== null && _a !== void 0 ? _a : false,
        },
    };
}
exports.makeEndpoint = makeEndpoint;
/** @internal */
function onChangedOperation(eventType, referenceOrOpts, handler) {
    const { path, instance, opts } = getOpts(referenceOrOpts);
    const pathPattern = new path_pattern_1.PathPattern(path);
    const instancePattern = new path_pattern_1.PathPattern(instance);
    // wrap the handler
    const func = (raw) => {
        const event = raw;
        const instanceUrl = getInstance(event);
        const params = makeParams(event, pathPattern, instancePattern);
        const databaseEvent = makeChangedDatabaseEvent(event, instanceUrl, params);
        // Intentionally put init in the context of traces in case there is something
        // expensive to observe.
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))(databaseEvent);
    };
    func.run = handler;
    func.__endpoint = makeEndpoint(eventType, opts, pathPattern, instancePattern);
    return func;
}
exports.onChangedOperation = onChangedOperation;
/** @internal */
function onOperation(eventType, referenceOrOpts, handler) {
    const { path, instance, opts } = getOpts(referenceOrOpts);
    const pathPattern = new path_pattern_1.PathPattern(path);
    const instancePattern = new path_pattern_1.PathPattern(instance);
    // wrap the handler
    const func = (raw) => {
        const event = raw;
        const instanceUrl = getInstance(event);
        const params = makeParams(event, pathPattern, instancePattern);
        const data = eventType === exports.deletedEventType ? event.data.data : event.data.delta;
        const databaseEvent = makeDatabaseEvent(event, data, instanceUrl, params);
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))(databaseEvent);
    };
    func.run = handler;
    func.__endpoint = makeEndpoint(eventType, opts, pathPattern, instancePattern);
    return func;
}
exports.onOperation = onOperation;
function getInstance(event) {
    const emuHost = process.env.FIREBASE_DATABASE_EMULATOR_HOST;
    return emuHost
        ? `http://${emuHost}/?ns=${event.instance}`
        : `https://${event.instance}.${event.firebasedatabasehost}`;
}
