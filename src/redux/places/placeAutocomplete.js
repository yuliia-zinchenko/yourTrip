import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placesApi = createApi({
  reducerPath: "placesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://maps.googleapis.com/maps/api/place/",
  }),
  endpoints: (builder) => ({
    getPlaceSuggestions: builder.query({
      query: (input) => ({
        url: "autocomplete/json",
        params: {
          input,
          key: process.env.REACT_APP_GOOGLE_KEY,
          language: "en",
          types: "",
        },
        transformResponse: (response) => {
          return {
            ...response,
            predictions: response.predictions.slice(0, 8),
          };
        },
      }),
    }),
  }),
});

export const { useGetPlaceSuggestionsQuery } = placesApi;
