import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
  reducerPath: "flightsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "test.api.amadeus.com/v2" }),
  endpoints: (builder) => ({}),
});

// export const { useGetPokemonByNameQuery } = pokemonApi
