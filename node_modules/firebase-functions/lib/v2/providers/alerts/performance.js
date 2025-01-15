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
exports.convertPayload = exports.getOptsAndApp = exports.onThresholdAlertPublished = exports.thresholdAlert = void 0;
/**
 * Cloud functions to handle Firebase Performance Monitoring events from Firebase Alerts.
 * @packageDocumentation
 */
const onInit_1 = require("../../../common/onInit");
const trace_1 = require("../../trace");
const alerts_1 = require("./alerts");
/** @internal */
exports.thresholdAlert = "performance.threshold";
/**
 * Declares a function that can handle receiving performance threshold alerts.
 * @param appIdOrOptsOrHandler - A specific application, options, or an event-handling function.
 * @param handler - Event handler which is run every time a threshold alert is received.
 * @returns A function that you can export and deploy.
 */
function onThresholdAlertPublished(appIdOrOptsOrHandler, handler) {
    if (typeof appIdOrOptsOrHandler === "function") {
        handler = appIdOrOptsOrHandler;
        appIdOrOptsOrHandler = {};
    }
    const [opts, appId] = getOptsAndApp(appIdOrOptsOrHandler);
    const func = (raw) => {
        const event = (0, alerts_1.convertAlertAndApp)(raw);
        const convertedPayload = convertPayload(event.data.payload);
        event.data.payload = convertedPayload;
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler(event)));
    };
    func.run = handler;
    func.__endpoint = (0, alerts_1.getEndpointAnnotation)(opts, exports.thresholdAlert, appId);
    return func;
}
exports.onThresholdAlertPublished = onThresholdAlertPublished;
/**
 * Helper function to parse the function opts and appId.
 * @internal
 */
function getOptsAndApp(appIdOrOpts) {
    if (typeof appIdOrOpts === "string") {
        return [{}, appIdOrOpts];
    }
    const opts = { ...appIdOrOpts };
    const appId = appIdOrOpts.appId;
    delete opts.appId;
    return [opts, appId];
}
exports.getOptsAndApp = getOptsAndApp;
/**
 * Helper function to convert the raw payload of a {@link PerformanceEvent} to a {@link ThresholdAlertPayload}
 * @internal
 */
function convertPayload(raw) {
    const payload = { ...raw };
    if (typeof payload.conditionPercentile !== "undefined" && payload.conditionPercentile === 0) {
        delete payload.conditionPercentile;
    }
    if (typeof payload.appVersion !== "undefined" && payload.appVersion.length === 0) {
        delete payload.appVersion;
    }
    return payload;
}
exports.convertPayload = convertPayload;
