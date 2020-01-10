import * as Sentry from "@sentry/node";
import * as os from "os";
import { LEVEL, SPLAT, MESSAGE } from "triple-beam";
import { inspect } from "util";

export const winstonLevelToSentryLevel = {
  silly: "debug",
  verbose: "debug",
  debug: "debug",
  info: "info",
  warn: "warning",
  error: "error",
  default: "info"
};

export const stringfyInfo = (info: any) => {
  const depth = process.env.LOG_LEVEL_DEPTH ? Number(process.env.LOG_LEVEL_DEPTH) : 5;

  const extra = getExtraInfo(info, depth);
  let message =
    typeof info.message === "string"
      ? info.message || info.originalMessage
      : "\n" + inspect(info.message || info.originalMessage, { depth, colors: true });
  if (extra) {
    return `${info.level}: ${message} \n${extra}`;
  }
  return `${info.level}: ${message}`;
};

export const getExtraInfo = (info: any, depth: number) => {
  const blacklist = [LEVEL, SPLAT, MESSAGE, "message", "level"];
  const extra = {};
  Object.getOwnPropertyNames(info).forEach(function(key) {
    if (!blacklist.includes(key)) extra[key] = info[key];
  });

  if (Object.keys(extra).length === 0) return undefined;
  return inspect(extra, { depth, colors: true });
};

export const prepareSentryMeta = (info: { level: string; tags: any; message: any }): [Sentry.Event | Error, object] => {
  const { level, tags, modules, platform = os.platform(), server_name = os.hostname(), ...extra }: any = { ...info };

  let stack: string | undefined;

  // Generate mocked stack for o`bjects
  if (info.level !== "error") {
    const event = new Error(info.message);
    event.name = info.level;
    stack = event.stack;
  }

  const meta = {
    modules,
    server_name,
    platform,
    tags: {
      platform,
      stackId: extra.stackId,
      ...tags
    },
    message: info.message.message || info.message,
    level: winstonLevelToSentryLevel[info.level]
  };

  const extraObject = {
    stack,
    ...extra
  };

  return [meta, extraObject];
};
