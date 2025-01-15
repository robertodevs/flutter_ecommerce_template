/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.google = (function() {

    /**
     * Namespace google.
     * @exports google
     * @namespace
     */
    var google = {};

    google.protobuf = (function() {

        /**
         * Namespace protobuf.
         * @memberof google
         * @namespace
         */
        var protobuf = {};

        protobuf.Struct = (function() {

            /**
             * Properties of a Struct.
             * @memberof google.protobuf
             * @interface IStruct
             * @property {Object.<string,google.protobuf.IValue>|null} [fields] Struct fields
             */

            /**
             * Constructs a new Struct.
             * @memberof google.protobuf
             * @classdesc Represents a Struct.
             * @implements IStruct
             * @constructor
             * @param {google.protobuf.IStruct=} [properties] Properties to set
             */
            function Struct(properties) {
                this.fields = {};
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Struct fields.
             * @member {Object.<string,google.protobuf.IValue>} fields
             * @memberof google.protobuf.Struct
             * @instance
             */
            Struct.prototype.fields = $util.emptyObject;

            /**
             * Creates a new Struct instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.IStruct=} [properties] Properties to set
             * @returns {google.protobuf.Struct} Struct instance
             */
            Struct.create = function create(properties) {
                return new Struct(properties);
            };

            /**
             * Encodes the specified Struct message. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.IStruct} message Struct message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Struct.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.fields != null && Object.hasOwnProperty.call(message, "fields"))
                    for (var keys = Object.keys(message.fields), i = 0; i < keys.length; ++i) {
                        writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                        $root.google.protobuf.Value.encode(message.fields[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                    }
                return writer;
            };

            /**
             * Encodes the specified Struct message, length delimited. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.IStruct} message Struct message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Struct.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Struct message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Struct
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Struct} Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Struct.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Struct(), key, value;
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (message.fields === $util.emptyObject)
                                message.fields = {};
                            var end2 = reader.uint32() + reader.pos;
                            key = "";
                            value = null;
                            while (reader.pos < end2) {
                                var tag2 = reader.uint32();
                                switch (tag2 >>> 3) {
                                case 1:
                                    key = reader.string();
                                    break;
                                case 2:
                                    value = $root.google.protobuf.Value.decode(reader, reader.uint32());
                                    break;
                                default:
                                    reader.skipType(tag2 & 7);
                                    break;
                                }
                            }
                            message.fields[key] = value;
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Struct message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Struct
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Struct} Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Struct.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Struct message.
             * @function verify
             * @memberof google.protobuf.Struct
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Struct.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.fields != null && message.hasOwnProperty("fields")) {
                    if (!$util.isObject(message.fields))
                        return "fields: object expected";
                    var key = Object.keys(message.fields);
                    for (var i = 0; i < key.length; ++i) {
                        var error = $root.google.protobuf.Value.verify(message.fields[key[i]]);
                        if (error)
                            return "fields." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Struct message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Struct
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Struct} Struct
             */
            Struct.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Struct)
                    return object;
                var message = new $root.google.protobuf.Struct();
                if (object.fields) {
                    if (typeof object.fields !== "object")
                        throw TypeError(".google.protobuf.Struct.fields: object expected");
                    message.fields = {};
                    for (var keys = Object.keys(object.fields), i = 0; i < keys.length; ++i) {
                        if (typeof object.fields[keys[i]] !== "object")
                            throw TypeError(".google.protobuf.Struct.fields: object expected");
                        message.fields[keys[i]] = $root.google.protobuf.Value.fromObject(object.fields[keys[i]]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a Struct message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Struct
             * @static
             * @param {google.protobuf.Struct} message Struct
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Struct.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.objects || options.defaults)
                    object.fields = {};
                var keys2;
                if (message.fields && (keys2 = Object.keys(message.fields)).length) {
                    object.fields = {};
                    for (var j = 0; j < keys2.length; ++j)
                        object.fields[keys2[j]] = $root.google.protobuf.Value.toObject(message.fields[keys2[j]], options);
                }
                return object;
            };

            /**
             * Converts this Struct to JSON.
             * @function toJSON
             * @memberof google.protobuf.Struct
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Struct.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Struct
             * @function getTypeUrl
             * @memberof google.protobuf.Struct
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Struct.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Struct";
            };

            return Struct;
        })();

        protobuf.Value = (function() {

            /**
             * Properties of a Value.
             * @memberof google.protobuf
             * @interface IValue
             * @property {google.protobuf.NullValue|null} [nullValue] Value nullValue
             * @property {number|null} [numberValue] Value numberValue
             * @property {string|null} [stringValue] Value stringValue
             * @property {boolean|null} [boolValue] Value boolValue
             * @property {google.protobuf.IStruct|null} [structValue] Value structValue
             * @property {google.protobuf.IListValue|null} [listValue] Value listValue
             */

            /**
             * Constructs a new Value.
             * @memberof google.protobuf
             * @classdesc Represents a Value.
             * @implements IValue
             * @constructor
             * @param {google.protobuf.IValue=} [properties] Properties to set
             */
            function Value(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Value nullValue.
             * @member {google.protobuf.NullValue|null|undefined} nullValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.nullValue = null;

            /**
             * Value numberValue.
             * @member {number|null|undefined} numberValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.numberValue = null;

            /**
             * Value stringValue.
             * @member {string|null|undefined} stringValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.stringValue = null;

            /**
             * Value boolValue.
             * @member {boolean|null|undefined} boolValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.boolValue = null;

            /**
             * Value structValue.
             * @member {google.protobuf.IStruct|null|undefined} structValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.structValue = null;

            /**
             * Value listValue.
             * @member {google.protobuf.IListValue|null|undefined} listValue
             * @memberof google.protobuf.Value
             * @instance
             */
            Value.prototype.listValue = null;

            // OneOf field names bound to virtual getters and setters
            var $oneOfFields;

            /**
             * Value kind.
             * @member {"nullValue"|"numberValue"|"stringValue"|"boolValue"|"structValue"|"listValue"|undefined} kind
             * @memberof google.protobuf.Value
             * @instance
             */
            Object.defineProperty(Value.prototype, "kind", {
                get: $util.oneOfGetter($oneOfFields = ["nullValue", "numberValue", "stringValue", "boolValue", "structValue", "listValue"]),
                set: $util.oneOfSetter($oneOfFields)
            });

            /**
             * Creates a new Value instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.IValue=} [properties] Properties to set
             * @returns {google.protobuf.Value} Value instance
             */
            Value.create = function create(properties) {
                return new Value(properties);
            };

            /**
             * Encodes the specified Value message. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.nullValue != null && Object.hasOwnProperty.call(message, "nullValue"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int32(message.nullValue);
                if (message.numberValue != null && Object.hasOwnProperty.call(message, "numberValue"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.numberValue);
                if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
                    writer.uint32(/* id 3, wireType 2 =*/26).string(message.stringValue);
                if (message.boolValue != null && Object.hasOwnProperty.call(message, "boolValue"))
                    writer.uint32(/* id 4, wireType 0 =*/32).bool(message.boolValue);
                if (message.structValue != null && Object.hasOwnProperty.call(message, "structValue"))
                    $root.google.protobuf.Struct.encode(message.structValue, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                if (message.listValue != null && Object.hasOwnProperty.call(message, "listValue"))
                    $root.google.protobuf.ListValue.encode(message.listValue, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Value message, length delimited. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Value message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.nullValue = reader.int32();
                            break;
                        }
                    case 2: {
                            message.numberValue = reader.double();
                            break;
                        }
                    case 3: {
                            message.stringValue = reader.string();
                            break;
                        }
                    case 4: {
                            message.boolValue = reader.bool();
                            break;
                        }
                    case 5: {
                            message.structValue = $root.google.protobuf.Struct.decode(reader, reader.uint32());
                            break;
                        }
                    case 6: {
                            message.listValue = $root.google.protobuf.ListValue.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Value message.
             * @function verify
             * @memberof google.protobuf.Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                var properties = {};
                if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
                    properties.kind = 1;
                    switch (message.nullValue) {
                    default:
                        return "nullValue: enum value expected";
                    case 0:
                        break;
                    }
                }
                if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    if (typeof message.numberValue !== "number")
                        return "numberValue: number expected";
                }
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    if (!$util.isString(message.stringValue))
                        return "stringValue: string expected";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    if (typeof message.boolValue !== "boolean")
                        return "boolValue: boolean expected";
                }
                if (message.structValue != null && message.hasOwnProperty("structValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.Struct.verify(message.structValue);
                        if (error)
                            return "structValue." + error;
                    }
                }
                if (message.listValue != null && message.hasOwnProperty("listValue")) {
                    if (properties.kind === 1)
                        return "kind: multiple values";
                    properties.kind = 1;
                    {
                        var error = $root.google.protobuf.ListValue.verify(message.listValue);
                        if (error)
                            return "listValue." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Value} Value
             */
            Value.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Value)
                    return object;
                var message = new $root.google.protobuf.Value();
                switch (object.nullValue) {
                default:
                    if (typeof object.nullValue === "number") {
                        message.nullValue = object.nullValue;
                        break;
                    }
                    break;
                case "NULL_VALUE":
                case 0:
                    message.nullValue = 0;
                    break;
                }
                if (object.numberValue != null)
                    message.numberValue = Number(object.numberValue);
                if (object.stringValue != null)
                    message.stringValue = String(object.stringValue);
                if (object.boolValue != null)
                    message.boolValue = Boolean(object.boolValue);
                if (object.structValue != null) {
                    if (typeof object.structValue !== "object")
                        throw TypeError(".google.protobuf.Value.structValue: object expected");
                    message.structValue = $root.google.protobuf.Struct.fromObject(object.structValue);
                }
                if (object.listValue != null) {
                    if (typeof object.listValue !== "object")
                        throw TypeError(".google.protobuf.Value.listValue: object expected");
                    message.listValue = $root.google.protobuf.ListValue.fromObject(object.listValue);
                }
                return message;
            };

            /**
             * Creates a plain object from a Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Value
             * @static
             * @param {google.protobuf.Value} message Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
                    object.nullValue = options.enums === String ? $root.google.protobuf.NullValue[message.nullValue] === undefined ? message.nullValue : $root.google.protobuf.NullValue[message.nullValue] : message.nullValue;
                    if (options.oneofs)
                        object.kind = "nullValue";
                }
                if (message.numberValue != null && message.hasOwnProperty("numberValue")) {
                    object.numberValue = options.json && !isFinite(message.numberValue) ? String(message.numberValue) : message.numberValue;
                    if (options.oneofs)
                        object.kind = "numberValue";
                }
                if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                    object.stringValue = message.stringValue;
                    if (options.oneofs)
                        object.kind = "stringValue";
                }
                if (message.boolValue != null && message.hasOwnProperty("boolValue")) {
                    object.boolValue = message.boolValue;
                    if (options.oneofs)
                        object.kind = "boolValue";
                }
                if (message.structValue != null && message.hasOwnProperty("structValue")) {
                    object.structValue = $root.google.protobuf.Struct.toObject(message.structValue, options);
                    if (options.oneofs)
                        object.kind = "structValue";
                }
                if (message.listValue != null && message.hasOwnProperty("listValue")) {
                    object.listValue = $root.google.protobuf.ListValue.toObject(message.listValue, options);
                    if (options.oneofs)
                        object.kind = "listValue";
                }
                return object;
            };

            /**
             * Converts this Value to JSON.
             * @function toJSON
             * @memberof google.protobuf.Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Value
             * @function getTypeUrl
             * @memberof google.protobuf.Value
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Value.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Value";
            };

            return Value;
        })();

        /**
         * NullValue enum.
         * @name google.protobuf.NullValue
         * @enum {number}
         * @property {number} NULL_VALUE=0 NULL_VALUE value
         */
        protobuf.NullValue = (function() {
            var valuesById = {}, values = Object.create(valuesById);
            values[valuesById[0] = "NULL_VALUE"] = 0;
            return values;
        })();

        protobuf.ListValue = (function() {

            /**
             * Properties of a ListValue.
             * @memberof google.protobuf
             * @interface IListValue
             * @property {Array.<google.protobuf.IValue>|null} [values] ListValue values
             */

            /**
             * Constructs a new ListValue.
             * @memberof google.protobuf
             * @classdesc Represents a ListValue.
             * @implements IListValue
             * @constructor
             * @param {google.protobuf.IListValue=} [properties] Properties to set
             */
            function ListValue(properties) {
                this.values = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * ListValue values.
             * @member {Array.<google.protobuf.IValue>} values
             * @memberof google.protobuf.ListValue
             * @instance
             */
            ListValue.prototype.values = $util.emptyArray;

            /**
             * Creates a new ListValue instance using the specified properties.
             * @function create
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.IListValue=} [properties] Properties to set
             * @returns {google.protobuf.ListValue} ListValue instance
             */
            ListValue.create = function create(properties) {
                return new ListValue(properties);
            };

            /**
             * Encodes the specified ListValue message. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.IListValue} message ListValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.values != null && message.values.length)
                    for (var i = 0; i < message.values.length; ++i)
                        $root.google.protobuf.Value.encode(message.values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified ListValue message, length delimited. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.IListValue} message ListValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            ListValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a ListValue message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.ListValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.ListValue} ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.ListValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            if (!(message.values && message.values.length))
                                message.values = [];
                            message.values.push($root.google.protobuf.Value.decode(reader, reader.uint32()));
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a ListValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.ListValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.ListValue} ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            ListValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a ListValue message.
             * @function verify
             * @memberof google.protobuf.ListValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            ListValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.values != null && message.hasOwnProperty("values")) {
                    if (!Array.isArray(message.values))
                        return "values: array expected";
                    for (var i = 0; i < message.values.length; ++i) {
                        var error = $root.google.protobuf.Value.verify(message.values[i]);
                        if (error)
                            return "values." + error;
                    }
                }
                return null;
            };

            /**
             * Creates a ListValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.ListValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.ListValue} ListValue
             */
            ListValue.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.ListValue)
                    return object;
                var message = new $root.google.protobuf.ListValue();
                if (object.values) {
                    if (!Array.isArray(object.values))
                        throw TypeError(".google.protobuf.ListValue.values: array expected");
                    message.values = [];
                    for (var i = 0; i < object.values.length; ++i) {
                        if (typeof object.values[i] !== "object")
                            throw TypeError(".google.protobuf.ListValue.values: object expected");
                        message.values[i] = $root.google.protobuf.Value.fromObject(object.values[i]);
                    }
                }
                return message;
            };

            /**
             * Creates a plain object from a ListValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.ListValue
             * @static
             * @param {google.protobuf.ListValue} message ListValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            ListValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.values = [];
                if (message.values && message.values.length) {
                    object.values = [];
                    for (var j = 0; j < message.values.length; ++j)
                        object.values[j] = $root.google.protobuf.Value.toObject(message.values[j], options);
                }
                return object;
            };

            /**
             * Converts this ListValue to JSON.
             * @function toJSON
             * @memberof google.protobuf.ListValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            ListValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for ListValue
             * @function getTypeUrl
             * @memberof google.protobuf.ListValue
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            ListValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.ListValue";
            };

            return ListValue;
        })();

        protobuf.Timestamp = (function() {

            /**
             * Properties of a Timestamp.
             * @memberof google.protobuf
             * @interface ITimestamp
             * @property {number|Long|null} [seconds] Timestamp seconds
             * @property {number|null} [nanos] Timestamp nanos
             */

            /**
             * Constructs a new Timestamp.
             * @memberof google.protobuf
             * @classdesc Represents a Timestamp.
             * @implements ITimestamp
             * @constructor
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             */
            function Timestamp(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Timestamp seconds.
             * @member {number|Long} seconds
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

            /**
             * Timestamp nanos.
             * @member {number} nanos
             * @memberof google.protobuf.Timestamp
             * @instance
             */
            Timestamp.prototype.nanos = 0;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp=} [properties] Properties to set
             * @returns {google.protobuf.Timestamp} Timestamp instance
             */
            Timestamp.create = function create(properties) {
                return new Timestamp(properties);
            };

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.seconds != null && Object.hasOwnProperty.call(message, "seconds"))
                    writer.uint32(/* id 1, wireType 0 =*/8).int64(message.seconds);
                if (message.nanos != null && Object.hasOwnProperty.call(message, "nanos"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.nanos);
                return writer;
            };

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.ITimestamp} message Timestamp message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Timestamp.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Timestamp();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.seconds = reader.int64();
                            break;
                        }
                    case 2: {
                            message.nanos = reader.int32();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Timestamp} Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Timestamp.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Timestamp message.
             * @function verify
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Timestamp.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (!$util.isInteger(message.seconds) && !(message.seconds && $util.isInteger(message.seconds.low) && $util.isInteger(message.seconds.high)))
                        return "seconds: integer|Long expected";
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    if (!$util.isInteger(message.nanos))
                        return "nanos: integer expected";
                return null;
            };

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Timestamp} Timestamp
             */
            Timestamp.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Timestamp)
                    return object;
                var message = new $root.google.protobuf.Timestamp();
                if (object.seconds != null)
                    if ($util.Long)
                        (message.seconds = $util.Long.fromValue(object.seconds)).unsigned = false;
                    else if (typeof object.seconds === "string")
                        message.seconds = parseInt(object.seconds, 10);
                    else if (typeof object.seconds === "number")
                        message.seconds = object.seconds;
                    else if (typeof object.seconds === "object")
                        message.seconds = new $util.LongBits(object.seconds.low >>> 0, object.seconds.high >>> 0).toNumber();
                if (object.nanos != null)
                    message.nanos = object.nanos | 0;
                return message;
            };

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {google.protobuf.Timestamp} message Timestamp
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Timestamp.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    if ($util.Long) {
                        var long = new $util.Long(0, 0, false);
                        object.seconds = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                    } else
                        object.seconds = options.longs === String ? "0" : 0;
                    object.nanos = 0;
                }
                if (message.seconds != null && message.hasOwnProperty("seconds"))
                    if (typeof message.seconds === "number")
                        object.seconds = options.longs === String ? String(message.seconds) : message.seconds;
                    else
                        object.seconds = options.longs === String ? $util.Long.prototype.toString.call(message.seconds) : options.longs === Number ? new $util.LongBits(message.seconds.low >>> 0, message.seconds.high >>> 0).toNumber() : message.seconds;
                if (message.nanos != null && message.hasOwnProperty("nanos"))
                    object.nanos = message.nanos;
                return object;
            };

            /**
             * Converts this Timestamp to JSON.
             * @function toJSON
             * @memberof google.protobuf.Timestamp
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Timestamp.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Timestamp
             * @function getTypeUrl
             * @memberof google.protobuf.Timestamp
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Timestamp.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Timestamp";
            };

            return Timestamp;
        })();

        protobuf.Any = (function() {

            /**
             * Properties of an Any.
             * @memberof google.protobuf
             * @interface IAny
             * @property {string|null} [typeUrl] Any typeUrl
             * @property {Uint8Array|null} [value] Any value
             */

            /**
             * Constructs a new Any.
             * @memberof google.protobuf
             * @classdesc Represents an Any.
             * @implements IAny
             * @constructor
             * @param {google.protobuf.IAny=} [properties] Properties to set
             */
            function Any(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Any typeUrl.
             * @member {string} typeUrl
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.typeUrl = "";

            /**
             * Any value.
             * @member {Uint8Array} value
             * @memberof google.protobuf.Any
             * @instance
             */
            Any.prototype.value = $util.newBuffer([]);

            /**
             * Creates a new Any instance using the specified properties.
             * @function create
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny=} [properties] Properties to set
             * @returns {google.protobuf.Any} Any instance
             */
            Any.create = function create(properties) {
                return new Any(properties);
            };

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encode
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.typeUrl != null && Object.hasOwnProperty.call(message, "typeUrl"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.typeUrl);
                if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                    writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.value);
                return writer;
            };

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.IAny} message Any message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Any.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @function decode
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.protobuf.Any();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.typeUrl = reader.string();
                            break;
                        }
                    case 2: {
                            message.value = reader.bytes();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.protobuf.Any
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.protobuf.Any} Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Any.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies an Any message.
             * @function verify
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Any.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.typeUrl != null && message.hasOwnProperty("typeUrl"))
                    if (!$util.isString(message.typeUrl))
                        return "typeUrl: string expected";
                if (message.value != null && message.hasOwnProperty("value"))
                    if (!(message.value && typeof message.value.length === "number" || $util.isString(message.value)))
                        return "value: buffer expected";
                return null;
            };

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.protobuf.Any
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.protobuf.Any} Any
             */
            Any.fromObject = function fromObject(object) {
                if (object instanceof $root.google.protobuf.Any)
                    return object;
                var message = new $root.google.protobuf.Any();
                if (object.typeUrl != null)
                    message.typeUrl = String(object.typeUrl);
                if (object.value != null)
                    if (typeof object.value === "string")
                        $util.base64.decode(object.value, message.value = $util.newBuffer($util.base64.length(object.value)), 0);
                    else if (object.value.length >= 0)
                        message.value = object.value;
                return message;
            };

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.protobuf.Any
             * @static
             * @param {google.protobuf.Any} message Any
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Any.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.typeUrl = "";
                    if (options.bytes === String)
                        object.value = "";
                    else {
                        object.value = [];
                        if (options.bytes !== Array)
                            object.value = $util.newBuffer(object.value);
                    }
                }
                if (message.typeUrl != null && message.hasOwnProperty("typeUrl"))
                    object.typeUrl = message.typeUrl;
                if (message.value != null && message.hasOwnProperty("value"))
                    object.value = options.bytes === String ? $util.base64.encode(message.value, 0, message.value.length) : options.bytes === Array ? Array.prototype.slice.call(message.value) : message.value;
                return object;
            };

            /**
             * Converts this Any to JSON.
             * @function toJSON
             * @memberof google.protobuf.Any
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Any.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Any
             * @function getTypeUrl
             * @memberof google.protobuf.Any
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Any.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.protobuf.Any";
            };

            return Any;
        })();

        return protobuf;
    })();

    google.events = (function() {

        /**
         * Namespace events.
         * @memberof google
         * @namespace
         */
        var events = {};

        events.cloud = (function() {

            /**
             * Namespace cloud.
             * @memberof google.events
             * @namespace
             */
            var cloud = {};

            cloud.firestore = (function() {

                /**
                 * Namespace firestore.
                 * @memberof google.events.cloud
                 * @namespace
                 */
                var firestore = {};

                firestore.v1 = (function() {

                    /**
                     * Namespace v1.
                     * @memberof google.events.cloud.firestore
                     * @namespace
                     */
                    var v1 = {};

                    v1.DocumentEventData = (function() {

                        /**
                         * Properties of a DocumentEventData.
                         * @memberof google.events.cloud.firestore.v1
                         * @interface IDocumentEventData
                         * @property {google.events.cloud.firestore.v1.IDocument|null} [value] DocumentEventData value
                         * @property {google.events.cloud.firestore.v1.IDocument|null} [oldValue] DocumentEventData oldValue
                         * @property {google.events.cloud.firestore.v1.IDocumentMask|null} [updateMask] DocumentEventData updateMask
                         */

                        /**
                         * Constructs a new DocumentEventData.
                         * @memberof google.events.cloud.firestore.v1
                         * @classdesc Represents a DocumentEventData.
                         * @implements IDocumentEventData
                         * @constructor
                         * @param {google.events.cloud.firestore.v1.IDocumentEventData=} [properties] Properties to set
                         */
                        function DocumentEventData(properties) {
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DocumentEventData value.
                         * @member {google.events.cloud.firestore.v1.IDocument|null|undefined} value
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @instance
                         */
                        DocumentEventData.prototype.value = null;

                        /**
                         * DocumentEventData oldValue.
                         * @member {google.events.cloud.firestore.v1.IDocument|null|undefined} oldValue
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @instance
                         */
                        DocumentEventData.prototype.oldValue = null;

                        /**
                         * DocumentEventData updateMask.
                         * @member {google.events.cloud.firestore.v1.IDocumentMask|null|undefined} updateMask
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @instance
                         */
                        DocumentEventData.prototype.updateMask = null;

                        /**
                         * Creates a new DocumentEventData instance using the specified properties.
                         * @function create
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @static
                         * @param {google.events.cloud.firestore.v1.IDocumentEventData=} [properties] Properties to set
                         * @returns {google.events.cloud.firestore.v1.DocumentEventData} DocumentEventData instance
                         */
                        DocumentEventData.create = function create(properties) {
                            return new DocumentEventData(properties);
                        };

                        /**
                         * Encodes the specified DocumentEventData message. Does not implicitly {@link google.events.cloud.firestore.v1.DocumentEventData.verify|verify} messages.
                         * @function encode
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @static
                         * @param {google.events.cloud.firestore.v1.IDocumentEventData} message DocumentEventData message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DocumentEventData.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                                $root.google.events.cloud.firestore.v1.Document.encode(message.value, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            if (message.oldValue != null && Object.hasOwnProperty.call(message, "oldValue"))
                                $root.google.events.cloud.firestore.v1.Document.encode(message.oldValue, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                            if (message.updateMask != null && Object.hasOwnProperty.call(message, "updateMask"))
                                $root.google.events.cloud.firestore.v1.DocumentMask.encode(message.updateMask, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified DocumentEventData message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.DocumentEventData.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @static
                         * @param {google.events.cloud.firestore.v1.IDocumentEventData} message DocumentEventData message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DocumentEventData.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DocumentEventData message from the specified reader or buffer.
                         * @function decode
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {google.events.cloud.firestore.v1.DocumentEventData} DocumentEventData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DocumentEventData.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.events.cloud.firestore.v1.DocumentEventData();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.value = $root.google.events.cloud.firestore.v1.Document.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 2: {
                                        message.oldValue = $root.google.events.cloud.firestore.v1.Document.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 3: {
                                        message.updateMask = $root.google.events.cloud.firestore.v1.DocumentMask.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a DocumentEventData message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {google.events.cloud.firestore.v1.DocumentEventData} DocumentEventData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DocumentEventData.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DocumentEventData message.
                         * @function verify
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DocumentEventData.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.value != null && message.hasOwnProperty("value")) {
                                var error = $root.google.events.cloud.firestore.v1.Document.verify(message.value);
                                if (error)
                                    return "value." + error;
                            }
                            if (message.oldValue != null && message.hasOwnProperty("oldValue")) {
                                var error = $root.google.events.cloud.firestore.v1.Document.verify(message.oldValue);
                                if (error)
                                    return "oldValue." + error;
                            }
                            if (message.updateMask != null && message.hasOwnProperty("updateMask")) {
                                var error = $root.google.events.cloud.firestore.v1.DocumentMask.verify(message.updateMask);
                                if (error)
                                    return "updateMask." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates a DocumentEventData message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {google.events.cloud.firestore.v1.DocumentEventData} DocumentEventData
                         */
                        DocumentEventData.fromObject = function fromObject(object) {
                            if (object instanceof $root.google.events.cloud.firestore.v1.DocumentEventData)
                                return object;
                            var message = new $root.google.events.cloud.firestore.v1.DocumentEventData();
                            if (object.value != null) {
                                if (typeof object.value !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.DocumentEventData.value: object expected");
                                message.value = $root.google.events.cloud.firestore.v1.Document.fromObject(object.value);
                            }
                            if (object.oldValue != null) {
                                if (typeof object.oldValue !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.DocumentEventData.oldValue: object expected");
                                message.oldValue = $root.google.events.cloud.firestore.v1.Document.fromObject(object.oldValue);
                            }
                            if (object.updateMask != null) {
                                if (typeof object.updateMask !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.DocumentEventData.updateMask: object expected");
                                message.updateMask = $root.google.events.cloud.firestore.v1.DocumentMask.fromObject(object.updateMask);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a DocumentEventData message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @static
                         * @param {google.events.cloud.firestore.v1.DocumentEventData} message DocumentEventData
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DocumentEventData.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            var object = {};
                            if (options.defaults) {
                                object.value = null;
                                object.oldValue = null;
                                object.updateMask = null;
                            }
                            if (message.value != null && message.hasOwnProperty("value"))
                                object.value = $root.google.events.cloud.firestore.v1.Document.toObject(message.value, options);
                            if (message.oldValue != null && message.hasOwnProperty("oldValue"))
                                object.oldValue = $root.google.events.cloud.firestore.v1.Document.toObject(message.oldValue, options);
                            if (message.updateMask != null && message.hasOwnProperty("updateMask"))
                                object.updateMask = $root.google.events.cloud.firestore.v1.DocumentMask.toObject(message.updateMask, options);
                            return object;
                        };

                        /**
                         * Converts this DocumentEventData to JSON.
                         * @function toJSON
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DocumentEventData.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DocumentEventData
                         * @function getTypeUrl
                         * @memberof google.events.cloud.firestore.v1.DocumentEventData
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DocumentEventData.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/google.events.cloud.firestore.v1.DocumentEventData";
                        };

                        return DocumentEventData;
                    })();

                    v1.DocumentMask = (function() {

                        /**
                         * Properties of a DocumentMask.
                         * @memberof google.events.cloud.firestore.v1
                         * @interface IDocumentMask
                         * @property {Array.<string>|null} [fieldPaths] DocumentMask fieldPaths
                         */

                        /**
                         * Constructs a new DocumentMask.
                         * @memberof google.events.cloud.firestore.v1
                         * @classdesc Represents a DocumentMask.
                         * @implements IDocumentMask
                         * @constructor
                         * @param {google.events.cloud.firestore.v1.IDocumentMask=} [properties] Properties to set
                         */
                        function DocumentMask(properties) {
                            this.fieldPaths = [];
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * DocumentMask fieldPaths.
                         * @member {Array.<string>} fieldPaths
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @instance
                         */
                        DocumentMask.prototype.fieldPaths = $util.emptyArray;

                        /**
                         * Creates a new DocumentMask instance using the specified properties.
                         * @function create
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @static
                         * @param {google.events.cloud.firestore.v1.IDocumentMask=} [properties] Properties to set
                         * @returns {google.events.cloud.firestore.v1.DocumentMask} DocumentMask instance
                         */
                        DocumentMask.create = function create(properties) {
                            return new DocumentMask(properties);
                        };

                        /**
                         * Encodes the specified DocumentMask message. Does not implicitly {@link google.events.cloud.firestore.v1.DocumentMask.verify|verify} messages.
                         * @function encode
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @static
                         * @param {google.events.cloud.firestore.v1.IDocumentMask} message DocumentMask message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DocumentMask.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.fieldPaths != null && message.fieldPaths.length)
                                for (var i = 0; i < message.fieldPaths.length; ++i)
                                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.fieldPaths[i]);
                            return writer;
                        };

                        /**
                         * Encodes the specified DocumentMask message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.DocumentMask.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @static
                         * @param {google.events.cloud.firestore.v1.IDocumentMask} message DocumentMask message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        DocumentMask.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a DocumentMask message from the specified reader or buffer.
                         * @function decode
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {google.events.cloud.firestore.v1.DocumentMask} DocumentMask
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DocumentMask.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.events.cloud.firestore.v1.DocumentMask();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.fieldPaths && message.fieldPaths.length))
                                            message.fieldPaths = [];
                                        message.fieldPaths.push(reader.string());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a DocumentMask message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {google.events.cloud.firestore.v1.DocumentMask} DocumentMask
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        DocumentMask.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a DocumentMask message.
                         * @function verify
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        DocumentMask.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.fieldPaths != null && message.hasOwnProperty("fieldPaths")) {
                                if (!Array.isArray(message.fieldPaths))
                                    return "fieldPaths: array expected";
                                for (var i = 0; i < message.fieldPaths.length; ++i)
                                    if (!$util.isString(message.fieldPaths[i]))
                                        return "fieldPaths: string[] expected";
                            }
                            return null;
                        };

                        /**
                         * Creates a DocumentMask message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {google.events.cloud.firestore.v1.DocumentMask} DocumentMask
                         */
                        DocumentMask.fromObject = function fromObject(object) {
                            if (object instanceof $root.google.events.cloud.firestore.v1.DocumentMask)
                                return object;
                            var message = new $root.google.events.cloud.firestore.v1.DocumentMask();
                            if (object.fieldPaths) {
                                if (!Array.isArray(object.fieldPaths))
                                    throw TypeError(".google.events.cloud.firestore.v1.DocumentMask.fieldPaths: array expected");
                                message.fieldPaths = [];
                                for (var i = 0; i < object.fieldPaths.length; ++i)
                                    message.fieldPaths[i] = String(object.fieldPaths[i]);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a DocumentMask message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @static
                         * @param {google.events.cloud.firestore.v1.DocumentMask} message DocumentMask
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        DocumentMask.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            var object = {};
                            if (options.arrays || options.defaults)
                                object.fieldPaths = [];
                            if (message.fieldPaths && message.fieldPaths.length) {
                                object.fieldPaths = [];
                                for (var j = 0; j < message.fieldPaths.length; ++j)
                                    object.fieldPaths[j] = message.fieldPaths[j];
                            }
                            return object;
                        };

                        /**
                         * Converts this DocumentMask to JSON.
                         * @function toJSON
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        DocumentMask.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for DocumentMask
                         * @function getTypeUrl
                         * @memberof google.events.cloud.firestore.v1.DocumentMask
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        DocumentMask.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/google.events.cloud.firestore.v1.DocumentMask";
                        };

                        return DocumentMask;
                    })();

                    v1.Document = (function() {

                        /**
                         * Properties of a Document.
                         * @memberof google.events.cloud.firestore.v1
                         * @interface IDocument
                         * @property {string|null} [name] Document name
                         * @property {Object.<string,google.events.cloud.firestore.v1.IValue>|null} [fields] Document fields
                         * @property {google.protobuf.ITimestamp|null} [createTime] Document createTime
                         * @property {google.protobuf.ITimestamp|null} [updateTime] Document updateTime
                         */

                        /**
                         * Constructs a new Document.
                         * @memberof google.events.cloud.firestore.v1
                         * @classdesc Represents a Document.
                         * @implements IDocument
                         * @constructor
                         * @param {google.events.cloud.firestore.v1.IDocument=} [properties] Properties to set
                         */
                        function Document(properties) {
                            this.fields = {};
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * Document name.
                         * @member {string} name
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @instance
                         */
                        Document.prototype.name = "";

                        /**
                         * Document fields.
                         * @member {Object.<string,google.events.cloud.firestore.v1.IValue>} fields
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @instance
                         */
                        Document.prototype.fields = $util.emptyObject;

                        /**
                         * Document createTime.
                         * @member {google.protobuf.ITimestamp|null|undefined} createTime
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @instance
                         */
                        Document.prototype.createTime = null;

                        /**
                         * Document updateTime.
                         * @member {google.protobuf.ITimestamp|null|undefined} updateTime
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @instance
                         */
                        Document.prototype.updateTime = null;

                        /**
                         * Creates a new Document instance using the specified properties.
                         * @function create
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @static
                         * @param {google.events.cloud.firestore.v1.IDocument=} [properties] Properties to set
                         * @returns {google.events.cloud.firestore.v1.Document} Document instance
                         */
                        Document.create = function create(properties) {
                            return new Document(properties);
                        };

                        /**
                         * Encodes the specified Document message. Does not implicitly {@link google.events.cloud.firestore.v1.Document.verify|verify} messages.
                         * @function encode
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @static
                         * @param {google.events.cloud.firestore.v1.IDocument} message Document message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Document.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.name);
                            if (message.fields != null && Object.hasOwnProperty.call(message, "fields"))
                                for (var keys = Object.keys(message.fields), i = 0; i < keys.length; ++i) {
                                    writer.uint32(/* id 2, wireType 2 =*/18).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                                    $root.google.events.cloud.firestore.v1.Value.encode(message.fields[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                                }
                            if (message.createTime != null && Object.hasOwnProperty.call(message, "createTime"))
                                $root.google.protobuf.Timestamp.encode(message.createTime, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                            if (message.updateTime != null && Object.hasOwnProperty.call(message, "updateTime"))
                                $root.google.protobuf.Timestamp.encode(message.updateTime, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified Document message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.Document.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @static
                         * @param {google.events.cloud.firestore.v1.IDocument} message Document message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Document.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a Document message from the specified reader or buffer.
                         * @function decode
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {google.events.cloud.firestore.v1.Document} Document
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Document.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.events.cloud.firestore.v1.Document(), key, value;
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        message.name = reader.string();
                                        break;
                                    }
                                case 2: {
                                        if (message.fields === $util.emptyObject)
                                            message.fields = {};
                                        var end2 = reader.uint32() + reader.pos;
                                        key = "";
                                        value = null;
                                        while (reader.pos < end2) {
                                            var tag2 = reader.uint32();
                                            switch (tag2 >>> 3) {
                                            case 1:
                                                key = reader.string();
                                                break;
                                            case 2:
                                                value = $root.google.events.cloud.firestore.v1.Value.decode(reader, reader.uint32());
                                                break;
                                            default:
                                                reader.skipType(tag2 & 7);
                                                break;
                                            }
                                        }
                                        message.fields[key] = value;
                                        break;
                                    }
                                case 3: {
                                        message.createTime = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 4: {
                                        message.updateTime = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a Document message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {google.events.cloud.firestore.v1.Document} Document
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Document.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a Document message.
                         * @function verify
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Document.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.name != null && message.hasOwnProperty("name"))
                                if (!$util.isString(message.name))
                                    return "name: string expected";
                            if (message.fields != null && message.hasOwnProperty("fields")) {
                                if (!$util.isObject(message.fields))
                                    return "fields: object expected";
                                var key = Object.keys(message.fields);
                                for (var i = 0; i < key.length; ++i) {
                                    var error = $root.google.events.cloud.firestore.v1.Value.verify(message.fields[key[i]]);
                                    if (error)
                                        return "fields." + error;
                                }
                            }
                            if (message.createTime != null && message.hasOwnProperty("createTime")) {
                                var error = $root.google.protobuf.Timestamp.verify(message.createTime);
                                if (error)
                                    return "createTime." + error;
                            }
                            if (message.updateTime != null && message.hasOwnProperty("updateTime")) {
                                var error = $root.google.protobuf.Timestamp.verify(message.updateTime);
                                if (error)
                                    return "updateTime." + error;
                            }
                            return null;
                        };

                        /**
                         * Creates a Document message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {google.events.cloud.firestore.v1.Document} Document
                         */
                        Document.fromObject = function fromObject(object) {
                            if (object instanceof $root.google.events.cloud.firestore.v1.Document)
                                return object;
                            var message = new $root.google.events.cloud.firestore.v1.Document();
                            if (object.name != null)
                                message.name = String(object.name);
                            if (object.fields) {
                                if (typeof object.fields !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.Document.fields: object expected");
                                message.fields = {};
                                for (var keys = Object.keys(object.fields), i = 0; i < keys.length; ++i) {
                                    if (typeof object.fields[keys[i]] !== "object")
                                        throw TypeError(".google.events.cloud.firestore.v1.Document.fields: object expected");
                                    message.fields[keys[i]] = $root.google.events.cloud.firestore.v1.Value.fromObject(object.fields[keys[i]]);
                                }
                            }
                            if (object.createTime != null) {
                                if (typeof object.createTime !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.Document.createTime: object expected");
                                message.createTime = $root.google.protobuf.Timestamp.fromObject(object.createTime);
                            }
                            if (object.updateTime != null) {
                                if (typeof object.updateTime !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.Document.updateTime: object expected");
                                message.updateTime = $root.google.protobuf.Timestamp.fromObject(object.updateTime);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a Document message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @static
                         * @param {google.events.cloud.firestore.v1.Document} message Document
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        Document.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            var object = {};
                            if (options.objects || options.defaults)
                                object.fields = {};
                            if (options.defaults) {
                                object.name = "";
                                object.createTime = null;
                                object.updateTime = null;
                            }
                            if (message.name != null && message.hasOwnProperty("name"))
                                object.name = message.name;
                            var keys2;
                            if (message.fields && (keys2 = Object.keys(message.fields)).length) {
                                object.fields = {};
                                for (var j = 0; j < keys2.length; ++j)
                                    object.fields[keys2[j]] = $root.google.events.cloud.firestore.v1.Value.toObject(message.fields[keys2[j]], options);
                            }
                            if (message.createTime != null && message.hasOwnProperty("createTime"))
                                object.createTime = $root.google.protobuf.Timestamp.toObject(message.createTime, options);
                            if (message.updateTime != null && message.hasOwnProperty("updateTime"))
                                object.updateTime = $root.google.protobuf.Timestamp.toObject(message.updateTime, options);
                            return object;
                        };

                        /**
                         * Converts this Document to JSON.
                         * @function toJSON
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Document.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for Document
                         * @function getTypeUrl
                         * @memberof google.events.cloud.firestore.v1.Document
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        Document.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/google.events.cloud.firestore.v1.Document";
                        };

                        return Document;
                    })();

                    v1.Value = (function() {

                        /**
                         * Properties of a Value.
                         * @memberof google.events.cloud.firestore.v1
                         * @interface IValue
                         * @property {google.protobuf.NullValue|null} [nullValue] Value nullValue
                         * @property {boolean|null} [booleanValue] Value booleanValue
                         * @property {number|Long|null} [integerValue] Value integerValue
                         * @property {number|null} [doubleValue] Value doubleValue
                         * @property {google.protobuf.ITimestamp|null} [timestampValue] Value timestampValue
                         * @property {string|null} [stringValue] Value stringValue
                         * @property {Uint8Array|null} [bytesValue] Value bytesValue
                         * @property {string|null} [referenceValue] Value referenceValue
                         * @property {google.type.ILatLng|null} [geoPointValue] Value geoPointValue
                         * @property {google.events.cloud.firestore.v1.IArrayValue|null} [arrayValue] Value arrayValue
                         * @property {google.events.cloud.firestore.v1.IMapValue|null} [mapValue] Value mapValue
                         */

                        /**
                         * Constructs a new Value.
                         * @memberof google.events.cloud.firestore.v1
                         * @classdesc Represents a Value.
                         * @implements IValue
                         * @constructor
                         * @param {google.events.cloud.firestore.v1.IValue=} [properties] Properties to set
                         */
                        function Value(properties) {
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * Value nullValue.
                         * @member {google.protobuf.NullValue|null|undefined} nullValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.nullValue = null;

                        /**
                         * Value booleanValue.
                         * @member {boolean|null|undefined} booleanValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.booleanValue = null;

                        /**
                         * Value integerValue.
                         * @member {number|Long|null|undefined} integerValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.integerValue = null;

                        /**
                         * Value doubleValue.
                         * @member {number|null|undefined} doubleValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.doubleValue = null;

                        /**
                         * Value timestampValue.
                         * @member {google.protobuf.ITimestamp|null|undefined} timestampValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.timestampValue = null;

                        /**
                         * Value stringValue.
                         * @member {string|null|undefined} stringValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.stringValue = null;

                        /**
                         * Value bytesValue.
                         * @member {Uint8Array|null|undefined} bytesValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.bytesValue = null;

                        /**
                         * Value referenceValue.
                         * @member {string|null|undefined} referenceValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.referenceValue = null;

                        /**
                         * Value geoPointValue.
                         * @member {google.type.ILatLng|null|undefined} geoPointValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.geoPointValue = null;

                        /**
                         * Value arrayValue.
                         * @member {google.events.cloud.firestore.v1.IArrayValue|null|undefined} arrayValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.arrayValue = null;

                        /**
                         * Value mapValue.
                         * @member {google.events.cloud.firestore.v1.IMapValue|null|undefined} mapValue
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Value.prototype.mapValue = null;

                        // OneOf field names bound to virtual getters and setters
                        var $oneOfFields;

                        /**
                         * Value valueType.
                         * @member {"nullValue"|"booleanValue"|"integerValue"|"doubleValue"|"timestampValue"|"stringValue"|"bytesValue"|"referenceValue"|"geoPointValue"|"arrayValue"|"mapValue"|undefined} valueType
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         */
                        Object.defineProperty(Value.prototype, "valueType", {
                            get: $util.oneOfGetter($oneOfFields = ["nullValue", "booleanValue", "integerValue", "doubleValue", "timestampValue", "stringValue", "bytesValue", "referenceValue", "geoPointValue", "arrayValue", "mapValue"]),
                            set: $util.oneOfSetter($oneOfFields)
                        });

                        /**
                         * Creates a new Value instance using the specified properties.
                         * @function create
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @static
                         * @param {google.events.cloud.firestore.v1.IValue=} [properties] Properties to set
                         * @returns {google.events.cloud.firestore.v1.Value} Value instance
                         */
                        Value.create = function create(properties) {
                            return new Value(properties);
                        };

                        /**
                         * Encodes the specified Value message. Does not implicitly {@link google.events.cloud.firestore.v1.Value.verify|verify} messages.
                         * @function encode
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @static
                         * @param {google.events.cloud.firestore.v1.IValue} message Value message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Value.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.booleanValue != null && Object.hasOwnProperty.call(message, "booleanValue"))
                                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.booleanValue);
                            if (message.integerValue != null && Object.hasOwnProperty.call(message, "integerValue"))
                                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.integerValue);
                            if (message.doubleValue != null && Object.hasOwnProperty.call(message, "doubleValue"))
                                writer.uint32(/* id 3, wireType 1 =*/25).double(message.doubleValue);
                            if (message.referenceValue != null && Object.hasOwnProperty.call(message, "referenceValue"))
                                writer.uint32(/* id 5, wireType 2 =*/42).string(message.referenceValue);
                            if (message.mapValue != null && Object.hasOwnProperty.call(message, "mapValue"))
                                $root.google.events.cloud.firestore.v1.MapValue.encode(message.mapValue, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                            if (message.geoPointValue != null && Object.hasOwnProperty.call(message, "geoPointValue"))
                                $root.google.type.LatLng.encode(message.geoPointValue, writer.uint32(/* id 8, wireType 2 =*/66).fork()).ldelim();
                            if (message.arrayValue != null && Object.hasOwnProperty.call(message, "arrayValue"))
                                $root.google.events.cloud.firestore.v1.ArrayValue.encode(message.arrayValue, writer.uint32(/* id 9, wireType 2 =*/74).fork()).ldelim();
                            if (message.timestampValue != null && Object.hasOwnProperty.call(message, "timestampValue"))
                                $root.google.protobuf.Timestamp.encode(message.timestampValue, writer.uint32(/* id 10, wireType 2 =*/82).fork()).ldelim();
                            if (message.nullValue != null && Object.hasOwnProperty.call(message, "nullValue"))
                                writer.uint32(/* id 11, wireType 0 =*/88).int32(message.nullValue);
                            if (message.stringValue != null && Object.hasOwnProperty.call(message, "stringValue"))
                                writer.uint32(/* id 17, wireType 2 =*/138).string(message.stringValue);
                            if (message.bytesValue != null && Object.hasOwnProperty.call(message, "bytesValue"))
                                writer.uint32(/* id 18, wireType 2 =*/146).bytes(message.bytesValue);
                            return writer;
                        };

                        /**
                         * Encodes the specified Value message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.Value.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @static
                         * @param {google.events.cloud.firestore.v1.IValue} message Value message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        Value.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a Value message from the specified reader or buffer.
                         * @function decode
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {google.events.cloud.firestore.v1.Value} Value
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Value.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.events.cloud.firestore.v1.Value();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 11: {
                                        message.nullValue = reader.int32();
                                        break;
                                    }
                                case 1: {
                                        message.booleanValue = reader.bool();
                                        break;
                                    }
                                case 2: {
                                        message.integerValue = reader.int64();
                                        break;
                                    }
                                case 3: {
                                        message.doubleValue = reader.double();
                                        break;
                                    }
                                case 10: {
                                        message.timestampValue = $root.google.protobuf.Timestamp.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 17: {
                                        message.stringValue = reader.string();
                                        break;
                                    }
                                case 18: {
                                        message.bytesValue = reader.bytes();
                                        break;
                                    }
                                case 5: {
                                        message.referenceValue = reader.string();
                                        break;
                                    }
                                case 8: {
                                        message.geoPointValue = $root.google.type.LatLng.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 9: {
                                        message.arrayValue = $root.google.events.cloud.firestore.v1.ArrayValue.decode(reader, reader.uint32());
                                        break;
                                    }
                                case 6: {
                                        message.mapValue = $root.google.events.cloud.firestore.v1.MapValue.decode(reader, reader.uint32());
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a Value message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {google.events.cloud.firestore.v1.Value} Value
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        Value.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a Value message.
                         * @function verify
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        Value.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            var properties = {};
                            if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
                                properties.valueType = 1;
                                switch (message.nullValue) {
                                default:
                                    return "nullValue: enum value expected";
                                case 0:
                                    break;
                                }
                            }
                            if (message.booleanValue != null && message.hasOwnProperty("booleanValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                if (typeof message.booleanValue !== "boolean")
                                    return "booleanValue: boolean expected";
                            }
                            if (message.integerValue != null && message.hasOwnProperty("integerValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                if (!$util.isInteger(message.integerValue) && !(message.integerValue && $util.isInteger(message.integerValue.low) && $util.isInteger(message.integerValue.high)))
                                    return "integerValue: integer|Long expected";
                            }
                            if (message.doubleValue != null && message.hasOwnProperty("doubleValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                if (typeof message.doubleValue !== "number")
                                    return "doubleValue: number expected";
                            }
                            if (message.timestampValue != null && message.hasOwnProperty("timestampValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                {
                                    var error = $root.google.protobuf.Timestamp.verify(message.timestampValue);
                                    if (error)
                                        return "timestampValue." + error;
                                }
                            }
                            if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                if (!$util.isString(message.stringValue))
                                    return "stringValue: string expected";
                            }
                            if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                if (!(message.bytesValue && typeof message.bytesValue.length === "number" || $util.isString(message.bytesValue)))
                                    return "bytesValue: buffer expected";
                            }
                            if (message.referenceValue != null && message.hasOwnProperty("referenceValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                if (!$util.isString(message.referenceValue))
                                    return "referenceValue: string expected";
                            }
                            if (message.geoPointValue != null && message.hasOwnProperty("geoPointValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                {
                                    var error = $root.google.type.LatLng.verify(message.geoPointValue);
                                    if (error)
                                        return "geoPointValue." + error;
                                }
                            }
                            if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                {
                                    var error = $root.google.events.cloud.firestore.v1.ArrayValue.verify(message.arrayValue);
                                    if (error)
                                        return "arrayValue." + error;
                                }
                            }
                            if (message.mapValue != null && message.hasOwnProperty("mapValue")) {
                                if (properties.valueType === 1)
                                    return "valueType: multiple values";
                                properties.valueType = 1;
                                {
                                    var error = $root.google.events.cloud.firestore.v1.MapValue.verify(message.mapValue);
                                    if (error)
                                        return "mapValue." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a Value message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {google.events.cloud.firestore.v1.Value} Value
                         */
                        Value.fromObject = function fromObject(object) {
                            if (object instanceof $root.google.events.cloud.firestore.v1.Value)
                                return object;
                            var message = new $root.google.events.cloud.firestore.v1.Value();
                            switch (object.nullValue) {
                            default:
                                if (typeof object.nullValue === "number") {
                                    message.nullValue = object.nullValue;
                                    break;
                                }
                                break;
                            case "NULL_VALUE":
                            case 0:
                                message.nullValue = 0;
                                break;
                            }
                            if (object.booleanValue != null)
                                message.booleanValue = Boolean(object.booleanValue);
                            if (object.integerValue != null)
                                if ($util.Long)
                                    (message.integerValue = $util.Long.fromValue(object.integerValue)).unsigned = false;
                                else if (typeof object.integerValue === "string")
                                    message.integerValue = parseInt(object.integerValue, 10);
                                else if (typeof object.integerValue === "number")
                                    message.integerValue = object.integerValue;
                                else if (typeof object.integerValue === "object")
                                    message.integerValue = new $util.LongBits(object.integerValue.low >>> 0, object.integerValue.high >>> 0).toNumber();
                            if (object.doubleValue != null)
                                message.doubleValue = Number(object.doubleValue);
                            if (object.timestampValue != null) {
                                if (typeof object.timestampValue !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.Value.timestampValue: object expected");
                                message.timestampValue = $root.google.protobuf.Timestamp.fromObject(object.timestampValue);
                            }
                            if (object.stringValue != null)
                                message.stringValue = String(object.stringValue);
                            if (object.bytesValue != null)
                                if (typeof object.bytesValue === "string")
                                    $util.base64.decode(object.bytesValue, message.bytesValue = $util.newBuffer($util.base64.length(object.bytesValue)), 0);
                                else if (object.bytesValue.length >= 0)
                                    message.bytesValue = object.bytesValue;
                            if (object.referenceValue != null)
                                message.referenceValue = String(object.referenceValue);
                            if (object.geoPointValue != null) {
                                if (typeof object.geoPointValue !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.Value.geoPointValue: object expected");
                                message.geoPointValue = $root.google.type.LatLng.fromObject(object.geoPointValue);
                            }
                            if (object.arrayValue != null) {
                                if (typeof object.arrayValue !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.Value.arrayValue: object expected");
                                message.arrayValue = $root.google.events.cloud.firestore.v1.ArrayValue.fromObject(object.arrayValue);
                            }
                            if (object.mapValue != null) {
                                if (typeof object.mapValue !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.Value.mapValue: object expected");
                                message.mapValue = $root.google.events.cloud.firestore.v1.MapValue.fromObject(object.mapValue);
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a Value message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @static
                         * @param {google.events.cloud.firestore.v1.Value} message Value
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        Value.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            var object = {};
                            if (message.booleanValue != null && message.hasOwnProperty("booleanValue")) {
                                object.booleanValue = message.booleanValue;
                                if (options.oneofs)
                                    object.valueType = "booleanValue";
                            }
                            if (message.integerValue != null && message.hasOwnProperty("integerValue")) {
                                if (typeof message.integerValue === "number")
                                    object.integerValue = options.longs === String ? String(message.integerValue) : message.integerValue;
                                else
                                    object.integerValue = options.longs === String ? $util.Long.prototype.toString.call(message.integerValue) : options.longs === Number ? new $util.LongBits(message.integerValue.low >>> 0, message.integerValue.high >>> 0).toNumber() : message.integerValue;
                                if (options.oneofs)
                                    object.valueType = "integerValue";
                            }
                            if (message.doubleValue != null && message.hasOwnProperty("doubleValue")) {
                                object.doubleValue = options.json && !isFinite(message.doubleValue) ? String(message.doubleValue) : message.doubleValue;
                                if (options.oneofs)
                                    object.valueType = "doubleValue";
                            }
                            if (message.referenceValue != null && message.hasOwnProperty("referenceValue")) {
                                object.referenceValue = message.referenceValue;
                                if (options.oneofs)
                                    object.valueType = "referenceValue";
                            }
                            if (message.mapValue != null && message.hasOwnProperty("mapValue")) {
                                object.mapValue = $root.google.events.cloud.firestore.v1.MapValue.toObject(message.mapValue, options);
                                if (options.oneofs)
                                    object.valueType = "mapValue";
                            }
                            if (message.geoPointValue != null && message.hasOwnProperty("geoPointValue")) {
                                object.geoPointValue = $root.google.type.LatLng.toObject(message.geoPointValue, options);
                                if (options.oneofs)
                                    object.valueType = "geoPointValue";
                            }
                            if (message.arrayValue != null && message.hasOwnProperty("arrayValue")) {
                                object.arrayValue = $root.google.events.cloud.firestore.v1.ArrayValue.toObject(message.arrayValue, options);
                                if (options.oneofs)
                                    object.valueType = "arrayValue";
                            }
                            if (message.timestampValue != null && message.hasOwnProperty("timestampValue")) {
                                object.timestampValue = $root.google.protobuf.Timestamp.toObject(message.timestampValue, options);
                                if (options.oneofs)
                                    object.valueType = "timestampValue";
                            }
                            if (message.nullValue != null && message.hasOwnProperty("nullValue")) {
                                object.nullValue = options.enums === String ? $root.google.protobuf.NullValue[message.nullValue] === undefined ? message.nullValue : $root.google.protobuf.NullValue[message.nullValue] : message.nullValue;
                                if (options.oneofs)
                                    object.valueType = "nullValue";
                            }
                            if (message.stringValue != null && message.hasOwnProperty("stringValue")) {
                                object.stringValue = message.stringValue;
                                if (options.oneofs)
                                    object.valueType = "stringValue";
                            }
                            if (message.bytesValue != null && message.hasOwnProperty("bytesValue")) {
                                object.bytesValue = options.bytes === String ? $util.base64.encode(message.bytesValue, 0, message.bytesValue.length) : options.bytes === Array ? Array.prototype.slice.call(message.bytesValue) : message.bytesValue;
                                if (options.oneofs)
                                    object.valueType = "bytesValue";
                            }
                            return object;
                        };

                        /**
                         * Converts this Value to JSON.
                         * @function toJSON
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        Value.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for Value
                         * @function getTypeUrl
                         * @memberof google.events.cloud.firestore.v1.Value
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        Value.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/google.events.cloud.firestore.v1.Value";
                        };

                        return Value;
                    })();

                    v1.ArrayValue = (function() {

                        /**
                         * Properties of an ArrayValue.
                         * @memberof google.events.cloud.firestore.v1
                         * @interface IArrayValue
                         * @property {Array.<google.events.cloud.firestore.v1.IValue>|null} [values] ArrayValue values
                         */

                        /**
                         * Constructs a new ArrayValue.
                         * @memberof google.events.cloud.firestore.v1
                         * @classdesc Represents an ArrayValue.
                         * @implements IArrayValue
                         * @constructor
                         * @param {google.events.cloud.firestore.v1.IArrayValue=} [properties] Properties to set
                         */
                        function ArrayValue(properties) {
                            this.values = [];
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * ArrayValue values.
                         * @member {Array.<google.events.cloud.firestore.v1.IValue>} values
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @instance
                         */
                        ArrayValue.prototype.values = $util.emptyArray;

                        /**
                         * Creates a new ArrayValue instance using the specified properties.
                         * @function create
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @static
                         * @param {google.events.cloud.firestore.v1.IArrayValue=} [properties] Properties to set
                         * @returns {google.events.cloud.firestore.v1.ArrayValue} ArrayValue instance
                         */
                        ArrayValue.create = function create(properties) {
                            return new ArrayValue(properties);
                        };

                        /**
                         * Encodes the specified ArrayValue message. Does not implicitly {@link google.events.cloud.firestore.v1.ArrayValue.verify|verify} messages.
                         * @function encode
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @static
                         * @param {google.events.cloud.firestore.v1.IArrayValue} message ArrayValue message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ArrayValue.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.values != null && message.values.length)
                                for (var i = 0; i < message.values.length; ++i)
                                    $root.google.events.cloud.firestore.v1.Value.encode(message.values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                            return writer;
                        };

                        /**
                         * Encodes the specified ArrayValue message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.ArrayValue.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @static
                         * @param {google.events.cloud.firestore.v1.IArrayValue} message ArrayValue message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        ArrayValue.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes an ArrayValue message from the specified reader or buffer.
                         * @function decode
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {google.events.cloud.firestore.v1.ArrayValue} ArrayValue
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ArrayValue.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.events.cloud.firestore.v1.ArrayValue();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (!(message.values && message.values.length))
                                            message.values = [];
                                        message.values.push($root.google.events.cloud.firestore.v1.Value.decode(reader, reader.uint32()));
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes an ArrayValue message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {google.events.cloud.firestore.v1.ArrayValue} ArrayValue
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        ArrayValue.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies an ArrayValue message.
                         * @function verify
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        ArrayValue.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.values != null && message.hasOwnProperty("values")) {
                                if (!Array.isArray(message.values))
                                    return "values: array expected";
                                for (var i = 0; i < message.values.length; ++i) {
                                    var error = $root.google.events.cloud.firestore.v1.Value.verify(message.values[i]);
                                    if (error)
                                        return "values." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates an ArrayValue message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {google.events.cloud.firestore.v1.ArrayValue} ArrayValue
                         */
                        ArrayValue.fromObject = function fromObject(object) {
                            if (object instanceof $root.google.events.cloud.firestore.v1.ArrayValue)
                                return object;
                            var message = new $root.google.events.cloud.firestore.v1.ArrayValue();
                            if (object.values) {
                                if (!Array.isArray(object.values))
                                    throw TypeError(".google.events.cloud.firestore.v1.ArrayValue.values: array expected");
                                message.values = [];
                                for (var i = 0; i < object.values.length; ++i) {
                                    if (typeof object.values[i] !== "object")
                                        throw TypeError(".google.events.cloud.firestore.v1.ArrayValue.values: object expected");
                                    message.values[i] = $root.google.events.cloud.firestore.v1.Value.fromObject(object.values[i]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from an ArrayValue message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @static
                         * @param {google.events.cloud.firestore.v1.ArrayValue} message ArrayValue
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        ArrayValue.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            var object = {};
                            if (options.arrays || options.defaults)
                                object.values = [];
                            if (message.values && message.values.length) {
                                object.values = [];
                                for (var j = 0; j < message.values.length; ++j)
                                    object.values[j] = $root.google.events.cloud.firestore.v1.Value.toObject(message.values[j], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this ArrayValue to JSON.
                         * @function toJSON
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        ArrayValue.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for ArrayValue
                         * @function getTypeUrl
                         * @memberof google.events.cloud.firestore.v1.ArrayValue
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        ArrayValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/google.events.cloud.firestore.v1.ArrayValue";
                        };

                        return ArrayValue;
                    })();

                    v1.MapValue = (function() {

                        /**
                         * Properties of a MapValue.
                         * @memberof google.events.cloud.firestore.v1
                         * @interface IMapValue
                         * @property {Object.<string,google.events.cloud.firestore.v1.IValue>|null} [fields] MapValue fields
                         */

                        /**
                         * Constructs a new MapValue.
                         * @memberof google.events.cloud.firestore.v1
                         * @classdesc Represents a MapValue.
                         * @implements IMapValue
                         * @constructor
                         * @param {google.events.cloud.firestore.v1.IMapValue=} [properties] Properties to set
                         */
                        function MapValue(properties) {
                            this.fields = {};
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }

                        /**
                         * MapValue fields.
                         * @member {Object.<string,google.events.cloud.firestore.v1.IValue>} fields
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @instance
                         */
                        MapValue.prototype.fields = $util.emptyObject;

                        /**
                         * Creates a new MapValue instance using the specified properties.
                         * @function create
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @static
                         * @param {google.events.cloud.firestore.v1.IMapValue=} [properties] Properties to set
                         * @returns {google.events.cloud.firestore.v1.MapValue} MapValue instance
                         */
                        MapValue.create = function create(properties) {
                            return new MapValue(properties);
                        };

                        /**
                         * Encodes the specified MapValue message. Does not implicitly {@link google.events.cloud.firestore.v1.MapValue.verify|verify} messages.
                         * @function encode
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @static
                         * @param {google.events.cloud.firestore.v1.IMapValue} message MapValue message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        MapValue.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.fields != null && Object.hasOwnProperty.call(message, "fields"))
                                for (var keys = Object.keys(message.fields), i = 0; i < keys.length; ++i) {
                                    writer.uint32(/* id 1, wireType 2 =*/10).fork().uint32(/* id 1, wireType 2 =*/10).string(keys[i]);
                                    $root.google.events.cloud.firestore.v1.Value.encode(message.fields[keys[i]], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim().ldelim();
                                }
                            return writer;
                        };

                        /**
                         * Encodes the specified MapValue message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.MapValue.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @static
                         * @param {google.events.cloud.firestore.v1.IMapValue} message MapValue message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        MapValue.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };

                        /**
                         * Decodes a MapValue message from the specified reader or buffer.
                         * @function decode
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {google.events.cloud.firestore.v1.MapValue} MapValue
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        MapValue.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.events.cloud.firestore.v1.MapValue(), key, value;
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1: {
                                        if (message.fields === $util.emptyObject)
                                            message.fields = {};
                                        var end2 = reader.uint32() + reader.pos;
                                        key = "";
                                        value = null;
                                        while (reader.pos < end2) {
                                            var tag2 = reader.uint32();
                                            switch (tag2 >>> 3) {
                                            case 1:
                                                key = reader.string();
                                                break;
                                            case 2:
                                                value = $root.google.events.cloud.firestore.v1.Value.decode(reader, reader.uint32());
                                                break;
                                            default:
                                                reader.skipType(tag2 & 7);
                                                break;
                                            }
                                        }
                                        message.fields[key] = value;
                                        break;
                                    }
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };

                        /**
                         * Decodes a MapValue message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {google.events.cloud.firestore.v1.MapValue} MapValue
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        MapValue.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };

                        /**
                         * Verifies a MapValue message.
                         * @function verify
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        MapValue.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.fields != null && message.hasOwnProperty("fields")) {
                                if (!$util.isObject(message.fields))
                                    return "fields: object expected";
                                var key = Object.keys(message.fields);
                                for (var i = 0; i < key.length; ++i) {
                                    var error = $root.google.events.cloud.firestore.v1.Value.verify(message.fields[key[i]]);
                                    if (error)
                                        return "fields." + error;
                                }
                            }
                            return null;
                        };

                        /**
                         * Creates a MapValue message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {google.events.cloud.firestore.v1.MapValue} MapValue
                         */
                        MapValue.fromObject = function fromObject(object) {
                            if (object instanceof $root.google.events.cloud.firestore.v1.MapValue)
                                return object;
                            var message = new $root.google.events.cloud.firestore.v1.MapValue();
                            if (object.fields) {
                                if (typeof object.fields !== "object")
                                    throw TypeError(".google.events.cloud.firestore.v1.MapValue.fields: object expected");
                                message.fields = {};
                                for (var keys = Object.keys(object.fields), i = 0; i < keys.length; ++i) {
                                    if (typeof object.fields[keys[i]] !== "object")
                                        throw TypeError(".google.events.cloud.firestore.v1.MapValue.fields: object expected");
                                    message.fields[keys[i]] = $root.google.events.cloud.firestore.v1.Value.fromObject(object.fields[keys[i]]);
                                }
                            }
                            return message;
                        };

                        /**
                         * Creates a plain object from a MapValue message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @static
                         * @param {google.events.cloud.firestore.v1.MapValue} message MapValue
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        MapValue.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            var object = {};
                            if (options.objects || options.defaults)
                                object.fields = {};
                            var keys2;
                            if (message.fields && (keys2 = Object.keys(message.fields)).length) {
                                object.fields = {};
                                for (var j = 0; j < keys2.length; ++j)
                                    object.fields[keys2[j]] = $root.google.events.cloud.firestore.v1.Value.toObject(message.fields[keys2[j]], options);
                            }
                            return object;
                        };

                        /**
                         * Converts this MapValue to JSON.
                         * @function toJSON
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        MapValue.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };

                        /**
                         * Gets the default type url for MapValue
                         * @function getTypeUrl
                         * @memberof google.events.cloud.firestore.v1.MapValue
                         * @static
                         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns {string} The default type url
                         */
                        MapValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                            if (typeUrlPrefix === undefined) {
                                typeUrlPrefix = "type.googleapis.com";
                            }
                            return typeUrlPrefix + "/google.events.cloud.firestore.v1.MapValue";
                        };

                        return MapValue;
                    })();

                    return v1;
                })();

                return firestore;
            })();

            return cloud;
        })();

        return events;
    })();

    google.type = (function() {

        /**
         * Namespace type.
         * @memberof google
         * @namespace
         */
        var type = {};

        type.LatLng = (function() {

            /**
             * Properties of a LatLng.
             * @memberof google.type
             * @interface ILatLng
             * @property {number|null} [latitude] LatLng latitude
             * @property {number|null} [longitude] LatLng longitude
             */

            /**
             * Constructs a new LatLng.
             * @memberof google.type
             * @classdesc Represents a LatLng.
             * @implements ILatLng
             * @constructor
             * @param {google.type.ILatLng=} [properties] Properties to set
             */
            function LatLng(properties) {
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LatLng latitude.
             * @member {number} latitude
             * @memberof google.type.LatLng
             * @instance
             */
            LatLng.prototype.latitude = 0;

            /**
             * LatLng longitude.
             * @member {number} longitude
             * @memberof google.type.LatLng
             * @instance
             */
            LatLng.prototype.longitude = 0;

            /**
             * Creates a new LatLng instance using the specified properties.
             * @function create
             * @memberof google.type.LatLng
             * @static
             * @param {google.type.ILatLng=} [properties] Properties to set
             * @returns {google.type.LatLng} LatLng instance
             */
            LatLng.create = function create(properties) {
                return new LatLng(properties);
            };

            /**
             * Encodes the specified LatLng message. Does not implicitly {@link google.type.LatLng.verify|verify} messages.
             * @function encode
             * @memberof google.type.LatLng
             * @static
             * @param {google.type.ILatLng} message LatLng message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LatLng.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.latitude != null && Object.hasOwnProperty.call(message, "latitude"))
                    writer.uint32(/* id 1, wireType 1 =*/9).double(message.latitude);
                if (message.longitude != null && Object.hasOwnProperty.call(message, "longitude"))
                    writer.uint32(/* id 2, wireType 1 =*/17).double(message.longitude);
                return writer;
            };

            /**
             * Encodes the specified LatLng message, length delimited. Does not implicitly {@link google.type.LatLng.verify|verify} messages.
             * @function encodeDelimited
             * @memberof google.type.LatLng
             * @static
             * @param {google.type.ILatLng} message LatLng message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LatLng.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a LatLng message from the specified reader or buffer.
             * @function decode
             * @memberof google.type.LatLng
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {google.type.LatLng} LatLng
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LatLng.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.google.type.LatLng();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.latitude = reader.double();
                            break;
                        }
                    case 2: {
                            message.longitude = reader.double();
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a LatLng message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof google.type.LatLng
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {google.type.LatLng} LatLng
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LatLng.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a LatLng message.
             * @function verify
             * @memberof google.type.LatLng
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LatLng.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.latitude != null && message.hasOwnProperty("latitude"))
                    if (typeof message.latitude !== "number")
                        return "latitude: number expected";
                if (message.longitude != null && message.hasOwnProperty("longitude"))
                    if (typeof message.longitude !== "number")
                        return "longitude: number expected";
                return null;
            };

            /**
             * Creates a LatLng message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof google.type.LatLng
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {google.type.LatLng} LatLng
             */
            LatLng.fromObject = function fromObject(object) {
                if (object instanceof $root.google.type.LatLng)
                    return object;
                var message = new $root.google.type.LatLng();
                if (object.latitude != null)
                    message.latitude = Number(object.latitude);
                if (object.longitude != null)
                    message.longitude = Number(object.longitude);
                return message;
            };

            /**
             * Creates a plain object from a LatLng message. Also converts values to other types if specified.
             * @function toObject
             * @memberof google.type.LatLng
             * @static
             * @param {google.type.LatLng} message LatLng
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LatLng.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.defaults) {
                    object.latitude = 0;
                    object.longitude = 0;
                }
                if (message.latitude != null && message.hasOwnProperty("latitude"))
                    object.latitude = options.json && !isFinite(message.latitude) ? String(message.latitude) : message.latitude;
                if (message.longitude != null && message.hasOwnProperty("longitude"))
                    object.longitude = options.json && !isFinite(message.longitude) ? String(message.longitude) : message.longitude;
                return object;
            };

            /**
             * Converts this LatLng to JSON.
             * @function toJSON
             * @memberof google.type.LatLng
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LatLng.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for LatLng
             * @function getTypeUrl
             * @memberof google.type.LatLng
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            LatLng.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/google.type.LatLng";
            };

            return LatLng;
        })();

        return type;
    })();

    return google;
})();

module.exports = $root;
