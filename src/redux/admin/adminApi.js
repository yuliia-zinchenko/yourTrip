import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://192.168.0.103:7271/api/",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithLogging = async (args, api, extraOptions) => {
  console.log("API request args:", args);
  const result = await baseQuery(args, api, extraOptions);
  console.log("API response result:", result);
  return result;
};
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithLogging,
  endpoints: (builder) => ({
    getSortedCompletedRoutes: builder.query({
      query: () => "Admin/sortCompletedRoutes",
      // Виправлений transformResponse
      transformResponse: (baseQueryReturnValue) => {
        // Повертаємо весь об'єкт відповіді, оскільки дані вже в data
        return baseQueryReturnValue;
      },
      // Покращена обробка помилок
      transformErrorResponse: (response) => ({
        status: response.status,
        message: response.data?.title || "Unknown error",
        details: response.data,
      }),
    }),
  }),
});

export const { useGetSortedCompletedRoutesQuery } = adminApi;
