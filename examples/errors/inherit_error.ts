import { BaseError } from "../../lib";

export class UnauthorizedError extends BaseError {

}

export class HttpError extends BaseError {

}

const deeperError = () => {
  return new BaseError('Some deep permission validation error');
};

const originalError = () => {
  throw new UnauthorizedError('user it forbidden', deeperError());
};

try {
  originalError();
} catch (exception) {
  throw new HttpError(exception, {
    someAdditionalData: {
      test: true
    }
  });
}