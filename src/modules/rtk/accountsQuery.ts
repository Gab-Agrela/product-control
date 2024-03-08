import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  LoginUserArgs,
  LoginUserResponse,
  RegisterArgs,
  RegisterResponse,
} from "../types";

const baseUrl = `https://product-control-backend-euls.vercel.app/account`;

export const accountsApi = createApi({
  reducerPath: "accounts",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    registerAccountQuery: builder.mutation<RegisterResponse, RegisterArgs>({
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
    loginUserQuery: builder.mutation<LoginUserResponse, LoginUserArgs>({
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

export const { useRegisterAccountQueryMutation, useLoginUserQueryMutation } =
  accountsApi;
