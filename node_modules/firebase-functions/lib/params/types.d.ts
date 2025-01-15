export declare abstract class Expression<T extends string | number | boolean | string[]> {
    /** Returns the expression's runtime value, based on the CLI's resolution of parameters. */
    value(): T;
    /** Returns the expression's representation as a braced CEL expression. */
    toCEL(): string;
    /** Returns the expression's representation as JSON. */
    toJSON(): string;
}
/**
 * A CEL expression corresponding to a ternary operator, e.g {{ cond ? ifTrue : ifFalse }}
 */
export declare class TernaryExpression<T extends string | number | boolean | string[]> extends Expression<T> {
    private readonly test;
    private readonly ifTrue;
    private readonly ifFalse;
    constructor(test: Expression<boolean>, ifTrue: T | Expression<T>, ifFalse: T | Expression<T>);
    toString(): string;
}
/**
 * A CEL expression that evaluates to boolean true or false based on a comparison
 * between the value of another expression and a literal of that same type.
 */
export declare class CompareExpression<T extends string | number | boolean | string[]> extends Expression<boolean> {
    cmp: "==" | "!=" | ">" | ">=" | "<" | "<=";
    lhs: Expression<T>;
    rhs: T | Expression<T>;
    constructor(cmp: "==" | "!=" | ">" | ">=" | "<" | "<=", lhs: Expression<T>, rhs: T | Expression<T>);
    toString(): string;
    /** Returns a `TernaryExpression` which can resolve to one of two values, based on the resolution of this comparison. */
    thenElse<retT extends string | number | boolean | string[]>(ifTrue: retT | Expression<retT>, ifFalse: retT | Expression<retT>): TernaryExpression<retT>;
}
/** @hidden */
type ParamValueType = "string" | "list" | "boolean" | "int" | "float" | "secret";
/** Create a select input from a series of values. */
export declare function select<T>(options: T[]): SelectInput<T>;
/** Create a select input from a map of labels to values. */
export declare function select<T>(optionsWithLabels: Record<string, T>): SelectInput<T>;
/** Create a multi-select input from a series of values. */
export declare function multiSelect(options: string[]): MultiSelectInput;
/** Create a multi-select input from map of labels to values. */
export declare function multiSelect(options: Record<string, string>): MultiSelectInput;
type ParamInput<T> = TextInput<T> | SelectInput<T> | (T extends string[] ? MultiSelectInput : never) | (T extends string ? ResourceInput : never);
/**
 * Specifies that a parameter's value should be determined by prompting the user
 * to type it in interactively at deploy time. Input that does not match the
 * provided validationRegex, if present, will be retried.
 */
export interface TextInput<T = unknown> {
    text: {
        example?: string;
        /**
         * A regular expression (or an escaped string to compile into a regular
         * expression) which the prompted text must satisfy; the prompt will retry
         * until input matching the regex is provided.
         */
        validationRegex?: string | RegExp;
        /**
         * A custom error message to display when retrying the prompt based on input
         * failing to conform to the validationRegex,
         */
        validationErrorMessage?: string;
    };
}
/**
 * Specifies that a parameter's value should be determined by having the user
 * select from a list containing all the project's resources of a certain
 * type. Currently, only type:"storage.googleapis.com/Bucket" is supported.
 */
export interface ResourceInput {
    resource: {
        type: "storage.googleapis.com/Bucket";
    };
}
/**
 * Autogenerate a list of buckets in a project that a user can select from.
 */
export declare const BUCKET_PICKER: ResourceInput;
/**
 * Specifies that a parameter's value should be determined by having the user select
 * from a list of pre-canned options interactively at deploy time.
 */
export interface SelectInput<T = unknown> {
    select: {
        options: Array<SelectOptions<T>>;
    };
}
/**
 * Specifies that a parameter's value should be determined by having the user select
 * a subset from a list of pre-canned options interactively at deploy time.
 * Will result in errors if used on parameters of type other than `string[]`.
 */
export interface MultiSelectInput {
    multiSelect: {
        options: Array<SelectOptions<string>>;
    };
}
/**
 * One of the options provided to a `SelectInput`, containing a value and
 * optionally a human-readable label to display in the selection interface.
 */
