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
            this.Sentry = require(`@sentry/${options.sentryPackage}`);
        }
        else {
            try {
                this.Sentry = require("@sentry/node");
            }
            catch (_a) {
                try {
                    this.Sentry = require("@sentry/browser");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VudHJ5VHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsibG9nZ2VyL1NlbnRyeVRyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFEQUFxRDtBQUVyRCwrQ0FBK0M7QUFDL0MsNENBQXlDO0FBQ3pDLG9DQUE2QztBQU03QyxNQUFhLGVBQWdCLFNBQVEsU0FBUztJQUs1QyxZQUFZLE9BQStCO1FBQ3pDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUxELFNBQUksR0FBRyxRQUFRLENBQUM7UUFPOUIsSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLFdBQVcsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7U0FDM0Q7YUFBTTtZQUNMLElBQUk7Z0JBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7YUFDdkM7WUFBQyxXQUFNO2dCQUNOLElBQUk7b0JBQ0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQztpQkFDMUM7Z0JBQUMsV0FBTTtvQkFDTixJQUFJO3dCQUNGLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7cUJBQy9DO29CQUFDLFdBQU07d0JBQ04sSUFBSTs0QkFDRixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO3lCQUMzQzt3QkFBQyxXQUFNOzRCQUNOLE1BQU0sSUFBSSxxQkFBUyxDQUFDLDBCQUEwQixDQUFDLENBQUM7eUJBQ2pEO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxpQkFDZCxHQUFHLEVBQUUsRUFBRSxFQUNQLFdBQVcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFDakMsZ0JBQWdCLEVBQUUsSUFBSSxFQUN0QixZQUFZLEVBQUUsQ0FBQyxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUNyRixPQUFPLEVBQ1YsQ0FBQztJQUNMLENBQUM7SUFFSyxHQUFHLENBQUMsSUFBZ0QsRUFBRSxJQUFnQjs7WUFDMUUsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNmLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtZQUVELE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEdBQUcseUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFOUMsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtnQkFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxxQkFBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDeEMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUkscUJBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUM1QixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FBQzthQUNKO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUM1QixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUVELElBQUksRUFBRSxDQUFDO1FBQ1QsQ0FBQztLQUFBO0NBQ0Y7QUE5REQsMENBOERDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgSW50ZWdyYXRpb25zIGZyb20gXCJAc2VudHJ5L2ludGVncmF0aW9uc1wiO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gXCJAc2VudHJ5L3R5cGVzXCI7XG5pbXBvcnQgKiBhcyBUcmFuc3BvcnQgZnJvbSBcIndpbnN0b24tdHJhbnNwb3J0XCI7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tIFwiLi4vQmFzZUVycm9yXCI7XG5pbXBvcnQgeyBwcmVwYXJlU2VudHJ5TWV0YSB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlbnRyeVRyYW5zcG9ydE9wdGlvbnMgZXh0ZW5kcyBPcHRpb25zLCBUcmFuc3BvcnQuVHJhbnNwb3J0U3RyZWFtT3B0aW9ucyB7XG4gIHNlbnRyeVBhY2thZ2U/OiBcImJyb3dzZXJcIiB8IFwibm9kZVwiIHwgXCJyZWFjdC1uYXRpdmVcIiB8IFwiZWxlY3Ryb25cIjtcbn1cblxuZXhwb3J0IGNsYXNzIFNlbnRyeVRyYW5zcG9ydCBleHRlbmRzIFRyYW5zcG9ydCB7XG4gIHB1YmxpYyByZWFkb25seSBuYW1lID0gXCJTZW50cnlcIjtcbiAgcHVibGljIG9wdGlvbnM6IFNlbnRyeVRyYW5zcG9ydE9wdGlvbnM7XG4gIHByb3RlY3RlZCBTZW50cnk7XG5cbiAgY29uc3RydWN0b3Iob3B0aW9uczogU2VudHJ5VHJhbnNwb3J0T3B0aW9ucykge1xuICAgIHN1cGVyKG9wdGlvbnMpO1xuXG4gICAgaWYgKG9wdGlvbnMuc2VudHJ5UGFja2FnZSkge1xuICAgICAgdGhpcy5TZW50cnkgPSByZXF1aXJlKGBAc2VudHJ5LyR7b3B0aW9ucy5zZW50cnlQYWNrYWdlfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLlNlbnRyeSA9IHJlcXVpcmUoXCJAc2VudHJ5L25vZGVcIik7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLlNlbnRyeSA9IHJlcXVpcmUoXCJAc2VudHJ5L2Jyb3dzZXJcIik7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLlNlbnRyeSA9IHJlcXVpcmUoXCJAc2VudHJ5L3JlYWN0LW5hdGl2ZVwiKTtcbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgIHRoaXMuU2VudHJ5ID0gcmVxdWlyZShcIkBzZW50cnkvZWxlY3Ryb25cIik7XG4gICAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEJhc2VFcnJvcihcIk5vIHNlbnRyeSBwYWNrYWdlIGZvdW5kIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLlNlbnRyeS5pbml0KHtcbiAgICAgIGRzbjogXCJcIixcbiAgICAgIGVudmlyb25tZW50OiBwcm9jZXNzLmVudi5OT0RFX0VOVixcbiAgICAgIGF0dGFjaFN0YWNrdHJhY2U6IHRydWUsXG4gICAgICBpbnRlZ3JhdGlvbnM6IFtuZXcgSW50ZWdyYXRpb25zLkV4dHJhRXJyb3JEYXRhKHsgZGVwdGg6IDYgfSksIG5ldyBJbnRlZ3JhdGlvbnMuRGVkdXBlKCldLFxuICAgICAgLi4ub3B0aW9uc1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9nKGluZm86IHsgbGV2ZWw6IHN0cmluZzsgdGFnczogYW55OyBtZXNzYWdlOiBhbnkgfSwgZG9uZTogKCkgPT4gdm9pZCkge1xuICAgIGlmICh0aGlzLnNpbGVudCkge1xuICAgICAgcmV0dXJuIGRvbmUoKTtcbiAgICB9XG5cbiAgICBjb25zdCBbbWV0YSwgZXh0cmFdID0gcHJlcGFyZVNlbnRyeU1ldGEoaW5mbyk7XG5cbiAgICBpZiAoaW5mby5sZXZlbCA9PT0gXCJlcnJvclwiKSB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBCYXNlRXJyb3IoaW5mbywgbWV0YSk7XG4gICAgICBlcnJvci5uYW1lID0gaW5mb1tcIm5hbWVcIl0gfHwgQmFzZUVycm9yLm5hbWU7XG4gICAgICB0aGlzLlNlbnRyeS53aXRoU2NvcGUoc2NvcGUgPT4ge1xuICAgICAgICBzY29wZS5zZXRFeHRyYXMoZXh0cmEpO1xuICAgICAgICB0aGlzLlNlbnRyeS5jYXB0dXJlRXhjZXB0aW9uKGVycm9yKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLlNlbnRyeS53aXRoU2NvcGUoc2NvcGUgPT4ge1xuICAgICAgICBzY29wZS5zZXRFeHRyYXMoZXh0cmEpO1xuICAgICAgICB0aGlzLlNlbnRyeS5jYXB0dXJlRXZlbnQobWV0YSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBkb25lKCk7XG4gIH1cbn1cbiJdfQ==