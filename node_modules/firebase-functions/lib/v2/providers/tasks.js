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
exports.onTaskDispatched = void 0;
/**
 * Cloud functions to handle Tasks enqueued with Google Cloud Tasks.
 * @packageDocumentation
 */
const encoding_1 = require("../../common/encoding");
const tasks_1 = require("../../common/providers/tasks");
const options = require("../options");
const trace_1 = require("../trace");
const manifest_1 = require("../../runtime/manifest");
const onInit_1 = require("../../common/onInit");
function onTaskDispatched(optsOrHandler, handler) {
    let opts;
    if (arguments.length === 1) {
        opts = {};
        handler = optsOrHandler;
    }
    else {
        opts = optsOrHandler;
    }
    // onDispatchHandler sniffs the function length to determine which API to present.
    // fix the length to prevent api versions from being mismatched.
    const fixedLen = (req) => handler(req);
    const func = (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)((0, tasks_1.onDispatchHandler)(fixedLen)));
    Object.defineProperty(func, "__trigger", {
        get: () => {
            const baseOpts = options.optionsToTriggerAnnotations(options.getGlobalOptions());
            // global options calls region a scalar and https allows it to be an array,
            // but optionsToTriggerAnnotations handles both cases.
            const specificOpts = options.optionsToTriggerAnnotations(opts);
            const taskQueueTrigger = {};
            (0, encoding_1.copyIfPresent)(taskQueueTrigger, opts, "retryConfig", "rateLimits");
            (0, encoding_1.convertIfPresent)(taskQueueTrigger, options.getGlobalOptions(), "invoker", "invoker", encoding_1.convertInvoker);
            (0, encoding_1.convertIfPresent)(taskQueueTrigger, opts, "invoker", "invoker", encoding_1.convertInvoker);
            return {
                platform: "gcfv2",
                ...baseOpts,
                ...specificOpts,
                labels: {
                    ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
                    ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
                },
                taskQueueTrigger,
            };
        },
    });
    const baseOpts = options.optionsToEndpoint(options.getGlobalOptions());
    // global options calls region a scalar and https allows it to be an array,
    // but optionsToManifestEndpoint handles both cases.
    const specificOpts = options.optionsToEndpoint(opts);
    func.__endpoint = {
        platform: "gcfv2",
        ...(0, manifest_1.initV2Endpoint)(options.getGlobalOptions(), opts),
        ...baseOpts,
        ...specificOpts,
        labels: {
            ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
            ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
        },
        taskQueueTrigger: (0, manifest_1.initTaskQueueTrigger)(options.getGlobalOptions(), opts),
    };
    (0, encoding_1.copyIfPresent)(func.__endpoint.taskQueueTrigger.retryConfig, opts.retryConfig, "maxAttempts", "maxBackoffSeconds", "maxDoublings", "maxRetrySeconds", "minBackoffSeconds");
    (0, encoding_1.copyIfPresent)(func.__endpoint.taskQueueTrigger.rateLimits, opts.rateLimits, "maxConcurrentDispatches", "maxDispatchesPerSecond");
    (0, encoding_1.convertIfPresent)(func.__endpoint.taskQueueTrigger, options.getGlobalOptions(), "invoker", "invoker", encoding_1.convertInvoker);
    (0, encoding_1.convertIfPresent)(func.__endpoint.taskQueueTrigger, opts, "invoker", "invoker", encoding_1.convertInvoker);
    (0, encoding_1.copyIfPresent)(func.__endpoint.taskQueueTrigger, opts, "retry", "retry");
    func.__requiredAPIs = [
        {
            api: "cloudtasks.googleapis.com",
            reason: "Needed for task queue functions",
        },
    ];
    func.run = handler;
    return func;
}
exports.onTaskDispatched = onTaskDispatched;
