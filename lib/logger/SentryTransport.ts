import * as Sentry from '@sentry/node';
import * as Integrations from '@sentry/integrations';
import * as Transport from 'winston-transport';
import { BaseError } from '../BaseError';
import { prepareSentryMeta } from '../utils';

export interface SentryTransportOptions extends Sentry.NodeOptions, Transport.TransportStreamOptions {
  fingerprint404?: boolean;
}

export class SentryTransport extends Transport {
  public readonly name = 'Sentry';
  public options: SentryTransportOptions;

  constructor(options: SentryTransportOptions) {
    super(options);

    Sentry.init({
      dsn: '',
      patchGlobal: false,
      install: false,
      environment: process.env.NODE_ENV,
      attachStacktrace: true,
      tags: {},
      extra: {},
      beforeSend: event => {
        // If it's a ts-framework generic 404 error, fingerprint it
        if (options.fingerprint404 && event.message.includes("The resource was not found")) {
          if (!event.fingerprint) { event.fingerprint = [] }
          event.fingerprint.push("404");
        }

        return event;
      },
      integrations: [
        new Integrations.ExtraErrorData({ depth: 6 }),
      ],
      ...options,
    });
  }

  async log(info: { level: string, tags: any, message: any }, done: () => void) {
    if (this.silent) {
      return done();
    }

    const meta = prepareSentryMeta(info);

    if (info.level === 'error') {
      const error = new BaseError(info, meta);
      error.name = info['name'] || BaseError.name;
      Sentry.captureException(error);
    } else {
      Sentry.captureEvent(meta);
    }

    done();
  }
}
