import { ResetValue } from "../common/options";
import { Expression } from "../params";
import { ParamSpec, SecretParam } from "../params/types";
export { RESET_VALUE } from "../common/options";
/**
 * List of all regions supported by Cloud Functions (2nd gen).
 */
export type SupportedRegion = "asia-east1" | "asia-northeast1" | "asia-northeast2" | "europe-north1" | "europe-west1" | "europe-west4" | "us-central1" | "us-east1" | "us-east4" | "us-west1" | "asia-east2" | "asia-northeast3" | "asia-southeast1" | "asia-southeast2" | "asia-south1" | "australia-southeast1" | "europe-central2" | "europe-west2" | "europe-west3" | "europe-west6" | "northamerica-northeast1" | "southamerica-east1" | "us-west2" | "us-west3" | "us-west4";
/**
 * List of available memory options supported by Cloud Functions.
 */
export type MemoryOption = "128MiB" | "256MiB" | "512MiB" | "1GiB" | "2GiB" | "4GiB" | "8GiB" | "16GiB" | "32GiB";
/**
 * List of available options for `VpcConnectorEgressSettings`.
 */
export type VpcEgressSetting = "PRIVATE_RANGES_ONLY" | "ALL_TRAFFIC";
/**
 * List of available options for `IngressSettings`.
 */
export type IngressSetting = "ALLOW_ALL" | "ALLOW_INTERNAL_ONLY" | "ALLOW_INTERNAL_AND_GCLB";
/**
 * `GlobalOptions` are options that can be set across an entire project.
 * These options are common to HTTPS and event handling functions.
 */
export interface GlobalOptions {
    /**
     * If true, do not deploy or emulate this function.
     */
    omit?: boolean | Expression<boolean>;
    /**
     * Region where functions should be deployed.
     */
    region?: SupportedRegion | string | Expression<string> | ResetValue;
    /**
     * Amount of memory to allocate to a function.
     */
    memory?: MemoryOption | Expression<number> | ResetValue;
    /**
     * Timeout for the function in seconds, possible values are 0 to 540.
     * HTTPS functions can specify a higher timeout.
     *
     * @remarks
     * The minimum timeout for a 2nd gen function is 1s. The maximum timeout for a
     * function depends on the type of function: Event handling functions have a
     * maximum timeout of 540s (9 minutes). HTTPS and callable functions have a
     * maximum timeout of 3,600s (1 hour). Task queue functions have a maximum
     * timeout of 1,800s (30 minutes).
     */
    timeoutSeconds?: number | Expression<number> | ResetValue;
    /**
     * Minimum number of actual instances to be running at a given time.
     *
     * @remarks
     * Instances are billed for memory allocation and 10% of CPU allocation
     * while idle.
     */
    minInstances?: number | Expression<number> | ResetValue;
    /**
     * Max number of instances that can be running in parallel.
     */
    maxInstances?: number | Expression<number> | ResetValue;
    /**
     * Number of requests a function can serve at once.
     *
     * @remarks
     * Can be applied only to functions running on Cloud Functions (2nd gen)).
     * A value of null restores the default concurrency (80 when CPU >= 1, 1 otherwise).
     * Concurrency cannot be set to any value other than 1 if `cpu` is less than 1.
     * The maximum value for concurrency is 1,000.
     */
    concurrency?: number | Expression<number> | ResetValue;
    /**
     * Fractional number of CPUs to allocate to a function.
     *
     * @remarks
     * Defaults to 1 for functions with <= 2GB RAM and increases for larger memory sizes.
     * This is different from the defaults when using the gcloud utility and is different from
     * the fixed amount assigned in Cloud Functions (1st gen).
     * To revert to the CPU amounts used in gcloud or in Cloud Functions (1st gen), set this
     * to the value "gcf_gen1"
     */
    cpu?: number | "gcf_gen1";
    /**
     * Connect a function to a specified VPC connector.
     */
    vpcConnector?: string | Expression<string> | ResetValue;
    /**
     * Egress settings for VPC connector.
     */
    vpcConnectorEgressSettings?: VpcEgressSetting | ResetValue;
    /**
     * Specific service account for the function to run as.
     */
    serviceAccount?: string | Expression<string> | ResetValue;
    /**
     * Ingress settings which control where this function can be called from.
     */
    ingressSettings?: IngressSetting | ResetValue;
    /**
     * Invoker to set access control on HTTPS functions.
     */
    invoker?: "public" | "private" | string | string[];
    /**
     * User labels to set on the function.
     */
    labels?: Record<string, string>;
    secrets?: (string | SecretParam)[];
    /**
     * Determines whether Firebase App Check is enforced. Defaults to false.
     *
     * @remarks
     * When true, requests with invalid tokens autorespond with a 401
     * (Unauthorized) error.
     * When false, requests with invalid tokens set `event.app` to `undefined`.
     */
    enforceAppCheck?: boolean;
    /**
     * Controls whether function configuration modified outside of function source is preserved. Defaults to false.
     *
     * @remarks
     * When setting configuration available in an underlying platform that is not yet available in the Firebase SDK
     * for Cloud Functions, we recommend setting `preserveExternalChanges` to `true`. Otherwise, when Google releases
     * a new version of the SDK with support for the missing configuration, your function's manually configured setting
     * may inadvertently be wiped out.
     */
    preserveExternalChanges?: boolean;
}
/**
 * Sets default options for all functions written using the 2nd gen SDK.
 * @param options Options to set as default
 */
export declare function setGlobalOptions(options: GlobalOptions): void;
/**
 * Additional fields that can be set on any event-handling function.
 */
export interface EventHandlerOptions extends Omit<GlobalOptions, "enforceAppCheck"> {
    /** Type of the event. Valid values are TODO */
    eventType?: string;
    /** TODO */
    eventFilters?: Record<string, string | Expression<string>>;
    /** TODO */
    eventFilterPathPatterns?: Record<string, string | Expression<string>>;
    /** Whether failed executions should be delivered again. */
    retry?: boolean | Expression<boolean> | ResetValue;
    /** Region of the EventArc trigger. */
    region?: string | Expression<string> | ResetValue;
    /** The service account that EventArc should use to invoke this function. Requires the P4SA to have ActAs permission on this service account. */
    serviceAccount?: string | Expression<string> | ResetValue;
    /** The name of the channel where the function receives events. */
    channel?: string;
}
/**
 * @hidden
 * @alpha
 */
export declare function __getSpec(): {
    globalOptions: GlobalOptions;
    params: ParamSpec<any>[];
};
