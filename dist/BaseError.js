"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid = require("uuid");
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
 * - Better stack trace mapping
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
     * Generates POJO for this error instance.
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
     * Generates JSON for this error instance.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZUVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0Jhc2VFcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZCQUE2QjtBQUU3QixNQUFhLGdCQUFnQjtJQUczQixZQUFZLElBQUksR0FBRyxFQUFFO1FBQ25CLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN2QjtTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBVkQsNENBVUM7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsTUFBYSxTQUFVLFNBQVEsS0FBSztJQU1sQyxZQUFZLE9BQU8sRUFBRSxVQUFlLElBQUksZ0JBQWdCLEVBQUU7UUFDeEQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxHQUFHLE9BQU8sY0FBYyxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLFlBQVksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUU3RixJQUFJLE9BQU8sS0FBSyxDQUFDLGlCQUFpQixLQUFLLFVBQVUsRUFBRTtZQUNqRCxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqRDthQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQ3pDO1FBRUQsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxFQUFFO1lBQ2xDLElBQUk7Z0JBQ0Ysb0NBQW9DO2dCQUNwQyxJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUMzQztZQUFDLE9BQU8sU0FBUyxFQUFFO2dCQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLG9GQUFvRixFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQy9HO1NBQ0Y7SUFDSCxDQUFDO0lBRUQ7O09BRUc7SUFDSSxRQUFRO1FBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV2QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSTtnQkFDRixLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEM7WUFBQyxPQUFPLFNBQVMsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxvRkFBb0YsRUFBRSxTQUFTLENBQUMsQ0FBQzthQUMvRztTQUNGO1FBRUQsT0FBTztZQUNMLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztZQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1lBQ3JCLEtBQUs7U0FDTixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUs7UUFDN0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVCLElBQUksU0FBUyxFQUFFO1lBQ2IsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0Y7QUFoRUQsOEJBZ0VDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdXVpZCBmcm9tICd1dWlkJztcblxuZXhwb3J0IGNsYXNzIEJhc2VFcnJvckRldGFpbHMge1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG5cbiAgY29uc3RydWN0b3IoZGF0YSA9IHt9KSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzW2tleV0gPSBkYXRhW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQW4gZW5oYW5jZWQgZXJyb3IgaW5zdGFuY2UgZm9yIHRoZSBUUyBGcmFtZXdvcmsuXG4gKiA8YnIgLz5cbiAqIEJhc2ljIGZlYXR1cmVzOlxuICogLSBVbmlxdWUgc3RhY2sgaWQgdXNpbmcgVVVJRCB2NFxuICogLSBTZXJpYWxpemVyczogdG9PYmplY3QgYW5kIHRvSlNPTlxuICogLSBCZXR0ZXIgc3RhY2sgdHJhY2UgbWFwcGluZ1xuICovXG5leHBvcnQgY2xhc3MgQmFzZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBwdWJsaWMgc3RhY2tJZDogc3RyaW5nO1xuICBwdWJsaWMgZGV0YWlsczogQmFzZUVycm9yRGV0YWlscztcbiAgcHVibGljIG9yaWdpbmFsTWVzc2FnZTogc3RyaW5nO1xuICBwcm90ZWN0ZWQgX2NsZWFuU3RhY2s7XG5cbiAgY29uc3RydWN0b3IobWVzc2FnZSwgZGV0YWlsczogYW55ID0gbmV3IEJhc2VFcnJvckRldGFpbHMoKSkge1xuICAgIGNvbnN0IHN0YWNrSWQgPSB1dWlkLnY0KCk7XG4gICAgc3VwZXIoYCR7bWVzc2FnZX0gKHN0YWNrSWQ6ICR7c3RhY2tJZH0pYCk7XG4gICAgdGhpcy5zdGFja0lkID0gc3RhY2tJZDtcbiAgICB0aGlzLm9yaWdpbmFsTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgdGhpcy5uYW1lID0gdGhpcy5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgIHRoaXMuZGV0YWlscyA9IGRldGFpbHMgaW5zdGFuY2VvZiBCYXNlRXJyb3JEZXRhaWxzID8gZGV0YWlscyA6IG5ldyBCYXNlRXJyb3JEZXRhaWxzKGRldGFpbHMpO1xuXG4gICAgaWYgKHR5cGVvZiBFcnJvci5jYXB0dXJlU3RhY2tUcmFjZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgdGhpcy5jb25zdHJ1Y3Rvcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKG1lc3NhZ2UpKS5zdGFjaztcbiAgICB9XG5cbiAgICBpZiAocmVxdWlyZS5yZXNvbHZlKCdjbGVhbi1zdGFjaycpKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUcnkgdG8gZ2V0IGNsZWFuIHN0YWNrIGdyYWNlZnVsbHlcbiAgICAgICAgdGhpcy5fY2xlYW5TdGFjayA9IHJlcXVpcmUoJ2NsZWFuLXN0YWNrJyk7XG4gICAgICB9IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdEZXBlbmRlbmN5IFwiY2xlYW4tc3RhY2tcIiBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgcGxhdGZvcm0sIGVycm9ycyB3aWxsIGJlIGlnbm9yZWQnLCBleGNlcHRpb24pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgUE9KTyBmb3IgdGhpcyBlcnJvciBpbnN0YW5jZS5cbiAgICovXG4gIHB1YmxpYyB0b09iamVjdCgpIHtcbiAgICBsZXQgc3RhY2sgPSB0aGlzLnN0YWNrO1xuXG4gICAgaWYgKHRoaXMuX2NsZWFuU3RhY2spIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHN0YWNrID0gdGhpcy5fY2xlYW5TdGFjayh0aGlzLnN0YWNrKTtcbiAgICAgIH0gY2F0Y2ggKGV4Y2VwdGlvbikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ0RlcGVuZGVuY3kgXCJjbGVhbi1zdGFja1wiIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBwbGF0Zm9ybSwgZXJyb3JzIHdpbGwgYmUgaWdub3JlZCcsIGV4Y2VwdGlvbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG1lc3NhZ2U6IHRoaXMubWVzc2FnZSxcbiAgICAgIHN0YWNrSWQ6IHRoaXMuc3RhY2tJZCxcbiAgICAgIGRldGFpbHM6IHRoaXMuZGV0YWlscyxcbiAgICAgIHN0YWNrLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGVzIEpTT04gZm9yIHRoaXMgZXJyb3IgaW5zdGFuY2UuXG4gICAqXG4gICAqIEBwYXJhbSBzdHJpbmdpZnkgRmxhZyB0byBlbmFibGUgc3RyaW5naWZpY2F0aW9uXG4gICAqL1xuICBwdWJsaWMgdG9KU09OKHN0cmluZ2lmeSA9IGZhbHNlKTogYW55IHtcbiAgICBjb25zdCBvYmogPSB0aGlzLnRvT2JqZWN0KCk7XG4gICAgaWYgKHN0cmluZ2lmeSkge1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KG9iaik7XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbn1cbiJdfQ==