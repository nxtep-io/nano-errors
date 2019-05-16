import * as Sentry from '@sentry/node';
export declare const lineFormat: import("logform").FormatWrap;
export declare const enumerateErrorFormat: import("logform").FormatWrap;
export declare const winstonLevelToSentryLevel: {
    silly: string;
    verbose: string;
    info: string;
    debug: string;
    warn: string;
    error: string;
    default: import("winston").LeveledLogMethod;
};
export declare const prepareSentryMeta: (info: {
    level: string;
    tags: any;
    message: any;
}) => Error | Sentry.Event;
