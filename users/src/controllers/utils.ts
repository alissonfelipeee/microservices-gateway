import { HttpResponse, HttpStatusCode } from "./protocols";

export const ok = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
});

export const created = <T>(body: any): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body: {
    message: "User created successfully",
    data: body,
  },
});

export const badRequest = (message: string): HttpResponse<object> => {
  return {
    statusCode: HttpStatusCode.BAD_REQUEST,
    body: {
      message,
      data: null,
    },
  };
};

export const notFound = (message: string): HttpResponse<object> => {
  return {
    statusCode: HttpStatusCode.NOT_FOUND,
    body: {
      message,
      data: null,
    },
  };
};

export const serverError = (): HttpResponse<object> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: {
      message: "Internal server error",
      data: null,
    },
  };
};
