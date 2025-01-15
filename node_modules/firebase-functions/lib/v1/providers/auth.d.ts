import { AuthEventContext, AuthUserRecord, BeforeCreateResponse, BeforeEmailResponse, BeforeSignInResponse, BeforeSmsResponse, HttpsError, MaybeAsync, UserInfo, UserRecord, userRecordConstructor, UserRecordMetadata } from "../../common/providers/identity";
import { BlockingFunction, CloudFunction, EventContext } from "../cloud-functions";
export { UserRecord, UserInfo, UserRecordMetadata, userRecordConstructor };
export { HttpsError };
/**
 * Options for Auth blocking function.
 */
export interface UserOptions {
    /** Options to set configuration at the resource level for blocking functions. */
    blockingOptions?: {
        /** Pass the ID Token credential to the function. */
        idToken?: boolean;
        /** Pass the Access Token credential to the function. */
        accessToken?: boolean;
        /** Pass the Refresh Token credential to the function. */
        refreshToken?: boolean;
    };
}
/**
 * Handles events related to Firebase Auth users events.
 *
 * @param userOptions - Resource level options
 * @returns UserBuilder - Builder used to create functions for Firebase Auth user lifecycle events
 *
 * @public
 */
export declare function user(userOptions?: UserOptions): UserBuilder;
/**
 * Builder used to create functions for Firebase Auth user lifecycle events.
 * @public
 */
export declare class UserBuilder {
    private triggerResource;
    private options;
    private userOptions?;
    private static dataConstructor;
    /**
     * Responds to the creation of a Firebase Auth user.
     *
     * @param handler Event handler that responds to the creation of a Firebase Auth user.
     *
     * @public
     */
    onCreate(handler: (user: UserRecord, context: EventContext) => PromiseLike<any> | any): CloudFunction<UserRecord>;
    /**
     * Responds to the deletion of a Firebase Auth user.
     *
     * @param handler Event handler that responds to the deletion of a Firebase Auth user.
     *
     * @public
     */
    onDelete(handler: (user: UserRecord, context: EventContext) => PromiseLike<any> | any): CloudFunction<UserRecord>;
    /**
     * Blocks request to create a Firebase Auth user.
     *
     * @param handler Event handler that blocks creation of a Firebase Auth user.
     *
     * @public
     */
    beforeCreate(handler: (user: AuthUserRecord, context: AuthEventContext) => MaybeAsync<BeforeCreateResponse | void>): BlockingFunction;
    /**
     * Blocks request to sign-in a Firebase Auth user.
     *
     * @param handler Event handler that blocks sign-in of a Firebase Auth user.
     *
     * @public
     */
    beforeSignIn(handler: (user: AuthUserRecord, context: AuthEventContext) => MaybeAsync<BeforeSignInResponse | void>): BlockingFunction;
    beforeEmail(handler: (context: AuthEventContext) => MaybeAsync<BeforeEmailResponse | void>): BlockingFunction;
    beforeSms(handler: (context: AuthEventContext) => MaybeAsync<BeforeSmsResponse | void>): BlockingFunction;
    private onOperation;
    private beforeOperation;
}
