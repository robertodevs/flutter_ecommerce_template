"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2022 Firebase
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSnapshot = void 0;
const database = require("firebase-admin/database");
const config_1 = require("../../common/config");
const path_1 = require("../../common/utilities/path");
/**
 * Interface representing a Firebase Realtime database data snapshot.
 */
class DataSnapshot {
    constructor(data, path, // path is undefined for the database root
    app, instance) {
        this.app = app;
        const config = (0, config_1.firebaseConfig)();
        if (instance) {
            // SDK always supplies instance, but user's unit tests may not
            this.instance = instance;
        }
        else if (app) {
            this.instance = app.options.databaseURL;
        }
        else if (config.databaseURL) {
            this.instance = config.databaseURL;
        }
        else if (process.env.GCLOUD_PROJECT) {
            this.instance = "https://" + process.env.GCLOUD_PROJECT + "-default-rtdb.firebaseio.com";
        }
        this._path = path;
        this._data = data;
    }
    /**
     * Returns a [`Reference`](/docs/reference/admin/node/admin.database.Reference)
     * to the database location where the triggering write occurred. Has
     * full read and write access.
     */
    get ref() {
        if (!this.app) {
            // may be unpopulated in user's unit tests
            throw new Error("Please supply a Firebase app in the constructor for DataSnapshot" +
                " in order to use the .ref method.");
        }
        if (!this._ref) {
            let db;
            if (this.instance) {
                db = database.getDatabaseWithUrl(this.instance, this.app);
            }
            else {
                db = database.getDatabase(this.app);
            }
            this._ref = db.ref(this._fullPath());
        }
        return this._ref;
    }
    /**
     * The key (last part of the path) of the location of this `DataSnapshot`.
     *
     * The last token in a database location is considered its key. For example,
     * "ada" is the key for the `/users/ada/` node. Accessing the key on any
     * `DataSnapshot` returns the key for the location that generated it.
     * However, accessing the key on the root URL of a database returns `null`.
     */
    get key() {
        const segments = (0, path_1.pathParts)(this._fullPath());
        const last = segments[segments.length - 1];
        return !last || last === "" ? null : last;
    }
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
    val() {
        const parts = (0, path_1.pathParts)(this._childPath);
        let source = this._data;
        if (parts.length) {
            for (const part of parts) {
                if (source[part] === undefined) {
                    return null;
                }
                source = source[part];
            }
        }
        const node = source !== null && source !== void 0 ? source : null;
        return this._checkAndConvertToArray(node);
    }
    /**
     * Exports the entire contents of the `DataSnapshot` as a JavaScript object.
     *
     * @return The contents of the `DataSnapshot` as a JavaScript value
     *   (Object, Array, string, number, boolean, or `null`).
     */
    exportVal() {
        return this.val();
    }
    /**
     * Gets the priority value of the data in this `DataSnapshot`.
     *
     * As an alternative to using priority, applications can order collections by
     * ordinary properties. See [Sorting and filtering
     * data](/docs/database/web/lists-of-data#sorting_and_filtering_data).
     *
     * @return The priority value of the data.
     */
    getPriority() {
        return 0;
    }
    /**
     * Returns `true` if this `DataSnapshot` contains any data. It is slightly more
     * efficient than using `snapshot.val() !== null`.
     *
     * @return `true` if this `DataSnapshot` contains any data; otherwise, `false`.
     */
    exists() {
        const val = this.val();
        if (typeof val === "undefined" || val === null) {
            return false;
        }
        if (typeof val === "object" && Object.keys(val).length === 0) {
            return false;
        }
        return true;
    }
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
    child(childPath) {
        if (!childPath) {
            return this;
        }
        return this._dup(childPath);
    }
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
    forEach(action) {
        const val = this.val() || {};
        if (typeof val === "object") {
            return Object.keys(val).some((key) => action(this.child(key)) === true);
        }
        return false;
    }
    /**
     * Returns `true` if the specified child path has (non-`null`) data.
     *
     * @param path A relative path to the location of a potential child.
     * @return `true` if data exists at the specified child path; otherwise,
     *   `false`.
     */
    hasChild(childPath) {
        return this.child(childPath).exists();
    }
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
    hasChildren() {
        const val = this.val();
        return val !== null && typeof val === "object" && Object.keys(val).length > 0;
    }
    /**
     * Returns the number of child properties of this `DataSnapshot`.
     *
     * @return Number of child properties of this `DataSnapshot`.
     */
    numChildren() {
        const val = this.val();
        return val !== null && typeof val === "object" ? Object.keys(val).length : 0;
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @return A JSON-serializable representation of this object.
     */
    toJSON() {
        return this.val();
    }
    /** Recursive function to check if keys are numeric & convert node object to array if they are
     *
     * @hidden
     */
    _checkAndConvertToArray(node) {
        if (node === null || typeof node === "undefined") {
            return null;
        }
        if (typeof node !== "object") {
            return node;
        }
        const obj = {};
        let numKeys = 0;
        let maxKey = 0;
        let allIntegerKeys = true;
        for (const key in node) {
            if (!node.hasOwnProperty(key)) {
                continue;
            }
            const childNode = node[key];
            const v = this._checkAndConvertToArray(childNode);
            if (v === null) {
                // Empty child node
                continue;
            }
            obj[key] = v;
            numKeys++;
            const integerRegExp = /^(0|[1-9]\d*)$/;
            if (allIntegerKeys && integerRegExp.test(key)) {
                maxKey = Math.max(maxKey, Number(key));
            }
            else {
                allIntegerKeys = false;
            }
        }
        if (numKeys === 0) {
            // Empty node
            return null;
        }
        if (allIntegerKeys && maxKey < 2 * numKeys) {
            // convert to array.
            const array = [];
            for (const key of Object.keys(obj)) {
                array[key] = obj[key];
            }
            return array;
        }
        return obj;
    }
    /** @hidden */
    _dup(childPath) {
        const dup = new DataSnapshot(this._data, undefined, this.app, this.instance);
        [dup._path, dup._childPath] = [this._path, this._childPath];
        if (childPath) {
            dup._childPath = (0, path_1.joinPath)(dup._childPath, childPath);
        }
        return dup;
    }
    /** @hidden */
    _fullPath() {
        return (this._path || "") + "/" + (this._childPath || "");
    }
}
exports.DataSnapshot = DataSnapshot;
