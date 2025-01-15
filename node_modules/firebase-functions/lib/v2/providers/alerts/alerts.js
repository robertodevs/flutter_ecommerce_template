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
exports.convertAlertAndApp = exports.getOptsAndAlertTypeAndApp = exports.getEndpointAnnotation = exports.onAlertPublished = exports.eventType = void 0;
const manifest_1 = require("../../../runtime/manifest");
const trace_1 = require("../../trace");
const options = require("../../options");
const onInit_1 = require("../../../common/onInit");
/** @internal */
exports.eventType = "google.firebase.firebasealerts.alerts.v1.published";
function onAlertPublished(alertTypeOrOpts, handler) {
    const [opts, alertType, appId] = getOptsAndAlertTypeAndApp(alertTypeOrOpts);
    const func = (raw) => {
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))(convertAlertAndApp(raw));
    };
    func.run = handler;
    func.__endpoint = getEndpointAnnotation(opts, alertType, appId);
    return func;
}
exports.onAlertPublished = onAlertPublished;
/**
 * Helper function for getting the endpoint annotation used in alert handling functions.
 * @internal
 */
function getEndpointAnnotation(opts, alertType, appId) {
    var _a;
    const baseOpts = options.optionsToEndpoint(options.getGlobalOptions());
    const specificOpts = options.optionsToEndpoint(opts);
    const endpoint = {
        ...(0, manifest_1.initV2Endpoint)(options.getGlobalOptions(), opts),
        platform: "gcfv2",
        ...baseOpts,
        ...specificOpts,
        labels: {
            ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
            ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
        },
        eventTrigger: {
            eventType: exports.eventType,
            eventFilters: {
                alerttype: alertType,
            },
            retry: (_a = opts.retry) !== null && _a !== void 0 ? _a : false,
        },
    };
    if (appId) {
        endpoint.eventTrigger.eventFilters.appid = appId;
    }
    return endpoint;
}
exports.getEndpointAnnotation = getEndpointAnnotation;
/**
 * Helper function to parse the function opts, alert type, and appId.
 * @internal
 */
function getOptsAndAlertTypeAndApp(alertTypeOrOpts) {
    let opts;
    let alertType;
    let appId;
    if (typeof alertTypeOrOpts === "string") {
        alertType = alertTypeOrOpts;
        opts = {};
    }
    else {
        alertType = alertTypeOrOpts.alertType;
        appId = alertTypeOrOpts.appId;
        opts = { ...alertTypeOrOpts };
        delete opts.alertType;
        delete opts.appId;
    }
    return [opts, alertType, appId];
}
exports.getOptsAndAlertTypeAndApp = getOptsAndAlertTypeAndApp;
/**
 * Helper function to covert alert type & app id in the CloudEvent to camel case.
 * @internal
 */
function convertAlertAndApp(raw) {
    const event = { ...raw };
    if ("alerttype" in event) {
        event.alertType = event.alerttype;
    }
    if ("appid" in event) {
        event.appId = event.appid;
    }
    return event;
}
exports.convertAlertAndApp = convertAlertAndApp;
