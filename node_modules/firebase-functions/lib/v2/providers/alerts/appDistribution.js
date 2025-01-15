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
exports.getOptsAndApp = exports.onInAppFeedbackPublished = exports.onNewTesterIosDevicePublished = exports.inAppFeedbackAlert = exports.newTesterIosDeviceAlert = void 0;
const trace_1 = require("../../trace");
const alerts_1 = require("./alerts");
const onInit_1 = require("../../../common/onInit");
/** @internal */
exports.newTesterIosDeviceAlert = "appDistribution.newTesterIosDevice";
/** @internal */
exports.inAppFeedbackAlert = "appDistribution.inAppFeedback";
/**
 * Declares a function that can handle adding a new tester iOS device.
 * @param appIdOrOptsOrHandler - A specific application, options, or an event-handling function.
 * @param handler - Event handler which is run every time a new tester iOS device is added.
 * @returns A function that you can export and deploy.
 */
function onNewTesterIosDevicePublished(appIdOrOptsOrHandler, handler) {
    if (typeof appIdOrOptsOrHandler === "function") {
        handler = appIdOrOptsOrHandler;
        appIdOrOptsOrHandler = {};
    }
    const [opts, appId] = getOptsAndApp(appIdOrOptsOrHandler);
    const func = (raw) => {
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))((0, alerts_1.convertAlertAndApp)(raw));
    };
    func.run = handler;
    func.__endpoint = (0, alerts_1.getEndpointAnnotation)(opts, exports.newTesterIosDeviceAlert, appId);
    return func;
}
exports.onNewTesterIosDevicePublished = onNewTesterIosDevicePublished;
/**
 * Declares a function that can handle receiving new in-app feedback from a tester.
 * @param appIdOrOptsOrHandler - A specific application, options, or an event-handling function.
 * @param handler - Event handler which is run every time new feedback is received.
 * @returns A function that you can export and deploy.
 */
function onInAppFeedbackPublished(appIdOrOptsOrHandler, handler) {
    if (typeof appIdOrOptsOrHandler === "function") {
        handler = appIdOrOptsOrHandler;
        appIdOrOptsOrHandler = {};
    }
    const [opts, appId] = getOptsAndApp(appIdOrOptsOrHandler);
    const func = (raw) => {
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))((0, alerts_1.convertAlertAndApp)(raw));
    };
    func.run = handler;
    func.__endpoint = (0, alerts_1.getEndpointAnnotation)(opts, exports.inAppFeedbackAlert, appId);
    return func;
}
exports.onInAppFeedbackPublished = onInAppFeedbackPublished;
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
