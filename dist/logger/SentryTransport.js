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
                if (options.fingerprint404 && event.message.includes("The resource was not found")) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VudHJ5VHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsibG9nZ2VyL1NlbnRyeVRyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLHFEQUFxRDtBQUNyRCwrQ0FBK0M7QUFDL0MsNENBQXlDO0FBQ3pDLG9DQUE2QztBQU03QyxNQUFhLGVBQWdCLFNBQVEsU0FBUztJQUk1QyxZQUFZLE9BQStCO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUpELFNBQUksR0FBRyxRQUFRLENBQUM7UUFNOUIsTUFBTSxDQUFDLElBQUksaUJBQ1QsR0FBRyxFQUFFLEVBQUUsRUFDUCxXQUFXLEVBQUUsS0FBSyxFQUNsQixPQUFPLEVBQUUsS0FBSyxFQUNkLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDakMsZ0JBQWdCLEVBQUUsSUFBSSxFQUN0QixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxFQUFFLEVBQ1QsVUFBVSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUNsQiwyREFBMkQ7Z0JBQzNELElBQUksT0FBTyxDQUFDLGNBQWMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyw0QkFBNEIsQ0FBQyxFQUFFO29CQUNsRixJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTt3QkFBRSxLQUFLLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtxQkFBRTtvQkFDbEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQy9CO2dCQUVELE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQyxFQUNELFlBQVksRUFBRTtnQkFDWixJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDOUMsSUFDRSxPQUFPLEVBQ1YsQ0FBQztJQUNMLENBQUM7SUFFSyxHQUFHLENBQUMsSUFBZ0QsRUFBRSxJQUFnQjs7WUFDMUUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtZQUVELE1BQU0sSUFBSSxHQUFHLHlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXJDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7Z0JBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUkscUJBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3hDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHFCQUFTLENBQUMsSUFBSSxDQUFDO2dCQUM1QyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEM7aUJBQU07Z0JBQ0wsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtZQUVELElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztLQUFBO0NBQ0Y7QUFoREQsMENBZ0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvbm9kZSc7XG5pbXBvcnQgKiBhcyBJbnRlZ3JhdGlvbnMgZnJvbSAnQHNlbnRyeS9pbnRlZ3JhdGlvbnMnO1xuaW1wb3J0ICogYXMgVHJhbnNwb3J0IGZyb20gJ3dpbnN0b24tdHJhbnNwb3J0JztcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gJy4uL0Jhc2VFcnJvcic7XG5pbXBvcnQgeyBwcmVwYXJlU2VudHJ5TWV0YSB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGludGVyZmFjZSBTZW50cnlUcmFuc3BvcnRPcHRpb25zIGV4dGVuZHMgU2VudHJ5Lk5vZGVPcHRpb25zLCBUcmFuc3BvcnQuVHJhbnNwb3J0U3RyZWFtT3B0aW9ucyB7XG4gIGZpbmdlcnByaW50NDA0PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNsYXNzIFNlbnRyeVRyYW5zcG9ydCBleHRlbmRzIFRyYW5zcG9ydCB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lID0gJ1NlbnRyeSc7XG4gIHB1YmxpYyBvcHRpb25zOiBTZW50cnlUcmFuc3BvcnRPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFNlbnRyeVRyYW5zcG9ydE9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIFNlbnRyeS5pbml0KHtcbiAgICAgIGRzbjogJycsXG4gICAgICBwYXRjaEdsb2JhbDogZmFsc2UsXG4gICAgICBpbnN0YWxsOiBmYWxzZSxcbiAgICAgIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5OT0RFX0VOVixcbiAgICAgIGF0dGFjaFN0YWNrdHJhY2U6IHRydWUsXG4gICAgICB0YWdzOiB7fSxcbiAgICAgIGV4dHJhOiB7fSxcbiAgICAgIGJlZm9yZVNlbmQ6IGV2ZW50ID0+IHtcbiAgICAgICAgLy8gSWYgaXQncyBhIHRzLWZyYW1ld29yayBnZW5lcmljIDQwNCBlcnJvciwgZmluZ2VycHJpbnQgaXRcbiAgICAgICAgaWYgKG9wdGlvbnMuZmluZ2VycHJpbnQ0MDQgJiYgZXZlbnQubWVzc2FnZS5pbmNsdWRlcyhcIlRoZSByZXNvdXJjZSB3YXMgbm90IGZvdW5kXCIpKSB7XG4gICAgICAgICAgaWYgKCFldmVudC5maW5nZXJwcmludCkgeyBldmVudC5maW5nZXJwcmludCA9IFtdIH1cbiAgICAgICAgICBldmVudC5maW5nZXJwcmludC5wdXNoKFwiNDA0XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgfSxcbiAgICAgIGludGVncmF0aW9uczogW1xuICAgICAgICBuZXcgSW50ZWdyYXRpb25zLkV4dHJhRXJyb3JEYXRhKHsgZGVwdGg6IDYgfSksXG4gICAgICBdLFxuICAgICAgLi4ub3B0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGxvZyhpbmZvOiB7IGxldmVsOiBzdHJpbmcsIHRhZ3M6IGFueSwgbWVzc2FnZTogYW55IH0sIGRvbmU6ICgpID0+IHZvaWQpIHtcbiAgICBpZiAodGhpcy5zaWxlbnQpIHtcbiAgICAgIHJldHVybiBkb25lKCk7XG4gICAgfVxuXG4gICAgY29uc3QgbWV0YSA9IHByZXBhcmVTZW50cnlNZXRhKGluZm8pO1xuXG4gICAgaWYgKGluZm8ubGV2ZWwgPT09ICdlcnJvcicpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEJhc2VFcnJvcihpbmZvLCBtZXRhKTtcbiAgICAgIGVycm9yLm5hbWUgPSBpbmZvWyduYW1lJ10gfHwgQmFzZUVycm9yLm5hbWU7XG4gICAgICBTZW50cnkuY2FwdHVyZUV4Y2VwdGlvbihlcnJvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFNlbnRyeS5jYXB0dXJlRXZlbnQobWV0YSk7XG4gICAgfVxuXG4gICAgZG9uZSgpO1xuICB9XG59XG4iXX0=