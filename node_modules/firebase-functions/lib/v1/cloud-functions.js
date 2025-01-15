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
exports.optionsToEndpoint = exports.optionsToTrigger = exports.makeCloudFunction = exports.Change = void 0;
const logger_1 = require("../logger");
const function_configuration_1 = require("./function-configuration");
const encoding_1 = require("../common/encoding");
const manifest_1 = require("../runtime/manifest");
const options_1 = require("../common/options");
const types_1 = require("../params/types");
const onInit_1 = require("../common/onInit");
var change_1 = require("../common/change");
Object.defineProperty(exports, "Change", { enumerable: true, get: function () { return change_1.Change; } });
/** @internal */
const WILDCARD_REGEX = new RegExp("{[^/{}]*}", "g");
/** @internal */
function makeCloudFunction({ contextOnlyHandler, dataConstructor = (raw) => raw.data, eventType, handler, labels = {}, legacyEventType, options = {}, provider, service, triggerResource, }) {
    handler = (0, onInit_1.withInit)(handler !== null && handler !== void 0 ? handler : contextOnlyHandler);
    const cloudFunction = (data, context) => {
        if (legacyEventType && context.eventType === legacyEventType) {
            /*
             * v1beta1 event flow has different format for context, transform them to
             * new format.
             */
            context.eventType = provider + "." + eventType;
            context.resource = {
                service,
                name: context.resource,
            };
        }
        const event = {
            data,
            context,
        };
        if (provider === "google.firebase.database") {
            context.authType = _detectAuthType(event);
            if (context.authType !== "ADMIN") {
                context.auth = _makeAuth(event, context.authType);
            }
            else {
                delete context.auth;
            }
        }
        if (triggerResource() == null) {
            Object.defineProperty(context, "params", {
                get: () => {
                    throw new Error("context.params is not available when using the handler namespace.");
                },
            });
        }
        else {
            context.params = context.params || _makeParams(context, triggerResource);
        }
        let promise;
        if (labels && labels["deployment-scheduled"]) {
            // Scheduled function do not have meaningful data, so exclude it
            promise = contextOnlyHandler(context);
        }
        else {
            const dataOrChange = dataConstructor(event);
            promise = handler(dataOrChange, context);
        }
        if (typeof promise === "undefined") {
            (0, logger_1.warn)("Function returned undefined, expected Promise or value");
        }
        return Promise.resolve(promise);
    };
    Object.defineProperty(cloudFunction, "__trigger", {
        get: () => {
            if (triggerResource() == null) {
                return {};
            }
            const trigger = {
                ...optionsToTrigger(options),
                eventTrigger: {
                    resource: triggerResource(),
                    eventType: legacyEventType || provider + "." + eventType,
                    service,
                },
            };
            if (!!labels && Object.keys(labels).length) {
                trigger.labels = { ...trigger.labels, ...labels };
            }
            return trigger;
        },
    });
    Object.defineProperty(cloudFunction, "__endpoint", {
        get: () => {
            if (triggerResource() == null) {
                return undefined;
            }
            const endpoint = {
                platform: "gcfv1",
                ...(0, manifest_1.initV1Endpoint)(options),
                ...optionsToEndpoint(options),
            };
            if (options.schedule) {
                endpoint.scheduleTrigger = (0, manifest_1.initV1ScheduleTrigger)(options.schedule.schedule, options);
                (0, encoding_1.copyIfPresent)(endpoint.scheduleTrigger, options.schedule, "timeZone");
                (0, encoding_1.copyIfPresent)(endpoint.scheduleTrigger.retryConfig, options.schedule.retryConfig, "retryCount", "maxDoublings", "maxBackoffDuration", "maxRetryDuration", "minBackoffDuration");
            }
            else {
                endpoint.eventTrigger = {
                    eventType: legacyEventType || provider + "." + eventType,
                    eventFilters: {
                        resource: triggerResource(),
                    },
                    retry: !!options.failurePolicy,
                };
            }
            // Note: We intentionally don't make use of labels args here.
            // labels is used to pass SDK-defined labels to the trigger, which isn't
            // something we will do in the container contract world.
            endpoint.labels = { ...endpoint.labels };
            return endpoint;
        },
    });
    if (options.schedule) {
        cloudFunction.__requiredAPIs = [
            {
                api: "cloudscheduler.googleapis.com",
                reason: "Needed for scheduled functions.",
            },
        ];
    }
    cloudFunction.run = handler || contextOnlyHandler;
    return cloudFunction;
}
exports.makeCloudFunction = makeCloudFunction;
function _makeParams(context, triggerResourceGetter) {
    var _a, _b, _c;
    if (context.params) {
        // In unit testing, user may directly provide `context.params`.
        return context.params;
    }
    if (!context.resource) {
        // In unit testing, `resource` may be unpopulated for a test event.
        return {};
    }
    const triggerResource = triggerResourceGetter();
    const wildcards = triggerResource.match(WILDCARD_REGEX);
    const params = {};
    // Note: some tests don't set context.resource.name
    const eventResourceParts = (_c = (_b = (_a = context === null || context === void 0 ? void 0 : context.resource) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.split) === null || _c === void 0 ? void 0 : _c.call(_b, "/");
    if (wildcards && eventResourceParts) {
        const triggerResourceParts = triggerResource.split("/");
        for (const wildcard of wildcards) {
            const wildcardNoBraces = wildcard.slice(1, -1);
            const position = triggerResourceParts.indexOf(wildcard);
            params[wildcardNoBraces] = eventResourceParts[position];
        }
    }
    return params;
}
function _makeAuth(event, authType) {
    var _a, _b, _c, _d, _e, _f;
    if (authType === "UNAUTHENTICATED") {
        return null;
    }
    return {
        uid: (_c = (_b = (_a = event.context) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.variable) === null || _c === void 0 ? void 0 : _c.uid,
        token: (_f = (_e = (_d = event.context) === null || _d === void 0 ? void 0 : _d.auth) === null || _e === void 0 ? void 0 : _e.variable) === null || _f === void 0 ? void 0 : _f.token,
    };
}
function _detectAuthType(event) {
    var _a, _b, _c, _d;
    if ((_b = (_a = event.context) === null || _a === void 0 ? void 0 : _a.auth) === null || _b === void 0 ? void 0 : _b.admin) {
        return "ADMIN";
    }
    if ((_d = (_c = event.context) === null || _c === void 0 ? void 0 : _c.auth) === null || _d === void 0 ? void 0 : _d.variable) {
        return "USER";
    }
    return "UNAUTHENTICATED";
}
/** @hidden */
function optionsToTrigger(options) {
    const trigger = {};
    (0, encoding_1.copyIfPresent)(trigger, options, "regions", "schedule", "minInstances", "maxInstances", "ingressSettings", "vpcConnectorEgressSettings", "vpcConnector", "labels", "secrets");
    (0, encoding_1.convertIfPresent)(trigger, options, "failurePolicy", "failurePolicy", (policy) => {
        if (policy === false) {
            return undefined;
        }
        else if (policy === true) {
            return function_configuration_1.DEFAULT_FAILURE_POLICY;
        }
        else {
            return policy;
        }
    });
    (0, encoding_1.convertIfPresent)(trigger, options, "timeout", "timeoutSeconds", encoding_1.durationFromSeconds);
    (0, encoding_1.convertIfPresent)(trigger, options, "availableMemoryMb", "memory", (mem) => {
        const memoryLookup = {
            "128MB": 128,
            "256MB": 256,
            "512MB": 512,
            "1GB": 1024,
            "2GB": 2048,
            "4GB": 4096,
            "8GB": 8192,
        };
        return memoryLookup[mem];
    });
    (0, encoding_1.convertIfPresent)(trigger, options, "serviceAccountEmail", "serviceAccount", encoding_1.serviceAccountFromShorthand);
    return trigger;
}
exports.optionsToTrigger = optionsToTrigger;
function optionsToEndpoint(options) {
    const endpoint = {};
    (0, encoding_1.copyIfPresent)(endpoint, options, "omit", "minInstances", "maxInstances", "ingressSettings", "labels", "timeoutSeconds");
    (0, encoding_1.convertIfPresent)(endpoint, options, "region", "regions");
    (0, encoding_1.convertIfPresent)(endpoint, options, "serviceAccountEmail", "serviceAccount", (sa) => sa);
    (0, encoding_1.convertIfPresent)(endpoint, options, "secretEnvironmentVariables", "secrets", (secrets) => secrets.map((secret) => ({ key: secret instanceof types_1.SecretParam ? secret.name : secret })));
    if ((options === null || options === void 0 ? void 0 : options.vpcConnector) !== undefined) {
        if (options.vpcConnector === null || options.vpcConnector instanceof options_1.ResetValue) {
            endpoint.vpc = function_configuration_1.RESET_VALUE;
        }
        else {
            const vpc = { connector: options.vpcConnector };
            (0, encoding_1.convertIfPresent)(vpc, options, "egressSettings", "vpcConnectorEgressSettings");
            endpoint.vpc = vpc;
        }
    }
    (0, encoding_1.convertIfPresent)(endpoint, options, "availableMemoryMb", "memory", (mem) => {
        const memoryLookup = {
            "128MB": 128,
            "256MB": 256,
            "512MB": 512,
            "1GB": 1024,
            "2GB": 2048,
            "4GB": 4096,
            "8GB": 8192,
        };
        return typeof mem === "object" ? mem : memoryLookup[mem];
    });
    return endpoint;
}
exports.optionsToEndpoint = optionsToEndpoint;
