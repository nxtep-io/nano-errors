"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const BaseError_1 = require("./BaseError");
const utils_1 = require("./utils");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vbGliL0xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFtQztBQUVuQywyQ0FBd0M7QUFDeEMsbUNBQTJEO0FBUzNELE1BQWEsTUFBTTtJQWlCakI7Ozs7T0FJRztJQUNIO1FBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyx1RkFBdUYsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxXQUFXO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLE1BQU0sSUFBSSxxQkFBUyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSSxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQXlCLEVBQUU7UUFDbEQsb0NBQW9DO1FBQ3BDLE1BQU0sR0FBRyxHQUFHO1lBQ1YsVUFBVSxFQUFFLE9BQU8sQ0FBQyxVQUFVLElBQUksTUFBTSxDQUFDLGtCQUFrQjtTQUM1RCxDQUFDO1FBRUYscUVBQXFFO1FBQ3JFLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxZQUFZLGlCQUFHLE1BQU0sRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyw0QkFBb0IsRUFBRSxDQUFDLElBQUssR0FBRyxFQUFHLENBQUM7UUFBQSxDQUFDO1FBRXpHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1NBQ3hCO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7QUFwREQ7O0dBRUc7QUFDSSx5QkFBa0IsR0FBaUM7SUFDeEQsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztRQUM3QixLQUFLLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLElBQUksT0FBTztRQUN2QyxNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQzVCLDRCQUFvQixFQUFFLEVBQ3RCLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQ3pCLGtCQUFVLEVBQUUsQ0FDYjtLQUNGLENBQUM7Q0FDSCxDQUFDO0FBZkosd0JBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgd2luc3RvbiBmcm9tICd3aW5zdG9uJztcbmltcG9ydCAqIGFzIFRyYW5zcG9ydCBmcm9tICd3aW5zdG9uLXRyYW5zcG9ydCc7XG5pbXBvcnQgeyBCYXNlRXJyb3IgfSBmcm9tICcuL0Jhc2VFcnJvcic7XG5pbXBvcnQgeyBlbnVtZXJhdGVFcnJvckZvcm1hdCwgbGluZUZvcm1hdCB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9nZ2VyT3B0aW9ucyBleHRlbmRzIHdpbnN0b24uTG9nZ2VyT3B0aW9ucyB7XG4gIHRyYW5zcG9ydHM/OiBUcmFuc3BvcnRbXTtcbn1cblxuLy8gRXhwb3J0IHRoZSB3aW5zdG9uLkxvZ2dlciB0eXBlIHNvIHdlIGRvbid0IG5lZWQgdG8gaW5zdGFsbCB0aGUgd2luc3RvbiB0eXBlcyBvbiBkZXBlbmRhbnRzXG5leHBvcnQgdHlwZSBMb2dnZXJJbnN0YW5jZSA9IHdpbnN0b24uTG9nZ2VyO1xuXG5leHBvcnQgY2xhc3MgTG9nZ2VyIHtcbiAgcHJvdGVjdGVkIHN0YXRpYyBpbnN0YW5jZTogTG9nZ2VySW5zdGFuY2U7XG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IHRyYW5zcG9ydHMgdGhheSB3aWxsIGJlIGVuYWJsZWQgaW4gdGhlIHNpbmdsZXRvbi5cbiAgICovXG4gIHN0YXRpYyBERUZBVUxUX1RSQU5TUE9SVFM6IExvZ2dlckluc3RhbmNlWyd0cmFuc3BvcnRzJ10gPSBbXG4gICAgbmV3IHdpbnN0b24udHJhbnNwb3J0cy5Db25zb2xlKHtcbiAgICAgIGxldmVsOiBwcm9jZXNzLmVudi5MT0dfTEVWRUwgfHwgJ3NpbGx5JyxcbiAgICAgIGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShcbiAgICAgICAgZW51bWVyYXRlRXJyb3JGb3JtYXQoKSxcbiAgICAgICAgd2luc3Rvbi5mb3JtYXQuY29sb3JpemUoKSxcbiAgICAgICAgbGluZUZvcm1hdCgpLFxuICAgICAgKSxcbiAgICB9KSxcbiAgXTtcblxuICAvKipcbiAgICogU2ltcGxlIGxvZ2dlciBjb25zdHJ1Y3RvciBpcyBkZXByZWNhdGVkLCB1c2UgU2ltcGxlTG9nZ2VyLmluaXRpYWxpemUoKSBpbnN0ZWFkLlxuICAgKlxuICAgKiBAZGVwcmVjYXRlZFxuICAgKi9cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpbXBsZSBsb2dnZXIgY29uc3RydWN0b3IgaXMgZGVwcmVjYXRlZCBpbiBXaW5zdG9uIDMsIHVzZSBMb2dnZXIuaW5pdGlhbGl6ZSgpIGluc3RlYWQnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBzaW5nbGV0b24gTG9nZ2VyIGluc3RhbmNlLCBpZiBhdmFpbGFibGUuXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCk6IExvZ2dlckluc3RhbmNlIHtcbiAgICBpZiAoIXRoaXMuaW5zdGFuY2UpIHtcbiAgICAgIHRocm93IG5ldyBCYXNlRXJyb3IoJ0xvZ2dlciBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQgeWV0Jyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmluc3RhbmNlO1xuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgYSBuZXcgbG9nZ2VyIGluc3RhbmNlIHVzaW5nIFdpbnN0b24gZmFjdG9yeS5cbiAgICpcbiAgICogQHBhcmFtIG9wdGlvbnMgVGhlIGxvZ2dlciBpbml0aWFsaXphdGlvbiBvcHRpb25zXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGluaXRpYWxpemUob3B0aW9uczogTG9nZ2VyT3B0aW9ucyA9IHt9KTogTG9nZ2VySW5zdGFuY2Uge1xuICAgIC8vIFByZXBhcmUgZGVmYXVsdCBjb25zb2xlIHRyYW5zcG9ydFxuICAgIGNvbnN0IG9wdCA9IHtcbiAgICAgIHRyYW5zcG9ydHM6IG9wdGlvbnMudHJhbnNwb3J0cyB8fCBMb2dnZXIuREVGQVVMVF9UUkFOU1BPUlRTLFxuICAgIH07XG5cbiAgICAvLyBDb25zdHJ1Y3QgbmV3IFdpbnN0b24gbG9nZ2VyIGluc3RhbmNlIHdpdGggZW5oYW5jZWQgZXJyb3IgaGFuZGxpbmdcbiAgICBjb25zdCBsb2dnZXIgPSB3aW5zdG9uLmNyZWF0ZUxvZ2dlcih7IGZvcm1hdDogd2luc3Rvbi5mb3JtYXQuY29tYmluZShlbnVtZXJhdGVFcnJvckZvcm1hdCgpKSwgLi4ub3B0IH0pOztcblxuICAgIGlmICghdGhpcy5pbnN0YW5jZSkge1xuICAgICAgdGhpcy5pbnN0YW5jZSA9IGxvZ2dlcjtcbiAgICB9XG5cbiAgICByZXR1cm4gbG9nZ2VyO1xuICB9XG59Il19