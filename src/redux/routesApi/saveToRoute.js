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
      query: ({ name }) => ({
        url: "/route",
        method: "POST",
        body: { name },
      }),
      invalidatesTags: ["Routes"],
    }),
    addPlaceToRoute: builder.mutation({
      query: ({ routeId, json }) => ({
        url: `Saved/places`,
        method: "POST",
        body: { routeId, json: JSON.stringify(json) },
      }),
      invalidatesTags: ["Routes"],
    }),
    addHotelToRoute: builder.mutation({
      query: ({ routeId, json }) => ({
        url: `Saved/hotel`,
        method: "POST",
        body: { routeId, json: JSON.stringify(json) },
      }),
      invalidatesTags: ["Routes"],
    }),
    addTicketToRoute: builder.mutation({
      query: ({ routeId, json }) => ({
        url: `Saved/flights`,
        method: "POST",
        body: { routeId, json: JSON.stringify(json) },
      }),
      invalidatesTags: ["Routes"],
    }),
    deleteRoute: builder.mutation({
      query: (id) => ({
        url: `/route/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Routes"],
  }),
    getSavedItemsByRoute: builder.query({
      query: (routeId) => `/route/showRoute?routeId=${routeId}`,
      providesTags: (result, error, routeId) => [
        { type: "SavedItems", id: routeId },
      ],
    }),
  }),
});

export const {
  useGetRoutesQuery,
  useCreateRouteMutation,
  useAddPlaceToRouteMutation,
  useAddHotelToRouteMutation,
  useAddTicketToRouteMutation,
  useDeleteRouteMutation,
  useGetSavedItemsByRouteQuery, // <-- новий хук
} = routesApi;
