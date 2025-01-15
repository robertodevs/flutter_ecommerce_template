import { CloudEvent, CloudFunction } from "../core";
import { EventHandlerOptions } from "../options";
/** All the fields associated with the person/service account that wrote a Remote Config template. */
export interface ConfigUser {
    /** Display name. */
    name: string;
    /** Email address. */
    email: string;
    /** Image URL. */
    imageUrl: string;
}
/** What type of update was associated with the Remote Config template version. */
export type ConfigUpdateOrigin = 
/** Catch-all for unrecognized values. */
"REMOTE_CONFIG_UPDATE_ORIGIN_UNSPECIFIED"
/** The update came from the Firebase UI. */
 | "CONSOLE"
/** The update came from the Remote Config REST API. */
 | "REST_API"
/** The update came from the Firebase Admin Node SDK. */
 | "ADMIN_SDK_NODE";
/** Where the Remote Config update action originated. */
export type ConfigUpdateType = 
/** Catch-all for unrecognized enum values */
"REMOTE_CONFIG_UPDATE_TYPE_UNSPECIFIED"
/** A regular incremental update */
 | "INCREMENTAL_UPDATE"
/** A forced update. The ETag was specified as "*" in an UpdateRemoteConfigRequest request or the "Force Update" button was pressed on the console */
 | "FORCED_UPDATE"
/** A rollback to a previous Remote Config template */
 | "ROLLBACK";
/** The data within Firebase Remote Config update events. */
export interface ConfigUpdateData {
    /** The version number of the version's corresponding Remote Config template. */
    versionNumber: number;
    /** When the Remote Config template was written to the Remote Config server. */
    updateTime: string;
    /** Aggregation of all metadata fields about the account that performed the update. */
    updateUser: ConfigUser;
    /** The user-provided description of the corresponding Remote Config template. */
    description: string;
    /** Where the update action originated. */
    updateOrigin: ConfigUpdateOrigin;
    /** What type of update was made. */
    updateType: ConfigUpdateType;
    /** Only present if this version is the result of a rollback, and will be the version number of the Remote Config template that was rolled-back to. */
    rollbackSource: number;
}
/**
 * Event handler which triggers when data is updated in a Remote Config.
 *
 * @param handler - Event handler which is run every time a Remote Config update occurs.
 * @returns A function that you can export and deploy.
 */
export declare function onConfigUpdated(handler: (event: CloudEvent<ConfigUpdateData>) => any | Promise<any>): CloudFunction<CloudEvent<ConfigUpdateData>>;
/**
 * Event handler which triggers when data is updated in a Remote Config.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Remote Config update occurs.
 * @returns A function that you can export and deploy.
 */
export declare function onConfigUpdated(opts: EventHandlerOptions, handler: (event: CloudEvent<ConfigUpdateData>) => any | Promise<any>): CloudFunction<CloudEvent<ConfigUpdateData>>;
