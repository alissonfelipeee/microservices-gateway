export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: {
    message: string;
    data: T | null;
  };
}

export interface HttpRequest<B> {
  body?: B;
  params?: any;
  headers?: any;
}

export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
