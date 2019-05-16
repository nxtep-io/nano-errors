import * as Sentry from '@sentry/node';
import * as Transport from 'winston-transport';
export interface SentryTransportOptions extends Sentry.NodeOptions, Transport.TransportStreamOptions {
}
export declare class SentryTransport extends Transport {
    readonly name = "Sentry";
    options: SentryTransportOptions;
    constructor(options: SentryTransportOptions);
    log(info: {
        level: string;
        tags: any;
        message: any;
    }, done: () => void): Promise<void>;
}
