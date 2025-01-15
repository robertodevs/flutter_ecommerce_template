/**
 * @hidden
 * @alpha
 */
import { BooleanParam, Expression, IntParam, Param, ParamOptions, SecretParam, StringParam, ListParam } from "./types";
export { BUCKET_PICKER, TextInput, SelectInput, SelectOptions, MultiSelectInput, select, multiSelect, } from "./types";
export { ParamOptions, Expression };
type SecretOrExpr = Param<any> | SecretParam;
export declare const declaredParams: SecretOrExpr[];
/**
 * A built-in parameter that resolves to the default RTDB database URL associated
 * with the project, without prompting the deployer. Empty string if none exists.
 */
export declare const databaseURL: Param<string>;
/**
 * A built-in parameter that resolves to the Cloud project ID associated with
 * the project, without prompting the deployer.
 */
export declare const projectID: Param<string>;
/**
 * A built-in parameter that resolves to the Cloud project ID, without prompting
 * the deployer.
 */
export declare const gcloudProject: Param<string>;
/**
 * A builtin parameter that resolves to the Cloud storage bucket associated
 * with the function, without prompting the deployer. Empty string if not
 * defined.
 */
export declare const storageBucket: Param<string>;
/**
 * Declares a secret param, that will persist values only in Cloud Secret Manager.
 * Secrets are stored internally as bytestrings. Use `ParamOptions.as` to provide type
 * hinting during parameter resolution.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @returns A parameter with a `string` return type for `.value`.
 */
export declare function defineSecret(name: string): SecretParam;
/**
 * Declare a string parameter.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @param options Configuration options for the parameter.
 * @returns A parameter with a `string` return type for `.value`.
 */
export declare function defineString(name: string, options?: ParamOptions<string>): StringParam;
/**
 * Declare a boolean parameter.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @param options Configuration options for the parameter.
 * @returns A parameter with a `boolean` return type for `.value`.
 */
export declare function defineBoolean(name: string, options?: ParamOptions<boolean>): BooleanParam;
/**
 * Declare an integer parameter.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @param options Configuration options for the parameter.
 * @returns A parameter with a `number` return type for `.value`.
 */
export declare function defineInt(name: string, options?: ParamOptions<number>): IntParam;
/**
 * Declare a list parameter.
 *
 * @param name The name of the environment variable to use to load the parameter.
 * @param options Configuration options for the parameter.
 * @returns A parameter with a `string[]` return type for `.value`.
 */
export declare function defineList(name: string, options?: ParamOptions<string[]>): ListParam;
