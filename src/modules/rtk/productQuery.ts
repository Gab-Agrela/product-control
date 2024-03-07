import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import fetchRtkBaseQuery from "./fetchRtkBaseQuery";

const localUrl = "http://localhost:3001/product";

const baseUrl = localUrl;

type TOptions = {
  price: number;
  color: string;
};
interface Product {
  id: number;
  userId: number;
  name: string;
  brand: string;
  model: string;
  options: Array<TOptions>;
  createdAt: Date;
  updatedAt: Date;
}
interface ProductsResp {
  message: string;
  data: Array<Product>;
}

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchRtkBaseQuery(baseUrl),
  endpoints: (builder) => ({
    fetchProducts: builder.query<ProductsResp, any>({
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
