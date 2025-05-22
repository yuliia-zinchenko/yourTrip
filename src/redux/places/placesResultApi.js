import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placesApi = createApi({
  reducerPath: "placesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://192.168.0.103:7271/api/Places/",
  }),
  endpoints: (builder) => ({
    getPlaceDetails: builder.mutation({
      query: (query) => ({
        url: `search`,
        params: {
          query,
        },
      }),
    }),
    getOnePlaceDetails: builder.query({
      query: (placeId) => ({
        url: "details",
        params: { placeId },
      }),
    }),
    getPlaceSuggestions: builder.query({
      query: (input) => ({
        url: "Autocomplete",
        params: { input },
      }),
      transformResponse: (response) => {
        return {
          ...response,
          predictions: response.predictions.slice(0, 8),
        };
      },
    }),
  }),
});

export const {
  useGetPlaceDetailsMutation,
  useGetPlaceSuggestionsQuery,
  useGetOnePlaceDetailsQuery,
} = placesApi;
