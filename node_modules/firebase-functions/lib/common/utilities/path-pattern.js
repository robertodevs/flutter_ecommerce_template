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
exports.PathPattern = exports.trimParam = void 0;
const path_1 = require("./path");
/** https://cloud.google.com/eventarc/docs/path-patterns */
/** @hidden */
const WILDCARD_CAPTURE_REGEX = new RegExp("{[^/{}]+}", "g");
/** @internal */
function trimParam(param) {
    const paramNoBraces = param.slice(1, -1);
    if (paramNoBraces.includes("=")) {
        return paramNoBraces.slice(0, paramNoBraces.indexOf("="));
    }
    return paramNoBraces;
}
exports.trimParam = trimParam;
/** @hidden */
class Segment {
    constructor(value) {
        this.value = value;
        this.name = "segment";
        this.trimmed = value;
    }
    isSingleSegmentWildcard() {
        return this.value.includes("*") && !this.isMultiSegmentWildcard();
    }
    isMultiSegmentWildcard() {
        return this.value.includes("**");
    }
}
/** @hidden */
class SingleCaptureSegment {
    constructor(value) {
        this.value = value;
        this.name = "single-capture";
        this.trimmed = trimParam(value);
    }
    isSingleSegmentWildcard() {
        return true;
    }
    isMultiSegmentWildcard() {
        return false;
    }
}
/** @hidden */
class MultiCaptureSegment {
    constructor(value) {
        this.value = value;
        this.name = "multi-capture";
        this.trimmed = trimParam(value);
    }
    isSingleSegmentWildcard() {
        return false;
    }
    isMultiSegmentWildcard() {
        return true;
    }
}
/**
 * Implements Eventarc's path pattern from the spec https://cloud.google.com/eventarc/docs/path-patterns
 * @internal
 */
class PathPattern {
    /** @throws on validation error */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static compile(rawPath) {
        return undefined;
    }
    constructor(raw) {
        this.raw = raw;
        this.segments = [];
        this.initPathSegments(raw);
    }
    getValue() {
        return this.raw;
    }
    // If false, we don't need to use pathPattern as our eventarc match type.
    hasWildcards() {
        return this.segments.some((segment) => segment.isSingleSegmentWildcard() || segment.isMultiSegmentWildcard());
    }
    hasCaptures() {
        return this.segments.some((segment) => segment.name === "single-capture" || segment.name === "multi-capture");
    }
    extractMatches(path) {
        const matches = {};
        if (!this.hasCaptures()) {
            return matches;
        }
        const pathSegments = (0, path_1.pathParts)(path);
        let pathNdx = 0;
        for (let segmentNdx = 0; segmentNdx < this.segments.length && pathNdx < pathSegments.length; segmentNdx++) {
            const segment = this.segments[segmentNdx];
            const remainingSegments = this.segments.length - 1 - segmentNdx;
            const nextPathNdx = pathSegments.length - remainingSegments;
            if (segment.name === "single-capture") {
                matches[segment.trimmed] = pathSegments[pathNdx];
            }
            else if (segment.name === "multi-capture") {
                matches[segment.trimmed] = pathSegments.slice(pathNdx, nextPathNdx).join("/");
            }
            pathNdx = segment.isMultiSegmentWildcard() ? nextPathNdx : pathNdx + 1;
        }
        return matches;
    }
    initPathSegments(raw) {
        const parts = (0, path_1.pathParts)(raw);
        for (const part of parts) {
            let segment;
            const capture = part.match(WILDCARD_CAPTURE_REGEX);
            if (capture && capture.length === 1) {
                segment = part.includes("**")
                    ? new MultiCaptureSegment(part)
                    : new SingleCaptureSegment(part);
            }
            else {
                segment = new Segment(part);
            }
            this.segments.push(segment);
        }
    }
}
exports.PathPattern = PathPattern;
