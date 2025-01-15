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
exports.wrapHandler = exports.getUpdateMask = exports.validateAuthResponse = exports.parseAuthEventContext = exports.generateResponsePayload = exports.parseAuthUserRecord = exports.parseMultiFactor = exports.parseDate = exports.parseProviderData = exports.parseMetadata = exports.isValidRequest = exports.userRecordConstructor = exports.UserRecordMetadata = exports.HttpsError = void 0;
const auth = require("firebase-admin/auth");
const logger = require("../../logger");
const app_1 = require("../app");
const debug_1 = require("../debug");
const https_1 = require("./https");
Object.defineProperty(exports, "HttpsError", { enumerable: true, get: function () { return https_1.HttpsError; } });
const DISALLOWED_CUSTOM_CLAIMS = [
    "acr",
    "amr",
    "at_hash",
    "aud",
    "auth_time",
    "azp",
    "cnf",
    "c_hash",
    "exp",
    "iat",
    "iss",
    "jti",
    "nbf",
    "nonce",
    "firebase",
];
const CLAIMS_MAX_PAYLOAD_SIZE = 1000;
const EVENT_MAPPING = {
    beforeCreate: "providers/cloud.auth/eventTypes/user.beforeCreate",
    beforeSignIn: "providers/cloud.auth/eventTypes/user.beforeSignIn",
    beforeSendEmail: "providers/cloud.auth/eventTypes/user.beforeSendEmail",
    beforeSendSms: "providers/cloud.auth/eventTypes/user.beforeSendSms",
};
/**
 * Helper class to create the user metadata in a `UserRecord` object.
 */
class UserRecordMetadata {
    constructor(creationTime, lastSignInTime) {
        this.creationTime = creationTime;
        this.lastSignInTime = lastSignInTime;
    }
    /** Returns a plain JavaScript object with the properties of UserRecordMetadata. */
    toJSON() {
        return {
            creationTime: this.creationTime,
            lastSignInTime: this.lastSignInTime,
        };
    }
}
exports.UserRecordMetadata = UserRecordMetadata;
/**
 * Helper function that creates a `UserRecord` class from data sent over the wire.
 * @param wireData data sent over the wire
 * @returns an instance of `UserRecord` with correct toJSON functions
 */
function userRecordConstructor(wireData) {
    // Falsey values from the wire format proto get lost when converted to JSON, this adds them back.
    const falseyValues = {
        email: null,
        emailVerified: false,
        displayName: null,
        photoURL: null,
        phoneNumber: null,
        disabled: false,
        providerData: [],
        customClaims: {},
        passwordSalt: null,
        passwordHash: null,
        tokensValidAfterTime: null,
    };
    const record = { ...falseyValues, ...wireData };
    const meta = record.metadata;
    if (meta) {
        record.metadata = new UserRecordMetadata(meta.createdAt || meta.creationTime, meta.lastSignedInAt || meta.lastSignInTime);
    }
    else {
        record.metadata = new UserRecordMetadata(null, null);
    }
    record.toJSON = () => {
        const { uid, email, emailVerified, displayName, photoURL, phoneNumber, disabled, passwordHash, passwordSalt, tokensValidAfterTime, } = record;
        const json = {
            uid,
            email,
            emailVerified,
            displayName,
            photoURL,
            phoneNumber,
            disabled,
            passwordHash,
            passwordSalt,
            tokensValidAfterTime,
        };
        json.metadata = record.metadata.toJSON();
        json.customClaims = JSON.parse(JSON.stringify(record.customClaims));
        json.providerData = record.providerData.map((entry) => {
            const newEntry = { ...entry };
            newEntry.toJSON = () => entry;
            return newEntry;
        });
        return json;
    };
    return record;
}
exports.userRecordConstructor = userRecordConstructor;
/**
 * Checks for a valid identity platform web request, otherwise throws an HttpsError.
 * @internal
 */
