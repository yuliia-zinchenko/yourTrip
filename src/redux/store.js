import { configureStore } from "@reduxjs/toolkit";
import { locationsApi } from "./flights/locationsApi";

export const store = configureStore({
  reducer: {
    // flightsApi: flightsApi.reducer,
    locationsApi: locationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(locationsApi.middleware),
});
