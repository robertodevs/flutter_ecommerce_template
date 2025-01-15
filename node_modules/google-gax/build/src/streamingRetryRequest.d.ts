interface streamingRetryRequestOptions {
    request: Function;
    maxRetries?: number;
}
/**
 * Localized adaptation derived from retry-request
 * @param opts - corresponds to https://github.com/googleapis/retry-request#opts-optional
 * @returns
 */
export declare function streamingRetryRequest(opts: streamingRetryRequestOptions): any;
export {};
