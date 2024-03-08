import { createApi } from "@reduxjs/toolkit/query/react";
import fetchRtkBaseQuery from "./fetchRtkBaseQuery";

const baseUrl = `https://product-control-backend-euls.vercel.app/product`;

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
interface CreateProductArgs {
  name: string;
  brand: string;
  model: string;
  price: number;
  color: string;
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
    createProductQuery: builder.mutation<any, CreateProductArgs>({
      query: ({ name, brand, model, price, color }: CreateProductArgs) => ({
        url: "/create",
        method: "POST",
        body: {
          name,
          brand,
          model,
          price,
          color,
        },
      }),
    }),
    deleteProductQuery: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchProductsQuery,
  useFetchProductsByNameQuery,
  useCreateProductQueryMutation,
  useDeleteProductQueryMutation,
} = productsApi;
