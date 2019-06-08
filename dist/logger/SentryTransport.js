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
        Sentry.init(Object.assign({ dsn: '', patchGlobal: false, install: false, environment: process.env.NODE_ENV, attachStacktrace: true, tags: {}, extra: {}, beforeSend: event => {
                // If it's a ts-framework generic 404 error, fingerprint it
                if (event.message.includes("The resource was not found")) {
                    if (!event.fingerprint) {
                        event.fingerprint = [];
                    }
                    event.fingerprint.push("404");
                }
                return event;
            }, integrations: [
                new Integrations.ExtraErrorData({ depth: 6 }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VudHJ5VHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsibG9nZ2VyL1NlbnRyeVRyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLHFEQUFxRDtBQUNyRCwrQ0FBK0M7QUFDL0MsNENBQXlDO0FBQ3pDLG9DQUE2QztBQUs3QyxNQUFhLGVBQWdCLFNBQVEsU0FBUztJQUk1QyxZQUFZLE9BQStCO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUpELFNBQUksR0FBRyxRQUFRLENBQUM7UUFNOUIsTUFBTSxDQUFDLElBQUksaUJBQ1QsR0FBRyxFQUFFLEVBQUUsRUFDUCxXQUFXLEVBQUUsS0FBSyxFQUNsQixPQUFPLEVBQUUsS0FBSyxFQUNkLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDakMsZ0JBQWdCLEVBQUUsSUFBSSxFQUN0QixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxFQUFFLEVBQ1QsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNsQiwyREFBMkQ7Z0JBQzNELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsNEJBQTRCLENBQUMsRUFBRTtvQkFDeEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUU7d0JBQUUsS0FBSyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUE7cUJBQUU7b0JBQ2xELEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUMvQjtnQkFFRCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsRUFDRCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQzlDLElBQ0UsT0FBTyxFQUNWLENBQUM7SUFDTCxDQUFDO0lBRUssR0FBRyxDQUFDLElBQWdELEVBQUUsSUFBZ0I7O1lBQzFFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDZixPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7WUFFRCxNQUFNLElBQUksR0FBRyx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVyQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO2dCQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLHFCQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQztnQkFDNUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0I7WUFFRCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBaERELDBDQWdEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tICdAc2VudHJ5L25vZGUnO1xuaW1wb3J0ICogYXMgSW50ZWdyYXRpb25zIGZyb20gJ0BzZW50cnkvaW50ZWdyYXRpb25zJztcbmltcG9ydCAqIGFzIFRyYW5zcG9ydCBmcm9tICd3aW5zdG9uLXRyYW5zcG9ydCc7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tICcuLi9CYXNlRXJyb3InO1xuaW1wb3J0IHsgcHJlcGFyZVNlbnRyeU1ldGEgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VudHJ5VHJhbnNwb3J0T3B0aW9ucyBleHRlbmRzIFNlbnRyeS5Ob2RlT3B0aW9ucywgVHJhbnNwb3J0LlRyYW5zcG9ydFN0cmVhbU9wdGlvbnMge1xufVxuXG5leHBvcnQgY2xhc3MgU2VudHJ5VHJhbnNwb3J0IGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAnU2VudHJ5JztcbiAgcHVibGljIG9wdGlvbnM6IFNlbnRyeVRyYW5zcG9ydE9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2VudHJ5VHJhbnNwb3J0T3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgU2VudHJ5LmluaXQoe1xuICAgICAgZHNuOiAnJyxcbiAgICAgIHBhdGNoR2xvYmFsOiBmYWxzZSxcbiAgICAgIGluc3RhbGw6IGZhbHNlLFxuICAgICAgZW52aXJvbm1lbnQ6IHByb2Nlc3MuZW52Lk5PREVfRU5WLFxuICAgICAgYXR0YWNoU3RhY2t0cmFjZTogdHJ1ZSxcbiAgICAgIHRhZ3M6IHt9LFxuICAgICAgZXh0cmE6IHt9LFxuICAgICAgYmVmb3JlU2VuZDogZXZlbnQgPT4ge1xuICAgICAgICAvLyBJZiBpdCdzIGEgdHMtZnJhbWV3b3JrIGdlbmVyaWMgNDA0IGVycm9yLCBmaW5nZXJwcmludCBpdFxuICAgICAgICBpZiAoZXZlbnQubWVzc2FnZS5pbmNsdWRlcyhcIlRoZSByZXNvdXJjZSB3YXMgbm90IGZvdW5kXCIpKSB7XG4gICAgICAgICAgaWYgKCFldmVudC5maW5nZXJwcmludCkgeyBldmVudC5maW5nZXJwcmludCA9IFtdIH1cbiAgICAgICAgICBldmVudC5maW5nZXJwcmludC5wdXNoKFwiNDA0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgfSxcbiAgICAgIGludGVncmF0aW9uczogW1xuICAgICAgICBuZXcgSW50ZWdyYXRpb25zLkV4dHJhRXJyb3JEYXRhKHsgZGVwdGg6IDYgfSksXG4gICAgICBdLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGxvZyhpbmZvOiB7IGxldmVsOiBzdHJpbmcsIHRhZ3M6IGFueSwgbWVzc2FnZTogYW55IH0sIGRvbmU6ICgpID0+IHZvaWQpIHtcbiAgICBpZiAodGhpcy5zaWxlbnQpIHtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWV0YSA9IHByZXBhcmVTZW50cnlNZXRhKGluZm8pO1xuXG4gICAgaWYgKGluZm8ubGV2ZWwgPT09ICdlcnJvcicpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEJhc2VFcnJvcihpbmZvLCBtZXRhKTtcbiAgICAgIGVycm9yLm5hbWUgPSBpbmZvWyduYW1lJ10gfHwgQmFzZUVycm9yLm5hbWU7XG4gICAgICBTZW50cnkuY2FwdHVyZUV4Y2VwdGlvbihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFNlbnRyeS5jYXB0dXJlRXZlbnQobWV0YSk7XG4gICAgfVxuXG4gICAgZG9uZSgpO1xuICB9XG59XG4iXX0=