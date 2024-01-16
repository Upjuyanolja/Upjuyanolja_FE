export type Response<T> = {
  message: string;
  data: T;
};
export type ErrorResponse = {
  code: number;
  message: string;
  data: null;
};
