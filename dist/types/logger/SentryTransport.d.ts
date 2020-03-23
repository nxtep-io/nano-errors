import * as Transport from "winston-transport";
import { Options } from "@sentry/types";
export interface SentryTransportOptions extends Options, Transport.TransportStreamOptions {
    sentryPackage: "browser" | "node" | "react-native" | "electron";
}
export declare class SentryTransport extends Transport {
    readonly name = "Sentry";
    options: SentryTransportOptions;
    protected Sentry: any;
    constructor(options: SentryTransportOptions);
    log(info: {
        level: string;
        tags: any;
        message: any;
    }, done: () => void): Promise<void>;
}
