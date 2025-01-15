import { Expression } from "../params";
import { ResetValue } from "../common/options";
import { SecretParam } from "../params/types";
export { RESET_VALUE } from "../common/options";
/**
 * List of all regions supported by Cloud Functions.
 */
export declare const SUPPORTED_REGIONS: readonly ["us-central1", "us-east1", "us-east4", "us-west2", "us-west3", "us-west4", "europe-central2", "europe-west1", "europe-west2", "europe-west3", "europe-west6", "asia-east1", "asia-east2", "asia-northeast1", "asia-northeast2", "asia-northeast3", "asia-south1", "asia-southeast1", "asia-southeast2", "northamerica-northeast1", "southamerica-east1", "australia-southeast1"];
/**
 * Cloud Functions min timeout value.
 */
export declare const MIN_TIMEOUT_SECONDS = 0;
/**
 * Cloud Functions max timeout value.
 */
export declare const MAX_TIMEOUT_SECONDS = 540;
/**
 * List of available memory options supported by Cloud Functions.
 */
export declare const VALID_MEMORY_OPTIONS: readonly ["128MB", "256MB", "512MB", "1GB", "2GB", "4GB", "8GB"];
/**
 * List of available options for VpcConnectorEgressSettings.
 */
export declare const VPC_EGRESS_SETTINGS_OPTIONS: readonly ["VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED", "PRIVATE_RANGES_ONLY", "ALL_TRAFFIC"];
/**
 * List of available options for IngressSettings.
 */
export declare const INGRESS_SETTINGS_OPTIONS: readonly ["INGRESS_SETTINGS_UNSPECIFIED", "ALLOW_ALL", "ALLOW_INTERNAL_ONLY", "ALLOW_INTERNAL_AND_GCLB"];
/**
 * Scheduler retry options. Applies only to scheduled functions.
 */
export interface ScheduleRetryConfig {
    /**
     * The number of attempts that the system will make to run a job using the exponential backoff procedure described by {@link ScheduleRetryConfig.maxDoublings}.
     *
     * @defaultValue 0 (infinite retry)
     */
    retryCount?: number | Expression<number> | ResetValue;
    /**
     * The time limit for retrying a failed job, measured from time when an execution was first attempted.
     *
     * If specified with {@link ScheduleRetryConfig.retryCount}, the job will be retried until both limits are reached.
     *
     * @defaultValue 0
     */
    maxRetryDuration?: string | Expression<string> | ResetValue;
    /**
     * The minimum amount of time to wait before retrying a job after it fails.
     *
     * @defaultValue 5 seconds
     */
    minBackoffDuration?: string | Expression<string> | ResetValue;
    /**
     * The maximum amount of time to wait before retrying a job after it fails.
     *
     * @defaultValue 1 hour
     */
    maxBackoffDuration?: string | Expression<string> | ResetValue;
    /**
     * The max number of backoff doubling applied at each retry.
     *
     * @defaultValue 5
     */
    maxDoublings?: number | Expression<number> | ResetValue;
}
/**
 * Configuration options for scheduled functions.
 */
export interface Schedule {
    /**
     * Describes the schedule on which the job will be executed.
     *
     * The schedule can be either of the following types:
     *
     * 1. {@link https://en.wikipedia.org/wiki/Cron#Overview | Crontab}
     *
     * 2. English-like {@link https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules | schedule}
     *
     * @example
     * ```
     * // Crontab schedule
     * schedule: "0 9 * * 1"` // Every Monday at 09:00 AM
     *
     * // English-like schedule
     * schedule: "every 5 minutes"
     * ```
     */
    schedule: string;
    /**
     * Specifies the time zone to be used in interpreting {@link Schedule.schedule}.
     *
     * The value of this field must be a time zone name from the tz database.
     */
    timeZone?: string | ResetValue;
    /**
     * Settings that determine the retry behavior.
     */
    retryConfig?: ScheduleRetryConfig;
}
/**
 * Configuration option for failure policy on background functions.
 */
export interface FailurePolicy {
    /**
     * Retry configuration. Must be an empty object.
     *
     */
    retry: Record<string, never>;
}
export declare const DEFAULT_FAILURE_POLICY: FailurePolicy;
export declare const MAX_NUMBER_USER_LABELS = 58;
/**
 * Configuration options for a function that applicable at runtime.
 */
