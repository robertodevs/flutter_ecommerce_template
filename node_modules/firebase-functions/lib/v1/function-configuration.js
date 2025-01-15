"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAX_NUMBER_USER_LABELS = exports.DEFAULT_FAILURE_POLICY = exports.INGRESS_SETTINGS_OPTIONS = exports.VPC_EGRESS_SETTINGS_OPTIONS = exports.VALID_MEMORY_OPTIONS = exports.MAX_TIMEOUT_SECONDS = exports.MIN_TIMEOUT_SECONDS = exports.SUPPORTED_REGIONS = exports.RESET_VALUE = void 0;
var options_1 = require("../common/options");
Object.defineProperty(exports, "RESET_VALUE", { enumerable: true, get: function () { return options_1.RESET_VALUE; } });
/**
 * List of all regions supported by Cloud Functions.
 */
exports.SUPPORTED_REGIONS = [
    "us-central1",
    "us-east1",
    "us-east4",
    "us-west2",
    "us-west3",
    "us-west4",
    "europe-central2",
    "europe-west1",
    "europe-west2",
    "europe-west3",
    "europe-west6",
    "asia-east1",
    "asia-east2",
    "asia-northeast1",
    "asia-northeast2",
    "asia-northeast3",
    "asia-south1",
    "asia-southeast1",
    "asia-southeast2",
    "northamerica-northeast1",
    "southamerica-east1",
    "australia-southeast1",
];
/**
 * Cloud Functions min timeout value.
 */
exports.MIN_TIMEOUT_SECONDS = 0;
/**
 * Cloud Functions max timeout value.
 */
exports.MAX_TIMEOUT_SECONDS = 540;
/**
 * List of available memory options supported by Cloud Functions.
 */
exports.VALID_MEMORY_OPTIONS = [
    "128MB",
    "256MB",
    "512MB",
    "1GB",
    "2GB",
    "4GB",
    "8GB",
];
/**
 * List of available options for VpcConnectorEgressSettings.
 */
exports.VPC_EGRESS_SETTINGS_OPTIONS = [
    "VPC_CONNECTOR_EGRESS_SETTINGS_UNSPECIFIED",
    "PRIVATE_RANGES_ONLY",
    "ALL_TRAFFIC",
];
/**
 * List of available options for IngressSettings.
 */
exports.INGRESS_SETTINGS_OPTIONS = [
    "INGRESS_SETTINGS_UNSPECIFIED",
    "ALLOW_ALL",
    "ALLOW_INTERNAL_ONLY",
    "ALLOW_INTERNAL_AND_GCLB",
];
exports.DEFAULT_FAILURE_POLICY = {
    retry: {},
};
exports.MAX_NUMBER_USER_LABELS = 58;
