"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2023 Firebase
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
exports.createBeforeSnapshotFromJson = exports.createSnapshotFromJson = exports.createBeforeSnapshotFromProtobuf = exports.createSnapshotFromProtobuf = void 0;
const firestore = require("firebase-admin/firestore");
const logger = require("../../logger");
const app_1 = require("../../common/app");
const compiledFirestore_1 = require("../../../protos/compiledFirestore");
const encoder_1 = require("../../common/utilities/encoder");
/** static-complied protobufs */
const DocumentEventData = compiledFirestore_1.google.events.cloud.firestore.v1.DocumentEventData;
let firestoreInstance;
/** @hidden */
function _getValueProto(data, resource, valueFieldName) {
    const value = data === null || data === void 0 ? void 0 : data[valueFieldName];
    if (typeof value === "undefined" ||
        value === null ||
        (typeof value === "object" && !Object.keys(value).length)) {
        // Firestore#snapshot_ takes resource string instead of proto for a non-existent snapshot
        return resource;
    }
    const proto = {
        fields: (value === null || value === void 0 ? void 0 : value.fields) || {},
        createTime: (0, encoder_1.dateToTimestampProto)(value === null || value === void 0 ? void 0 : value.createTime),
        updateTime: (0, encoder_1.dateToTimestampProto)(value === null || value === void 0 ? void 0 : value.updateTime),
        name: (value === null || value === void 0 ? void 0 : value.name) || resource,
    };
    return proto;
}
/** @internal */
function createSnapshotFromProtobuf(data, path, databaseId) {
    if (!firestoreInstance) {
        firestoreInstance = firestore.getFirestore((0, app_1.getApp)(), databaseId);
    }
    try {
        const dataBuffer = Buffer.from(data);
        const firestoreDecoded = DocumentEventData.decode(dataBuffer);
        return firestoreInstance.snapshot_(firestoreDecoded.value || path, null, "protobufJS");
    }
    catch (err) {
        logger.error("Failed to decode protobuf and create a snapshot.");
        throw err;
    }
}
exports.createSnapshotFromProtobuf = createSnapshotFromProtobuf;
/** @internal */
function createBeforeSnapshotFromProtobuf(data, path, databaseId) {
    if (!firestoreInstance) {
        firestoreInstance = firestore.getFirestore((0, app_1.getApp)(), databaseId);
    }
    try {
        const dataBuffer = Buffer.from(data);
        const firestoreDecoded = DocumentEventData.decode(dataBuffer);
        return firestoreInstance.snapshot_(firestoreDecoded.oldValue || path, null, "protobufJS");
    }
    catch (err) {
        logger.error("Failed to decode protobuf and create a before snapshot.");
        throw err;
    }
}
exports.createBeforeSnapshotFromProtobuf = createBeforeSnapshotFromProtobuf;
/** @internal */
function createSnapshotFromJson(data, source, createTime, updateTime, databaseId) {
    if (!firestoreInstance) {
        firestoreInstance = databaseId
            ? firestore.getFirestore((0, app_1.getApp)(), databaseId)
            : firestore.getFirestore((0, app_1.getApp)());
    }
    const valueProto = _getValueProto(data, source, "value");
    let timeString = createTime || updateTime;
    if (!timeString) {
        logger.warn("Snapshot has no readTime. Using now()");
        timeString = new Date().toISOString();
    }
    const readTime = (0, encoder_1.dateToTimestampProto)(timeString);
    return firestoreInstance.snapshot_(valueProto, readTime, "json");
}
exports.createSnapshotFromJson = createSnapshotFromJson;
/** @internal */
function createBeforeSnapshotFromJson(data, source, createTime, updateTime, databaseId) {
    if (!firestoreInstance) {
        firestoreInstance = databaseId
            ? firestore.getFirestore((0, app_1.getApp)(), databaseId)
            : firestore.getFirestore((0, app_1.getApp)());
    }
    const oldValueProto = _getValueProto(data, source, "oldValue");
    const oldReadTime = (0, encoder_1.dateToTimestampProto)(createTime || updateTime);
    return firestoreInstance.snapshot_(oldValueProto, oldReadTime, "json");
}
exports.createBeforeSnapshotFromJson = createBeforeSnapshotFromJson;
