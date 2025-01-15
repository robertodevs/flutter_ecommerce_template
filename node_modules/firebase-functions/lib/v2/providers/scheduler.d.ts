import { ResetValue } from "../../common/options";
import { timezone } from "../../common/timezone";
import { ManifestRequiredAPI } from "../../runtime/manifest";
import { HttpsFunction } from "./https";
import { Expression } from "../../params";
import * as options from "../options";
/**
 * Interface representing a ScheduleEvent that is passed to the function handler.
 */
export interface ScheduledEvent {
    /**
     * The Cloud Scheduler job name.
     * Populated via the X-CloudScheduler-JobName header.
     *
     * If invoked manually, this field is undefined.
     */
    jobName?: string;
    /**
     * For Cloud Scheduler jobs specified in the unix-cron format,
     * this is the job schedule time in RFC3339 UTC "Zulu" format.
     * Populated via the X-CloudScheduler-ScheduleTime header.
     *
     * If the schedule is manually triggered, this field will be
     * the function execution time.
     */
    scheduleTime: string;
}
/** The Cloud Function type for Schedule triggers. */
export interface ScheduleFunction extends HttpsFunction {
    __requiredAPIs?: ManifestRequiredAPI[];
    run(data: ScheduledEvent): void | Promise<void>;
}
/** Options that can be set on a Schedule trigger. */
export interface ScheduleOptions extends options.GlobalOptions {
    /** The schedule, in Unix Crontab or AppEngine syntax. */
    schedule: string;
    /** The timezone that the schedule executes in. */
    timeZone?: timezone | Expression<string> | ResetValue;
    /** The number of retry attempts for a failed run. */
    retryCount?: number | Expression<number> | ResetValue;
    /** The time limit for retrying. */
    maxRetrySeconds?: number | Expression<number> | ResetValue;
    /** The minimum time to wait before retying. */
    minBackoffSeconds?: number | Expression<number> | ResetValue;
    /** The maximum time to wait before retrying. */
    maxBackoffSeconds?: number | Expression<number> | ResetValue;
    /** The time between will double max doublings times. */
    maxDoublings?: number | Expression<number> | ResetValue;
}
/**
 * Handler for scheduled functions. Triggered whenever the associated
 * scheduler job sends a http request.
 * @param schedule - The schedule, in Unix Crontab or AppEngine syntax.
 * @param handler - A function to execute when triggered.
 * @returns A function that you can export and deploy.
 */
export declare function onSchedule(schedule: string, handler: (event: ScheduledEvent) => void | Promise<void>): ScheduleFunction;
/**
 * Handler for scheduled functions. Triggered whenever the associated
 * scheduler job sends a http request.
 * @param options - Options to set on scheduled functions.
 * @param handler - A function to execute when triggered.
 * @returns A function that you can export and deploy.
 */
export declare function onSchedule(options: ScheduleOptions, handler: (event: ScheduledEvent) => void | Promise<void>): ScheduleFunction;
