"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const triple_beam_1 = require("triple-beam");
const util_1 = require("util");
exports.winstonLevelToSentryLevel = {
    silly: "debug",
    verbose: "debug",
    debug: "debug",
    info: "info",
    warn: "warning",
    error: "error",
    default: "info"
};
exports.stringfyInfo = (info) => {
    const depth = process.env.LOG_LEVEL_DEPTH ? Number(process.env.LOG_LEVEL_DEPTH) : 5;
    const extra = exports.getExtraInfo(info, depth);
    let message = typeof info.message === "string"
        ? info.message || info.originalMessage
        : "\n" + util_1.inspect(info.message || info.originalMessage, { depth, colors: true });
    if (extra) {
        return `${info.level}: ${message} \n${extra}`;
    }
    return `${info.level}: ${message}`;
};
exports.getExtraInfo = (info, depth) => {
    const blacklist = [triple_beam_1.LEVEL, triple_beam_1.SPLAT, triple_beam_1.MESSAGE, "message", "level"];
    const extra = {};
    Object.getOwnPropertyNames(info).forEach(function (key) {
        if (!blacklist.includes(key))
            extra[key] = info[key];
    });
    if (Object.keys(extra).length === 0)
        return undefined;
    return util_1.inspect(extra, { depth, colors: true });
};
exports.prepareSentryMeta = (info) => {
    const _a = Object.assign({}, info), { level, tags, modules, platform = os.platform(), server_name = os.hostname() } = _a, extra = __rest(_a, ["level", "tags", "modules", "platform", "server_name"]);
    let stack;
    // Generate mocked stack for o`bjects
    if (info.level !== "error") {
        const event = new Error(info.message);
        event.name = info.level;
        stack = event.stack;
    }
    const meta = {
        modules,
        server_name,
        platform,
        tags: Object.assign({ platform, stackId: extra.stackId }, tags),
        message: info.message.message || info.message,
        level: exports.winstonLevelToSentryLevel[info.level]
    };
    const extraObject = Object.assign({ stack }, extra);
    return [meta, extraObject];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLnV0aWxzLmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsidXRpbHMvbG9nZ2VyLnV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFDQSx5QkFBeUI7QUFDekIsNkNBQW9EO0FBQ3BELCtCQUErQjtBQUVsQixRQUFBLHlCQUF5QixHQUFHO0lBQ3ZDLEtBQUssRUFBRSxPQUFPO0lBQ2QsT0FBTyxFQUFFLE9BQU87SUFDaEIsS0FBSyxFQUFFLE9BQU87SUFDZCxJQUFJLEVBQUUsTUFBTTtJQUNaLElBQUksRUFBRSxTQUFTO0lBQ2YsS0FBSyxFQUFFLE9BQU87SUFDZCxPQUFPLEVBQUUsTUFBTTtDQUNoQixDQUFDO0FBRVcsUUFBQSxZQUFZLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRTtJQUN4QyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRixNQUFNLEtBQUssR0FBRyxvQkFBWSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4QyxJQUFJLE9BQU8sR0FDVCxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUTtRQUM5QixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZUFBZTtRQUN0QyxDQUFDLENBQUMsSUFBSSxHQUFHLGNBQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDcEYsSUFBSSxLQUFLLEVBQUU7UUFDVCxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLE1BQU0sS0FBSyxFQUFFLENBQUM7S0FDL0M7SUFDRCxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUUsQ0FBQztBQUNyQyxDQUFDLENBQUM7QUFFVyxRQUFBLFlBQVksR0FBRyxDQUFDLElBQVMsRUFBRSxLQUFhLEVBQUUsRUFBRTtJQUN2RCxNQUFNLFNBQVMsR0FBRyxDQUFDLG1CQUFLLEVBQUUsbUJBQUssRUFBRSxxQkFBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM5RCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7SUFDakIsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFTLEdBQUc7UUFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDO1lBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN2RCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztRQUFFLE9BQU8sU0FBUyxDQUFDO0lBQ3RELE9BQU8sY0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNqRCxDQUFDLENBQUM7QUFFVyxRQUFBLGlCQUFpQixHQUFHLENBQUMsSUFBZ0QsRUFBa0MsRUFBRTtJQUNwSCxNQUFNLDRCQUE0RyxFQUE1RyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsT0FBK0IsRUFBN0IsMkVBQTZCLENBQUM7SUFFbkgsSUFBSSxLQUF5QixDQUFDO0lBRTlCLHFDQUFxQztJQUNyQyxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxFQUFFO1FBQzFCLE1BQU0sS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7S0FDckI7SUFFRCxNQUFNLElBQUksR0FBRztRQUNYLE9BQU87UUFDUCxXQUFXO1FBQ1gsUUFBUTtRQUNSLElBQUksa0JBQ0YsUUFBUSxFQUNSLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUNuQixJQUFJLENBQ1I7UUFDRCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU87UUFDN0MsS0FBSyxFQUFFLGlDQUF5QixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDN0MsQ0FBQztJQUVGLE1BQU0sV0FBVyxtQkFDZixLQUFLLElBQ0YsS0FBSyxDQUNULENBQUM7SUFFRixPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzdCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFNlbnRyeSBmcm9tIFwiQHNlbnRyeS9ub2RlXCI7XG5pbXBvcnQgKiBhcyBvcyBmcm9tIFwib3NcIjtcbmltcG9ydCB7IExFVkVMLCBTUExBVCwgTUVTU0FHRSB9IGZyb20gXCJ0cmlwbGUtYmVhbVwiO1xuaW1wb3J0IHsgaW5zcGVjdCB9IGZyb20gXCJ1dGlsXCI7XG5cbmV4cG9ydCBjb25zdCB3aW5zdG9uTGV2ZWxUb1NlbnRyeUxldmVsID0ge1xuICBzaWxseTogXCJkZWJ1Z1wiLFxuICB2ZXJib3NlOiBcImRlYnVnXCIsXG4gIGRlYnVnOiBcImRlYnVnXCIsXG4gIGluZm86IFwiaW5mb1wiLFxuICB3YXJuOiBcIndhcm5pbmdcIixcbiAgZXJyb3I6IFwiZXJyb3JcIixcbiAgZGVmYXVsdDogXCJpbmZvXCJcbn07XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdmeUluZm8gPSAoaW5mbzogYW55KSA9PiB7XG4gIGNvbnN0IGRlcHRoID0gcHJvY2Vzcy5lbnYuTE9HX0xFVkVMX0RFUFRIID8gTnVtYmVyKHByb2Nlc3MuZW52LkxPR19MRVZFTF9ERVBUSCkgOiA1O1xuXG4gIGNvbnN0IGV4dHJhID0gZ2V0RXh0cmFJbmZvKGluZm8sIGRlcHRoKTtcbiAgbGV0IG1lc3NhZ2UgPVxuICAgIHR5cGVvZiBpbmZvLm1lc3NhZ2UgPT09IFwic3RyaW5nXCJcbiAgICAgID8gaW5mby5tZXNzYWdlIHx8IGluZm8ub3JpZ2luYWxNZXNzYWdlXG4gICAgICA6IFwiXFxuXCIgKyBpbnNwZWN0KGluZm8ubWVzc2FnZSB8fCBpbmZvLm9yaWdpbmFsTWVzc2FnZSwgeyBkZXB0aCwgY29sb3JzOiB0cnVlIH0pO1xuICBpZiAoZXh0cmEpIHtcbiAgICByZXR1cm4gYCR7aW5mby5sZXZlbH06ICR7bWVzc2FnZX0gXFxuJHtleHRyYX1gO1xuICB9XG4gIHJldHVybiBgJHtpbmZvLmxldmVsfTogJHttZXNzYWdlfWA7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RXh0cmFJbmZvID0gKGluZm86IGFueSwgZGVwdGg6IG51bWJlcikgPT4ge1xuICBjb25zdCBibGFja2xpc3QgPSBbTEVWRUwsIFNQTEFULCBNRVNTQUdFLCBcIm1lc3NhZ2VcIiwgXCJsZXZlbFwiXTtcbiAgY29uc3QgZXh0cmEgPSB7fTtcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaW5mbykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICBpZiAoIWJsYWNrbGlzdC5pbmNsdWRlcyhrZXkpKSBleHRyYVtrZXldID0gaW5mb1trZXldO1xuICB9KTtcblxuICBpZiAoT2JqZWN0LmtleXMoZXh0cmEpLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgcmV0dXJuIGluc3BlY3QoZXh0cmEsIHsgZGVwdGgsIGNvbG9yczogdHJ1ZSB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBwcmVwYXJlU2VudHJ5TWV0YSA9IChpbmZvOiB7IGxldmVsOiBzdHJpbmc7IHRhZ3M6IGFueTsgbWVzc2FnZTogYW55IH0pOiBbU2VudHJ5LkV2ZW50IHwgRXJyb3IsIG9iamVjdF0gPT4ge1xuICBjb25zdCB7IGxldmVsLCB0YWdzLCBtb2R1bGVzLCBwbGF0Zm9ybSA9IG9zLnBsYXRmb3JtKCksIHNlcnZlcl9uYW1lID0gb3MuaG9zdG5hbWUoKSwgLi4uZXh0cmEgfTogYW55ID0geyAuLi5pbmZvIH07XG5cbiAgbGV0IHN0YWNrOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgLy8gR2VuZXJhdGUgbW9ja2VkIHN0YWNrIGZvciBvYGJqZWN0c1xuICBpZiAoaW5mby5sZXZlbCAhPT0gXCJlcnJvclwiKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgRXJyb3IoaW5mby5tZXNzYWdlKTtcbiAgICBldmVudC5uYW1lID0gaW5mby5sZXZlbDtcbiAgICBzdGFjayA9IGV2ZW50LnN0YWNrO1xuICB9XG5cbiAgY29uc3QgbWV0YSA9IHtcbiAgICBtb2R1bGVzLFxuICAgIHNlcnZlcl9uYW1lLFxuICAgIHBsYXRmb3JtLFxuICAgIHRhZ3M6IHtcbiAgICAgIHBsYXRmb3JtLFxuICAgICAgc3RhY2tJZDogZXh0cmEuc3RhY2tJZCxcbiAgICAgIC4uLnRhZ3NcbiAgICB9LFxuICAgIG1lc3NhZ2U6IGluZm8ubWVzc2FnZS5tZXNzYWdlIHx8IGluZm8ubWVzc2FnZSxcbiAgICBsZXZlbDogd2luc3RvbkxldmVsVG9TZW50cnlMZXZlbFtpbmZvLmxldmVsXVxuICB9O1xuXG4gIGNvbnN0IGV4dHJhT2JqZWN0ID0ge1xuICAgIHN0YWNrLFxuICAgIC4uLmV4dHJhXG4gIH07XG5cbiAgcmV0dXJuIFttZXRhLCBleHRyYU9iamVjdF07XG59O1xuIl19