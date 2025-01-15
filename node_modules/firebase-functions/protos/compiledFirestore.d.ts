import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace google. */
export namespace google {

    /** Namespace protobuf. */
    namespace protobuf {

        /** Properties of a Struct. */
        interface IStruct {

            /** Struct fields */
            fields?: ({ [k: string]: google.protobuf.IValue }|null);
        }

        /** Represents a Struct. */
        class Struct implements IStruct {

            /**
             * Constructs a new Struct.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IStruct);

            /** Struct fields. */
            public fields: { [k: string]: google.protobuf.IValue };

            /**
             * Creates a new Struct instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Struct instance
             */
            public static create(properties?: google.protobuf.IStruct): google.protobuf.Struct;

            /**
             * Encodes the specified Struct message. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @param message Struct message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IStruct, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Struct message, length delimited. Does not implicitly {@link google.protobuf.Struct.verify|verify} messages.
             * @param message Struct message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IStruct, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Struct message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Struct;

            /**
             * Decodes a Struct message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Struct
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Struct;

            /**
             * Verifies a Struct message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Struct message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Struct
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Struct;

            /**
             * Creates a plain object from a Struct message. Also converts values to other types if specified.
             * @param message Struct
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Struct, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Struct to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Struct
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Value. */
        interface IValue {

            /** Value nullValue */
            nullValue?: (google.protobuf.NullValue|null);

            /** Value numberValue */
            numberValue?: (number|null);

            /** Value stringValue */
            stringValue?: (string|null);

            /** Value boolValue */
            boolValue?: (boolean|null);

            /** Value structValue */
            structValue?: (google.protobuf.IStruct|null);

            /** Value listValue */
            listValue?: (google.protobuf.IListValue|null);
        }

        /** Represents a Value. */
        class Value implements IValue {

            /**
             * Constructs a new Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IValue);

            /** Value nullValue. */
            public nullValue?: (google.protobuf.NullValue|null);

            /** Value numberValue. */
            public numberValue?: (number|null);

            /** Value stringValue. */
            public stringValue?: (string|null);

            /** Value boolValue. */
            public boolValue?: (boolean|null);

            /** Value structValue. */
            public structValue?: (google.protobuf.IStruct|null);

            /** Value listValue. */
            public listValue?: (google.protobuf.IListValue|null);

            /** Value kind. */
            public kind?: ("nullValue"|"numberValue"|"stringValue"|"boolValue"|"structValue"|"listValue");

            /**
             * Creates a new Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Value instance
             */
            public static create(properties?: google.protobuf.IValue): google.protobuf.Value;

            /**
             * Encodes the specified Value message. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @param message Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Value message, length delimited. Does not implicitly {@link google.protobuf.Value.verify|verify} messages.
             * @param message Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Value;

            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Value;

            /**
             * Verifies a Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Value
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Value;

            /**
             * Creates a plain object from a Value message. Also converts values to other types if specified.
             * @param message Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** NullValue enum. */
        enum NullValue {
            NULL_VALUE = 0
        }

        /** Properties of a ListValue. */
        interface IListValue {

            /** ListValue values */
            values?: (google.protobuf.IValue[]|null);
        }

        /** Represents a ListValue. */
        class ListValue implements IListValue {

            /**
             * Constructs a new ListValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IListValue);

            /** ListValue values. */
            public values: google.protobuf.IValue[];

            /**
             * Creates a new ListValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns ListValue instance
             */
            public static create(properties?: google.protobuf.IListValue): google.protobuf.ListValue;

            /**
             * Encodes the specified ListValue message. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @param message ListValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IListValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified ListValue message, length delimited. Does not implicitly {@link google.protobuf.ListValue.verify|verify} messages.
             * @param message ListValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IListValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a ListValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.ListValue;

            /**
             * Decodes a ListValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns ListValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.ListValue;

            /**
             * Verifies a ListValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a ListValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns ListValue
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.ListValue;

            /**
             * Creates a plain object from a ListValue message. Also converts values to other types if specified.
             * @param message ListValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.ListValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this ListValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for ListValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Timestamp. */
        interface ITimestamp {

            /** Timestamp seconds */
            seconds?: (number|Long|null);

            /** Timestamp nanos */
            nanos?: (number|null);
        }

        /** Represents a Timestamp. */
        class Timestamp implements ITimestamp {

            /**
             * Constructs a new Timestamp.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.ITimestamp);

            /** Timestamp seconds. */
            public seconds: (number|Long);

            /** Timestamp nanos. */
            public nanos: number;

