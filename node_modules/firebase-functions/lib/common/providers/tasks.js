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
exports.onDispatchHandler = void 0;
const logger = require("../../logger");
const https = require("./https");
/** @internal */
function onDispatchHandler(handler) {
    return async (req, res) => {
        var _a;
        try {
            if (!https.isValidRequest(req)) {
                logger.error("Invalid request, unable to process.");
                throw new https.HttpsError("invalid-argument", "Bad Request");
            }
            const headers = {};
            for (const [key, value] of Object.entries(req.headers)) {
                if (!Array.isArray(value)) {
                    headers[key] = value;
                }
            }
            const context = {
                queueName: req.header("X-CloudTasks-QueueName"),
                id: req.header("X-CloudTasks-TaskName"),
                retryCount: req.header("X-CloudTasks-TaskRetryCount")
                    ? Number(req.header("X-CloudTasks-TaskRetryCount"))
                    : undefined,
                executionCount: req.header("X-CloudTasks-TaskExecutionCount")
                    ? Number(req.header("X-CloudTasks-TaskExecutionCount"))
                    : undefined,
                scheduledTime: req.header("X-CloudTasks-TaskETA"),
                previousResponse: req.header("X-CloudTasks-TaskPreviousResponse")
                    ? Number(req.header("X-CloudTasks-TaskPreviousResponse"))
                    : undefined,
                retryReason: req.header("X-CloudTasks-TaskRetryReason"),
                headers,
            };
            if (!process.env.FUNCTIONS_EMULATOR) {
                const authHeader = req.header("Authorization") || "";
                const token = (_a = authHeader.match(/^Bearer (.*)$/)) === null || _a === void 0 ? void 0 : _a[1];
                // Note: this should never happen since task queue functions are guarded by IAM.
                if (!token) {
                    throw new https.HttpsError("unauthenticated", "Unauthenticated");
                }
                // We skip authenticating the token since tq functions are guarded by IAM.
                const authToken = https.unsafeDecodeIdToken(token);
                context.auth = {
                    uid: authToken.uid,
                    token: authToken,
                };
            }
            const data = https.decode(req.body.data);
            if (handler.length === 2) {
                await handler(data, context);
            }
            else {
                const arg = {
                    ...context,
                    data,
                };
                // For some reason the type system isn't picking up that the handler
                // is a one argument function.
                await handler(arg);
            }
            res.status(204).end();
        }
        catch (err) {
            let httpErr = err;
            if (!(err instanceof https.HttpsError)) {
                // This doesn't count as an 'explicit' error.
                logger.error("Unhandled error", err);
                httpErr = new https.HttpsError("internal", "INTERNAL");
            }
            const { status } = httpErr.httpErrorCode;
            const body = { error: httpErr.toJSON() };
            res.status(status).send(body);
        }
    };
}
exports.onDispatchHandler = onDispatchHandler;
