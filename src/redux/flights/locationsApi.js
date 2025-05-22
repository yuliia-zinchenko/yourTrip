import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://192.168.0.103:7271/api/",
  }),
  endpoints: (builder) => ({
    getSuggestions: builder.query({
      query: (query) => ({
        url: `/Flights/SuggestList`,
        params: { text: query },
      }),
    }),
  }),
});

export const { useGetSuggestionsQuery } = locationsApi;
