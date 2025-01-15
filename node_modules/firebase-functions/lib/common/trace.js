"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTraceContext = exports.traceContext = void 0;
const async_hooks_1 = require("async_hooks");
/* @internal */
exports.traceContext = new async_hooks_1.AsyncLocalStorage();
/**
 * A regex to match the Cloud Trace header.
 *   - ([A-Fa-f0-9]{32}): The trace id, a 32 character hex value. (e.g. 4bf92f3577b34da6a3ce929d0e0e4736)
 *   - ([0-9]+): The parent span id, a 64 bit integer. (e.g. 00f067aa0ba902b7)
 *   - (?:;o=([0-3])): The trace mask, 1-3 denote it should be traced.
 */
const CLOUD_TRACE_REGEX = new RegExp("^(?<traceId>[A-Fa-f0-9]{32})/" + "(?<parentIdInt>[0-9]+)" + "(?:;o=(?<traceMask>[0-3]))?$");
const CLOUD_TRACE_HEADER = "X-Cloud-Trace-Context";
function matchCloudTraceHeader(carrier) {
    let header = carrier === null || carrier === void 0 ? void 0 : carrier[CLOUD_TRACE_HEADER];
    if (!header) {
        // try lowercase header
        header = carrier === null || carrier === void 0 ? void 0 : carrier[CLOUD_TRACE_HEADER.toLowerCase()];
    }
    if (header && typeof header === "string") {
        const matches = CLOUD_TRACE_REGEX.exec(header);
        if (matches && matches.groups) {
            const { traceId, parentIdInt, traceMask } = matches.groups;
            // Convert parentId from unsigned int to hex
            const parentId = parseInt(parentIdInt);
            if (isNaN(parentId)) {
                // Ignore traces with invalid parentIds
                return;
            }
            const sample = !!traceMask && traceMask !== "0";
            return { traceId, parentId: parentId.toString(16), sample, version: "00" };
        }
    }
}
/**
 * A regex to match the traceparent header.
 *   - ^([a-f0-9]{2}): The specification version (e.g. 00)
 *   - ([a-f0-9]{32}): The trace id, a 16-byte array. (e.g. 4bf92f3577b34da6a3ce929d0e0e4736)
 *   - ([a-f0-9]{16}): The parent span id, an 8-byte array. (e.g. 00f067aa0ba902b7)
 *   - ([a-f0-9]{2}: The sampled flag. (e.g. 00)
 */
const TRACEPARENT_REGEX = new RegExp("^(?<version>[a-f0-9]{2})-" +
    "(?<traceId>[a-f0-9]{32})-" +
    "(?<parentId>[a-f0-9]{16})-" +
    "(?<flag>[a-f0-9]{2})$");
const TRACEPARENT_HEADER = "traceparent";
function matchTraceparentHeader(carrier) {
    const header = carrier === null || carrier === void 0 ? void 0 : carrier[TRACEPARENT_HEADER];
    if (header && typeof header === "string") {
        const matches = TRACEPARENT_REGEX.exec(header);
        if (matches && matches.groups) {
            const { version, traceId, parentId, flag } = matches.groups;
            const sample = flag === "01";
            return { traceId, parentId, sample, version };
        }
    }
}
/**
 * Extracts trace context from given carrier object, if any.
 *
 * Supports Cloud Trace and traceparent format.
 *
 * @param carrier
 */
function extractTraceContext(carrier) {
    return matchCloudTraceHeader(carrier) || matchTraceparentHeader(carrier);
}
exports.extractTraceContext = extractTraceContext;
