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
exports._onCallWithOptions = exports._onRequestWithOptions = exports.onCall = exports.onRequest = exports.HttpsError = void 0;
const encoding_1 = require("../../common/encoding");
const https_1 = require("../../common/providers/https");
Object.defineProperty(exports, "HttpsError", { enumerable: true, get: function () { return https_1.HttpsError; } });
const cloud_functions_1 = require("../cloud-functions");
const manifest_1 = require("../../runtime/manifest");
const onInit_1 = require("../../common/onInit");
const trace_1 = require("../../v2/trace");
/**
 * Handle HTTP requests.
 * @param handler A function that takes a request and response object,
 * same signature as an Express app.
 */
function onRequest(handler) {
    return _onRequestWithOptions(handler, {});
}
exports.onRequest = onRequest;
/**
 * Declares a callable method for clients to call using a Firebase SDK.
 * @param handler A method that takes a data and context and returns a value.
 */
function onCall(handler) {
    return _onCallWithOptions(handler, {});
}
exports.onCall = onCall;
/** @internal */
function _onRequestWithOptions(handler, options) {
    // lets us add __endpoint without altering handler:
    const cloudFunction = (req, res) => {
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))(req, res);
    };
    cloudFunction.__trigger = {
        ...(0, cloud_functions_1.optionsToTrigger)(options),
        httpsTrigger: {},
    };
    (0, encoding_1.convertIfPresent)(cloudFunction.__trigger.httpsTrigger, options, "invoker", "invoker", encoding_1.convertInvoker);
    // TODO parse the options
    cloudFunction.__endpoint = {
        platform: "gcfv1",
        ...(0, manifest_1.initV1Endpoint)(options),
        ...(0, cloud_functions_1.optionsToEndpoint)(options),
        httpsTrigger: {},
    };
    (0, encoding_1.convertIfPresent)(cloudFunction.__endpoint.httpsTrigger, options, "invoker", "invoker", encoding_1.convertInvoker);
    return cloudFunction;
}
exports._onRequestWithOptions = _onRequestWithOptions;
/** @internal */
function _onCallWithOptions(handler, options) {
    // fix the length of handler to make the call to handler consistent
    // in the onCallHandler
    const fixedLen = (data, context) => {
        return (0, onInit_1.withInit)(handler)(data, context);
    };
    const func = (0, trace_1.wrapTraceContext)((0, https_1.onCallHandler)({
        enforceAppCheck: options.enforceAppCheck,
        consumeAppCheckToken: options.consumeAppCheckToken,
        cors: { origin: true, methods: "POST" },
    }, fixedLen, "gcfv1"));
    func.__trigger = {
        labels: {},
        ...(0, cloud_functions_1.optionsToTrigger)(options),
        httpsTrigger: {},
    };
    func.__trigger.labels["deployment-callable"] = "true";
    func.__endpoint = {
        platform: "gcfv1",
        labels: {},
        ...(0, manifest_1.initV1Endpoint)(options),
        ...(0, cloud_functions_1.optionsToEndpoint)(options),
        callableTrigger: {},
    };
    func.run = fixedLen;
    return func;
}
exports._onCallWithOptions = _onCallWithOptions;
