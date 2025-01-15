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
exports.onSchedule = exports.getOpts = void 0;
const encoding_1 = require("../../common/encoding");
const manifest_1 = require("../../runtime/manifest");
const trace_1 = require("../trace");
const logger = require("../../logger");
const options = require("../options");
const onInit_1 = require("../../common/onInit");
/** @internal */
function getOpts(args) {
    if (typeof args === "string") {
        return {
            schedule: args,
            opts: {},
        };
    }
    return {
        schedule: args.schedule,
        timeZone: args.timeZone,
        retryConfig: {
            retryCount: args.retryCount,
            maxRetrySeconds: args.maxRetrySeconds,
            minBackoffSeconds: args.minBackoffSeconds,
            maxBackoffSeconds: args.maxBackoffSeconds,
            maxDoublings: args.maxDoublings,
        },
        opts: args,
    };
}
exports.getOpts = getOpts;
/**
 * Handler for scheduled functions. Triggered whenever the associated
 * scheduler job sends a http request.
 * @param args - Either a schedule or an object containing function options.
 * @param handler - A function to execute when triggered.
 * @returns A function that you can export and deploy.
 */
function onSchedule(args, handler) {
    const separatedOpts = getOpts(args);
    const httpFunc = async (req, res) => {
        const event = {
            jobName: req.header("X-CloudScheduler-JobName") || undefined,
            scheduleTime: req.header("X-CloudScheduler-ScheduleTime") || new Date().toISOString(),
        };
        try {
            await handler(event);
            res.status(200).send();
        }
        catch (err) {
            logger.error(err.message);
            res.status(500).send();
        }
    };
    const func = (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(httpFunc));
    func.run = handler;
    const globalOpts = options.getGlobalOptions();
    const baseOptsEndpoint = options.optionsToEndpoint(globalOpts);
    const specificOptsEndpoint = options.optionsToEndpoint(separatedOpts.opts);
    const ep = {
        ...(0, manifest_1.initV2Endpoint)(globalOpts, separatedOpts.opts),
        platform: "gcfv2",
        ...baseOptsEndpoint,
        ...specificOptsEndpoint,
        labels: {
            ...baseOptsEndpoint === null || baseOptsEndpoint === void 0 ? void 0 : baseOptsEndpoint.labels,
            ...specificOptsEndpoint === null || specificOptsEndpoint === void 0 ? void 0 : specificOptsEndpoint.labels,
        },
        scheduleTrigger: (0, manifest_1.initV2ScheduleTrigger)(separatedOpts.schedule, globalOpts, separatedOpts.opts),
    };
    (0, encoding_1.copyIfPresent)(ep.scheduleTrigger, separatedOpts, "timeZone");
    (0, encoding_1.copyIfPresent)(ep.scheduleTrigger.retryConfig, separatedOpts.retryConfig, "retryCount", "maxRetrySeconds", "minBackoffSeconds", "maxBackoffSeconds", "maxDoublings");
    func.__endpoint = ep;
    func.__requiredAPIs = [
        {
            api: "cloudscheduler.googleapis.com",
            reason: "Needed for scheduled functions.",
        },
    ];
    return func;
}
exports.onSchedule = onSchedule;
