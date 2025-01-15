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
exports.__getSpec = exports.optionsToEndpoint = exports.optionsToTriggerAnnotations = exports.getGlobalOptions = exports.setGlobalOptions = exports.RESET_VALUE = void 0;
/**
 * Options to configure cloud functions.
 * @packageDocumentation
 */
const encoding_1 = require("../common/encoding");
const options_1 = require("../common/options");
const params_1 = require("../params");
const types_1 = require("../params/types");
const logger = require("../logger");
var options_2 = require("../common/options");
Object.defineProperty(exports, "RESET_VALUE", { enumerable: true, get: function () { return options_2.RESET_VALUE; } });
const MemoryOptionToMB = {
    "128MiB": 128,
    "256MiB": 256,
    "512MiB": 512,
    "1GiB": 1024,
    "2GiB": 2048,
    "4GiB": 4096,
    "8GiB": 8192,
    "16GiB": 16384,
    "32GiB": 32768,
};
let globalOptions;
/**
 * Sets default options for all functions written using the 2nd gen SDK.
 * @param options Options to set as default
 */
function setGlobalOptions(options) {
    if (globalOptions) {
        logger.warn("Calling setGlobalOptions twice leads to undefined behavior");
    }
    globalOptions = options;
}
exports.setGlobalOptions = setGlobalOptions;
/**
 * Get the currently set default options.
 * Used only for trigger generation.
 * @internal
 */
function getGlobalOptions() {
    return globalOptions || {};
}
exports.getGlobalOptions = getGlobalOptions;
/**
 * Apply GlobalOptions to trigger definitions.
 * @internal
 */
function optionsToTriggerAnnotations(opts) {
    const annotation = {};
    (0, encoding_1.copyIfPresent)(annotation, opts, "concurrency", "minInstances", "maxInstances", "ingressSettings", "labels", "vpcConnector", "vpcConnectorEgressSettings", "secrets");
    (0, encoding_1.convertIfPresent)(annotation, opts, "availableMemoryMb", "memory", (mem) => {
        return MemoryOptionToMB[mem];
    });
    (0, encoding_1.convertIfPresent)(annotation, opts, "regions", "region", (region) => {
        if (typeof region === "string") {
            return [region];
        }
        return region;
    });
    (0, encoding_1.convertIfPresent)(annotation, opts, "serviceAccountEmail", "serviceAccount", encoding_1.serviceAccountFromShorthand);
    (0, encoding_1.convertIfPresent)(annotation, opts, "timeout", "timeoutSeconds", encoding_1.durationFromSeconds);
    (0, encoding_1.convertIfPresent)(annotation, opts, "failurePolicy", "retry", (retry) => {
        return retry ? { retry: true } : null;
    });
    return annotation;
}
exports.optionsToTriggerAnnotations = optionsToTriggerAnnotations;
/**
 * Apply GlobalOptions to endpoint manifest.
 * @internal
 */
function optionsToEndpoint(opts) {
    const endpoint = {};
    (0, encoding_1.copyIfPresent)(endpoint, opts, "omit", "concurrency", "minInstances", "maxInstances", "ingressSettings", "labels", "timeoutSeconds", "cpu");
    (0, encoding_1.convertIfPresent)(endpoint, opts, "serviceAccountEmail", "serviceAccount");
    if (opts.vpcConnector !== undefined) {
        if (opts.vpcConnector === null || opts.vpcConnector instanceof options_1.ResetValue) {
            endpoint.vpc = options_1.RESET_VALUE;
        }
        else {
            const vpc = { connector: opts.vpcConnector };
            (0, encoding_1.convertIfPresent)(vpc, opts, "egressSettings", "vpcConnectorEgressSettings");
            endpoint.vpc = vpc;
        }
    }
    (0, encoding_1.convertIfPresent)(endpoint, opts, "availableMemoryMb", "memory", (mem) => {
        return typeof mem === "object" ? mem : MemoryOptionToMB[mem];
    });
    (0, encoding_1.convertIfPresent)(endpoint, opts, "region", "region", (region) => {
        if (typeof region === "string") {
            return [region];
        }
        return region;
    });
    (0, encoding_1.convertIfPresent)(endpoint, opts, "secretEnvironmentVariables", "secrets", (secrets) => secrets.map((secret) => ({ key: secret instanceof types_1.SecretParam ? secret.name : secret })));
    return endpoint;
}
exports.optionsToEndpoint = optionsToEndpoint;
/**
 * @hidden
 * @alpha
 */
function __getSpec() {
    return {
        globalOptions: getGlobalOptions(),
        params: params_1.declaredParams.map((p) => p.toSpec()),
    };
}
exports.__getSpec = __getSpec;