            /**
             * Creates a new Timestamp instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Timestamp instance
             */
            public static create(properties?: google.protobuf.ITimestamp): google.protobuf.Timestamp;

            /**
             * Encodes the specified Timestamp message. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Timestamp message, length delimited. Does not implicitly {@link google.protobuf.Timestamp.verify|verify} messages.
             * @param message Timestamp message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.ITimestamp, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Timestamp message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Timestamp;

            /**
             * Decodes a Timestamp message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Timestamp
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Timestamp;

            /**
             * Verifies a Timestamp message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Timestamp message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Timestamp
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Timestamp;

            /**
             * Creates a plain object from a Timestamp message. Also converts values to other types if specified.
             * @param message Timestamp
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Timestamp, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Timestamp to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Timestamp
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of an Any. */
        interface IAny {

            /** Any typeUrl */
            typeUrl?: (string|null);

            /** Any value */
            value?: (Uint8Array|null);
        }

        /** Represents an Any. */
        class Any implements IAny {

            /**
             * Constructs a new Any.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.protobuf.IAny);

            /** Any typeUrl. */
            public typeUrl: string;

            /** Any value. */
            public value: Uint8Array;

            /**
             * Creates a new Any instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Any instance
             */
            public static create(properties?: google.protobuf.IAny): google.protobuf.Any;

            /**
             * Encodes the specified Any message. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Any message, length delimited. Does not implicitly {@link google.protobuf.Any.verify|verify} messages.
             * @param message Any message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.protobuf.IAny, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an Any message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.protobuf.Any;

            /**
             * Decodes an Any message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Any
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.protobuf.Any;

            /**
             * Verifies an Any message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an Any message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Any
             */
            public static fromObject(object: { [k: string]: any }): google.protobuf.Any;

            /**
             * Creates a plain object from an Any message. Also converts values to other types if specified.
             * @param message Any
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.protobuf.Any, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Any to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Any
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }

    /** Namespace events. */
    namespace events {

        /** Namespace cloud. */
        namespace cloud {

            /** Namespace firestore. */
            namespace firestore {

                /** Namespace v1. */
                namespace v1 {

                    /** Properties of a DocumentEventData. */
                    interface IDocumentEventData {

                        /** DocumentEventData value */
                        value?: (google.events.cloud.firestore.v1.IDocument|null);

                        /** DocumentEventData oldValue */
                        oldValue?: (google.events.cloud.firestore.v1.IDocument|null);

                        /** DocumentEventData updateMask */
                        updateMask?: (google.events.cloud.firestore.v1.IDocumentMask|null);
                    }

                    /** Represents a DocumentEventData. */
                    class DocumentEventData implements IDocumentEventData {

                        /**
                         * Constructs a new DocumentEventData.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.events.cloud.firestore.v1.IDocumentEventData);

                        /** DocumentEventData value. */
                        public value?: (google.events.cloud.firestore.v1.IDocument|null);

                        /** DocumentEventData oldValue. */
                        public oldValue?: (google.events.cloud.firestore.v1.IDocument|null);

                        /** DocumentEventData updateMask. */
                        public updateMask?: (google.events.cloud.firestore.v1.IDocumentMask|null);

                        /**
                         * Creates a new DocumentEventData instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns DocumentEventData instance
                         */
                        public static create(properties?: google.events.cloud.firestore.v1.IDocumentEventData): google.events.cloud.firestore.v1.DocumentEventData;

                        /**
                         * Encodes the specified DocumentEventData message. Does not implicitly {@link google.events.cloud.firestore.v1.DocumentEventData.verify|verify} messages.
                         * @param message DocumentEventData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.events.cloud.firestore.v1.IDocumentEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified DocumentEventData message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.DocumentEventData.verify|verify} messages.
                         * @param message DocumentEventData message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.events.cloud.firestore.v1.IDocumentEventData, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DocumentEventData message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DocumentEventData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.events.cloud.firestore.v1.DocumentEventData;

                        /**
                         * Decodes a DocumentEventData message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns DocumentEventData
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.events.cloud.firestore.v1.DocumentEventData;

                        /**
                         * Verifies a DocumentEventData message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a DocumentEventData message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns DocumentEventData
                         */
                        public static fromObject(object: { [k: string]: any }): google.events.cloud.firestore.v1.DocumentEventData;

                        /**
                         * Creates a plain object from a DocumentEventData message. Also converts values to other types if specified.
                         * @param message DocumentEventData
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.events.cloud.firestore.v1.DocumentEventData, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this DocumentEventData to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for DocumentEventData
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a DocumentMask. */
                    interface IDocumentMask {

