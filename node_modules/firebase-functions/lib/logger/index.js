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
exports.error = exports.warn = exports.info = exports.log = exports.debug = exports.write = void 0;
const util_1 = require("util");
const trace_1 = require("../common/trace");
const common_1 = require("./common");
/** @internal */
function removeCircular(obj, refs = []) {
    if (typeof obj !== "object" || !obj) {
        return obj;
    }
    // If the object defines its own toJSON, prefer that.
    if (obj.toJSON) {
        return obj.toJSON();
    }
    if (refs.includes(obj)) {
        return "[Circular]";
    }
    else {
        refs.push(obj);
    }
    let returnObj;
    if (Array.isArray(obj)) {
        returnObj = new Array(obj.length);
    }
    else {
        returnObj = {};
    }
    for (const k in obj) {
        if (refs.includes(obj[k])) {
            returnObj[k] = "[Circular]";
        }
        else {
            returnObj[k] = removeCircular(obj[k], refs);
        }
    }
    return returnObj;
}
/**
 * Writes a `LogEntry` to `stdout`/`stderr` (depending on severity).
 * @param entry - The `LogEntry` including severity, message, and any additional structured metadata.
 * @public
 */
function write(entry) {
    const ctx = trace_1.traceContext.getStore();
    if (ctx === null || ctx === void 0 ? void 0 : ctx.traceId) {
        entry["logging.googleapis.com/trace"] = `projects/${process.env.GCLOUD_PROJECT}/traces/${ctx.traceId}`;
    }
    common_1.UNPATCHED_CONSOLE[common_1.CONSOLE_SEVERITY[entry.severity]](JSON.stringify(removeCircular(entry)));
}
exports.write = write;
/**
 * Writes a `DEBUG` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
function debug(...args) {
    write(entryFromArgs("DEBUG", args));
}
exports.debug = debug;
/**
 * Writes an `INFO` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
function log(...args) {
    write(entryFromArgs("INFO", args));
}
exports.log = log;
/**
 * Writes an `INFO` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
function info(...args) {
    write(entryFromArgs("INFO", args));
}
exports.info = info;
/**
 * Writes a `WARNING` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
function warn(...args) {
    write(entryFromArgs("WARNING", args));
}
exports.warn = warn;
/**
 * Writes an `ERROR` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
function error(...args) {
    write(entryFromArgs("ERROR", args));
}
exports.error = error;
/** @hidden */
function entryFromArgs(severity, args) {
    let entry = {};
    const lastArg = args[args.length - 1];
    if (lastArg && typeof lastArg === "object" && lastArg.constructor === Object) {
        entry = args.pop();
    }
    // mimic `console.*` behavior, see https://nodejs.org/api/console.html#console_console_log_data_args
    let message = (0, util_1.format)(...args);
    if (severity === "ERROR" && !args.find((arg) => arg instanceof Error)) {
        message = new Error(message).stack || message;
    }
    const out = {
        ...entry,
        severity,
    };
    if (message) {
        out.message = message;
    }
    return out;
}
