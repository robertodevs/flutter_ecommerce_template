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
exports.Change = exports.applyFieldMask = void 0;
/** @internal */
function applyFieldMask(sparseBefore, after, fieldMask) {
    const before = { ...after };
    const masks = fieldMask.split(",");
    for (const mask of masks) {
        const parts = mask.split(".");
        const head = parts[0];
        const tail = parts.slice(1).join(".");
        if (parts.length > 1) {
            before[head] = applyFieldMask(sparseBefore === null || sparseBefore === void 0 ? void 0 : sparseBefore[head], after[head], tail);
            continue;
        }
        const val = sparseBefore === null || sparseBefore === void 0 ? void 0 : sparseBefore[head];
        if (typeof val === "undefined") {
            delete before[mask];
        }
        else {
            before[mask] = val;
        }
    }
    return before;
}
exports.applyFieldMask = applyFieldMask;
/**
 * The Cloud Functions interface for events that change state, such as
 * Realtime Database or Cloud Firestore `onWrite` and `onUpdate` events.
 *
 * For more information about the format used to construct `Change` objects, see
 * {@link ChangeJson} below.
 *
 */
class Change {
    /**
     * Factory method for creating a `Change` from a `before` object and an `after`
     * object.
     */
    static fromObjects(before, after) {
        return new Change(before, after);
    }
    /**
     * Factory method for creating a `Change` from JSON and an optional customizer
     * function to be applied to both the `before` and the `after` fields.
     */
    static fromJSON(json, customizer = (x) => x) {
        let before = { ...json.before };
        if (json.fieldMask) {
            before = applyFieldMask(before, json.after, json.fieldMask);
        }
        return Change.fromObjects(customizer(before || {}), customizer(json.after || {}));
    }
    constructor(before, after) {
        this.before = before;
        this.after = after;
    }
}
exports.Change = Change;
