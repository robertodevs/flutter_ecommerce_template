/**
 * Registers a callback that should be run when in a production environment
 * before executing any functions code.
 * Calling this function more than once leads to undefined behavior.
 * @param callback initialization callback to be run before any function executes.
 */
export declare function onInit(callback: () => unknown): void;
