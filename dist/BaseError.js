"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
const utils_1 = require("./utils");
/**
 * The base error details enables the developer to add
 * specific metadata to their errors.
 */
class BaseErrorDetails {
    constructor(data = {}) {
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
}
exports.BaseErrorDetails = BaseErrorDetails;
/**
 * An enhanced error instance for the TS Framework.
 * <br />
 * Basic features:
 * - Unique stack id using UUID v4
 * - Serializers: toObject and toJSON
 * - Better stack trace mapping using "clean-stack"
 * - Inherits errors with rich stack trace and json outputs
 */
class BaseError extends Error {
    constructor(input, details = new BaseErrorDetails()) {
        let message;
        let originalMessage;
        let stackId = uuid.v4();
        if (input && input.message) {
            // Handle input message from another error
            message = input.message.split(' (stackId:')[0];
            originalMessage = input.message;
            stackId = input.stackId || details.stackId || stackId;
        }
        else if (input && typeof input.toString === 'function') {
            // Handle input message as string
            message = input.toString();
            originalMessage = input.toString();
            stackId = input.stackId || details.stackId || stackId;
        }
        else {
            // We don't really know how to handle this case
            // Passing on to prevent breaking changes, but this might catch up onto us
            message = input;
            originalMessage = input;
        }
        super(`${message} (stackId: ${stackId})`);
        this.stackId = stackId;
        this.originalMessage = originalMessage;
        this.name = this.constructor.name;
        this.details = details instanceof BaseErrorDetails ? details : new BaseErrorDetails(details);
        // Prepare instance stack trace
        if ((input && input.stack) || details.stack) {
            // Tries to inherit original stack trace, input looks like an Error instance
            this.stack = utils_1.inheritStackTrace(this, input.stack || details.stack);
        }
        else if (typeof Error.captureStackTrace === 'function') {
            // Generates a new Stack Trace (available on v8 platforms)
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            // Fallback mode to simple error
            this.stack = (new Error(this.message)).stack;
        }
        // External dependency for cleaning unuseful stack trace frames
        if (require.resolve('clean-stack')) {
            try {
                // Try to get clean stack gracefully
                this._cleanStack = require('clean-stack');
            }
            catch (exception) {
                console.warn('Dependency "clean-stack" is not supported in this platform, errors will be ignored', exception);
            }
        }
    }
    /**
     * Generates plain object for this error instance.
     */
    toObject() {
        let stack = this.stack;
        // External dependency for cleaning unuseful stack trace frames
        if (this._cleanStack) {
            try {
                stack = this._cleanStack(this.stack);
            }
            catch (exception) {
                console.warn('Dependency "clean-stack" is not supported in this platform, errors will be ignored', exception);
            }
        }
        return {
            message: this.message,
            stackId: this.stackId,
            details: this.details,
            // tslint:disable-next-line:object-shorthand-properties-first
            stack,
        };
    }
    /**
     * Generates clean object for this error instance ready for JSON stringification (optional).
     *
     * @param stringify Flag to enable stringification
     */
    toJSON(stringify = false) {
        const obj = this.toObject();
        if (stringify) {
            return JSON.stringify(obj);
        }
        return obj;
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=BaseError.js.map