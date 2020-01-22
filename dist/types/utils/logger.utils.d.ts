import * as Sentry from "@sentry/node";
export declare const winstonLevelToSentryLevel: {
    silly: string;
    verbose: string;
    debug: string;
    info: string;
    warn: string;
    error: string;
    default: string;
};
export declare const stringfyInfo: (info: any) => string;
export declare const getExtraInfo: (info: any, depth: number) => string;
export declare const prepareSentryMeta: (info: {
    level: string;
    tags: any;
    message: any;
}) => [Error | Sentry.Event, object];
