import * as express from "express";
import { Request } from "../../common/providers/https";
import { RateLimits, RetryConfig, TaskContext } from "../../common/providers/tasks";
import { ManifestEndpoint, ManifestRequiredAPI } from "../../runtime/manifest";
export { RetryConfig, RateLimits, TaskContext };
/**
 * Options for configuring the task queue to listen to.
 */
export interface TaskQueueOptions {
    /** How a task should be retried in the event of a non-2xx return. */
    retryConfig?: RetryConfig;
    /** How congestion control should be applied to the function. */
    rateLimits?: RateLimits;
    /**
     * Who can enqueue tasks for this function.
     * If left unspecified, only service accounts which have
     * `roles/cloudtasks.enqueuer` and `roles/cloudfunctions.invoker`
     * will have permissions.
     */
    invoker?: "private" | string | string[];
}
/**
 * A handler for tasks.
 */
export interface TaskQueueFunction {
    (req: Request, res: express.Response): Promise<void>;
    /** @alpha */
    __trigger: unknown;
    /** @alpha */
    __endpoint: ManifestEndpoint;
    /** @alpha */
    __requiredAPIs?: ManifestRequiredAPI[];
    /**
     * The callback passed to the `TaskQueueFunction` constructor.
     * @param data - The body enqueued into a task queue.
     * @param context - The request context of the enqueued task
     * @returns Any return value. Google Cloud Functions will await any promise
     *          before shutting down your function. Resolved return values
     *          are only used for unit testing purposes.
     */
    run(data: any, context: TaskContext): void | Promise<void>;
}
/**
 * Builder for creating a `TaskQueueFunction`.
 */
export declare class TaskQueueBuilder {
    private readonly tqOpts?;
    private readonly depOpts?;
    /**
     * Creates a handler for tasks sent to a Google Cloud Tasks queue.
     * @param handler - A callback to handle task requests.
     * @returns A function you can export and deploy.
     */
    onDispatch(handler: (data: any, context: TaskContext) => void | Promise<void>): TaskQueueFunction;
}
/**
 * Declares a function that can handle tasks enqueued using the Firebase Admin SDK.
 * @param options - Configuration for the Task Queue that feeds into this function.
 *        Omitting options will configure a Task Queue with default settings.
 */
export declare function taskQueue(options?: TaskQueueOptions): TaskQueueBuilder;
