import * as firestore from "firebase-admin/firestore";
import { Change } from "../../common/change";
import { ParamsOf } from "../../common/params";
import { CloudFunction, Event, EventContext } from "../cloud-functions";
import { DeploymentOptions } from "../function-configuration";
export type DocumentSnapshot = firestore.DocumentSnapshot;
export type QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;
/**
 * Select the Firestore document to listen to for events.
 * @param path Full database path to listen to. This includes the name of
 * the collection that the document is a part of. For example, if the
 * collection is named "users" and the document is named "Ada", then the
 * path is "/users/Ada".
 */
export declare function document<Path extends string>(path: Path): DocumentBuilder<Path>;
export declare function namespace(namespace: string): NamespaceBuilder;
export declare function database(database: string): DatabaseBuilder;
export declare class DatabaseBuilder {
    private database;
    private options;
    constructor(database: string, options: DeploymentOptions);
    namespace(namespace: string): NamespaceBuilder;
    document<Path extends string>(path: Path): DocumentBuilder<Path>;
}
export declare class NamespaceBuilder {
    private database;
    private options;
    private namespace?;
    constructor(database: string, options: DeploymentOptions, namespace?: string);
    document<Path extends string>(path: Path): DocumentBuilder<Path>;
}
export declare function snapshotConstructor(event: Event): DocumentSnapshot;
export declare function beforeSnapshotConstructor(event: Event): DocumentSnapshot;
export declare class DocumentBuilder<Path extends string> {
    private triggerResource;
    private options;
    constructor(triggerResource: () => string, options: DeploymentOptions);
    /** Respond to all document writes (creates, updates, or deletes). */
    onWrite(handler: (change: Change<DocumentSnapshot>, context: EventContext<ParamsOf<Path>>) => PromiseLike<any> | any): CloudFunction<Change<DocumentSnapshot>>;
    /** Respond only to document updates. */
    onUpdate(handler: (change: Change<QueryDocumentSnapshot>, context: EventContext<ParamsOf<Path>>) => PromiseLike<any> | any): CloudFunction<Change<QueryDocumentSnapshot>>;
    /** Respond only to document creations. */
    onCreate(handler: (snapshot: QueryDocumentSnapshot, context: EventContext<ParamsOf<Path>>) => PromiseLike<any> | any): CloudFunction<QueryDocumentSnapshot>;
    /** Respond only to document deletions. */
    onDelete(handler: (snapshot: QueryDocumentSnapshot, context: EventContext<ParamsOf<Path>>) => PromiseLike<any> | any): CloudFunction<QueryDocumentSnapshot>;
    private onOperation;
}
