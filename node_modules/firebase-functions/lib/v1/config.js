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
exports.config = exports.resetCache = exports.singleton = exports.firebaseConfig = void 0;
const fs = require("fs");
const path = require("path");
var config_1 = require("../common/config");
Object.defineProperty(exports, "firebaseConfig", { enumerable: true, get: function () { return config_1.firebaseConfig; } });
/** @internal */
function resetCache() {
    exports.singleton = undefined;
}
exports.resetCache = resetCache;
/**
 * Store and retrieve project configuration data such as third-party API
 * keys or other settings. You can set configuration values using the
 * Firebase CLI as described in
 * https://firebase.google.com/docs/functions/config-env.
 *
 * @deprecated Using functions.config() is discouraged. See https://firebase.google.com/docs/functions/config-env.
 */
function config() {
    // K_CONFIGURATION is only set in GCFv2
    if (process.env.K_CONFIGURATION) {
        throw new Error("functions.config() is no longer available in Cloud Functions for " +
            "Firebase v2. Please see the latest documentation for information " +
            "on how to transition to using environment variables");
    }
    if (typeof exports.singleton === "undefined") {
        init();
    }
    return exports.singleton;
}
exports.config = config;
function init() {
    try {
        const parsed = JSON.parse(process.env.CLOUD_RUNTIME_CONFIG);
        delete parsed.firebase;
        exports.singleton = parsed;
        return;
    }
    catch (e) {
        // Do nothing
    }
    try {
        const configPath = process.env.CLOUD_RUNTIME_CONFIG || path.join(process.cwd(), ".runtimeconfig.json");
        const contents = fs.readFileSync(configPath);
        const parsed = JSON.parse(contents.toString("utf8"));
        delete parsed.firebase;
        exports.singleton = parsed;
        return;
    }
    catch (e) {
        // Do nothing
    }
    exports.singleton = {};
}
