"use strict";
// Copyright 2023 Google LLC
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamingRetryRequest = streamingRetryRequest;
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//     https://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const { PassThrough } = require('stream');
const DEFAULTS = {
    /*
      Max # of retries
    */
    maxRetries: 2,
};
// In retry-request, you could pass parameters to request using the requestOpts parameter
// when we called retry-request from gax, we always passed null
// passing null here removes an unnecessary parameter from this implementation
const requestOps = null;
const objectMode = true; // we don't support objectMode being false
/**
 * Localized adaptation derived from retry-request
 * @param opts - corresponds to https://github.com/googleapis/retry-request#opts-optional
 * @returns
 */
function streamingRetryRequest(opts) {
    opts = Object.assign({}, DEFAULTS, opts);
    if (opts.request === undefined) {
        throw new Error('A request function must be provided');
    }
    let numNoResponseAttempts = 0;
    let streamResponseHandled = false;
    let requestStream;
    let delayStream;
    const retryStream = new PassThrough({ objectMode: objectMode });
    makeRequest();
    return retryStream;
    function makeRequest() {
        streamResponseHandled = false;
        delayStream = new PassThrough({ objectMode: objectMode });
        requestStream = opts.request(requestOps);
        requestStream
            // gRPC via google-cloud-node can emit an `error` as well as a `response`
            // Whichever it emits, we run with-- we can't run with both. That's what
            // is up with the `streamResponseHandled` tracking.
            .on('error', (err) => {
            if (streamResponseHandled) {
                return;
            }
            streamResponseHandled = true;
            onResponse(err);
        })
            .on('response', (resp) => {
            if (streamResponseHandled) {
                return;
            }
            streamResponseHandled = true;
            onResponse(null, resp);
        });
        requestStream.pipe(delayStream);
    }
    function onResponse(err, response = null) {
        // An error such as DNS resolution.
        if (err) {
            numNoResponseAttempts++;
            if (numNoResponseAttempts <= opts.maxRetries) {
                makeRequest();
            }
            else {
                retryStream.emit('error', err);
            }
            return;
        }
        // No more attempts need to be made, just continue on.
        retryStream.emit('response', response);
        delayStream.pipe(retryStream);
        requestStream.on('error', () => {
            // retryStream must be destroyed here for the stream handoff part of retries to function properly
            // but the error event should not be passed - if it emits as part of .destroy()
            // it will bubble up early to the caller
            retryStream.destroy();
        });
    }
}
//# sourceMappingURL=streamingRetryRequest.js.map