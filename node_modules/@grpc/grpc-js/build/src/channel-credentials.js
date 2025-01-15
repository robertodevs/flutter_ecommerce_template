"use strict";
/*
 * Copyright 2019 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCertificateProviderChannelCredentials = exports.ChannelCredentials = void 0;
const tls_1 = require("tls");
const call_credentials_1 = require("./call-credentials");
const tls_helpers_1 = require("./tls-helpers");
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function verifyIsBufferOrNull(obj, friendlyName) {
    if (obj && !(obj instanceof Buffer)) {
        throw new TypeError(`${friendlyName}, if provided, must be a Buffer.`);
    }
}
/**
 * A class that contains credentials for communicating over a channel, as well
 * as a set of per-call credentials, which are applied to every method call made
 * over a channel initialized with an instance of this class.
 */
class ChannelCredentials {
    constructor(callCredentials) {
        this.callCredentials = callCredentials || call_credentials_1.CallCredentials.createEmpty();
    }
    /**
     * Gets the set of per-call credentials associated with this instance.
     */
    _getCallCredentials() {
        return this.callCredentials;
    }
    _ref() {
        // Do nothing by default
    }
    _unref() {
        // Do nothing by default
    }
    /**
     * Return a new ChannelCredentials instance with a given set of credentials.
     * The resulting instance can be used to construct a Channel that communicates
     * over TLS.
     * @param rootCerts The root certificate data.
     * @param privateKey The client certificate private key, if available.
     * @param certChain The client certificate key chain, if available.
     * @param verifyOptions Additional options to modify certificate verification
     */
    static createSsl(rootCerts, privateKey, certChain, verifyOptions) {
        var _a;
        verifyIsBufferOrNull(rootCerts, 'Root certificate');
        verifyIsBufferOrNull(privateKey, 'Private key');
        verifyIsBufferOrNull(certChain, 'Certificate chain');
        if (privateKey && !certChain) {
            throw new Error('Private key must be given with accompanying certificate chain');
        }
        if (!privateKey && certChain) {
            throw new Error('Certificate chain must be given with accompanying private key');
        }
        const secureContext = (0, tls_1.createSecureContext)({
            ca: (_a = rootCerts !== null && rootCerts !== void 0 ? rootCerts : (0, tls_helpers_1.getDefaultRootsData)()) !== null && _a !== void 0 ? _a : undefined,
            key: privateKey !== null && privateKey !== void 0 ? privateKey : undefined,
            cert: certChain !== null && certChain !== void 0 ? certChain : undefined,
            ciphers: tls_helpers_1.CIPHER_SUITES,
        });
        return new SecureChannelCredentialsImpl(secureContext, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : {});
    }
    /**
     * Return a new ChannelCredentials instance with credentials created using
     * the provided secureContext. The resulting instances can be used to
     * construct a Channel that communicates over TLS. gRPC will not override
     * anything in the provided secureContext, so the environment variables
     * GRPC_SSL_CIPHER_SUITES and GRPC_DEFAULT_SSL_ROOTS_FILE_PATH will
     * not be applied.
     * @param secureContext The return value of tls.createSecureContext()
     * @param verifyOptions Additional options to modify certificate verification
     */
    static createFromSecureContext(secureContext, verifyOptions) {
        return new SecureChannelCredentialsImpl(secureContext, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : {});
    }
    /**
     * Return a new ChannelCredentials instance with no credentials.
     */
    static createInsecure() {
        return new InsecureChannelCredentialsImpl();
    }
}
exports.ChannelCredentials = ChannelCredentials;
class InsecureChannelCredentialsImpl extends ChannelCredentials {
    constructor() {
        super();
    }
    compose(callCredentials) {
        throw new Error('Cannot compose insecure credentials');
    }
    _getConnectionOptions() {
        return {};
    }
    _isSecure() {
        return false;
    }
    _equals(other) {
        return other instanceof InsecureChannelCredentialsImpl;
    }
}
class SecureChannelCredentialsImpl extends ChannelCredentials {
    constructor(secureContext, verifyOptions) {
        super();
        this.secureContext = secureContext;
        this.verifyOptions = verifyOptions;
        this.connectionOptions = {
            secureContext,
        };
        // Node asserts that this option is a function, so we cannot pass undefined
        if (verifyOptions === null || verifyOptions === void 0 ? void 0 : verifyOptions.checkServerIdentity) {
            this.connectionOptions.checkServerIdentity =
                verifyOptions.checkServerIdentity;
        }
        if ((verifyOptions === null || verifyOptions === void 0 ? void 0 : verifyOptions.rejectUnauthorized) !== undefined) {
            this.connectionOptions.rejectUnauthorized =
                verifyOptions.rejectUnauthorized;
        }
    }
    compose(callCredentials) {
        const combinedCallCredentials = this.callCredentials.compose(callCredentials);
        return new ComposedChannelCredentialsImpl(this, combinedCallCredentials);
    }
    _getConnectionOptions() {
        // Copy to prevent callers from mutating this.connectionOptions
        return Object.assign({}, this.connectionOptions);
    }
    _isSecure() {
        return true;
    }
    _equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof SecureChannelCredentialsImpl) {
            return (this.secureContext === other.secureContext &&
                this.verifyOptions.checkServerIdentity ===
                    other.verifyOptions.checkServerIdentity);
        }
        else {
            return false;
        }
    }
}
class CertificateProviderChannelCredentialsImpl extends ChannelCredentials {
    constructor(caCertificateProvider, identityCertificateProvider, verifyOptions) {
        super();
        this.caCertificateProvider = caCertificateProvider;
        this.identityCertificateProvider = identityCertificateProvider;
        this.verifyOptions = verifyOptions;
        this.refcount = 0;
        this.latestCaUpdate = null;
        this.latestIdentityUpdate = null;
        this.caCertificateUpdateListener = this.handleCaCertificateUpdate.bind(this);
        this.identityCertificateUpdateListener = this.handleIdentityCertitificateUpdate.bind(this);
    }
    compose(callCredentials) {
        const combinedCallCredentials = this.callCredentials.compose(callCredentials);
        return new ComposedChannelCredentialsImpl(this, combinedCallCredentials);
    }
    _getConnectionOptions() {
        var _a, _b, _c;
        if (this.latestCaUpdate === null) {
            return null;
        }
        if (this.identityCertificateProvider !== null && this.latestIdentityUpdate === null) {
            return null;
        }
        const secureContext = (0, tls_1.createSecureContext)({
            ca: this.latestCaUpdate.caCertificate,
            key: (_a = this.latestIdentityUpdate) === null || _a === void 0 ? void 0 : _a.privateKey,
            cert: (_b = this.latestIdentityUpdate) === null || _b === void 0 ? void 0 : _b.certificate,
            ciphers: tls_helpers_1.CIPHER_SUITES
        });
        const options = {
            secureContext: secureContext
        };
        if ((_c = this.verifyOptions) === null || _c === void 0 ? void 0 : _c.checkServerIdentity) {
            options.checkServerIdentity = this.verifyOptions.checkServerIdentity;
        }
        return options;
    }
    _isSecure() {
        return true;
    }
    _equals(other) {
        var _a, _b;
        if (this === other) {
            return true;
        }
        if (other instanceof CertificateProviderChannelCredentialsImpl) {
            return this.caCertificateProvider === other.caCertificateProvider &&
                this.identityCertificateProvider === other.identityCertificateProvider &&
                ((_a = this.verifyOptions) === null || _a === void 0 ? void 0 : _a.checkServerIdentity) === ((_b = other.verifyOptions) === null || _b === void 0 ? void 0 : _b.checkServerIdentity);
        }
        else {
            return false;
        }
    }
    _ref() {
        var _a;
        if (this.refcount === 0) {
            this.caCertificateProvider.addCaCertificateListener(this.caCertificateUpdateListener);
            (_a = this.identityCertificateProvider) === null || _a === void 0 ? void 0 : _a.addIdentityCertificateListener(this.identityCertificateUpdateListener);
        }
        this.refcount += 1;
    }
    _unref() {
        var _a;
        this.refcount -= 1;
        if (this.refcount === 0) {
            this.caCertificateProvider.removeCaCertificateListener(this.caCertificateUpdateListener);
            (_a = this.identityCertificateProvider) === null || _a === void 0 ? void 0 : _a.removeIdentityCertificateListener(this.identityCertificateUpdateListener);
        }
    }
    handleCaCertificateUpdate(update) {
        this.latestCaUpdate = update;
    }
    handleIdentityCertitificateUpdate(update) {
        this.latestIdentityUpdate = update;
    }
}
function createCertificateProviderChannelCredentials(caCertificateProvider, identityCertificateProvider, verifyOptions) {
    return new CertificateProviderChannelCredentialsImpl(caCertificateProvider, identityCertificateProvider, verifyOptions !== null && verifyOptions !== void 0 ? verifyOptions : null);
}
exports.createCertificateProviderChannelCredentials = createCertificateProviderChannelCredentials;
class ComposedChannelCredentialsImpl extends ChannelCredentials {
    constructor(channelCredentials, callCreds) {
        super(callCreds);
        this.channelCredentials = channelCredentials;
        if (!channelCredentials._isSecure()) {
            throw new Error('Cannot compose insecure credentials');
        }
    }
    compose(callCredentials) {
        const combinedCallCredentials = this.callCredentials.compose(callCredentials);
        return new ComposedChannelCredentialsImpl(this.channelCredentials, combinedCallCredentials);
    }
    _getConnectionOptions() {
        return this.channelCredentials._getConnectionOptions();
    }
    _isSecure() {
        return true;
    }
    _equals(other) {
        if (this === other) {
            return true;
        }
        if (other instanceof ComposedChannelCredentialsImpl) {
            return (this.channelCredentials._equals(other.channelCredentials) &&
                this.callCredentials._equals(other.callCredentials));
        }
        else {
            return false;
        }
    }
}
//# sourceMappingURL=channel-credentials.js.map