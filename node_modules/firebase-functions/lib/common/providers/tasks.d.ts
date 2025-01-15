import { DecodedIdToken } from "firebase-admin/auth";
import { Expression } from "../../params";
import { ResetValue } from "../options";
/** How a task should be retried in the event of a non-2xx return. */
export interface RetryConfig {
    /**
     * Maximum number of times a request should be attempted.
     * If left unspecified, will default to 3.
     */
    maxAttempts?: number | Expression<number> | ResetValue;
    /**
     * Maximum amount of time for retrying failed task.
     * If left unspecified will retry indefinitely.
     */
    maxRetrySeconds?: number | Expression<number> | ResetValue;
    /**
     * The maximum amount of time to wait between attempts.
     * If left unspecified will default to 1hr.
     */
    maxBackoffSeconds?: number | Expression<number> | ResetValue;
    /**
     * The maximum number of times to double the backoff between
     * retries. If left unspecified will default to 16.
     */
    maxDoublings?: number | Expression<number> | ResetValue;
    /**
     * The minimum time to wait between attempts. If left unspecified
     * will default to 100ms.
     */
    minBackoffSeconds?: number | Expression<number> | ResetValue;
}
/** How congestion control should be applied to the function. */
export interface RateLimits {
    /**
     * The maximum number of requests that can be processed at a time.
     * If left unspecified, will default to 1000.
     */
    maxConcurrentDispatches?: number | Expression<number> | ResetValue;
    /**
     * The maximum number of requests that can be invoked per second.
     * If left unspecified, will default to 500.
     */
    maxDispatchesPerSecond?: number | Expression<number> | ResetValue;
}
/** Metadata about the authorization used to invoke a function. */
export interface AuthData {
    uid: string;
    token: DecodedIdToken;
}
/** Metadata about a call to a Task Queue function. */
export interface TaskContext {
    /**
     * The result of decoding and verifying an ODIC token.
     */
    auth?: AuthData;
    /**
     * The name of the queue.
     * Populated via the `X-CloudTasks-QueueName` header.
     */
    queueName: string;
    /**
     * The "short" name of the task, or, if no name was specified at creation, a unique
     * system-generated id.
     * This is the "my-task-id" value in the complete task name, such as "task_name =
     * projects/my-project-id/locations/my-location/queues/my-queue-id/tasks/my-task-id."
     * Populated via the `X-CloudTasks-TaskName` header.
     */
    id: string;
    /**
     * The number of times this task has been retried.
     * For the first attempt, this value is 0. This number includes attempts where the task failed
     * due to 5XX error codes and never reached the execution phase.
     * Populated via the `X-CloudTasks-TaskRetryCount` header.
     */
    retryCount: number;
    /**
     * The total number of times that the task has received a response from the handler.
     * Since Cloud Tasks deletes the task once a successful response has been received, all
     * previous handler responses were failures. This number does not include failures due to 5XX
     * error codes.
     * Populated via the `X-CloudTasks-TaskExecutionCount` header.
     */
    executionCount: number;
    /**
     * The schedule time of the task, as an RFC 3339 string in UTC time zone.
     * Populated via the `X-CloudTasks-TaskETA` header, which uses seconds since January 1 1970.
     */
    scheduledTime: string;
    /**
     * The HTTP response code from the previous retry.
     * Populated via the `X-CloudTasks-TaskPreviousResponse` header
     */
    previousResponse?: number;
    /**
     * The reason for retrying the task.
     * Populated via the `X-CloudTasks-TaskRetryReason` header.
     */
    retryReason?: string;
    /**
     * Raw request headers.
     */
    headers?: Record<string, string>;
}
/**
 * The request used to call a task queue function.
 */
export type Request<T = any> = TaskContext & {
    /**
     * The parameters used by a client when calling this function.
     */
    data: T;
};
