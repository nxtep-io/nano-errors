import * as uuid from 'uuid';

/**
 * The base error details enables the developer to add
 * specific metadata to their errors.
 */
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
 * - Better stack trace mapping using "clean-stack"
 */
export class BaseError extends Error {
  /**
   * The unique exception id.
   */
  public stackId: string;

  /**
   * The error details for easier tracking of exceptions
   */
  public details: BaseErrorDetails;

  /**
   * The error original message without the generated metadata.
   */
  public originalMessage: string;

  /**
   * The `clean-stack` wrapper when available.
   */
  protected _cleanStack;

  constructor(input: any, details: any = new BaseErrorDetails()) {
    const stackId = uuid.v4();
    const message = input.message || input;

    super(`${message} (stackId: ${stackId})`);
    this.stackId = stackId;
    this.originalMessage = message;
    this.name = this.constructor.name;
    this.details = details instanceof BaseErrorDetails ? details : new BaseErrorDetails(details);

    if (input.stack || details.stack) {
      const stack: string[] = (input.stack || details.stack).split('\n');
      const header = stack.shift();
      stack.unshift(`    inherits ${header}`);
      stack.unshift(`${this.name}: ${this.message}`);
      this.stack = stack.join('\n');
    } else if (typeof Error.captureStackTrace === 'function') {
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
   * Generates plain object for this error instance.
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
      // tslint:disable-next-line:object-shorthand-properties-first
      stack,
    };
  }

  /**
   * Generates clean object for this error instance ready for JSON stringification (optional).
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
