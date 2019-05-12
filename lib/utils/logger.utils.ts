import jsonStringify from 'fast-safe-stringify';
import { MESSAGE } from 'triple-beam';
import { format } from 'winston';
import { BaseError } from '../BaseError';

export const lineFormat = format((info: any) => {
  const stringifiedRest = jsonStringify({
    ...info,
    level: undefined,
    message: undefined,
    splat: undefined
  }, null, 2);

  const padding = info.padding && info.padding[info.level] || '';
  if (stringifiedRest !== '{}') {
    info[MESSAGE] = `${info.level}:${padding} ${info.message} ${stringifiedRest}`;
  } else {
    info[MESSAGE] = `${info.level}:${padding} ${info.message}`;
  }

  return info;
});

// Quick and dirty fix for Winston@3.0.0 issue with errors
// @see {https://github.com/winstonjs/winston/issues/1338}
export const enumerateErrorFormat = format((info: any) => {
  if (info.message instanceof BaseError) {
    return {
      message: info.message.message,
      stack: info.message.stack,
      ...info.message
    }; 
  }

  if (info.message instanceof Error) {
    return {
      message: info.message.message,
      stack: info.message.stack,
      ...info.message
    };
  }

  if (info instanceof BaseError) {
    return {
      message: info.message,
      stack: info.stack,
      ...info,
    };
  }

  if (info instanceof Error) {
    return {
      message: info.message,
      stack: info.stack,
      ...info,
    };
  }

  return info;
});
