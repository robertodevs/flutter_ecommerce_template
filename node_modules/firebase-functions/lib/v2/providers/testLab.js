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
exports.onTestMatrixCompleted = exports.eventType = void 0;
const onInit_1 = require("../../common/onInit");
const manifest_1 = require("../../runtime/manifest");
const options_1 = require("../options");
const trace_1 = require("../trace");
/** @internal */
exports.eventType = "google.firebase.testlab.testMatrix.v1.completed";
/**
 * Event handler which triggers when a Firebase test matrix completes.
 *
 * @param optsOrHandler - Options or an event handler.
 * @param handler - Event handler which is run every time a Firebase test matrix completes.
 * @returns A Cloud Function that you can export and deploy.
 * @alpha
 */
function onTestMatrixCompleted(optsOrHandler, handler) {
    var _a;
    if (typeof optsOrHandler === "function") {
        handler = optsOrHandler;
        optsOrHandler = {};
    }
    const baseOpts = (0, options_1.optionsToEndpoint)((0, options_1.getGlobalOptions)());
    const specificOpts = (0, options_1.optionsToEndpoint)(optsOrHandler);
    const func = (raw) => {
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))(raw);
    };
    func.run = handler;
    const ep = {
        ...(0, manifest_1.initV2Endpoint)((0, options_1.getGlobalOptions)(), optsOrHandler),
        platform: "gcfv2",
        ...baseOpts,
        ...specificOpts,
        labels: {
            ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
            ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
        },
        eventTrigger: {
            eventType: exports.eventType,
            eventFilters: {},
            retry: (_a = optsOrHandler.retry) !== null && _a !== void 0 ? _a : false,
        },
    };
    func.__endpoint = ep;
    return func;
}
exports.onTestMatrixCompleted = onTestMatrixCompleted;
