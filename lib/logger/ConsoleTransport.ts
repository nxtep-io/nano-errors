/* eslint-disable no-console */
/*
 * console.js: Transport for outputting to the console.
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 */

'use strict';

import * as os from 'os';
import { LEVEL, MESSAGE } from 'triple-beam';
import * as TransportStream from 'winston-transport';

const DEFAULT_ARR_ERR = 'Cannot make set from type other than Array of string elements';

/**
 * Transport for outputting to the console.
 * @type {Console}
 * @extends {TransportStream}
 */
export class ConsoleTransport extends TransportStream {
  name: string;
  eol: any;
  stderrLevels: any;
  consoleWarnLevels: any;

  /**
   * Constructor function for the Console transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */
  constructor(options: any = {}) {
    super(options);

    // Expose the name of this Transport on the prototype
    this.name = options.name || 'console';
    this.stderrLevels = this.stringArrayToSet(options.stderrLevels);
    this.consoleWarnLevels = this.stringArrayToSet(options.consoleWarnLevels);
    this.eol = options.eol || os.EOL;

    this.setMaxListeners(30);
  }

  /**
   * Core logging method exposed to Winston.
   * @param {Object} info - TODO: add param description.
   * @param {Function} callback - TODO: add param description.
   * @returns {undefined}
   */
  async log(info, callback) {
    setImmediate(() => this.emit('logged', info));

    // Remark: what if there is no raw...?
    if (this.stderrLevels[info[LEVEL]]) {
      if (console['_stderr']) {
        // Node.js maps `process.stderr` to `console._stderr`.
        console['_stderr'].write(`${info[MESSAGE]}${this.eol}`);
      } else {
        // console.error adds a newline
        console.error(info[MESSAGE]);
      }

      if (callback) {
        callback(); // eslint-disable-line callback-return
      }
      return;
    } else if (this.consoleWarnLevels[info[LEVEL]]) {
      if (console['_stderr']) {
        // Node.js maps `process.stderr` to `console._stderr`.
        // in Node.js console.warn is an alias for console.error
        console['_stderr'].write(`${info[MESSAGE]}${this.eol}`);
      } else {
        // console.warn adds a newline
        console.warn(info[MESSAGE]);
      }

      if (callback) {
        callback(); // eslint-disable-line callback-return
      }
      return;
    }

    if (console['_stdout']) {
      // Node.js maps `process.stdout` to `console._stdout`.
      console['_stdout'].write(`${info[MESSAGE]}${this.eol}`);
    }

    if(info.table) {
      // console.log adds a newline.
      console.table(info.table);
    }

    if (callback) {
      callback(); // eslint-disable-line callback-return
    }
  }

  /**
   * Returns a Set-like object with strArray's elements as keys (each with the
   * value true).
   * @param {Array} strArray - Array of Set-elements as strings.
   * @param {?string} [errMsg] - Custom error message thrown on invalid input.
   * @returns {Object} - TODO: add return description.
   * @private
   */
  protected stringArrayToSet(strArray: string[], errMsg: string = DEFAULT_ARR_ERR): any {
    if (!strArray) {
      return {};
    }

    if (!Array.isArray(strArray)) {
      throw new Error(errMsg);
    }

    return strArray.reduce((set, el) =>  {
      if (typeof el !== 'string') {
        throw new Error(errMsg);
      }
      set[el] = true;

      return set;
    }, {});
  }
};