                        /** DocumentMask fieldPaths */
                        fieldPaths?: (string[]|null);
                    }

                    /** Represents a DocumentMask. */
                    class DocumentMask implements IDocumentMask {

                        /**
                         * Constructs a new DocumentMask.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.events.cloud.firestore.v1.IDocumentMask);

                        /** DocumentMask fieldPaths. */
                        public fieldPaths: string[];

                        /**
                         * Creates a new DocumentMask instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns DocumentMask instance
                         */
                        public static create(properties?: google.events.cloud.firestore.v1.IDocumentMask): google.events.cloud.firestore.v1.DocumentMask;

                        /**
                         * Encodes the specified DocumentMask message. Does not implicitly {@link google.events.cloud.firestore.v1.DocumentMask.verify|verify} messages.
                         * @param message DocumentMask message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.events.cloud.firestore.v1.IDocumentMask, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified DocumentMask message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.DocumentMask.verify|verify} messages.
                         * @param message DocumentMask message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.events.cloud.firestore.v1.IDocumentMask, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a DocumentMask message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns DocumentMask
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.events.cloud.firestore.v1.DocumentMask;

                        /**
                         * Decodes a DocumentMask message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns DocumentMask
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.events.cloud.firestore.v1.DocumentMask;

                        /**
                         * Verifies a DocumentMask message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a DocumentMask message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns DocumentMask
                         */
                        public static fromObject(object: { [k: string]: any }): google.events.cloud.firestore.v1.DocumentMask;

                        /**
                         * Creates a plain object from a DocumentMask message. Also converts values to other types if specified.
                         * @param message DocumentMask
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.events.cloud.firestore.v1.DocumentMask, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this DocumentMask to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for DocumentMask
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a Document. */
                    interface IDocument {

                        /** Document name */
                        name?: (string|null);

                        /** Document fields */
                        fields?: ({ [k: string]: google.events.cloud.firestore.v1.IValue }|null);

                        /** Document createTime */
                        createTime?: (google.protobuf.ITimestamp|null);

                        /** Document updateTime */
                        updateTime?: (google.protobuf.ITimestamp|null);
                    }

                    /** Represents a Document. */
                    class Document implements IDocument {

                        /**
                         * Constructs a new Document.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.events.cloud.firestore.v1.IDocument);

                        /** Document name. */
                        public name: string;

                        /** Document fields. */
                        public fields: { [k: string]: google.events.cloud.firestore.v1.IValue };

                        /** Document createTime. */
                        public createTime?: (google.protobuf.ITimestamp|null);

                        /** Document updateTime. */
                        public updateTime?: (google.protobuf.ITimestamp|null);

                        /**
                         * Creates a new Document instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Document instance
                         */
                        public static create(properties?: google.events.cloud.firestore.v1.IDocument): google.events.cloud.firestore.v1.Document;

                        /**
                         * Encodes the specified Document message. Does not implicitly {@link google.events.cloud.firestore.v1.Document.verify|verify} messages.
                         * @param message Document message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.events.cloud.firestore.v1.IDocument, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Document message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.Document.verify|verify} messages.
                         * @param message Document message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.events.cloud.firestore.v1.IDocument, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Document message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Document
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.events.cloud.firestore.v1.Document;

                        /**
                         * Decodes a Document message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Document
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.events.cloud.firestore.v1.Document;

                        /**
                         * Verifies a Document message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Document message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Document
                         */
                        public static fromObject(object: { [k: string]: any }): google.events.cloud.firestore.v1.Document;

                        /**
                         * Creates a plain object from a Document message. Also converts values to other types if specified.
                         * @param message Document
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.events.cloud.firestore.v1.Document, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Document to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for Document
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a Value. */
                    interface IValue {

                        /** Value nullValue */
                        nullValue?: (google.protobuf.NullValue|null);

                        /** Value booleanValue */
                        booleanValue?: (boolean|null);

                        /** Value integerValue */
                        integerValue?: (number|Long|null);

                        /** Value doubleValue */
                        doubleValue?: (number|null);

                        /** Value timestampValue */
                        timestampValue?: (google.protobuf.ITimestamp|null);

                        /** Value stringValue */
                        stringValue?: (string|null);

                        /** Value bytesValue */
                        bytesValue?: (Uint8Array|null);

                        /** Value referenceValue */
                        referenceValue?: (string|null);

                        /** Value geoPointValue */
                        geoPointValue?: (google.type.ILatLng|null);

                        /** Value arrayValue */
                        arrayValue?: (google.events.cloud.firestore.v1.IArrayValue|null);