export interface RuntimeOptions {
    /**
     * Failure policy of the function, with boolean `true` being equivalent to
     * providing an empty retry object.
     */
    failurePolicy?: FailurePolicy | boolean;
    /**
     * Amount of memory to allocate to the function.
     */
    memory?: (typeof VALID_MEMORY_OPTIONS)[number] | Expression<number> | ResetValue;
    /**
     * Timeout for the function in seconds, possible values are 0 to 540.
     */
    timeoutSeconds?: number | Expression<number> | ResetValue;
    /**
     * Min number of actual instances to be running at a given time.
     *
     * @remarks
     * Instances will be billed for memory allocation and 10% of CPU allocation
     * while idle.
     */
    minInstances?: number | Expression<number> | ResetValue;
    /**
     * Max number of actual instances allowed to be running in parallel.
     */
    maxInstances?: number | Expression<number> | ResetValue;
    /**
     * Connect cloud function to specified VPC connector.
     */
    vpcConnector?: string | Expression<string> | ResetValue;
    /**
     * Egress settings for VPC connector.
     */
    vpcConnectorEgressSettings?: (typeof VPC_EGRESS_SETTINGS_OPTIONS)[number] | ResetValue;
    /**
     * Specific service account for the function to run as.
     */
    serviceAccount?: "default" | string | Expression<string> | ResetValue;
    /**
     * Ingress settings which control where this function can be called from.
     */
    ingressSettings?: (typeof INGRESS_SETTINGS_OPTIONS)[number] | ResetValue;
    /**
     * User labels to set on the function.
     */
    labels?: Record<string, string>;
    /**
     * Invoker to set access control on https functions.
     */
    invoker?: "public" | "private" | string | string[];
    secrets?: (string | SecretParam)[];
    /**
     * Determines whether Firebase AppCheck is enforced.
     *
     * @remarks
     * When true, requests with invalid tokens autorespond with a 401
     * (Unauthorized) error.
     * When false, requests with invalid tokens set context.app to undefiend.
     */
    enforceAppCheck?: boolean;
    /**
     * Determines whether Firebase App Check token is consumed on request. Defaults to false.
     *
     * @remarks
     * Set this to true to enable the App Check replay protection feature by consuming the App Check token on callable
     * request. Tokens that are found to be already consumed will have the `request.app.alreadyConsumed` property set
     * to true.
     *
     *
     * Tokens are only considered to be consumed if it is sent to the App Check service by setting this option to true.
     * Other uses of the token do not consume it.
     *
     * This replay protection feature requires an additional network call to the App Check backend and forces the clients
     * to obtain a fresh attestation from the chosen attestation providers. This can therefore negatively impact
     * performance and can potentially deplete your attestation providers' quotas faster. Use this feature only for
     * protecting low volume, security critical, or expensive operations.
     *
     * This option does not affect the `enforceAppCheck` option. Setting the latter to true will cause the callable function
     * to automatically respond with a 401 Unauthorized status code when the request includes an invalid App Check token.
     * When the request includes valid but consumed App Check tokens, requests will not be automatically rejected. Instead,
     * the `request.app.alreadyConsumed` property will be set to true and pass the execution to the handler code for making
     * further decisions, such as requiring additional security checks or rejecting the request.
     */
    consumeAppCheckToken?: boolean;
    /**
     * Controls whether function configuration modified outside of function source is preserved. Defaults to false.
     *
     * @remarks
     * When setting configuration available in the underlying platform that is not yet available in the Firebase Functions
     * SDK, we highly recommend setting `preserveExternalChanges` to `true`. Otherwise, when the Firebase Functions SDK releases
     * a new version of the SDK with support for the missing configuration, your function's manually configured setting
     * may inadvertently be wiped out.
     */
    preserveExternalChanges?: boolean;
}
/**
 * Configuration options for a function that applies during function deployment.
 */
export interface DeploymentOptions extends RuntimeOptions {
    /**
     * If true, do not deploy or emulate this function.
     */
    omit?: boolean | Expression<boolean>;
    /**
     * Regions where function should be deployed.
     */
    regions?: Array<(typeof SUPPORTED_REGIONS)[number] | string | Expression<string> | ResetValue>;
    /**
     * Schedule for the scheduled function.
     */
    schedule?: Schedule;
}
