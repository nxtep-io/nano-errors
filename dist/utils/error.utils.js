"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inheritStackTrace = (baseError, originalStackStrace) => {
    const stack = originalStackStrace.split('\n');
    const header = stack.shift();
    stack.unshift(`    inherits ${header}`);
    stack.unshift(`${baseError.name}: ${baseError.message}`);
    return stack.join('\n');
};
//# sourceMappingURL=error.utils.js.map