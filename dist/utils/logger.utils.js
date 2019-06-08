"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fast_safe_stringify_1 = require("fast-safe-stringify");
const os = require("os");
const triple_beam_1 = require("triple-beam");
const winston_1 = require("winston");
const BaseError_1 = require("../BaseError");
exports.lineFormat = winston_1.format((info) => {
    const stringifiedRest = fast_safe_stringify_1.default(Object.assign({}, info, { level: undefined, message: undefined, splat: undefined }), null, 2);
    const padding = info.padding && info.padding[info.level] || '';
    if (stringifiedRest !== '{}') {
        info[triple_beam_1.MESSAGE] = `${info.level}:${padding} ${info.message} ${stringifiedRest}`;
    }
    else {
        info[triple_beam_1.MESSAGE] = `${info.level}:${padding} ${info.message}`;
    }
    return info;
});
// Quick and dirty fix for Winston@3.0.0 issue with errors
// @see {https://github.com/winstonjs/winston/issues/1338}
exports.enumerateErrorFormat = winston_1.format((info) => {
    if (info.message instanceof BaseError_1.BaseError) {
        return Object.assign({ message: info.message.message, stack: info.message.stack }, info.message);
    }
    if (info.message instanceof Error) {
        return Object.assign({ message: info.message.message, stack: info.message.stack }, info.message);
    }
    if (info instanceof BaseError_1.BaseError) {
        return Object.assign({ message: info.message, stack: info.stack }, info);
    }
    if (info instanceof Error) {
        return Object.assign({ message: info.message, stack: info.stack }, info);
    }
    return info;
});
exports.winstonLevelToSentryLevel = {
    silly: 'debug',
    verbose: 'debug',
    info: 'info',
    debug: 'debug',
    warn: 'warning',
    error: 'error',
    default: winston_1.info,
};
exports.prepareSentryMeta = (info) => {
    const _a = Object.assign({}, info), { level, tags, modules, platform = os.platform(), server_name = os.hostname() } = _a, extra = __rest(_a, ["level", "tags", "modules", "platform", "server_name"]);
    let stack;
    // Generate mocked stack for objects
    if (info.level !== 'error') {
        const event = new Error(info.message);
        event.name = info.level;
        stack = event.stack;
    }
    const result = {
        modules,
        server_name,
        platform,
        extra: Object.assign({ stack }, extra),
        tags: Object.assign({ platform, stackId: extra.stackId }, tags),
        message: info.message.message || info.message,
        level: exports.winstonLevelToSentryLevel[info.level],
    };
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsidXRpbHMvbG9nZ2VyLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0EsNkRBQWdEO0FBQ2hELHlCQUF5QjtBQUN6Qiw2Q0FBc0M7QUFDdEMscUNBQXVDO0FBQ3ZDLDRDQUF5QztBQUU1QixRQUFBLFVBQVUsR0FBRyxnQkFBTSxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUU7SUFDN0MsTUFBTSxlQUFlLEdBQUcsNkJBQWEsbUJBQ2hDLElBQUksSUFDUCxLQUFLLEVBQUUsU0FBUyxFQUNoQixPQUFPLEVBQUUsU0FBUyxFQUNsQixLQUFLLEVBQUUsU0FBUyxLQUNmLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVaLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQy9ELElBQUksZUFBZSxLQUFLLElBQUksRUFBRTtRQUM1QixJQUFJLENBQUMscUJBQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxlQUFlLEVBQUUsQ0FBQztLQUMvRTtTQUFNO1FBQ0wsSUFBSSxDQUFDLHFCQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUM1RDtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyxDQUFDLENBQUM7QUFFSCwwREFBMEQ7QUFDMUQsMERBQTBEO0FBQzdDLFFBQUEsb0JBQW9CLEdBQUcsZ0JBQU0sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFO0lBQ3ZELElBQUksSUFBSSxDQUFDLE9BQU8sWUFBWSxxQkFBUyxFQUFFO1FBQ3JDLHVCQUNFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUN0QixJQUFJLENBQUMsT0FBTyxFQUNmO0tBQ0g7SUFFRCxJQUFJLElBQUksQ0FBQyxPQUFPLFlBQVksS0FBSyxFQUFFO1FBQ2pDLHVCQUNFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFDN0IsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUN0QixJQUFJLENBQUMsT0FBTyxFQUNmO0tBQ0g7SUFFRCxJQUFJLElBQUksWUFBWSxxQkFBUyxFQUFFO1FBQzdCLHVCQUNFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUNyQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFDZCxJQUFJLEVBQ1A7S0FDSDtJQUVELElBQUksSUFBSSxZQUFZLEtBQUssRUFBRTtRQUN6Qix1QkFDRSxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQ2QsSUFBSSxFQUNQO0tBQ0g7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMsQ0FBQyxDQUFDO0FBR1UsUUFBQSx5QkFBeUIsR0FBRztJQUN2QyxLQUFLLEVBQUUsT0FBTztJQUNkLE9BQU8sRUFBRSxPQUFPO0lBQ2hCLElBQUksRUFBRSxNQUFNO0lBQ1osS0FBSyxFQUFFLE9BQU87SUFDZCxJQUFJLEVBQUUsU0FBUztJQUNmLEtBQUssRUFBRSxPQUFPO0lBQ2QsT0FBTyxFQUFFLGNBQUk7Q0FDZCxDQUFDO0FBR1csUUFBQSxpQkFBaUIsR0FBRyxDQUFDLElBQWdELEVBQXdCLEVBQUU7SUFDMUcsTUFBTSw0QkFPYyxFQVBkLEVBQ0osS0FBSyxFQUNMLElBQUksRUFDSixPQUFPLEVBQ1AsUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsRUFDeEIsV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FFVCxFQURsQiwyRUFDa0IsQ0FBQztJQUVyQixJQUFJLEtBQXlCLENBQUM7SUFFOUIsb0NBQW9DO0lBQ3BDLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7UUFDMUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztLQUNyQjtJQUVELE1BQU0sTUFBTSxHQUFHO1FBQ2IsT0FBTztRQUNQLFdBQVc7UUFDWCxRQUFRO1FBQ1IsS0FBSyxrQkFDSCxLQUFLLElBQ0YsS0FBSyxDQUNUO1FBQ0QsSUFBSSxrQkFDRixRQUFRLEVBQ1IsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQ25CLElBQUksQ0FDUjtRQUNELE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTztRQUM3QyxLQUFLLEVBQUUsaUNBQXlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztLQUM3QyxDQUFDO0lBRUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgU2VudHJ5IGZyb20gJ0BzZW50cnkvbm9kZSc7XG5pbXBvcnQganNvblN0cmluZ2lmeSBmcm9tICdmYXN0LXNhZmUtc3RyaW5naWZ5JztcbmltcG9ydCAqIGFzIG9zIGZyb20gJ29zJztcbmltcG9ydCB7IE1FU1NBR0UgfSBmcm9tICd0cmlwbGUtYmVhbSc7XG5pbXBvcnQgeyBmb3JtYXQsIGluZm8gfSBmcm9tICd3aW5zdG9uJztcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gJy4uL0Jhc2VFcnJvcic7XG5cbmV4cG9ydCBjb25zdCBsaW5lRm9ybWF0ID0gZm9ybWF0KChpbmZvOiBhbnkpID0+IHtcbiAgY29uc3Qgc3RyaW5naWZpZWRSZXN0ID0ganNvblN0cmluZ2lmeSh7XG4gICAgLi4uaW5mbyxcbiAgICBsZXZlbDogdW5kZWZpbmVkLFxuICAgIG1lc3NhZ2U6IHVuZGVmaW5lZCxcbiAgICBzcGxhdDogdW5kZWZpbmVkXG4gIH0sIG51bGwsIDIpO1xuXG4gIGNvbnN0IHBhZGRpbmcgPSBpbmZvLnBhZGRpbmcgJiYgaW5mby5wYWRkaW5nW2luZm8ubGV2ZWxdIHx8ICcnO1xuICBpZiAoc3RyaW5naWZpZWRSZXN0ICE9PSAne30nKSB7XG4gICAgaW5mb1tNRVNTQUdFXSA9IGAke2luZm8ubGV2ZWx9OiR7cGFkZGluZ30gJHtpbmZvLm1lc3NhZ2V9ICR7c3RyaW5naWZpZWRSZXN0fWA7XG4gIH0gZWxzZSB7XG4gICAgaW5mb1tNRVNTQUdFXSA9IGAke2luZm8ubGV2ZWx9OiR7cGFkZGluZ30gJHtpbmZvLm1lc3NhZ2V9YDtcbiAgfVxuXG4gIHJldHVybiBpbmZvO1xufSk7XG5cbi8vIFF1aWNrIGFuZCBkaXJ0eSBmaXggZm9yIFdpbnN0b25AMy4wLjAgaXNzdWUgd2l0aCBlcnJvcnNcbi8vIEBzZWUge2h0dHBzOi8vZ2l0aHViLmNvbS93aW5zdG9uanMvd2luc3Rvbi9pc3N1ZXMvMTMzOH1cbmV4cG9ydCBjb25zdCBlbnVtZXJhdGVFcnJvckZvcm1hdCA9IGZvcm1hdCgoaW5mbzogYW55KSA9PiB7XG4gIGlmIChpbmZvLm1lc3NhZ2UgaW5zdGFuY2VvZiBCYXNlRXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLm1lc3NhZ2UsXG4gICAgICBzdGFjazogaW5mby5tZXNzYWdlLnN0YWNrLFxuICAgICAgLi4uaW5mby5tZXNzYWdlXG4gICAgfTtcbiAgfVxuXG4gIGlmIChpbmZvLm1lc3NhZ2UgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UubWVzc2FnZSxcbiAgICAgIHN0YWNrOiBpbmZvLm1lc3NhZ2Uuc3RhY2ssXG4gICAgICAuLi5pbmZvLm1lc3NhZ2VcbiAgICB9O1xuICB9XG5cbiAgaWYgKGluZm8gaW5zdGFuY2VvZiBCYXNlRXJyb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbWVzc2FnZTogaW5mby5tZXNzYWdlLFxuICAgICAgc3RhY2s6IGluZm8uc3RhY2ssXG4gICAgICAuLi5pbmZvLFxuICAgIH07XG4gIH1cblxuICBpZiAoaW5mbyBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IGluZm8ubWVzc2FnZSxcbiAgICAgIHN0YWNrOiBpbmZvLnN0YWNrLFxuICAgICAgLi4uaW5mbyxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGluZm87XG59KTtcblxuXG5leHBvcnQgY29uc3Qgd2luc3RvbkxldmVsVG9TZW50cnlMZXZlbCA9IHtcbiAgc2lsbHk6ICdkZWJ1ZycsXG4gIHZlcmJvc2U6ICdkZWJ1ZycsXG4gIGluZm86ICdpbmZvJyxcbiAgZGVidWc6ICdkZWJ1ZycsXG4gIHdhcm46ICd3YXJuaW5nJyxcbiAgZXJyb3I6ICdlcnJvcicsXG4gIGRlZmF1bHQ6IGluZm8sXG59O1xuXG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlU2VudHJ5TWV0YSA9IChpbmZvOiB7IGxldmVsOiBzdHJpbmcsIHRhZ3M6IGFueSwgbWVzc2FnZTogYW55IH0pOiBTZW50cnkuRXZlbnQgfCBFcnJvciA9PiB7XG4gIGNvbnN0IHtcbiAgICBsZXZlbCxcbiAgICB0YWdzLFxuICAgIG1vZHVsZXMsXG4gICAgcGxhdGZvcm0gPSBvcy5wbGF0Zm9ybSgpLFxuICAgIHNlcnZlcl9uYW1lID0gb3MuaG9zdG5hbWUoKSxcbiAgICAuLi5leHRyYVxuICB9OiBhbnkgPSB7IC4uLmluZm8gfTtcblxuICBsZXQgc3RhY2s6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAvLyBHZW5lcmF0ZSBtb2NrZWQgc3RhY2sgZm9yIG9iamVjdHNcbiAgaWYgKGluZm8ubGV2ZWwgIT09ICdlcnJvcicpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyBFcnJvcihpbmZvLm1lc3NhZ2UpO1xuICAgIGV2ZW50Lm5hbWUgPSBpbmZvLmxldmVsO1xuICAgIHN0YWNrID0gZXZlbnQuc3RhY2s7XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSB7XG4gICAgbW9kdWxlcyxcbiAgICBzZXJ2ZXJfbmFtZSxcbiAgICBwbGF0Zm9ybSxcbiAgICBleHRyYToge1xuICAgICAgc3RhY2ssXG4gICAgICAuLi5leHRyYSxcbiAgICB9LFxuICAgIHRhZ3M6IHtcbiAgICAgIHBsYXRmb3JtLFxuICAgICAgc3RhY2tJZDogZXh0cmEuc3RhY2tJZCxcbiAgICAgIC4uLnRhZ3MsXG4gICAgfSxcbiAgICBtZXNzYWdlOiBpbmZvLm1lc3NhZ2UubWVzc2FnZSB8fCBpbmZvLm1lc3NhZ2UsXG4gICAgbGV2ZWw6IHdpbnN0b25MZXZlbFRvU2VudHJ5TGV2ZWxbaW5mby5sZXZlbF0sXG4gIH07XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07Il19