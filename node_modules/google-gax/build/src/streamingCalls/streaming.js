"use strict";
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamProxy = exports.StreamType = void 0;
const googleError_1 = require("../googleError");
const streamingRetryRequest_1 = require("../streamingRetryRequest");
const status_1 = require("../status");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const duplexify = require('duplexify');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const retryRequest = require('retry-request');
/**
 * The type of gRPC streaming.
 * @enum {number}
 */
var StreamType;
(function (StreamType) {
    /** Client sends a single request, server streams responses. */
    StreamType[StreamType["SERVER_STREAMING"] = 1] = "SERVER_STREAMING";
    /** Client streams requests, server returns a single response. */
    StreamType[StreamType["CLIENT_STREAMING"] = 2] = "CLIENT_STREAMING";
    /** Both client and server stream objects. */
    StreamType[StreamType["BIDI_STREAMING"] = 3] = "BIDI_STREAMING";
})(StreamType || (exports.StreamType = StreamType = {}));
class StreamProxy extends duplexify {
    /**
     * StreamProxy is a proxy to gRPC-streaming method.
     *
     * @private
     * @constructor
     * @param {StreamType} type - the type of gRPC stream.
     * @param {ApiCallback} callback - the callback for further API call.
     */
    constructor(type, callback, rest, gaxServerStreamingRetries) {
        super(undefined, undefined, {
            objectMode: true,
            readable: type !== StreamType.CLIENT_STREAMING,
            writable: type !== StreamType.SERVER_STREAMING,
        });
        this.retries = 0;
        this.type = type;
        this._callback = callback;
        this._isCancelCalled = false;
        this._responseHasSent = false;
        this.rest = rest;
        this.gaxServerStreamingRetries = gaxServerStreamingRetries;
    }
    shouldRetryRequest(error, retry) {
        const e = googleError_1.GoogleError.parseGRPCStatusDetails(error);
        let shouldRetry = this.defaultShouldRetry(e, retry);
        if (retry.shouldRetryFn) {
            shouldRetry = retry.shouldRetryFn(e);
        }
        return shouldRetry;
    }
    cancel() {
        if (this.stream) {
            this.stream.cancel();
        }
        else {
            this._isCancelCalled = true;
        }
    }
    retry(stream, retry) {
        let retryArgument = this.argument;
        if (typeof retry.getResumptionRequestFn === 'function') {
            const resumptionRetryArgument = retry.getResumptionRequestFn(retryArgument);
            if (resumptionRetryArgument !== undefined) {
                retryArgument = resumptionRetryArgument;
            }
        }
        this.resetStreams(stream);
        const newStream = this.apiCall(retryArgument, this._callback);
        this.stream = newStream;
        this.streamHandoffHelper(newStream, retry);
        return newStream;
    }
    /**
     * Helper function to handle total timeout + max retry check for server streaming retries
     * @param {number} deadline - the current retry deadline
     * @param {number} maxRetries - maximum total number of retries
     * @param {number} totalTimeoutMillis - total timeout in milliseconds
     */
    throwIfMaxRetriesOrTotalTimeoutExceeded(deadline, maxRetries, totalTimeoutMillis) {
        const now = new Date();
        if (this.prevDeadline !== undefined &&
            deadline &&
            now.getTime() >= this.prevDeadline) {
            const error = new googleError_1.GoogleError(`Total timeout of API exceeded ${totalTimeoutMillis} milliseconds before any response was received.`);
            error.code = status_1.Status.DEADLINE_EXCEEDED;
            this.emit('error', error);
            this.destroy();
            // Without throwing error you get unhandled error since we are returning a new stream
            // There might be a better way to do this
            throw error;
        }
        if (this.retries && this.retries >= maxRetries) {
            const error = new googleError_1.GoogleError('Exceeded maximum number of retries before any ' +
                'response was received');
            error.code = status_1.Status.DEADLINE_EXCEEDED;
            this.emit('error', error);
            this.destroy();
            throw error;
        }
    }
    /**
     * Error handler for server streaming retries
     * @param {CancellableStream} stream - the stream being retried
     * @param {RetryOptions} retry - Configures the exceptions upon which the
     *   function should retry, and the parameters to the exponential backoff retry
     *   algorithm.
     * @param {Error} error - error to handle
     */
    streamHandoffErrorHandler(stream, retry, error) {
        let retryStream = this.stream;
        const delayMult = retry.backoffSettings.retryDelayMultiplier;
        const maxDelay = retry.backoffSettings.maxRetryDelayMillis;
        const timeoutMult = retry.backoffSettings.rpcTimeoutMultiplier;
        const maxTimeout = retry.backoffSettings.maxRpcTimeoutMillis;
        let delay = retry.backoffSettings.initialRetryDelayMillis;
        let timeout = retry.backoffSettings.initialRpcTimeoutMillis;
        let now = new Date();
        let deadline = 0;
        if (retry.backoffSettings.totalTimeoutMillis) {
            deadline = now.getTime() + retry.backoffSettings.totalTimeoutMillis;
        }
        const maxRetries = retry.backoffSettings.maxRetries;
        try {
            this.throwIfMaxRetriesOrTotalTimeoutExceeded(deadline, maxRetries, retry.backoffSettings.totalTimeoutMillis);
        }
        catch (error) {
            return;
        }
        this.retries++;
        if (this.shouldRetryRequest(error, retry)) {
            const toSleep = Math.random() * delay;
            setTimeout(() => {
                now = new Date();
                delay = Math.min(delay * delayMult, maxDelay);
                const timeoutCal = timeout && timeoutMult ? timeout * timeoutMult : 0;
                const rpcTimeout = maxTimeout ? maxTimeout : 0;
                this.prevDeadline = deadline;
                const newDeadline = deadline ? deadline - now.getTime() : 0;
                timeout = Math.min(timeoutCal, rpcTimeout, newDeadline);
            }, toSleep);
        }
        else {
            const e = googleError_1.GoogleError.parseGRPCStatusDetails(error);
            e.note =
                'Exception occurred in retry method that was ' +
                    'not classified as transient';
            // for some reason this error must be emitted here
            // instead of the destroy, otherwise the error event
            // is swallowed
            this.emit('error', e);
            this.destroy();
            return;
        }
        retryStream = this.retry(stream, retry);
        this.stream = retryStream;
        return;
    }
    /**
     * Used during server streaming retries to handle
     * event forwarding, errors, and/or stream closure
     * @param {CancellableStream} stream - the stream that we're doing the retry on
     * @param {RetryOptions} retry - Configures the exceptions upon which the
     *   function should retry, and the parameters to the exponential backoff retry
     *   algorithm.
     */
    streamHandoffHelper(stream, retry) {
        let enteredError = false;
        this.eventForwardHelper(stream);
        stream.on('error', error => {
            enteredError = true;
            this.streamHandoffErrorHandler(stream, retry, error);
        });
        stream.on('data', (data) => {
            this.retries = 0;
            this.emit.bind(this, 'data')(data);
        });
        stream.on('end', () => {
            if (!enteredError) {
                enteredError = true;
                this.emit('end');
                this.cancel();
            }
        });
    }
    eventForwardHelper(stream) {
        const eventsToForward = ['metadata', 'response', 'status'];
        eventsToForward.forEach(event => {
            stream.on(event, this.emit.bind(this, event));
        });
    }
    statusMetadataHelper(stream) {
        // gRPC is guaranteed emit the 'status' event but not 'metadata', and 'status' is the last event to emit.
        // Emit the 'response' event if stream has no 'metadata' event.
        // This avoids the stream swallowing the other events, such as 'end'.
        stream.on('status', () => {
            if (!this._responseHasSent) {
                stream.emit('response', {
                    code: 200,
                    details: '',
                    message: 'OK',
                });
            }
        });
        // We also want to supply the status data as 'response' event to support
        // the behavior of google-cloud-node expects.
        // see:
        // https://github.com/GoogleCloudPlatform/google-cloud-node/pull/1775#issuecomment-259141029
        // https://github.com/GoogleCloudPlatform/google-cloud-node/blob/116436fa789d8b0f7fc5100b19b424e3ec63e6bf/packages/common/src/grpc-service.js#L355
        stream.on('metadata', metadata => {
            // Create a response object with succeeds.
            // TODO: unify this logic with the decoration of gRPC response when it's
            // added. see: https://github.com/googleapis/gax-nodejs/issues/65
            stream.emit('response', {
                code: 200,
                details: '',
                message: 'OK',
                metadata,
            });
            this._responseHasSent = true;
        });
    }
    /**
     * Forward events from an API request stream to the user's stream.
     * @param {Stream} stream - The API request stream.
     * @param {RetryOptions} retry - Configures the exceptions upon which the
     *   function should retry, and the parameters to the exponential backoff retry
     *   algorithm.
     */
    forwardEvents(stream) {
        this.eventForwardHelper(stream);
        this.statusMetadataHelper(stream);
        stream.on('error', error => {
            googleError_1.GoogleError.parseGRPCStatusDetails(error);
        });
    }
    defaultShouldRetry(error, retry) {
        if ((retry.retryCodes.length > 0 &&
            retry.retryCodes.indexOf(error.code) < 0) ||
            retry.retryCodes.length === 0) {
            return false;
        }
        return true;
    }
    /**
     * Forward events from an API request stream to the user's stream.
     * @param {Stream} stream - The API request stream.
     * @param {RetryOptions} retry - Configures the exceptions upon which the
     *   function eshould retry, and the parameters to the exponential backoff retry
     *   algorithm.
     */
    forwardEventsWithRetries(stream, retry) {
        let retryStream = this.stream;
        this.eventForwardHelper(stream);
        this.statusMetadataHelper(stream);
        stream.on('error', error => {
            const timeout = retry.backoffSettings.totalTimeoutMillis;
            const maxRetries = retry.backoffSettings.maxRetries;
            if ((maxRetries && maxRetries > 0) || (timeout && timeout > 0)) {
                if (this.shouldRetryRequest(error, retry)) {
                    if (maxRetries && timeout) {
                        const newError = new googleError_1.GoogleError('Cannot set both totalTimeoutMillis and maxRetries ' +
                            'in backoffSettings.');
                        newError.code = status_1.Status.INVALID_ARGUMENT;
                        this.emit('error', newError);
                        this.destroy();
                        return; //end chunk
                    }
                    else {
                        this.retries++;
                        retryStream = this.retry(stream, retry);
                        this.stream = retryStream;
                        return retryStream;
                    }
                }
                else {
                    const e = googleError_1.GoogleError.parseGRPCStatusDetails(error);
                    e.note =
                        'Exception occurred in retry method that was ' +
                            'not classified as transient';
                    this.destroy(e);
                    return; // end chunk
                }
            }
            else {
                if (maxRetries === 0) {
                    const e = googleError_1.GoogleError.parseGRPCStatusDetails(error);
                    e.note = 'Max retries is set to zero.';
                    this.destroy(e);
                    return; // end chunk
                }
                return googleError_1.GoogleError.parseGRPCStatusDetails(error);
            }
        });
        return retryStream;
    }
    /**
     * Resets the target stream as part of the retry process
     * @param {CancellableStream} requestStream - the stream to end
     */
    resetStreams(requestStream) {
        if (requestStream) {
            requestStream.cancel && requestStream.cancel();
            if (requestStream.destroy) {
                requestStream.destroy();
            }
            else if (requestStream.end) {
                // TODO: not used in server streaming, but likely needed
                // if we want to add BIDI or client side streaming
                requestStream.end();
            }
        }
    }
    /**
     * Specifies the target stream.
     * @param {ApiCall} apiCall - the API function to be called.
     * @param {Object} argument - the argument to be passed to the apiCall.
     * @param {RetryOptions} retry - Configures the exceptions upon which the
     *   function should retry, and the parameters to the exponential backoff retry
     *   algorithm.
     */
    setStream(apiCall, argument, retryRequestOptions = {}, retry) {
        this.apiCall = apiCall;
        this.argument = argument;
        if (this.type === StreamType.SERVER_STREAMING) {
            if (this.rest) {
                const stream = apiCall(argument, this._callback);
                this.stream = stream;
                this.setReadable(stream);
            }
            else if (this.gaxServerStreamingRetries) {
                const retryStream = (0, streamingRetryRequest_1.streamingRetryRequest)({
                    request: () => {
                        if (this._isCancelCalled) {
                            if (this.stream) {
                                this.stream.cancel();
                            }
                            return;
                        }
                        const stream = apiCall(argument, this._callback);
                        this.stream = stream;
                        this.stream = this.forwardEventsWithRetries(stream, retry);
                        return this.stream;
                    },
                });
                this.setReadable(retryStream);
            }
            else {
                const retryStream = retryRequest(null, {
                    objectMode: true,
                    request: () => {
                        if (this._isCancelCalled) {
                            if (this.stream) {
                                this.stream.cancel();
                            }
                            return;
                        }
                        const stream = apiCall(argument, this._callback);
                        this.stream = stream;
                        this.forwardEvents(stream);
                        return stream;
                    },
                    retries: retryRequestOptions.retries,
                    currentRetryAttempt: retryRequestOptions.currentRetryAttempt,
                    noResponseRetries: retryRequestOptions.noResponseRetries,
                    shouldRetryFn: retryRequestOptions.shouldRetryFn,
                });
                this.setReadable(retryStream);
            }
            return;
        }
        const stream = apiCall(argument, this._callback);
        this.stream = stream;
        this.forwardEvents(stream);
        if (this.type === StreamType.CLIENT_STREAMING) {
            this.setWritable(stream);
        }
        if (this.type === StreamType.BIDI_STREAMING) {
            this.setReadable(stream);
            this.setWritable(stream);
        }
        if (this._isCancelCalled && this.stream) {
            this.stream.cancel();
        }
    }
}
exports.StreamProxy = StreamProxy;
//# sourceMappingURL=streaming.js.map