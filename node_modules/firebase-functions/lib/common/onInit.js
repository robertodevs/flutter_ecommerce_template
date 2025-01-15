"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withInit = exports.onInit = void 0;
const logger = require("../logger");
let initCallback = null;
let didInit = false;
/**
 * Registers a callback that should be run when in a production environment
 * before executing any functions code.
 * Calling this function more than once leads to undefined behavior.
 * @param callback initialization callback to be run before any function executes.
 */
function onInit(callback) {
    if (initCallback) {
        logger.warn("Setting onInit callback more than once. Only the most recent callback will be called");
    }
    initCallback = callback;
    didInit = false;
}
exports.onInit = onInit;
/** @internal */
function withInit(func) {
    return async (...args) => {
        if (!didInit) {
            if (initCallback) {
                await initCallback();
            }
            didInit = true;
        }
        // Note: This cast is actually inaccurate because it may be a promise, but
        // it doesn't actually matter because the async function will promisify
        // non-promises and forward promises.
        return func(...args);
    };
}
exports.withInit = withInit;