                        /** Value mapValue */
                        mapValue?: (google.events.cloud.firestore.v1.IMapValue|null);
                    }

                    /** Represents a Value. */
                    class Value implements IValue {

                        /**
                         * Constructs a new Value.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.events.cloud.firestore.v1.IValue);

                        /** Value nullValue. */
                        public nullValue?: (google.protobuf.NullValue|null);

                        /** Value booleanValue. */
                        public booleanValue?: (boolean|null);

                        /** Value integerValue. */
                        public integerValue?: (number|Long|null);

                        /** Value doubleValue. */
                        public doubleValue?: (number|null);

                        /** Value timestampValue. */
                        public timestampValue?: (google.protobuf.ITimestamp|null);

                        /** Value stringValue. */
                        public stringValue?: (string|null);

                        /** Value bytesValue. */
                        public bytesValue?: (Uint8Array|null);

                        /** Value referenceValue. */
                        public referenceValue?: (string|null);

                        /** Value geoPointValue. */
                        public geoPointValue?: (google.type.ILatLng|null);

                        /** Value arrayValue. */
                        public arrayValue?: (google.events.cloud.firestore.v1.IArrayValue|null);

                        /** Value mapValue. */
                        public mapValue?: (google.events.cloud.firestore.v1.IMapValue|null);

                        /** Value valueType. */
                        public valueType?: ("nullValue"|"booleanValue"|"integerValue"|"doubleValue"|"timestampValue"|"stringValue"|"bytesValue"|"referenceValue"|"geoPointValue"|"arrayValue"|"mapValue");

                        /**
                         * Creates a new Value instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns Value instance
                         */
                        public static create(properties?: google.events.cloud.firestore.v1.IValue): google.events.cloud.firestore.v1.Value;

                        /**
                         * Encodes the specified Value message. Does not implicitly {@link google.events.cloud.firestore.v1.Value.verify|verify} messages.
                         * @param message Value message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.events.cloud.firestore.v1.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified Value message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.Value.verify|verify} messages.
                         * @param message Value message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.events.cloud.firestore.v1.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a Value message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns Value
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.events.cloud.firestore.v1.Value;

                        /**
                         * Decodes a Value message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns Value
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.events.cloud.firestore.v1.Value;

                        /**
                         * Verifies a Value message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a Value message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns Value
                         */
                        public static fromObject(object: { [k: string]: any }): google.events.cloud.firestore.v1.Value;

                        /**
                         * Creates a plain object from a Value message. Also converts values to other types if specified.
                         * @param message Value
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.events.cloud.firestore.v1.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this Value to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for Value
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of an ArrayValue. */
                    interface IArrayValue {

                        /** ArrayValue values */
                        values?: (google.events.cloud.firestore.v1.IValue[]|null);
                    }

                    /** Represents an ArrayValue. */
                    class ArrayValue implements IArrayValue {

                        /**
                         * Constructs a new ArrayValue.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.events.cloud.firestore.v1.IArrayValue);

                        /** ArrayValue values. */
                        public values: google.events.cloud.firestore.v1.IValue[];

                        /**
                         * Creates a new ArrayValue instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns ArrayValue instance
                         */
                        public static create(properties?: google.events.cloud.firestore.v1.IArrayValue): google.events.cloud.firestore.v1.ArrayValue;

                        /**
                         * Encodes the specified ArrayValue message. Does not implicitly {@link google.events.cloud.firestore.v1.ArrayValue.verify|verify} messages.
                         * @param message ArrayValue message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.events.cloud.firestore.v1.IArrayValue, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified ArrayValue message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.ArrayValue.verify|verify} messages.
                         * @param message ArrayValue message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.events.cloud.firestore.v1.IArrayValue, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes an ArrayValue message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns ArrayValue
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.events.cloud.firestore.v1.ArrayValue;

                        /**
                         * Decodes an ArrayValue message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns ArrayValue
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.events.cloud.firestore.v1.ArrayValue;

                        /**
                         * Verifies an ArrayValue message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates an ArrayValue message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns ArrayValue
                         */
                        public static fromObject(object: { [k: string]: any }): google.events.cloud.firestore.v1.ArrayValue;

                        /**
                         * Creates a plain object from an ArrayValue message. Also converts values to other types if specified.
                         * @param message ArrayValue
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.events.cloud.firestore.v1.ArrayValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this ArrayValue to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for ArrayValue
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }

                    /** Properties of a MapValue. */
                    interface IMapValue {

