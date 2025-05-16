import { configureStore } from "@reduxjs/toolkit";
import { locationsApi } from "./flights/locationsApi";
import { ticketsApi } from "./flights/ticketsApi";
import { authApi } from "./auth/authApi";
import authSlice from "./auth/authSlice";
import { placesApi } from "./places/placeAutocomplete";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};
export const store = configureStore({
  reducer: {
    [placesApi.reducerPath]: placesApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: persistReducer(authPersistConfig, authSlice),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      locationsApi.middleware,
      authApi.middleware,
      ticketsApi.middleware,
      placesApi.middleware
    ),
});

export const persistor = persistStore(store);
