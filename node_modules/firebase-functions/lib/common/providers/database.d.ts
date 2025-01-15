import { App } from "firebase-admin/app";
import * as database from "firebase-admin/database";
/**
 * Pulled from @firebase/database-types, make sure the interface is updated on dependencies upgrades.
 * Represents a child snapshot of a `Reference` that is being iterated over. The key will never be undefined.
 */
interface IteratedDataSnapshot extends DataSnapshot {
    key: string;
}
/**
 * Interface representing a Firebase Realtime database data snapshot.
 */
export declare class DataSnapshot implements database.DataSnapshot {
    private app?;
    instance: string;
    /** @hidden */
    private _ref;
    /** @hidden */
    private _path;
    /** @hidden */
    private _data;
    /** @hidden */
    private _childPath;
    constructor(data: any, path?: string, // path is undefined for the database root
    app?: App, instance?: string);
    /**
     * Returns a [`Reference`](/docs/reference/admin/node/admin.database.Reference)
     * to the database location where the triggering write occurred. Has
     * full read and write access.
     */
    get ref(): database.Reference;
    /**
     * The key (last part of the path) of the location of this `DataSnapshot`.
     *
     * The last token in a database location is considered its key. For example,
     * "ada" is the key for the `/users/ada/` node. Accessing the key on any
     * `DataSnapshot` returns the key for the location that generated it.
     * However, accessing the key on the root URL of a database returns `null`.
     */
    get key(): string | null;
    /**
     * Extracts a JavaScript value from a `DataSnapshot`.
     *
     * Depending on the data in a `DataSnapshot`, the `val()` method may return a
     * scalar type (string, number, or boolean), an array, or an object. It may also
     * return `null`, indicating that the `DataSnapshot` is empty (contains no
     * data).
     *
     * @return The snapshot's contents as a JavaScript value (Object,
     *   Array, string, number, boolean, or `null`).
     */
    val(): any;
    /**
     * Exports the entire contents of the `DataSnapshot` as a JavaScript object.
     *
     * @return The contents of the `DataSnapshot` as a JavaScript value
     *   (Object, Array, string, number, boolean, or `null`).
     */
    exportVal(): any;
    /**
     * Gets the priority value of the data in this `DataSnapshot`.
     *
     * As an alternative to using priority, applications can order collections by
     * ordinary properties. See [Sorting and filtering
     * data](/docs/database/web/lists-of-data#sorting_and_filtering_data).
     *
     * @return The priority value of the data.
     */
    getPriority(): string | number | null;
    /**
     * Returns `true` if this `DataSnapshot` contains any data. It is slightly more
     * efficient than using `snapshot.val() !== null`.
     *
     * @return `true` if this `DataSnapshot` contains any data; otherwise, `false`.
     */
    exists(): boolean;
    /**
     * Gets a `DataSnapshot` for the location at the specified relative path.
     *
     * The relative path can either be a simple child name (for example, "ada") or
     * a deeper slash-separated path (for example, "ada/name/first").
     *
     * @param path A relative path from this location to the desired child
     *   location.
     * @return The specified child location.
     */
    child(childPath: string): DataSnapshot;
    /**
     * Enumerates the `DataSnapshot`s of the children items.
     *
     * Because of the way JavaScript objects work, the ordering of data in the
     * JavaScript object returned by `val()` is not guaranteed to match the ordering
     * on the server nor the ordering of `child_added` events. That is where
     * `forEach()` comes in handy. It guarantees the children of a `DataSnapshot`
     * can be iterated in their query order.
     *
     * If no explicit `orderBy*()` method is used, results are returned
     * ordered by key (unless priorities are used, in which case, results are
     * returned by priority).
     *
     * @param action A function that is called for each child `DataSnapshot`.
     *   The callback can return `true` to cancel further enumeration.
     *
     * @return `true` if enumeration was canceled due to your callback
     *   returning `true`.
     */
    forEach(action: (a: IteratedDataSnapshot) => boolean | void): boolean;
    /**
     * Returns `true` if the specified child path has (non-`null`) data.
     *
     * @param path A relative path to the location of a potential child.
     * @return `true` if data exists at the specified child path; otherwise,
     *   `false`.
     */
    hasChild(childPath: string): boolean;
    /**
     * Returns whether or not the `DataSnapshot` has any non-`null` child
     * properties.
     *
     * You can use `hasChildren()` to determine if a `DataSnapshot` has any
     * children. If it does, you can enumerate them using `forEach()`. If it
     * doesn't, then either this snapshot contains a primitive value (which can be
     * retrieved with `val()`) or it is empty (in which case, `val()` returns
     * `null`).
     *
     * @return `true` if this snapshot has any children; else `false`.
     */
    hasChildren(): boolean;
    /**
     * Returns the number of child properties of this `DataSnapshot`.
     *
     * @return Number of child properties of this `DataSnapshot`.
     */
    numChildren(): number;
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @return A JSON-serializable representation of this object.
     */
    toJSON(): Record<string, unknown>;
    /** Recursive function to check if keys are numeric & convert node object to array if they are
     *
     * @hidden
     */
    private _checkAndConvertToArray;
    /** @hidden */
    private _dup;
    /** @hidden */
    private _fullPath;
}
export {};
