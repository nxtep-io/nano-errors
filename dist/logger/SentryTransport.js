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
const Integrations = require("@sentry/integrations");
const Transport = require("winston-transport");
const BaseError_1 = require("../BaseError");
const utils_1 = require("../utils");
class SentryTransport extends Transport {
    constructor(options) {
        super(options);
        this.name = "Sentry";
        if (options.sentryPackage) {
            this.Sentry = require(options.sentryPackage);
        }
        else {
            try {
                this.Sentry = require("@sentry/browser");
            }
            catch (_a) {
                try {
                    this.Sentry = require("@sentry/node");
                }
                catch (_b) {
                    try {
                        this.Sentry = require("@sentry/react-native");
                    }
                    catch (_c) {
                        try {
                            this.Sentry = require("@sentry/electron");
                        }
                        catch (_d) {
                            throw new BaseError_1.BaseError("No sentry package found!");
                        }
                    }
                }
            }
        }
        this.Sentry.init(Object.assign({ dsn: "", environment: process.env.NODE_ENV, attachStacktrace: true, integrations: [new Integrations.ExtraErrorData({ depth: 6 }), new Integrations.Dedupe()] }, options));
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
                this.Sentry.withScope(scope => {
                    scope.setExtras(extra);
                    this.Sentry.captureException(error);
                });
            }
            else {
                this.Sentry.withScope(scope => {
                    scope.setExtras(extra);
                    this.Sentry.captureEvent(meta);
                });
            }
            done();
        });
    }
}
exports.SentryTransport = SentryTransport;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VudHJ5VHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsibG9nZ2VyL1NlbnRyeVRyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFEQUFxRDtBQUNyRCwrQ0FBK0M7QUFDL0MsNENBQXlDO0FBQ3pDLG9DQUE2QztBQU83QyxNQUFhLGVBQWdCLFNBQVEsU0FBUztJQUs1QyxZQUFZLE9BQStCO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUxELFNBQUksR0FBRyxRQUFRLENBQUM7UUFPOUIsSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUM5QzthQUFNO1lBQ0wsSUFBSTtnQkFDRixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2FBQzFDO1lBQUMsV0FBTTtnQkFDTixJQUFJO29CQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUN2QztnQkFBQyxXQUFNO29CQUNOLElBQUk7d0JBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztxQkFDL0M7b0JBQUMsV0FBTTt3QkFDTixJQUFJOzRCQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7eUJBQzNDO3dCQUFDLFdBQU07NEJBQ04sTUFBTSxJQUFJLHFCQUFTLENBQUMsMEJBQTBCLENBQUMsQ0FBQzt5QkFDakQ7cUJBQ0Y7aUJBQ0Y7YUFDRjtTQUNGO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLGlCQUNkLEdBQUcsRUFBRSxFQUFFLEVBQ1AsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUNqQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQ3RCLFlBQVksRUFBRSxDQUFDLElBQUksWUFBWSxDQUFDLGNBQWMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQ3JGLE9BQU8sRUFDVixDQUFDO0lBQ0wsQ0FBQztJQUVLLEdBQUcsQ0FBQyxJQUFnRCxFQUFFLElBQWdCOztZQUMxRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ2YsT0FBTyxJQUFJLEVBQUUsQ0FBQzthQUNmO1lBRUQsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsR0FBRyx5QkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUU5QyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO2dCQUMxQixNQUFNLEtBQUssR0FBRyxJQUFJLHFCQUFTLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBUyxDQUFDLElBQUksQ0FBQztnQkFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzVCLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2FBQ0o7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQzVCLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO0tBQUE7Q0FDRjtBQTlERCwwQ0E4REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBJbnRlZ3JhdGlvbnMgZnJvbSBcIkBzZW50cnkvaW50ZWdyYXRpb25zXCI7XG5pbXBvcnQgKiBhcyBUcmFuc3BvcnQgZnJvbSBcIndpbnN0b24tdHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwiLi4vQmFzZUVycm9yXCI7XG5pbXBvcnQgeyBwcmVwYXJlU2VudHJ5TWV0YSB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gXCJAc2VudHJ5L3R5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VudHJ5VHJhbnNwb3J0T3B0aW9ucyBleHRlbmRzIE9wdGlvbnMsIFRyYW5zcG9ydC5UcmFuc3BvcnRTdHJlYW1PcHRpb25zIHtcbiAgc2VudHJ5UGFja2FnZTogXCJicm93c2VyXCIgfCBcIm5vZGVcIiB8IFwicmVhY3QtbmF0aXZlXCIgfCBcImVsZWN0cm9uXCI7XG59XG5cbmV4cG9ydCBjbGFzcyBTZW50cnlUcmFuc3BvcnQgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICBwdWJsaWMgcmVhZG9ubHkgbmFtZSA9IFwiU2VudHJ5XCI7XG4gIHB1YmxpYyBvcHRpb25zOiBTZW50cnlUcmFuc3BvcnRPcHRpb25zO1xuICBwcm90ZWN0ZWQgU2VudHJ5O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IFNlbnRyeVRyYW5zcG9ydE9wdGlvbnMpIHtcbiAgICBzdXBlcihvcHRpb25zKTtcblxuICAgIGlmIChvcHRpb25zLnNlbnRyeVBhY2thZ2UpIHtcbiAgICAgIHRoaXMuU2VudHJ5ID0gcmVxdWlyZShvcHRpb25zLnNlbnRyeVBhY2thZ2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLlNlbnRyeSA9IHJlcXVpcmUoXCJAc2VudHJ5L2Jyb3dzZXJcIik7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLlNlbnRyeSA9IHJlcXVpcmUoXCJAc2VudHJ5L25vZGVcIik7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLlNlbnRyeSA9IHJlcXVpcmUoXCJAc2VudHJ5L3JlYWN0LW5hdGl2ZVwiKTtcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHRoaXMuU2VudHJ5ID0gcmVxdWlyZShcIkBzZW50cnkvZWxlY3Ryb25cIik7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcIk5vIHNlbnRyeSBwYWNrYWdlIGZvdW5kIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLlNlbnRyeS5pbml0KHtcbiAgICAgIGRzbjogXCJcIixcbiAgICAgIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5OT0RFX0VOVixcbiAgICAgIGF0dGFjaFN0YWNrdHJhY2U6IHRydWUsXG4gICAgICBpbnRlZ3JhdGlvbnM6IFtuZXcgSW50ZWdyYXRpb25zLkV4dHJhRXJyb3JEYXRhKHsgZGVwdGg6IDYgfSksIG5ldyBJbnRlZ3JhdGlvbnMuRGVkdXBlKCldLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9nKGluZm86IHsgbGV2ZWw6IHN0cmluZzsgdGFnczogYW55OyBtZXNzYWdlOiBhbnkgfSwgZG9uZTogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLnNpbGVudCkge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbbWV0YSwgZXh0cmFdID0gcHJlcGFyZVNlbnRyeU1ldGEoaW5mbyk7XG5cbiAgICBpZiAoaW5mby5sZXZlbCA9PT0gXCJlcnJvclwiKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBCYXNlRXJyb3IoaW5mbywgbWV0YSk7XG4gICAgICBlcnJvci5uYW1lID0gaW5mb1tcIm5hbWVcIl0gfHwgQmFzZUVycm9yLm5hbWU7XG4gICAgICB0aGlzLlNlbnRyeS53aXRoU2NvcGUoc2NvcGUgPT4ge1xuICAgICAgICBzY29wZS5zZXRFeHRyYXMoZXh0cmEpO1xuICAgICAgICB0aGlzLlNlbnRyeS5jYXB0dXJlRXhjZXB0aW9uKGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLlNlbnRyeS53aXRoU2NvcGUoc2NvcGUgPT4ge1xuICAgICAgICBzY29wZS5zZXRFeHRyYXMoZXh0cmEpO1xuICAgICAgICB0aGlzLlNlbnRyeS5jYXB0dXJlRXZlbnQobWV0YSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkb25lKCk7XG4gIH1cbn1cbiJdfQ==