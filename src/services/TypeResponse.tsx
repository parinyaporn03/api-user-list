export type TypeResponse<T> = {
  code: number;
  data?: T;
  message?: string;
  error?: string;
};
