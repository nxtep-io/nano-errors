import * as winston from 'winston';
import * as Transport from 'winston-transport';
export interface LoggerOptions extends winston.LoggerOptions {
    transports?: Transport[];
}
export declare type LoggerInstance = winston.Logger;
export declare class Logger {
    /**
     * The singleton logger instance, needs to be created using `Logger.initialize()`.
     *
     * @see Logger.initialize()
     */
    protected static instance: LoggerInstance;
    /**
     * The default transports thay will be enabled in the singleton.
     */
    static DEFAULT_TRANSPORTS: LoggerInstance['transports'];
    /**
     * Simple logger constructor is deprecated, use SimpleLogger.initialize() instead.
     *
     * @deprecated
     */
    private constructor();
    /**
     * Gets the singleton Logger instance, if available.
     */
    static getInstance(): LoggerInstance;
    /**
     * Initialize a new logger instance using Winston factory.
     *
     * @param options The logger initialization options
     */
    static initialize(options?: LoggerOptions): LoggerInstance;
}
