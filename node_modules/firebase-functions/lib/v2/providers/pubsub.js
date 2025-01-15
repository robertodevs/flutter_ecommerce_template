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
exports.onMessagePublished = exports.Message = void 0;
/**
 * Cloud functions to handle events from Google Cloud Pub/Sub.
 * @packageDocumentation
 */
const encoding_1 = require("../../common/encoding");
const manifest_1 = require("../../runtime/manifest");
const trace_1 = require("../trace");
const options = require("../options");
const onInit_1 = require("../../common/onInit");
/**
 * Google Cloud Pub/Sub is a globally distributed message bus that automatically scales as you need it.
 * You can create a function ({@link onMessagePublished}) that handles pub/sub events by using functions.pubsub.
 *
 * This function triggers whenever a new pub/sub message is sent to a specific topic.
 * You must specify the Pub/Sub topic name that you want to trigger your function, and set the event within the
 * onPublish() event handler.
 *
 * PubSub Topic:
 * <ul>
 *   <li>A resource that you can publish messages to and then consume those messages via subscriptions.
 *   <li>An isolated data stream for pub/sub messages.
 *   <li>Messages are published to a topic.
 *   <li>Messages are listened to via a subscription.
 *   <li>Each subscription listens to the messages published to exactly one topic.
 *
 * Subscriptions - Resource that listens to the messages published by exactly one topic.
 *
 * [More info here](https://firebase.google.com/docs/functions/pubsub-events)
 */
/**
 * Interface representing a Google Cloud Pub/Sub message.
 *
 * @param data - Payload of a Pub/Sub message.
 * @typeParam T - Type representing `Message.data`'s JSON format
 */
class Message {
    /**
     * @hidden
     * @alpha
     */
    constructor(data) {
        this.messageId = data.messageId;
        this.data = data.data;
        this.attributes = data.attributes || {};
        this.orderingKey = data.orderingKey || "";
        this.publishTime = data.publishTime || new Date().toISOString();
        this._json = data.json;
    }
    /**
     * The JSON data payload of this message object, if any.
     */
    get json() {
        if (typeof this._json === "undefined") {
            try {
                this._json = JSON.parse(Buffer.from(this.data, "base64").toString("utf8"));
            }
            catch (err) {
                throw new Error(`Unable to parse Pub/Sub message data as JSON: ${err.message}`);
            }
        }
        return this._json;
    }
    /**
     * Returns a JSON-serializable representation of this object.
     *
     * @returns A JSON-serializable representation of this object.
     */
    toJSON() {
        const json = {
            messageId: this.messageId,
            data: this.data,
            publishTime: this.publishTime,
        };
        if (Object.keys(this.attributes).length) {
            json.attributes = this.attributes;
        }
        if (this.orderingKey) {
            json.orderingKey = this.orderingKey;
        }
        return json;
    }
}
exports.Message = Message;
/**
 * Handle a message being published to a Pub/Sub topic.
 * @param topicOrOptions - A string representing the PubSub topic or an option (which contains the topic)
 * @param handler - runs every time a Cloud Pub/Sub message is published
 * @typeParam T - Type representing `Message.data`'s JSON format
 */
function onMessagePublished(topicOrOptions, handler) {
    var _a;
    let topic;
    let opts;
    if (typeof topicOrOptions === "string") {
        topic = topicOrOptions;
        opts = {};
    }
    else {
        topic = topicOrOptions.topic;
        opts = { ...topicOrOptions };
        delete opts.topic;
    }
    const func = (raw) => {
        const messagePublishedData = raw.data;
        messagePublishedData.message = new Message(messagePublishedData.message);
        return (0, trace_1.wrapTraceContext)((0, onInit_1.withInit)(handler))(raw);
    };
    func.run = handler;
    Object.defineProperty(func, "__trigger", {
        get: () => {
            const baseOpts = options.optionsToTriggerAnnotations(options.getGlobalOptions());
            const specificOpts = options.optionsToTriggerAnnotations(opts);
            return {
                platform: "gcfv2",
                ...baseOpts,
                ...specificOpts,
                labels: {
                    ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
                    ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
                },
                eventTrigger: {
                    eventType: "google.cloud.pubsub.topic.v1.messagePublished",
                    resource: `projects/${process.env.GCLOUD_PROJECT}/topics/${topic}`,
                },
            };
        },
    });
    const baseOpts = options.optionsToEndpoint(options.getGlobalOptions());
    const specificOpts = options.optionsToEndpoint(opts);
    const endpoint = {
        ...(0, manifest_1.initV2Endpoint)(options.getGlobalOptions(), opts),
        platform: "gcfv2",
        ...baseOpts,
        ...specificOpts,
        labels: {
            ...baseOpts === null || baseOpts === void 0 ? void 0 : baseOpts.labels,
            ...specificOpts === null || specificOpts === void 0 ? void 0 : specificOpts.labels,
        },
        eventTrigger: {
            eventType: "google.cloud.pubsub.topic.v1.messagePublished",
            eventFilters: { topic },
            retry: (_a = opts.retry) !== null && _a !== void 0 ? _a : false,
        },
    };
    (0, encoding_1.copyIfPresent)(endpoint.eventTrigger, opts, "retry", "retry");
    func.__endpoint = endpoint;
    return func;
}
exports.onMessagePublished = onMessagePublished;