function isValidRequest(req) {
    var _a, _b;
    if (req.method !== "POST") {
        logger.warn(`Request has invalid method "${req.method}".`);
        return false;
    }
    const contentType = (req.header("Content-Type") || "").toLowerCase();
    if (!contentType.includes("application/json")) {
        logger.warn("Request has invalid header Content-Type.");
        return false;
    }
    if (!((_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.jwt)) {
        logger.warn("Request has an invalid body.");
        return false;
    }
    return true;
}
exports.isValidRequest = isValidRequest;
/**
 * Decode, but not verify, an Auth Blocking token.
 *
 * Do not use in production. Token should always be verified using the Admin SDK.
 *
 * This is exposed only for testing.
 */
function unsafeDecodeAuthBlockingToken(token) {
    const decoded = (0, https_1.unsafeDecodeToken)(token);
    decoded.uid = decoded.sub;
    return decoded;
}
/**
 * Helper function to parse the decoded metadata object into a `UserMetaData` object
 * @internal
 */
function parseMetadata(metadata) {
    const creationTime = (metadata === null || metadata === void 0 ? void 0 : metadata.creation_time)
        ? new Date(metadata.creation_time).toUTCString()
        : null;
    const lastSignInTime = (metadata === null || metadata === void 0 ? void 0 : metadata.last_sign_in_time)
        ? new Date(metadata.last_sign_in_time).toUTCString()
        : null;
    return {
        creationTime,
        lastSignInTime,
    };
}
exports.parseMetadata = parseMetadata;
/**
 * Helper function to parse the decoded user info array into an `AuthUserInfo` array.
 * @internal
 */
function parseProviderData(providerData) {
    const providers = [];
    for (const provider of providerData) {
        providers.push({
            uid: provider.uid,
            displayName: provider.display_name,
            email: provider.email,
            photoURL: provider.photo_url,
            providerId: provider.provider_id,
            phoneNumber: provider.phone_number,
        });
    }
    return providers;
}
exports.parseProviderData = parseProviderData;
/**
 * Helper function to parse the date into a UTC string.
 * @internal
 */
function parseDate(tokensValidAfterTime) {
    if (!tokensValidAfterTime) {
        return null;
    }
    tokensValidAfterTime = tokensValidAfterTime * 1000;
    try {
        const date = new Date(tokensValidAfterTime);
        if (!isNaN(date.getTime())) {
            return date.toUTCString();
        }
    }
    catch {
        // ignore error
    }
    return null;
}
exports.parseDate = parseDate;
/**
 * Helper function to parse the decoded enrolled factors into a valid MultiFactorSettings
 * @internal
 */
function parseMultiFactor(multiFactor) {
    if (!multiFactor) {
        return null;
    }
    const parsedEnrolledFactors = [];
    for (const factor of multiFactor.enrolled_factors || []) {
        if (!factor.uid) {
            throw new https_1.HttpsError("internal", "INTERNAL ASSERT FAILED: Invalid multi-factor info response");
        }
        const enrollmentTime = factor.enrollment_time
            ? new Date(factor.enrollment_time).toUTCString()
            : null;
        parsedEnrolledFactors.push({
            uid: factor.uid,
            factorId: factor.phone_number ? factor.factor_id || "phone" : factor.factor_id,
            displayName: factor.display_name,
            enrollmentTime,
            phoneNumber: factor.phone_number,
        });
    }
    if (parsedEnrolledFactors.length > 0) {
        return {
            enrolledFactors: parsedEnrolledFactors,
        };
    }
    return null;
}
exports.parseMultiFactor = parseMultiFactor;
/**
 * Parses the decoded user record into a valid UserRecord for use in the handler
 * @internal
 */
function parseAuthUserRecord(decodedJWTUserRecord) {
    if (!decodedJWTUserRecord.uid) {
        throw new https_1.HttpsError("internal", "INTERNAL ASSERT FAILED: Invalid user response");
    }
    const disabled = decodedJWTUserRecord.disabled || false;
    const metadata = parseMetadata(decodedJWTUserRecord.metadata);
    const providerData = parseProviderData(decodedJWTUserRecord.provider_data);
    const tokensValidAfterTime = parseDate(decodedJWTUserRecord.tokens_valid_after_time);
    const multiFactor = parseMultiFactor(decodedJWTUserRecord.multi_factor);
    return {
        uid: decodedJWTUserRecord.uid,
        email: decodedJWTUserRecord.email,
        emailVerified: decodedJWTUserRecord.email_verified,
        displayName: decodedJWTUserRecord.display_name,
        photoURL: decodedJWTUserRecord.photo_url,
        phoneNumber: decodedJWTUserRecord.phone_number,
        disabled,
        metadata,
        providerData,
        passwordHash: decodedJWTUserRecord.password_hash,
        passwordSalt: decodedJWTUserRecord.password_salt,
        customClaims: decodedJWTUserRecord.custom_claims,
        tenantId: decodedJWTUserRecord.tenant_id,
        tokensValidAfterTime,
        multiFactor,
    };
}
exports.parseAuthUserRecord = parseAuthUserRecord;
/** Helper to get the `AdditionalUserInfo` from the decoded JWT */
function parseAdditionalUserInfo(decodedJWT) {
    let profile;
    let username;
    if (decodedJWT.raw_user_info) {
        try {
            profile = JSON.parse(decodedJWT.raw_user_info);
        }
        catch (err) {
            logger.debug(`Parse Error: ${err.message}`);
        }
    }
    if (profile) {
        if (decodedJWT.sign_in_method === "github.com") {
            username = profile.login;
        }
        if (decodedJWT.sign_in_method === "twitter.com") {
            username = profile.screen_name;
        }
    }
    return {
        providerId: decodedJWT.sign_in_method === "emailLink" ? "password" : decodedJWT.sign_in_method,
        profile,
        username,
        isNewUser: decodedJWT.event_type === "beforeCreate" ? true : false,
        recaptchaScore: decodedJWT.recaptcha_score,
        email: decodedJWT.email,
        phoneNumber: decodedJWT.phone_number,
    };
}
/**
 * Helper to generate a response from the blocking function to the Firebase Auth backend.
 * @internal
 */
function generateResponsePayload(authResponse) {
    if (!authResponse) {
        return {};
    }
    const { recaptchaActionOverride, ...formattedAuthResponse } = authResponse;
    const result = {};
    const updateMask = getUpdateMask(formattedAuthResponse);
    if (updateMask.length !== 0) {
        result.userRecord = {
            ...formattedAuthResponse,
            updateMask,
        };
    }
    if (recaptchaActionOverride !== undefined) {
        result.recaptchaActionOverride = recaptchaActionOverride;
    }
    return result;
}
exports.generateResponsePayload = generateResponsePayload;
/** Helper to get the Credential from the decoded JWT */
function parseAuthCredential(decodedJWT, time) {
    if (!decodedJWT.sign_in_attributes &&
        !decodedJWT.oauth_id_token &&
        !decodedJWT.oauth_access_token &&
        !decodedJWT.oauth_refresh_token) {
        return null;
    }
    return {
        claims: decodedJWT.sign_in_attributes,
        idToken: decodedJWT.oauth_id_token,
        accessToken: decodedJWT.oauth_access_token,
        refreshToken: decodedJWT.oauth_refresh_token,
        expirationTime: decodedJWT.oauth_expires_in
            ? new Date(time + decodedJWT.oauth_expires_in * 1000).toUTCString()
            : undefined,
        secret: decodedJWT.oauth_token_secret,
        providerId: decodedJWT.sign_in_method === "emailLink" ? "password" : decodedJWT.sign_in_method,
        signInMethod: decodedJWT.sign_in_method,
    };
}
/**
 * Parses the decoded jwt into a valid AuthEventContext for use in the handler
 * @internal
 */
function parseAuthEventContext(decodedJWT, projectId, time = new Date().getTime()) {
    const eventType = (EVENT_MAPPING[decodedJWT.event_type] || decodedJWT.event_type) +
        (decodedJWT.sign_in_method ? `:${decodedJWT.sign_in_method}` : "");
    return {
        locale: decodedJWT.locale,
        ipAddress: decodedJWT.ip_address,
        userAgent: decodedJWT.user_agent,
        eventId: decodedJWT.event_id,
        eventType,
        authType: decodedJWT.user_record ? "USER" : "UNAUTHENTICATED",
        resource: {
            // TODO(colerogers): figure out the correct service
            service: "identitytoolkit.googleapis.com",
            name: decodedJWT.tenant_id
                ? `projects/${projectId}/tenants/${decodedJWT.tenant_id}`
                : `projects/${projectId}`,
        },
        timestamp: new Date(decodedJWT.iat * 1000).toUTCString(),
        additionalUserInfo: parseAdditionalUserInfo(decodedJWT),
        credential: parseAuthCredential(decodedJWT, time),
        emailType: decodedJWT.email_type,
        smsType: decodedJWT.sms_type,
        params: {},
    };
}
exports.parseAuthEventContext = parseAuthEventContext;
/**
 * Checks the handler response for invalid customClaims & sessionClaims objects
 * @internal
 */
function validateAuthResponse(eventType, authRequest) {
    if (!authRequest) {
        authRequest = {};
    }
    if (authRequest.customClaims) {
        const invalidClaims = DISALLOWED_CUSTOM_CLAIMS.filter((claim) => authRequest.customClaims.hasOwnProperty(claim));
        if (invalidClaims.length > 0) {
            throw new https_1.HttpsError("invalid-argument", `The customClaims claims "${invalidClaims.join(",")}" are reserved and cannot be specified.`);
        }
        if (JSON.stringify(authRequest.customClaims).length > CLAIMS_MAX_PAYLOAD_SIZE) {
            throw new https_1.HttpsError("invalid-argument", `The customClaims payload should not exceed ${CLAIMS_MAX_PAYLOAD_SIZE} characters.`);
        }
    }
    if (eventType === "beforeSignIn" && authRequest.sessionClaims) {
        const invalidClaims = DISALLOWED_CUSTOM_CLAIMS.filter((claim) => authRequest.sessionClaims.hasOwnProperty(claim));
        if (invalidClaims.length > 0) {
            throw new https_1.HttpsError("invalid-argument", `The sessionClaims claims "${invalidClaims.join(",")}" are reserved and cannot be specified.`);
        }
        if (JSON.stringify(authRequest.sessionClaims).length >
            CLAIMS_MAX_PAYLOAD_SIZE) {
            throw new https_1.HttpsError("invalid-argument", `The sessionClaims payload should not exceed ${CLAIMS_MAX_PAYLOAD_SIZE} characters.`);
        }
        const combinedClaims = {
            ...authRequest.customClaims,
            ...authRequest.sessionClaims,
        };
        if (JSON.stringify(combinedClaims).length > CLAIMS_MAX_PAYLOAD_SIZE) {
            throw new https_1.HttpsError("invalid-argument", `The customClaims and sessionClaims payloads should not exceed ${CLAIMS_MAX_PAYLOAD_SIZE} characters combined.`);
        }
    }
}
exports.validateAuthResponse = validateAuthResponse;
/**
 * Helper function to generate the update mask for the identity platform changed values
 * @internal
 */
function getUpdateMask(authResponse) {
    if (!authResponse) {
        return "";
    }
    const updateMask = [];
    for (const key in authResponse) {
        if (authResponse.hasOwnProperty(key) && typeof authResponse[key] !== "undefined") {
            updateMask.push(key);
        }
    }
    return updateMask.join(",");
}
exports.getUpdateMask = getUpdateMask;
/** @internal */
function wrapHandler(eventType, handler) {
    return async (req, res) => {
        try {
            const projectId = process.env.GCLOUD_PROJECT;
            if (!isValidRequest(req)) {
                logger.error("Invalid request, unable to process");
                throw new https_1.HttpsError("invalid-argument", "Bad Request");
            }
            if (!auth.getAuth((0, app_1.getApp)())._verifyAuthBlockingToken) {
                throw new Error("Cannot validate Auth Blocking token. Please update Firebase Admin SDK to >= v10.1.0");
            }
            const decodedPayload = (0, debug_1.isDebugFeatureEnabled)("skipTokenVerification")
                ? unsafeDecodeAuthBlockingToken(req.body.data.jwt)
                : handler.platform === "gcfv1"
                    ? await auth.getAuth((0, app_1.getApp)())._verifyAuthBlockingToken(req.body.data.jwt)
                    : await auth.getAuth((0, app_1.getApp)())._verifyAuthBlockingToken(req.body.data.jwt, "run.app");
            let authUserRecord;
            if (decodedPayload.event_type === "beforeCreate" ||
                decodedPayload.event_type === "beforeSignIn") {
                authUserRecord = parseAuthUserRecord(decodedPayload.user_record);
            }
            const authEventContext = parseAuthEventContext(decodedPayload, projectId);
            let authResponse;
            if (handler.platform === "gcfv1") {
                authResponse = authUserRecord
                    ? (await handler(authUserRecord, authEventContext)) || undefined
                    : (await handler(authEventContext)) || undefined;
            }
            else {
                authResponse =
                    (await handler({
                        ...authEventContext,
                        data: authUserRecord,
                    })) || undefined;
            }
            validateAuthResponse(eventType, authResponse);
            const result = generateResponsePayload(authResponse);
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(result));
        }
        catch (err) {
            let httpErr = err;
            if (!(httpErr instanceof https_1.HttpsError)) {
                // This doesn't count as an 'explicit' error.
                logger.error("Unhandled error", err);
                httpErr = new https_1.HttpsError("internal", "An unexpected error occurred.");
            }
            const { status } = httpErr.httpErrorCode;
            const body = { error: httpErr.toJSON() };
            res.setHeader("Content-Type", "application/json");
            res.status(status).send(body);
        }
    };
}
exports.wrapHandler = wrapHandler;