export interface SelectOptions<T = unknown> {
    label?: string;
    value: T;
}
/** The wire representation of a parameter when it's sent to the CLI. A superset of `ParamOptions`. */
export type ParamSpec<T extends string | number | boolean | string[]> = {
    /** The name of the parameter which will be stored in .env files. Use UPPERCASE. */
    name: string;
    /** An optional default value to be used while prompting for input. Can be a literal or another parametrized expression. */
    default?: T | Expression<T>;
    /** An optional human-readable string to be used as a replacement for the parameter's name when prompting. */
    label?: string;
    /** An optional long-form description of the parameter to be displayed while prompting. */
    description?: string;
    /** The way in which the Firebase CLI will prompt for the value of this parameter. Defaults to a TextInput. */
    input?: ParamInput<T>;
};
/**
 * Representation of parameters for the stack over the wire.
 *
 * @remarks
 * N.B: a WireParamSpec is just a ParamSpec with default expressions converted into a CEL literal
 *
 * @alpha
 */
export type WireParamSpec<T extends string | number | boolean | string[]> = {
    name: string;
    default?: T | string;
    label?: string;
    description?: string;
    type: ParamValueType;
    input?: ParamInput<T>;
};
/** Configuration options which can be used to customize the prompting behavior of a parameter. */
export type ParamOptions<T extends string | number | boolean | string[]> = Omit<ParamSpec<T>, "name" | "type">;
/**
 * Represents a parametrized value that will be read from .env files if present,
 * or prompted for by the CLI if missing. Instantiate these with the defineX
 * methods exported by the firebase-functions/params namespace.
 */
export declare abstract class Param<T extends string | number | boolean | string[]> extends Expression<T> {
    readonly name: string;
    readonly options: ParamOptions<T>;
    static type: ParamValueType;
    constructor(name: string, options?: ParamOptions<T>);
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    cmp(cmp: "==" | "!=" | ">" | ">=" | "<" | "<=", rhs: T | Expression<T>): CompareExpression<T>;
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    equals(rhs: T | Expression<T>): CompareExpression<T>;
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    notEquals(rhs: T | Expression<T>): CompareExpression<T>;
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    greaterThan(rhs: T | Expression<T>): CompareExpression<T>;
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    greaterThanOrEqualTo(rhs: T | Expression<T>): CompareExpression<T>;
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    lessThan(rhs: T | Expression<T>): CompareExpression<T>;
    /** Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression. */
    lessThanOrEqualTo(rhs: T | Expression<T>): CompareExpression<T>;
    /**
     * Returns a parametrized expression of Boolean type, based on comparing the value of this parameter to a literal or a different expression.
     * @deprecated A typo. Use lessThanOrEqualTo instead.
     */
    lessThanorEqualTo(rhs: T | Expression<T>): CompareExpression<T>;
    toString(): string;
}
/**
 * A parametrized string whose value is stored in Cloud Secret Manager
 * instead of the local filesystem. Supply instances of SecretParams to
 * the secrets array while defining a Function to make their values accessible
 * during execution of that Function.
 */
export declare class SecretParam {
    static type: ParamValueType;
    name: string;
    constructor(name: string);
    /** Returns the secret's value at runtime. Throws an error if accessed during deployment. */
    value(): string;
}
/**
 *  A parametrized value of String type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
export declare class StringParam extends Param<string> {
}
/**
 *  A parametrized value of Integer type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
export declare class IntParam extends Param<number> {
    static type: ParamValueType;
}
/**
 *  A parametrized value of Float type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
export declare class FloatParam extends Param<number> {
    static type: ParamValueType;
}
/**
 *  A parametrized value of Boolean type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
export declare class BooleanParam extends Param<boolean> {
    static type: ParamValueType;
    /** @deprecated */
    then<T extends string | number | boolean>(ifTrue: T | Expression<T>, ifFalse: T | Expression<T>): TernaryExpression<T>;
    thenElse<T extends string | number | boolean>(ifTrue: T | Expression<T>, ifFalse: T | Expression<T>): TernaryExpression<T>;
}
/**
 *  A parametrized value of String[] type that will be read from .env files
 *  if present, or prompted for by the CLI if missing.
 */
export declare class ListParam extends Param<string[]> {
    static type: ParamValueType;
    /** @hidden */
    greaterThan(rhs: string[] | Expression<string[]>): CompareExpression<string[]>;
    /** @hidden */
    greaterThanOrEqualTo(rhs: string[] | Expression<string[]>): CompareExpression<string[]>;
    /** @hidden */
    lessThan(rhs: string[] | Expression<string[]>): CompareExpression<string[]>;
    /** @hidden */
    lessThanorEqualTo(rhs: string[] | Expression<string[]>): CompareExpression<string[]>;
}
export {};
