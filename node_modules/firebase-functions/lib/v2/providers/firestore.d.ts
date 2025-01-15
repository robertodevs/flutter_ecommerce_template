import * as firestore from "firebase-admin/firestore";
import { ParamsOf } from "../../common/params";
import { Change, CloudEvent, CloudFunction } from "../core";
import { EventHandlerOptions } from "../options";
import { Expression } from "../../params";
export { Change };
/** A Firestore DocumentSnapshot */
export type DocumentSnapshot = firestore.DocumentSnapshot;
/** A Firestore QueryDocumentSnapshot */
export type QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
/**
 * AuthType defines the possible values for the authType field in a Firestore event with auth context.
 * - service_account: a non-user principal used to identify a workload or machine user.
 * - api_key: a non-user client API key.
 * - system: an obscured identity used when Cloud Platform or another system triggered the event. Examples include a database record which was deleted based on a TTL.
 * - unauthenticated: an unauthenticated action.
 * - unknown: a general type to capture all other principals not captured in the other auth types.
 */
export type AuthType = "service_account" | "api_key" | "system" | "unauthenticated" | "unknown";
/** A CloudEvent that contains a DocumentSnapshot or a Change<DocumentSnapshot> */
export interface FirestoreEvent<T, Params = Record<string, string>> extends CloudEvent<T> {
    /** The location of the Firestore instance */
    location: string;
    /** The project identifier */
    project: string;
    /** The Firestore database */
    database: string;
    /** The Firestore namespace */
    namespace: string;
    /** The document path */
    document: string;
    /**
     * An object containing the values of the path patterns.
     * Only named capture groups will be populated - {key}, {key=*}, {key=**}
     */
    params: Params;
}
export interface FirestoreAuthEvent<T, Params = Record<string, string>> extends FirestoreEvent<T, Params> {
    /** The type of principal that triggered the event */
    authType: AuthType;
    /** The unique identifier for the principal */
    authId?: string;
}
/** DocumentOptions extend EventHandlerOptions with provided document and optional database and namespace.  */
export interface DocumentOptions<Document extends string = string> extends EventHandlerOptions {
    /** The document path */
    document: Document | Expression<string>;
    /** The Firestore database */
    database?: string | Expression<string>;
    /** The Firestore namespace */
    namespace?: string | Expression<string>;
}
/**
 * Event handler that triggers when a document is created, updated, or deleted in Firestore.
 *
 * @param document - The Firestore document path to trigger on.
 * @param handler - Event handler which is run every time a Firestore create, update, or delete occurs.
 */
export declare function onDocumentWritten<Document extends string>(document: Document, handler: (event: FirestoreEvent<Change<DocumentSnapshot> | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreEvent<Change<DocumentSnapshot> | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is created, updated, or deleted in Firestore.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Firestore create, update, or delete occurs.
 */
export declare function onDocumentWritten<Document extends string>(opts: DocumentOptions<Document>, handler: (event: FirestoreEvent<Change<DocumentSnapshot> | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreEvent<Change<DocumentSnapshot> | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is created, updated, or deleted in Firestore.
 * This trigger also provides the authentication context of the principal who triggered the event.
 *
 * @param document - The Firestore document path to trigger on.
 * @param handler - Event handler which is run every time a Firestore create, update, or delete occurs.
 */
export declare function onDocumentWrittenWithAuthContext<Document extends string>(document: Document, handler: (event: FirestoreAuthEvent<Change<DocumentSnapshot> | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreAuthEvent<Change<DocumentSnapshot> | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is created, updated, or deleted in Firestore.
 * This trigger also provides the authentication context of the principal who triggered the event.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Firestore create, update, or delete occurs.
 */
export declare function onDocumentWrittenWithAuthContext<Document extends string>(opts: DocumentOptions<Document>, handler: (event: FirestoreAuthEvent<Change<DocumentSnapshot> | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreAuthEvent<Change<DocumentSnapshot> | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is created in Firestore.
 *
 * @param document - The Firestore document path to trigger on.
 * @param handler - Event handler which is run every time a Firestore create occurs.
 */
export declare function onDocumentCreated<Document extends string>(document: Document, handler: (event: FirestoreEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is created in Firestore.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Firestore create occurs.
 */
export declare function onDocumentCreated<Document extends string>(opts: DocumentOptions<Document>, handler: (event: FirestoreEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is created in Firestore.
 * This trigger also provides the authentication context of the principal who triggered the event.
 *
 * @param document - The Firestore document path to trigger on.
 * @param handler - Event handler which is run every time a Firestore create occurs.
 */
export declare function onDocumentCreatedWithAuthContext<Document extends string>(document: Document, handler: (event: FirestoreAuthEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreAuthEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is created in Firestore.
 * This trigger also provides the authentication context of the principal who triggered the event.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Firestore create occurs.
 */
export declare function onDocumentCreatedWithAuthContext<Document extends string>(opts: DocumentOptions<Document>, handler: (event: FirestoreAuthEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreAuthEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is updated in Firestore.
 *
 * @param document - The Firestore document path to trigger on.
 * @param handler - Event handler which is run every time a Firestore update occurs.
 */
export declare function onDocumentUpdated<Document extends string>(document: Document, handler: (event: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is updated in Firestore.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Firestore update occurs.
 */
export declare function onDocumentUpdated<Document extends string>(opts: DocumentOptions<Document>, handler: (event: FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreEvent<Change<QueryDocumentSnapshot> | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is updated in Firestore.
 * This trigger also provides the authentication context of the principal who triggered the event.
 *
 * @param document - The Firestore document path to trigger on.
 * @param handler - Event handler which is run every time a Firestore update occurs.
 */
export declare function onDocumentUpdatedWithAuthContext<Document extends string>(document: Document, handler: (event: FirestoreAuthEvent<Change<QueryDocumentSnapshot> | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreAuthEvent<Change<QueryDocumentSnapshot> | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is updated in Firestore.
 * This trigger also provides the authentication context of the principal who triggered the event.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Firestore update occurs.
 */
export declare function onDocumentUpdatedWithAuthContext<Document extends string>(opts: DocumentOptions<Document>, handler: (event: FirestoreAuthEvent<Change<QueryDocumentSnapshot> | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreAuthEvent<Change<QueryDocumentSnapshot> | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is deleted in Firestore.
 *
 * @param document - The Firestore document path to trigger on.
 * @param handler - Event handler which is run every time a Firestore delete occurs.
 */
export declare function onDocumentDeleted<Document extends string>(document: Document, handler: (event: FirestoreEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is deleted in Firestore.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Firestore delete occurs.
 */
export declare function onDocumentDeleted<Document extends string>(opts: DocumentOptions<Document>, handler: (event: FirestoreEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is deleted in Firestore.
 * This trigger also provides the authentication context of the principal who triggered the event.
 *
 * @param document - The Firestore document path to trigger on.
 * @param handler - Event handler which is run every time a Firestore delete occurs.
 */
export declare function onDocumentDeletedWithAuthContext<Document extends string>(document: Document, handler: (event: FirestoreAuthEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreAuthEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>>;
/**
 * Event handler that triggers when a document is deleted in Firestore.
 * This trigger also provides the authentication context of the principal who triggered the event.
 *
 * @param opts - Options that can be set on an individual event-handling function.
 * @param handler - Event handler which is run every time a Firestore delete occurs.
 */
export declare function onDocumentDeletedWithAuthContext<Document extends string>(opts: DocumentOptions<Document>, handler: (event: FirestoreAuthEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>) => any | Promise<any>): CloudFunction<FirestoreAuthEvent<QueryDocumentSnapshot | undefined, ParamsOf<Document>>>;
