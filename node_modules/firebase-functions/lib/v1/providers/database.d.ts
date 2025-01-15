import { Change } from "../../common/change";
import { ParamsOf } from "../../common/params";
import { DataSnapshot } from "../../common/providers/database";
import { CloudFunction, EventContext } from "../cloud-functions";
import { DeploymentOptions } from "../function-configuration";
export { DataSnapshot };
/**
 * Registers a function that triggers on events from a specific
 * Firebase Realtime Database instance.
 *
 * @remarks
 * Use this method together with `ref` to specify the instance on which to
 * watch for database events. For example: `firebase.database.instance('my-app-db-2').ref('/foo/bar')`
 *
 * Note that `functions.database.ref` used without `instance` watches the
 * *default* instance for events.
 *
 * @param instance The instance name of the database instance
 *   to watch for write events.
 * @returns Firebase Realtime Database instance builder interface.
 */
export declare function instance(instance: string): InstanceBuilder;
/**
 * Registers a function that triggers on Firebase Realtime Database write
 * events.
 *
 * @remarks
 * This method behaves very similarly to the method of the same name in the
 * client and Admin Firebase SDKs. Any change to the Database that affects the
 * data at or below the provided `path` will fire an event in Cloud Functions.
 *
 * There are three important differences between listening to a Realtime
 * Database event in Cloud Functions and using the Realtime Database in the
 * client and Admin SDKs:
 *
 * 1. Cloud Functions allows wildcards in the `path` name. Any `path` component
 *    in curly brackets (`{}`) is a wildcard that matches all strings. The value
 *    that matched a certain invocation of a Cloud Function is returned as part
 *    of the [`EventContext.params`](cloud_functions_eventcontext.html#params object. For
 *    example, `ref("messages/{messageId}")` matches changes at
 *    `/messages/message1` or `/messages/message2`, resulting in
 *    `event.params.messageId` being set to `"message1"` or `"message2"`,
 *    respectively.
 *
 * 2. Cloud Functions do not fire an event for data that already existed before
 *    the Cloud Function was deployed.
 *
 * 3. Cloud Function events have access to more information, including a
 *    snapshot of the previous event data and information about the user who
 *    triggered the Cloud Function.
 *
 * @param path The path within the Database to watch for write events.
 * @returns Firebase Realtime Database builder interface.
 */
export declare function ref<Ref extends string>(path: Ref): RefBuilder<Ref>;
/**
 * The Firebase Realtime Database instance builder interface.
 *
 * Access via [`database.instance()`](providers_database_.html#instance).
 */
export declare class InstanceBuilder {
    private instance;
    private options;
    constructor(instance: string, options: DeploymentOptions);
    /**
     * @returns Firebase Realtime Database reference builder interface.
     */
    ref<Ref extends string>(path: Ref): RefBuilder<Ref>;
}
/**
 * The Firebase Realtime Database reference builder interface.
 *
 * Access via [`functions.database.ref()`](functions.database#.ref).
 */
export declare class RefBuilder<Ref extends string> {
    private triggerResource;
    private options;
    constructor(triggerResource: () => string, options: DeploymentOptions);
    /**
     * Event handler that fires every time a Firebase Realtime Database write
     * of any kind (creation, update, or delete) occurs.
     *
     * @param handler Event handler that runs every time a Firebase Realtime Database
     *   write occurs.
     * @returns A function that you can export and deploy.
     */
    onWrite(handler: (change: Change<DataSnapshot>, context: EventContext<ParamsOf<Ref>>) => PromiseLike<any> | any): CloudFunction<Change<DataSnapshot>>;
    /**
     * Event handler that fires every time data is updated in
     * Firebase Realtime Database.
     *
     * @param handler Event handler which is run every time a Firebase Realtime Database
     *   write occurs.
     * @returns A function which you can export and deploy.
     */
    onUpdate(handler: (change: Change<DataSnapshot>, context: EventContext<ParamsOf<Ref>>) => PromiseLike<any> | any): CloudFunction<Change<DataSnapshot>>;
    /**
     * Event handler that fires every time new data is created in
     * Firebase Realtime Database.
     *
     * @param handler Event handler that runs every time new data is created in
     *   Firebase Realtime Database.
     * @returns A function that you can export and deploy.
     */
    onCreate(handler: (snapshot: DataSnapshot, context: EventContext<ParamsOf<Ref>>) => PromiseLike<any> | any): CloudFunction<DataSnapshot>;
    /**
     * Event handler that fires every time data is deleted from
     * Firebase Realtime Database.
     *
     * @param handler Event handler that runs every time data is deleted from
     *   Firebase Realtime Database.
     * @returns A function that you can export and deploy.
     */
    onDelete(handler: (snapshot: DataSnapshot, context: EventContext<ParamsOf<Ref>>) => PromiseLike<any> | any): CloudFunction<DataSnapshot>;
    private onOperation;
    private changeConstructor;
}
