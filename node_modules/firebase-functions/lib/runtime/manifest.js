"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2021 Firebase
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.initV2ScheduleTrigger = exports.initV1ScheduleTrigger = exports.initTaskQueueTrigger = exports.initV2Endpoint = exports.initV1Endpoint = exports.stackToWire = void 0;
const options_1 = require("../common/options");
const params_1 = require("../params");
/**
 * Returns the JSON representation of a ManifestStack, which has CEL
 * expressions in its options as object types, with its expressions
 * transformed into the actual CEL strings.
 *
 * @alpha
 */
function stackToWire(stack) {
    const wireStack = stack;
    const traverse = function traverse(obj) {
        for (const [key, val] of Object.entries(obj)) {
            if (val instanceof params_1.Expression) {
                obj[key] = val.toCEL();
            }
            else if (val instanceof options_1.ResetValue) {
                obj[key] = val.toJSON();
            }
            else if (typeof val === "object" && val !== null) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                traverse(val);
            }
        }
    };
    traverse(wireStack.endpoints);
    return wireStack;
}
exports.stackToWire = stackToWire;
const RESETTABLE_OPTIONS = {
    availableMemoryMb: null,
    timeoutSeconds: null,
    minInstances: null,
    maxInstances: null,
    ingressSettings: null,
    concurrency: null,
    serviceAccountEmail: null,
    vpc: null,
};
function initEndpoint(resetOptions, ...opts) {
    const endpoint = {};
    if (opts.every((opt) => !(opt === null || opt === void 0 ? void 0 : opt.preserveExternalChanges))) {
        for (const key of Object.keys(resetOptions)) {
            endpoint[key] = options_1.RESET_VALUE;
        }
    }
    return endpoint;
}
/**
 * @internal
 */
function initV1Endpoint(...opts) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { concurrency, ...resetOpts } = RESETTABLE_OPTIONS;
    return initEndpoint({ ...resetOpts }, ...opts);
}
exports.initV1Endpoint = initV1Endpoint;
/**
 * @internal
 */
function initV2Endpoint(...opts) {
    return initEndpoint(RESETTABLE_OPTIONS, ...opts);
}
exports.initV2Endpoint = initV2Endpoint;
const RESETTABLE_RETRY_CONFIG_OPTIONS = {
    maxAttempts: null,
    maxDoublings: null,
    maxBackoffSeconds: null,
    maxRetrySeconds: null,
    minBackoffSeconds: null,
};
const RESETTABLE_RATE_LIMITS_OPTIONS = {
    maxConcurrentDispatches: null,
    maxDispatchesPerSecond: null,
};
/**
 * @internal
 */
function initTaskQueueTrigger(...opts) {
    const taskQueueTrigger = {
        retryConfig: {},
        rateLimits: {},
    };
    if (opts.every((opt) => !(opt === null || opt === void 0 ? void 0 : opt.preserveExternalChanges))) {
        for (const key of Object.keys(RESETTABLE_RETRY_CONFIG_OPTIONS)) {
            taskQueueTrigger.retryConfig[key] = options_1.RESET_VALUE;
        }
        for (const key of Object.keys(RESETTABLE_RATE_LIMITS_OPTIONS)) {
            taskQueueTrigger.rateLimits[key] = options_1.RESET_VALUE;
        }
    }
    return taskQueueTrigger;
}
exports.initTaskQueueTrigger = initTaskQueueTrigger;
const RESETTABLE_V1_SCHEDULE_OPTIONS = {
    retryCount: null,
    maxDoublings: null,
    maxRetryDuration: null,
    maxBackoffDuration: null,
    minBackoffDuration: null,
};
const RESETTABLE_V2_SCHEDULE_OPTIONS = {
    retryCount: null,
    maxDoublings: null,
    maxRetrySeconds: null,
    minBackoffSeconds: null,
    maxBackoffSeconds: null,
};
function initScheduleTrigger(resetOptions, schedule, ...opts) {
    let scheduleTrigger = {
        schedule,
        retryConfig: {},
    };
    if (opts.every((opt) => !(opt === null || opt === void 0 ? void 0 : opt.preserveExternalChanges))) {
        for (const key of Object.keys(resetOptions)) {
            scheduleTrigger.retryConfig[key] = options_1.RESET_VALUE;
        }
        scheduleTrigger = { ...scheduleTrigger, timeZone: options_1.RESET_VALUE };
    }
    return scheduleTrigger;
}
/**
 * @internal
 */
function initV1ScheduleTrigger(schedule, ...opts) {
    return initScheduleTrigger(RESETTABLE_V1_SCHEDULE_OPTIONS, schedule, ...opts);
}
exports.initV1ScheduleTrigger = initV1ScheduleTrigger;
/**
 * @internal
 */
function initV2ScheduleTrigger(schedule, ...opts) {
    return initScheduleTrigger(RESETTABLE_V2_SCHEDULE_OPTIONS, schedule, ...opts);
}
exports.initV2ScheduleTrigger = initV2ScheduleTrigger;
