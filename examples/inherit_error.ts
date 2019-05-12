import { BaseError } from "../lib";

export class UnauthorizedError extends BaseError {

}

export class SomeWrapperError extends BaseError {

}

const originalError = () => {
  throw new UnauthorizedError('user it forbidden');
};

try {
  originalError();
} catch (exception) {
  throw new SomeWrapperError(exception, {
    someAdditionalData: {
      test: true
    }
  });
}

const a = new UnauthorizedError('user it forbidden').toJSON(true);
const b = new UnauthorizedError('user it forbidden').toJSON(false);