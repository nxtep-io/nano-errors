"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
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
 */
class BaseError extends Error {
    constructor(message, details = new BaseErrorDetails()) {
        const stackId = uuid.v4();
        super(`${message} (stackId: ${stackId})`);
        this.stackId = stackId;
        this.originalMessage = message;
        this.name = this.constructor.name;
        this.details = details instanceof BaseErrorDetails ? details : new BaseErrorDetails(details);
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        }
        else {
            this.stack = (new Error(message)).stack;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Jhc2VFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUU3Qjs7O0dBR0c7QUFDSCxNQUFhLGdCQUFnQjtJQUczQixZQUFZLElBQUksR0FBRyxFQUFFO1FBQ25CLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBVkQsNENBVUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBYSxTQUFVLFNBQVEsS0FBSztJQXFCbEMsWUFBWSxPQUFPLEVBQUUsVUFBZSxJQUFJLGdCQUFnQixFQUFFO1FBQ3hELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUMxQixLQUFLLENBQUMsR0FBRyxPQUFPLGNBQWMsT0FBTyxHQUFHLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxZQUFZLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFN0YsSUFBSSxPQUFPLEtBQUssQ0FBQyxpQkFBaUIsS0FBSyxVQUFVLEVBQUU7WUFDakQsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDakQ7YUFBTTtZQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztTQUN6QztRQUVELElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsRUFBRTtZQUNsQyxJQUFJO2dCQUNGLG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDM0M7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxvRkFBb0YsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUMvRztTQUNGO0lBQ0gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksUUFBUTtRQUNiLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUk7Z0JBQ0YsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RDO1lBQUMsT0FBTyxTQUFTLEVBQUU7Z0JBQ2xCLE9BQU8sQ0FBQyxJQUFJLENBQUMsb0ZBQW9GLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDL0c7U0FDRjtRQUVELE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixLQUFLO1NBQ04sQ0FBQztJQUNKLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ksTUFBTSxDQUFDLFNBQVMsR0FBRyxLQUFLO1FBQzdCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM1QixJQUFJLFNBQVMsRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztDQUNGO0FBL0VELDhCQStFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHV1aWQgZnJvbSAndXVpZCc7XG5cbi8qKlxuICogVGhlIGJhc2UgZXJyb3IgZGV0YWlscyBlbmFibGVzIHRoZSBkZXZlbG9wZXIgdG8gYWRkXG4gKiBzcGVjaWZpYyBtZXRhZGF0YSB0byB0aGVpciBlcnJvcnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlRXJyb3JEZXRhaWxzIHtcbiAgW2tleTogc3RyaW5nXTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEgPSB7fSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdGhpc1trZXldID0gZGF0YVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFuIGVuaGFuY2VkIGVycm9yIGluc3RhbmNlIGZvciB0aGUgVFMgRnJhbWV3b3JrLlxuICogPGJyIC8+XG4gKiBCYXNpYyBmZWF0dXJlczpcbiAqIC0gVW5pcXVlIHN0YWNrIGlkIHVzaW5nIFVVSUQgdjRcbiAqIC0gU2VyaWFsaXplcnM6IHRvT2JqZWN0IGFuZCB0b0pTT05cbiAqIC0gQmV0dGVyIHN0YWNrIHRyYWNlIG1hcHBpbmcgdXNpbmcgXCJjbGVhbi1zdGFja1wiXG4gKi9cbmV4cG9ydCBjbGFzcyBCYXNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIC8qKlxuICAgKiBUaGUgdW5pcXVlIGV4Y2VwdGlvbiBpZC5cbiAgICovXG4gIHB1YmxpYyBzdGFja0lkOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBlcnJvciBkZXRhaWxzIGZvciBlYXNpZXIgdHJhY2tpbmcgb2YgZXhjZXB0aW9uc1xuICAgKi9cbiAgcHVibGljIGRldGFpbHM6IEJhc2VFcnJvckRldGFpbHM7XG5cbiAgLyoqXG4gICAqIFRoZSBlcnJvciBvcmlnaW5hbCBtZXNzYWdlIHdpdGhvdXQgdGhlIGdlbmVyYXRlZCBtZXRhZGF0YS5cbiAgICovXG4gIHB1YmxpYyBvcmlnaW5hbE1lc3NhZ2U6IHN0cmluZztcbiAgXG4gIC8qKlxuICAgKiBUaGUgYGNsZWFuLXN0YWNrYCB3cmFwcGVyIHdoZW4gYXZhaWxhYmxlLlxuICAgKi9cbiAgcHJvdGVjdGVkIF9jbGVhblN0YWNrO1xuXG4gIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGRldGFpbHM6IGFueSA9IG5ldyBCYXNlRXJyb3JEZXRhaWxzKCkpIHtcbiAgICBjb25zdCBzdGFja0lkID0gdXVpZC52NCgpO1xuICAgIHN1cGVyKGAke21lc3NhZ2V9IChzdGFja0lkOiAke3N0YWNrSWR9KWApO1xuICAgIHRoaXMuc3RhY2tJZCA9IHN0YWNrSWQ7XG4gICAgdGhpcy5vcmlnaW5hbE1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgIHRoaXMubmFtZSA9IHRoaXMuY29uc3RydWN0b3IubmFtZTtcbiAgICB0aGlzLmRldGFpbHMgPSBkZXRhaWxzIGluc3RhbmNlb2YgQmFzZUVycm9yRGV0YWlscyA/IGRldGFpbHMgOiBuZXcgQmFzZUVycm9yRGV0YWlscyhkZXRhaWxzKTtcblxuICAgIGlmICh0eXBlb2YgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIHRoaXMuY29uc3RydWN0b3IpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcihtZXNzYWdlKSkuc3RhY2s7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVpcmUucmVzb2x2ZSgnY2xlYW4tc3RhY2snKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVHJ5IHRvIGdldCBjbGVhbiBzdGFjayBncmFjZWZ1bGx5XG4gICAgICAgIHRoaXMuX2NsZWFuU3RhY2sgPSByZXF1aXJlKCdjbGVhbi1zdGFjaycpO1xuICAgICAgfSBjYXRjaCAoZXhjZXB0aW9uKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignRGVwZW5kZW5jeSBcImNsZWFuLXN0YWNrXCIgaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIHBsYXRmb3JtLCBlcnJvcnMgd2lsbCBiZSBpZ25vcmVkJywgZXhjZXB0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIHBsYWluIG9iamVjdCBmb3IgdGhpcyBlcnJvciBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyB0b09iamVjdCgpIHtcbiAgICBsZXQgc3RhY2sgPSB0aGlzLnN0YWNrO1xuXG4gICAgaWYgKHRoaXMuX2NsZWFuU3RhY2spIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YWNrID0gdGhpcy5fY2xlYW5TdGFjayh0aGlzLnN0YWNrKTtcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0RlcGVuZGVuY3kgXCJjbGVhbi1zdGFja1wiIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBwbGF0Zm9ybSwgZXJyb3JzIHdpbGwgYmUgaWdub3JlZCcsIGV4Y2VwdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIHN0YWNrSWQ6IHRoaXMuc3RhY2tJZCxcbiAgICAgIGRldGFpbHM6IHRoaXMuZGV0YWlscyxcbiAgICAgIHN0YWNrLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIGNsZWFuIG9iamVjdCBmb3IgdGhpcyBlcnJvciBpbnN0YW5jZSByZWFkeSBmb3IgSlNPTiBzdHJpbmdpZmljYXRpb24gKG9wdGlvbmFsKS5cbiAgICpcbiAgICogQHBhcmFtIHN0cmluZ2lmeSBGbGFnIHRvIGVuYWJsZSBzdHJpbmdpZmljYXRpb25cbiAgICovXG4gIHB1YmxpYyB0b0pTT04oc3RyaW5naWZ5ID0gZmFsc2UpOiBhbnkge1xuICAgIGNvbnN0IG9iaiA9IHRoaXMudG9PYmplY3QoKTtcbiAgICBpZiAoc3RyaW5naWZ5KSB7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2JqKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxufVxuIl19