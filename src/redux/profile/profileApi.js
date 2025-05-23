import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://192.168.0.103:7271/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: () => "/Profile/Profile",
    }),
    renameUser: builder.mutation({
      query: (newUsername) => ({
        url: `Profile/RewriteUserName?userName=${encodeURIComponent(
          newUsername
        )}`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useGetUserProfileQuery, useRenameUserMutation } = profileApi;
