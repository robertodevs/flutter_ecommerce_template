/**
 * `LogSeverity` indicates the detailed severity of the log entry. See [LogSeverity](https://cloud.google.com/logging/docs/reference/v2/rest/v2/LogEntry#logseverity).
 * @public
 */
export type LogSeverity = "DEBUG" | "INFO" | "NOTICE" | "WARNING" | "ERROR" | "CRITICAL" | "ALERT" | "EMERGENCY";
/**
 * `LogEntry` represents a [structured Cloud Logging](https://cloud.google.com/logging/docs/structured-logging)
 * entry. All keys aside from `severity` and `message` are
 * included in the `jsonPayload` of the logged entry.
 * @public
 */
export interface LogEntry {
    severity: LogSeverity;
    message?: string;
    [key: string]: any;
}
/**
 * Writes a `LogEntry` to `stdout`/`stderr` (depending on severity).
 * @param entry - The `LogEntry` including severity, message, and any additional structured metadata.
 * @public
 */
export declare function write(entry: LogEntry): void;
/**
 * Writes a `DEBUG` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
export declare function debug(...args: any[]): void;
/**
 * Writes an `INFO` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
export declare function log(...args: any[]): void;
/**
 * Writes an `INFO` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
export declare function info(...args: any[]): void;
/**
 * Writes a `WARNING` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
export declare function warn(...args: any[]): void;
/**
 * Writes an `ERROR` severity log. If the last argument provided is a plain object,
 * it is added to the `jsonPayload` in the Cloud Logging entry.
 * @param args - Arguments, concatenated into the log message with space separators.
 * @public
 */
export declare function error(...args: any[]): void;
