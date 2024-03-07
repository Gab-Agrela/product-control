import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const localUrl = "http://localhost:3001/product";

const baseUrl = localUrl;

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    fetchProducts: builder.query({
      query: () => ({
        url: "/read",
      }),
    }),
    fetchProductsByName: builder.query({
      query: ({ name }) => ({
        url: "/read",
        params: {
          name,
        },
      }),
    }),
  }),
});

export const { useFetchProductsQuery, useFetchProductsByNameQuery } =
  productsApi;
