import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

let accessToken = null;
let tokenExpiryTime = 0;

async function fetchAccessToken() {
  if (accessToken && Date.now() < tokenExpiryTime) {
    return accessToken;
  }

  const response = await fetch(
    "https://test.api.amadeus.com/v1/security/oauth2/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    }
  );
  const data = await response.json();
  console.log(
    "client_id:",
    process.env.REACT_APP_CLIENT_ID,
    "client_secret:",
    process.env.REACT_APP_CLIENT_SECRET
  );

  accessToken = data.access_token;
  tokenExpiryTime = Date.now() + 3600 * 1000;
  // console.log("Access Token:", accessToken); // додай це

  return accessToken;
}

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://test.api.amadeus.com/v1/reference-data/locations",
    prepareHeaders: async (headers) => {
      const token = await fetchAccessToken();
      // console.log(token);
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    GetSuggestions: builder.query({
      query: (query) => ({
        url: `?subType=CITY,AIRPORT&keyword=${query}`,
      }),
    }),
  }),
});

export const { useGetSuggestionsQuery } = locationsApi;
