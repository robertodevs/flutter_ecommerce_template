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
exports.isDebugFeatureEnabled = exports.debugFeatureValue = void 0;
// Do NOT turn on a debug feature in production.
const debugMode = process.env.FIREBASE_DEBUG_MODE === "true";
function loadDebugFeatures() {
    if (!debugMode) {
        return {};
    }
    try {
        const obj = JSON.parse(process.env.FIREBASE_DEBUG_FEATURES);
        if (typeof obj !== "object") {
            return {};
        }
        return obj;
    }
    catch (e) {
        return {};
    }
}
/* @internal */
function debugFeatureValue(feat) {
    if (!debugMode) {
        return;
    }
    return loadDebugFeatures()[feat];
}
exports.debugFeatureValue = debugFeatureValue;
/* @internal */
function isDebugFeatureEnabled(feat) {
    return debugMode && !!debugFeatureValue(feat);
}
exports.isDebugFeatureEnabled = isDebugFeatureEnabled;
