import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  LoginUserArgs,
  LoginUserResponse,
  RegisterArgs,
  RegisterResponse,
} from "../types";

const localUrl = "http://localhost:3001/account";

const baseUrl = localUrl;

export const accountsApi = createApi({
  reducerPath: "accounts",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    registerAccountQuery: builder.query<RegisterResponse, RegisterArgs>({
      query: ({ username, password, email }: RegisterArgs) => ({
        url: "/register",
        method: "POST",
        body: {
          username,
          password,
          email,
        },
      }),
    }),
    loginUserQuery: builder.query<LoginUserResponse, LoginUserArgs>({
      query: ({ username, password }: LoginUserArgs) => ({
        url: "/login",
        method: "POST",
        body: {
          username,
          password,
        },
      }),
    }),
  }),
});

export const { useRegisterAccountQueryQuery, useLoginUserQueryQuery } =
  accountsApi;
