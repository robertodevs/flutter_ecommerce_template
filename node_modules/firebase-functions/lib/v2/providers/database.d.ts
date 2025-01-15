import { Change } from "../../common/change";
import { ParamsOf } from "../../common/params";
import { ResetValue } from "../../common/options";
import { DataSnapshot } from "../../common/providers/database";
import { CloudEvent, CloudFunction } from "../core";
import { Expression } from "../../params";
import * as options from "../options";
import { SecretParam } from "../../params/types";
export { DataSnapshot };
/** @hidden */
export interface RawRTDBCloudEventData {
    ["@type"]: "type.googleapis.com/google.events.firebase.database.v1.ReferenceEventData";
    data: any;
    delta: any;
}
/** @hidden */
export interface RawRTDBCloudEvent extends CloudEvent<RawRTDBCloudEventData> {
    firebasedatabasehost: string;
    instance: string;
    ref: string;
    location: string;
}
/** A CloudEvent that contains a DataSnapshot or a Change<DataSnapshot> */
export interface DatabaseEvent<T, Params = Record<string, string>> extends CloudEvent<T> {
    /** The domain of the database instance */
    firebaseDatabaseHost: string;
    /** The instance ID portion of the fully qualified resource name */
    instance: string;
    /** The database reference path */
    ref: string;
    /** The location of the database */
    location: string;
    /**
     * An object containing the values of the path patterns.
     * Only named capture groups will be populated - {key}, {key=*}, {key=**}
     */
    params: Params;
}
/** ReferenceOptions extend EventHandlerOptions with provided ref and optional instance  */
export interface ReferenceOptions<Ref extends string = string> extends options.EventHandlerOptions {
    /**
     * Specify the handler to trigger on a database reference(s).
     * This value can either be a single reference or a pattern.
     * Examples: '/foo/bar', '/foo/{bar}'
     */
    ref: Ref;
    /**
     * Specify the handler to trigger on a database instance(s).
     * If present, this value can either be a single instance or a pattern.
     * Examples: 'my-instance-1', 'my-instance-*'
     * Note: The capture syntax cannot be used for 'instance'.
     */
    instance?: string;
    /**
     * If true, do not deploy or emulate this function.
     */
    omit?: boolean | Expression<boolean>;
    /**
     * Region where functions should be deployed.
     */
    region?: options.SupportedRegion | string | Expression<string> | ResetValue;
    /**
     * Amount of memory to allocate to a function.
     */
    memory?: options.MemoryOption | Expression<number> | ResetValue;
    /**
     * Timeout for the function in seconds, possible values are 0 to 540.
     * HTTPS functions can specify a higher timeout.
     *
     * @remarks
     * The minimum timeout for a gen 2 function is 1s. The maximum timeout for a
     * function depends on the type of function: Event handling functions have a
     * maximum timeout of 540s (9 minutes). HTTPS and callable functions have a
     * maximum timeout of 3,600s (1 hour). Task queue functions have a maximum
     * timeout of 1,800s (30 minutes)
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
     * Max number of instances to be running in parallel.
     */
    maxInstances?: number | Expression<number> | ResetValue;
    /**
     * Number of requests a function can serve at once.
     *
     * @remarks
     * Can only be applied to functions running on Cloud Functions v2.
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
     * the fixed amount assigned in Google Cloud Functions generation 1.
     * To revert to the CPU amounts used in gcloud or in Cloud Functions generation 1, set this
     * to the value "gcf_gen1"
     */
    cpu?: number | "gcf_gen1";
    /**
     * Connect cloud function to specified VPC connector.
     */
    vpcConnector?: string | Expression<string> | ResetValue;
    /**
     * Egress settings for VPC connector.
     */
    vpcConnectorEgressSettings?: options.VpcEgressSetting | ResetValue;
    /**
     * Specific service account for the function to run as.
     */
    serviceAccount?: string | Expression<string> | ResetValue;
    /**
     * Ingress settings which control where this function can be called from.
     */
    ingressSettings?: options.IngressSetting | ResetValue;
    /**
     * User labels to set on the function.
     */
    labels?: Record<string, string>;
    secrets?: (string | SecretParam)[];
    /** Whether failed executions should be delivered again. */
    retry?: boolean | Expression<boolean> | ResetValue;
}
/**
 * Event handler which triggers when data is created, updated, or deleted in Realtime Database.
 *
 * @param reference - The database reference path to trigger on.
 * @param handler - Event handler which is run every time a Realtime Database create, update, or delete occurs.
 */
