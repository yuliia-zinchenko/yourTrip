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
      invalidatesTags: (result, error, { routeId }) => [
        { type: "Routes" },
        { type: "SavedItems", id: routeId },
      ],
    }),
    addHotelToRoute: builder.mutation({
      query: ({ routeId, json }) => ({
        url: `Saved/hotel`,
        method: "POST",
        body: { routeId, json: JSON.stringify(json) },
      }),
      invalidatesTags: (result, error, { routeId }) => [
        { type: "Routes" },
        { type: "SavedItems", id: routeId },
      ],
    }),
    addTicketToRoute: builder.mutation({
      query: ({ routeId, json }) => ({
        url: `Saved/flights`,
        method: "POST",
        body: { routeId, json: JSON.stringify(json) },
      }),
      invalidatesTags: (result, error, { routeId }) => [
        { type: "Routes" },
        { type: "SavedItems", id: routeId },
      ],
    }),
    deleteRoute: builder.mutation({
      query: (id) => ({
        url: `/route/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Routes", "Achievements"],
    }),
    getSavedItemsByRoute: builder.query({
      query: (routeId) => `/route/showRoute?routeId=${routeId}`,
      providesTags: (routeId) => [{ type: "SavedItems", id: routeId }],
      invalidatesTags: ["Routes"],
    }),
    submitReview: builder.mutation({
      query: ({ id: routeId, comment: review, rating }) => ({
        url: `/Review/create`,
        method: "POST",
        body: { routeId, review, rating },
      }),
      invalidatesTags: ["Routes", "Achievements"],
    }),
    deleteSavedFlights: builder.mutation({
      query: ({ id, routeId, type }) => ({
        url: `/Saved/deleteFlighrs`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: { id, routeId, type },
      }),
      invalidatesTags: (result, error, { routeId }) => [
        { type: "SavedItems", id: routeId },
      ],
    }),

    deleteSavedHotel: builder.mutation({
      query: ({ id, routeId, type }) => ({
        url: `/Saved/deleteHotels`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: { id, routeId, type },
      }),
      invalidatesTags: (result, error, { routeId }) => [
        { type: "SavedItems", id: routeId },
      ],
    }),

    deleteSavedPlace: builder.mutation({
      query: ({ id, routeId, type }) => ({
        url: `/Saved/deletePlaces`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: { id, routeId, type },
      }),
      invalidatesTags: (result, error, { routeId }) => [
        { type: "SavedItems", id: routeId },
      ],
    }),





    updateRouteImage: builder.mutation({
      query: ({ id, imageUrl }) => ({
        url: `/route/updateImage`,
        method: "POST",
        params: { imageUrl, id },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Routes" },
        { type: "SavedItems", id },
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
  useSubmitReviewMutation,
  useUpdateRouteImageMutation,
  useGetSavedItemsByRouteQuery,
  useDeleteSavedPlaceMutation,
  useDeleteSavedHotelMutation,
  useDeleteSavedFlightsMutation,
} = routesApi;
