export interface TraceContext {
    version: string;
    traceId: string;
    parentId: string;
    sample: boolean;
}
/**
 * Extracts trace context from given carrier object, if any.
 *
 * Supports Cloud Trace and traceparent format.
 *
 * @param carrier
 */
export declare function extractTraceContext(carrier: unknown): TraceContext | undefined;
