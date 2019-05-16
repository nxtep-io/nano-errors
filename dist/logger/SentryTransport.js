"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = require("@sentry/node");
const Integrations = require("@sentry/integrations");
const Transport = require("winston-transport");
const BaseError_1 = require("../BaseError");
const utils_1 = require("../utils");
class SentryTransport extends Transport {
    constructor(options) {
        super(options);
        this.name = 'Sentry';
        Sentry.init(Object.assign({ dsn: '', patchGlobal: false, install: false, environment: process.env.NODE_ENV, attachStacktrace: true, tags: {}, extra: {}, integrations: [
                new Integrations.ExtraErrorData(),
            ] }, options));
    }
    log(info, done) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.silent) {
                return done();
            }
            const meta = utils_1.prepareSentryMeta(info);
            if (info.level === 'error') {
                const error = new BaseError_1.BaseError(info, meta);
                error.name = info['name'] || BaseError_1.BaseError.name;
                Sentry.captureException(error);
            }
            else {
                Sentry.captureEvent(meta);
            }
            done();
        });
    }
}
exports.SentryTransport = SentryTransport;
//# sourceMappingURL=SentryTransport.js.map