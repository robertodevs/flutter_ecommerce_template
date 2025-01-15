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
exports.taskQueue = exports.TaskQueueBuilder = void 0;
const encoding_1 = require("../../common/encoding");
const tasks_1 = require("../../common/providers/tasks");
const manifest_1 = require("../../runtime/manifest");
const cloud_functions_1 = require("../cloud-functions");
/**
 * Builder for creating a `TaskQueueFunction`.
 */
class TaskQueueBuilder {
    /** @internal */
    constructor(tqOpts, depOpts) {
        this.tqOpts = tqOpts;
        this.depOpts = depOpts;
    }
    /**
     * Creates a handler for tasks sent to a Google Cloud Tasks queue.
     * @param handler - A callback to handle task requests.
     * @returns A function you can export and deploy.
     */
    onDispatch(handler) {
        var _a, _b;
        // onEnqueueHandler sniffs the function length of the passed-in callback
        // and the user could have only tried to listen to data. Wrap their handler
        // in another handler to avoid accidentally triggering the v2 API
        const fixedLen = (data, context) => handler(data, context);
        const func = (0, tasks_1.onDispatchHandler)(fixedLen);
        func.__trigger = {
            ...(0, cloud_functions_1.optionsToTrigger)(this.depOpts || {}),
            taskQueueTrigger: {},
        };
        (0, encoding_1.copyIfPresent)(func.__trigger.taskQueueTrigger, this.tqOpts, "retryConfig");
        (0, encoding_1.copyIfPresent)(func.__trigger.taskQueueTrigger, this.tqOpts, "rateLimits");
        (0, encoding_1.convertIfPresent)(func.__trigger.taskQueueTrigger, this.tqOpts, "invoker", "invoker", encoding_1.convertInvoker);
        func.__endpoint = {
            platform: "gcfv1",
            ...(0, manifest_1.initV1Endpoint)(this.depOpts),
            ...(0, cloud_functions_1.optionsToEndpoint)(this.depOpts),
            taskQueueTrigger: (0, manifest_1.initTaskQueueTrigger)(this.depOpts),
        };
        (0, encoding_1.copyIfPresent)(func.__endpoint.taskQueueTrigger.retryConfig, ((_a = this.tqOpts) === null || _a === void 0 ? void 0 : _a.retryConfig) || {}, "maxAttempts", "maxBackoffSeconds", "maxDoublings", "maxRetrySeconds", "minBackoffSeconds");
        (0, encoding_1.copyIfPresent)(func.__endpoint.taskQueueTrigger.rateLimits, ((_b = this.tqOpts) === null || _b === void 0 ? void 0 : _b.rateLimits) || {}, "maxConcurrentDispatches", "maxDispatchesPerSecond");
        (0, encoding_1.convertIfPresent)(func.__endpoint.taskQueueTrigger, this.tqOpts, "invoker", "invoker", encoding_1.convertInvoker);
        func.__requiredAPIs = [
            {
                api: "cloudtasks.googleapis.com",
                reason: "Needed for task queue functions",
            },
        ];
        func.run = handler;
        return func;
    }
}
exports.TaskQueueBuilder = TaskQueueBuilder;
/**
 * Declares a function that can handle tasks enqueued using the Firebase Admin SDK.
 * @param options - Configuration for the Task Queue that feeds into this function.
 *        Omitting options will configure a Task Queue with default settings.
 */
function taskQueue(options) {
    return new TaskQueueBuilder(options);
}
exports.taskQueue = taskQueue;
