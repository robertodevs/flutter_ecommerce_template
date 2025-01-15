import { Expression } from "../params";
/**
 * A type that splits literal string S with delimiter D.
 *
 * For example Split<"a/b/c", "/"> is ['a' | "b" | "c"]
 */
export type Split<S extends string, D extends string> = string extends S ? string[] : S extends "" ? [] : S extends `${D}${infer Tail}` ? [...Split<Tail, D>] : S extends `${infer Head}${D}${infer Tail}` ? string extends Head ? [...Split<Tail, D>] : [Head, ...Split<Tail, D>] : [
    S
];
/**
 * A type that ensure that type S is not null or undefined.
 */
export type NullSafe<S extends null | undefined | string> = S extends null ? never : S extends undefined ? never : S extends string ? S : never;
/**
 * A type that extracts parameter name enclosed in bracket as string.
 * Ignore wildcard matches
 *
 * For example, Extract<"{uid}"> is "uid".
 * For example, Extract<"{uid=*}"> is "uid".
 * For example, Extract<"{uid=**}"> is "uid".
 */
export type Extract<Part extends string> = Part extends `{${infer Param}=**}` ? Param : Part extends `{${infer Param}=*}` ? Param : Part extends `{${infer Param}}` ? Param : never;
/**
 * A type that maps all parameter capture gropus into keys of a record.
 * For example, ParamsOf<"users/{uid}"> is { uid: string }
 * ParamsOf<"users/{uid}/logs/{log}"> is { uid: string; log: string }
 * ParamsOf<"some/static/data"> is {}
 *
 * For flexibility reasons, ParamsOf<string> is Record<string, string>
 */
export type ParamsOf<PathPattern extends string | Expression<string>> = PathPattern extends Expression<string> ? Record<string, string> : string extends PathPattern ? Record<string, string> : {
    [Key in Extract<Split<NullSafe<Exclude<PathPattern, Expression<string>>>, "/">[number]>]: string;
};
