import * as winston from "winston";
import * as Transport from "winston-transport";
export interface LoggerOptions extends winston.LoggerOptions {
    transports?: Transport[];
}
export declare type notError<T> = T extends Error ? never : T;
interface LeveledLogMethod {
    (message: string, callback: winston.LogCallback): Logger;
    (message: string, meta: any, callback: winston.LogCallback): Logger;
    (message: string, ...meta: any[]): Logger;
    <T>(infoObject: notError<T>): Logger;
}
declare type logMethods = {
    error: LeveledLogMethod;
    warn: LeveledLogMethod;
    help: LeveledLogMethod;
    data: LeveledLogMethod;
    info: LeveledLogMethod;
    debug: LeveledLogMethod;
    prompt: LeveledLogMethod;
    http: LeveledLogMethod;
    verbose: LeveledLogMethod;
    input: LeveledLogMethod;
    silly: LeveledLogMethod;
    emerg: LeveledLogMethod;
    alert: LeveledLogMethod;
    crit: LeveledLogMethod;
    warning: LeveledLogMethod;
    notice: LeveledLogMethod;
};
export declare type LoggerInstance = Omit<winston.Logger, keyof logMethods> & logMethods;
export declare class Logger {
    /**
     * The singleton logger instance, needs to be created using `Logger.initialize()`.
     *
     * @see Logger.initialize()
     */
    protected static instance: LoggerInstance;
    static DEFAULT_DEVELOPMENT_TRANSPORT: winston.transports.ConsoleTransportInstance;
    static DEFAULT_PRODUCTION_TRANSPORT: winston.transports.ConsoleTransportInstance;
    static DEFAULT_TRANSPORTS: winston.transports.ConsoleTransportInstance[];
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
export {};
