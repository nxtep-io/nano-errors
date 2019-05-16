import { BaseError } from "../../lib";

export class UnauthorizedError extends BaseError {

}

throw new UnauthorizedError('user is forbidden', {
  someAdditionalData: {
    test: true
  }
});