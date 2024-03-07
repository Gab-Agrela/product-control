import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fetchRtkBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, { getState }) {
      const storage = localStorage.getItem("productControl");
      const { token } = JSON.parse(storage as string);
      headers.set(
        "authorization",
        `Bearer ${(getState() as any).user.token || token}`
      );
    },
  });
};

export default fetchRtkBaseQuery;
