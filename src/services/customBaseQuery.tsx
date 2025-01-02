// 5
import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { message } from "antd";

export const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "https://reqres.in/",
  });
  const result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    return {
      error: {
        code: result.error.status || 500,
        message: result.error.data?.message || "error",
        error: result.error.data?.error || "Unknow error",
      },
    };
  }

  return {
    data: {
      code: result.meta?.response?.status || 200,
      data: result.data,
      message: "Request successful",
    },
  };
};
