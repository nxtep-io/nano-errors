import { BaseError, Logger, SentryTransport } from '../../../lib';

const logger = Logger
  .initialize({})
  .add(new SentryTransport({ dsn: process.env.SENTRY_DSN || '' }))

export class DatabaseError extends BaseError {
  details = { driver: 'jdbc:postgresql' }
}

export class ValidationError extends BaseError {
  details = { status: 400 }
}

export class HttpError extends BaseError {
  details = { status: 500 }
}

const databaseError = new ValidationError('Database is not connected');
const validationError = new ValidationError('E-mail is invalid');

logger.error(new HttpError(validationError));
logger.error(new HttpError(databaseError));