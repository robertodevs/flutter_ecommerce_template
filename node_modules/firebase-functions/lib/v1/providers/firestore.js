"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2017 Firebase
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
exports.DocumentBuilder = exports.beforeSnapshotConstructor = exports.snapshotConstructor = exports.NamespaceBuilder = exports.DatabaseBuilder = exports._documentWithOptions = exports._namespaceWithOptions = exports._databaseWithOptions = exports.database = exports.namespace = exports.document = exports.defaultDatabase = exports.service = exports.provider = void 0;
const path_1 = require("path");
const change_1 = require("../../common/change");
const firestore_1 = require("../../common/providers/firestore");
const cloud_functions_1 = require("../cloud-functions");
/** @internal */
exports.provider = "google.firestore";
/** @internal */
exports.service = "firestore.googleapis.com";
/** @internal */
exports.defaultDatabase = "(default)";
/**
 * Select the Firestore document to listen to for events.
 * @param path Full database path to listen to. This includes the name of
 * the collection that the document is a part of. For example, if the
 * collection is named "users" and the document is named "Ada", then the
 * path is "/users/Ada".
 */
function document(path) {
    return _documentWithOptions(path, {});
}
exports.document = document;
// Multiple namespaces are not yet supported by Firestore.
function namespace(namespace) {
    return _namespaceWithOptions(namespace, {});
}
exports.namespace = namespace;
// Multiple databases are not yet supported by Firestore.
function database(database) {
    return _databaseWithOptions(database, {});
}
exports.database = database;
/** @internal */
function _databaseWithOptions(database = exports.defaultDatabase, options) {
    return new DatabaseBuilder(database, options);
}
exports._databaseWithOptions = _databaseWithOptions;
/** @internal */
function _namespaceWithOptions(namespace, options) {
    return _databaseWithOptions(exports.defaultDatabase, options).namespace(namespace);
}
exports._namespaceWithOptions = _namespaceWithOptions;
/** @internal */
function _documentWithOptions(path, options) {
    return _databaseWithOptions(exports.defaultDatabase, options).document(path);
}
exports._documentWithOptions = _documentWithOptions;
class DatabaseBuilder {
    constructor(database, options) {
        this.database = database;
        this.options = options;
    }
    namespace(namespace) {
        return new NamespaceBuilder(this.database, this.options, namespace);
    }
    document(path) {
        return new NamespaceBuilder(this.database, this.options).document(path);
    }
}
exports.DatabaseBuilder = DatabaseBuilder;
class NamespaceBuilder {
    constructor(database, options, namespace) {
        this.database = database;
        this.options = options;
        this.namespace = namespace;
    }
    document(path) {
        return new DocumentBuilder(() => {
            if (!process.env.GCLOUD_PROJECT) {
                throw new Error("process.env.GCLOUD_PROJECT is not set.");
            }
            const database = path_1.posix.join("projects", process.env.GCLOUD_PROJECT, "databases", this.database);
            return path_1.posix.join(database, this.namespace ? `documents@${this.namespace}` : "documents", path);
        }, this.options);
    }
}
exports.NamespaceBuilder = NamespaceBuilder;
function snapshotConstructor(event) {
    var _a, _b, _c, _d;
    return (0, firestore_1.createSnapshotFromJson)(event.data, event.context.resource.name, (_b = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.readTime, (_d = (_c = event === null || event === void 0 ? void 0 : event.data) === null || _c === void 0 ? void 0 : _c.value) === null || _d === void 0 ? void 0 : _d.updateTime);
}
exports.snapshotConstructor = snapshotConstructor;
// TODO remove this function when wire format changes to new format
function beforeSnapshotConstructor(event) {
    var _a, _b;
    return (0, firestore_1.createBeforeSnapshotFromJson)(event.data, event.context.resource.name, (_b = (_a = event === null || event === void 0 ? void 0 : event.data) === null || _a === void 0 ? void 0 : _a.oldValue) === null || _b === void 0 ? void 0 : _b.readTime, undefined);
}
exports.beforeSnapshotConstructor = beforeSnapshotConstructor;
function changeConstructor(raw) {
    return change_1.Change.fromObjects(beforeSnapshotConstructor(raw), snapshotConstructor(raw));
}
class DocumentBuilder {
    constructor(triggerResource, options) {
        this.triggerResource = triggerResource;
        this.options = options;
        // TODO what validation do we want to do here?
    }
    /** Respond to all document writes (creates, updates, or deletes). */
    onWrite(handler) {
        return this.onOperation(handler, "document.write", changeConstructor);
    }
    /** Respond only to document updates. */
    onUpdate(handler) {
        return this.onOperation(handler, "document.update", changeConstructor);
    }
    /** Respond only to document creations. */
    onCreate(handler) {
        return this.onOperation(handler, "document.create", snapshotConstructor);
    }
    /** Respond only to document deletions. */
    onDelete(handler) {
        return this.onOperation(handler, "document.delete", beforeSnapshotConstructor);
    }
    onOperation(handler, eventType, dataConstructor) {
        return (0, cloud_functions_1.makeCloudFunction)({
            handler,
            provider: exports.provider,
            eventType,
            service: exports.service,
            triggerResource: this.triggerResource,
            legacyEventType: `providers/cloud.firestore/eventTypes/${eventType}`,
            dataConstructor,
            options: this.options,
        });
    }
}
exports.DocumentBuilder = DocumentBuilder;
