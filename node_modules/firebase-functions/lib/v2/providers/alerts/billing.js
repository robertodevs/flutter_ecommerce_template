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
exports.onOperation = exports.onPlanAutomatedUpdatePublished = exports.onPlanUpdatePublished = exports.planAutomatedUpdateAlert = exports.planUpdateAlert = void 0;
const trace_1 = require("../../trace");
const alerts_1 = require("./alerts");
const onInit_1 = require("../../../common/onInit");
/** @internal */
exports.planUpdateAlert = "billing.planUpdate";
/** @internal */
exports.planAutomatedUpdateAlert = "billing.planAutomatedUpdate";
/**
 * Declares a function that can handle a billing plan update event.
 * @param optsOrHandler - Options or an event-handling function.
 * @param handler - Event handler which is run every time a billing plan is updated.
 * @returns A function that you can export and deploy.
 */
function onPlanUpdatePublished(optsOrHandler, handler) {
    return onOperation(exports.planUpdateAlert, optsOrHandler, handler);
}
exports.onPlanUpdatePublished = onPlanUpdatePublished;
/**
 * Declares a function that can handle an automated billing plan update event.
 * @param optsOrHandler - Options or an event-handling function.
 * @param handler - Event handler which is run every time an automated billing plan update occurs.
 * @returns A function that you can export and deploy.
 */
function onPlanAutomatedUpdatePublished(optsOrHandler, handler) {
    return onOperation(exports.planAutomatedUpdateAlert, optsOrHandler, handler);
}
exports.onPlanAutomatedUpdatePublished = onPlanAutomatedUpdatePublished;
/** @internal */
function onOperation(alertType, optsOrHandler, handler) {
    if (typeof optsOrHandler === "function") {
        handler = optsOrHandler;
        optsOrHandler = {};
    }
    const func = (raw) => {
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))((0, alerts_1.convertAlertAndApp)(raw));
    };
    func.run = handler;
    func.__endpoint = (0, alerts_1.getEndpointAnnotation)(optsOrHandler, alertType);
    return func;
}
exports.onOperation = onOperation;
