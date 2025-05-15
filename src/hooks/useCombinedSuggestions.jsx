import {
  useGetAirportsSuggestionsQuery,
  useGetCitiesSuggestionsQuery,
} from "../redux/flights/locationsApi";

export function useCombinedSuggestions(searchTerm) {
  const { data: airports, isLoading: loadingAirports } =
    useGetAirportsSuggestionsQuery(searchTerm);
  const { data: cities, isLoading: loadingCities } =
    useGetCitiesSuggestionsQuery(searchTerm);

  const isLoading = loadingAirports || loadingCities;
  const error = null;

  const results = [...(airports?.data ?? []), ...(cities?.data ?? [])];

  return { results, isLoading, error };
}
