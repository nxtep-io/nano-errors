import { Logger, SentryTransport } from '../../../lib';

const logger = Logger
  .initialize({})
  .add(new SentryTransport({ dsn: process.env.SENTRY_DSN || '' }))

logger.info('Simple test message', {
  tags: {
    some: 'tags'
  },
  extra: {
    '1 + 1': 2,
  },
});