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
                new Integrations.ExtraErrorData({ depth: 6 }),
            ] }, options));
    }
    log(info, done) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.silent) {
                return done();
            }
            const [meta, extra] = utils_1.prepareSentryMeta(info);
            if (info.level === 'error') {
                const error = new BaseError_1.BaseError(info, meta);
                error.name = info['name'] || BaseError_1.BaseError.name;
                Sentry.withScope(scope => {
                    scope.setExtras(extra);
                    Sentry.captureException(error);
                });
            }
            else {
                Sentry.withScope(scope => {
                    scope.setExtras(extra);
                    Sentry.captureEvent(meta);
                });
            }
            done();
        });
    }
}
exports.SentryTransport = SentryTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VudHJ5VHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsibG9nZ2VyL1NlbnRyeVRyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsdUNBQXVDO0FBQ3ZDLHFEQUFxRDtBQUNyRCwrQ0FBK0M7QUFDL0MsNENBQXlDO0FBQ3pDLG9DQUE2QztBQUs3QyxNQUFhLGVBQWdCLFNBQVEsU0FBUztJQUk1QyxZQUFZLE9BQStCO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUpELFNBQUksR0FBRyxRQUFRLENBQUM7UUFNOUIsTUFBTSxDQUFDLElBQUksaUJBQ1QsR0FBRyxFQUFFLEVBQUUsRUFDUCxXQUFXLEVBQUUsS0FBSyxFQUNsQixPQUFPLEVBQUUsS0FBSyxFQUNkLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDakMsZ0JBQWdCLEVBQUUsSUFBSSxFQUN0QixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxFQUFFLEVBQ1QsWUFBWSxFQUFFO2dCQUNaLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQzthQUM5QyxJQUNFLE9BQU8sRUFDVixDQUFDO0lBQ0wsQ0FBQztJQUVLLEdBQUcsQ0FBQyxJQUFnRCxFQUFFLElBQWdCOztZQUMxRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNmO1lBRUQsTUFBTSxDQUFDLElBQUksRUFBQyxLQUFLLENBQUMsR0FBRyx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU3QyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO2dCQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLHFCQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdkIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3ZCLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBN0NELDBDQTZDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tICdAc2VudHJ5L25vZGUnO1xuaW1wb3J0ICogYXMgSW50ZWdyYXRpb25zIGZyb20gJ0BzZW50cnkvaW50ZWdyYXRpb25zJztcbmltcG9ydCAqIGFzIFRyYW5zcG9ydCBmcm9tICd3aW5zdG9uLXRyYW5zcG9ydCc7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tICcuLi9CYXNlRXJyb3InO1xuaW1wb3J0IHsgcHJlcGFyZVNlbnRyeU1ldGEgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VudHJ5VHJhbnNwb3J0T3B0aW9ucyBleHRlbmRzIFNlbnRyeS5Ob2RlT3B0aW9ucywgVHJhbnNwb3J0LlRyYW5zcG9ydFN0cmVhbU9wdGlvbnMge1xufVxuXG5leHBvcnQgY2xhc3MgU2VudHJ5VHJhbnNwb3J0IGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgcHVibGljIHJlYWRvbmx5IG5hbWUgPSAnU2VudHJ5JztcbiAgcHVibGljIG9wdGlvbnM6IFNlbnRyeVRyYW5zcG9ydE9wdGlvbnM7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2VudHJ5VHJhbnNwb3J0T3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgU2VudHJ5LmluaXQoe1xuICAgICAgZHNuOiAnJyxcbiAgICAgIHBhdGNoR2xvYmFsOiBmYWxzZSxcbiAgICAgIGluc3RhbGw6IGZhbHNlLFxuICAgICAgZW52aXJvbm1lbnQ6IHByb2Nlc3MuZW52Lk5PREVfRU5WLFxuICAgICAgYXR0YWNoU3RhY2t0cmFjZTogdHJ1ZSxcbiAgICAgIHRhZ3M6IHt9LFxuICAgICAgZXh0cmE6IHt9LFxuICAgICAgaW50ZWdyYXRpb25zOiBbXG4gICAgICAgIG5ldyBJbnRlZ3JhdGlvbnMuRXh0cmFFcnJvckRhdGEoeyBkZXB0aDogNiB9KSxcbiAgICAgIF0sXG4gICAgICAuLi5vcHRpb25zLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9nKGluZm86IHsgbGV2ZWw6IHN0cmluZywgdGFnczogYW55LCBtZXNzYWdlOiBhbnkgfSwgZG9uZTogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLnNpbGVudCkge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbbWV0YSxleHRyYV0gPSBwcmVwYXJlU2VudHJ5TWV0YShpbmZvKTtcblxuICAgIGlmIChpbmZvLmxldmVsID09PSAnZXJyb3InKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBCYXNlRXJyb3IoaW5mbywgbWV0YSk7XG4gICAgICBlcnJvci5uYW1lID0gaW5mb1snbmFtZSddIHx8IEJhc2VFcnJvci5uYW1lO1xuICAgICAgU2VudHJ5LndpdGhTY29wZShzY29wZSA9PiB7XG4gICAgICAgIHNjb3BlLnNldEV4dHJhcyhleHRyYSk7XG4gICAgICAgIFNlbnRyeS5jYXB0dXJlRXhjZXB0aW9uKGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBTZW50cnkud2l0aFNjb3BlKHNjb3BlID0+IHtcbiAgICAgICAgc2NvcGUuc2V0RXh0cmFzKGV4dHJhKTtcbiAgICAgICAgU2VudHJ5LmNhcHR1cmVFdmVudChtZXRhKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGRvbmUoKTtcbiAgfVxufVxuIl19