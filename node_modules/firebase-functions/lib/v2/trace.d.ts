import { CloudEvent } from "./core";
type CloudEventFunction<T> = (raw: CloudEvent<T>) => any | Promise<any>;
export declare function wrapTraceContext<T>(handler: CloudEventFunction<T>): CloudEventFunction<T>;
export {};
