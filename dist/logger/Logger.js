"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const BaseError_1 = require("../BaseError");
const utils_1 = require("../utils");
class Logger {
    /**
     * Simple logger constructor is deprecated, use SimpleLogger.initialize() instead.
     *
     * @deprecated
     */
    constructor() {
        throw new Error('Simple logger constructor is deprecated in Winston 3, use Logger.initialize() instead');
    }
    /**
     * Gets the singleton Logger instance, if available.
     */
    static getInstance() {
        if (!this.instance) {
            throw new BaseError_1.BaseError('Logger has not been initialized yet');
        }
        return this.instance;
    }
    /**
     * Initialize a new logger instance using Winston factory.
     *
     * @param options The logger initialization options
     */
    static initialize(options = {}) {
        // Prepare default console transport
        const opt = {
            transports: options.transports || Logger.DEFAULT_TRANSPORTS,
        };
        // Construct new Winston logger instance with enhanced error handling
        const logger = winston.createLogger(Object.assign({ format: winston.format.combine(utils_1.enumerateErrorFormat()) }, opt));
        ;
        if (!this.instance) {
            this.instance = logger;
        }
        return logger;
    }
}
/**
 * The default transports thay will be enabled in the singleton.
 */
Logger.DEFAULT_TRANSPORTS = [
    new winston.transports.Console({
        level: process.env.LOG_LEVEL || 'silly',
        format: winston.format.combine(utils_1.enumerateErrorFormat(), winston.format.colorize(), utils_1.lineFormat()),
    }),
];
exports.Logger = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6Ii4vbGliLyIsInNvdXJjZXMiOlsibG9nZ2VyL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUVuQyw0Q0FBeUM7QUFDekMsb0NBQTREO0FBUzVELE1BQWEsTUFBTTtJQXNCakI7Ozs7T0FJRztJQUNIO1FBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RkFBdUYsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxxQkFBUyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQXlCLEVBQUU7UUFDbEQsb0NBQW9DO1FBQ3BDLE1BQU0sR0FBRyxHQUFHO1lBQ1YsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLGtCQUFrQjtTQUM1RCxDQUFDO1FBRUYscUVBQXFFO1FBQ3JFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLGlCQUNqQyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsNEJBQW9CLEVBQUUsQ0FBQyxJQUNuRCxHQUFHLEVBQ04sQ0FBQztRQUFBLENBQUM7UUFFSixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztTQUN4QjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O0FBdkREOztHQUVHO0FBQ0kseUJBQWtCLEdBQWlDO0lBQ3hELElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUM7UUFDN0IsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLE9BQU87UUFDdkMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUM1Qiw0QkFBb0IsRUFBRSxFQUN0QixPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUN6QixrQkFBVSxFQUFFLENBQ2I7S0FDRixDQUFDO0NBQ0gsQ0FBQztBQXBCSix3QkFnRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyB3aW5zdG9uIGZyb20gJ3dpbnN0b24nO1xuaW1wb3J0ICogYXMgVHJhbnNwb3J0IGZyb20gJ3dpbnN0b24tdHJhbnNwb3J0JztcbmltcG9ydCB7IEJhc2VFcnJvciB9IGZyb20gJy4uL0Jhc2VFcnJvcic7XG5pbXBvcnQgeyBlbnVtZXJhdGVFcnJvckZvcm1hdCwgbGluZUZvcm1hdCB9IGZyb20gXCIuLi91dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dlck9wdGlvbnMgZXh0ZW5kcyB3aW5zdG9uLkxvZ2dlck9wdGlvbnMge1xuICB0cmFuc3BvcnRzPzogVHJhbnNwb3J0W107XG59XG5cbi8vIEV4cG9ydCB0aGUgd2luc3Rvbi5Mb2dnZXIgdHlwZSBzbyB3ZSBkb24ndCBuZWVkIHRvIGluc3RhbGwgdGhlIHdpbnN0b24gdHlwZXMgb24gZGVwZW5kYW50c1xuZXhwb3J0IHR5cGUgTG9nZ2VySW5zdGFuY2UgPSB3aW5zdG9uLkxvZ2dlcjtcblxuZXhwb3J0IGNsYXNzIExvZ2dlciB7XG4gIC8qKlxuICAgKiBUaGUgc2luZ2xldG9uIGxvZ2dlciBpbnN0YW5jZSwgbmVlZHMgdG8gYmUgY3JlYXRlZCB1c2luZyBgTG9nZ2VyLmluaXRpYWxpemUoKWAuXG4gICAqIFxuICAgKiBAc2VlIExvZ2dlci5pbml0aWFsaXplKClcbiAgICovXG4gIHByb3RlY3RlZCBzdGF0aWMgaW5zdGFuY2U6IExvZ2dlckluc3RhbmNlO1xuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCB0cmFuc3BvcnRzIHRoYXkgd2lsbCBiZSBlbmFibGVkIGluIHRoZSBzaW5nbGV0b24uXG4gICAqL1xuICBzdGF0aWMgREVGQVVMVF9UUkFOU1BPUlRTOiBMb2dnZXJJbnN0YW5jZVsndHJhbnNwb3J0cyddID0gW1xuICAgIG5ldyB3aW5zdG9uLnRyYW5zcG9ydHMuQ29uc29sZSh7XG4gICAgICBsZXZlbDogcHJvY2Vzcy5lbnYuTE9HX0xFVkVMIHx8ICdzaWxseScsXG4gICAgICBmb3JtYXQ6IHdpbnN0b24uZm9ybWF0LmNvbWJpbmUoXG4gICAgICAgIGVudW1lcmF0ZUVycm9yRm9ybWF0KCksXG4gICAgICAgIHdpbnN0b24uZm9ybWF0LmNvbG9yaXplKCksXG4gICAgICAgIGxpbmVGb3JtYXQoKSxcbiAgICAgICksXG4gICAgfSksXG4gIF07XG5cbiAgLyoqXG4gICAqIFNpbXBsZSBsb2dnZXIgY29uc3RydWN0b3IgaXMgZGVwcmVjYXRlZCwgdXNlIFNpbXBsZUxvZ2dlci5pbml0aWFsaXplKCkgaW5zdGVhZC5cbiAgICpcbiAgICogQGRlcHJlY2F0ZWRcbiAgICovXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdTaW1wbGUgbG9nZ2VyIGNvbnN0cnVjdG9yIGlzIGRlcHJlY2F0ZWQgaW4gV2luc3RvbiAzLCB1c2UgTG9nZ2VyLmluaXRpYWxpemUoKSBpbnN0ZWFkJyk7XG4gIH1cblxuICAvKipcbiAgICogR2V0cyB0aGUgc2luZ2xldG9uIExvZ2dlciBpbnN0YW5jZSwgaWYgYXZhaWxhYmxlLlxuICAgKi9cbiAgcHVibGljIHN0YXRpYyBnZXRJbnN0YW5jZSgpOiBMb2dnZXJJbnN0YW5jZSB7XG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICB0aHJvdyBuZXcgQmFzZUVycm9yKCdMb2dnZXIgaGFzIG5vdCBiZWVuIGluaXRpYWxpemVkIHlldCcpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplIGEgbmV3IGxvZ2dlciBpbnN0YW5jZSB1c2luZyBXaW5zdG9uIGZhY3RvcnkuXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIFRoZSBsb2dnZXIgaW5pdGlhbGl6YXRpb24gb3B0aW9uc1xuICAgKi9cbiAgcHVibGljIHN0YXRpYyBpbml0aWFsaXplKG9wdGlvbnM6IExvZ2dlck9wdGlvbnMgPSB7fSk6IExvZ2dlckluc3RhbmNlIHtcbiAgICAvLyBQcmVwYXJlIGRlZmF1bHQgY29uc29sZSB0cmFuc3BvcnRcbiAgICBjb25zdCBvcHQgPSB7XG4gICAgICB0cmFuc3BvcnRzOiBvcHRpb25zLnRyYW5zcG9ydHMgfHwgTG9nZ2VyLkRFRkFVTFRfVFJBTlNQT1JUUyxcbiAgICB9O1xuXG4gICAgLy8gQ29uc3RydWN0IG5ldyBXaW5zdG9uIGxvZ2dlciBpbnN0YW5jZSB3aXRoIGVuaGFuY2VkIGVycm9yIGhhbmRsaW5nXG4gICAgY29uc3QgbG9nZ2VyID0gd2luc3Rvbi5jcmVhdGVMb2dnZXIoe1xuICAgICAgZm9ybWF0OiB3aW5zdG9uLmZvcm1hdC5jb21iaW5lKGVudW1lcmF0ZUVycm9yRm9ybWF0KCkpLFxuICAgICAgLi4ub3B0XG4gICAgfSk7O1xuXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB7XG4gICAgICB0aGlzLmluc3RhbmNlID0gbG9nZ2VyO1xuICAgIH1cblxuICAgIHJldHVybiBsb2dnZXI7XG4gIH1cbn0iXX0=