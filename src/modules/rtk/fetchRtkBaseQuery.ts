import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const fetchRtkBaseQuery = (baseUrl: string) => {
  return fetchBaseQuery({
    baseUrl,
    prepareHeaders(headers, { getState }) {
      headers.set("authorization", `Bearer ${(getState() as any).token}`);
    },
  });
};

export default fetchRtkBaseQuery;
