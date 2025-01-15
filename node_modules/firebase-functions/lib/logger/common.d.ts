/** @hidden */
export declare const CONSOLE_SEVERITY: {
    [severity: string]: "debug" | "info" | "warn" | "error";
};
/** @hidden */
export declare const UNPATCHED_CONSOLE: {
    debug: (message?: any, ...optionalParams: any[]) => void;
    info: (message?: any, ...optionalParams: any[]) => void;
    log: (message?: any, ...optionalParams: any[]) => void;
    warn: (message?: any, ...optionalParams: any[]) => void;
    error: (message?: any, ...optionalParams: any[]) => void;
};
