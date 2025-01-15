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
exports.onCustomEventPublished = void 0;
/**
 * Cloud functions to integrate directly with Eventarc.
 * @packageDocumentation
 */
const encoding_1 = require("../../common/encoding");
const manifest_1 = require("../../runtime/manifest");
const trace_1 = require("../trace");
const options = require("../options");
const onInit_1 = require("../../common/onInit");
function onCustomEventPublished(eventTypeOrOpts, handler) {
    var _a, _b;
    let opts;
    if (typeof eventTypeOrOpts === "string") {
        opts = {
            eventType: eventTypeOrOpts,
        };
    }
    else if (typeof eventTypeOrOpts === "object") {
        opts = eventTypeOrOpts;
    }
    const func = (raw) => {
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))(raw);
    };
    func.run = handler;
    const channel = (_a = opts.channel) !== null && _a !== void 0 ? _a : "locations/us-central1/channels/firebase";
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
            eventType: opts.eventType,
            eventFilters: {},
            retry: (_b = opts.retry) !== null && _b !== void 0 ? _b : false,
            channel,
        },
    };
    (0, encoding_1.convertIfPresent)(endpoint.eventTrigger, opts, "eventFilters", "filters");
    (0, encoding_1.copyIfPresent)(endpoint.eventTrigger, opts, "retry");
    func.__endpoint = endpoint;
    func.__requiredAPIs = [
        {
            api: "eventarcpublishing.googleapis.com",
            reason: "Needed for custom event functions",
        },
    ];
    return func;
}
exports.onCustomEventPublished = onCustomEventPublished;
