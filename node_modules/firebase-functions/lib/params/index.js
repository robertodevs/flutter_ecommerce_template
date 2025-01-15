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
exports.defineList = exports.defineFloat = exports.defineInt = exports.defineBoolean = exports.defineString = exports.defineSecret = exports.storageBucket = exports.gcloudProject = exports.projectID = exports.databaseURL = exports.clearParams = exports.declaredParams = exports.Expression = exports.multiSelect = exports.select = exports.BUCKET_PICKER = void 0;
/**
 * @hidden
 * @alpha
 */
const types_1 = require("./types");
Object.defineProperty(exports, "Expression", { enumerable: true, get: function () { return types_1.Expression; } });
var types_2 = require("./types");
Object.defineProperty(exports, "BUCKET_PICKER", { enumerable: true, get: function () { return types_2.BUCKET_PICKER; } });
Object.defineProperty(exports, "select", { enumerable: true, get: function () { return types_2.select; } });
Object.defineProperty(exports, "multiSelect", { enumerable: true, get: function () { return types_2.multiSelect; } });
exports.declaredParams = [];
/**
 * Use a helper to manage the list such that parameters are uniquely
 * registered once only but order is preserved.
 * @internal
 */
function registerParam(param) {
    for (let i = 0; i < exports.declaredParams.length; i++) {
        if (exports.declaredParams[i].name === param.name) {
            exports.declaredParams.splice(i, 1);
        }
    }
    exports.declaredParams.push(param);
}
/**
 * For testing.
 * @internal
 */
function clearParams() {
    exports.declaredParams.splice(0, exports.declaredParams.length);
}
exports.clearParams = clearParams;
/**
 * A built-in parameter that resolves to the default RTDB database URL associated
 * with the project, without prompting the deployer. Empty string if none exists.
 */
exports.databaseURL = new types_1.InternalExpression("DATABASE_URL", (env) => { var _a; return ((_a = JSON.parse(env.FIREBASE_CONFIG)) === null || _a === void 0 ? void 0 : _a.databaseURL) || ""; });
/**
 * A built-in parameter that resolves to the Cloud project ID associated with
 * the project, without prompting the deployer.
 */
exports.projectID = new types_1.InternalExpression("PROJECT_ID", (env) => { var _a; return ((_a = JSON.parse(env.FIREBASE_CONFIG)) === null || _a === void 0 ? void 0 : _a.projectId) || ""; });
/**
 * A built-in parameter that resolves to the Cloud project ID, without prompting
 * the deployer.
 */
exports.gcloudProject = new types_1.InternalExpression("GCLOUD_PROJECT", (env) => { var _a; return ((_a = JSON.parse(env.FIREBASE_CONFIG)) === null || _a === void 0 ? void 0 : _a.projectId) || ""; });
/**
 * A builtin parameter that resolves to the Cloud storage bucket associated
 * with the function, without prompting the deployer. Empty string if not
 * defined.
 */
exports.storageBucket = new types_1.InternalExpression("STORAGE_BUCKET", (env) => { var _a; return ((_a = JSON.parse(env.FIREBASE_CONFIG)) === null || _a === void 0 ? void 0 : _a.storageBucket) || ""; });
/**
 * Declares a secret param, that will persist values only in Cloud Secret Manager.
 * Secrets are stored internally as bytestrings. Use `ParamOptions.as` to provide type
 * hinting during parameter resolution.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @returns A parameter with a `string` return type for `.value`.
 */
function defineSecret(name) {
    const param = new types_1.SecretParam(name);
    registerParam(param);
    return param;
}
exports.defineSecret = defineSecret;
/**
 * Declare a string parameter.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @param options Configuration options for the parameter.
 * @returns A parameter with a `string` return type for `.value`.
 */
function defineString(name, options = {}) {
    const param = new types_1.StringParam(name, options);
    registerParam(param);
    return param;
}
exports.defineString = defineString;
/**
 * Declare a boolean parameter.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @param options Configuration options for the parameter.
 * @returns A parameter with a `boolean` return type for `.value`.
 */
function defineBoolean(name, options = {}) {
    const param = new types_1.BooleanParam(name, options);
    registerParam(param);
    return param;
}
exports.defineBoolean = defineBoolean;
/**
 * Declare an integer parameter.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @param options Configuration options for the parameter.
 * @returns A parameter with a `number` return type for `.value`.
 */
function defineInt(name, options = {}) {
    const param = new types_1.IntParam(name, options);
    registerParam(param);
    return param;
}
exports.defineInt = defineInt;
/**
 * Declare a float parameter.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @param options Configuration options for the parameter.
 * @returns A parameter with a `number` return type for `.value`.
 *
 * @internal
 */
function defineFloat(name, options = {}) {
    const param = new types_1.FloatParam(name, options);
    registerParam(param);
    return param;
}
exports.defineFloat = defineFloat;
/**
 * Declare a list parameter.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @param options Configuration options for the parameter.
 * @returns A parameter with a `string[]` return type for `.value`.
 */
function defineList(name, options = {}) {
    const param = new types_1.ListParam(name, options);
    registerParam(param);
    return param;
}
exports.defineList = defineList;
