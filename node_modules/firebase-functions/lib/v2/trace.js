"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapTraceContext = void 0;
const trace_1 = require("../common/trace");
function wrapTraceContext(handler) {
    return (...args) => {
        let traceParent;
        if (args.length === 1) {
            traceParent = (0, trace_1.extractTraceContext)(args[0]);
        }
        else {
            traceParent = (0, trace_1.extractTraceContext)(args[0].headers);
        }
        if (!traceParent) {
            // eslint-disable-next-line prefer-spread
            return handler.apply(null, args);
        }
        return trace_1.traceContext.run(traceParent, handler, ...args);
    };
}
exports.wrapTraceContext = wrapTraceContext;
