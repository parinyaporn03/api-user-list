// 1

import { createApi } from "@reduxjs/toolkit/query/react";
import { DataUserResponse } from "./response/DataUserResponse";
import { DataUserRequest } from "./request/DataUserRequest";
import { customBaseQuery } from "../customBaseQuery";
import { SingleUserResponse } from "./response/SingleUserResponse";
import { CreateUserRequest } from "./request/CreateUserRequest";
import { CreateUserResponse } from "./response/CreateUserResponse";
import { TypeResponse } from "../TypeResponse";

const exampleApi = createApi({
  reducerPath: "example_api",
  // baseQuery: fetchBaseQuery({ baseUrl: "https://reqres.in/" }),
  baseQuery: customBaseQuery,
  endpoints: (builder) => ({
    // List user
    getDataUser: builder.query<DataUserResponse, DataUserRequest>({
      query: (data) => {
        // data มาจาก DataUserRequest
        // ใช้ searchparam เพื่อเอาค่ามาต่อกับurl
        const param = new URLSearchParams({
          page: data.page.toString(),
          per_page: data.per_page.toString(),
        });
        return {
          headers: { "x-api-key": "reqres-free-v1" },
          url: `api/users?${param}`,
          method: "GET",
        };
      },
    }),
    // single user
    getSingleUser: builder.query<SingleUserResponse, { id: number }>({
      query: (data) => {
        return {
          headers: { "x-api-key": "reqres-free-v1" },
          url: `api/users/${data.id}`,
          method: "GET",
        };
      },
    }),

    postCreateUser: builder.mutation<CreateUserResponse, CreateUserRequest>({
      query: (data) => {
        return {
          headers: { "x-api-key": "reqres-free-v1" },
          url: `api/users/`,
          method: "POSt",
          body: data,
        };
      },
    }),

    deleteUser: builder.mutation<TypeResponse<void>, { id: number }>({
      query: (data) => {
        return {
          headers: { "x-api-key": "reqres-free-v1" },
          url: `api/users/${data.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useGetDataUserQuery,
  useGetSingleUserQuery,
  usePostCreateUserMutation,
  useDeleteUserMutation,
} = exampleApi;
export default exampleApi;
