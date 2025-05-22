import { configureStore } from "@reduxjs/toolkit";
import { locationsApi } from "./flights/locationsApi";
import { authApi } from "./auth/authApi";
import authSlice from "./auth/authSlice";
import { bookingApi } from './bookingApi/bookingApi';
import { hotelSearchApi } from './bookingApi/hotelSearchApi';

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
    }).concat(locationsApi.middleware, authApi.middleware, bookingApi.middleware, hotelSearchApi.middleware),

});

export const persistor = persistStore(store);
