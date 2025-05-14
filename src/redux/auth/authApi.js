import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://192.168.0.103:7271/",
    withCredentials: true,
    // prepareHeaders: (headers, { getState }) => {
    //   const rawToken = getState().auth.token;
    //   const token = rawToken?.replace(/^"(.*)"$/, "$1");
    //   if (token) {
    //     headers.set("Authorization", `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),

  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "api/Auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: "api/Auth/current",
        credentials: "include",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetCurrentUserQuery } =
  authApi;
