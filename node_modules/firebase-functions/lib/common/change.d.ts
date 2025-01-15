/**
 * `ChangeJson` is the JSON format used to construct a `Change` object.
 */
export interface ChangeJson {
    /**
     * Key-value pairs representing state of data after the change.
     */
    after?: any;
    /**
     * Key-value pairs representing state of data before the change. If
     * `fieldMask` is set, then only fields that changed are present in `before`.
     */
    before?: any;
    /**
     * Comma-separated string that represents names of fields that changed.
     */
    fieldMask?: string;
}
/**
 * The Cloud Functions interface for events that change state, such as
 * Realtime Database or Cloud Firestore `onWrite` and `onUpdate` events.
 *
 * For more information about the format used to construct `Change` objects, see
 * {@link ChangeJson} below.
 *
 */
export declare class Change<T> {
    before: T;
    after: T;
    /**
     * Factory method for creating a `Change` from a `before` object and an `after`
     * object.
     */
    static fromObjects<T>(before: T, after: T): Change<T>;
    /**
     * Factory method for creating a `Change` from JSON and an optional customizer
     * function to be applied to both the `before` and the `after` fields.
     */
    static fromJSON<T>(json: ChangeJson, customizer?: (x: any) => T): Change<T>;
    constructor(before: T, after: T);
}
