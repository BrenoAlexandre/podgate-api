const httpCodes = {
  badRequest: 400,
  authorization: 401,
  notFound: 404,
  unprocess: 422,
};

export class CustomError extends Error {
  customObject?: any;

  code: number;

  constructor(message: string | undefined, customObject?: any) {
    super(message);
    this.customObject = customObject;
    this.code = httpCodes.badRequest;
  }

  static badRequest(message: string | undefined, customObject?: any) {
    const newError = new CustomError(message, customObject);
    newError.code = httpCodes.badRequest;
    return newError;
  }

  static authorization(message: string | undefined, customObject?: any) {
    const newError = new CustomError(message, customObject);
    newError.code = httpCodes.authorization;
    return newError;
  }

  static notFound(message: string | undefined, customObject?: any) {
    const newError = new CustomError(message, customObject);
    newError.code = httpCodes.notFound;
    return newError;
  }

  static unprocess(message: string | undefined, customObject?: any) {
    const newError = new CustomError(message, customObject);
    newError.code = httpCodes.unprocess;
    return newError;
  }
}
