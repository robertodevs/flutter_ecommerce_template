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
exports.getOpts = exports.beforeOperation = exports.beforeSmsSent = exports.beforeEmailSent = exports.beforeUserSignedIn = exports.beforeUserCreated = exports.HttpsError = void 0;
const identity_1 = require("../../common/providers/identity");
Object.defineProperty(exports, "HttpsError", { enumerable: true, get: function () { return identity_1.HttpsError; } });
const trace_1 = require("../trace");
const manifest_1 = require("../../runtime/manifest");
const options = require("../options");
const onInit_1 = require("../../common/onInit");
/**
 * Handles an event that is triggered before a user is created.
 * @param optsOrHandler - Either an object containing function options, or an event handler (run before user creation).
 * @param handler? - If defined, an event handler which is run every time before a user is created.
 */
function beforeUserCreated(optsOrHandler, handler) {
    return beforeOperation("beforeCreate", optsOrHandler, handler);
}
exports.beforeUserCreated = beforeUserCreated;
/**
 * Handles an event that is triggered before a user is signed in.
 * @param optsOrHandler - Either an object containing function options, or an event handler (run before user signin).
 * @param handler - Event handler which is run every time before a user is signed in.
 */
function beforeUserSignedIn(optsOrHandler, handler) {
    return beforeOperation("beforeSignIn", optsOrHandler, handler);
}
exports.beforeUserSignedIn = beforeUserSignedIn;
/**
 * Handles an event that is triggered before an email is sent to a user.
 * @param optsOrHandler- Either an object containing function options, or an event handler that is run before an email is sent to a user.
 * @param handler - Event handler that is run before an email is sent to a user.
 */
function beforeEmailSent(optsOrHandler, handler) {
    return beforeOperation("beforeSendEmail", optsOrHandler, handler);
}
exports.beforeEmailSent = beforeEmailSent;
/**
 * Handles an event that is triggered before an SMS is sent to a user.
 * @param optsOrHandler - Either an object containing function options, or an event handler that is run before an SMS is sent to a user.
 * @param handler - Event handler that is run before an SMS is sent to a user.
 */
function beforeSmsSent(optsOrHandler, handler) {
    return beforeOperation("beforeSendSms", optsOrHandler, handler);
}
exports.beforeSmsSent = beforeSmsSent;
/** @hidden */
function beforeOperation(eventType, optsOrHandler, handler) {
    if (!handler || typeof optsOrHandler === "function") {
        handler = optsOrHandler;
        optsOrHandler = {};
    }
    const { opts, ...blockingOptions } = getOpts(optsOrHandler);
    // Create our own function that just calls the provided function so we know for sure that
    // handler takes one argument. This is something common/providers/identity depends on.
    const annotatedHandler = Object.assign(handler, { platform: "gcfv2" });
    const func = (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)((0, identity_1.wrapHandler)(eventType, annotatedHandler)));
    const legacyEventType = `providers/cloud.auth/eventTypes/user.${eventType}`;
    /** Endpoint */
    const baseOptsEndpoint = options.optionsToEndpoint(options.getGlobalOptions());
    const specificOptsEndpoint = options.optionsToEndpoint(opts);
    func.__endpoint = {
        ...(0, manifest_1.initV2Endpoint)(options.getGlobalOptions(), opts),
        platform: "gcfv2",
        ...baseOptsEndpoint,
        ...specificOptsEndpoint,
        labels: {
            ...baseOptsEndpoint === null || baseOptsEndpoint === void 0 ? void 0 : baseOptsEndpoint.labels,
            ...specificOptsEndpoint === null || specificOptsEndpoint === void 0 ? void 0 : specificOptsEndpoint.labels,
        },
        blockingTrigger: {
            eventType: legacyEventType,
            options: {
                ...((eventType === "beforeCreate" || eventType === "beforeSignIn") && blockingOptions),
            },
        },
    };
    func.__requiredAPIs = [
        {
            api: "identitytoolkit.googleapis.com",
            reason: "Needed for auth blocking functions",
        },
    ];
    func.run = handler;
    return func;
}
exports.beforeOperation = beforeOperation;
/** @hidden */
function getOpts(blockingOptions) {
    const accessToken = blockingOptions.accessToken || false;
    const idToken = blockingOptions.idToken || false;
    const refreshToken = blockingOptions.refreshToken || false;
    const opts = { ...blockingOptions };
    delete opts.accessToken;
    delete opts.idToken;
    delete opts.refreshToken;
    return {
        opts,
        accessToken,
        idToken,
        refreshToken,
    };
}
exports.getOpts = getOpts;
