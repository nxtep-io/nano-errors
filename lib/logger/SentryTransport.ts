import * as Integrations from "@sentry/integrations";
import * as Transport from "winston-transport";
import { BaseError } from "../BaseError";
import { prepareSentryMeta } from "../utils";
import { Options } from "@sentry/types";

export interface SentryTransportOptions extends Options, Transport.TransportStreamOptions {
  sentryPackage: "browser" | "node" | "react-native" | "electron";
}

export class SentryTransport extends Transport {
  public readonly name = "Sentry";
  public options: SentryTransportOptions;
  protected Sentry;

  constructor(options: SentryTransportOptions) {
    super(options);

    if (options.sentryPackage) {
      this.Sentry = require(options.sentryPackage);
    } else {
      try {
        this.Sentry = require("@sentry/browser");
      } catch {
        try {
          this.Sentry = require("@sentry/node");
        } catch {
          try {
            this.Sentry = require("@sentry/react-native");
          } catch {
            try {
              this.Sentry = require("@sentry/electron");
            } catch {
              throw new BaseError("No sentry package found!");
            }
          }
        }
      }
    }

    this.Sentry.init({
      dsn: "",
      environment: process.env.NODE_ENV,
      attachStacktrace: true,
      integrations: [new Integrations.ExtraErrorData({ depth: 6 }), new Integrations.Dedupe()],
      ...options
    });
  }

  async log(info: { level: string; tags: any; message: any }, done: () => void) {
    if (this.silent) {
      return done();
    }

    const [meta, extra] = prepareSentryMeta(info);

    if (info.level === "error") {
      const error = new BaseError(info, meta);
      error.name = info["name"] || BaseError.name;
      this.Sentry.withScope(scope => {
        scope.setExtras(extra);
        this.Sentry.captureException(error);
      });
    } else {
      this.Sentry.withScope(scope => {
        scope.setExtras(extra);
        this.Sentry.captureEvent(meta);
      });
    }

    done();
  }
}