export declare function onValueWritten<Ref extends string>(ref: Ref, handler: (event: DatabaseEvent<Change<DataSnapshot>, ParamsOf<Ref>>) => any | Promise<any>): CloudFunction<DatabaseEvent<Change<DataSnapshot>, ParamsOf<Ref>>>;
/**
 * Event handler which triggers when data is created, updated, or deleted in Realtime Database.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Realtime Database create, update, or delete occurs.
 */
export declare function onValueWritten<Ref extends string>(opts: ReferenceOptions<Ref>, handler: (event: DatabaseEvent<Change<DataSnapshot>, ParamsOf<Ref>>) => any | Promise<any>): CloudFunction<DatabaseEvent<Change<DataSnapshot>, ParamsOf<Ref>>>;
/**
 * Event handler which triggers when data is created in Realtime Database.
 *
 * @param reference - The database reference path to trigger on.
 * @param handler - Event handler which is run every time a Realtime Database create occurs.
 */
export declare function onValueCreated<Ref extends string>(ref: Ref, handler: (event: DatabaseEvent<DataSnapshot, ParamsOf<Ref>>) => any | Promise<any>): CloudFunction<DatabaseEvent<DataSnapshot, ParamsOf<Ref>>>;
/**
 * Event handler which triggers when data is created in Realtime Database.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Realtime Database create occurs.
 */
export declare function onValueCreated<Ref extends string>(opts: ReferenceOptions<Ref>, handler: (event: DatabaseEvent<DataSnapshot, ParamsOf<Ref>>) => any | Promise<any>): CloudFunction<DatabaseEvent<DataSnapshot, ParamsOf<Ref>>>;
/**
 * Event handler which triggers when data is updated in Realtime Database.
 *
 * @param reference - The database reference path to trigger on.
 * @param handler - Event handler which is run every time a Realtime Database update occurs.
 */
export declare function onValueUpdated<Ref extends string>(ref: Ref, handler: (event: DatabaseEvent<Change<DataSnapshot>, ParamsOf<Ref>>) => any | Promise<any>): CloudFunction<DatabaseEvent<Change<DataSnapshot>, ParamsOf<Ref>>>;
/**
 * Event handler which triggers when data is updated in Realtime Database.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Realtime Database update occurs.
 */
export declare function onValueUpdated<Ref extends string>(opts: ReferenceOptions<Ref>, handler: (event: DatabaseEvent<Change<DataSnapshot>, ParamsOf<Ref>>) => any | Promise<any>): CloudFunction<DatabaseEvent<Change<DataSnapshot>, ParamsOf<Ref>>>;
/**
 * Event handler which triggers when data is deleted in Realtime Database.
 *
 * @param reference - The database reference path to trigger on.
 * @param handler - Event handler which is run every time a Realtime Database deletion occurs.
 */
export declare function onValueDeleted<Ref extends string>(ref: Ref, handler: (event: DatabaseEvent<DataSnapshot, ParamsOf<Ref>>) => any | Promise<any>): CloudFunction<DatabaseEvent<DataSnapshot, ParamsOf<Ref>>>;
/**
 * Event handler which triggers when data is deleted in Realtime Database.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Realtime Database deletion occurs.
 */
export declare function onValueDeleted<Ref extends string>(opts: ReferenceOptions<Ref>, handler: (event: DatabaseEvent<DataSnapshot, ParamsOf<Ref>>) => any | Promise<any>): CloudFunction<DatabaseEvent<DataSnapshot, ParamsOf<Ref>>>;
