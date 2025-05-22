import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ticketsApi = createApi({
  reducerPath: "ticketsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://192.168.0.103:7271/api/",
  }),
  endpoints: (builder) => ({
    searchTickets: builder.mutation({
      query: (formData) => ({
        url: "Flights/search",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useSearchTicketsMutation } = ticketsApi;
