import { configureStore } from "@reduxjs/toolkit";
import { locationsApi } from "./flights/locationsApi";
import { ticketsApi } from "./flights/ticketsApi";
import { authApi } from "./auth/authApi";
import authSlice from "./auth/authSlice";
import { bookingApi } from "./bookingApi/bookingApi";
import { hotelSearchApi } from "./bookingApi/hotelSearchApi";
import { placesApi } from "./places/placesResultApi";
import { profileApi } from "./profile/profileApi";
import { routesApi } from "./routesApi/saveToRoute";
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
    [profileApi.reducerPath]: profileApi.reducer,
    [routesApi.reducerPath]: routesApi.reducer,
    [placesApi.reducerPath]: placesApi.reducer,
    [ticketsApi.reducerPath]: ticketsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: persistReducer(authPersistConfig, authSlice),
    [bookingApi.reducerPath]: bookingApi.reducer,
    [hotelSearchApi.reducerPath]: hotelSearchApi.reducer,
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
      placesApi.middleware,
      profileApi.middleware,
      bookingApi.middleware,
      hotelSearchApi.middleware,
      routesApi.middleware
    ),
});

export const persistor = persistStore(store);
