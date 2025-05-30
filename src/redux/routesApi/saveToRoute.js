import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const routesApi = createApi({
  reducerPath: "routesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://192.168.0.103:7271/api",
    withCredentials: true,
    prepareHeaders: (headers, { getState }) => {
      const rawToken = getState().auth.token;
      const token = rawToken?.replace(/^"(.*)"$/, "$1");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Routes"],
  endpoints: (builder) => ({
    getRoutes: builder.query({
      query: () => "/route",
      providesTags: ["Routes"],
    }),
    createRoute: builder.mutation({
      query: (body) => ({
        url: "/route",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Routes"],
    }),
    addPlaceToRoute: builder.mutation({
      query: ({ routeId, placeId }) => ({
        url: `/route/${routeId}/places`,
        method: "POST",
        body: { placeId },
      }),
      invalidatesTags: ["Routes"],
    }),
  }),
});

export const {
  useGetRoutesQuery,
  useCreateRouteMutation,
  useAddPlaceToRouteMutation,
} = routesApi;
