import * as express from "express";
import { CallableContext, FunctionsErrorCode, HttpsError, Request } from "../../common/providers/https";
import { HttpsFunction, Runnable } from "../cloud-functions";
export { Request, CallableContext, FunctionsErrorCode, HttpsError };
/**
 * Handle HTTP requests.
 * @param handler A function that takes a request and response object,
 * same signature as an Express app.
 */
export declare function onRequest(handler: (req: Request, resp: express.Response) => void | Promise<void>): HttpsFunction;
/**
 * Declares a callable method for clients to call using a Firebase SDK.
 * @param handler A method that takes a data and context and returns a value.
 */
export declare function onCall(handler: (data: any, context: CallableContext) => any | Promise<any>): HttpsFunction & Runnable<any>;
