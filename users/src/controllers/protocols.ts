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
  CREATED = 201,
  BAD_REQUEST = 400,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
