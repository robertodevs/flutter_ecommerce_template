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
exports.getOptsAndApp = exports.onOperation = exports.onNewAnrIssuePublished = exports.onVelocityAlertPublished = exports.onStabilityDigestPublished = exports.onRegressionAlertPublished = exports.onNewNonfatalIssuePublished = exports.onNewFatalIssuePublished = exports.newAnrIssueAlert = exports.velocityAlert = exports.stabilityDigestAlert = exports.regressionAlert = exports.newNonfatalIssueAlert = exports.newFatalIssueAlert = void 0;
const trace_1 = require("../../trace");
const alerts_1 = require("./alerts");
const onInit_1 = require("../../../common/onInit");
/** @internal */
exports.newFatalIssueAlert = "crashlytics.newFatalIssue";
/** @internal */
exports.newNonfatalIssueAlert = "crashlytics.newNonfatalIssue";
/** @internal */
exports.regressionAlert = "crashlytics.regression";
/** @internal */
exports.stabilityDigestAlert = "crashlytics.stabilityDigest";
/** @internal */
exports.velocityAlert = "crashlytics.velocity";
/** @internal */
exports.newAnrIssueAlert = "crashlytics.newAnrIssue";
/**
 * Declares a function that can handle a new fatal issue published to Crashlytics.
 * @param appIdOrOptsOrHandler - A specific application, options, or an event-handling function.
 * @param handler - Event handler that is triggered when a new fatal issue is published to Crashlytics.
 * @returns A function that you can export and deploy.
 */
function onNewFatalIssuePublished(appIdOrOptsOrHandler, handler) {
    return onOperation(exports.newFatalIssueAlert, appIdOrOptsOrHandler, handler);
}
exports.onNewFatalIssuePublished = onNewFatalIssuePublished;
/**
 * Declares a function that can handle a new non-fatal issue published to Crashlytics.
 * @param appIdOrOptsOrHandler - A specific application, options, or an event-handling function.
 * @param handler - Event handler that is triggered when a new non-fatal issue is published to Crashlytics.
 * @returns A function that you can export and deploy.
 */
function onNewNonfatalIssuePublished(appIdOrOptsOrHandler, handler) {
    return onOperation(exports.newNonfatalIssueAlert, appIdOrOptsOrHandler, handler);
}
exports.onNewNonfatalIssuePublished = onNewNonfatalIssuePublished;
/**
 * Declares a function that can handle a regression alert published to Crashlytics.
 * @param appIdOrOptsOrHandler - A specific application, options, or an event-handling function.
 * @param handler - Event handler that is triggered when a regression alert is published to Crashlytics.
 * @returns A function that you can export and deploy.
 */
function onRegressionAlertPublished(appIdOrOptsOrHandler, handler) {
    return onOperation(exports.regressionAlert, appIdOrOptsOrHandler, handler);
}
exports.onRegressionAlertPublished = onRegressionAlertPublished;
/**
 * Declares a function that can handle a stability digest published to Crashlytics.
 * @param appIdOrOptsOrHandler - A specific application, options, or an event-handling function.
 * @param handler - Event handler that is triggered when a stability digest is published to Crashlytics.
 * @returns A function that you can export and deploy.
 */
function onStabilityDigestPublished(appIdOrOptsOrHandler, handler) {
    return onOperation(exports.stabilityDigestAlert, appIdOrOptsOrHandler, handler);
}
exports.onStabilityDigestPublished = onStabilityDigestPublished;
/**
 * Declares a function that can handle a velocity alert published to Crashlytics.
 * @param appIdOrOptsOrHandler - A specific application, options, or an event-handling function.
 * @param handler - Event handler that is triggered when a velocity alert is published to Crashlytics.
 * @returns A function that you can export and deploy.
 */
function onVelocityAlertPublished(appIdOrOptsOrHandler, handler) {
    return onOperation(exports.velocityAlert, appIdOrOptsOrHandler, handler);
}
exports.onVelocityAlertPublished = onVelocityAlertPublished;
/**
 * Declares a function that can handle a new Application Not Responding issue published to Crashlytics.
 * @param appIdOrOptsOrHandler - A specific application, options, or an event-handling function.
 * @param handler - Event handler that is triggered when a new Application Not Responding issue is published to Crashlytics.
 * @returns A function that you can export and deploy.
 */
function onNewAnrIssuePublished(appIdOrOptsOrHandler, handler) {
    return onOperation(exports.newAnrIssueAlert, appIdOrOptsOrHandler, handler);
}
exports.onNewAnrIssuePublished = onNewAnrIssuePublished;
/** @internal */
function onOperation(alertType, appIdOrOptsOrHandler, handler) {
    if (typeof appIdOrOptsOrHandler === "function") {
        handler = appIdOrOptsOrHandler;
        appIdOrOptsOrHandler = {};
    }
    const [opts, appId] = getOptsAndApp(appIdOrOptsOrHandler);
    const func = (raw) => {
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))((0, alerts_1.convertAlertAndApp)(raw));
    };
    func.run = handler;
    func.__endpoint = (0, alerts_1.getEndpointAnnotation)(opts, alertType, appId);
    return func;
}
exports.onOperation = onOperation;
/**
 * Helper function to parse the function opts and appId.
 * @internal
 */
function getOptsAndApp(appIdOrOpts) {
    let opts;
    let appId;
    if (typeof appIdOrOpts === "string") {
        opts = {};
        appId = appIdOrOpts;
    }
    else {
        appId = appIdOrOpts.appId;
        opts = { ...appIdOrOpts };
        delete opts.appId;
    }
    return [opts, appId];
}
exports.getOptsAndApp = getOptsAndApp;
