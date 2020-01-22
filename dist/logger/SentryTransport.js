"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
        this.name = "Sentry";
        Sentry.init(Object.assign({ dsn: "", environment: process.env.NODE_ENV, attachStacktrace: true, integrations: [new Integrations.ExtraErrorData({ depth: 6 }), new Integrations.Dedupe()] }, options));
    }
    log(info, done) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.silent) {
                return done();
            }
            const [meta, extra] = utils_1.prepareSentryMeta(info);
            if (info.level === "error") {
                const error = new BaseError_1.BaseError(info, meta);
                error.name = info["name"] || BaseError_1.BaseError.name;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VudHJ5VHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsibG9nZ2VyL1NlbnRyeVRyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHVDQUF1QztBQUN2QyxxREFBcUQ7QUFDckQsK0NBQStDO0FBQy9DLDRDQUF5QztBQUN6QyxvQ0FBNkM7QUFJN0MsTUFBYSxlQUFnQixTQUFRLFNBQVM7SUFJNUMsWUFBWSxPQUErQjtRQUN6QyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFKRCxTQUFJLEdBQUcsUUFBUSxDQUFDO1FBTTlCLE1BQU0sQ0FBQyxJQUFJLGlCQUNULEdBQUcsRUFBRSxFQUFFLEVBQ1AsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUNqQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQ3RCLFlBQVksRUFBRSxDQUFDLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQ3JGLE9BQU8sRUFDVixDQUFDO0lBQ0wsQ0FBQztJQUVLLEdBQUcsQ0FBQyxJQUFnRCxFQUFFLElBQWdCOztZQUMxRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNmO1lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU5QyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO2dCQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLHFCQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtvQkFDdkIsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ3ZCLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZCLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBdkNELDBDQXVDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9ub2RlXCI7XG5pbXBvcnQgKiBhcyBJbnRlZ3JhdGlvbnMgZnJvbSBcIkBzZW50cnkvaW50ZWdyYXRpb25zXCI7XG5pbXBvcnQgKiBhcyBUcmFuc3BvcnQgZnJvbSBcIndpbnN0b24tdHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwiLi4vQmFzZUVycm9yXCI7XG5pbXBvcnQgeyBwcmVwYXJlU2VudHJ5TWV0YSB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlbnRyeVRyYW5zcG9ydE9wdGlvbnMgZXh0ZW5kcyBTZW50cnkuTm9kZU9wdGlvbnMsIFRyYW5zcG9ydC5UcmFuc3BvcnRTdHJlYW1PcHRpb25zIHt9XG5cbmV4cG9ydCBjbGFzcyBTZW50cnlUcmFuc3BvcnQgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IFwiU2VudHJ5XCI7XG4gIHB1YmxpYyBvcHRpb25zOiBTZW50cnlUcmFuc3BvcnRPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFNlbnRyeVRyYW5zcG9ydE9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIFNlbnRyeS5pbml0KHtcbiAgICAgIGRzbjogXCJcIixcbiAgICAgIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5OT0RFX0VOVixcbiAgICAgIGF0dGFjaFN0YWNrdHJhY2U6IHRydWUsXG4gICAgICBpbnRlZ3JhdGlvbnM6IFtuZXcgSW50ZWdyYXRpb25zLkV4dHJhRXJyb3JEYXRhKHsgZGVwdGg6IDYgfSksIG5ldyBJbnRlZ3JhdGlvbnMuRGVkdXBlKCldLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9nKGluZm86IHsgbGV2ZWw6IHN0cmluZzsgdGFnczogYW55OyBtZXNzYWdlOiBhbnkgfSwgZG9uZTogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLnNpbGVudCkge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbbWV0YSwgZXh0cmFdID0gcHJlcGFyZVNlbnRyeU1ldGEoaW5mbyk7XG5cbiAgICBpZiAoaW5mby5sZXZlbCA9PT0gXCJlcnJvclwiKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBCYXNlRXJyb3IoaW5mbywgbWV0YSk7XG4gICAgICBlcnJvci5uYW1lID0gaW5mb1tcIm5hbWVcIl0gfHwgQmFzZUVycm9yLm5hbWU7XG4gICAgICBTZW50cnkud2l0aFNjb3BlKHNjb3BlID0+IHtcbiAgICAgICAgc2NvcGUuc2V0RXh0cmFzKGV4dHJhKTtcbiAgICAgICAgU2VudHJ5LmNhcHR1cmVFeGNlcHRpb24oZXJyb3IpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIFNlbnRyeS53aXRoU2NvcGUoc2NvcGUgPT4ge1xuICAgICAgICBzY29wZS5zZXRFeHRyYXMoZXh0cmEpO1xuICAgICAgICBTZW50cnkuY2FwdHVyZUV2ZW50KG1ldGEpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZG9uZSgpO1xuICB9XG59XG4iXX0=