/**
 * The 2nd gen API for Cloud Functions for Firebase.
 * This SDK supports deep imports. For example, the namespace
 * `pubsub` is available at `firebase-functions/v2` or is directly importable
 * from `firebase-functions/v2/pubsub`.
 * @packageDocumentation
 */
import * as logger from "../logger";
import * as alerts from "./providers/alerts";
import * as database from "./providers/database";
import * as eventarc from "./providers/eventarc";
import * as https from "./providers/https";
import * as identity from "./providers/identity";
import * as pubsub from "./providers/pubsub";
import * as scheduler from "./providers/scheduler";
import * as storage from "./providers/storage";
import * as tasks from "./providers/tasks";
import * as remoteConfig from "./providers/remoteConfig";
import * as testLab from "./providers/testLab";
import * as firestore from "./providers/firestore";
export { alerts, database, storage, https, identity, pubsub, logger, tasks, eventarc, scheduler, remoteConfig, testLab, firestore, };
export { setGlobalOptions, GlobalOptions, SupportedRegion, MemoryOption, VpcEgressSetting, IngressSetting, EventHandlerOptions, } from "./options";
export { CloudFunction, CloudEvent, ParamsOf, onInit } from "./core";
export { Change } from "../common/change";
import * as params from "../params";
export { params };
export { config } from "../v1/config";
import { setApp as setEmulatedAdminApp } from "../common/app";
export declare const app: {
    setEmulatedAdminApp: typeof setEmulatedAdminApp;
};
