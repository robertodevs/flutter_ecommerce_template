/**
 * Special configuration type to reset configuration to platform default.
 *
 * @alpha
 */
export declare class ResetValue {
    toJSON(): null;
    private constructor();
    static getInstance(): ResetValue;
}
/**
 * Special configuration value to reset configuration to platform default.
 */
export declare const RESET_VALUE: ResetValue;
