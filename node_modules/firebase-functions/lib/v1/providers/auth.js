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
exports.UserBuilder = exports._userWithOptions = exports.user = exports.service = exports.provider = exports.HttpsError = exports.userRecordConstructor = exports.UserRecordMetadata = void 0;
const identity_1 = require("../../common/providers/identity");
Object.defineProperty(exports, "HttpsError", { enumerable: true, get: function () { return identity_1.HttpsError; } });
Object.defineProperty(exports, "userRecordConstructor", { enumerable: true, get: function () { return identity_1.userRecordConstructor; } });
Object.defineProperty(exports, "UserRecordMetadata", { enumerable: true, get: function () { return identity_1.UserRecordMetadata; } });
const cloud_functions_1 = require("../cloud-functions");
const manifest_1 = require("../../runtime/manifest");
/** @internal */
exports.provider = "google.firebase.auth";
/** @internal */
exports.service = "firebaseauth.googleapis.com";
/**
 * Handles events related to Firebase Auth users events.
 *
 * @param userOptions - Resource level options
 * @returns UserBuilder - Builder used to create functions for Firebase Auth user lifecycle events
 *
 * @public
 */
function user(userOptions) {
    return _userWithOptions({}, userOptions || {});
}
exports.user = user;
/** @internal */
function _userWithOptions(options, userOptions) {
    return new UserBuilder(() => {
        if (!process.env.GCLOUD_PROJECT) {
            throw new Error("process.env.GCLOUD_PROJECT is not set.");
        }
        return "projects/" + process.env.GCLOUD_PROJECT;
    }, options, userOptions);
}
exports._userWithOptions = _userWithOptions;
/**
 * Builder used to create functions for Firebase Auth user lifecycle events.
 * @public
 */
class UserBuilder {
    static dataConstructor(raw) {
        return (0, identity_1.userRecordConstructor)(raw.data);
    }
    /* @internal */
    constructor(triggerResource, options, userOptions) {
        this.triggerResource = triggerResource;
        this.options = options;
        this.userOptions = userOptions;
    }
    /**
     * Responds to the creation of a Firebase Auth user.
     *
     * @param handler Event handler that responds to the creation of a Firebase Auth user.
     *
     * @public
     */
    onCreate(handler) {
        return this.onOperation(handler, "user.create");
    }
    /**
     * Responds to the deletion of a Firebase Auth user.
     *
     * @param handler Event handler that responds to the deletion of a Firebase Auth user.
     *
     * @public
     */
    onDelete(handler) {
        return this.onOperation(handler, "user.delete");
    }
    /**
     * Blocks request to create a Firebase Auth user.
     *
     * @param handler Event handler that blocks creation of a Firebase Auth user.
     *
     * @public
     */
    beforeCreate(handler) {
        return this.beforeOperation(handler, "beforeCreate");
    }
    /**
     * Blocks request to sign-in a Firebase Auth user.
     *
     * @param handler Event handler that blocks sign-in of a Firebase Auth user.
     *
     * @public
     */
    beforeSignIn(handler) {
        return this.beforeOperation(handler, "beforeSignIn");
    }
    beforeEmail(handler) {
        return this.beforeOperation(handler, "beforeSendEmail");
    }
    beforeSms(handler) {
        return this.beforeOperation(handler, "beforeSendSms");
    }
    onOperation(handler, eventType) {
        return (0, cloud_functions_1.makeCloudFunction)({
            handler,
            provider: exports.provider,
            eventType,
            service: exports.service,
            triggerResource: this.triggerResource,
            // eslint-disable-next-line @typescript-eslint/unbound-method
            dataConstructor: UserBuilder.dataConstructor,
            legacyEventType: `providers/firebase.auth/eventTypes/${eventType}`,
            options: this.options,
        });
    }
    beforeOperation(handler, eventType) {
        var _a, _b, _c, _d, _e, _f;
        const accessToken = ((_b = (_a = this.userOptions) === null || _a === void 0 ? void 0 : _a.blockingOptions) === null || _b === void 0 ? void 0 : _b.accessToken) || false;
        const idToken = ((_d = (_c = this.userOptions) === null || _c === void 0 ? void 0 : _c.blockingOptions) === null || _d === void 0 ? void 0 : _d.idToken) || false;
        const refreshToken = ((_f = (_e = this.userOptions) === null || _e === void 0 ? void 0 : _e.blockingOptions) === null || _f === void 0 ? void 0 : _f.refreshToken) || false;
        const annotatedHandler = Object.assign(handler, { platform: "gcfv1" });
        const func = (0, identity_1.wrapHandler)(eventType, annotatedHandler);
        const legacyEventType = `providers/cloud.auth/eventTypes/user.${eventType}`;
        func.__trigger = {
            labels: {},
            ...(0, cloud_functions_1.optionsToTrigger)(this.options),
            blockingTrigger: {
                eventType: legacyEventType,
                options: {
                    accessToken,
                    idToken,
                    refreshToken,
                },
            },
        };
        func.__endpoint = {
            platform: "gcfv1",
            labels: {},
            ...(0, manifest_1.initV1Endpoint)(this.options),
            ...(0, cloud_functions_1.optionsToEndpoint)(this.options),
            blockingTrigger: {
                eventType: legacyEventType,
                options: {
                    accessToken,
                    idToken,
                    refreshToken,
                },
            },
        };
        func.__requiredAPIs = [
            {
                api: "identitytoolkit.googleapis.com",
                reason: "Needed for auth blocking functions",
            },
        ];
        func.run = handler;
        return func;
    }
}
exports.UserBuilder = UserBuilder;
