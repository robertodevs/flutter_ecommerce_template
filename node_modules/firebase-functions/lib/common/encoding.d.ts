import { Expression } from "../params";
/**
 * A type alias used to annotate interfaces as using a google.protobuf.Duration.
 * This type is parsed/encoded as a string of seconds + the "s" prefix.
 */
export type Duration = string;
/** Get a google.protobuf.Duration for a number of seconds. */
export declare function durationFromSeconds(s: number): Duration;
/**
 * Utility function to help copy fields from type A to B.
 * As a safety net, catches typos or fields that aren't named the same
 * in A and B, but cannot verify that both Src and Dest have the same type for the same field.
 */
export declare function copyIfPresent<Src, Dest>(dest: Dest, src: Src, ...fields: Array<keyof Src & keyof Dest>): void;
export declare function convertIfPresent<Src, Dest>(dest: Dest, src: Src, destField: keyof Dest, srcField: keyof Src, converter?: (from: any) => any): void;
export declare function serviceAccountFromShorthand(serviceAccount: string | Expression<string>): string | Expression<string> | null;
export declare function convertInvoker(invoker: string | string[]): string[];