                        /** MapValue fields */
                        fields?: ({ [k: string]: google.events.cloud.firestore.v1.IValue }|null);
                    }

                    /** Represents a MapValue. */
                    class MapValue implements IMapValue {

                        /**
                         * Constructs a new MapValue.
                         * @param [properties] Properties to set
                         */
                        constructor(properties?: google.events.cloud.firestore.v1.IMapValue);

                        /** MapValue fields. */
                        public fields: { [k: string]: google.events.cloud.firestore.v1.IValue };

                        /**
                         * Creates a new MapValue instance using the specified properties.
                         * @param [properties] Properties to set
                         * @returns MapValue instance
                         */
                        public static create(properties?: google.events.cloud.firestore.v1.IMapValue): google.events.cloud.firestore.v1.MapValue;

                        /**
                         * Encodes the specified MapValue message. Does not implicitly {@link google.events.cloud.firestore.v1.MapValue.verify|verify} messages.
                         * @param message MapValue message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encode(message: google.events.cloud.firestore.v1.IMapValue, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Encodes the specified MapValue message, length delimited. Does not implicitly {@link google.events.cloud.firestore.v1.MapValue.verify|verify} messages.
                         * @param message MapValue message or plain object to encode
                         * @param [writer] Writer to encode to
                         * @returns Writer
                         */
                        public static encodeDelimited(message: google.events.cloud.firestore.v1.IMapValue, writer?: $protobuf.Writer): $protobuf.Writer;

                        /**
                         * Decodes a MapValue message from the specified reader or buffer.
                         * @param reader Reader or buffer to decode from
                         * @param [length] Message length if known beforehand
                         * @returns MapValue
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.events.cloud.firestore.v1.MapValue;

                        /**
                         * Decodes a MapValue message from the specified reader or buffer, length delimited.
                         * @param reader Reader or buffer to decode from
                         * @returns MapValue
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.events.cloud.firestore.v1.MapValue;

                        /**
                         * Verifies a MapValue message.
                         * @param message Plain object to verify
                         * @returns `null` if valid, otherwise the reason why it is not
                         */
                        public static verify(message: { [k: string]: any }): (string|null);

                        /**
                         * Creates a MapValue message from a plain object. Also converts values to their respective internal types.
                         * @param object Plain object
                         * @returns MapValue
                         */
                        public static fromObject(object: { [k: string]: any }): google.events.cloud.firestore.v1.MapValue;

                        /**
                         * Creates a plain object from a MapValue message. Also converts values to other types if specified.
                         * @param message MapValue
                         * @param [options] Conversion options
                         * @returns Plain object
                         */
                        public static toObject(message: google.events.cloud.firestore.v1.MapValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

                        /**
                         * Converts this MapValue to JSON.
                         * @returns JSON object
                         */
                        public toJSON(): { [k: string]: any };

                        /**
                         * Gets the default type url for MapValue
                         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
                         * @returns The default type url
                         */
                        public static getTypeUrl(typeUrlPrefix?: string): string;
                    }
                }
            }
        }
    }

    /** Namespace type. */
    namespace type {

        /** Properties of a LatLng. */
        interface ILatLng {

            /** LatLng latitude */
            latitude?: (number|null);

            /** LatLng longitude */
            longitude?: (number|null);
        }

        /** Represents a LatLng. */
        class LatLng implements ILatLng {

            /**
             * Constructs a new LatLng.
             * @param [properties] Properties to set
             */
            constructor(properties?: google.type.ILatLng);

            /** LatLng latitude. */
            public latitude: number;

            /** LatLng longitude. */
            public longitude: number;

            /**
             * Creates a new LatLng instance using the specified properties.
             * @param [properties] Properties to set
             * @returns LatLng instance
             */
            public static create(properties?: google.type.ILatLng): google.type.LatLng;

            /**
             * Encodes the specified LatLng message. Does not implicitly {@link google.type.LatLng.verify|verify} messages.
             * @param message LatLng message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: google.type.ILatLng, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified LatLng message, length delimited. Does not implicitly {@link google.type.LatLng.verify|verify} messages.
             * @param message LatLng message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: google.type.ILatLng, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LatLng message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LatLng
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): google.type.LatLng;

            /**
             * Decodes a LatLng message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns LatLng
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): google.type.LatLng;

            /**
             * Verifies a LatLng message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LatLng message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LatLng
             */
            public static fromObject(object: { [k: string]: any }): google.type.LatLng;

            /**
             * Creates a plain object from a LatLng message. Also converts values to other types if specified.
             * @param message LatLng
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: google.type.LatLng, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LatLng to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for LatLng
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
