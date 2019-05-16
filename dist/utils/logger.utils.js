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
//# sourceMappingURL=logger.utils.js.map