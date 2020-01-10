import * as winston from "winston";
import * as Transport from "winston-transport";
import { BaseError } from "../BaseError";
import { stringfyInfo } from "../utils";

export interface LoggerOptions extends winston.LoggerOptions {
  transports?: Transport[];
}

export type notError<T> = T extends Error ? never : T;

// Override the LeveledLogMethod to remove the (infoObject: object) overload as this allows calls that don't work, like log(new Error())
interface LeveledLogMethod {
  (message: string, callback: winston.LogCallback): Logger;
  (message: string, meta: any, callback: winston.LogCallback): Logger;
  (message: string, ...meta: any[]): Logger;
  <T>(infoObject: notError<T>): Logger;
}

type logMethods = {
  // for cli and npm levels
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

  // for syslog levels only
  emerg: LeveledLogMethod;
  alert: LeveledLogMethod;
  crit: LeveledLogMethod;
  warning: LeveledLogMethod;
  notice: LeveledLogMethod;
};

// Export the winston.Logger type so we don't need to install the winston types on dependants
export type LoggerInstance = Omit<winston.Logger, keyof logMethods> & logMethods;

export class Logger {
  /**
   * The singleton logger instance, needs to be created using `Logger.initialize()`.
   *
   * @see Logger.initialize()
   */
  protected static instance: LoggerInstance;

  static DEFAULT_DEVELOPMENT_TRANSPORT = new winston.transports.Console({
    level: process.env.LOG_LEVEL || "info",
    format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.printf(stringfyInfo))
  });

  static DEFAULT_PRODUCTION_TRANSPORT = new winston.transports.Console({
    level: process.env.LOG_LEVEL || "silly",
    format: winston.format.combine(
      winston.format.errors({ stack: true }),
      winston.format.timestamp(),
      winston.format.json()
    )
  });

  static DEFAULT_TRANSPORTS = [Logger.DEFAULT_DEVELOPMENT_TRANSPORT];

  /**
   * Simple logger constructor is deprecated, use SimpleLogger.initialize() instead.
   *
   * @deprecated
   */
  private constructor() {
    throw new Error("Simple logger constructor is deprecated in Winston 3, use Logger.initialize() instead");
  }

  /**
   * Gets the singleton Logger instance, if available.
   */
  public static getInstance(): LoggerInstance {
    if (!this.instance) {
      throw new BaseError("Logger has not been initialized yet");
    }
    return this.instance;
  }

  /**
   * Initialize a new logger instance using Winston factory.
   *
   * @param options The logger initialization options
   */
  public static initialize(options: LoggerOptions = {}): LoggerInstance {
    // Prepare default console transport
    const opt = {
      transports: options.transports || Logger.DEFAULT_TRANSPORTS
    };

    // Construct new Winston logger instance
    const logger = winston.createLogger({
      ...opt
    });

    if (!this.instance) {
      this.instance = logger;
    }

    return logger;
  }
}
