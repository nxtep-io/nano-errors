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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUVycm9yLmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsiQmFzZUVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsNkJBQTZCO0FBQzdCLG1DQUE0QztBQUU1Qzs7O0dBR0c7QUFDSCxNQUFhLGdCQUFnQjtJQUczQixZQUFZLElBQUksR0FBRyxFQUFFO1FBQ25CLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBVkQsNENBVUM7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILE1BQWEsU0FBVSxTQUFRLEtBQUs7SUFxQmxDLFlBQVksS0FBVyxFQUFFLFVBQWUsSUFBSSxnQkFBZ0IsRUFBRTtRQUM1RCxJQUFJLE9BQWUsQ0FBQztRQUNwQixJQUFJLGVBQXVCLENBQUM7UUFDNUIsSUFBSSxPQUFPLEdBQVcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBRWhDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDMUIsMENBQTBDO1lBQzFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvQyxlQUFlLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNoQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQztTQUN2RDthQUFNLElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxDQUFDLFFBQVEsS0FBSyxVQUFVLEVBQUU7WUFDeEQsaUNBQWlDO1lBQ2pDLE9BQU8sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDM0IsZUFBZSxH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ZCBmcm9tICd1dWlkJztcbmltcG9ydCB7IGluaGVyaXRTdGFja1RyYWNlIH0gZnJvbSAnLi91dGlscyc7XG5cbi8qKlxuICogVGhlIGJhc2UgZXJyb3IgZGV0YWlscyBlbmFibGVzIHRoZSBkZXZlbG9wZXIgdG8gYWRkXG4gKiBzcGVjaWZpYyBtZXRhZGF0YSB0byB0aGVpciBlcnJvcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlRXJyb3JEZXRhaWxzIHtcbiAgW2tleTogc3RyaW5nXTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEgPSB7fSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdGhpc1trZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFuIGVuaGFuY2VkIGVycm9yIGluc3RhbmNlIGZvciB0aGUgVFMgRnJhbWV3b3JrLlxuICogPGJyIC8+XG4gKiBCYXNpYyBmZWF0dXJlczpcbiAqIC0gVW5pcXVlIHN0YWNrIGlkIHVzaW5nIFVVSUQgdjRcbiAqIC0gU2VyaWFsaXplcnM6IHRvT2JqZWN0IGFuZCB0b0pTT05cbiAqIC0gQmV0dGVyIHN0YWNrIHRyYWNlIG1hcHBpbmcgdXNpbmcgXCJjbGVhbi1zdGFja1wiXG4gKiAtIEluaGVyaXRzIGVycm9ycyB3aXRoIHJpY2ggc3RhY2sgdHJhY2UgYW5kIGpzb24gb3V0cHV0c1xuICovXG5leHBvcnQgY2xhc3MgQmFzZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAvKipcbiAgICogVGhlIHVuaXF1ZSBleGNlcHRpb24gaWQuXG4gICAqL1xuICBwdWJsaWMgc3RhY2tJZDogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgZXJyb3IgZGV0YWlscyBmb3IgZWFzaWVyIHRyYWNraW5nIG9mIGV4Y2VwdGlvbnNcbiAgICovXG4gIHB1YmxpYyBkZXRhaWxzOiBCYXNlRXJyb3JEZXRhaWxzO1xuXG4gIC8qKlxuICAgKiBUaGUgZXJyb3Igb3JpZ2luYWwgbWVzc2FnZSB3aXRob3V0IHRoZSBnZW5lcmF0ZWQgbWV0YWRhdGEuXG4gICAqL1xuICBwdWJsaWMgb3JpZ2luYWxNZXNzYWdlOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBgY2xlYW4tc3RhY2tgIHdyYXBwZXIgd2hlbiBhdmFpbGFibGUuXG4gICAqL1xuICBwcm90ZWN0ZWQgX2NsZWFuU3RhY2s/OiAoaW5wdXQ6IHN0cmluZykgPT4gc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKGlucHV0PzogYW55LCBkZXRhaWxzOiBhbnkgPSBuZXcgQmFzZUVycm9yRGV0YWlscygpKSB7XG4gICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICBsZXQgb3JpZ2luYWxNZXNzYWdlOiBzdHJpbmc7XG4gICAgbGV0IHN0YWNrSWQ6IHN0cmluZyA9IHV1aWQudjQoKTtcblxuICAgIGlmIChpbnB1dCAmJiBpbnB1dC5tZXNzYWdlKSB7XG4gICAgICAvLyBIYW5kbGUgaW5wdXQgbWVzc2FnZSBmcm9tIGFub3RoZXIgZXJyb3JcbiAgICAgIG1lc3NhZ2UgPSBpbnB1dC5tZXNzYWdlLnNwbGl0KCcgKHN0YWNrSWQ6JylbMF07XG4gICAgICBvcmlnaW5hbE1lc3NhZ2UgPSBpbnB1dC5tZXNzYWdlO1xuICAgICAgc3RhY2tJZCA9IGlucHV0LnN0YWNrSWQgfHwgZGV0YWlscy5zdGFja0lkIHx8IHN0YWNrSWQ7XG4gICAgfSBlbHNlIGlmIChpbnB1dCAmJiB0eXBlb2YgaW5wdXQudG9TdHJpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIC8vIEhhbmRsZSBpbnB1dCBtZXNzYWdlIGFzIHN0cmluZ1xuICAgICAgbWVzc2FnZSA9IGlucHV0LnRvU3RyaW5nKCk7XG4gICAgICBvcmlnaW5hbE1lc3NhZ2UgPSBpbnB1dC50b1N0cmluZygpO1xuICAgICAgc3RhY2tJZCA9IGlucHV0LnN0YWNrSWQgfHwgZGV0YWlscy5zdGFja0lkIHx8IHN0YWNrSWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFdlIGRvbid0IHJlYWxseSBrbm93IGhvdyB0byBoYW5kbGUgdGhpcyBjYXNlXG4gICAgICAvLyBQYXNzaW5nIG9uIHRvIHByZXZlbnQgYnJlYWtpbmcgY2hhbmdlcywgYnV0IHRoaXMgbWlnaHQgY2F0Y2ggdXAgb250byB1c1xuICAgICAgbWVzc2FnZSA9IGlucHV0O1xuICAgICAgb3JpZ2luYWxNZXNzYWdlID0gaW5wdXQ7XG4gICAgfVxuXG4gICAgc3VwZXIoYCR7bWVzc2FnZX0gKHN0YWNrSWQ6ICR7c3RhY2tJZH0pYCk7XG4gICAgdGhpcy5zdGFja0lkID0gc3RhY2tJZDtcbiAgICB0aGlzLm9yaWdpbmFsTWVzc2FnZSA9IG9yaWdpbmFsTWVzc2FnZTtcbiAgICB0aGlzLm5hbWUgPSB0aGlzLmNvbnN0cnVjdG9yLm5hbWU7XG4gICAgdGhpcy5kZXRhaWxzID0gZGV0YWlscyBpbnN0YW5jZW9mIEJhc2VFcnJvckRldGFpbHMgPyBkZXRhaWxzIDogbmV3IEJhc2VFcnJvckRldGFpbHMoZGV0YWlscyk7XG5cbiAgICAvLyBQcmVwYXJlIGluc3RhbmNlIHN0YWNrIHRyYWNlXG4gICAgaWYgKChpbnB1dCAmJiBpbnB1dC5zdGFjaykgfHwgZGV0YWlscy5zdGFjaykge1xuICAgICAgLy8gVHJpZXMgdG8gaW5oZXJpdCBvcmlnaW5hbCBzdGFjayB0cmFjZSwgaW5wdXQgbG9va3MgbGlrZSBhbiBFcnJvciBpbnN0YW5jZVxuICAgICAgdGhpcy5zdGFjayA9IGluaGVyaXRTdGFja1RyYWNlKHRoaXMsIGlucHV0LnN0YWNrIHx8IGRldGFpbHMuc3RhY2spO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBHZW5lcmF0ZXMgYSBuZXcgU3RhY2sgVHJhY2UgKGF2YWlsYWJsZSBvbiB2OCBwbGF0Zm9ybXMpXG4gICAgICBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSh0aGlzLCB0aGlzLmNvbnN0cnVjdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRmFsbGJhY2sgbW9kZSB0byBzaW1wbGUgZXJyb3JcbiAgICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKHRoaXMubWVzc2FnZSkpLnN0YWNrO1xuICAgIH1cblxuICAgIC8vIEV4dGVybmFsIGRlcGVuZGVuY3kgZm9yIGNsZWFuaW5nIHVudXNlZnVsIHN0YWNrIHRyYWNlIGZyYW1lc1xuICAgIGlmIChyZXF1aXJlLnJlc29sdmUoJ2NsZWFuLXN0YWNrJykpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRyeSB0byBnZXQgY2xlYW4gc3RhY2sgZ3JhY2VmdWxseVxuICAgICAgICB0aGlzLl9jbGVhblN0YWNrID0gcmVxdWlyZSgnY2xlYW4tc3RhY2snKTtcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0RlcGVuZGVuY3kgXCJjbGVhbi1zdGFja1wiIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBwbGF0Zm9ybSwgZXJyb3JzIHdpbGwgYmUgaWdub3JlZCcsIGV4Y2VwdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBwbGFpbiBvYmplY3QgZm9yIHRoaXMgZXJyb3IgaW5zdGFuY2UuXG4gICAqL1xuICBwdWJsaWMgdG9PYmplY3QoKSB7XG4gICAgbGV0IHN0YWNrID0gdGhpcy5zdGFjaztcblxuICAgIC8vIEV4dGVybmFsIGRlcGVuZGVuY3kgZm9yIGNsZWFuaW5nIHVudXNlZnVsIHN0YWNrIHRyYWNlIGZyYW1lc1xuICAgIGlmICh0aGlzLl9jbGVhblN0YWNrKSB7XG4gICAgICB0cnkge1xuICAgICAgICBzdGFjayA9IHRoaXMuX2NsZWFuU3RhY2sodGhpcy5zdGFjayk7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdEZXBlbmRlbmN5IFwiY2xlYW4tc3RhY2tcIiBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgcGxhdGZvcm0sIGVycm9ycyB3aWxsIGJlIGlnbm9yZWQnLCBleGNlcHRpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBtZXNzYWdlOiB0aGlzLm1lc3NhZ2UsXG4gICAgICBzdGFja0lkOiB0aGlzLnN0YWNrSWQsXG4gICAgICBkZXRhaWxzOiB0aGlzLmRldGFpbHMsXG4gICAgICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6b2JqZWN0LXNob3J0aGFuZC1wcm9wZXJ0aWVzLWZpcnN0XG4gICAgICBzdGFjayxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBjbGVhbiBvYmplY3QgZm9yIHRoaXMgZXJyb3IgaW5zdGFuY2UgcmVhZHkgZm9yIEpTT04gc3RyaW5naWZpY2F0aW9uIChvcHRpb25hbCkuXG4gICAqXG4gICAqIEBwYXJhbSBzdHJpbmdpZnkgRmxhZyB0byBlbmFibGUgc3RyaW5naWZpY2F0aW9uXG4gICAqL1xuICBwdWJsaWMgdG9KU09OKHN0cmluZ2lmeTogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcbiAgICBjb25zdCBvYmogPSB0aGlzLnRvT2JqZWN0KCk7XG4gICAgaWYgKHN0cmluZ2lmeSkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbn1cbiJdfQ==