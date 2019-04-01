import * as uuid from 'uuid';

export class BaseErrorDetails {
  [key: string]: any;

  constructor(data = {}) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        this[key] = data[key];
      }
    }
  }
}

/**
 * An enhanced error instance for the TS Framework.
 * <br />
 * Basic features:
 * - Unique stack id using UUID v4
 * - Serializers: toObject and toJSON
 * - Better stack trace mapping
 */
export class BaseError extends Error {
  public stackId: string;
  public details: BaseErrorDetails;
  public originalMessage: string;
  protected _cleanStack;

  constructor(message, details: any = new BaseErrorDetails()) {
    const stackId = uuid.v4();
    super(`${message} (stackId: ${stackId})`);
    this.stackId = stackId;
    this.originalMessage = message;
    this.name = this.constructor.name;
    this.details = details instanceof BaseErrorDetails ? details : new BaseErrorDetails(details);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }

    if (require.resolve('clean-stack')) {
      try {
        // Try to get clean stack gracefully
        this._cleanStack = require('clean-stack');
      } catch (exception) {
        console.warn('Dependency "clean-stack" is not supported in this platform, errors will be ignored', exception);
      }
    }
  }

  /**
   * Generates POJO for this error instance.
   */
  public toObject() {
    let stack = this.stack;

    if (this._cleanStack) {
      try {
        stack = this._cleanStack(this.stack);
      } catch (exception) {
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
  public toJSON(stringify = false): any {
    const obj = this.toObject();
    if (stringify) {
      return JSON.stringify(obj);
    }
    return obj;
  }
}
